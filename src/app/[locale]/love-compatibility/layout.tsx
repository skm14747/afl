import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Love Compatibility Calculator — Zodiac Sign Compatibility",
    description: "Discover your zodiac love compatibility. Compare two signs to reveal emotional connection, communication, romantic chemistry, shared values, and long-term potential.",
    ogTitle: "Love Compatibility Calculator — AstrologyForLove",
    ogDescription: "Compare zodiac signs for love compatibility. Emotional, romantic, and long-term relationship insights.",
    href: "/love-compatibility",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
