import type { Metadata } from "next";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CosmicHeartBackground, CosmicHeartMark } from "@/components/cosmic/CosmicHeartBackground";
import { ConstellationDecoration } from "@/components/cosmic/ConstellationDecoration";
import { ConnectedStars } from "@/components/cosmic/ConnectedStars";
import { RomanticGradient } from "@/components/cosmic/RomanticGradient";
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
  Eye,
  Zap,
  CalendarDays,
} from "lucide-react";
import { getPathname, Link } from "@/i18n/navigation";
import { defaultLocale, type Locale } from "@/i18n/locales";
import { buildHreflangLanguages } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

/** Page component reads params for setRequestLocale + JSON-LD canonical. */
export const instant = false;

const SITE = "https://www.astrologyforlove.com";

const HOME_TITLE = "Love Astrology & Zodiac Compatibility | AstrologyForLove";

const HOME_DESCRIPTION =
  "Check zodiac compatibility for love, a soulmate, or marriage. Free Venus, Moon, and birth-chart tools calculate real planetary positions in your browser.";

const HOME_CANONICAL = new URL(
  getPathname({ locale: defaultLocale, href: "/" }),
  SITE
).toString();

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: HOME_CANONICAL,
    languages: buildHreflangLanguages("/"),
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: HOME_CANONICAL,
    siteName: "AstrologyForLove",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AstrologyForLove — Free Zodiac Compatibility Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

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
    | "/kundli-matching"
    | "/synastry-chart"
    | "/moon-phase-soulmate"
    | "/mars-sign-compatibility"
    | "/love-language-calculator"
    | "/relationship-pattern-analyzer"
    | "/venus-mars-attraction"
    | "/weton-jodoh"
    | "/relationship-forecast";
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
    accent: "var(--crimson-love)",
    featured: true,
  },
  {
    title: "Venus Sign Calculator",
    description:
      "Find your Venus sign and understand your romantic nature and love language.",
    href: "/venus-sign-calculator",
    icon: Sparkles,
    accent: "var(--cosmic-rose)",
    featured: true,
  },
  {
    title: "Moon Sign Compatibility",
    description:
      "Compare Moon placements to reveal emotional compatibility and nurturing styles.",
    href: "/moon-sign-compatibility",
    icon: Moon,
    accent: "var(--blush-pink)",
    featured: true,
  },
  {
    title: "Soulmate Calculator",
    description:
      "Discover your romantic tendencies through Venus, Moon, and Mars. A one-person soulmate profile from your natal chart.",
    href: "/soulmate-calculator",
    icon: Star,
    accent: "var(--cosmic-rose)",
    featured: true,
  },
  {
    title: "Marriage Compatibility",
    description:
      "Tropical marriage astrology from both birth charts. Kundli matching is the Vedic reading.",
    href: "/marriage-compatibility",
    icon: Shield,
    accent: "var(--rose-gold)",
    featured: true,
  },
  {
    title: "Birth Chart Compatibility",
    description:
      "Weighted compatibility score with planet-by-planet breakdowns for emotional, romantic, and long-term dimensions.",
    href: "/birth-chart-compatibility",
    icon: Compass,
    accent: "var(--crimson-love)",
    featured: true,
  },
  {
    title: "Love Language Calculator",
    description:
      "Discover your astrological love language through Venus, Moon, and Mars placements.",
    href: "/love-language-calculator",
    icon: Zap,
    accent: "var(--cosmic-rose)",
  },
  {
    title: "Relationship Pattern Analyzer",
    description:
      "Uncover recurring attraction patterns and growth edges in your natal chart.",
    href: "/relationship-pattern-analyzer",
    icon: Eye,
    accent: "var(--rose-gold)",
  },
  {
    title: "Twin Flame Calculator",
    description:
      "Examine synastry indicators traditionally associated with deep soul connections.",
    href: "/twin-flame-calculator",
    icon: Flame,
    accent: "var(--crimson-love)",
  },
  {
    title: "Relationship Numerology",
    description:
      "Compare Life Path numbers for numerological relationship insights.",
    href: "/relationship-numerology",
    icon: Hash,
    accent: "var(--blush-pink)",
  },
  {
    title: "Rising Sign Compatibility",
    description:
      "Compare Ascendants for first-impression and partnership dynamics.",
    href: "/rising-sign-compatibility",
    icon: Sunrise,
    accent: "var(--cosmic-rose)",
  },
  {
    title: "Ex-Relationship Insights",
    description:
      "Reflect on past relationship dynamics through an astrological lens.",
    href: "/ex-compatibility",
    icon: RotateCcw,
    accent: "var(--rose-gold)",
  },
  {
    title: "Zodiac Love Guide",
    description:
      "Explore how each zodiac sign expresses love, with strengths and best matches.",
    href: "/zodiac-love",
    icon: BookOpen,
    accent: "var(--blush-pink)",
  },
  {
    title: "Composite Chart",
    description:
      "The midpoint chart of two people, plus a Davison chart when both birth places are known.",
    href: "/composite-chart",
    icon: Orbit,
    accent: "var(--cosmic-rose)",
  },
  {
    title: "Kundli Matching",
    description:
      "Vedic marriage match: 36 guna, Mangal dosha, and ten poruthams on the Lahiri zodiac.",
    href: "/kundli-matching",
    icon: Moon,
    accent: "var(--rose-gold)",
  },
  {
    title: "Synastry Chart",
    description:
      "Full aspect grid and biwheel from two birth charts — every planet-to-planet connection, house overlay, and relationship theme.",
    href: "/synastry-chart",
    icon: Orbit,
    accent: "var(--crimson-love)",
    featured: true,
  },
  {
    title: "Moon Phase Soulmate",
    description:
      "Find each person's birth moon phase and see if your moons make one full moon together.",
    href: "/moon-phase-soulmate",
    icon: Moon,
    accent: "var(--blush-pink)",
  },
  {
    title: "Mars Sign Compatibility",
    description:
      "Compare two Mars signs for passion, sexual chemistry, drive, and conflict style.",
    href: "/mars-sign-compatibility",
    icon: Flame,
    accent: "var(--crimson-love)",
  },
  {
    title: "Venus–Mars Attraction",
    description:
      "Compare two charts for the Venus–Mars contacts that create romantic and physical chemistry.",
    href: "/venus-mars-attraction",
    icon: Flame,
    accent: "var(--cosmic-rose)",
  },
  {
    title: "Weton Jodoh",
    description:
      "Javanese love match from two birth dates. Each weton carries a neptu value; the total maps to one of eight traditional labels.",
    href: "/weton-jodoh",
    icon: Moon,
    accent: "var(--rose-gold)",
  },
  {
    title: "Relationship Forecast",
    description:
      "A score for how two charts meet, then dated windows for the next 12 months. Not a marriage or breakup prediction.",
    href: "/relationship-forecast",
    icon: CalendarDays,
    accent: "var(--crimson-love)",
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

  const itemListJsonLd = {
    "@context": "https://schema.org",
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <MainHeader theme="dark" />
      <main id="main-content" className="flex-1">
        {/* ═══════════════════════════════════════
            Section A — COSMIC HEARTS Hero
        ═══════════════════════════════════════ */}
        <section className="bg-immersive text-[var(--moonlight-cream)] min-h-[85vh] relative overflow-hidden flex items-center">
          <CosmicHeartBackground />

          <Container size="wide" className="relative py-28 md:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="max-w-xl">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--cosmic-rose)] font-semibold block mb-6">
                  Written in the stars · Felt in the heart
                </span>
                <h1
                  className="text-[var(--moonlight-cream)] mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-display-1)",
                    lineHeight: "var(--leading-display)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Free Zodiac Compatibility{" "}
                  <em className="text-rose-gradient not-italic">Calculators</em>
                </h1>
                <p className="text-[var(--neutral-300)] leading-relaxed text-[1.05rem] mb-10 max-w-md">
                  Real planetary positions calculated in your browser.
                  Venus, Moon, Mars, and full birth-chart tools for love,
                  soulmates, and marriage compatibility.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href="/love-compatibility"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[var(--crimson-love)] text-white font-semibold rounded-[var(--radius-xl)] hover:bg-[var(--primary-600)] transition-all hover:shadow-[0_8px_30px_rgba(181,45,82,0.4)] hover:-translate-y-0.5"
                  >
                    <Heart className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                    Explore Love Compatibility
                  </Link>
                  <Link
                    href="/love-language-calculator"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-[var(--cosmic-rose)]/30 text-[var(--moonlight-cream)] font-medium rounded-[var(--radius-xl)] hover:border-[var(--cosmic-rose)] hover:text-[var(--cosmic-rose)] transition-all glass-dark"
                  >
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Discover Your Love Language
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 lg:h-[460px] lg:w-[460px]">
                <CosmicHeartMark />
              </div>
            </div>
          </Container>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ScrollIndicator />
          </div>
        </section>

        {/* ═══════════════════════════════════════
            Section B — Discovery (blush/cream)
        ═══════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 section-glow overflow-hidden">
          <RomanticGradient className="absolute inset-0" />
          <ConstellationDecoration className="absolute top-8 right-6 hidden md:block opacity-80" />
          <Container size="standard" className="relative">
            <ScrollFadeIn>
              <SectionHeading
                eyebrow="Your Cosmic Story"
                headline={
                  <>
                    Every{" "}
                    <em className="text-serif-italic">heart</em> has its own universe.
                  </>
                }
                body="Your Venus sign, Moon compatibility, and birth-chart synastry each answer a different question about the same relationship."
              />
            </ScrollFadeIn>

            <div className="mt-20 space-y-16 md:space-y-20">
              {/* Pillar 1 — Discover Yourself */}
              <ScrollFadeIn delay={100} direction="left">
                <div className="max-w-lg">
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
                        Explore your romantic personality and emotional needs.
                        Understand your Venus sign, the love language written
                        in your chart, and your deepest attraction patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>

              {/* Pillar 2 — Understand Your Connection */}
              <ScrollFadeIn delay={200}>
                <div className="max-w-lg mx-auto md:ms-auto md:me-16">
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
                        Understand Your <em className="text-serif-italic">Connection</em>
                      </h3>
                      <p className="text-[var(--color-muted-fg)] leading-relaxed">
                        Discover the cosmic patterns between two birth charts.
                        Explore compatibility, attraction dynamics, and the
                        celestial chemistry that draws two people together.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>

              {/* Pillar 3 — Explore Your Journey */}
              <ScrollFadeIn delay={300} direction="right">
                <div className="max-w-lg ms-auto">
                  <div className="flex items-start gap-6">
                    <span
                      className="text-crimson-gradient flex-shrink-0"
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
                        Understand relationship patterns, celestial timing,
                        and the meaningful milestones that shape your
                        romantic path through the stars.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════
            Section C — Featured Love Tools (warm gradient)
        ═══════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-warm-gradient">
          <Container size="wide">
            <ScrollFadeIn>
              <SectionHeading
                eyebrow="Cosmic connection tools"
                headline={
                  <>
                    Unlock the secrets of your cosmic{" "}
                    <em className="text-serif-italic">connection.</em>
                  </>
                }
                body="Sun through Pluto come from the astronomy-engine ephemeris. Each tool explains its score. Birth data stays in your browser."
              />
            </ScrollFadeIn>

            {/* Bento grid */}
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
                        className={`h-full rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(49,13,37,0.08)] hover:-translate-y-1 hover:border-[var(--cosmic-rose)]/40 card-glow relative ${isLarge ? "p-8 md:p-10" : "p-7"}`}
                      >
                        <div
                          className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${tool.accent} 10%, var(--color-surface))`,
                          }}
                        >
                          <Icon
                            className="w-5.5 h-5.5"
                            style={{ color: tool.accent }}
                          />
                        </div>
                        <h3
                          className="font-semibold mb-2.5 group-hover:text-[var(--crimson-love)] transition-colors duration-300"
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
                        <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-[var(--crimson-love)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                          className="group flex items-center gap-3 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--cosmic-rose)]/40 hover:shadow-[var(--shadow-sm)] transition-all"
                        >
                          <Icon
                            className="w-4.5 h-4.5 flex-shrink-0"
                            style={{ color: tool.accent }}
                          />
                          <span className="text-sm font-medium group-hover:text-[var(--crimson-love)] transition-colors">
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
            Section C½ — Sign Pair Compatibility Grid
        ═══════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-[var(--color-bg-alt)]">
          <Container size="standard">
            <ScrollFadeIn>
              <SectionHeading
                eyebrow="78 Sign Pairings"
                headline={
                  <>
                    Sign-by-Sign{" "}
                    <em className="text-rose-gradient not-italic">
                      Compatibility
                    </em>
                  </>
                }
                body="Pick any two zodiac signs and get a free compatibility breakdown — scores, strengths, growth areas, and links to deeper chart tools."
              />
            </ScrollFadeIn>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {[
                { pair: "aries-and-leo", label: "Aries & Leo", symbols: "♈ ♌" },
                { pair: "taurus-and-cancer", label: "Taurus & Cancer", symbols: "♉ ♋" },
                { pair: "gemini-and-libra", label: "Gemini & Libra", symbols: "♊ ♎" },
                { pair: "cancer-and-scorpio", label: "Cancer & Scorpio", symbols: "♋ ♏" },
                { pair: "leo-and-sagittarius", label: "Leo & Sagittarius", symbols: "♌ ♐" },
                { pair: "virgo-and-capricorn", label: "Virgo & Capricorn", symbols: "♍ ♑" },
                { pair: "libra-and-aquarius", label: "Libra & Aquarius", symbols: "♎ ♒" },
                { pair: "scorpio-and-pisces", label: "Scorpio & Pisces", symbols: "♏ ♓" },
                { pair: "aries-and-libra", label: "Aries & Libra", symbols: "♈ ♎" },
                { pair: "taurus-and-scorpio", label: "Taurus & Scorpio", symbols: "♉ ♏" },
                { pair: "gemini-and-sagittarius", label: "Gemini & Sagittarius", symbols: "♊ ♐" },
                { pair: "cancer-and-capricorn", label: "Cancer & Capricorn", symbols: "♋ ♑" },
              ].map((item) => (
                <ScrollFadeIn key={item.pair}>
                  <Link
                    href={`/compatibility/${item.pair}` as never}
                    className="group flex flex-col items-center gap-1.5 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--cosmic-rose)]/40 hover:shadow-[var(--shadow-sm)] transition-all text-center"
                  >
                    <span className="text-lg">{item.symbols}</span>
                    <span className="text-xs font-medium group-hover:text-[var(--crimson-love)] transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </ScrollFadeIn>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/love-compatibility"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--crimson-love)] hover:underline"
              >
                View all 78 sign pairings
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════
            Section C¾ — Editorial Guides
        ═══════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <Container size="standard">
            <ScrollFadeIn>
              <SectionHeading
                eyebrow="Learn & Explore"
                headline={
                  <>
                    Love Astrology{" "}
                    <em className="text-serif-italic">Guides</em>
                  </>
                }
                body="Educational articles on zodiac compatibility, Venus and Moon signs, synastry, marriage astrology, and more."
              />
            </ScrollFadeIn>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                {
                  slug: "zodiac-compatibility-guide",
                  title: "Zodiac Compatibility Guide",
                  desc: "Elements, aspects, and modalities in love.",
                },
                {
                  slug: "venus-in-signs-guide",
                  title: "Venus in Every Sign",
                  desc: "How your Venus placement shapes romance.",
                },
                {
                  slug: "synastry-explained",
                  title: "Synastry Explained",
                  desc: "How to read a relationship chart.",
                },
                {
                  slug: "moon-signs-emotional-needs",
                  title: "Moon Signs & Emotional Needs",
                  desc: "What you truly need to feel loved.",
                },
                {
                  slug: "marriage-astrology-guide",
                  title: "Marriage Astrology",
                  desc: "The 7th house, Saturn, and commitment.",
                },
                {
                  slug: "venus-mars-chemistry",
                  title: "Venus–Mars Chemistry",
                  desc: "The astrology of attraction and desire.",
                },
              ].map((item) => (
                <ScrollFadeIn key={item.slug}>
                  <Link
                    href={`/guides/${item.slug}` as never}
                    className="group flex flex-col gap-1.5 p-5 rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--cosmic-rose)]/40 hover:shadow-[var(--shadow-sm)] transition-all"
                  >
                    <span
                      className="text-sm font-semibold group-hover:text-[var(--crimson-love)] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </span>
                    <span className="text-xs text-[var(--color-muted-fg)]">
                      {item.desc}
                    </span>
                  </Link>
                </ScrollFadeIn>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={"/guides" as never}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--crimson-love)] hover:underline"
              >
                View all guides
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════
            Section D — Storytelling (dark cosmic)
        ═══════════════════════════════════════ */}
        <section className="bg-immersive text-[var(--moonlight-cream)] py-24 md:py-32 relative overflow-hidden">
          <CosmicHeartBackground intensity="quiet" />

          <Container size="wide" className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollFadeIn direction="left">
                <div className="relative mx-auto h-64 w-64 lg:h-80 lg:w-80">
                  <CosmicHeartMark />
                </div>
              </ScrollFadeIn>

              {/* Right — Editorial text */}
              <ScrollFadeIn direction="right">
                <div className="max-w-lg">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--cosmic-rose)] font-semibold block mb-5">
                    Beyond Attraction. Beyond the Stars.
                  </span>
                  <h2
                    className="text-[var(--moonlight-cream)] mb-6"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h2)",
                      lineHeight: "var(--leading-heading)",
                      fontWeight: 500,
                    }}
                  >
                    Your Venus reveals how you{" "}
                    <em className="text-rose-gradient not-italic">love.</em>
                  </h2>
                  <div className="space-y-4 text-[var(--neutral-300)] leading-relaxed">
                    <p>
                      Your Venus reveals how you love. Your Moon reveals what
                      your heart needs. Mars reveals the spark of attraction.
                    </p>
                    <p>
                      Birth-chart tools calculate those positions from the
                      astronomy-engine ephemeris and show the method behind
                      every score.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/birth-chart-compatibility"
                      className="group inline-flex items-center gap-2.5 px-6 py-3 bg-[var(--crimson-love)] text-white font-semibold rounded-[var(--radius-lg)] hover:bg-[var(--primary-600)] transition-all hover:shadow-[0_6px_24px_rgba(181,45,82,0.35)]"
                    >
                      Explore Your Cosmic Blueprint
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollFadeIn>
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════
            Section E — How It Works (light editorial)
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
              <div className="hidden md:block absolute top-4 left-[12%] right-[12%] h-16">
                <ConnectedStars />
              </div>

              {[
                {
                  num: "01",
                  title: "Share your birth details",
                  desc: "Date, time, and location. Everything stays private in your browser.",
                },
                {
                  num: "02",
                  title: "Discover your celestial patterns",
                  desc: "Real astronomical calculations reveal your planetary placements and aspects.",
                },
                {
                  num: "03",
                  title: "Understand your cosmic connection",
                  desc: "Explore compatibility, romantic nature, and the relationship dynamics written in the stars.",
                },
              ].map((step, i) => (
                <ScrollFadeIn key={step.num} delay={i * 150}>
                  <div className="text-center relative">
                    <div
                      className="text-rose-gradient mb-4 inline-block"
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
            Section F — Final CTA (dark burgundy)
        ═══════════════════════════════════════ */}
        <section className="bg-cosmic-gradient text-[var(--moonlight-cream)] py-24 md:py-32 relative overflow-hidden">
          <CosmicHeartBackground intensity="quiet" heart="corner" />
          <Container size="standard" className="relative text-center">
            <ScrollFadeIn>
              <h2
                className="text-[var(--moonlight-cream)] mb-6 max-w-2xl mx-auto"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h1)",
                  lineHeight: "var(--leading-heading)",
                  fontWeight: 500,
                }}
              >
                Perhaps your story was{" "}
                <em className="text-rose-gradient not-italic">
                  written in the stars.
                </em>
              </h2>
              <p className="text-[var(--neutral-300)] mb-10 max-w-lg mx-auto leading-relaxed">
                Start with a zodiac comparison, a Venus sign, or two birth
                charts. The calculation stays in your browser.
              </p>
              <Link
                href="/love-compatibility"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--crimson-love)] text-white font-semibold rounded-[var(--radius-xl)] hover:bg-[var(--primary-600)] transition-all hover:shadow-[0_8px_30px_rgba(181,45,82,0.4)] hover:-translate-y-0.5 text-base"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Discover Your Connection
              </Link>
            </ScrollFadeIn>
          </Container>
        </section>

        {/* ═══════════════════════════════════════
            Section G — Trust Bar
        ═══════════════════════════════════════ */}
        <section className="py-10 border-t border-[var(--color-border-subtle)]">
          <Container size="wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {[
                {
                  icon: <Globe className="w-5 h-5" style={{ color: "var(--crimson-love)" }} />,
                  title: "Precise Ephemeris",
                  text: "Sun through Pluto from the astronomy-engine ephemeris.",
                },
                {
                  icon: <Lock className="w-5 h-5" style={{ color: "var(--cosmic-rose)" }} />,
                  title: "Privacy First",
                  text: "All calculations run in your browser. Data never leaves your device.",
                },
                {
                  icon: <FileText className="w-5 h-5" style={{ color: "var(--rose-gold)" }} />,
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
