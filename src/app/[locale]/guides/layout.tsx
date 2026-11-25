import type { Metadata } from "next";
import { buildHreflangLanguages } from "@/lib/seo";

const SITE = "https://www.astrologyforlove.com";

export const metadata: Metadata = {
  title: "Love Astrology Guides — Free Educational Articles | AstrologyForLove",
  description:
    "Free guides on zodiac compatibility, Venus signs, synastry, Moon compatibility, marriage astrology, soulmate connections, and more. Real astrological education for love.",
  alternates: {
    canonical: `${SITE}/guides`,
    languages: buildHreflangLanguages("/guides"),
  },
  openGraph: {
    title: "Love Astrology Guides | AstrologyForLove",
    description:
      "Educational articles on zodiac compatibility, Venus and Moon signs, synastry, marriage astrology, and the celestial mechanics of love.",
    url: `${SITE}/guides`,
    siteName: "AstrologyForLove",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Love Astrology Guides — AstrologyForLove",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Astrology Guides | AstrologyForLove",
    description:
      "Educational articles on zodiac compatibility, Venus signs, synastry, Moon signs, and love astrology.",
    images: [`${SITE}/opengraph-image`],
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
