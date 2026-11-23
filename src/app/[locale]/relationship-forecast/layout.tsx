import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Relationship Forecast — Next 12 Months for Two People",
    description: "Enter two birth dates to see a compatibility score and the next 12 months of the relationship. Dated windows for attraction, emotion, commitment, and tension. Not a marriage or breakup prediction.",
    ogTitle: "Relationship Forecast — AstrologyForLove",
    ogDescription: "A score for how two charts meet, then the peak dates in the year ahead.",
    href: "/relationship-forecast",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
