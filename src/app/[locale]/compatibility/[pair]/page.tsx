"use client";

import React from "react";
import { useParams } from "next/navigation";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";
import {
  parsePairSlug,
  SIGN_DISPLAY,
  ELEMENT_EMOJI,
  getPairInsight,
  calculatePairScore,
  SIGNS,
  pairSlug,
  type ZodiacSign,
} from "@/lib/sign-pairs";
import {
  Heart,
  Flame,
  MessageSquare,
  Clock,
  ArrowRight,
  Star,
  Sparkles,
  Shield,
  ChevronRight,
} from "lucide-react";

function ScoreRing({
  score,
  size = 120,
  label,
}: {
  score: number;
  size?: number;
  label: string;
}) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80
      ? "var(--cosmic-rose)"
      : score >= 60
        ? "var(--rose-gold)"
        : "var(--crimson-love)";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="8"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: size > 100 ? "1.75rem" : "1.25rem",
              color: "var(--color-fg)",
            }}
          >
            {score}%
          </span>
        </div>
      </div>
      <span className="text-xs text-[var(--color-muted-fg)] font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

function DimensionBar({
  label,
  score,
  icon,
}: {
  label: string;
  score: number;
  icon: React.ReactNode;
}) {
  const color =
    score >= 80
      ? "var(--cosmic-rose)"
      : score >= 60
        ? "var(--rose-gold)"
        : "var(--crimson-love)";

  return (
    <div className="flex items-center gap-3">
      <div className="text-[var(--color-muted-fg)] w-5">{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-semibold" style={{ color }}>
            {score}%
          </span>
        </div>
        <div className="h-2 bg-[var(--color-muted)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${score}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}

export default function SignPairPage() {
  const params = useParams<{ pair: string }>();
  const parsed = parsePairSlug(params.pair);

  if (!parsed) {
    return (
      <>
        <MainHeader />
        <main id="main-content" className="flex-1 pt-[60px]">
          <Container size="standard" className="py-24 text-center">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h1)",
                fontWeight: 500,
              }}
            >
              Sign pair not found
            </h1>
            <p className="mt-4 text-[var(--color-muted-fg)]">
              Try a pair like{" "}
              <Link
                href={"/compatibility/aries-and-taurus" as never}
                className="underline"
              >
                Aries and Taurus
              </Link>
              .
            </p>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  const [sign1, sign2] = parsed;
  const d1 = SIGN_DISPLAY[sign1];
  const d2 = SIGN_DISPLAY[sign2];
  const insight = getPairInsight(sign1, sign2);
  const scores = calculatePairScore(sign1, sign2);
  const isSameSign = sign1 === sign2;

  const romance = Math.min(
    100,
    Math.max(30, scores.overall + (scores.aspectNature === "harmonious" ? 8 : -5))
  );
  const emotion = Math.min(
    100,
    Math.max(30, scores.elementScore + (d1.element === "water" || d2.element === "water" ? 10 : 0))
  );
  const communication = Math.min(
    100,
    Math.max(30, scores.overall + (d1.element === "air" || d2.element === "air" ? 10 : -3))
  );
  const longTerm = Math.min(
    100,
    Math.max(30, scores.overall + (d1.modality === "fixed" || d2.modality === "fixed" ? 8 : -3))
  );

  const otherPairs = SIGNS.filter((s) => s !== sign1 && s !== sign2)
    .slice(0, 4)
    .map((s) => ({
      slug: pairSlug(sign1, s),
      label: `${d1.name} & ${SIGN_DISPLAY[s].name}`,
    }));

  const faqItems = [
    {
      q: `Are ${d1.name} and ${d2.name} compatible?`,
      a: insight?.description || `${d1.name} and ${d2.name} form a ${scores.aspectName.toLowerCase()} aspect (${scores.aspectNature}). Their overall compatibility score is ${scores.overall}%. ${scores.elementLabel}.`,
    },
    {
      q: `What is the ${d1.name}–${d2.name} element compatibility?`,
      a: `${d1.name} is ${d1.element} and ${d2.name} is ${d2.element}. ${scores.elementLabel}. Element compatibility scores ${scores.elementScore}%.`,
    },
    {
      q: `What aspect do ${d1.name} and ${d2.name} form?`,
      a: `They form a ${scores.aspectName} aspect, which is traditionally considered ${scores.aspectNature}. This means their Sun signs are ${
        isSameSign
          ? "in the same position"
          : `${Math.abs(SIGNS.indexOf(sign1) - SIGNS.indexOf(sign2))} signs apart`
      } on the zodiac wheel.`,
    },
    {
      q: "Is Sun sign compatibility enough?",
      a: "Sun signs show core identity compatibility but represent only one layer. For a complete picture, compare Moon signs (emotional compatibility), Venus signs (love style), and the full birth chart through our synastry chart calculator.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.astrologyforlove.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Compatibility",
            item: "https://www.astrologyforlove.com/love-compatibility",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${d1.name} and ${d2.name}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainHeader theme="dark" />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-immersive text-[var(--moonlight-cream)] relative overflow-hidden bg-stars">
          <Container size="standard" className="py-20 md:py-28 relative text-center">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-1.5 text-xs text-[var(--neutral-400)] mb-8"
            >
              <Link href="/" className="hover:text-[var(--cosmic-rose)] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link
                href="/love-compatibility"
                className="hover:text-[var(--cosmic-rose)] transition-colors"
              >
                Compatibility
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--moonlight-cream)]">
                {d1.name} & {d2.name}
              </span>
            </nav>

            {/* Sign symbols */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex flex-col items-center gap-1">
                <span className="text-5xl md:text-6xl">{d1.symbol}</span>
                <span className="text-sm font-medium text-[var(--cosmic-rose)]">
                  {d1.name}
                </span>
                <span className="text-[10px] text-[var(--neutral-400)]">
                  {d1.dates}
                </span>
              </div>
              <Heart className="w-8 h-8 text-[var(--crimson-love)] animate-pulse" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-5xl md:text-6xl">{d2.symbol}</span>
                <span className="text-sm font-medium text-[var(--cosmic-rose)]">
                  {d2.name}
                </span>
                <span className="text-[10px] text-[var(--neutral-400)]">
                  {d2.dates}
                </span>
              </div>
            </div>

            <h1
              className="text-[var(--moonlight-cream)] mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                lineHeight: 1.15,
                fontWeight: 500,
              }}
            >
              {d1.name} and {d2.name} Compatibility
            </h1>

            {insight && (
              <p className="text-lg text-[var(--cosmic-rose)] italic mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {insight.tagline}
              </p>
            )}

            <p className="text-[var(--neutral-300)] max-w-xl mx-auto leading-relaxed">
              {insight?.description ||
                `${d1.name} (${d1.element}) and ${d2.name} (${d2.element}) form a ${scores.aspectName.toLowerCase()} aspect. ${scores.elementLabel}.`}
            </p>
          </Container>
        </section>

        {/* Scores */}
        <section className="py-16 md:py-24">
          <Container size="standard">
            <div className="text-center mb-12">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h2)",
                  fontWeight: 500,
                }}
              >
                Compatibility Score
              </h2>
              <p className="mt-2 text-[var(--color-muted-fg)]">
                Based on Sun sign aspect, element pairing, and modality
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <ScoreRing score={scores.overall} size={140} label="Overall" />
              <ScoreRing score={romance} label="Romance" />
              <ScoreRing score={emotion} label="Emotion" />
              <ScoreRing score={communication} label="Communication" />
              <ScoreRing score={longTerm} label="Long-term" />
            </div>

            <Card variant="default" padding="lg" className="max-w-2xl mx-auto">
              <div className="space-y-5">
                <DimensionBar
                  label="Romantic Chemistry"
                  score={romance}
                  icon={<Flame className="w-4 h-4" />}
                />
                <DimensionBar
                  label="Emotional Bond"
                  score={emotion}
                  icon={<Heart className="w-4 h-4" />}
                />
                <DimensionBar
                  label="Communication"
                  score={communication}
                  icon={<MessageSquare className="w-4 h-4" />}
                />
                <DimensionBar
                  label="Long-term Potential"
                  score={longTerm}
                  icon={<Clock className="w-4 h-4" />}
                />
              </div>
            </Card>
          </Container>
        </section>

        {/* Element & Modality Analysis */}
        <section className="py-16 bg-[var(--color-bg-alt)]">
          <Container size="standard">
            <h2
              className="text-center mb-12"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: 500,
              }}
            >
              Why This Pairing Works (or Doesn&apos;t)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Element */}
              <Card variant="default" padding="lg">
                <div className="text-center">
                  <div className="text-3xl mb-3">
                    {ELEMENT_EMOJI[d1.element]}{" "}
                    {isSameSign ? "" : ELEMENT_EMOJI[d2.element]}
                  </div>
                  <h3 className="font-semibold mb-2">Element Pairing</h3>
                  <Badge
                    variant={
                      scores.elementScore >= 80
                        ? "success"
                        : scores.elementScore >= 60
                          ? "default"
                          : "error"
                    }
                    className="mb-3"
                  >
                    {d1.element.charAt(0).toUpperCase() + d1.element.slice(1)} +{" "}
                    {d2.element.charAt(0).toUpperCase() + d2.element.slice(1)}
                  </Badge>
                  <p className="text-sm text-[var(--color-muted-fg)]">
                    {scores.elementLabel}
                  </p>
                </div>
              </Card>

              {/* Aspect */}
              <Card variant="default" padding="lg">
                <div className="text-center">
                  <div className="text-3xl mb-3">
                    <Sparkles className="w-8 h-8 mx-auto text-[var(--rose-gold)]" />
                  </div>
                  <h3 className="font-semibold mb-2">Zodiac Aspect</h3>
                  <Badge
                    variant={
                      scores.aspectScore >= 80
                        ? "success"
                        : scores.aspectScore >= 60
                          ? "default"
                          : "error"
                    }
                    className="mb-3"
                  >
                    {scores.aspectName} ({scores.aspectNature})
                  </Badge>
                  <p className="text-sm text-[var(--color-muted-fg)]">
                    {scores.aspectNature === "harmonious"
                      ? "This aspect indicates natural flow and ease between the signs."
                      : scores.aspectNature === "challenging"
                        ? "This square aspect creates friction that sparks growth through effort."
                        : scores.aspectNature === "intense"
                          ? "Same-sign conjunctions intensify shared traits — for better and for challenge."
                          : scores.aspectNature === "polarising"
                            ? "Opposite signs are magnetically attracted, each holding what the other lacks."
                            : `This ${scores.aspectName.toLowerCase()} aspect requires adjustment and conscious bridging.`}
                  </p>
                </div>
              </Card>

              {/* Modality */}
              <Card variant="default" padding="lg">
                <div className="text-center">
                  <div className="text-3xl mb-3">
                    <Shield className="w-8 h-8 mx-auto text-[var(--cosmic-rose)]" />
                  </div>
                  <h3 className="font-semibold mb-2">Modality</h3>
                  <Badge variant="default" className="mb-3">
                    {d1.modality.charAt(0).toUpperCase() + d1.modality.slice(1)}{" "}
                    {isSameSign
                      ? ""
                      : `+ ${d2.modality.charAt(0).toUpperCase() + d2.modality.slice(1)}`}
                  </Badge>
                  <p className="text-sm text-[var(--color-muted-fg)]">
                    {scores.modalityNote}
                  </p>
                </div>
              </Card>
            </div>
          </Container>
        </section>

        {/* Strengths & Challenges */}
        {insight && (
          <section className="py-16">
            <Container size="standard">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card variant="default" padding="lg">
                  <h3
                    className="flex items-center gap-2 mb-5"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h3)",
                      fontWeight: 500,
                    }}
                  >
                    <Star className="w-5 h-5 text-[var(--rose-gold)]" />
                    Strengths
                  </h3>
                  <ul className="space-y-3">
                    {insight.strengths.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[var(--color-fg)]"
                      >
                        <span className="text-[var(--cosmic-rose)] mt-0.5">✦</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card variant="default" padding="lg">
                  <h3
                    className="flex items-center gap-2 mb-5"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h3)",
                      fontWeight: 500,
                    }}
                  >
                    <Flame className="w-5 h-5 text-[var(--crimson-love)]" />
                    Growth Areas
                  </h3>
                  <ul className="space-y-3">
                    {insight.challenges.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[var(--color-fg)]"
                      >
                        <span className="text-[var(--rose-gold)] mt-0.5">◇</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Container>
          </section>
        )}

        {/* Ruler info */}
        <section className="py-16 bg-[var(--color-bg-alt)]">
          <Container size="standard">
            <h2
              className="text-center mb-10"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: 500,
              }}
            >
              Planetary Rulers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card variant="default" padding="lg" className="text-center">
                <span className="text-4xl block mb-2">{d1.symbol}</span>
                <h3 className="font-semibold">{d1.name}</h3>
                <p className="text-sm text-[var(--color-muted-fg)] mt-1">
                  Ruled by <strong>{d1.ruler}</strong> ·{" "}
                  {d1.element.charAt(0).toUpperCase() + d1.element.slice(1)} ·{" "}
                  {d1.modality.charAt(0).toUpperCase() + d1.modality.slice(1)}
                </p>
              </Card>
              <Card variant="default" padding="lg" className="text-center">
                <span className="text-4xl block mb-2">{d2.symbol}</span>
                <h3 className="font-semibold">{d2.name}</h3>
                <p className="text-sm text-[var(--color-muted-fg)] mt-1">
                  Ruled by <strong>{d2.ruler}</strong> ·{" "}
                  {d2.element.charAt(0).toUpperCase() + d2.element.slice(1)} ·{" "}
                  {d2.modality.charAt(0).toUpperCase() + d2.modality.slice(1)}
                </p>
              </Card>
            </div>
          </Container>
        </section>

        {/* CTA to deeper tools */}
        <section className="py-16">
          <Container size="standard">
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: 500,
              }}
            >
              Go Deeper
            </h2>
            <p className="text-center text-[var(--color-muted-fg)] mb-10 max-w-lg mx-auto">
              Sun sign compatibility is one layer. Use your full birth chart for
              a complete picture.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                {
                  href: "/birth-chart-compatibility" as const,
                  label: "Birth Chart Compatibility",
                  desc: "Full natal chart comparison with scores",
                },
                {
                  href: "/synastry-chart" as const,
                  label: "Synastry Chart",
                  desc: "Every aspect and house overlay",
                },
                {
                  href: "/love-compatibility" as const,
                  label: "Quick Compatibility",
                  desc: "Pick two signs for a fast reading",
                },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--cosmic-rose)] transition-colors"
                >
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--cosmic-rose)] transition-colors flex items-center gap-1.5">
                    {tool.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-[var(--color-muted-fg)]">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[var(--color-bg-alt)]">
          <Container size="standard">
            <h2
              className="text-center mb-10"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: 500,
              }}
            >
              Frequently Asked Questions
            </h2>
            <div className="max-w-2xl mx-auto space-y-6">
              {faqItems.map((faq, i) => (
                <Card key={i} variant="default" padding="lg">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
                    {faq.a}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* More pairs */}
        <section className="py-16">
          <Container size="standard">
            <h2
              className="text-center mb-10"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: 500,
              }}
            >
              Explore More {d1.name} Pairings
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {otherPairs.map((p) => (
                <Link
                  key={p.slug}
                  href={`/compatibility/${p.slug}` as never}
                  className="block p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--cosmic-rose)] transition-colors text-center"
                >
                  <span className="text-sm font-medium">{p.label}</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/love-compatibility"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--cosmic-rose)] hover:underline"
              >
                View all 78 zodiac pairs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
