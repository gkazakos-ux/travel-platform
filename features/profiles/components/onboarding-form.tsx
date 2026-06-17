"use client";

import { useActionState } from "react";
import { Field } from "@/components/forms/field";
import { FormError } from "@/components/forms/form-error";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { completeOnboardingAction } from "@/features/profiles/actions/complete-onboarding";
import type { ActionResult } from "@/types";

const initialState: ActionResult = { success: false, error: "" };

export function OnboardingForm() {
  const [state, action] = useActionState(completeOnboardingAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-5">
      <FormError
        message={!state.success && state.error ? state.error : null}
      />

      <Field
        label="Username"
        htmlFor="username"
        required
        hint="Lowercase letters, numbers, underscores, and hyphens only"
      >
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 select-none">
            @
          </span>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="your_username"
            className="pl-7"
            required
          />
        </div>
      </Field>

      <Field label="Display name" htmlFor="displayName" required>
        <Input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="name"
          placeholder="Your Name"
          required
        />
      </Field>

      <Field
        label="Bio"
        htmlFor="bio"
        hint="Tell others a little about yourself (optional)"
      >
        <Textarea
          id="bio"
          name="bio"
          placeholder="Traveler, photographer, always planning the next trip…"
          rows={3}
        />
      </Field>

      <SubmitButton
        label="Finish setup"
        loadingLabel="Saving…"
        className="w-full"
      />
    </form>
  );
}
