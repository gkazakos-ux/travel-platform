-- =============================================================================
-- 20260101000005_explore_view.sql
-- Materialized view backing the "Explore destinations" directory.
-- Aggregates published trips by (country_code, city) so explore pages never run
-- a live GROUP BY over the whole trips table. Refreshed on a schedule.
--
-- Materialized views do not enforce RLS, but this one contains only aggregate
-- counts of already-public (published) trips, so exposing it is safe.
-- =============================================================================

create materialized view public.destination_stats as
select
  country_code,
  city,
  count(*)::integer       as trip_count,
  max(published_at)       as latest_published_at
from public.trips
where status = 'published'
group by country_code, city
with no data;

-- Unique index is REQUIRED for REFRESH ... CONCURRENTLY and serves lookups.
create unique index destination_stats_pk
  on public.destination_stats (country_code, city);

-- Secondary order index for "most popular destinations" listings.
create index destination_stats_popular_idx
  on public.destination_stats (trip_count desc, country_code, city);

grant select on public.destination_stats to anon, authenticated;

-- Initial population.
refresh materialized view public.destination_stats;

-- -----------------------------------------------------------------------------
-- Refresh helper. SECURITY DEFINER so a scheduler role can call it without
-- owning the view. Grant execute to service_role only (never anon/authenticated).
-- -----------------------------------------------------------------------------
create or replace function public.refresh_destination_stats()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  refresh materialized view concurrently public.destination_stats;
end;
$$;

revoke execute on function public.refresh_destination_stats() from public;
grant  execute on function public.refresh_destination_stats() to service_role;

-- -----------------------------------------------------------------------------
-- Scheduling (optional): enable pg_cron and uncomment to refresh every 15 min.
-- Alternatively, call refresh_destination_stats() from a Supabase scheduled
-- Edge Function or an external cron hitting an authenticated endpoint.
-- -----------------------------------------------------------------------------
-- create extension if not exists pg_cron with schema extensions;
-- select cron.schedule(
--   'refresh_destination_stats',
--   '*/15 * * * *',
--   $$ select public.refresh_destination_stats(); $$
-- );
