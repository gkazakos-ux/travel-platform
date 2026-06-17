-- =============================================================================
-- 20260101000006_storage.sql
-- Storage buckets and object-level policies.
--
-- Two public-read buckets (published images benefit from CDN caching).
-- Writes are restricted so a user can only touch objects under their own
-- top-level folder, i.e. the object name must start with "<their uid>/...".
-- The app should always upload to paths like:  {auth.uid()}/{trip_id}/{file}
-- =============================================================================

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('trip-photos', 'trip-photos', true)
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
-- avatars
-- -----------------------------------------------------------------------------
create policy "avatars are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "users upload their own avatars"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "users update their own avatars"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "users delete their own avatars"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- -----------------------------------------------------------------------------
-- trip-photos
-- -----------------------------------------------------------------------------
create policy "trip photos are publicly readable"
  on storage.objects for select
  using (bucket_id = 'trip-photos');

create policy "users upload their own trip photos"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'trip-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "users update their own trip photos"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'trip-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "users delete their own trip photos"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'trip-photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- NOTE on forks: copy_trip duplicates photo *rows* by reference (same
-- storage_path) but never copies storage *objects*. The original uploader still
-- owns the object under their uid prefix, so a fork's owner cannot delete it via
-- these policies. Application logic must therefore only delete a storage object
-- when no other photos row references that storage_path.
