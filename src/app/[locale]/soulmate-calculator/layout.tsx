import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Soulmate Synastry Calculator — Romantic Destiny",
    description: "Explore deep synastry indicators traditionally associated with soulmate connections. Venus, Moon, Mars, and North Node analysis.",
    ogTitle: "Soulmate Calculator — AstrologyForLove",
    ogDescription: "Discover your astrological soulmate profile through natal chart analysis.",
    href: "/soulmate-calculator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
