import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { defaultLocale, locales, localePublicationStatus } from "@/i18n/locales";

const SITE = "https://astrologyforlove.com";

/**
 * Build static Metadata with canonical, hreflang, and OpenGraph for a tool page.
 *
 * Returns a plain object — no async, no params access — so Next.js 16 Partial
 * Prefetching treats it as static metadata and never blocks the prerender.
 *
 * robots noindex for draft locales is handled in the root [locale] layout.
 */
export function toolMetadata({
  title,
  description,
  ogTitle,
  ogDescription,
  href,
}: {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  href: string;
}): Metadata {
  const canonical = new URL(
    getPathname({ locale: defaultLocale, href: href as never }),
    SITE
  ).toString();

  const publishedLocales = locales.filter(
    (l) => localePublicationStatus[l] === "published"
  );

  const languages: Record<string, string> = {};
  for (const l of publishedLocales) {
    languages[l] = new URL(
      getPathname({ locale: l, href: href as never }),
      SITE
    ).toString();
  }
  languages["x-default"] = canonical;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: "AstrologyForLove",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${SITE}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "AstrologyForLove — Free Zodiac Compatibility Calculators",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [`${SITE}/opengraph-image`],
    },
  };
}
