import { routes } from "@/config/routes";

const ALLOWED_HOSTS = new Set([
  "localhost",
  process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
    : "",
]);

/**
 * Validates a `next` redirect param so users cannot be redirected to an
 * external host (open-redirect guard).
 */
export function safeNextUrl(next: string | null | undefined): string {
  if (!next) return routes.dashboard();

  try {
    // Relative paths (start with /) are always safe
    if (next.startsWith("/") && !next.startsWith("//")) {
      return next;
    }

    // Absolute URLs — only allow same host
    const url = new URL(next);
    if (ALLOWED_HOSTS.has(url.hostname)) {
      return url.pathname + url.search;
    }
  } catch {
    // Invalid URL — fall through to default
  }

  return routes.dashboard();
}
