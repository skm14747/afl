import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Moon Sign Compatibility Calculator — Emotional Harmony",
    description: "Compare Moon placements to reveal emotional compatibility and nurturing styles. Free calculator using real ephemeris data.",
    ogTitle: "Moon Sign Compatibility — AstrologyForLove",
    ogDescription: "Compare Moon signs for emotional compatibility and nurturing style alignment.",
    href: "/moon-sign-compatibility",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
