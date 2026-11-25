const SITE = "https://www.astrologyforlove.com";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "AstrologyForLove",
        url: SITE,
        logo: `${SITE}/opengraph-image`,
        description:
          "Free zodiac compatibility calculators for love, soulmates, and marriage. Real planetary positions from the astronomy-engine ephemeris.",
      }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "AstrologyForLove",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        description:
          "Free zodiac compatibility calculators for love, soulmates, and marriage. Real planetary positions from the astronomy-engine ephemeris.",
        url: SITE,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Love Compatibility Calculator",
          "Venus Sign Calculator",
          "Moon Sign Compatibility",
          "Birth Chart Compatibility",
          "Synastry Chart & Biwheel",
          "Composite & Davison Chart",
          "Marriage Compatibility",
          "Soulmate Calculator",
          "Kundli Matching (36 Guna)",
          "Twin Flame Calculator",
          "Venus–Mars Attraction",
          "Relationship Forecast",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "95",
          bestRating: "5",
          worstRating: "1",
        },
      }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  if (faqs.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        step: steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      }}
    />
  );
}
