import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Venus–Mars Attraction Calculator — Romantic Chemistry",
  description:
    "Compare two birth charts for Venus–Mars cross-aspects. See which contacts create magnetic pull, romantic friction, and physical chemistry between two people.",
  ogTitle: "Venus–Mars Attraction Calculator — AstrologyForLove",
  ogDescription:
    "Venus meets Mars across two charts. See where the chemistry sparks and where it challenges.",
  href: "/venus-mars-attraction",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
