# Project Structure — Travel Itinerary Platform

Next.js 15 (App Router) · TypeScript · Tailwind · Supabase · OSM/Leaflet · Vercel

This document defines the folder layout and the conventions that keep it maintainable. No implementation code yet — structure and placement rules only.

---

## Organizing principle

Two ideas, held together by one rule:

- **`features/` owns the domain.** Almost all real code (components, hooks, server actions, queries, validation schemas, feature types) lives inside a feature module, colocated by what it's *about* (trips, discovery, profiles, auth, saves, follows, photos).
- **The root owns the shared and the infrastructural.** `components/` (generic UI), `services/` (how we talk to Supabase / OSM / Storage), `hooks/` (app-wide client hooks), `lib/` (pure utilities), `types/` (global + generated types), and `config/` are cross-cutting and domain-agnostic.

**The rule that prevents rot:** dependencies point *inward and downward*. `app/` composes `features/`; `features/` may use `services/`, `lib/`, `components/`, `hooks/`, `types/`; shared root folders never import from `features/`. Features talk to each other only through their `index.ts` barrel — never deep imports.

```
app/  ──uses──▶  features/  ──uses──▶  services/ · lib/ · components/ · hooks/ · types/ · config/
```

---

## Top-level tree

```
travel-itinerary-platform/
├── app/                  # App Router: routing, layouts, route handlers ONLY (thin)
├── features/             # Domain modules — the bulk of the application
├── components/           # Cross-cutting, presentational, domain-agnostic UI
├── services/             # Infrastructure & external-system clients (all I/O)
├── hooks/                # App-wide reusable client hooks
├── lib/                  # Pure, dependency-free utilities & constants (no I/O)
├── types/                # Global + generated (Supabase) types
├── config/              # Static app configuration (site, nav, typed routes)
├── supabase/             # Migrations, config, seed, edge functions
├── public/               # Static assets served as-is
├── e2e/                  # Playwright end-to-end tests
├── middleware.ts         # Session refresh + route protection
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json         # path alias: "@/*" -> project root
├── eslint.config.mjs
├── .prettierrc
├── .env.example
├── package.json
└── README.md
```

---

## `app/` — routing only

The App Router holds routes, layouts, loading/error boundaries, and HTTP route handlers. Pages stay thin: they fetch via a feature's `queries/` (server) and render feature `components/`. Route groups isolate the three audiences (`(marketing)` public, `(auth)` sign-in, `(app)` authenticated).

```
app/
├── layout.tsx                    # Root layout: <html>, fonts, <Providers>
├── providers.tsx                 # Client context providers (toaster, query client if used)
├── globals.css                   # Tailwind layers + design tokens
├── not-found.tsx
├── error.tsx                     # Root error boundary
├── loading.tsx
├── sitemap.ts                    # Dynamic sitemap: trips, profiles, destinations
├── robots.ts
├── manifest.ts
│
├── (marketing)/                  # PUBLIC · server-rendered + ISR · no auth
│   ├── layout.tsx                # Public chrome (header/footer)
│   ├── page.tsx                  # Home — featured + recent shelves
│   ├── search/
│   │   └── page.tsx              # Search itineraries (?q & filters)
│   ├── explore/
│   │   ├── page.tsx              # Destination directory (destination_stats view)
│   │   └── [country]/
│   │       ├── page.tsx          # Country → cities + trips
│   │       └── [city]/
│   │           └── page.tsx      # City → published trips
│   ├── trips/
│   │   └── [username]/
│   │       └── [slug]/
│   │           ├── page.tsx              # Public trip page (the hero surface)
│   │           ├── loading.tsx
│   │           └── opengraph-image.tsx   # Per-trip dynamic OG image
│   └── u/
│       └── [username]/
│           ├── page.tsx          # Public profile
│           └── loading.tsx
│
├── (auth)/                       # Sign-in flows · redirects to (app) if already authed
│   ├── layout.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── onboarding/page.tsx       # First-run: set username + display name
│   └── auth/
│       ├── callback/route.ts     # OAuth / magic-link code exchange
│       ├── confirm/route.ts      # Email OTP / token_hash verification
│       └── sign-out/route.ts
│
├── (app)/                        # AUTHENTICATED · layout guard + middleware enforce session
│   ├── layout.tsx                # Authed chrome; redirects to /login?next=…
│   ├── dashboard/page.tsx        # My trips (drafts + published)
│   ├── saved/page.tsx            # Saved itineraries
│   ├── settings/page.tsx         # Profile + account settings
│   └── trips/
│       ├── new/page.tsx          # Create-trip (metadata) → redirect to editor
│       └── [tripId]/
│           └── edit/
│               ├── layout.tsx    # Editor shell — ownership-checked
│               └── page.tsx      # Day/place editor, photo upload, publish
│
└── api/                          # Route Handlers (HTTP) — thin, delegate to services/features
    ├── uploads/
    │   └── sign/route.ts         # Issue signed Storage upload URLs
    ├── geocode/route.ts          # Proxy + cache OSM/Nominatim (rate-limited)
    ├── revalidate/route.ts       # On-demand ISR revalidation (secret-protected)
    └── cron/
        └── refresh-destinations/route.ts   # Scheduler → refresh_destination_stats()
```

