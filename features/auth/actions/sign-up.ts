"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";
import { signUpSchema } from "@/features/auth/schemas/credentials.schema";
import { safeNextUrl } from "@/features/auth/utils";
import type { ActionResult } from "@/types";

export async function signUpAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Redirect to onboarding — the profile bootstrap trigger runs on sign-up
  const next = formData.get("next") as string | null;
  redirect(safeNextUrl(next) === "/dashboard" ? "/onboarding" : safeNextUrl(next));
}
