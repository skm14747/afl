import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { OrganizationJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.astrologyforlove.com"),
  title: {
    default: "Love Astrology & Zodiac Compatibility | AstrologyForLove",
    template: "%s | AstrologyForLove",
  },
  description:
    "Check zodiac compatibility for love, a soulmate, or marriage. Free Venus, Moon, and birth-chart tools calculate real planetary positions in your browser.",
  keywords: [
    "zodiac compatibility", "love compatibility", "astrology calculator",
    "venus sign calculator", "moon sign compatibility", "soulmate calculator",
    "birth chart compatibility", "synastry chart", "composite chart",
    "marriage compatibility", "twin flame calculator", "kundli matching",
    "relationship astrology", "zodiac love", "free astrology calculator",
  ],
  authors: [{ name: "AstrologyForLove" }],
  creator: "AstrologyForLove",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AstrologyForLove",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AstrologyForLove — Free Zodiac Compatibility Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationJsonLd />
      <SoftwareApplicationJsonLd />
      {children}
    </>
  );
}
