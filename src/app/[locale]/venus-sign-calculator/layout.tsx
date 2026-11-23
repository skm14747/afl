import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Venus Sign Calculator — Discover Your Love Planet | AstrologyForLove",
  description: "Calculate your Venus sign using real astronomical ephemeris data. Understand your romantic nature, love language, attraction patterns, and relationship style.",
  openGraph: {
    title: "Venus Sign Calculator — AstrologyForLove",
    description: "Find your Venus sign and understand how you express and receive love.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
