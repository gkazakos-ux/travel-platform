import { type NextRequest } from "next/server";
import { updateSession } from "@/services/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Refreshes the Supabase auth session on every request so Server Components
  // and Server Actions always receive a valid (non-expired) token.
  // Route protection for the (app) group is enforced in app/(app)/layout.tsx
  // via supabase.auth.getUser() — the authoritative, tamper-proof check.
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
