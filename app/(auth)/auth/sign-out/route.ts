import { NextResponse } from "next/server";
import { createClient } from "@/services/supabase/server";
import { routes } from "@/config/routes";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL(routes.login(), process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"));
}
