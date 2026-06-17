import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/services/supabase/server";
import { SiteHeader } from "@/components/layout/site-header";
import { routes } from "@/config/routes";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // getUser() is the only tamper-proof auth check — never trust cookies alone.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Middleware already handles this redirect, but this is the authoritative
    // server-side guard for cases where middleware is bypassed (e.g. RSC fetch).
    const headersList = await headers();
    const pathname = headersList.get("x-invoke-path") ?? routes.dashboard();
    redirect(routes.login(pathname));
  }

  // Onboarding gate: if the user has no username yet, send them to /onboarding.
  // We check here (not only in the callback route) so direct navigation to
  // /dashboard before onboarding is complete is also caught.
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.username) {
    redirect(routes.onboarding());
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </>
  );
}
