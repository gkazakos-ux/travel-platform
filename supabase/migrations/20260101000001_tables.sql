-- =============================================================================
-- 20260101000001_tables.sql
-- All tables, foreign keys, constraints, indexes, and updated_at triggers.
-- Also the auth.users -> profiles bootstrap trigger.
-- =============================================================================

-- =============================================================================
-- profiles : public identity, 1:1 with auth.users
-- =============================================================================
create table public.profiles (
  id               uuid primary key references auth.users (id) on delete cascade,
  username         extensions.citext unique,            -- nullable until onboarding sets it
  display_name     text,                                -- nullable until onboarding sets it
  bio              text,
  avatar_path      text,                                -- path within the 'avatars' storage bucket
  followers_count  integer not null default 0,          -- denormalised; maintained by trigger
  following_count  integer not null default 0,          -- denormalised; maintained by trigger
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  constraint profiles_username_format
    check (username is null or username ~ '^[a-zA-Z0-9_]{3,30}$'),
  constraint profiles_counts_nonneg
    check (followers_count >= 0 and following_count >= 0)
);
comment on table public.profiles is
  'Public user identity, one row per auth.users row. Username/display_name set during onboarding.';

-- Content-aware updated_at for profiles: counter changes must not bump updated_at.
create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := old.updated_at;
  if (new.username, new.display_name, new.bio, new.avatar_path)
       is distinct from
     (old.username, old.display_name, old.bio, old.avatar_path) then
    new.updated_at := now();
  end if;
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_profiles_updated_at();

-- =============================================================================
-- trips : the central entity
-- =============================================================================
-- NOTE: cover_photo_id references photos(id), but photos references trips(id),
-- so the FK for cover_photo_id is added with ALTER after photos is created.
create table public.trips (
  id            uuid primary key default gen_random_uuid(),
  author_id     uuid not null references public.profiles (id) on delete cascade,
  slug          text not null,
  title         text not null,
  description   text,
  cover_photo_id uuid,                                  -- FK added after photos table exists
  country_code  text not null,                          -- ISO 3166-1 alpha-2
  city          text not null,
  start_date    date,
  end_date      date,
  budget_min    integer,                                -- whole currency units, nullable
  budget_max    integer,
  currency      text,                                   -- ISO 4217, nullable
  status        public.trip_status not null default 'draft',
  forked_from   uuid references public.trips (id) on delete set null,
  published_at  timestamptz,
  view_count    integer not null default 0,             -- best-effort, async incremented
  save_count    integer not null default 0,             -- denormalised; maintained by trigger
  copy_count    integer not null default 0,             -- denormalised; North Star input
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- Full-text search vector, generated and kept in sync automatically.
  search_vector tsvector generated always as (
    to_tsvector(
      'simple',
      coalesce(title, '') || ' ' || coalesce(city, '') || ' ' || coalesce(description, '')
    )
  ) stored,

  constraint trips_slug_per_author_unique unique (author_id, slug),
  constraint trips_country_code_format    check (country_code ~ '^[A-Z]{2}$'),
  constraint trips_currency_format        check (currency is null or currency ~ '^[A-Z]{3}$'),
  constraint trips_date_order             check (start_date is null or end_date is null or end_date >= start_date),
  constraint trips_budget_order           check (budget_min is null or budget_max is null or budget_max >= budget_min),
  constraint trips_budget_nonneg          check ((budget_min is null or budget_min >= 0) and (budget_max is null or budget_max >= 0)),
  constraint trips_counts_nonneg          check (view_count >= 0 and save_count >= 0 and copy_count >= 0),
  -- A published trip must always carry a publish timestamp.
  constraint trips_published_has_date     check (status = 'draft' or published_at is not null)
);
comment on table public.trips is
  'A travel itinerary. Private while draft, world-readable once published. The fork (forked_from) is the core product mechanic.';

-- Content-aware updated_at for trips: view/save/copy counter writes must not
-- bump updated_at (would thrash ISR cache on every page view).
create or replace function public.set_trips_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := old.updated_at;
  if (new.title, new.description, new.cover_photo_id, new.country_code, new.city,
      new.start_date, new.end_date, new.budget_min, new.budget_max, new.currency,
      new.status, new.slug, new.forked_from)
       is distinct from
     (old.title, old.description, old.cover_photo_id, old.country_code, old.city,
      old.start_date, old.end_date, old.budget_min, old.budget_max, old.currency,
      old.status, old.slug, old.forked_from) then
    new.updated_at := now();
  end if;
  return new;
end;
$$;

create trigger trips_set_updated_at
  before update on public.trips
  for each row execute function public.set_trips_updated_at();

-- Discovery / list indexes (partial: discovery only ever touches published rows).
create index trips_pub_recent_idx on public.trips (published_at desc, id desc) where status = 'published';
create index trips_pub_dest_idx   on public.trips (country_code, city, published_at desc) where status = 'published';
create index trips_author_idx     on public.trips (author_id, status, published_at desc);
create index trips_forked_from_idx on public.trips (forked_from);
create index trips_search_idx     on public.trips using gin (search_vector);

