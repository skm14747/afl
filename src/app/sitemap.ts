import type { MetadataRoute } from "next";
import { locales, localePublicationStatus } from "@/i18n/locales";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://astrologyforlove.com";

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/love-compatibility", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/venus-sign-calculator", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/moon-sign-compatibility", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/soulmate-calculator", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/marriage-compatibility", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/birth-chart-compatibility", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/twin-flame-calculator", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/relationship-numerology", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/rising-sign-compatibility", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/ex-compatibility", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/zodiac-love", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      if (localePublicationStatus[locale] !== "published") continue;

      const pathnames = routing.pathnames as Record<string, string | Record<string, string>>;
      const pathConfig = pathnames[route.path];
      let localizedPath: string;

      if (typeof pathConfig === "string") {
        localizedPath = pathConfig;
      } else if (pathConfig && typeof pathConfig === "object" && locale in pathConfig) {
        localizedPath = (pathConfig as Record<string, string>)[locale];
      } else {
        localizedPath = route.path;
      }

      entries.push({
        url: `${baseUrl}/${locale}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales
              .filter((l) => localePublicationStatus[l] === "published")
              .map((l) => {
                let lPath: string;
                if (typeof pathConfig === "string") {
                  lPath = pathConfig;
                } else if (pathConfig && typeof pathConfig === "object" && l in pathConfig) {
                  lPath = (pathConfig as Record<string, string>)[l];
                } else {
                  lPath = route.path;
                }
                return [l, `${baseUrl}/${l}${lPath}`];
              })
          ),
        },
      });
    }
  }

  return entries;
}
