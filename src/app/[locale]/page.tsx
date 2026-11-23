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
        {/* ── Hero ── */}
        <section className="bg-cosmic-gradient text-[var(--ivory)] py-24 md:py-36 bg-stars relative overflow-hidden">
          {/* Atmospheric glow orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[100px]"
              style={{ background: "var(--champagne-gold)", top: "-10%", left: "15%" }}
            />
            <div
              className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[80px]"
              style={{ background: "var(--romantic-rose)", bottom: "-5%", right: "10%" }}
            />
            <div
              className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[60px]"
              style={{ background: "var(--lavender-mist)", top: "30%", right: "30%" }}
            />
          </div>

          <Container size="standard" className="relative text-center">
            <div className="flex justify-center mb-8 animate-float">
              <CosmicSymbol size={90} variant="gold" />
            </div>
            <h1
              className="text-[var(--ivory)] mb-5"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display-1)",
                lineHeight: "var(--leading-display)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              AstrologyForLove
            </h1>
            <p
              className="text-gold-gradient text-xl md:text-2xl italic mb-6 underline-gold"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Written in the Stars. Felt in the Heart.
            </p>
            <p className="text-[var(--neutral-300)] max-w-2xl mx-auto leading-relaxed mb-10 text-[1.05rem]">
              Premium love astrology tools powered by real astronomical calculations. Explore
              zodiac compatibility, discover your Venus sign, and understand the cosmic patterns
              that shape your relationships.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/love-compatibility"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[var(--champagne-gold)] text-[var(--cosmic-navy)] font-semibold rounded-[var(--radius-xl)] hover:bg-[var(--gold-300)] transition-all hover:shadow-[0_8px_30px_rgba(216,175,121,0.3)] hover:-translate-y-0.5"
              >
                <Heart className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                Check Compatibility
              </Link>
              <Link
                href="/venus-sign-calculator"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-[var(--primary-400)] text-[var(--ivory)] font-medium rounded-[var(--radius-xl)] hover:border-[var(--champagne-gold)] hover:text-[var(--champagne-gold)] transition-all glass-dark"
              >
                <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Find Your Venus Sign
              </Link>
            </div>
          </Container>
        </section>

        {/* ── Tools Grid ── */}
        <section className="py-20 md:py-28 bg-warm-gradient">
          <Container size="wide">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--champagne-gold)] font-semibold block mb-3">
                ✦&ensp;Astrology Tools&ensp;✦
              </span>
              <h2
                className="underline-gold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h2)",
                  lineHeight: "var(--leading-heading)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                Explore Your Cosmic Love Story
              </h2>
              <p className="text-[var(--color-muted-fg)] mt-5 max-w-xl mx-auto leading-relaxed">
                Each tool uses precise astronomical calculations. All computations happen
                in your browser — your personal data never leaves your device.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group block"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="h-full rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-7 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(23,21,45,0.08)] hover:-translate-y-1 hover:border-[var(--gold-200)] card-glow relative">
                      <div
                        className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `color-mix(in srgb, ${tool.accent} 12%, var(--color-surface))` }}
                      >
                        <Icon className="w-5.5 h-5.5" style={{ color: tool.accent }} />
                      </div>
                      <h3
                        className="font-semibold mb-2.5 group-hover:text-[var(--champagne-gold)] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}
                      >
                        {tool.title}
                      </h3>
                      <p className="text-sm text-[var(--color-muted-fg)] leading-[1.7]">
                        {tool.description}
                      </p>
                      <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-[var(--champagne-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Explore</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5"><path d="m9 18 6-6-6-6"/></svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── Trust section ── */}
        <section className="py-20 md:py-24 relative section-glow">
          <Container size="standard">
            <div className="text-center mb-14">
              <h2
                className="underline-gold"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", fontWeight: 600 }}
              >
                Built on Real Astronomy
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--champagne-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
                  title: "Precise Ephemeris",
                  text: "Planetary positions calculated using astronomical algorithms — not lookup tables or random scores.",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--romantic-rose)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
                  title: "Privacy First",
                  text: "All calculations run in your browser. Birth data never leaves your device or gets sent to any server.",
                },
                {
                  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--lavender-mist)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
                  title: "Transparent Method",
                  text: "Scoring methodology explained on every tool. No hidden formulas or misleading certainty.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-muted)] mb-5 group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3
                    className="font-semibold mb-3"
                    style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed max-w-xs mx-auto">
                    {item.text}
                  </p>
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
