# Travel Itinerary Platform — Architecture & Planning

**Working name:** TBD (referred to as "the platform")
**Prepared as:** Product + technical architecture, pre-implementation
**Stack:** Next.js 15 (App Router), TypeScript, Tailwind, Supabase (Postgres + Auth + Storage), OpenStreetMap + Leaflet, Vercel

---

## Guiding principle

This is a **content discovery platform**, not a social network and not a planning tool. The unit of value is a *structured, real itinerary*, and the core loop is:

> A traveler **publishes** a structured itinerary → others **discover** it → they **save** it → they **copy (fork)** it as the starting point for their own trip.

Everything in the MVP exists to make that loop fast and trustworthy. Social features (follow, profiles) exist only to support discovery and credibility — they are not the product. Booking, affiliates, AI generation, and real-time collaboration are explicitly out of scope.

The single most important differentiator versus a notes app or a map app is the **fork**: the ability to take someone's real, lived itinerary and make it yours in one click. Treat that as the feature the rest of the system is built to serve.

---

## 1. Product Requirements Document (PRD)

### 1.1 Problem

People planning a trip want to copy what worked for someone who actually went. Today that knowledge is trapped in blog posts, YouTube videos, Instagram saves, and Google Docs shared between friends — none of it is structured, mappable, comparable, or reusable. The planner ends up rebuilding the itinerary by hand from scattered sources.

### 1.2 Vision

The best place to find a *real, structured, day-by-day* itinerary from a real traveler, save it, and make it your own.

### 1.3 Target users

- **Authors (supply side):** travelers who already document their trips and want a clean home for them, plus credit and a small following. Early adopters: frequent travelers, digital nomads, travel hobbyists who already keep notes.
- **Planners (demand side, the majority):** people with a destination and dates who want a proven structure to start from. They mostly consume; some convert to authors after their trip.

The platform is **read-heavy**: far more people browse and copy than publish. Architecture choices should optimize for cheap, fast, cacheable reads.

### 1.4 Value proposition

| Audience | Value |
|---|---|
| Planner | Find a real itinerary for your destination, see it on a map and day-by-day, copy it as a draft and edit |
| Author | A structured, attractive home for your trips with a public profile and followers |
| Both | Trust through realness — these are trips people actually took, not generated or sponsored content |

### 1.5 Success metrics (North Star + supporting)

- **North Star:** number of **itinerary copies (forks) per week**. It captures both discovery quality and supply quality in one number.
- Supporting: published itineraries/week, save rate (saves ÷ trip views), search → trip-view conversion, returning-author rate, time-to-first-publish for new authors.
- Health/quality: % of published trips with ≥3 days and ≥1 place per day (completeness), report rate.

### 1.6 Explicit non-goals (MVP and near term)

- **Not a booking platform.** No reservations, payments, availability, or inventory.
- **Not an affiliate platform.** No monetized outbound links, no sponsored placement.
- **Not an AI platform.** No generation, no recommendations engine beyond simple ranking/search.
- **Not social-first.** No feed algorithm, DMs, comments, or likes in MVP. Follow exists only to power "trips from people you follow" and author credibility.
- **Not collaborative editing.** One author per trip. No multiplayer.

### 1.7 Constraints & assumptions

- Maps must use OpenStreetMap tiles + Leaflet (no Google Maps). Geocoding via a free/open provider (Nominatim with usage limits, or a hosted geocoder) — see §8 and §9.
- Single-author trips only.
- Public content is world-readable and SEO-relevant; discovery depends heavily on organic search, so URLs, metadata, and server rendering matter.

---

## 2. MVP Scope

