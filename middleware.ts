import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./services/supabase/session";

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

  // ──────────────────────────────────────────────────────────────
  // ─── 1. ΣΥΣΤΗΜΑ ΚΛΕΙΔΩΜΑΤΟΣ SITE (MAINTENANCE) ───
  // ──────────────────────────────────────────────────────────────
  
  // Εξαιρέσεις για να μη γίνει λούπα ή να μη σπάσουν οι εικόνες/API
// Εξαιρέσεις για να μη γίνει λούπα ή να μη σπάσουν οι εικόνες/API, ή αν είμαστε στο Codespace
  if (
    process.env.NODE_ENV === 'development' || // 👈 ΠΡΟΣΘΕΣΕ ΑΥΤΗ ΤΗ ΓΡΑΜΜΗ!
    pathname === '/maintenance' || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const SECRET_KEY = "open"; // Το μυστικό σου κλειδί
  const hasAccessCookie = request.cookies.has('beta_access');
  const urlAccessKey = request.nextUrl.searchParams.get('preview');

  // Αν ο χρήστης έγραψε το σωστό URL (π.χ. pathlore.gr?preview=open)
  if (urlAccessKey === SECRET_KEY) {
    const response = NextResponse.redirect(new URL(pathname, request.url));
    response.cookies.set('beta_access', 'true', { 
      maxAge: 60 * 60 * 24 * 7, // 7 ημέρες πρόσβαση
      path: '/',
    });
    return response;
  }

  // Αν δεν έχει το cookie πρόσβασης, του δείχνουμε τη σελίδα συντήρησης
  if (!hasAccessCookie) {
    return NextResponse.rewrite(new URL('/maintenance', request.url));
  }

  // ──────────────────────────────────────────────────────────────
  // ─── 2. ΥΠΑΡΧΩΝ ΚΩΔΙΚΑΣ SUPABASE & AUTH (Τρέχει μόνο αν έχεις πρόσβαση) ───
  // ──────────────────────────────────────────────────────────────

  // Refresh the session and get the current user.
  const { response, user } = await updateSession(request);

  // Protect (app)/ routes — unauthenticated → /login?next=<intended>
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );

  if (isProtected && !user) {
    const intended = pathname + search;
    const loginUrl = new URL(
      intended ? `/login?next=${encodeURIComponent(intended)}` : "/login", 
      request.url
    );
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login/signup to dashboard.
  const isAuthPage = AUTH_PAGE_PREFIXES.some((p) => pathname.startsWith(p));
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};