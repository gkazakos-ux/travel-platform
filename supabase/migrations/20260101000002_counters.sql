-- =============================================================================
-- 20260101000002_counters.sql
-- Triggers that keep denormalised counters in sync:
--   follows -> profiles.followers_count / following_count
--   saves   -> trips.save_count
-- (copy_count is handled inside the copy_trip RPC; view_count by increment_trip_view.)
--
-- These functions are SECURITY DEFINER because they update OTHER users' rows
-- (e.g. incrementing the followee's followers_count), which RLS would otherwise
-- block for the acting user. They run as the table owner and bypass RLS.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- follows -> profile counters
-- -----------------------------------------------------------------------------
create or replace function public.sync_follow_counts()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (tg_op = 'INSERT') then
    update public.profiles set followers_count = followers_count + 1 where id = new.following_id;
    update public.profiles set following_count = following_count + 1 where id = new.follower_id;
  elsif (tg_op = 'DELETE') then
    update public.profiles set followers_count = greatest(followers_count - 1, 0) where id = old.following_id;
    update public.profiles set following_count = greatest(following_count - 1, 0) where id = old.follower_id;
  end if;
  return null; -- AFTER trigger; return value ignored
end;
$$;

create trigger follows_sync_counts
  after insert or delete on public.follows
  for each row execute function public.sync_follow_counts();

-- -----------------------------------------------------------------------------
-- saves -> trips.save_count
-- -----------------------------------------------------------------------------
create or replace function public.sync_save_counts()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (tg_op = 'INSERT') then
    update public.trips set save_count = save_count + 1 where id = new.trip_id;
  elsif (tg_op = 'DELETE') then
    -- Matches zero rows (harmless no-op) when the parent trip is being cascade-deleted.
    update public.trips set save_count = greatest(save_count - 1, 0) where id = old.trip_id;
  end if;
  return null;
end;
$$;

create trigger saves_sync_counts
  after insert or delete on public.saves
  for each row execute function public.sync_save_counts();
