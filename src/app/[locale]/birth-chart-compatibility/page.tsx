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
import { Compass, Star, AlertTriangle } from "lucide-react";

const PLANET_LIST = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"] as const;
const PLANET_LABELS: Record<string, { symbol: string; label: string }> = {
  sun: { symbol: "☉", label: "Sun" },
  moon: { symbol: "☽", label: "Moon" },
  mercury: { symbol: "☿", label: "Mercury" },
  venus: { symbol: "♀", label: "Venus" },
  mars: { symbol: "♂", label: "Mars" },
  jupiter: { symbol: "♃", label: "Jupiter" },
  saturn: { symbol: "♄", label: "Saturn" },
  uranus: { symbol: "♅", label: "Uranus" },
  neptune: { symbol: "♆", label: "Neptune" },
  pluto: { symbol: "♇", label: "Pluto" },
};

export default function BirthChartCompatibilityPage() {
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
      title="Birth Chart Love Compatibility"
      subtitle="Full Synastry Analysis"
      description="Compare two complete natal charts to reveal the full spectrum of your relationship dynamics — from Sun to Pluto."
      icon={<Compass className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          Synastry is the astrological comparison of two natal charts. By analyzing how each
          person&apos;s planets interact with the other&apos;s, synastry reveals the unique
          dynamics of a relationship — areas of natural harmony, points of attraction, and
          themes that may require conscious effort.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BirthDetailsForm label="Person A" value={personA} onChange={setPersonA} showTime errors={errors.a} />
            <BirthDetailsForm label="Person B" value={personB} onChange={setPersonB} showTime errors={errors.b} />
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="secondary" size="lg" onClick={handleCalculate} icon={<Compass className="w-4 h-4" />}>
              Analyze Charts
            </Button>
          </div>
        </Card>
      </div>

      {result && chartA && chartB && (
        <>
          <ResultsSection title="Synastry Results">
            {/* Full chart comparison table */}
            <div className="max-w-3xl mx-auto mb-10">
              <Card variant="default" padding="md" className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border-subtle)]">
                      <th className="text-left py-2 px-3 text-[var(--color-muted-fg)] font-medium">Planet</th>
                      <th className="text-center py-2 px-3 text-[var(--color-muted-fg)] font-medium">Person A</th>
                      <th className="text-center py-2 px-3 text-[var(--color-muted-fg)] font-medium">Person B</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PLANET_LIST.map((planet) => {
                      const a = chartA[planet];
                      const b = chartB[planet];
                      const info = PLANET_LABELS[planet];
                      return (
                        <tr key={planet} className="border-b border-[var(--color-border-subtle)] last:border-0">
                          <td className="py-2.5 px-3">
                            <span className="mr-2">{info.symbol}</span>
                            <span className="font-medium">{info.label}</span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span>{a.sign}</span>
                            <span className="text-[var(--color-muted-fg)] text-xs ml-1">{a.degree.toFixed(1)}°</span>
                            {a.retrograde && <span className="text-[var(--romantic-rose)] text-xs ml-1">℞</span>}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span>{b.sign}</span>
                            <span className="text-[var(--color-muted-fg)] text-xs ml-1">{b.degree.toFixed(1)}°</span>
                            {b.retrograde && <span className="text-[var(--romantic-rose)] text-xs ml-1">℞</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            </div>

            {/* Scores */}
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

            <div className="max-w-2xl mx-auto mt-6 text-center">
              <p className="text-[var(--color-muted-fg)] italic" style={{ fontFamily: "var(--font-display)" }}>
                {result.summary}
              </p>
            </div>

            <ShareResult title="Synastry Analysis" text={`Our birth chart compatibility: ${result.overall}%`} />
          </ResultsSection>

          {/* Aspects */}
          {result.aspects.length > 0 && (
            <div className="mt-10 max-w-3xl mx-auto">
              <h3 className="text-center mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}>
                Inter-chart Aspects ({result.aspects.length})
              </h3>
              <Card variant="default" padding="sm">
                <div className="divide-y divide-[var(--color-border-subtle)] max-h-96 overflow-y-auto">
                  {result.aspects.map((a, i) => (
                    <div key={i} className="py-2.5 px-3 flex items-center justify-between gap-2 text-sm">
                      <div>
                        <span className="font-medium">{a.planet1}</span>
                        <span className="text-[var(--color-muted-fg)]"> {a.aspect} </span>
                        <span className="font-medium">{a.planet2}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-[var(--color-muted-fg)]">{a.orb.toFixed(1)}°</span>
                        <Badge variant={a.nature === "harmonious" ? "success" : a.nature === "challenging" ? "warning" : "default"} size="sm">
                          {a.nature}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Strengths / Challenges */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}>
                <Star className="w-4 h-4 text-[var(--champagne-gold)]" /> Synastry Strengths
              </h3>
              {result.strengths.map((s, i) => (
                <InsightBlock key={i} title="" content={s} variant="gold" className="mb-3" />
              ))}
            </div>
            <div>
              <h3 className="mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}>
                <AlertTriangle className="w-4 h-4 text-[var(--romantic-rose)]" /> Growth Areas
              </h3>
              {result.challenges.map((c, i) => (
                <InsightBlock key={i} title="" content={c} variant="rose" className="mb-3" />
              ))}
            </div>
          </div>
        </>
      )}

      <FAQSection
        items={[
          {
            question: "What is synastry?",
            answer: "Synastry is the astrological technique of comparing two natal charts by overlaying them and analyzing the aspects (angular relationships) between each person's planets.",
          },
          {
            question: "Which aspects matter most?",
            answer: "Venus-Mars connections indicate romantic and physical chemistry. Moon contacts reveal emotional compatibility. Sun aspects show core identity harmony. Saturn contacts suggest longevity and commitment.",
          },
          {
            question: "Is this more accurate than Sun sign compatibility?",
            answer: "Yes — synastry considers all personal planets (Sun, Moon, Mercury, Venus, Mars) and their exact positions, providing a much more nuanced and specific picture of relationship dynamics.",
          },
        ]}
      />

      <RelatedTools
        tools={[
          { title: "Marriage Compatibility", description: "Partnership-focused analysis.", href: "/marriage-compatibility" },
          { title: "Twin Flame Calculator", description: "Explore intense soul connections.", href: "/twin-flame-calculator" },
          { title: "Venus Sign Calculator", description: "Discover your love planet.", href: "/venus-sign-calculator" },
        ]}
      />
    </CalculatorShell>
  );
}
