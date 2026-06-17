import Link from "next/link";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-6 py-4">
        <Link
          href={routes.home()}
          className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
        >
          {siteConfig.name}
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
}
