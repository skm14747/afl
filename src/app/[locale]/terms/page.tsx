import { LegalPage } from "@/components/layout/LegalPage";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Terms",
  description: "AstrologyForLove readings are for reflection. They are not a prediction that two people will marry, stay together, or separate.",
  ogTitle: "Terms — AstrologyForLove",
  ogDescription: "Readings are for reflection, not a verdict on a relationship.",
  href: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms">
      <p>
        The calculators on AstrologyForLove are for reflection and entertainment. A score or a dated window describes a chart pattern. It is not a promise that two people will marry, stay together, or separate, and it is not medical, legal, or financial advice.
      </p>
      <p>
        You are responsible for the birth details you enter, including someone else’s, and for what you do with the reading.
      </p>
    </LegalPage>
  );
}
