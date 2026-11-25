import type { Metadata } from "next";
import {
  parsePairSlug,
  SIGN_DISPLAY,
  allPairSlugs,
  calculatePairScore,
} from "@/lib/sign-pairs";

export function generateStaticParams() {
  return allPairSlugs().map((pair) => ({ pair }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string; locale: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePairSlug(pair);

  if (!parsed) {
    return { title: "Sign Pair Not Found" };
  }

  const [s1, s2] = parsed;
  const d1 = SIGN_DISPLAY[s1];
  const d2 = SIGN_DISPLAY[s2];
  const scores = calculatePairScore(s1, s2);
  const isSame = s1 === s2;

  const title = isSame
    ? `${d1.name} and ${d2.name} Compatibility — ${scores.overall}% Match`
    : `${d1.name} and ${d2.name} Compatibility — ${scores.overall}% Score`;

  const description = `Are ${d1.name} and ${d2.name} compatible? ${d1.element} meets ${d2.element} in a ${scores.aspectName.toLowerCase()} aspect. Overall score: ${scores.overall}%. Free compatibility breakdown with strengths, growth areas, and deeper tools.`;

  const canonical = `https://www.astrologyforlove.com/compatibility/${pair}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { en: canonical, "x-default": canonical },
    },
    openGraph: {
      title: `${d1.name} ♥ ${d2.name} — ${scores.overall}% Compatible`,
      description,
      url: canonical,
      siteName: "AstrologyForLove",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "https://www.astrologyforlove.com/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${d1.name} and ${d2.name} Compatibility — AstrologyForLove`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${d1.name} & ${d2.name} Compatibility — ${scores.overall}%`,
      description,
      images: ["https://www.astrologyforlove.com/opengraph-image"],
    },
  };
}

export default function SignPairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
