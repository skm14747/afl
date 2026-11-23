import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Ex-Relationship Compatibility — Learn from the Past",
    description: "Reflect on past relationship dynamics through an astrological lens. Understand what worked, what didn't, and what to look for next.",
    ogTitle: "Ex-Relationship Insights — AstrologyForLove",
    ogDescription: "Astrological analysis of past relationship dynamics for growth.",
    href: "/ex-compatibility",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
