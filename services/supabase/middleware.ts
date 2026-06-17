import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { clientEnv } from "@/lib/env.client";

/**
 * Refreshes the Supabase auth session on every request.
 * Returns both the response (with refreshed cookies) and the resolved user
 * so callers can make route-protection decisions without a second round-trip.
 */
export async function updateSession(
  request: NextRequest,
): Promise<{ response: NextResponse; user: User | null }> {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // getUser() validates the JWT and refreshes the session if expired.
  // This is the only safe way to check auth in middleware — reading cookies
  // directly can be spoofed.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
