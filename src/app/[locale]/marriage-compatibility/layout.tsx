import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Marriage Compatibility Calculator — Long-term Partnership",
    description: "Chart-based analysis of emotional, romantic, and long-term partnership potential. Full synastry for marriage readiness.",
    ogTitle: "Marriage Compatibility — AstrologyForLove",
    ogDescription: "Astrological marriage compatibility with Saturn, Moon, and Venus analysis.",
    href: "/marriage-compatibility",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
