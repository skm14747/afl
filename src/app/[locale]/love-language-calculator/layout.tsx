import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Astrology Love Language Calculator — Discover How You Give & Receive Love | AstrologyForLove",
  description: "Find your astrological love language through Venus, Moon, and Mars placements. Discover whether you express love through words, touch, gifts, service, or quality time — based on your birth chart.",
  openGraph: {
    title: "Astrology Love Language Calculator — AstrologyForLove",
    description: "Venus reveals how you give love. Moon reveals how you receive it. Mars reveals how you pursue it. Discover your astrological love language.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
