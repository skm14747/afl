import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Love Compatibility Calculator — Zodiac Sign Compatibility | AstrologyForLove",
  description: "Discover your zodiac love compatibility. Compare two signs to reveal emotional connection, communication, romantic chemistry, shared values, and long-term potential.",
  openGraph: {
    title: "Love Compatibility Calculator — AstrologyForLove",
    description: "Compare zodiac signs for love compatibility. Emotional, romantic, and long-term relationship insights.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
