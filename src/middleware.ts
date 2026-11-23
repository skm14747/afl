import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { isPublishedLocale, defaultLocale, type Locale } from "./i18n/locales";
import { isTranslatedRoute } from "./i18n/translated-routes";

const intlMiddleware = createMiddleware(routing);

/**
 * Reverse-resolve the internal href from a localized pathname.
 * e.g. "/de/partnerhoroskop" → locale "de", href "/synastry-chart"
 */
function resolveHref(locale: string, segments: string[]): string | null {
  const restPath = "/" + segments.slice(1).join("/");
  const pathnames = routing.pathnames as Record<string, string | Record<string, string>>;
  for (const [href, mapping] of Object.entries(pathnames)) {
    if (typeof mapping === "string") {
      if (mapping === restPath) return href;
    } else {
      if (mapping[locale as Locale] === restPath) return href;
    }
  }
  return null;
}

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] && routing.locales.includes(segments[0] as never)
    ? segments[0]
    : defaultLocale;

  if (!isPublishedLocale(locale)) {
    const href = resolveHref(locale, segments);
    const translated = href !== null && isTranslatedRoute(locale as Locale, href);
    if (!translated) {
      response.headers.set("X-Robots-Tag", "noindex, follow");
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/(en|es|fr|de|pt|hi|it|ja|id|ar)/:path*",
    "/((?!_next|_vercel|api|icon|apple-icon|opengraph-image|.*\\..*).*)",
  ],
};
