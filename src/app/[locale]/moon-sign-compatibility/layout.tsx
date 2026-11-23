import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Moon Sign Compatibility Calculator — Emotional Connection | AstrologyForLove",
  description: "Compare Moon signs to understand your emotional compatibility. Discover how you and your partner nurture each other, process feelings, and create emotional safety.",
  openGraph: {
    title: "Moon Sign Compatibility — AstrologyForLove",
    description: "Compare Moon placements for emotional compatibility insights.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
