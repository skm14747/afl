import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Mars Sign Compatibility Calculator — Passion, Drive & Chemistry",
    description: "Compare two Mars signs for passion, sexual chemistry, drive, and conflict style. Enter two birth dates to find each person's Mars sign and see how your fire meets.",
    ogTitle: "Mars Sign Compatibility Calculator — AstrologyForLove",
    ogDescription: "Mars rules desire, drive, and how you fight. Compare two Mars placements for passion and chemistry.",
    href: "/mars-sign-compatibility",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
