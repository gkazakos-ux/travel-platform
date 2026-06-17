/**
 * Single source of URL truth. Use these builders everywhere instead of
 * hardcoding strings, so route-shape changes are a one-file edit.
 */
export const routes = {
  home: () => "/" as const,

  // Auth
  login: (next?: string) =>
    next ? `/login?next=${encodeURIComponent(next)}` : "/login",
  signup: (next?: string) =>
    next ? `/signup?next=${encodeURIComponent(next)}` : "/signup",
  onboarding: () => "/onboarding" as const,

  // Auth callbacks (route handlers)
  authCallback: () => "/auth/callback" as const,
  authConfirm: () => "/auth/confirm" as const,
  authSignOut: () => "/auth/sign-out" as const,

  // Authenticated app
  dashboard: () => "/dashboard" as const,
  settings: () => "/settings" as const,
  saved: () => "/saved" as const,
  newTrip: () => "/trips/new" as const,
  editTrip: (tripId: string) => `/trips/${tripId}/edit` as const,

  // Public
  profile: (username: string) => `/u/${username}` as const,
  trip: (username: string, slug: string) =>
    `/trips/${username}/${slug}` as const,
  explore: () => "/explore" as const,
  search: (q?: string) => (q ? `/search?q=${encodeURIComponent(q)}` : "/search"),
} as const;
