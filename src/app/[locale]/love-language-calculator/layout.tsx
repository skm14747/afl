import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Astrology Love Language Calculator — Venus, Moon & Mars",
    description: "Discover your astrological love language through Venus, Moon, and Mars placements. Understand how you give and receive love.",
    ogTitle: "Love Language Calculator — AstrologyForLove",
    ogDescription: "Find your love language through Venus, Moon, and Mars.",
    href: "/love-language-calculator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
