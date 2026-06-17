import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/services/supabase/middleware";
import { routes } from "@/config/routes";

// URL prefixes that require an authenticated session.
// Matches the (app) route group without depending on Next.js internals.
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/saved",
  "/settings",
  "/trips/new",
  "/trips/",   // covers /trips/[id]/edit
  "/onboarding", // also protected — must be logged in to set a username
];

// Auth pages where an already-authenticated user should not linger.
const AUTH_PAGE_PREFIXES = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Refresh the session and get the current user in a single round-trip.
  const { response, user } = await updateSession(request);

  // 2. Protect (app)/ routes — unauthenticated → /login?next=<intended>
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );

  if (isProtected && !user) {
    const intended = pathname + search;
    const loginUrl = new URL(routes.login(intended), request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Redirect authenticated users away from login/signup to dashboard.
  const isAuthPage = AUTH_PAGE_PREFIXES.some((p) => pathname.startsWith(p));
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL(routes.dashboard(), request.url));
  }

  // Return the response that already carries the refreshed session cookies.
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and static assets.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
