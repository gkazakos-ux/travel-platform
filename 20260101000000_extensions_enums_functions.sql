-- =============================================================================
-- 20260101000000_extensions_enums_functions.sql
-- Extensions, enum types, and shared trigger functions.
-- Run first. Everything else depends on the types defined here.
-- =============================================================================

-- citext gives us case-insensitive, unique usernames without lower() everywhere.
-- Installed into the dedicated `extensions` schema per Supabase convention.
create extension if not exists citext with schema extensions;

-- -----------------------------------------------------------------------------
-- Enum types
-- -----------------------------------------------------------------------------

-- Lifecycle of a trip. Drafts are private to their author; published is public.
create type public.trip_status as enum ('draft', 'published');

-- Closed vocabulary for categorising places. Keeping this as an enum (rather
-- than free text) makes filtering and iconography on the front end reliable.
create type public.place_category as enum (
  'accommodation',
  'food',
  'attraction',
  'activity',
  'transport',
  'shopping',
  'nature',
  'nightlife',
  'other'
);

-- -----------------------------------------------------------------------------
-- Generic updated_at trigger
-- -----------------------------------------------------------------------------
-- Used by tables whose every update is "meaningful" (trip_days, places, photos).
-- trips and profiles get content-aware variants (defined alongside those tables)
-- so that denormalised counter/view updates do NOT bump updated_at and churn caches.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
