import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { defaultLocale, locales, localePublicationStatus, type Locale } from "@/i18n/locales";
import { getSitemapTools } from "@/lib/tool-registry";
import { translatedRoutes } from "@/i18n/translated-routes";
import { allPairSlugs } from "@/lib/sign-pairs";
import { getAllGuideSlugs } from "@/lib/editorial-content";
import { getAllPostSlugs } from "@/lib/blog";

const SITE = "https://www.astrologyforlove.com";

type AppHref = Parameters<typeof getPathname>[0]["href"];

function absoluteUrl(locale: Locale, href: AppHref): string {
  if (href === "/") return SITE;
  return new URL(getPathname({ locale, href }), SITE).toString();
}

/** Build hreflang map for a raw URL path (e.g. "/blog/my-post") that isn't in routing pathnames. */
function buildRawHreflang(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    if (localePublicationStatus[loc] === "published") {
      languages[loc] = loc === defaultLocale
        ? `${SITE}${path}`
        : `${SITE}/${loc}${path}`;
    }
  }
  languages["x-default"] = `${SITE}${path}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const published = locales.filter(
    (locale) => localePublicationStatus[locale] === "published"
  );
  const ogImageUrl = `${SITE}/opengraph-image`;

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
    const availableLocales = locales.filter(
      (loc) =>
        localePublicationStatus[loc] === "published" ||
        translatedRoutes[loc]?.has(route.href as string),
    );
    if (availableLocales.length === 0) continue;

    const languages: Record<string, string> = {};
    for (const loc of availableLocales) {
      languages[loc] = absoluteUrl(loc, route.href);
    }
    languages["x-default"] = absoluteUrl(defaultLocale, route.href);

    for (const loc of availableLocales) {
      const isDefault = loc === defaultLocale;
      entries.push({
        url: absoluteUrl(loc, route.href),
        changeFrequency: "weekly" as const,
        priority: route.priority,
        images: isDefault && route.href === "/" ? [ogImageUrl] : undefined,
        alternates: { languages },
      });
    }
  }

  // Blog index
  entries.push({
    url: `${SITE}/blog`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    alternates: { languages: buildRawHreflang("/blog") },
  });

  // Blog posts
  for (const postSlug of getAllPostSlugs()) {
    entries.push({
      url: `${SITE}/blog/${postSlug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: buildRawHreflang(`/blog/${postSlug}`) },
    });
  }

  // Compatibility hub
  entries.push({
    url: `${SITE}/compatibility`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: { languages: buildRawHreflang("/compatibility") },
  });

  // Editorial guide hub page
  entries.push({
    url: `${SITE}/guides`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: { languages: buildRawHreflang("/guides") },
  });

  // Individual editorial guides
  for (const guideSlug of getAllGuideSlugs()) {
    entries.push({
      url: `${SITE}/guides/${guideSlug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: buildRawHreflang(`/guides/${guideSlug}`) },
    });
  }

  for (const slug of allPairSlugs()) {
    entries.push({
      url: `${SITE}/compatibility/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: buildRawHreflang(`/compatibility/${slug}`) },
    });
  }

  return entries;
}
