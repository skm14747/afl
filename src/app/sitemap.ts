import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { defaultLocale, locales, localePublicationStatus, type Locale } from "@/i18n/locales";
import { getSitemapTools } from "@/lib/tool-registry";

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
    { href: "/privacy", priority: 0.3 },
    { href: "/terms", priority: 0.3 },
    { href: "/contact", priority: 0.3 },
    ...getSitemapTools().map((tool) => ({
      href: `/${tool.id}` as AppHref,
      priority: tool.sitemapPriority,
    })),
  ];

  return routes.flatMap((route) =>
    published.map((locale) => {
      const languages: Record<string, string> = {};
      for (const alternate of published) {
        languages[alternate] = absoluteUrl(alternate, route.href);
      }
      languages["x-default"] = absoluteUrl(defaultLocale, route.href);

      return {
        url: absoluteUrl(locale, route.href),
        changeFrequency: "weekly" as const,
        priority: route.priority,
        alternates: { languages },
      };
    })
  );
}
