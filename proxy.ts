import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, hasLocale, type Locale } from "@/lib/i18n/config";

/** Picks a language for a request with no prefix: the one the visitor chose
 * before (cookie), else the first browser language we publish in, else
 * English. */
function pickLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(saved)) return saved;

  const preferred = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    const base = tag.split("-")[0];
    if (hasLocale(base)) return base;
  }
  return defaultLocale;
}

/**
 * Every public page lives under /{lang}. A request without the prefix (the
 * bare domain, an old link such as /about) is redirected to the same path
 * in the visitor's language. The admin dashboard, Next internals, metadata
 * routes and static files are left alone.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (hasLocale(first)) {
    // Arriving on a prefixed URL (a link someone shared) is a choice too:
    // keep it for the next unprefixed visit.
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      response.cookies.set(LOCALE_COOKIE, first, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return response;
  }

  const url = request.nextUrl.clone();
  const lang = pickLocale(request);
  url.pathname = pathname === "/" ? `/${lang}` : `/${lang}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Everything except /admin, Next internals, robots/sitemap and any path
    // with a file extension (images, videos, icons, the share image…).
    "/((?!admin|_next|robots\\.txt|sitemap\\.xml|.*\\.[\\w]+$).*)",
  ],
};
