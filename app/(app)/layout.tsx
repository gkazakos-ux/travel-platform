import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/services/supabase/server";
import { routes } from "@/config/routes";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. Έλεγχος αν ο χρήστης είναι συνδεδεμένος
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const headersList = await headers();
    const pathname = headersList.get("x-invoke-path") ?? routes.dashboard();
    redirect(routes.login(pathname));
  }

  // 2. Έλεγχος Onboarding (αν έχει βάλει username)
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.username) {
    redirect(routes.onboarding());
  }

  // 3. ΕΠΙΣΤΡΟΦΗ ΦΟΥΛ ΟΘΟΝΗΣ (Βγάλαμε το SiteHeader και τα max-w)
  return <div className="w-full min-h-screen bg-[#F8F9FA]">{children}</div>;
}
