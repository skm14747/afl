import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Twin Flame Calculator — Soul Connection Indicators",
    description: "Explore astrological indicators of deep soul connections. Examine Venus-Mars contacts, Moon bonds, Sun-Moon exchanges, and Saturn karmic links.",
    ogTitle: "Twin Flame Calculator — AstrologyForLove",
    ogDescription: "Examine synastry indicators associated with twin flame connections.",
    href: "/twin-flame-calculator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
