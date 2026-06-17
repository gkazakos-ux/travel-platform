import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/services/supabase/server";
import { safeNextUrl } from "@/features/auth/utils";
import { routes } from "@/config/routes";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as "email" | "magiclink" | null;
  const next = searchParams.get("next");

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      return NextResponse.redirect(new URL(safeNextUrl(next), origin));
    }
  }

  return NextResponse.redirect(
    new URL(`${routes.login()}?error=confirm_failed`, origin),
  );
}
