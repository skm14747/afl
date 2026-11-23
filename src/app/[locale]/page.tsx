import type { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CelestialArtwork } from "@/components/sections/CelestialArtwork";
import { ScrollIndicator } from "@/components/sections/ScrollIndicator";
import { ScrollFadeIn } from "@/components/effects/ScrollFadeIn";
import {
  Heart,
  Moon,
  Sparkles,
  Shield,
  Compass,
  Flame,
  Hash,
  Sunrise,
  RotateCcw,
  Star,
  BookOpen,
  Lock,
  FileText,
  Globe,
  ArrowRight,
  Orbit,
} from "lucide-react";
import { getPathname, Link } from "@/i18n/navigation";
import { defaultLocale, type Locale } from "@/i18n/locales";
import { setRequestLocale } from "next-intl/server";

const SITE = "https://astrologyforlove.com";

const HOME_TITLE = "Love Astrology & Zodiac Compatibility | AstrologyForLove";

const HOME_DESCRIPTION =
  "Check zodiac compatibility for love, a soulmate, or marriage. Free Venus, Moon, and birth-chart tools calculate real planetary positions in your browser.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = new URL(
    getPathname({ locale: defaultLocale, href: "/" }),
    SITE
  ).toString();

  return {
    title: { absolute: HOME_TITLE },
    description: HOME_DESCRIPTION,
    alternates: {
      canonical,
      languages:
        locale === defaultLocale
          ? { en: canonical, "x-default": canonical }
          : undefined,
    },
    openGraph: {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      url: canonical,
      siteName: "AstrologyForLove",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
    },
  };
}

const tools: Array<{
  title: string;
  description: string;
  href:
    | "/"
    | "/love-compatibility"
    | "/venus-sign-calculator"
    | "/moon-sign-compatibility"
    | "/soulmate-calculator"
    | "/marriage-compatibility"
    | "/birth-chart-compatibility"
    | "/twin-flame-calculator"
    | "/relationship-numerology"
    | "/rising-sign-compatibility"
    | "/ex-compatibility"
    | "/zodiac-love"
    | "/composite-chart"
    | "/kundli-matching";
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  featured?: boolean;
}> = [
  {
    title: "Love Compatibility",
    description:
      "Zodiac compatibility for two Sun signs: romance, communication, and long-term potential.",
    href: "/love-compatibility",
    icon: Heart,
    accent: "var(--romantic-rose)",
    featured: true,
  },
  {
    title: "Venus Sign Calculator",
    description:
      "Find your Venus sign and understand your romantic nature and love language.",
    href: "/venus-sign-calculator",
    icon: Sparkles,
    accent: "var(--champagne-gold)",
    featured: true,
  },
  {
    title: "Moon Sign Compatibility",
    description:
      "Compare Moon placements to reveal emotional compatibility and nurturing styles.",
    href: "/moon-sign-compatibility",
    icon: Moon,
    accent: "var(--lavender-mist)",
    featured: true,
  },
  {
    title: "Soulmate Calculator",
    description:
      "Soulmate synastry from two birth charts, including aspects and the composite chart.",
    href: "/soulmate-calculator",
    icon: Star,
    accent: "var(--champagne-gold)",
    featured: true,
  },
  {
    title: "Marriage Compatibility",
    description:
      "Tropical marriage astrology from both birth charts. Kundli matching is the Vedic reading.",
    href: "/marriage-compatibility",
    icon: Shield,
    accent: "var(--lavender-mist)",
    featured: true,
  },
  {
    title: "Birth Chart Compatibility",
    description:
      "Full synastry analysis comparing two natal charts across all personal planets.",
    href: "/birth-chart-compatibility",
    icon: Compass,
    accent: "var(--champagne-gold)",
    featured: true,
  },
  {
    title: "Twin Flame Calculator",
    description:
      "Examine synastry indicators traditionally associated with deep soul connections.",
    href: "/twin-flame-calculator",
    icon: Flame,
    accent: "var(--romantic-rose)",
  },
  {
    title: "Relationship Numerology",
    description:
      "Compare Life Path numbers for numerological relationship insights.",
    href: "/relationship-numerology",
    icon: Hash,
    accent: "var(--lavender-mist)",
  },
  {
    title: "Rising Sign Compatibility",
    description:
      "Compare Ascendants for first-impression and partnership dynamics.",
    href: "/rising-sign-compatibility",
    icon: Sunrise,
    accent: "var(--champagne-gold)",
  },
  {
    title: "Ex-Relationship Insights",
    description:
      "Reflect on past relationship dynamics through an astrological lens.",
    href: "/ex-compatibility",
    icon: RotateCcw,
    accent: "var(--romantic-rose)",
  },
  {
    title: "Zodiac Love Guide",
    description:
      "Explore how each zodiac sign expresses love, with strengths and best matches.",
    href: "/zodiac-love",
    icon: BookOpen,
    accent: "var(--lavender-mist)",
  },
  {
    title: "Composite Chart",
    description:
      "The midpoint chart of two people, plus a Davison chart when both birth places are known.",
    href: "/composite-chart",
    icon: Orbit,
    accent: "var(--champagne-gold)",
  },
  {
    title: "Kundli Matching",
    description:
      "Vedic marriage match: 36 guna, Mangal dosha, and ten poruthams on the Lahiri zodiac.",
    href: "/kundli-matching",
    icon: Moon,
    accent: "var(--lavender-mist)",
  },
];

