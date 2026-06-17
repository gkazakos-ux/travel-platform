"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";
import {
  signInSchema,
  magicLinkSchema,
} from "@/features/auth/schemas/credentials.schema";
import { safeNextUrl } from "@/features/auth/utils";
import type { ActionResult } from "@/types";

export async function signInAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = signInSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  const next = formData.get("next") as string | null;
  redirect(safeNextUrl(next));
}

export async function requestMagicLinkAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = { email: formData.get("email") };

  const parsed = magicLinkSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: undefined };
}
