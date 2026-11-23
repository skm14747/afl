import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Twin Flame Calculator — Soul Connection Indicators | AstrologyForLove",
  description: "Explore astrological indicators of deep soul connections. Examine Venus-Mars contacts, Moon bonds, Sun-Moon exchanges, and Saturn karmic links.",
  openGraph: {
    title: "Twin Flame Calculator — AstrologyForLove",
    description: "Examine synastry indicators associated with twin flame connections.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
