import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Relationship Pattern Analyzer — Uncover Your Love Life Themes",
    description: "Why do you keep attracting the same type? Analyze your Venus, Mars, Moon, and Saturn placements to uncover recurring relationship patterns, attachment tendencies, and growth edges.",
    ogTitle: "Relationship Pattern Analyzer — AstrologyForLove",
    ogDescription: "Uncover recurring attraction patterns, attachment tendencies, and relationship growth edges through your natal chart.",
    href: "/relationship-pattern-analyzer",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
