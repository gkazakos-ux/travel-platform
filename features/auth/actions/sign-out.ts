"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";
import { routes } from "@/config/routes";

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(routes.login());
}
