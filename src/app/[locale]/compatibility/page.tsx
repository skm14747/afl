import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChevronRight, Heart, Flame, Mountain, Wind, Droplets } from "lucide-react";
import {
  SIGNS,
  SIGN_DISPLAY,
  ELEMENT_COMPAT,
  allPairSlugs,
  parsePairSlug,
  calculatePairScore,
  type Element,
} from "@/lib/sign-pairs";
import type { Metadata } from "next";

const SITE = "https://www.astrologyforlove.com";

export const metadata: Metadata = {
  title: "Zodiac Compatibility Guide — All 78 Sign Pairs",
  description:
    "Explore compatibility scores for every zodiac pair. See element harmony, aspect angles, and modality insights for all 78 sign combinations.",
  alternates: {
    canonical: `${SITE}/compatibility`,
    languages: { en: `${SITE}/compatibility`, "x-default": `${SITE}/compatibility` },
  },
  openGraph: {
    title: "Zodiac Compatibility Guide — AstrologyForLove",
    description:
      "Complete compatibility reference for all 78 zodiac sign pairs with scores, element breakdowns, and relationship insights.",
    url: `${SITE}/compatibility`,
    siteName: "AstrologyForLove",
    type: "website",
  },
};

const ELEMENT_ICONS: Record<Element, React.ReactNode> = {
  fire: <Flame className="w-4 h-4 text-orange-400" />,
  earth: <Mountain className="w-4 h-4 text-emerald-400" />,
  air: <Wind className="w-4 h-4 text-sky-400" />,
  water: <Droplets className="w-4 h-4 text-blue-400" />,
};

const ELEMENT_COLORS: Record<Element, string> = {
  fire: "border-orange-400/30 bg-orange-400/5",
  earth: "border-emerald-400/30 bg-emerald-400/5",
  air: "border-sky-400/30 bg-sky-400/5",
  water: "border-blue-400/30 bg-blue-400/5",
};

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 65) return "text-[var(--champagne-gold)]";
  if (score >= 50) return "text-amber-400";
  return "text-rose-400";
}

