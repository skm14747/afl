import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Relationship Numerology — Life Path Compatibility | AstrologyForLove",
  description: "Calculate Life Path numbers and discover numerological relationship compatibility. Understand shared tendencies, strengths, and potential challenges.",
  openGraph: {
    title: "Relationship Numerology — AstrologyForLove",
    description: "Life Path number compatibility calculator for relationships.",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
