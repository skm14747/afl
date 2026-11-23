import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Birth Chart Compatibility — Relationship Score & Reading",
  description:
    "Enter two birth dates and get a weighted compatibility score across emotional, romantic, and long-term dimensions — plus planet-by-planet insights. No signup required.",
  ogTitle: "Birth Chart Compatibility Score — AstrologyForLove",
  ogDescription:
    "Two birth charts, one compatibility score. Emotional, romantic, and long-term planet-by-planet reading.",
  href: "/birth-chart-compatibility",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
