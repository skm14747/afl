import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zodiac Love Sign Guide — How Each Sign Loves | AstrologyForLove",
  description: "Explore all 12 zodiac signs in love. Learn how each sign expresses affection, their relationship strengths, challenges, and most compatible matches.",
  openGraph: {
    title: "Zodiac Love Guide — AstrologyForLove",
    description: "Complete guide to how each zodiac sign loves and relates.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
