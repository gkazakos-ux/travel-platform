import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";
import { OnboardingForm } from "@/features/profiles/components/onboarding-form";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Set up your profile",
};

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(routes.login());

  // If the user already completed onboarding (has a username), skip this page
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.username) redirect(routes.dashboard());

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Set up your profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Choose a username so others can find you
        </p>
      </div>
      <OnboardingForm />
    </div>
  );
}
