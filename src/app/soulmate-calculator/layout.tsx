import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Soulmate Calculator — Romantic Astrology Profile | AstrologyForLove",
  description: "Explore your Venus, Moon, and Mars placements to understand your romantic tendencies, partner preferences, and cosmic love patterns.",
  openGraph: {
    title: "Soulmate Calculator — AstrologyForLove",
    description: "Discover your astrological love profile and romantic tendencies.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
