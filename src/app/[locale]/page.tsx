import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CosmicSymbol } from "@/components/branding/CosmicSymbol";
import { Card } from "@/components/ui/Card";
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
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";

const tools: Array<{
  title: string;
  description: string;
  href: "/" | "/love-compatibility" | "/venus-sign-calculator" | "/moon-sign-compatibility" | "/soulmate-calculator" | "/marriage-compatibility" | "/birth-chart-compatibility" | "/twin-flame-calculator" | "/relationship-numerology" | "/rising-sign-compatibility" | "/ex-compatibility" | "/zodiac-love";
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}> = [
  {
    title: "Love Compatibility",
    description: "Discover how your zodiac signs connect in love, communication, and romance.",
    href: "/love-compatibility",
    icon: Heart,
    accent: "var(--romantic-rose)",
  },
  {
    title: "Venus Sign Calculator",
    description: "Find your Venus sign and understand your romantic nature and love language.",
    href: "/venus-sign-calculator",
    icon: Sparkles,
    accent: "var(--champagne-gold)",
  },
  {
    title: "Moon Sign Compatibility",
    description: "Compare Moon placements to reveal emotional compatibility and nurturing styles.",
    href: "/moon-sign-compatibility",
    icon: Moon,
    accent: "var(--lavender-mist)",
  },
  {
    title: "Soulmate Calculator",
    description: "Explore your astrological profile for romantic tendencies and partner insights.",
    href: "/soulmate-calculator",
    icon: Star,
    accent: "var(--champagne-gold)",
  },
  {
    title: "Marriage Compatibility",
    description: "Chart-based analysis of emotional, romantic, and long-term partnership potential.",
    href: "/marriage-compatibility",
    icon: Shield,
    accent: "var(--lavender-mist)",
  },
  {
    title: "Birth Chart Compatibility",
    description: "Full synastry analysis comparing two natal charts across all personal planets.",
    href: "/birth-chart-compatibility",
    icon: Compass,
    accent: "var(--champagne-gold)",
  },
  {
    title: "Twin Flame Calculator",
    description: "Examine synastry indicators traditionally associated with deep soul connections.",
    href: "/twin-flame-calculator",
    icon: Flame,
    accent: "var(--romantic-rose)",
  },
  {
    title: "Relationship Numerology",
    description: "Compare Life Path numbers for numerological relationship insights.",
    href: "/relationship-numerology",
    icon: Hash,
    accent: "var(--lavender-mist)",
  },
  {
    title: "Rising Sign Compatibility",
    description: "Compare Ascendants for first-impression and partnership dynamics.",
    href: "/rising-sign-compatibility",
    icon: Sunrise,
    accent: "var(--champagne-gold)",
  },
  {
    title: "Ex-Relationship Insights",
    description: "Reflect on past relationship dynamics through an astrological lens.",
    href: "/ex-compatibility",
    icon: RotateCcw,
    accent: "var(--romantic-rose)",
  },
  {
    title: "Zodiac Love Guide",
    description: "Explore how each zodiac sign expresses love, with strengths and best matches.",
    href: "/zodiac-love",
    icon: BookOpen,
    accent: "var(--lavender-mist)",
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <MainHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[var(--cosmic-navy)] text-[var(--ivory)] py-20 md:py-28 bg-stars relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 40%, var(--champagne-gold), transparent 50%), radial-gradient(ellipse at 70% 60%, var(--romantic-rose), transparent 50%)",
            }}
          />
          <Container size="standard" className="relative text-center">
            <div className="flex justify-center mb-6">
              <CosmicSymbol size={80} variant="gold" />
            </div>
            <h1
              className="text-[var(--ivory)] mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display-1)",
                lineHeight: "var(--leading-display)",
                fontWeight: 600,
              }}
            >
              AstrologyForLove
            </h1>
            <p
              className="text-[var(--champagne-gold)] text-lg italic mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Written in the Stars. Felt in the Heart.
            </p>
            <p className="text-[var(--neutral-300)] max-w-2xl mx-auto leading-relaxed mb-8">
              Premium love astrology tools powered by real astronomical calculations. Explore
              zodiac compatibility, discover your Venus sign, and understand the cosmic patterns
              that shape your relationships.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="/love-compatibility"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--champagne-gold)] text-[var(--cosmic-navy)] font-medium rounded-[var(--radius-md)] hover:bg-[var(--gold-500)] transition-colors"
              >
                <Heart className="w-4 h-4" />
                Check Compatibility
              </a>
              <a
                href="/venus-sign-calculator"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--primary-500)] text-[var(--ivory)] font-medium rounded-[var(--radius-md)] hover:bg-[var(--primary-700)] transition-colors"
              >
                Find Your Venus Sign
              </a>
            </div>
          </Container>
        </section>

        {/* Tools Grid */}
        <section className="py-16 md:py-20">
          <Container size="wide">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.15em] text-[var(--champagne-gold)] block mb-2">
                Astrology Tools
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h2)",
                  lineHeight: "var(--leading-heading)",
                  fontWeight: 600,
                }}
              >
                Explore Your Cosmic Love Story
              </h2>
              <p className="text-[var(--color-muted-fg)] mt-3 max-w-xl mx-auto">
                Each tool uses precise astronomical calculations. All computations happen
                in your browser — your personal data never leaves your device.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.href} href={tool.href} className="group block">
                    <Card
                      variant="default"
                      hover
                      padding="md"
                      className="h-full"
                    >
                      <div
                        className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center mb-4"
                        style={{ backgroundColor: `color-mix(in srgb, ${tool.accent} 15%, transparent)` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: tool.accent }} />
                      </div>
                      <h3
                        className="font-semibold mb-2 group-hover:text-[var(--champagne-gold)] transition-colors"
                        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}
                      >
                        {tool.title}
                      </h3>
                      <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
                        {tool.description}
                      </p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Trust section */}
        <section className="py-16 bg-[var(--color-muted)]">
          <Container size="standard" className="text-center">
            <h2
              className="mb-8"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", fontWeight: 600 }}
            >
              Built on Real Astronomy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl mb-2">🔭</div>
                <h3 className="font-semibold mb-2">Precise Ephemeris</h3>
                <p className="text-sm text-[var(--color-muted-fg)]">
                  Planetary positions calculated using astronomical algorithms — not lookup tables
                  or random scores.
                </p>
              </div>
              <div>
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-[var(--color-muted-fg)]">
                  All calculations run in your browser. Birth data never leaves your device or
                  gets sent to any server.
                </p>
              </div>
              <div>
                <div className="text-2xl mb-2">📐</div>
                <h3 className="font-semibold mb-2">Transparent Method</h3>
                <p className="text-sm text-[var(--color-muted-fg)]">
                  Scoring methodology explained on every tool. No hidden formulas or misleading
                  certainty.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
