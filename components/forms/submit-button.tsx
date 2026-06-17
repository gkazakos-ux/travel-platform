"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui/button";

interface SubmitButtonProps {
  label: string;
  loadingLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function SubmitButton({
  label,
  loadingLabel,
  variant = "primary",
  size = "md",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      isLoading={pending}
      className={className}
    >
      {pending ? (loadingLabel ?? label) : label}
    </Button>
  );
}
