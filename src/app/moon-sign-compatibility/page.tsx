"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import { ResultsSection, InsightBlock, ScoreSummary, RelatedTools, FAQSection, ShareResult } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ZodiacIcon } from "@/components/astrology/ZodiacIcon";
import { CompatibilityScore } from "@/components/astrology/CompatibilityScore";
import {
  calculateNatalChart,
  getSignCompatibilityScore,
  MOON_SIGN_INTERPRETATIONS,
  type BirthDetails,
  type NatalChart,
} from "@/lib/astro-engine";
import { Moon, Heart, MessageCircle, Shield, Sparkles } from "lucide-react";

interface PersonResult {
  chart: NatalChart;
  details: BirthDetails;
}

export default function MoonSignCompatibilityPage() {
  const [personA, setPersonA] = useState<Partial<BirthDetails>>({});
  const [personB, setPersonB] = useState<Partial<BirthDetails>>({});
  const [resultA, setResultA] = useState<PersonResult | null>(null);
  const [resultB, setResultB] = useState<PersonResult | null>(null);
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

    const chartA = calculateNatalChart(personA as BirthDetails);
    const chartB = calculateNatalChart(personB as BirthDetails);
    setResultA({ chart: chartA, details: personA as BirthDetails });
    setResultB({ chart: chartB, details: personB as BirthDetails });
  };

  const moonA = resultA?.chart.moon;
  const moonB = resultB?.chart.moon;
  const compat = moonA && moonB ? getSignCompatibilityScore(moonA.sign, moonB.sign) : null;
  const interpA = moonA ? MOON_SIGN_INTERPRETATIONS[moonA.sign] : null;
  const interpB = moonB ? MOON_SIGN_INTERPRETATIONS[moonB.sign] : null;

  return (
    <CalculatorShell
      title="Moon Sign Compatibility"
      subtitle="Emotional Connection"
      description="Your Moon signs reveal your deepest emotional needs. Compare Moon placements to understand your emotional compatibility and nurturing styles."
      icon={<Moon className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          While Sun signs describe your outward personality, Moon signs govern your inner emotional world.
          Moon sign compatibility reveals how two people connect at the deepest emotional level — how they
          nurture each other, process feelings, and create emotional safety in a relationship.
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
              icon={<Moon className="w-4 h-4" />}
            >
              Compare Moon Signs
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {moonA && moonB && compat && interpA && interpB && (
        <>
          <ResultsSection title="Moon Sign Compatibility">
            {/* Uncertainty warnings */}
            {(resultA?.chart.moonUncertain || resultB?.chart.moonUncertain) && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="text-xs text-[var(--color-warning)] bg-[var(--color-warning-bg)] px-4 py-3 rounded-[var(--radius-md)]">
                  <strong>Note:</strong>{" "}
                  {resultA?.chart.moonUncertain && "Person A's"}{" "}
                  {resultA?.chart.moonUncertain && resultB?.chart.moonUncertain && "and"}{" "}
                  {resultB?.chart.moonUncertain && "Person B's"}{" "}
                  Moon may have been in a different sign on this date. The Moon moves quickly through
                  the zodiac (~12–14° per day). Providing exact birth times gives a definitive result.
                </div>
              </div>
            )}

            {/* Moon sign display */}
            <div className="flex items-center justify-center gap-8 md:gap-16 mb-8">
              <div className="text-center">
                <ZodiacIcon sign={moonA.sign} size="lg" showElement />
                <div className="mt-2 text-sm font-medium">Person A</div>
                <div className="text-xs text-[var(--color-muted-fg)]">Moon in {moonA.sign}</div>
                <Badge variant="gold" className="mt-1">{moonA.degree.toFixed(1)}°</Badge>
              </div>

              <Heart className="w-6 h-6 text-[var(--romantic-rose)]" />

              <div className="text-center">
                <ZodiacIcon sign={moonB.sign} size="lg" showElement />
                <div className="mt-2 text-sm font-medium">Person B</div>
                <div className="text-xs text-[var(--color-muted-fg)]">Moon in {moonB.sign}</div>
                <Badge variant="gold" className="mt-1">{moonB.degree.toFixed(1)}°</Badge>
              </div>
            </div>

            {/* Compatibility overview */}
            <CompatibilityScore
              sign1={moonA.sign}
              sign2={moonB.sign}
              overallScore={compat.emotional}
              summary={compat.summary}
              categories={[
                { label: "Emotional Bond", score: compat.emotional },
                { label: "Communication", score: compat.communication },
                { label: "Nurturing Match", score: compat.values },
                { label: "Long-term Stability", score: compat.longTerm },
              ]}
            />

            <ShareResult
              title="Moon Sign Compatibility"
              text={`Moon in ${moonA.sign} & Moon in ${moonB.sign} — ${compat.emotional}% emotional compatibility!`}
            />
          </ResultsSection>

          {/* Individual Moon interpretations */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card variant="default" padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-4 h-4 text-[var(--champagne-gold)]" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}>
                  Person A — Moon in {moonA.sign}
                </h3>
              </div>
              <div className="space-y-3 text-sm text-[var(--color-muted-fg)] leading-relaxed">
                <p><strong>Emotional nature:</strong> {interpA.emotionalNature}</p>
                <p><strong>Needs:</strong> {interpA.needs}</p>
                <p><strong>In relationships:</strong> {interpA.inRelationships}</p>
                <p><strong>Nurturing style:</strong> {interpA.nurturingStyle}</p>
              </div>
            </Card>

            <Card variant="default" padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-4 h-4 text-[var(--romantic-rose)]" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}>
                  Person B — Moon in {moonB.sign}
                </h3>
              </div>
              <div className="space-y-3 text-sm text-[var(--color-muted-fg)] leading-relaxed">
                <p><strong>Emotional nature:</strong> {interpB.emotionalNature}</p>
                <p><strong>Needs:</strong> {interpB.needs}</p>
                <p><strong>In relationships:</strong> {interpB.inRelationships}</p>
                <p><strong>Nurturing style:</strong> {interpB.nurturingStyle}</p>
              </div>
            </Card>
          </div>
        </>
      )}

      <FAQSection
        items={[
          {
            question: "Why is Moon sign compatibility important?",
            answer: "The Moon governs your emotional needs, instincts, and how you feel safe. When two people's Moon signs are compatible, they naturally understand each other's emotional language and can provide the comfort each person needs.",
          },
          {
            question: "Do I need an exact birth time for my Moon sign?",
            answer: "The Moon changes signs every 2–2.5 days. If you were born on a day when the Moon changed signs, your exact birth time determines which Moon sign is correct. Without a birth time, there is some uncertainty, which we flag in results.",
          },
          {
            question: "Can two incompatible Moon signs still work?",
            answer: "Yes. Awareness of different emotional needs is the first step to meeting them. Many couples with challenging Moon sign combinations thrive because they learn to communicate and respect each other's emotional styles.",
          },
        ]}
      />

      <RelatedTools
        tools={[
          {
            title: "Venus Sign Calculator",
            description: "Discover how you express and receive love.",
            href: "/venus-sign-calculator",
          },
          {
            title: "Love Compatibility",
            description: "Compare Sun signs for overall compatibility.",
            href: "/love-compatibility",
          },
          {
            title: "Birth Chart Compatibility",
            description: "Full natal chart comparison for deeper insights.",
            href: "/birth-chart-compatibility",
          },
        ]}
      />
    </CalculatorShell>
  );
}
