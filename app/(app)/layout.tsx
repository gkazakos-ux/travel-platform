import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";
import { SiteHeader } from "@/components/layout/site-header";
import { routes } from "@/config/routes";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // next param lets us return here after login
    redirect(routes.login());
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </>
  );
}
