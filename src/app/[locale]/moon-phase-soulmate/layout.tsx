import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Moon Phase Soulmate Calculator — Free Compatibility Test",
    description: "Enter two birth dates to find each person's birth moon phase and see if your moons make one full moon together. The viral TikTok soulmate test, calculated from real astronomy.",
    ogTitle: "Moon Phase Soulmate Calculator — AstrologyForLove",
    ogDescription: "Do your birth moon phases complete a full moon? Find out with the free moon phase soulmate test.",
    href: "/moon-phase-soulmate",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
