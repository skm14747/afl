import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Birth Chart Compatibility — Full Synastry Analysis",
    description: "Compare two complete natal charts with full synastry analysis. Examine Sun, Moon, Mercury, Venus, Mars aspects for deep relationship insights.",
    ogTitle: "Birth Chart Compatibility — AstrologyForLove",
    ogDescription: "Full synastry chart comparison with detailed aspect analysis.",
    href: "/birth-chart-compatibility",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
