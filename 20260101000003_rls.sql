-- =============================================================================
-- 20260101000003_rls.sql
-- Table-level grants, RLS helper functions, RLS enablement, and policies.
--
-- Authorization model: identity comes from Supabase Auth (auth.uid()); row-level
-- permissions are enforced HERE, in the database. Default deny: a table with RLS
-- enabled and no matching policy returns nothing.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table privileges (RLS still gates rows; these grant the verb at all)
-- -----------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

grant select                         on public.profiles  to anon, authenticated;
grant insert, update                 on public.profiles  to authenticated;

grant select                         on public.trips     to anon, authenticated;
grant insert, update, delete         on public.trips     to authenticated;

grant select                         on public.trip_days to anon, authenticated;
grant insert, update, delete         on public.trip_days to authenticated;

grant select                         on public.places    to anon, authenticated;
grant insert, update, delete         on public.places    to authenticated;

grant select                         on public.photos    to anon, authenticated;
grant insert, update, delete         on public.photos    to authenticated;

grant select, insert, delete         on public.saves     to authenticated;

grant select                         on public.follows   to anon, authenticated;
grant insert, delete                 on public.follows   to authenticated;

-- -----------------------------------------------------------------------------
-- Helper functions used inside policies.
-- SECURITY DEFINER + STABLE: they read base tables directly (no nested RLS, no
-- recursion) and return only a boolean about visibility/ownership for a given id.
-- (select auth.uid()) is wrapped so the planner evaluates it once per statement.
-- -----------------------------------------------------------------------------
create or replace function public.user_owns_trip(p_trip_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.trips t
    where t.id = p_trip_id and t.author_id = (select auth.uid())
  );
$$;

create or replace function public.trip_is_visible(p_trip_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.trips t
    where t.id = p_trip_id
      and (t.status = 'published' or t.author_id = (select auth.uid()))
  );
$$;

create or replace function public.user_owns_day(p_day_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.trip_days d
    join public.trips t on t.id = d.trip_id
    where d.id = p_day_id and t.author_id = (select auth.uid())
  );
$$;

create or replace function public.day_is_visible(p_day_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.trip_days d
    join public.trips t on t.id = d.trip_id
    where d.id = p_day_id
      and (t.status = 'published' or t.author_id = (select auth.uid()))
  );
$$;

create or replace function public.user_owns_place(p_place_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.places p
    join public.trip_days d on d.id = p.trip_day_id
    join public.trips t on t.id = d.trip_id
    where p.id = p_place_id and t.author_id = (select auth.uid())
  );
$$;

create or replace function public.place_is_visible(p_place_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.places p
    join public.trip_days d on d.id = p.trip_day_id
    join public.trips t on t.id = d.trip_id
    where p.id = p_place_id
      and (t.status = 'published' or t.author_id = (select auth.uid()))
  );
$$;

grant execute on function
  public.user_owns_trip(uuid), public.trip_is_visible(uuid),
  public.user_owns_day(uuid),  public.day_is_visible(uuid),
  public.user_owns_place(uuid), public.place_is_visible(uuid)
  to anon, authenticated;

-- -----------------------------------------------------------------------------
-- Enable RLS on every table
-- -----------------------------------------------------------------------------
alter table public.profiles  enable row level security;
alter table public.trips     enable row level security;
alter table public.trip_days enable row level security;
alter table public.places    enable row level security;
alter table public.photos    enable row level security;
alter table public.saves     enable row level security;
alter table public.follows   enable row level security;

-- -----------------------------------------------------------------------------
-- profiles : public read; users manage only their own row
-- -----------------------------------------------------------------------------
create policy profiles_select_all
  on public.profiles for select
  using (true);

create policy profiles_insert_self
  on public.profiles for insert to authenticated
  with check (id = (select auth.uid()));

create policy profiles_update_self
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- -----------------------------------------------------------------------------
-- trips : published OR owned is readable; only the author writes
-- -----------------------------------------------------------------------------
create policy trips_select_published_or_own
  on public.trips for select
  using (status = 'published' or author_id = (select auth.uid()));