Scope is split into **must-ship** (the loop doesn't work without it) and **deferred** (valuable, but cut to stay lean). The feature list from the brief is honored, but ordered by whether it serves the core loop.

### 2.1 Must-ship

**Public (unauthenticated):**
- Home page — value prop, featured/recent published itineraries, entry to search and explore.
- Search itineraries — by destination (country/city), with basic filters (duration, budget range).
- Explore destinations — browse by country/city, see itineraries grouped by place.
- Trip pages — the hero surface: cover, metadata, day-by-day, places, map, author, save/copy CTAs. Fully server-rendered for SEO.
- Public user profiles — bio, countries visited, published trips, follower/following counts.

**Authenticated:**
- Sign up / log in (email + password and/or magic link; OAuth optional later).
- Create / edit trip (draft state) — trip metadata, days, places, photos.
- Add destinations, trip days, places; upload photos.
- Publish itinerary (draft → published transition with a completeness gate).
- **Copy/fork** a published itinerary into your own draft (this is implied by "save and copy real itineraries" in the brief and is the core loop — promote it to must-ship).
- Save itineraries (bookmark).
- Follow users.

### 2.2 Deferred (post-MVP, explicitly out of the first cut)

- Comments, likes, ratings, reviews.
- Activity feed / personalized ranking.
- Collaborative or multi-author trips.
- Trip versioning / change history beyond a simple `forked_from` link.
- Notifications (email or in-app).
- Tags/themes beyond place categories (e.g., "foodie", "family") — nice but not loop-critical.
- Mobile apps (web-responsive only at first).
- Public API for third parties.

### 2.3 Definition of "published" (quality gate)

A trip can only be published if it has a title, a destination (country + city), at least one day, and at least one place. This keeps the discovery surface from filling with empty drafts and protects the North Star (a copy of an empty trip is worthless).

---

## 3. User Flows

Described as flows, not screens, so they map onto routes and server actions later.

### 3.1 Discover → Trip → Copy (the core loop, optimize this above all)

1. Visitor lands via home, search, explore, or organic search result (deep link to a trip page).
2. Trip page renders server-side with full content, map, and author. Save/Copy CTAs are visible.
3. **If unauthenticated** and they click Save or Copy → prompt to sign up/log in, then return to the same trip with the action completed (intent preserved across auth).
4. **Copy** creates a new draft owned by the user: deep-copies trip metadata, days, and places (photos referenced/duplicated by reference, see §8), sets `forked_from` to the source trip, status `draft`. User lands in the editor on their new copy.
5. User edits and optionally republishes their own version.

### 3.2 Author publish flow

1. Authenticated user creates a trip (draft) → fills metadata (title, country, city, dates, budget range, description, cover image).
2. Adds trip days (day number + notes).
3. Adds places to days (name, category, location via map pin / geocode, description, cost, photos).
4. Reorders days/places; uploads photos.
5. Hits Publish → completeness gate (§2.3) → trip becomes world-readable, gets `published_at`, appears in search/explore/profile.
6. Can later edit; edits to a published trip go live immediately (no review queue in MVP).

### 3.3 Search & explore flow

- **Search:** query by destination text + filters (duration buckets, budget range). Results are published trips ranked by relevance + recency + a light popularity signal (saves/copies). Server-rendered + paginated.
- **Explore destinations:** a directory of destinations (country → city) backed by aggregation; each destination page lists published trips for that place. These pages are highly cacheable and SEO-valuable.

### 3.4 Auth flow

- Sign up (email/password or magic link) → on first auth, a `profiles` row is created automatically (DB trigger) → prompt to set username + display name.
- Login → session stored in cookies (Supabase SSR), refreshed by middleware.
- Logout → clear session.
- Auth-gated routes (`/create`, `/edit`, dashboard) redirect to login and preserve intended destination.

### 3.5 Profile & follow flow

- Public profile shows bio, countries visited (derived from published trips), published trips, follower/following counts, and (for the owner) saved trips.
- Follow/unfollow from any profile or trip author block. Following powers an optional "from people you follow" shelf, not a feed.

---

## 4. Database Schema

Postgres on Supabase. Principles: UUID primary keys, `created_at`/`updated_at` everywhere, **Row Level Security on every table**, ISO codes for geography to keep destinations consistent without seeding a full geo database, and ordering columns (`day_number`, `position`) so the UI never has to guess sequence.

A note on geography: rather than normalize full country/city reference tables (which means seeding and maintaining geo data), the MVP stores `country_code` (ISO 3166-1 alpha-2) and free-text `city` on the trip, and derives the "explore destinations" directory by aggregation (a materialized view, §9). This is the lean choice; it can be normalized later without breaking trip pages.

### 4.1 Entity overview

```
auth.users (Supabase managed)
   └─1:1─ profiles
              └─1:many─ trips ──(forked_from self-ref)
                           ├─1:many─ trip_days
                           │             └─1:many─ places
                           │                          └─1:many─ photos (place)
                           └─1:many─ photos (trip cover/gallery)
profiles ─many:many─ profiles   (follows)
profiles ─many:many─ trips      (saves)
```

### 4.2 Tables

**profiles** — public identity, 1:1 with `auth.users`.

| column | type | notes |
|---|---|---|
| id | uuid PK | references `auth.users(id)` on delete cascade |
| username | citext unique | URL slug for profile, case-insensitive |
| display_name | text | |
| bio | text | nullable |
| avatar_path | text | Storage path, nullable |
| followers_count | int default 0 | denormalized counter (trigger-maintained) |
| following_count | int default 0 | denormalized counter |
| created_at / updated_at | timestamptz | |

**trips** — the central entity.

| column | type | notes |
|---|---|---|
| id | uuid PK | |
| author_id | uuid | FK → profiles(id), on delete cascade |
| slug | text | unique together with author_id; used in URL |
| title | text | |
| description | text | nullable |
| cover_photo_id | uuid | FK → photos(id), nullable |
| country_code | char(2) | ISO 3166-1 alpha-2 |
| city | text | |
| start_date / end_date | date | nullable (some trips are undated) |
| budget_min / budget_max | int | nullable, integer minor-unit or whole units |
| currency | char(3) | ISO 4217, nullable |
| status | enum(`draft`,`published`) | default `draft` |
| forked_from | uuid | FK → trips(id) self-reference, nullable |
| published_at | timestamptz | nullable, set on publish |
| view_count | int default 0 | best-effort, async incremented |
| save_count | int default 0 | denormalized counter |
| copy_count | int default 0 | denormalized counter (North Star input) |
| created_at / updated_at | timestamptz | |

Indexes: `(status, published_at desc)` for discovery feeds, `(country_code, city)` for explore, `(author_id)`, unique `(author_id, slug)`, and a full-text index (§9).

**trip_days**

| column | type | notes |
|---|---|---|
| id | uuid PK | |
| trip_id | uuid | FK → trips, on delete cascade |
| day_number | int | unique within trip |
| date | date | nullable, derivable from start_date + day_number |
| notes | text | nullable |
| created_at / updated_at | timestamptz | |

Constraint: `unique(trip_id, day_number)`.

**places**

| column | type | notes |
|---|---|---|
| id | uuid PK | |
| trip_day_id | uuid | FK → trip_days, on delete cascade |
| name | text | |
| category | enum | accommodation, food, attraction, activity, transport, shopping, nature, nightlife, other |
| description | text | nullable |
| lat / lng | numeric(9,6) | nullable until pinned |
| address | text | nullable, from geocode |
| cost | int | nullable |
| currency | char(3) | nullable |
| position | int | ordering within the day |
| created_at / updated_at | timestamptz | |

(If geospatial queries like "trips near me" become a priority, migrate `lat/lng` to a PostGIS `geography(Point)` column with a GiST index. Not needed for MVP.)

**photos** — unified media table for trip galleries/covers and place photos.

| column | type | notes |
|---|---|---|
| id | uuid PK | |
| owner_id | uuid | FK → profiles (uploader), for Storage policy checks |
| trip_id | uuid | FK → trips, nullable |
| place_id | uuid | FK → places, nullable |
| storage_path | text | path in Storage bucket |
| width / height | int | nullable, for layout/CLS |
| position | int | ordering |
| created_at | timestamptz | |

Constraint: a photo belongs to exactly one context — `check ((trip_id is not null) <> (place_id is not null))` (XOR). On copy, place/trip photos are referenced or duplicated (§8).

**saves** — bookmarks (many-to-many profiles↔trips).

| column | type | notes |
|---|---|---|
| user_id | uuid | FK → profiles |
| trip_id | uuid | FK → trips |
| created_at | timestamptz | |

PK `(user_id, trip_id)`. Trigger maintains `trips.save_count`.

**follows** — directed graph among profiles.

| column | type | notes |
|---|---|---|
| follower_id | uuid | FK → profiles |
| following_id | uuid | FK → profiles |
| created_at | timestamptz | |

PK `(follower_id, following_id)`; `check (follower_id <> following_id)`. Triggers maintain `followers_count` / `following_count`.

### 4.3 Derived data

- **Countries visited** (profile): `select distinct country_code from trips where author_id = ? and status='published'`. Cheap; no extra column needed in MVP.
- **Trips published** (profile): count of published trips, or read off a counter if it becomes hot.
- **Explore directory:** materialized view aggregating published trips by `(country_code, city)` with counts; refreshed on a schedule (§9).

### 4.4 Counters & triggers

Denormalized counters (`followers_count`, `following_count`, `save_count`, `copy_count`) are maintained by `AFTER INSERT/DELETE` triggers on the join/source tables. This trades a little write complexity for cheap reads on hot discovery and profile pages. `view_count` is incremented best-effort and asynchronously (it's allowed to be approximate).

---

## 5. API Design

With Next.js App Router + Supabase, prefer **data access in Server Components** (read directly from Supabase with RLS enforced) and **mutations via Server Actions** (or Route Handlers where a stable HTTP endpoint is genuinely needed, e.g. uploads or webhooks). Don't build a REST layer that just re-wraps the database — let RLS be the authorization boundary and keep a thin action layer for validation and side effects.

The table below is the **logical** surface; "Reads" are server-component queries, "Mutations" are server actions.

### 5.1 Reads (server components / cached)

| Capability | Source | Caching |
|---|---|---|
| Home: featured + recent published | query trips `status='published'` ordered by `published_at`, popularity | ISR / revalidate (minutes) |
| Search itineraries | FTS query + filters, paginated (keyset) | dynamic, short cache |
| Explore destinations directory | materialized view | ISR (long) |
| Destination detail (trips for city) | trips by `(country_code, city)`, published | ISR (medium) |
| Trip page | trip + days + places + photos + author | ISR with on-demand revalidation on edit |
| Profile page | profile + published trips + counts | ISR with on-demand revalidation |
| Saved trips (owner only) | saves join trips, RLS-scoped | dynamic, no cache |

### 5.2 Mutations (server actions, all validated with Zod and authorized by RLS)

| Action | Effect |
|---|---|
| `createTrip` | insert draft trip owned by current user |
| `updateTrip` | update trip metadata (owner only) |
| `deleteTrip` | delete trip + cascade |
| `publishTrip` | enforce completeness gate, set `status='published'`, `published_at`; revalidate trip/profile/explore |
| `addDay` / `updateDay` / `deleteDay` / `reorderDays` | trip_days CRUD + ordering |
| `addPlace` / `updatePlace` / `deletePlace` / `reorderPlaces` | places CRUD + ordering |
| `geocodePlace` | server-side call to geocoder (rate-limited, cached) → lat/lng + address |
| `requestPhotoUpload` | issue a signed upload URL / authorize Storage path, create `photos` row on completion |
| `copyTrip` (fork) | transactional deep-copy of trip + days + places into a new draft for current user; set `forked_from`; increment source `copy_count` |
| `saveTrip` / `unsaveTrip` | insert/delete in `saves`; counter via trigger |
| `followUser` / `unfollowUser` | insert/delete in `follows`; counters via trigger |
| `updateProfile` | update bio, display_name, avatar, username (with uniqueness check) |

### 5.3 Route Handlers (HTTP) — only where needed

- `POST /api/uploads/sign` — issue signed Storage upload URLs (keeps storage keys server-side).
- `POST /api/geocode` — proxy + cache for the geocoding provider, with rate limiting and your own user-agent/attribution (Nominatim policy).
- `GET /sitemap.xml`, `GET /robots.txt`, per-trip/destination metadata — SEO surface.
- (Later) webhook endpoints, OG-image generation.

### 5.4 Conventions

- **Validation:** every mutation input parsed with Zod before touching the DB.
- **Authorization:** RLS is the source of truth; actions never bypass it with the service role except for narrowly-scoped admin tasks.
- **Idempotency / transactions:** `copyTrip` and `publishTrip` run as Postgres functions (RPC) so the deep-copy and counter updates are atomic.
- **Pagination:** keyset (cursor on `published_at, id`) for infinite lists; avoid OFFSET on large tables.

---

## 6. Folder Structure

App Router with route groups separating public, auth, and authenticated areas. Data-access and validation logic lives in `lib/`, not in components.

```
/
├─ app/
│  ├─ (marketing)/
│  │  ├─ page.tsx                 # Home
│  │  ├─ explore/
│  │  │  ├─ page.tsx              # Destination directory
│  │  │  └─ [country]/[city]/page.tsx
│  │  ├─ search/page.tsx
│  │  ├─ trips/[username]/[slug]/page.tsx   # Public trip page
│  │  └─ u/[username]/page.tsx    # Public profile
│  ├─ (auth)/
│  │  ├─ login/page.tsx
│  │  ├─ signup/page.tsx
│  │  └─ auth/callback/route.ts   # Supabase auth callback
│  ├─ (app)/                      # Authenticated, layout guards session
│  │  ├─ dashboard/page.tsx       # My trips, saved trips
│  │  ├─ trips/
│  │  │  ├─ new/page.tsx
│  │  │  └─ [tripId]/edit/        # Editor: metadata, days, places, photos
│  │  └─ settings/page.tsx        # Profile edit
│  ├─ api/
│  │  ├─ uploads/sign/route.ts
│  │  └─ geocode/route.ts
│  ├─ sitemap.ts
│  ├─ robots.ts
│  ├─ layout.tsx
│  └─ globals.css
├─ components/
│  ├─ ui/                         # Buttons, inputs, primitives (Tailwind)
│  ├─ trip/                       # TripCard, DayList, PlaceItem, MapView
│  ├─ map/                        # Leaflet wrapper (client-only, dynamic import)
│  └─ profile/
├─ lib/
│  ├─ supabase/
│  │  ├─ server.ts                # server client (cookies)
│  │  ├─ client.ts                # browser client
│  │  └─ middleware.ts            # session refresh helper
│  ├─ actions/                    # Server actions (createTrip, copyTrip, ...)
│  ├─ queries/                    # Read helpers used by server components
│  ├─ validation/                 # Zod schemas
│  ├─ geocode.ts
│  └─ utils/
├─ types/
│  └─ database.ts                 # Generated from Supabase schema
├─ supabase/
│  ├─ migrations/                 # SQL migrations (source of truth for schema)
│  └─ functions/                  # RPC: copy_trip, publish_trip
├─ middleware.ts                  # Session refresh + route protection
└─ ...config files
```

Key points: the Leaflet map is a **client component, dynamically imported with `ssr:false`** (Leaflet touches `window`). Everything else on public pages renders on the server for SEO. Database types are generated from the schema and shared across queries/actions for end-to-end type safety.

---

## 7. Authentication Strategy

- **Provider:** Supabase Auth. Email/password and magic link for MVP; add OAuth (Google) later as a low-effort win.
- **Session transport:** cookie-based via `@supabase/ssr`. Three clients: a server client (reads cookies in Server Components/Actions), a browser client, and a middleware client that refreshes the session on every request.
- **Middleware:** `middleware.ts` refreshes the auth token and guards `(app)` routes — unauthenticated requests redirect to `/login?next=<intended>` so post-login the user returns to where they were (preserves Save/Copy intent from §3.1).
- **Profile bootstrap:** a Postgres trigger on `auth.users` insert creates a matching `profiles` row, then the app prompts for username/display name on first visit. This guarantees every authenticated user has a profile, which RLS and foreign keys depend on.
- **Authorization model:** identity comes from Supabase Auth; *permissions* come from **RLS** (§8). The app code does not implement its own auth checks for data access beyond convenience UX — the database enforces it.
- **Admin/service role:** the service-role key is used only in trusted server contexts for narrow tasks (e.g., scheduled materialized-view refresh, moderation). It is never exposed to the client and never used to casually bypass RLS in normal flows.

---

## 8. Security Considerations

### 8.1 Row Level Security (the core of the model)

RLS is enabled on every table; default deny. Representative policies:

- **profiles:** `select` public; `update` only where `id = auth.uid()`.
- **trips:** `select` allowed when `status='published'` OR `author_id = auth.uid()` (authors see their own drafts; the public sees only published). `insert/update/delete` only where `author_id = auth.uid()`.
- **trip_days / places / photos:** access derived from the parent trip — readable if the trip is publicly readable or owned; writable only if the parent trip is owned by `auth.uid()`. (Enforced via `exists` subqueries against `trips`.)
- **saves:** a user can only see and modify their own saves (`user_id = auth.uid()`).
- **follows:** insert/delete only rows where `follower_id = auth.uid()`; reads public (counts are public).

The completeness gate and the copy operation run inside `SECURITY DEFINER` Postgres functions with carefully checked inputs so they can perform multi-row writes atomically without weakening table policies.

### 8.2 Storage security

- Buckets: `avatars`, `trip-photos`. Decide per bucket whether public-read (simpler, cacheable, fine for published content) or private with signed URLs. Recommendation: **public-read for published trip/avatar images** (they're meant to be seen and benefit from CDN caching), but **upload paths are namespaced by user id** (`{userId}/...`) and Storage policies allow a user to write only under their own prefix.
- Uploads go through signed URLs issued server-side (`/api/uploads/sign`) so the client never holds broad write credentials.
- Validate file type and size server-side before issuing the signed URL; reject non-image MIME types. Strip EXIF/GPS metadata on processing to avoid leaking authors' home or precise location data.

### 8.3 Copy/fork data handling

When copying a trip, **photos are duplicated by reference, not re-uploaded** in MVP (the new `photos` rows point at the original storage paths) to avoid storage bloat — with a clear product decision that copied trips display the original author's photos until the copier replaces them. (If that's undesirable for attribution reasons, switch to server-side object copy. Flag this as a product call.) Always set `forked_from` and surface attribution to the original author on copied trips.

### 8.4 Input validation & abuse

- All mutation inputs validated with Zod; reject oversized text, malformed coordinates, invalid ISO codes.
- Rate limit expensive/abusable actions: geocoding, photo upload signing, follow/save spamming, sign-up. Use an edge/middleware limiter keyed by IP + user.
- **Geocoding compliance:** if using Nominatim, respect its usage policy (≤1 req/s, required `User-Agent`, attribution, no heavy bulk use) — proxy and cache server-side, or budget for a hosted geocoder (§9). Always display OSM attribution on maps.
- **Content moderation:** published content is world-readable. Ship a minimal `report` mechanism and an admin ability to unpublish/remove, even if moderation is otherwise manual at MVP. Plan for handling illegal/abusive content and takedown requests.

### 8.5 General hardening

- Secrets server-side only; only the anon key and public URL reach the browser.
- Strict security headers and a Content Security Policy (allow OSM tile domains and Supabase domains explicitly).
- CSRF: server actions are origin-checked by Next.js; keep mutations as actions/POST handlers, never GET.
- PII minimization: store as little personal data as possible; email lives in `auth.users`, not in public `profiles`.

---

## 9. Scaling Considerations

The platform is read-heavy and SEO-driven, so scaling is mostly about **serving cached reads cheaply** and **keeping hot writes (counters) from contending**.

- **Caching / rendering:** lean on ISR and Vercel's CDN. Trip, profile, and destination pages are statically generated and revalidated on-demand (when the author edits/publishes) plus on a time interval. This pushes the vast majority of read traffic to the edge, away from Postgres.
- **Search:** start with **Postgres full-text search** (`tsvector` column + GIN index) — adequate for tens of thousands of trips. Graduate to a dedicated engine (Typesense/Meilisearch/Algolia) only when relevance or volume demands it. Don't build for this prematurely.
- **Explore directory:** a **materialized view** aggregating published trips by destination, refreshed on a schedule (every few minutes/hours). Keeps the explore pages fast without per-request aggregation.
- **Counters:** trigger-maintained denormalized counters avoid `count(*)` on hot pages. If a counter row becomes a write hotspot (very popular trip), batch increments or move to an async tally.
- **Connection management:** serverless functions (Vercel) open many short-lived connections; use Supabase's pooled connection string (Supavisor/PgBouncer in transaction mode) for the app, and the direct connection only for migrations.
- **Images:** serve through a CDN with on-the-fly resizing (Supabase image transformations or Next/Image with an allowed remote loader). Store dimensions to prevent layout shift.
- **Geocoding cost:** cache geocode results (by normalized query) so popular places aren't re-geocoded; this both saves money and respects provider limits.
- **Pagination:** keyset/cursor pagination on all infinite lists to keep queries cheap as data grows.
- **Later horizons:** read replicas for Postgres if read load on dynamic queries grows; partitioning only if a single table gets very large (unlikely soon); a queue for async work (image processing, view-count tallying) when those become contended.

Order of intervention as you grow: **CDN/ISR first → FTS + materialized views → caching geocode/images → pooling tuning → dedicated search → read replicas.** Resist adding any of the later ones before the metrics demand it.

---

## 10. Development Roadmap

Phased so that the **core loop is provable as early as possible**. Each milestone ends in something deployable.

| Phase | Theme | Outcome |
|---|---|---|
| 0 | Foundation | Project, DB schema + RLS, auth, deploy pipeline live |
| 1 | Authoring | An author can create, structure, and publish a trip |
| 2 | Discovery | A visitor can find and view a published trip (SEO-ready) |
| 3 | The loop | Save + Copy/fork working end to end |
| 4 | Social-lite | Profiles, follow, counters |
| 5 | Hardening & polish | Search quality, caching, moderation, performance |

This phasing means the **copy loop (the North Star) is exercisable by end of Phase 3**, and everything after is amplification and hardening rather than new core mechanics.

---

## Implementation Plan (step-by-step milestones)

No code yet — this is the build order. Each milestone is independently shippable to Vercel.

### Milestone 0 — Foundation & environments
1. Initialize Next.js 15 (App Router, TypeScript, Tailwind), set up linting/formatting and the folder structure from §6.
2. Create the Supabase project; configure local Supabase CLI + migrations as the schema source of truth.
3. Write migration 1: `profiles`, `trips`, `trip_days`, `places`, `photos`, `saves`, `follows`, enums, indexes, and the `updated_at` triggers.
4. Write migration 2: **enable RLS and add all policies** (§8.1) plus the `auth.users → profiles` bootstrap trigger.
5. Wire the three Supabase clients (server/browser/middleware) and generate database types.
6. Set up Vercel project, environment variables (anon key, URL; service role as a server-only secret), and a first deploy of a placeholder home page.
**Done when:** schema is migrated, RLS denies by default, and an empty app is live on Vercel.

### Milestone 1 — Auth & profile
1. Build sign up / login (email-password + magic link) and the auth callback route.
2. Add middleware session refresh + `(app)` route protection with `next` redirect preservation.
3. First-run username/display-name capture; profile bootstrap verified.
4. Settings page: edit bio, display name, avatar (uses Storage upload + signed URL, exercising the upload pipeline early).
**Done when:** a user can sign up, gets a profile row, sets a username, and edits their profile.

### Milestone 2 — Trip authoring (draft)
1. Create-trip flow: metadata form (title, country_code, city, dates, budget range, description) with Zod validation; saves as draft.
2. Trip editor shell: manage days (add/edit/delete/reorder).
3. Places within days: add/edit/delete/reorder, category, cost.
4. Map integration: Leaflet client component (dynamic, `ssr:false`) with OSM tiles + attribution; pin places, store lat/lng; geocode proxy endpoint with caching + rate limit.
5. Photo uploads: signed-URL upload to `trip-photos`, create `photos` rows, set cover, gallery ordering; EXIF stripping.
**Done when:** an author can build a complete structured draft with days, located places, and photos.

### Milestone 3 — Publish & public trip page
1. `publishTrip` RPC with the completeness gate; draft↔published transitions; `published_at`.
2. Public trip page — fully server-rendered: cover, metadata, day-by-day, places, map, author block. ISR + on-demand revalidation on edit/publish.
3. SEO surface: per-trip metadata/OG tags, canonical URLs (`/trips/[username]/[slug]`), `sitemap.ts`, `robots.ts`.
4. Public profile page (published trips, counts, countries visited derived).
**Done when:** a published trip is a fast, indexable public page and appears on its author's profile.

### Milestone 4 — Discovery
1. Search: Postgres FTS column + GIN index; search page with destination query + duration/budget filters; keyset pagination.
2. Explore: materialized view for the destination directory + scheduled refresh; explore index and `[country]/[city]` pages (ISR).
3. Home page: featured/recent published shelves; entry points to search/explore.
**Done when:** a visitor with no prior knowledge can find a relevant published trip from the home page or search.

### Milestone 5 — The core loop (Save + Copy)
1. Save/unsave with trigger-maintained `save_count`; saved-trips list on dashboard.
2. **Copy/fork:** `copy_trip` RPC (atomic deep-copy of trip + days + places, photo-by-reference per §8.3, `forked_from` set, `copy_count` incremented). Copier lands in the editor on their new draft.
3. Auth-intent preservation: unauthenticated Save/Copy → login → return and complete the action.
4. Attribution UI on forked trips (links to original author/trip).
**Done when:** the full discover→view→save→copy loop works for a logged-in and a logged-out (then-authenticated) user. **North Star is now measurable.**

### Milestone 6 — Social-lite
1. Follow/unfollow with `followers_count`/`following_count` triggers.
2. Optional "from people you follow" shelf on home (simple, no algorithm).
3. Profile follower/following surfaces.
**Done when:** users can follow authors and see follow-driven shelves, without any feed/algorithm.

### Milestone 7 — Hardening, observability & polish
1. Rate limiting across geocode/upload/follow/save/signup; security headers + CSP allowing OSM and Supabase.
2. Reporting + admin unpublish/remove; basic moderation runbook.
3. Performance pass: image CDN/resizing, cache-tag revalidation audit, query/index review, connection pooling verification.
4. Analytics for the North Star and supporting metrics; error monitoring; load-test the trip page and search.
5. Accessibility and responsive QA on the core public pages.
**Done when:** the platform is safe to open publicly, observable, and the core surfaces are fast and accessible.

### Sequencing notes
- Build the **upload pipeline in Milestone 1** (via avatars) so trip photos in Milestone 2 reuse a proven path.
- Keep **RLS first** (Milestone 0) — retrofitting security onto an open schema is far more error-prone.
- Don't start Milestone 4's dedicated search or Milestone 7's heavier scaling work until metrics justify them; Postgres FTS + ISR carry you a long way.
- The copy mechanic (Milestone 5) is the riskiest correctness work (atomic deep-copy + photo handling) — give it the most testing.

---

## Open decisions to confirm before building

1. **Forked photos:** reference original storage objects (lean, but copied trips show the original author's images) vs. duplicate objects (clean ownership, more storage). Recommended: reference + clear attribution for MVP.
2. **Geocoding provider:** self-hosted/Nominatim (free, rate-limited, compliance burden) vs. a paid hosted geocoder (simpler, costs money). Affects §8.4 and §9.
3. **Trip dates optional vs. required:** undated itineraries broaden supply but complicate day/date derivation. Current schema treats dates as optional.
4. **Username immutability:** allow username changes (needs redirect handling for old profile URLs) or freeze after first set.
5. **Public vs. private photo buckets:** recommended public-read for published content; confirm acceptable.