Route handlers exist only for things React Server Components and Server Actions can't do well: signed uploads, the geocode proxy, scheduled jobs, on-demand revalidation, and OG images. Everything else is RSC reads + server-action writes.

---

## `features/` — domain modules

Every feature is self-contained and exposes a public surface via `index.ts`. A full feature has this anatomy (not every feature needs every folder):

```
features/<feature>/
├── components/      # UI specific to this domain (server + client)
├── hooks/           # client hooks for this domain
├── actions/         # 'use server' mutations (validated, RLS-enforced)
├── queries/         # server-only reads used by RSC (import 'server-only')
├── schemas/         # zod schemas — shared by client forms and server actions
├── types.ts         # composite types built from the generated DB types
├── constants.ts     # domain constants & limits
└── index.ts         # barrel: the ONLY thing other features may import
```

### `features/trips/` (fully expanded — the richest module)

```
features/trips/
├── components/
│   ├── trip-card.tsx                 # used by shelves / search / profile
│   ├── trip-card-grid.tsx
│   ├── trip-header.tsx               # cover, title, meta, author, Save/Copy CTAs
│   ├── trip-meta.tsx                 # country/city/dates/budget chips
│   ├── day-list.tsx                  # read view of days + places
│   ├── day-section.tsx
│   ├── place-item.tsx
│   ├── place-category-icon.tsx
│   ├── fork-attribution.tsx          # "Copied from @author"
│   └── editor/                       # authoring UI (client)
│       ├── trip-editor.tsx
│       ├── trip-meta-form.tsx
│       ├── day-editor.tsx
│       ├── place-editor.tsx
│       ├── place-location-picker.tsx # uses components/map + services/geocode
│       ├── photo-uploader.tsx        # uses features/photos
│       ├── reorderable-list.tsx
│       └── publish-button.tsx
├── hooks/
│   ├── use-trip-editor.ts            # editor state + optimistic updates
│   ├── use-reorder.ts
│   └── use-autosave.ts
├── actions/
│   ├── create-trip.ts
│   ├── update-trip.ts
│   ├── delete-trip.ts
│   ├── publish-trip.ts               # calls publish_trip() RPC + revalidates
│   ├── copy-trip.ts                  # calls copy_trip() RPC — the fork
│   ├── days.ts                       # add / update / delete / reorder days
│   └── places.ts                     # add / update / delete / reorder places
├── queries/
│   ├── get-trip-by-slug.ts           # public trip page
│   ├── get-trip-for-edit.ts          # owner-scoped, includes drafts
│   ├── get-trips-by-author.ts        # profile + dashboard
│   └── get-trip-map-points.ts        # places → Leaflet markers
├── schemas/
│   ├── trip.schema.ts
│   ├── day.schema.ts
│   └── place.schema.ts
├── types.ts                          # TripWithDays, TripCardData, EditorState…
├── constants.ts                      # PLACE_CATEGORIES, BUDGET_BANDS, field limits
└── index.ts
```

### The remaining features (same anatomy, condensed)

