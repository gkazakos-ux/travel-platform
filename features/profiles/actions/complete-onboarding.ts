"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";
import { onboardingSchema } from "@/features/profiles/schemas/profile.schema";
import { routes } from "@/config/routes";
import type { ActionResult } from "@/types";

export async function completeOnboardingAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    username: formData.get("username"),
    displayName: formData.get("displayName"),
    bio: formData.get("bio") || undefined,
  };

  const parsed = onboardingSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Not authenticated" };
  }

  // Check username availability (case-insensitive via citext column)
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", parsed.data.username)
    .neq("id", user.id)
    .maybeSingle();

  if (existing) {
    return { success: false, error: "That username is already taken" };
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      username: parsed.data.username,
      display_name: parsed.data.displayName,
      bio: parsed.data.bio ?? null,
    })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  redirect(routes.dashboard());
}
