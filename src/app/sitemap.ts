import type { MetadataRoute } from "next";

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
    { path: "/design-system", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
