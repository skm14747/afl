import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Relationship Numerology — Life Path Compatibility",
    description: "Calculate Life Path numbers and discover numerological relationship compatibility. Understand shared tendencies, strengths, and potential challenges.",
    ogTitle: "Relationship Numerology — AstrologyForLove",
    ogDescription: "Life Path number compatibility calculator for relationships.",
    href: "/relationship-numerology",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
