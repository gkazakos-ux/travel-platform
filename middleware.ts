import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/services/supabase/middleware";

// URL prefixes that require an authenticated session.
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/saved",
  "/settings",
  "/trips/new",
  "/trips/",   // covers /trips/[id]/edit
  "/onboarding", 
];

// Auth pages where an already-authenticated user should not linger.
const AUTH_PAGE_PREFIXES = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Refresh the session and get the current user.
  const { response, user } = await updateSession(request);

  // 2. Protect (app)/ routes — unauthenticated → /login?next=<intended>
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );

  if (isProtected && !user) {
    const intended = pathname + search;
    // Γράφουμε το URL απευθείας εδώ, χωρίς να καλούμε το @/config/routes
    const loginUrl = new URL(
      intended ? `/login?next=${encodeURIComponent(intended)}` : "/login", 
      request.url
    );
    return NextResponse.redirect(loginUrl);
  }

  // 3. Redirect authenticated users away from login/signup to dashboard.
  const isAuthPage = AUTH_PAGE_PREFIXES.some((p) => pathname.startsWith(p));
  if (isAuthPage && user) {
    // Γράφουμε το URL του dashboard απευθείας εδώ
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
// trigger fresh build