-- =============================================================================
-- trip_days : ordered days within a trip
-- =============================================================================
create table public.trip_days (
  id          uuid primary key default gen_random_uuid(),
  trip_id     uuid not null references public.trips (id) on delete cascade,
  day_number  integer not null,
  date        date,                                     -- optional; derivable from trip.start_date
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint trip_days_number_positive check (day_number >= 1),
  constraint trip_days_unique_per_trip unique (trip_id, day_number)
);
comment on table public.trip_days is 'An ordered day within a trip (Day 1, Day 2, ...). Unique per (trip, day_number).';

create trigger trip_days_set_updated_at
  before update on public.trip_days
  for each row execute function public.set_updated_at();

-- (trip_id, day_number) unique index already supports lookups by trip.

-- =============================================================================
-- places : ordered places within a day
-- =============================================================================
create table public.places (
  id           uuid primary key default gen_random_uuid(),
  trip_day_id  uuid not null references public.trip_days (id) on delete cascade,
  name         text not null,
  category     public.place_category not null default 'other',
  description  text,
  lat          numeric(9, 6),
  lng          numeric(9, 6),
  address      text,
  cost         integer,
  currency     text,
  position     integer not null default 0,              -- ordering within the day
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint places_lat_range      check (lat is null or (lat between -90 and 90)),
  constraint places_lng_range      check (lng is null or (lng between -180 and 180)),
  constraint places_latlng_paired  check ((lat is null) = (lng is null)),
  constraint places_cost_nonneg    check (cost is null or cost >= 0),
  constraint places_currency_format check (currency is null or currency ~ '^[A-Z]{3}$')
);
comment on table public.places is 'A point of interest within a trip day (lodging, food, attraction...). Coordinates feed the Leaflet/OSM map.';

create trigger places_set_updated_at
  before update on public.places
  for each row execute function public.set_updated_at();

create index places_day_position_idx on public.places (trip_day_id, position);

-- =============================================================================
-- photos : unified media for trip galleries/covers and place photos
-- =============================================================================
create table public.photos (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null references public.profiles (id) on delete cascade, -- uploader (storage attribution)
  trip_id       uuid references public.trips (id) on delete cascade,
  place_id      uuid references public.places (id) on delete cascade,
  storage_path  text not null,                          -- path within the 'trip-photos' bucket
  width         integer,
  height        integer,
  position      integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- A photo belongs to exactly one context: a trip OR a place, never both/neither.
  constraint photos_context_xor check ((trip_id is not null) <> (place_id is not null)),
  constraint photos_dimensions  check ((width is null or width > 0) and (height is null or height > 0))
);
comment on table public.photos is
  'Image metadata for trip covers/galleries and place photos. On fork, rows are copied by reference (same storage_path, original owner_id preserved).';

create trigger photos_set_updated_at
  before update on public.photos
  for each row execute function public.set_updated_at();

create index photos_trip_idx  on public.photos (trip_id, position)  where trip_id is not null;
create index photos_place_idx on public.photos (place_id, position) where place_id is not null;
create index photos_owner_idx on public.photos (owner_id);

-- Deferred FK: trips.cover_photo_id -> photos.id (circular dependency resolved here).
-- on delete set null so deleting a cover photo simply clears the cover.
alter table public.trips
  add constraint trips_cover_photo_fk
  foreign key (cover_photo_id) references public.photos (id) on delete set null;

-- =============================================================================
-- saves : bookmarks (profiles <-> trips, many-to-many)
-- =============================================================================
create table public.saves (
  user_id     uuid not null references public.profiles (id) on delete cascade,
  trip_id     uuid not null references public.trips (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, trip_id)
);
comment on table public.saves is 'A user bookmarking a trip. Append-only join table (no updated_at).';

create index saves_user_recent_idx on public.saves (user_id, created_at desc);
create index saves_trip_idx        on public.saves (trip_id);

-- =============================================================================
-- follows : directed follow graph (profiles <-> profiles)
-- =============================================================================
create table public.follows (
  follower_id   uuid not null references public.profiles (id) on delete cascade,
  following_id  uuid not null references public.profiles (id) on delete cascade,
  created_at    timestamptz not null default now(),
  primary key (follower_id, following_id),
  constraint follows_no_self check (follower_id <> following_id)
);
comment on table public.follows is 'follower_id follows following_id. Append-only join table (no updated_at).';

-- PK index covers (follower_id, ...) lookups; add the reverse for "who follows X".
create index follows_following_idx on public.follows (following_id);

-- =============================================================================
-- Auth bootstrap : create a profiles row whenever an auth user is created
-- =============================================================================
-- SECURITY DEFINER so it can insert into public.profiles regardless of the
-- caller (the auth admin role). display_name is pulled from signup metadata if
-- present; username stays null until the onboarding step sets it.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, nullif(new.raw_user_meta_data ->> 'display_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