export default function CompatibilityHubPage() {
  const slugs = allPairSlugs();
  const pairs = slugs.map((slug) => {
    const [s1, s2] = parsePairSlug(slug)!;
    const d1 = SIGN_DISPLAY[s1];
    const d2 = SIGN_DISPLAY[s2];
    const scores = calculatePairScore(s1, s2);
    return { slug, s1, s2, d1, d2, scores };
  });

  const elementEntries = Object.entries(ELEMENT_COMPAT) as [string, { score: number; label: string }][];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Zodiac Compatibility Guide",
    description:
      "Complete compatibility reference for all 78 zodiac sign pairs.",
    url: `${SITE}/compatibility`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: 78,
      itemListElement: pairs.slice(0, 12).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${p.d1.name} & ${p.d2.name} Compatibility`,
        url: `${SITE}/compatibility/${p.slug}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <MainHeader />
      <main id="main-content" className="flex-1 pt-[60px]">
        {/* Hero */}
        <div className="bg-immersive text-[var(--moonlight-cream)] py-16 md:py-24 relative overflow-hidden">
          <Container size="standard" className="relative">
            <nav
              className="flex items-center gap-1.5 text-xs text-[var(--neutral-400)] mb-8"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-[var(--cosmic-rose)] transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-3 h-3" aria-hidden />
              <span className="text-[var(--cosmic-rose)]">
                Compatibility
              </span>
            </nav>
            <div className="text-center">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full glass-dark flex items-center justify-center border border-[var(--cosmic-rose)]/15">
                  <Heart className="w-7 h-7 text-[var(--champagne-gold)]" />
                </div>
              </div>
              <h1
                className="text-[var(--moonlight-cream)] mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h1)",
                  lineHeight: "var(--leading-heading)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                Zodiac Compatibility Guide
              </h1>
              <p className="text-[var(--neutral-300)] max-w-2xl mx-auto leading-[1.7] text-[0.95rem]">
                Scores and insights for all 78 zodiac sign pairs. Element
                harmony, aspect angles, and what the astrology actually says
                about how two signs relate.
              </p>
            </div>
          </Container>
        </div>

        {/* Element Guide */}
        <Container size="standard" className="py-12 md:py-16">
          <section className="mb-16">
            <h2
              className="text-center mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: 500,
              }}
            >
              Element Compatibility
            </h2>
            <p className="text-center text-[var(--color-muted-fg)] max-w-2xl mx-auto mb-8 leading-relaxed">
              Every sign belongs to one of four elements. Element pairings
              determine the baseline chemistry between two signs.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {elementEntries.map(([key, { score, label }]) => {
                const [e1, e2] = key.split("+") as [Element, Element];
                return (
                  <div
                    key={key}
                    className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/50"
                  >
                    <div className="flex gap-1 mt-0.5">
                      {ELEMENT_ICONS[e1]}
                      {e1 !== e2 && ELEMENT_ICONS[e2]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium capitalize">
                          {e1}
                          {e1 !== e2 ? ` + ${e2}` : " + same"}
                        </span>
                        <span
                          className={`text-xs font-semibold ${scoreColor(score)}`}
                        >
                          {score}%
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-muted-fg)] leading-relaxed">
                        {label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tool CTAs */}
          <section className="mb-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {[
                {
                  href: "/love-compatibility" as const,
                  title: "Love Compatibility",
                  desc: "Quick Sun sign compatibility check",
                },
                {
                  href: "/synastry-chart" as const,
                  title: "Synastry Chart",
                  desc: "Full planet-by-planet chart comparison",
                },
                {
                  href: "/moon-sign-compatibility" as const,
                  title: "Moon Sign Match",
                  desc: "Emotional compatibility by Moon sign",
                },
                {
                  href: "/marriage-compatibility" as const,
                  title: "Marriage Compatibility",
                  desc: "Long-term partnership analysis",
                },
                {
                  href: "/venus-sign-calculator" as const,
                  title: "Venus Sign Calculator",
                  desc: "Discover your love style",
                },
                {
                  href: "/birth-chart-compatibility" as const,
                  title: "Birth Chart Compatibility",
                  desc: "Complete natal chart comparison",
                },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block p-5 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/50 transition-all hover:border-[var(--cosmic-rose)]/40 hover:shadow-[var(--shadow-md)]"
                >
                  <h3 className="font-medium mb-1 group-hover:text-[var(--crimson-love)] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-[var(--color-muted-fg)]">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* 78-pair grid */}
          <section className="mb-16">
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: 500,
              }}
            >
              All 78 Sign Pairs
            </h2>
            <p className="text-center text-[var(--color-muted-fg)] max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Every unique zodiac combination. Scores blend element harmony (40%)
              and aspect angle (60%).
            </p>

            {/* Group by first sign */}
            <div className="space-y-10 max-w-5xl mx-auto">
              {SIGNS.map((sign) => {
                const signPairs = pairs.filter(
                  (p) => p.s1 === sign || p.s2 === sign,
                );
                if (signPairs.length === 0) return null;
                const d = SIGN_DISPLAY[sign];
                return (
                  <div key={sign}>
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${ELEMENT_COLORS[d.element]}`}
                      >
                        {d.symbol} {d.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted-fg)]">
                        {d.element} · {d.modality}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {signPairs.map((p) => {
                        const other = p.s1 === sign ? p.d2 : p.d1;
                        const otherSign = p.s1 === sign ? p.s2 : p.s1;
                        return (
                          <Link
                            key={p.slug}
                            href={`/compatibility/${p.slug}` as never}
                            className="group flex items-center justify-between gap-1 px-3 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/30 hover:border-[var(--cosmic-rose)]/40 transition-all text-xs"
                          >
                            <span className="truncate">
                              {other.symbol}{" "}
                              <span className="group-hover:text-[var(--crimson-love)] transition-colors">
                                {other.name}
                              </span>
                            </span>
                            <span
                              className={`font-semibold tabular-nums ${scoreColor(p.scores.overall)}`}
                            >
                              {p.scores.overall}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-3xl mx-auto mb-16">
            <h2
              className="text-center mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
              }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "How is the compatibility score calculated?",
                  a: "Each score blends element harmony (40%) and zodiac aspect angle (60%). Element compatibility measures how naturally two elements interact — Fire with Air, Earth with Water, etc. The aspect score comes from the angular distance between two signs on the zodiac wheel: trines (120°) and sextiles (60°) are harmonious, squares (90°) are challenging, and oppositions (180°) are polarising.",
                },
                {
                  q: "Is Sun sign compatibility enough?",
                  a: "Sun sign compatibility is a starting point. It captures the broad dynamic between two people's core identities but misses Venus (love style), Moon (emotional needs), Mars (desire), and house overlays. For a fuller picture, use the Synastry Chart or Birth Chart Compatibility calculator.",
                },
                {
                  q: "What does a low score mean?",
                  a: "A lower score means the two signs share less elemental or aspect-based harmony. It does not mean the relationship cannot work — many strong partnerships have challenging Sun sign combinations. Low-scoring pairs often push each other to grow in ways easy pairings do not.",
                },
                {
                  q: "Why are there 78 pairs?",
                  a: "There are 12 zodiac signs. The number of unique unordered pairs (including same-sign pairs) is C(12,2) + 12 = 66 + 12 = 78. Each pair has a dedicated page with tailored insights.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/50"
                >
                  <summary className="flex cursor-pointer items-center px-5 py-4 text-[0.95rem] font-medium">
                    {faq.q}
                  </summary>
                  <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--color-muted-fg)]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
