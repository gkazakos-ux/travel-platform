import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Προσωρινά απενεργοποιημένο το Supabase για να βρούμε το bug
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
