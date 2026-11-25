import type { Metadata } from "next";
import {
  getAllGuideSlugs,
  getGuideBySlug,
} from "@/lib/editorial-content";
import { locales, defaultLocale, localePublicationStatus } from "@/i18n/locales";

const SITE = "https://www.astrologyforlove.com";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  const canonical = `${SITE}/guides/${guide.slug}`;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    if (localePublicationStatus[l] === "published") {
      languages[l] = l === defaultLocale
        ? `${SITE}/guides/${guide.slug}`
        : `${SITE}/${l}/guides/${guide.slug}`;
    }
  }
  languages["x-default"] = canonical;

  return {
    title: `${guide.title} | AstrologyForLove`,
    description: guide.metaDescription,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: canonical,
      siteName: "AstrologyForLove",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: `${SITE}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${guide.title} — AstrologyForLove`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.metaDescription,
      images: [`${SITE}/opengraph-image`],
    },
  };
}

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
