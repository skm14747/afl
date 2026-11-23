"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import { ResultsSection, InsightBlock, ScoreSummary, RelatedTools, FAQSection, ShareResult } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ZodiacIcon } from "@/components/astrology/ZodiacIcon";
import {
  calculateNatalChart,
  calculateChartCompatibility,
  VENUS_SIGN_INTERPRETATIONS,
  MOON_SIGN_INTERPRETATIONS,
  type BirthDetails,
  type NatalChart,
  type CompatibilityResult,
} from "@/lib/astro-engine";
import { Heart, Shield, MessageCircle, Sparkles, AlertTriangle, Star } from "lucide-react";

export default function MarriageCompatibilityPage() {
  const [personA, setPersonA] = useState<Partial<BirthDetails>>({});
  const [personB, setPersonB] = useState<Partial<BirthDetails>>({});
  const [chartA, setChartA] = useState<NatalChart | null>(null);
  const [chartB, setChartB] = useState<NatalChart | null>(null);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [errors, setErrors] = useState<{ a: Record<string, string>; b: Record<string, string> }>({ a: {}, b: {} });

  const handleCalculate = () => {
    const errA: Record<string, string> = {};
    const errB: Record<string, string> = {};
    if (!personA.date) errA.date = "Required";
    if (!personB.date) errB.date = "Required";
    if (Object.keys(errA).length > 0 || Object.keys(errB).length > 0) {
      setErrors({ a: errA, b: errB });
      return;
    }
    setErrors({ a: {}, b: {} });

    const cA = calculateNatalChart(personA as BirthDetails);
    const cB = calculateNatalChart(personB as BirthDetails);
    setChartA(cA);
    setChartB(cB);
    setResult(calculateChartCompatibility(cA, cB));
  };

  return (
    <CalculatorShell
      title="Marriage Compatibility"
      subtitle="Long-term Partnership"
      description="Explore the astrological dynamics of a long-term partnership. This tool compares natal charts to reveal emotional, romantic, and commitment-related compatibility themes."
      icon={<Shield className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          Marriage compatibility in astrology examines how two charts interact across
          the dimensions most relevant to long-term partnership: emotional bonding, communication
          harmony, romantic attraction, shared values, and commitment potential.
          No astrological score can predict marriage success — but understanding your dynamics
          can support better communication and self-awareness.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BirthDetailsForm
              label="Person A"
              value={personA}
              onChange={setPersonA}
              showTime
              errors={errors.a}
            />
            <BirthDetailsForm
              label="Person B"
              value={personB}
              onChange={setPersonB}
              showTime
              errors={errors.b}
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCalculate}
              icon={<Shield className="w-4 h-4" />}
            >
              Analyze Marriage Compatibility
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {result && chartA && chartB && (
        <>
          <ResultsSection title="Partnership Analysis">
            {/* Planetary overview */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto mb-10">
              {(["sun", "moon", "venus", "mars", "saturn"] as const).map((planet) => {
                const a = chartA[planet];
                const b = chartB[planet];
                const labels: Record<string, string> = {
                  sun: "Identity",
                  moon: "Emotions",
                  venus: "Love",
                  mars: "Passion",
                  saturn: "Commitment",
                };
                return (
                  <div key={planet} className="text-center">
                    <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-2">
                      {labels[planet]}
                    </div>
                    <div className="flex justify-center gap-1 mb-1">
                      <ZodiacIcon sign={a.sign} size="sm" />
                      <ZodiacIcon sign={b.sign} size="sm" />
                    </div>
                    <div className="text-[10px] text-[var(--color-muted-fg)]">
                      {a.sign} / {b.sign}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scores */}
            <ScoreSummary
              scores={[
                { label: "Overall", value: result.overall },
                { label: "Emotional Bond", value: result.emotional },
                { label: "Communication", value: result.communication },
                { label: "Romance", value: result.romance },
                { label: "Shared Values", value: result.values },
                { label: "Long-term", value: result.longTerm },
              ]}
            />

            {/* Summary */}
            <div className="max-w-2xl mx-auto mt-8 text-center">
              <p
                className="text-lg italic text-[var(--color-fg)] leading-relaxed"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;{result.summary}&rdquo;
              </p>
            </div>

            <ShareResult
              title="Marriage Compatibility"
              text={`Our marriage compatibility: ${result.overall}% overall`}
            />
          </ResultsSection>

          {/* Strengths & Challenges */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3
                className="mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}
              >
                <Star className="w-4 h-4 text-[var(--champagne-gold)]" />
                Partnership Strengths
              </h3>
              <div className="space-y-3">
                {result.strengths.map((s, i) => (
                  <InsightBlock key={i} title="" content={s} variant="gold" />
                ))}
              </div>
            </div>
            <div>
              <h3
                className="mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}
              >
                <AlertTriangle className="w-4 h-4 text-[var(--romantic-rose)]" />
                Areas for Growth
              </h3>
              <div className="space-y-3">
                {result.challenges.map((c, i) => (
                  <InsightBlock key={i} title="" content={c} variant="rose" />
                ))}
              </div>
            </div>
          </div>

          {/* Synastry aspects */}
          {result.aspects.length > 0 && (
            <div className="mt-10 max-w-3xl mx-auto">
              <h3
                className="text-center mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
              >
                Planetary Aspects Between Charts
              </h3>
              <Card variant="default" padding="md">
                <div className="divide-y divide-[var(--color-border-subtle)]">
                  {result.aspects.slice(0, 10).map((a, i) => (
                    <div key={i} className="py-3 flex items-center justify-between gap-3">
                      <div className="text-sm">
                        <span className="font-medium">{a.planet1}</span>
                        <span className="text-[var(--color-muted-fg)]"> {a.aspect} </span>
                        <span className="font-medium">{a.planet2}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--color-muted-fg)]">
                          Orb: {a.orb.toFixed(1)}°
                        </span>
                        <Badge
                          variant={a.nature === "harmonious" ? "success" : a.nature === "challenging" ? "warning" : "default"}
                        >
                          {a.nature}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Venus-Moon analysis */}
          <div className="mt-10 max-w-3xl mx-auto">
            <h3
              className="text-center mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              Love Language Comparison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="default" padding="md">
                <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-2">Person A — Venus in {chartA.venus.sign}</div>
                <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
                  {VENUS_SIGN_INTERPRETATIONS[chartA.venus.sign].expression}
                </p>
              </Card>
              <Card variant="default" padding="md">
                <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-2">Person B — Venus in {chartB.venus.sign}</div>
                <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
                  {VENUS_SIGN_INTERPRETATIONS[chartB.venus.sign].expression}
                </p>
              </Card>
            </div>
          </div>

          {/* Scoring methodology */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3
              className="text-center mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              How This Score Is Calculated
            </h3>
            <div className="text-sm text-[var(--color-muted-fg)] leading-relaxed space-y-3">
              <p>
                This compatibility analysis compares the actual planetary positions in both birth charts
                using precise ephemeris calculations. It evaluates major aspects (conjunction, sextile,
                square, trine, opposition) between the five personal planets: Sun, Moon, Mercury, Venus,
                and Mars.
              </p>
              <p>
                Scores are weighted by relevance: Venus-Mars aspects influence romance scores,
                Moon contacts affect emotional scores, Mercury aspects shape communication scores,
                and Sun-Saturn contacts inform long-term indicators.
              </p>
              <p>
                These scores reflect astrological dynamics — not a prediction of relationship success.
                Every partnership requires communication, effort, and mutual respect regardless of
                astrological compatibility.
              </p>
            </div>
          </div>
        </>
      )}

      <FAQSection
        items={[
          {
            question: "Can astrology predict if a marriage will work?",
            answer: "No. Astrology can illuminate the dynamics, strengths, and growth areas of a partnership, but no chart comparison can predict the success or failure of a marriage. Human choices, communication, and effort are always the determining factors.",
          },
          {
            question: "What's the difference between this and Sun sign compatibility?",
            answer: "Sun sign compatibility compares only one placement. This tool compares the actual positions of Sun, Moon, Mercury, Venus, and Mars in both charts, analyzing the specific aspects (angles) between them for a much more detailed picture.",
          },
          {
            question: "Is this Vedic (Guna Milan) or Western astrology?",
            answer: "This tool uses Western tropical astrology. Vedic astrology's Guna Milan system uses a different zodiac and scoring methodology. Both traditions offer valid perspectives but should not be mixed in a single analysis.",
          },
          {
            question: "Do I need exact birth times?",
            answer: "Birth times improve accuracy, especially for Moon sign (which moves quickly). Without times, Moon placement may be approximate. All other planet positions remain accurate for date-based calculation.",
          },
        ]}
      />

      <RelatedTools
        tools={[
          {
            title: "Love Compatibility",
            description: "Quick zodiac sign comparison.",
            href: "/love-compatibility",
          },
          {
            title: "Moon Sign Compatibility",
            description: "Focus on emotional compatibility.",
            href: "/moon-sign-compatibility",
          },
          {
            title: "Birth Chart Compatibility",
            description: "Full synastry analysis.",
            href: "/birth-chart-compatibility",
          },
        ]}
      />
    </CalculatorShell>
  );
}