const featuredTools = tools.filter((t) => t.featured);
const moreTools = tools.filter((t) => !t.featured);

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const canonical = new URL(
    getPathname({ locale: defaultLocale, href: "/" }),
    SITE
  ).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        name: "AstrologyForLove",
        url: canonical,
        description: HOME_DESCRIPTION,
        slogan: "Written in the Stars. Felt in the Heart.",
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        name: "Love astrology tools",
        itemListElement: tools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.title,
          ...(tool.featured ? { description: tool.description } : {}),
          url: new URL(
            getPathname({
              locale: locale as Locale,
              href: tool.href,
            }),
            SITE
          ).toString(),
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
      <main className="flex-1">
        {/* ═══════════════════════════════════════
            Section A — Immersive Hero
        ═══════════════════════════════════════ */}
        <section className="bg-immersive text-[var(--ivory)] min-h-[85vh] relative overflow-hidden flex items-center">
          {/* Atmospheric glow orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[100px]"
              style={{
                background: "var(--champagne-gold)",
                top: "-10%",
                left: "10%",
              }}
            />
            <div
              className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[80px]"
              style={{
                background: "var(--romantic-rose)",
                bottom: "-5%",
                right: "5%",
              }}
            />
            <div
              className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[60px]"
              style={{
                background: "var(--lavender-mist)",
                top: "40%",
                right: "25%",
              }}
            />
          </div>

          <Container size="wide" className="relative py-28 md:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Editorial text */}
              <div className="max-w-xl">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--champagne-gold)] font-semibold block mb-6">
                  AstrologyForLove · Love astrology
                </span>
                <h1
                  className="text-[var(--ivory)] mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-display-1)",
                    lineHeight: "var(--leading-display)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Zodiac compatibility,{" "}
                  <em className="text-gold-gradient not-italic">
                    written in the stars.
                  </em>
                </h1>
                <p className="text-[var(--neutral-300)] leading-relaxed text-[1.05rem] mb-10 max-w-md">
                  Check two signs for love, a soulmate chart, or a marriage
                  match. Venus, Moon, rising, and birth-chart tools calculate
                  Sun through Pluto in your browser. Western readings use the
                  tropical zodiac. Kundli matching is the Lahiri Vedic reading.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href="/love-compatibility"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[var(--champagne-gold)] text-[var(--cosmic-navy)] font-semibold rounded-[var(--radius-xl)] hover:bg-[var(--gold-300)] transition-all hover:shadow-[0_8px_30px_rgba(216,175,121,0.3)] hover:-translate-y-0.5"
                  >
                    <Heart className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                    Explore Love Compatibility
                  </Link>
                  <Link
                    href="/venus-sign-calculator"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-[var(--ivory)]/20 text-[var(--ivory)] font-medium rounded-[var(--radius-xl)] hover:border-[var(--champagne-gold)] hover:text-[var(--champagne-gold)] transition-all glass-dark"
                  >
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Discover Your Venus Sign
                  </Link>
                </div>
              </div>

              {/* Right — Celestial artwork */}
              <div className="hidden lg:block">
                <CelestialArtwork variant="hero" />
              </div>
            </div>
          </Container>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ScrollIndicator />
          </div>
        </section>

        {/* ═══════════════════════════════════════
            Section B — "Every connection has a story"
        ═══════════════════════════════════════ */}
        <section className="bg-editorial py-24 md:py-32 relative section-glow">
          <Container size="standard">
            <ScrollFadeIn>
              <SectionHeading
                eyebrow="Discover Your Connection"
                headline={
                  <>
                    Every connection has a{" "}
                    <em className="text-serif-italic">story.</em>
                  </>
                }
                body="A Venus sign, a Moon comparison, and a birth-chart synastry each answer a different question about the same relationship."
              />
            </ScrollFadeIn>

            <div className="mt-20 space-y-16 md:space-y-20">
              {/* Pillar 1 — Left aligned */}
              <ScrollFadeIn delay={100} direction="left">
                <div className="max-w-lg">
                  <div className="flex items-start gap-6">
                    <span
                      className="text-gold-gradient flex-shrink-0"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-display-2)",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      01
                    </span>
                    <div>
                      <h3
                        className="mb-3"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-h3)",
                          fontWeight: 500,
                        }}
                      >
                        Discover Yourself
                      </h3>
                      <p className="text-[var(--color-muted-fg)] leading-relaxed">
                        Understand your Venus sign, emotional needs, romantic
                        personality, and the love language written in your birth
                        chart.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>

              {/* Pillar 2 — Centered */}
              <ScrollFadeIn delay={200}>
                <div className="max-w-lg mx-auto md:ms-auto md:me-16">
                  <div className="flex items-start gap-6">
                    <span
                      className="text-rose-gradient flex-shrink-0"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-display-2)",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      02
                    </span>
                    <div>
                      <h3
                        className="mb-3"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-h3)",
                          fontWeight: 500,
                        }}
                      >
                        Understand Your Connection
                      </h3>
                      <p className="text-[var(--color-muted-fg)] leading-relaxed">
                        Explore compatibility, attraction patterns,
                        communication dynamics, and the celestial chemistry
                        between two people.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>

              {/* Pillar 3 — Right aligned */}
              <ScrollFadeIn delay={300} direction="right">
                <div className="max-w-lg ms-auto">
                  <div className="flex items-start gap-6">
                    <span
                      className="text-cosmic-gradient flex-shrink-0"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-display-2)",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      03
                    </span>
                    <div>
                      <h3
                        className="mb-3"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-h3)",
                          fontWeight: 500,
                        }}
                      >
                        Explore Your Journey
                      </h3>
                      <p className="text-[var(--color-muted-fg)] leading-relaxed">
                        Discover relationship patterns, cosmic timing, and the
                        meaningful milestones that shape your romantic path.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════
            Section C — Featured Love Tools
        ═══════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-warm-gradient">
          <Container size="wide">
            <ScrollFadeIn>
              <SectionHeading
                eyebrow="Love astrology tools"
                headline={
                  <>
                    Zodiac compatibility,{" "}
                    <em className="text-serif-italic">real positions.</em>
                  </>
                }
                body="Sun through Pluto come from the astronomy-engine ephemeris. Each tool explains its score. Birth data stays in your browser."
              />
            </ScrollFadeIn>

            {/* Bento grid — first tool large */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool, i) => {
                const Icon = tool.icon;
                const isLarge = i === 0;
                return (
                  <ScrollFadeIn
                    key={tool.href}
                    delay={i * 80}
                    className={isLarge ? "md:col-span-2 lg:col-span-2" : ""}
                  >
                    <Link
                      href={tool.href}
                      className="group block h-full"
                    >
                      <div
                        className={`h-full rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(23,21,45,0.08)] hover:-translate-y-1 hover:border-[var(--gold-200)] card-glow relative ${isLarge ? "p-8 md:p-10" : "p-7"}`}
                      >
                        <div
                          className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${tool.accent} 12%, var(--color-surface))`,
                          }}
                        >
                          <Icon
                            className="w-5.5 h-5.5"
                            style={{ color: tool.accent }}
                          />
                        </div>
                        <h3
                          className="font-semibold mb-2.5 group-hover:text-[var(--champagne-gold)] transition-colors duration-300"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: isLarge
                              ? "var(--text-h3)"
                              : "var(--text-h4)",
                          }}
                        >
                          {tool.title}
                        </h3>
                        <p
                          className={`text-[var(--color-muted-fg)] leading-[1.7] ${isLarge ? "text-base max-w-lg" : "text-sm"}`}
                        >
                          {tool.description}
                        </p>
                        <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-[var(--champagne-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Link>
                  </ScrollFadeIn>
                );
              })}
            </div>

            {/* More tools — compact row */}
            {moreTools.length > 0 && (
              <div className="mt-10">
                <ScrollFadeIn>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {moreTools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="group flex items-center gap-3 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--gold-200)] hover:shadow-[var(--shadow-sm)] transition-all"
                        >
                          <Icon
                            className="w-4.5 h-4.5 flex-shrink-0"
                            style={{ color: tool.accent }}
                          />
                          <span className="text-sm font-medium group-hover:text-[var(--champagne-gold)] transition-colors">
                            {tool.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </ScrollFadeIn>
              </div>
            )}
          </Container>
        </section>

        {/* ═══════════════════════════════════════
            Section D — Editorial Storytelling
        ═══════════════════════════════════════ */}
        <section className="bg-immersive text-[var(--ivory)] py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[80px]"
              style={{
                background: "var(--champagne-gold)",
                top: "10%",
                left: "5%",
              }}
            />
            <div
              className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[60px]"
              style={{
                background: "var(--romantic-rose)",
                bottom: "10%",
                right: "10%",
              }}
            />
          </div>

          <Container size="wide" className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left — Celestial artwork */}
              <ScrollFadeIn direction="left">
                <CelestialArtwork variant="compact" />
              </ScrollFadeIn>

              {/* Right — Editorial text */}
              <ScrollFadeIn direction="right">
                <div className="max-w-lg">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--champagne-gold)] font-semibold block mb-5">
                    Beyond the Sun Sign
                  </span>
                  <h2
                    className="text-[var(--ivory)] mb-6"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h2)",
                      lineHeight: "var(--leading-heading)",
                      fontWeight: 500,
                    }}
                  >
                    Love is more than{" "}
                    <em className="text-gold-gradient not-italic">
                      a sun sign.
                    </em>
                  </h2>
                  <div className="space-y-4 text-[var(--neutral-300)] leading-relaxed">
                    <p>
                      A Sun sign is one part of love astrology. The Moon
                      describes emotional needs, Venus describes how you love,
                      and Mars describes chemistry.
                    </p>
                    <p>
                      Birth-chart tools calculate those positions from the
                      astronomy-engine ephemeris and show the method behind the
                      score.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/birth-chart-compatibility"
                      className="group inline-flex items-center gap-2.5 px-6 py-3 bg-[var(--champagne-gold)] text-[var(--cosmic-navy)] font-semibold rounded-[var(--radius-lg)] hover:bg-[var(--gold-300)] transition-all hover:shadow-[0_6px_24px_rgba(216,175,121,0.25)]"
                    >
                      Explore Your Birth Chart
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollFadeIn>
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════
            Section E — How It Works
        ═══════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-editorial relative section-glow">
          <Container size="standard">
            <ScrollFadeIn>
              <SectionHeading
                headline={
                  <>
                    How it{" "}
                    <em className="text-serif-italic">works.</em>
                  </>
                }
              />
            </ScrollFadeIn>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
              {/* Connecting line (desktop only) */}
              <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[var(--champagne-gold)]/20 to-transparent" />

              {[
                {
                  num: "01",
                  title: "Enter your birth details",
                  desc: "Date, time, and location. Everything stays private in your browser.",
                },
                {
                  num: "02",
                  title: "Explore your celestial patterns",
                  desc: "Real astronomical calculations reveal your planetary placements and aspects.",
                },
                {
                  num: "03",
                  title: "Discover what they reveal",
                  desc: "Understand your compatibility, romantic nature, and relationship dynamics.",
                },
              ].map((step, i) => (
                <ScrollFadeIn key={step.num} delay={i * 150}>
                  <div className="text-center relative">
                    <div
                      className="text-gold-gradient mb-4 inline-block"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-display-2)",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      {step.num}
                    </div>
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-h4)",
                        fontWeight: 500,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed max-w-xs mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </ScrollFadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════
            Section F — Final CTA
        ═══════════════════════════════════════ */}
        <section className="bg-cosmic-gradient text-[var(--ivory)] py-24 md:py-32 bg-stars relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[90px]"
              style={{
                background: "var(--champagne-gold)",
                top: "-15%",
                right: "10%",
              }}
            />
            <div
              className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[70px]"
              style={{
                background: "var(--romantic-rose)",
                bottom: "-10%",
                left: "15%",
              }}
            />
          </div>
          <Container size="standard" className="relative text-center">
            <ScrollFadeIn>
              <h2
                className="text-[var(--ivory)] mb-6 max-w-2xl mx-auto"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h1)",
                  lineHeight: "var(--leading-heading)",
                  fontWeight: 500,
                }}
              >
                Your next discovery might be{" "}
                <em className="text-gold-gradient not-italic">
                  written in the stars.
                </em>
              </h2>
              <p className="text-[var(--neutral-300)] mb-10 max-w-lg mx-auto leading-relaxed">
                Start with a zodiac comparison, a Venus sign, or two birth
                charts. The calculation stays in your browser.
              </p>
              <Link
                href="/love-compatibility"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--champagne-gold)] text-[var(--cosmic-navy)] font-semibold rounded-[var(--radius-xl)] hover:bg-[var(--gold-300)] transition-all hover:shadow-[0_8px_30px_rgba(216,175,121,0.3)] hover:-translate-y-0.5 text-base"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Explore Your Love Compatibility
              </Link>
            </ScrollFadeIn>
          </Container>
        </section>

        {/* ═══════════════════════════════════════
            Section G — Trust Bar (compact)
        ═══════════════════════════════════════ */}
        <section className="py-10 border-t border-[var(--color-border-subtle)]">
          <Container size="wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {[
                {
                  icon: <Globe className="w-5 h-5" style={{ color: "var(--champagne-gold)" }} />,
                  title: "Precise Ephemeris",
                  text: "Sun through Pluto from the astronomy-engine ephemeris.",
                },
                {
                  icon: <Lock className="w-5 h-5" style={{ color: "var(--romantic-rose)" }} />,
                  title: "Privacy First",
                  text: "All calculations run in your browser. Data never leaves your device.",
                },
                {
                  icon: <FileText className="w-5 h-5" style={{ color: "var(--lavender-mist)" }} />,
                  title: "Transparent Method",
                  text: "Scoring methodology explained on every tool.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="text-xs text-[var(--color-muted-fg)]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
