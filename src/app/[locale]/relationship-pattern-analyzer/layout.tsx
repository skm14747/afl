import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Relationship Pattern Analyzer — Uncover Your Love Life Themes | AstrologyForLove",
  description: "Why do you keep attracting the same type? Analyze your Venus, Mars, Moon, and Saturn placements to uncover recurring relationship patterns, attachment tendencies, and growth edges.",
  openGraph: {
    title: "Relationship Pattern Analyzer — AstrologyForLove",
    description: "Uncover recurring attraction patterns, attachment tendencies, and relationship growth edges through your natal chart.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
