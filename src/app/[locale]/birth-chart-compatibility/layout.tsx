import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Birth Chart Compatibility — Full Synastry Analysis | AstrologyForLove",
  description: "Compare two complete natal charts with full synastry analysis. Examine Sun, Moon, Mercury, Venus, Mars aspects for deep relationship insights.",
  openGraph: {
    title: "Birth Chart Compatibility — AstrologyForLove",
    description: "Full synastry chart comparison with detailed aspect analysis.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
