import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Zodiac Love Sign Guide — How Each Sign Loves",
    description: "Explore all 12 zodiac signs in love. Learn how each sign expresses affection, their relationship strengths, challenges, and most compatible matches.",
    ogTitle: "Zodiac Love Guide — AstrologyForLove",
    ogDescription: "Complete guide to how each zodiac sign loves and relates.",
    href: "/zodiac-love",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
