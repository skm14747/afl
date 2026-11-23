import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Kundli Matching — 36 Guna, Mangal Dosha, Porutham",
    description: "Vedic kundli matching with Ashtakoota points, Mangal dosha, and the ten Tamil poruthams. Lahiri sidereal. Calculated in the browser.",
    ogTitle: "Kundli Matching — AstrologyForLove",
    ogDescription: "36 guna, Mangal dosha, and porutham from sidereal Moon and Mars.",
    href: "/kundli-matching",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
