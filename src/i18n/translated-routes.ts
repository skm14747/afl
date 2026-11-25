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
/**
 * All locales are now published with full tools.json translations.
 * This allowlist is kept for future use if a new locale is added as draft.
 * When a locale is "published" in locales.ts, this map is not consulted.
 */
export const translatedRoutes: Partial<Record<Locale, Set<string>>> = {};

/** Check whether a specific href is translated for a draft locale. */
export function isTranslatedRoute(locale: Locale, href: string): boolean {
  return translatedRoutes[locale]?.has(href) ?? false;
}
