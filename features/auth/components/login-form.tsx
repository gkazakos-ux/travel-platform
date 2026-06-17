"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Field } from "@/components/forms/field";
import { FormError } from "@/components/forms/form-error";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OAuthButtons } from "./oauth-buttons";
import {
  signInAction,
  requestMagicLinkAction,
} from "@/features/auth/actions/sign-in";
import type { ActionResult } from "@/types";
import { routes } from "@/config/routes";

const initialState: ActionResult = { success: false, error: "" };

interface LoginFormProps {
  next?: string;
}

export function LoginForm({ next }: LoginFormProps) {
  const [mode, setMode] = useState<"password" | "magic-link" | "magic-sent">(
    "password",
  );
  const [passwordState, passwordAction] = useActionState(
    signInAction,
    initialState,
  );
  const [magicState, magicAction] = useActionState(
    requestMagicLinkAction,
    initialState,
  );

  useEffect(() => {
    if (magicState.success) setMode("magic-sent");
  }, [magicState.success]);

  if (mode === "magic-sent") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <p className="font-medium text-green-800">Check your email</p>
        <p className="mt-1 text-sm text-green-700">
          We sent a magic link. Click it to sign in.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-4"
          onClick={() => setMode("password")}
        >
          Back to sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <OAuthButtons next={next} />

      <div className="flex items-center gap-3">
        <hr className="flex-1 border-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <hr className="flex-1 border-gray-200" />
      </div>

      {mode === "password" ? (
        <form action={passwordAction} className="flex flex-col gap-4">
          {next && <input type="hidden" name="next" value={next} />}
          <FormError
            message={
              !passwordState.success && passwordState.error
                ? passwordState.error
                : null
            }
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
          <Field label="Password" htmlFor="password" required>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
          </Field>
          <SubmitButton
            label="Sign in"
            loadingLabel="Signing in…"
            className="w-full"
          />
          <button
            type="button"
            className="text-sm text-center text-indigo-600 hover:underline"
            onClick={() => setMode("magic-link")}
          >
            Sign in with a magic link instead
          </button>
        </form>
      ) : (
        <form
          action={magicAction}
          className="flex flex-col gap-4"
        >
          <FormError
            message={
              !magicState.success && magicState.error ? magicState.error : null
            }
          />
          <Field label="Email" htmlFor="magic-email" required>
            <Input
              id="magic-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </Field>
          <SubmitButton
            label="Send magic link"
            loadingLabel="Sending…"
            className="w-full"
          />
          <button
            type="button"
            className="text-sm text-center text-indigo-600 hover:underline"
            onClick={() => setMode("password")}
          >
            Sign in with password instead
          </button>
        </form>
      )}

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href={routes.signup(next)}
          className="text-indigo-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