```
features/
├── discovery/                        # READ-ONLY: home shelves, search, explore
│   ├── components/   search-bar · search-filters · destination-card · explore-grid · home-shelf
│   ├── hooks/        use-search-filters · use-infinite-trips
│   ├── queries/      search-trips · get-featured · get-recent · get-destinations · get-destination
│   ├── schemas/      search-params.schema.ts
│   ├── types.ts
│   └── index.ts
│
├── profiles/
│   ├── components/   profile-header · profile-stats · profile-tabs · avatar · edit-profile-form
│   ├── hooks/        use-username-availability
│   ├── actions/      update-profile · complete-onboarding
│   ├── queries/      get-profile-by-username · get-profile-stats · get-countries-visited
│   ├── schemas/      profile.schema.ts · username.schema.ts
│   ├── types.ts
│   └── index.ts
│
├── auth/
│   ├── components/   login-form · signup-form · oauth-buttons · sign-out-button · auth-gate
│   ├── hooks/        use-session · use-user
│   ├── actions/      sign-in · sign-up · sign-out · request-magic-link
│   ├── schemas/      credentials.schema.ts
│   ├── utils.ts      safe next-url redirect helpers
│   └── index.ts
│
├── saves/
│   ├── components/   save-button
│   ├── hooks/        use-save-trip            # optimistic
│   ├── actions/      save-trip · unsave-trip
│   ├── queries/      get-saved-trips · is-trip-saved
│   └── index.ts
│
├── follows/
│   ├── components/   follow-button · follower-list · following-list
│   ├── hooks/        use-follow               # optimistic
│   ├── actions/      follow-user · unfollow-user
│   ├── queries/      get-followers · get-following · is-following
│   └── index.ts
│
└── photos/
    ├── components/   image · gallery · lightbox · cover-image
    ├── hooks/        use-upload               # signed-URL upload + progress
    ├── actions/      register-photo · delete-photo · set-cover
    ├── queries/      get-trip-photos
    ├── utils.ts      storage-path builders · client-side EXIF strip
    └── index.ts
```

---

## `components/` — shared, generic UI

