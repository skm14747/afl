import type { MetadataRoute } from "next";
import { locales, localePublicationStatus } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { getSitemapTools } from "@/lib/tool-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://astrologyforlove.com";

  // Build route list from the tool registry (live tools only)
  const toolRoutes = getSitemapTools().map((tool) => ({
    path: `/${tool.id}`,
    priority: tool.sitemapPriority,
    changeFrequency: "weekly" as const,
  }));

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    ...toolRoutes,
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
