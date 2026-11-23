import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Venus Sign Calculator — Discover Your Love Planet",
    description: "Calculate your Venus sign using real astronomical ephemeris data. Understand your romantic nature, love language, attraction patterns, and relationship style.",
    ogTitle: "Venus Sign Calculator — AstrologyForLove",
    ogDescription: "Find your Venus sign and understand how you express and receive love.",
    href: "/venus-sign-calculator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