Domain-agnostic and reusable anywhere. These never import from `features/` (that's what keeps them generic and cycle-free).

```
components/
├── ui/             # primitives (shadcn/ui-style): button · input · textarea · select ·
│                   #   dialog · dropdown · popover · tabs · badge · tooltip · skeleton · sheet
├── layout/         # site-header · site-footer · container · page-header · nav · user-menu
├── map/            # OSM + Leaflet, client-only (dynamic import, ssr:false)
│   ├── map-view.tsx
│   ├── map-marker.tsx
│   ├── map-bounds.tsx
│   └── leaflet-setup.ts        # marker-icon fix · tile layer · OSM attribution
├── forms/          # field · form-error · submit-button · RHF + zod wrappers
├── feedback/       # empty-state · error-state · loading shelves · toaster
└── seo/            # json-ld (schema.org Place/TouristTrip) · metadata helpers
```

The Leaflet map is intentionally shared and client-only here; the trip editor and trip page both consume it. Geocoding (an I/O concern) is not here — it lives in `services/geocode`.

---

## `services/` — infrastructure & external systems

Everything that performs I/O against a platform or third party. Domain code in `features/*/{actions,queries}` calls these; pages never call them directly.

```
services/
├── supabase/
│   ├── server.ts        # createServerClient (cookies) — RSC + server actions
│   ├── client.ts        # createBrowserClient — client components
│   ├── middleware.ts    # session-refresh helper used by /middleware.ts
│   └── admin.ts         # service-role client — server-only, never client-imported
├── storage/
│   ├── sign-upload.ts   # create signed upload URLs
│   └── paths.ts         # bucket + key conventions: {uid}/{tripId}/{file}
├── geocode/
│   ├── client.ts        # Nominatim/OSM client (required User-Agent + attribution)
│   └── cache.ts         # normalize query + cache results (cost + policy compliance)
├── rate-limit/
│   └── index.ts         # IP/user limiter: geocode · uploads · auth · follow/save
└── revalidate/
    └── index.ts         # cache-tag / path revalidation helpers invoked by actions
```

`services/supabase/admin.ts` is the only place the service-role key is used; it carries `import 'server-only'` so it can never be bundled into a client component.

---

## `hooks/` — app-wide client hooks

Generic, reusable hooks with no domain knowledge. Domain hooks (e.g. `use-trip-editor`) stay inside their feature.

```
hooks/
├── use-debounce.ts
├── use-media-query.ts
├── use-intersection-observer.ts   # infinite-scroll trigger
├── use-toast.ts
├── use-mounted.ts
└── use-supabase-browser.ts        # memoized browser client
```

---

## `lib/` — pure utilities (no I/O)

Framework-light, side-effect-free helpers and global constants. If a function touches the network, the DB, or `process.env` at call time, it belongs in `services/`, not here. (`env.ts` is the one allowed env touchpoint — it validates and re-exports a typed object at import.)

```
lib/
├── utils.ts          # cn(), assertNever, small helpers
├── env.ts            # zod-validated process.env (server + NEXT_PUBLIC_*)
├── format.ts         # dates · currency · budget bands · distances
├── slug.ts           # slugify + uniqueness helpers
├── constants.ts      # pagination sizes, global limits
└── cache-tags.ts     # canonical revalidation tag builders (trip / profile / destination)
```

---

## `types/` — global & generated types

```
types/
├── database.ts       # GENERATED by `supabase gen types typescript` — do not hand-edit
├── supabase.ts       # ergonomic aliases: Tables<>, Enums<>, TablesInsert<>, TablesUpdate<>
├── api.ts            # request/response shapes for route handlers
└── index.ts          # shared app-wide & utility types
```

`database.ts` is the single source of truth for row shapes; each feature's `types.ts` composes from it (e.g. `TripWithDays = Tables<'trips'> & { days: ... }`) so types stay in sync with migrations.

---

## `config/` — static configuration

```
config/
├── site.ts           # name · url · description · social handles
├── nav.ts            # header/footer nav items
└── routes.ts         # typed href builders — the single source of URL truth
```

`routes.ts` centralizes URL construction (`routes.trip(username, slug)`), so route-shape changes are a one-file edit rather than a codebase-wide grep.

---

## `supabase/`, `public/`, `e2e/`

```
supabase/
├── config.toml
├── seed.sql                       # dev seed data
├── migrations/                    # authored previously
│   ├── 20260101000000_extensions_enums_functions.sql
│   ├── 20260101000001_tables.sql
│   ├── … (counters · rls · rpc · explore_view · storage)
│   └── README.md
└── functions/
    └── refresh-destinations/      # Edge Function alt. to pg_cron for the matview

public/
├── icons/
├── images/                        # marketing imagery + OG fallback
└── favicon.ico

e2e/
├── auth.spec.ts
├── publish-flow.spec.ts
├── fork-flow.spec.ts              # the core loop — highest-value test
└── fixtures/
```

Unit tests are colocated next to source as `*.test.ts(x)` inside the relevant feature; only end-to-end specs live in `e2e/`.

---

## Conventions reference

### Data flow (one direction, predictable)

- **Reads:** RSC page → `features/<x>/queries/get-*.ts` (marked `import 'server-only'`) → `services/supabase/server.ts`. RLS does the authorization.
- **Writes:** client component → `features/<x>/actions/*.ts` (`'use server'`) → validate with the feature's zod schema → Supabase (or RPC for `publish_trip` / `copy_trip`) → revalidate via `services/revalidate`.
- **Non-RSC needs only:** `app/api/*` route handlers (uploads, geocode, cron, revalidate, OG).

### Server / client boundaries

- `queries/` and `services/supabase/admin.ts` carry `import 'server-only'`.
- `actions/` files start with `'use server'`.
- The browser Supabase client appears only in client components (`'use client'`).

### Import boundaries (lint-enforceable)

- `app/` may import any feature and any shared folder.
- A feature imports shared folders freely, and other features **only via their `index.ts`** — no deep cross-feature imports.
- `components/`, `lib/`, `hooks/`, `services/`, `types/`, `config/` must **not** import from `features/`.

### Naming

- Files: `kebab-case`. React components: `PascalCase`. Hooks: `use-*.ts`.
- Queries: `get-*.ts` (read intent). Actions: verb-first (`create-trip.ts`). Schemas: `*.schema.ts`.
- Path alias: `@/` → project root (e.g. `@/features/trips`, `@/services/supabase/server`).

### "Where does new code go?" — decision guide

| You're adding… | Put it in |
|---|---|
| A page or URL | `app/(group)/…/page.tsx` |
| A signed-upload / geocode / cron / revalidate endpoint | `app/api/…/route.ts` |
| Domain UI (a trip card, follow button) | `features/<x>/components/` |
| A reusable, domain-free widget (button, dialog, map) | `components/` |
| A data write (mutation) | `features/<x>/actions/` |
| A data read for a page | `features/<x>/queries/` |
| Input validation | `features/<x>/schemas/*.schema.ts` |
| A client hook tied to a domain | `features/<x>/hooks/` |
| A generic client hook (debounce, media query) | `hooks/` |
| A Supabase/Storage/OSM client or rate-limiter | `services/` |
| A pure helper (format, slug, cn) | `lib/` |
| A composite type | `features/<x>/types.ts` (global → `types/`) |
| A URL builder | `config/routes.ts` |
```
