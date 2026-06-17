"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/features/auth/actions/sign-out";

interface SignOutButtonProps {
  className?: string;
}

export function SignOutButton({ className }: SignOutButtonProps) {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant="ghost" size="sm" className={className}>
        Sign out
      </Button>
    </form>
  );
}
