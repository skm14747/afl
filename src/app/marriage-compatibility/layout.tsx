import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Marriage Compatibility Calculator — Long-term Partnership | AstrologyForLove",
  description: "Compare natal charts for marriage and long-term compatibility. Analyze emotional bonds, communication, romance, shared values, and commitment indicators.",
  openGraph: {
    title: "Marriage Compatibility — AstrologyForLove",
    description: "Chart-based marriage compatibility analysis with real ephemeris calculations.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