create policy trips_insert_own
  on public.trips for insert to authenticated
  with check (author_id = (select auth.uid()));

create policy trips_update_own
  on public.trips for update to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));

create policy trips_delete_own
  on public.trips for delete to authenticated
  using (author_id = (select auth.uid()));

-- -----------------------------------------------------------------------------
-- trip_days : access derived from the parent trip
-- -----------------------------------------------------------------------------
create policy trip_days_select_visible
  on public.trip_days for select
  using (public.trip_is_visible(trip_id));

create policy trip_days_insert_own
  on public.trip_days for insert to authenticated
  with check (public.user_owns_trip(trip_id));

create policy trip_days_update_own
  on public.trip_days for update to authenticated
  using (public.user_owns_trip(trip_id))
  with check (public.user_owns_trip(trip_id));

create policy trip_days_delete_own
  on public.trip_days for delete to authenticated
  using (public.user_owns_trip(trip_id));

-- -----------------------------------------------------------------------------
-- places : access derived from the parent day's trip
-- -----------------------------------------------------------------------------
create policy places_select_visible
  on public.places for select
  using (public.day_is_visible(trip_day_id));

create policy places_insert_own
  on public.places for insert to authenticated
  with check (public.user_owns_day(trip_day_id));

create policy places_update_own
  on public.places for update to authenticated
  using (public.user_owns_day(trip_day_id))
  with check (public.user_owns_day(trip_day_id));

create policy places_delete_own
  on public.places for delete to authenticated
  using (public.user_owns_day(trip_day_id));

-- -----------------------------------------------------------------------------
-- photos : visibility/ownership resolves through whichever parent is set.
-- Write is gated on parent-trip ownership (not owner_id) so a fork's new owner
-- can manage rows even though owner_id stays as the original uploader. The
-- insert path additionally requires owner_id = self for ordinary uploads;
-- copy_trip inserts via SECURITY DEFINER and is exempt from this check.
-- -----------------------------------------------------------------------------
create policy photos_select_visible
  on public.photos for select
  using (
    (trip_id  is not null and public.trip_is_visible(trip_id))
    or (place_id is not null and public.place_is_visible(place_id))
  );

create policy photos_insert_own
  on public.photos for insert to authenticated
  with check (
    owner_id = (select auth.uid())
    and (
      (trip_id  is not null and public.user_owns_trip(trip_id))
      or (place_id is not null and public.user_owns_place(place_id))
    )
  );

create policy photos_update_own
  on public.photos for update to authenticated
  using (
    (trip_id  is not null and public.user_owns_trip(trip_id))
    or (place_id is not null and public.user_owns_place(place_id))
  )
  with check (
    (trip_id  is not null and public.user_owns_trip(trip_id))
    or (place_id is not null and public.user_owns_place(place_id))
  );

create policy photos_delete_own
  on public.photos for delete to authenticated
  using (
    (trip_id  is not null and public.user_owns_trip(trip_id))
    or (place_id is not null and public.user_owns_place(place_id))
  );

-- -----------------------------------------------------------------------------
-- saves : strictly private to the saving user
-- -----------------------------------------------------------------------------
create policy saves_select_own
  on public.saves for select to authenticated
  using (user_id = (select auth.uid()));

create policy saves_insert_own
  on public.saves for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy saves_delete_own
  on public.saves for delete to authenticated
  using (user_id = (select auth.uid()));

-- -----------------------------------------------------------------------------
-- follows : graph is public; you may only create/remove edges you originate
-- -----------------------------------------------------------------------------
create policy follows_select_all
  on public.follows for select
  using (true);

create policy follows_insert_self
  on public.follows for insert to authenticated
  with check (follower_id = (select auth.uid()));

create policy follows_delete_self
  on public.follows for delete to authenticated
  using (follower_id = (select auth.uid()));
