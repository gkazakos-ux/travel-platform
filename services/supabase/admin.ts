import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { serverEnv } from "@/lib/env.server";

/**
 * Service-role Supabase client. Bypasses RLS entirely — use only for
 * narrowly-scoped trusted server tasks (scheduled jobs, moderation).
 * Never import this from a client component or expose its result to the browser.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    serverEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
