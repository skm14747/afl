import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { defaultLocale, locales, localePublicationStatus, type Locale } from "@/i18n/locales";
import { getSitemapTools } from "@/lib/tool-registry";
import { translatedRoutes } from "@/i18n/translated-routes";
import { allPairSlugs } from "@/lib/sign-pairs";

const SITE = "https://astrologyforlove.com";

type AppHref = Parameters<typeof getPathname>[0]["href"];

function absoluteUrl(locale: Locale, href: AppHref): string {
  if (href === "/") return SITE;
  return new URL(getPathname({ locale, href }), SITE).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const published = locales.filter(
    (locale) => localePublicationStatus[locale] === "published"
  );

  const routes: { href: AppHref; priority: number }[] = [
    { href: "/", priority: 1 },
    { href: "/about", priority: 0.5 },
    { href: "/privacy", priority: 0.3 },
    { href: "/terms", priority: 0.3 },
    { href: "/contact", priority: 0.3 },
    ...getSitemapTools().map((tool) => ({
      href: `/${tool.id}` as AppHref,
      priority: tool.sitemapPriority,
    })),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // Which locales have this route available (published or allowlisted)?
    const availableLocales = locales.filter(
      (loc) =>
        localePublicationStatus[loc] === "published" ||
        translatedRoutes[loc]?.has(route.href as string),
    );
    if (availableLocales.length === 0) continue;

    // Build hreflang only across available locales
    const languages: Record<string, string> = {};
    for (const loc of availableLocales) {
      languages[loc] = absoluteUrl(loc, route.href);
    }
    languages["x-default"] = absoluteUrl(defaultLocale, route.href);

    // Emit one entry per available locale
    for (const loc of availableLocales) {
      entries.push({
        url: absoluteUrl(loc, route.href),
        changeFrequency: "weekly" as const,
        priority: route.priority,
        alternates: { languages },
      });
    }
  }

  // Sign-pair pages (78 combinations, English only for now)
  for (const slug of allPairSlugs()) {
    const url = `${SITE}/compatibility/${slug}`;
    entries.push({
      url,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: { en: url, "x-default": url } },
    });
  }

  return entries;
}
