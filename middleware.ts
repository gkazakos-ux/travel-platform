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
  
  const SECRET_KEY = "open"; // Το μυστικό σου κλειδί
  const urlAccessKey = request.nextUrl.searchParams.get('preview');

  // ─── 1. ΕΛΕΓΧΟΣ ΜΥΣΤΙΚΟΥ ΚΛΕΙΔΙΟΥ (ΞΕΚΛΕΙΔΩΜΑ) ───
  if (urlAccessKey === SECRET_KEY) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('beta_access', 'true', { 
      maxAge: 60 * 60 * 24 * 7, // 7 ημέρες πρόσβαση
      path: '/',
    });
    return response;
  }

  // ─── 2. ΕΞΑΙΡΕΣΕΙΣ ΑΠΟ ΤΟ ΚΛΕΙΔΩΜΑ ───
  if (
    process.env.NODE_ENV === 'development' || 
    pathname === '/maintenance' || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // ─── 3. ΕΛΕΓΧΟΣ ΠΡΟΣΒΑΣΗΣ (ΚΛΕΙΔΩΜΑ) ───
  const hasAccessCookie = request.cookies.has('beta_access');

  if (!hasAccessCookie) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  // ─── 4. ΥΠΑΡΧΩΝ ΚΩΔΙΚΑΣ SUPABASE & AUTH ───
  const { response, user } = await updateSession(request);

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