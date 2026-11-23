/**
 * Per-locale translated-route allowlist.
 *
 * A draft locale stays noindex everywhere EXCEPT the hrefs listed here.
 * When an href is listed for a locale, that one URL:
 *   - drops noindex (middleware and layout)
 *   - gets lang={locale} instead of lang="en"
 *   - appears in the sitemap with hreflang
 *
 * Adding an entry here does NOT flip the whole locale to "published".
 * It only opens one page at a time.
 */

import type { Locale } from "./locales";

/**
 * Map of locale → set of internal hrefs that have been translated.
 * Use the internal href (the key in routing.pathnames), not the localized slug.
 */
export const translatedRoutes: Partial<Record<Locale, Set<string>>> = {
  hi: new Set(["/kundli-matching"]),
  id: new Set(["/weton-jodoh"]),
  de: new Set(["/synastry-chart"]),
  es: new Set(["/love-compatibility", "/synastry-chart"]),
  it: new Set(["/love-compatibility", "/synastry-chart"]),
  ar: new Set(["/love-compatibility", "/synastry-chart"]),
  fr: new Set(["/synastry-chart"]),
  pt: new Set(["/synastry-chart"]),
  ja: new Set(["/synastry-chart"]),
};

/** Check whether a specific href is translated for a draft locale. */
export function isTranslatedRoute(locale: Locale, href: string): boolean {
  return translatedRoutes[locale]?.has(href) ?? false;
}
