import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Weton Jodoh — Javanese Love-Match Calculator",
  description:
    "Enter two birth dates and see each person's weton (Javanese weekday and market day), the neptu total, and the traditional jodoh reading. A cultural tool, not a verdict.",
  ogTitle: "Weton Jodoh Calculator — AstrologyForLove",
  ogDescription:
    "Javanese weton love-match from two birth dates. Neptu, pasaran, and the eight jodoh labels.",
  href: "/weton-jodoh",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
