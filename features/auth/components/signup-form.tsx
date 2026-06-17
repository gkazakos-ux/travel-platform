"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Field } from "@/components/forms/field";
import { FormError } from "@/components/forms/form-error";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { OAuthButtons } from "./oauth-buttons";
import { signUpAction } from "@/features/auth/actions/sign-up";
import type { ActionResult } from "@/types";
import { routes } from "@/config/routes";

const initialState: ActionResult = { success: false, error: "" };

interface SignupFormProps {
  next?: string;
}

export function SignupForm({ next }: SignupFormProps) {
  const [state, action] = useActionState(signUpAction, initialState);

  return (
    <div className="flex flex-col gap-6">
      <OAuthButtons next={next} />

      <div className="flex items-center gap-3">
        <hr className="flex-1 border-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <hr className="flex-1 border-gray-200" />
      </div>

      <form action={action} className="flex flex-col gap-4">
        {next && <input type="hidden" name="next" value={next} />}
        <FormError
          message={!state.success && state.error ? state.error : null}
        />
        <Field label="Email" htmlFor="email" required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </Field>
        <Field label="Password" htmlFor="password" required hint="At least 8 characters">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
          />
        </Field>
        <Field label="Confirm password" htmlFor="confirmPassword" required>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
          />
        </Field>
        <SubmitButton
          label="Create account"
          loadingLabel="Creating account…"
          className="w-full"
        />
      </form>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href={routes.login(next)}
          className="text-indigo-600 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
