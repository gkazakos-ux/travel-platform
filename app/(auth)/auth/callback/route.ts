import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/services/supabase/server";
import { safeNextUrl } from "@/features/auth/utils";
import { routes } from "@/config/routes";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // New sign-ups may need onboarding — check profile completion
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .maybeSingle();

        if (!profile?.username) {
          return NextResponse.redirect(
            new URL(routes.onboarding(), origin),
          );
        }
      }

      return NextResponse.redirect(
        new URL(safeNextUrl(next), origin),
      );
    }
  }

  return NextResponse.redirect(
    new URL(`${routes.login()}?error=auth_callback_failed`, origin),
  );
}
