import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be 30 characters or fewer")
  .regex(
    /^[a-z0-9_-]+$/,
    "Username can only contain lowercase letters, numbers, underscores, and hyphens",
  );

export const onboardingSchema = z.object({
  username: usernameSchema,
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(60, "Display name must be 60 characters or fewer"),
  bio: z.string().max(280, "Bio must be 280 characters or fewer").optional(),
});

export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(60, "Display name must be 60 characters or fewer"),
  bio: z.string().max(280, "Bio must be 280 characters or fewer").optional(),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
