import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Composite Chart Calculator — Relationship Midpoint Chart",
    description: "Calculate a composite chart from two birth charts. See the midpoint relationship chart and, when birth times and cities are known, the Davison chart.",
    ogTitle: "Composite Chart Calculator — AstrologyForLove",
    ogDescription: "A tropical composite chart of a relationship, calculated in the browser.",
    href: "/composite-chart",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
