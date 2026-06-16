import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { clientEnv } from "@/lib/env.client";

/**
 * Supabase client for Client Components. Construct one per usage site
 * (or memoize via hooks/use-supabase-browser.ts) — the SSR helper is
 * lightweight and safe to recreate.
 */
export function createClient() {
  return createBrowserClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
