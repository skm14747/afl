import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Free Synastry Chart Calculator — Compare Two Birth Charts",
    description: "Generate a free synastry chart from two birth dates. See every planet-to-planet aspect, house overlays, and relationship themes between two natal charts. No signup required.",
    ogTitle: "Free Synastry Chart Calculator — AstrologyForLove",
    ogDescription: "Compare two birth charts and see the aspects that spark, soothe, and challenge your relationship.",
    href: "/synastry-chart",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
