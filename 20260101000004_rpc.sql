-- =============================================================================
-- 20260101000004_rpc.sql
-- Transactional / privileged operations exposed as RPCs:
--   publish_trip        - enforce the completeness gate, then publish
--   copy_trip           - atomic deep-copy (fork) of a published trip
--   increment_trip_view - best-effort view counter for anonymous + auth viewers
-- =============================================================================

-- -----------------------------------------------------------------------------
-- publish_trip : draft -> published, gated on completeness.
-- SECURITY INVOKER: runs as the caller, so RLS still applies; we additionally
-- raise explicit errors for clear client messaging.
-- Gate: must have >= 1 day and >= 1 place. (title/country/city are NOT NULL.)
-- -----------------------------------------------------------------------------
create or replace function public.publish_trip(p_trip_id uuid)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_author      uuid;
  v_day_count   integer;
  v_place_count integer;
begin
  select author_id into v_author from public.trips where id = p_trip_id;

  if v_author is null then
    raise exception 'Trip not found' using errcode = 'no_data_found';
  end if;
  if v_author <> (select auth.uid()) then
    raise exception 'Not authorized to publish this trip' using errcode = 'insufficient_privilege';
  end if;

  select count(*) into v_day_count from public.trip_days where trip_id = p_trip_id;
  if v_day_count = 0 then
    raise exception 'Trip must have at least one day before publishing';
  end if;

  select count(*) into v_place_count
  from public.places pl
  join public.trip_days d on d.id = pl.trip_day_id
  where d.trip_id = p_trip_id;
  if v_place_count = 0 then
    raise exception 'Trip must have at least one place before publishing';
  end if;

  update public.trips
  set status       = 'published',
      published_at = coalesce(published_at, now())
  where id = p_trip_id;
end;
$$;

-- -----------------------------------------------------------------------------
-- copy_trip : fork a published trip into a new draft owned by the caller.
-- SECURITY DEFINER: writes rows the caller does not yet own and bumps the
-- source's copy_count (which the caller cannot update via RLS). It deep-copies
-- days, places, and photos (photos by reference: same storage_path, original
-- owner_id preserved for storage attribution). Runs in one transaction; any
-- failure rolls the whole fork back. Returns the new trip id.
-- -----------------------------------------------------------------------------
create or replace function public.copy_trip(p_source_trip_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_caller       uuid := (select auth.uid());
  v_source       public.trips%rowtype;
  v_new_trip_id  uuid := gen_random_uuid();
  v_new_slug     text;
  v_day          record;
  v_place        record;
  v_photo        record;
  v_new_day_id   uuid;
  v_new_place_id uuid;
  v_new_photo_id uuid;
  v_day_map      jsonb := '{}'::jsonb;   -- old day_id   -> new day_id
  v_place_map    jsonb := '{}'::jsonb;   -- old place_id -> new place_id
  v_new_cover    uuid;
begin
  if v_caller is null then
    raise exception 'Authentication required' using errcode = 'insufficient_privilege';
  end if;

  select * into v_source from public.trips where id = p_source_trip_id;
  if not found then
    raise exception 'Source trip not found' using errcode = 'no_data_found';
  end if;
  if v_source.status <> 'published' then
    raise exception 'Only published trips can be copied';
  end if;

  -- Slug unique within the caller's namespace.
  v_new_slug := left(v_source.slug, 40) || '-copy-' ||
                substr(replace(gen_random_uuid()::text, '-', ''), 1, 6);

  insert into public.trips (
    id, author_id, slug, title, description,
    country_code, city, start_date, end_date,
    budget_min, budget_max, currency, status, forked_from
  ) values (
    v_new_trip_id, v_caller, v_new_slug, v_source.title, v_source.description,
    v_source.country_code, v_source.city, v_source.start_date, v_source.end_date,
    v_source.budget_min, v_source.budget_max, v_source.currency, 'draft', v_source.id
  );

  -- Days
  for v_day in
    select * from public.trip_days where trip_id = p_source_trip_id order by day_number
  loop
    v_new_day_id := gen_random_uuid();
    insert into public.trip_days (id, trip_id, day_number, date, notes)
    values (v_new_day_id, v_new_trip_id, v_day.day_number, v_day.date, v_day.notes);
    v_day_map := jsonb_set(v_day_map, array[v_day.id::text], to_jsonb(v_new_day_id));
  end loop;

  -- Places (remapped onto the new days)
  for v_place in
    select p.* from public.places p
    join public.trip_days d on d.id = p.trip_day_id
    where d.trip_id = p_source_trip_id
  loop
    v_new_place_id := gen_random_uuid();
    insert into public.places (
      id, trip_day_id, name, category, description,
      lat, lng, address, cost, currency, position
    ) values (
      v_new_place_id,
      (v_day_map ->> v_place.trip_day_id::text)::uuid,
      v_place.name, v_place.category, v_place.description,
      v_place.lat, v_place.lng, v_place.address, v_place.cost, v_place.currency, v_place.position
    );
    v_place_map := jsonb_set(v_place_map, array[v_place.id::text], to_jsonb(v_new_place_id));
  end loop;

  -- Photos (copy by reference: same storage_path, original owner preserved)
  for v_photo in
    select * from public.photos
    where trip_id = p_source_trip_id
       or place_id in (
         select p.id from public.places p
         join public.trip_days d on d.id = p.trip_day_id
         where d.trip_id = p_source_trip_id
       )
  loop
    v_new_photo_id := gen_random_uuid();
    insert into public.photos (
      id, owner_id, trip_id, place_id, storage_path, width, height, position
    ) values (
      v_new_photo_id,
      v_photo.owner_id,
      case when v_photo.trip_id  is not null then v_new_trip_id else null end,
      case when v_photo.place_id is not null then (v_place_map ->> v_photo.place_id::text)::uuid else null end,
      v_photo.storage_path, v_photo.width, v_photo.height, v_photo.position
    );
    if v_source.cover_photo_id is not null and v_photo.id = v_source.cover_photo_id then
      v_new_cover := v_new_photo_id;
    end if;
  end loop;

  if v_new_cover is not null then
    update public.trips set cover_photo_id = v_new_cover where id = v_new_trip_id;
  end if;

  -- North Star input.
  update public.trips set copy_count = copy_count + 1 where id = p_source_trip_id;

  return v_new_trip_id;
end;
$$;

-- -----------------------------------------------------------------------------
-- increment_trip_view : best-effort, published-only. SECURITY DEFINER so that
-- anonymous/non-author viewers can bump the counter (RLS would block it).
-- Does NOT bump trips.updated_at (the content-aware trigger ignores view_count).
-- -----------------------------------------------------------------------------
create or replace function public.increment_trip_view(p_trip_id uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.trips
  set view_count = view_count + 1
  where id = p_trip_id and status = 'published';
$$;

-- -----------------------------------------------------------------------------
-- Execute grants (lock down: revoke the implicit PUBLIC grant, then re-grant)
-- -----------------------------------------------------------------------------
revoke execute on function public.publish_trip(uuid)        from public;
revoke execute on function public.copy_trip(uuid)           from public;
revoke execute on function public.increment_trip_view(uuid) from public;

grant execute on function public.publish_trip(uuid)        to authenticated;
grant execute on function public.copy_trip(uuid)           to authenticated;
grant execute on function public.increment_trip_view(uuid) to anon, authenticated;
