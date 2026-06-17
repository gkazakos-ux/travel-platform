import type { Metadata } from "next";
import { createClient } from "@/services/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name")
    .eq("id", user!.id)
    .maybeSingle();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {profile?.display_name
              ? `Welcome back, ${profile.display_name}`
              : "Your dashboard"}
          </h1>
          {profile?.username && (
            <p className="mt-1 text-sm text-gray-500">@{profile.username}</p>
          )}
        </div>
        <Link href={routes.newTrip()}>
          <Button>New itinerary</Button>
        </Link>
      </div>

      {/* Trip list placeholder — implemented in Milestone 2 */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
        <p className="font-medium text-gray-700">No itineraries yet</p>
        <p className="mt-1 text-sm text-gray-500">
          Create your first trip to get started.
        </p>
        <Link href={routes.newTrip()} className="mt-4 inline-block">
          <Button variant="secondary" size="sm">
            Create itinerary
          </Button>
        </Link>
      </div>
    </div>
  );
}
