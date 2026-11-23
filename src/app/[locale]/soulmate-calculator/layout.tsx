import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Soulmate Calculator — One-Person Love Profile",
    description: "One birth chart. Venus, Moon, and Mars describe how you love and what you look for in a partner. This is not a reading of two people.",
    ogTitle: "Soulmate Calculator — AstrologyForLove",
    ogDescription: "A one-person love profile from Venus, Moon, and Mars. Not a two-chart synastry reading.",
    href: "/soulmate-calculator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
