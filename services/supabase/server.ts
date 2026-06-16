import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";
import { clientEnv } from "@/lib/env.client";

/**
 * Supabase client for Server Components and Server Actions.
 * Reads/writes auth cookies via Next's cookies() API; RLS enforces authorization.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component without a mutable cookie store
            // (e.g. during static rendering). Session refresh in
            // middleware.ts covers this case, so it's safe to ignore here.
          }
        },
      },
    },
  );
}
