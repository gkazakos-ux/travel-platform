import Link from "next/link";
import { createClient } from "@/services/supabase/server";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href={routes.home()}
          className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href={routes.explore()}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Explore
          </Link>
          <Link
            href={routes.search()}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Search
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href={routes.dashboard()}>
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href={routes.login()}>
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href={routes.signup()}>
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
