"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { ZodiacSelector } from "@/components/calculators/ZodiacSelector";
import { ResultsSection, InsightBlock, ScoreSummary, RelatedTools, FAQSection, ShareResult } from "@/components/calculators/ResultsSection";
import { CompatibilityScore } from "@/components/astrology/CompatibilityScore";
import { Button } from "@/components/ui/Button";
import type { ZodiacSign } from "@/lib/astrology-data";
import { getSignCompatibilityScore, type CompatibilityResult } from "@/lib/astro-engine";
import { Heart, MessageCircle, Flame, Shield, Star, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function LoveCompatibilityPage() {
  const [sign1, setSign1] = useState<ZodiacSign | undefined>();
  const [sign2, setSign2] = useState<ZodiacSign | undefined>();
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const handleCalculate = () => {
    if (!sign1 || !sign2) return;
    const r = getSignCompatibilityScore(sign1, sign2);
    setResult(r);
  };

  const handleReset = () => {
    setSign1(undefined);
    setSign2(undefined);
    setResult(null);
  };

  return (
    <CalculatorShell
      title="Love Compatibility Calculator"
      subtitle="Zodiac Compatibility"
      description="Discover how your zodiac signs connect in love. Select both signs to reveal your emotional, romantic, and long-term compatibility."
      icon={<Heart className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      {/* Introduction */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          Zodiac compatibility examines the astrological relationship between two signs based on their
          elemental nature, modality, and position in the zodiac wheel. While Sun sign compatibility
          is just one layer of a complex astrological picture, it provides meaningful insight into
          the fundamental dynamics of a relationship.
        </p>
      </div>

      {/* Calculator Form */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ZodiacSelector
              label="Your Zodiac Sign"
              value={sign1}
              onChange={setSign1}
            />
            <ZodiacSelector
              label="Partner's Zodiac Sign"
              value={sign2}
              onChange={setSign2}
            />
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCalculate}
              disabled={!sign1 || !sign2}
              icon={<Heart className="w-4 h-4" />}
            >
              Calculate Compatibility
            </Button>
            {result && (
              <Button variant="outline" size="lg" onClick={handleReset}>
                Start Over
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && sign1 && sign2 && (
        <>
          <ResultsSection title="Your Compatibility Results">
            <CompatibilityScore
              sign1={sign1}
              sign2={sign2}
              overallScore={result.overall}
              summary={result.summary}
              categories={[
                { label: "Emotional Connection", score: result.emotional },
                { label: "Communication", score: result.communication },
                { label: "Romantic Chemistry", score: result.romance },
                { label: "Shared Values", score: result.values },
                { label: "Long-term Potential", score: result.longTerm },
              ]}
            />

            <ShareResult
              title={`${sign1} & ${sign2} Love Compatibility`}
              text={`${sign1} and ${sign2} have ${result.overall}% compatibility!`}
            />
          </ResultsSection>

          {/* Detailed Scores */}
          <div className="mt-10">
            <ScoreSummary
              scores={[
                { label: "Overall", value: result.overall },
                { label: "Emotional", value: result.emotional },
                { label: "Communication", value: result.communication },
                { label: "Romance", value: result.romance },
                { label: "Values", value: result.values },
                { label: "Long-term", value: result.longTerm },
              ]}
            />
          </div>

          {/* Strengths */}
          <div className="mt-10">
            <h3
              className="text-center mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              Relationship Strengths
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {result.strengths.map((s, i) => (
                <InsightBlock
                  key={i}
                  title={`Strength ${i + 1}`}
                  content={s}
                  icon={<Star className="w-4 h-4" />}
                  variant="gold"
                />
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="mt-10">
            <h3
              className="text-center mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              Growth Areas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {result.challenges.map((c, i) => (
                <InsightBlock
                  key={i}
                  title={`Growth Area ${i + 1}`}
                  content={c}
                  icon={<AlertTriangle className="w-4 h-4" />}
                  variant="rose"
                />
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3
              className="text-center mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              How Zodiac Compatibility Works
            </h3>
            <div className="text-sm text-[var(--color-muted-fg)] leading-relaxed space-y-3">
              <p>
                Zodiac compatibility is based on the angular relationship (aspect) between two signs in the zodiac wheel.
                Signs that are 120° apart (trine) share the same element and naturally harmonize.
                Signs that are 60° apart (sextile) have complementary elements.
                Signs that are 90° apart (square) create dynamic tension that can fuel growth.
                Opposite signs (180°) are magnetically attracted through their complementary qualities.
              </p>
              <p>
                This calculator evaluates the fundamental sign-to-sign relationship. For a more detailed
                analysis considering Moon, Venus, Mars, and other planetary placements, try our
                advanced birth chart compatibility tool.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Sign Pair Pages */}
      <div className="mt-12 mb-8">
        <h2
          className="text-center mb-6"
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
        >
          Explore Every Sign Pairing
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-2xl mx-auto">
          {[
            "aries-and-taurus", "aries-and-gemini", "aries-and-cancer", "aries-and-leo",
            "aries-and-virgo", "aries-and-libra", "aries-and-scorpio", "aries-and-sagittarius",
            "taurus-and-cancer", "taurus-and-virgo", "taurus-and-scorpio", "taurus-and-capricorn",
            "gemini-and-leo", "gemini-and-libra", "gemini-and-sagittarius", "gemini-and-aquarius",
            "cancer-and-scorpio", "cancer-and-pisces", "leo-and-sagittarius", "leo-and-aquarius",
            "virgo-and-capricorn", "libra-and-aquarius", "scorpio-and-pisces", "sagittarius-and-aquarius",
          ].map((pair) => {
            const [a, b] = pair.split("-and-");
            return (
              <Link
                key={pair}
                href={`/compatibility/${pair}` as never}
                className="text-xs text-center py-2 px-3 rounded-lg border border-[var(--color-border-subtle)] hover:border-[var(--cosmic-rose)]/40 hover:text-[var(--crimson-love)] transition-colors"
              >
                {a.charAt(0).toUpperCase() + a.slice(1)} & {b.charAt(0).toUpperCase() + b.slice(1)}
              </Link>
            );
          })}
        </div>
        <p className="text-center mt-4 text-xs text-[var(--color-muted-fg)]">
          All 78 sign combinations available — search any two signs above.
        </p>
      </div>

      {/* FAQ */}
      <FAQSection
        items={[
          {
            question: "How accurate is zodiac sign compatibility?",
            answer: "Sun sign compatibility provides a broad overview of relationship dynamics. For a more nuanced picture, a full synastry chart comparing Moon, Venus, Mars, and other planetary placements is recommended.",
          },
          {
            question: "Can incompatible signs have a good relationship?",
            answer: "Absolutely. Sun sign compatibility is just one factor. Many thriving relationships exist between signs that are traditionally considered challenging. Personal growth, communication, and effort matter more than any astrological factor.",
          },
          {
            question: "What makes two zodiac signs compatible?",
            answer: "Signs of the same element (Fire, Earth, Air, Water) naturally understand each other. Complementary elements (Fire-Air, Earth-Water) also tend to harmonize well. The angular aspect between signs in the zodiac wheel determines the type of energy in the connection.",
          },
          {
            question: "Should I avoid dating incompatible signs?",
            answer: "No. Astrology offers insight and self-awareness, not rigid rules. Every sign combination has strengths and growth areas. What matters most is how both people communicate, respect each other, and grow together.",
          },
        ]}
      />

      {/* Related Tools */}
      <RelatedTools
        tools={[
          {
            title: "Venus Sign Calculator",
            description: "Discover your Venus sign and how you express love.",
            href: "/venus-sign-calculator",
          },
          {
            title: "Moon Sign Compatibility",
            description: "Compare emotional compatibility through Moon signs.",
            href: "/moon-sign-compatibility",
          },
          {
            title: "Marriage Compatibility",
            description: "Explore long-term relationship potential.",
            href: "/marriage-compatibility",
          },
        ]}
      />
    </CalculatorShell>
  );
}
