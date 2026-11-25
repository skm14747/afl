"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import { ResultsSection, InsightBlock, RelatedTools, FAQSection, ShareResult } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ZodiacIcon } from "@/components/astrology/ZodiacIcon";
import {
  calculateNatalChart,
  getSignCompatibilityScore,
  type BirthDetails,
  type NatalChart,
} from "@/lib/astro-engine";
import { ZODIAC_SIGNS, type ZodiacSign } from "@/lib/astrology-data";
import { ChartWheel } from "@/components/astrology/ChartWheel";
import { SavedChartsBar } from "@/components/calculators/SavedChartsBar";
import { Sunrise, Eye, Users } from "lucide-react";

function getDescendant(sign: ZodiacSign): ZodiacSign {
  const idx = ZODIAC_SIGNS.indexOf(sign);
  return ZODIAC_SIGNS[(idx + 6) % 12];
}

export function RisingSignCompatibilityCalculator({ educationalContent }: { educationalContent?: React.ReactNode }) {
  const [personA, setPersonA] = useState<Partial<BirthDetails>>({});
  const [personB, setPersonB] = useState<Partial<BirthDetails>>({});
  const [result, setResult] = useState<{
    chartA: NatalChart;
    chartB: NatalChart;
    ascA: ZodiacSign;
    ascB: ZodiacSign;
    descA: ZodiacSign;
    descB: ZodiacSign;
  } | null>(null);
  const [errors, setErrors] = useState<{ a: Record<string, string>; b: Record<string, string> }>({ a: {}, b: {} });

  const handleCalculate = () => {
    const errA: Record<string, string> = {};
    const errB: Record<string, string> = {};
    if (!personA.date) errA.date = "Required";
    if (!personA.time) errA.time = "Birth time is essential for Rising sign";
    if (typeof personA.latitude !== "number") errA.place = "Choose a birth city";
    if (!personB.date) errB.date = "Required";
    if (!personB.time) errB.time = "Birth time is essential for Rising sign";
    if (typeof personB.latitude !== "number") errB.place = "Choose a birth city";
    if (Object.keys(errA).length > 0 || Object.keys(errB).length > 0) {
      setErrors({ a: errA, b: errB });
      return;
    }
    setErrors({ a: {}, b: {} });

    const chartA = calculateNatalChart(personA as BirthDetails);
    const chartB = calculateNatalChart(personB as BirthDetails);
    if (!chartA.ascendant || !chartB.ascendant) return;
    const ascA = chartA.ascendant.sign;
    const ascB = chartB.ascendant.sign;

    setResult({
      chartA, chartB,
      ascA, ascB,
      descA: getDescendant(ascA),
      descB: getDescendant(ascB),
    });
  };

  const compat = result ? getSignCompatibilityScore(result.ascA, result.ascB) : null;

  return (
    <CalculatorShell
      title="Rising Sign Compatibility"
      subtitle="First Impressions & Partnership"
      description="Your Rising sign (Ascendant) governs first impressions and your approach to partnerships. Compare Ascendants to understand how you appear to each other and your natural partnership style."
      icon={<Sunrise className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="text-xs text-[var(--color-info)] bg-[var(--color-info-bg)] px-4 py-3 rounded-[var(--radius-md)] mb-6">
          <strong>Accurate birth times are essential.</strong> The Ascendant changes sign approximately
          every 2 hours. Without exact birth times, Rising sign calculation is unreliable.
        </div>
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          Your Rising sign shapes how you present yourself to the world and how others first perceive you.
          Your Descendant (the sign opposite your Ascendant) reveals the qualities you seek in a partner.
          Comparing these placements offers insight into relationship dynamics beyond Sun sign compatibility.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <SavedChartsBar details={personA as BirthDetails} onLoad={setPersonA} />
              <BirthDetailsForm label="Person A" value={personA} onChange={setPersonA} showTime showLocation requireTime requireLocation errors={errors.a} />
            </div>
            <div className="flex flex-col gap-4">
              <SavedChartsBar details={personB as BirthDetails} onLoad={setPersonB} />
              <BirthDetailsForm label="Person B" value={personB} onChange={setPersonB} showTime showLocation requireTime requireLocation errors={errors.b} />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="secondary" size="lg" onClick={handleCalculate} icon={<Sunrise className="w-4 h-4" />}>
              Compare Rising Signs
            </Button>
          </div>
        </Card>
      </div>

      {result && compat && (
        <>
          <ResultsSection title="Rising Sign Compatibility">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              <ChartWheel chart={result.chartA} caption="Person A, whole-sign houses" />
              <ChartWheel chart={result.chartB} caption="Person B, whole-sign houses" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
              <Card variant="feature" padding="lg" className="text-center">
                <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-3">Person A</div>
                <div className="flex justify-center mb-2">
                  <ZodiacIcon sign={result.ascA} size="lg" showElement />
                </div>
                <div className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  {result.ascA} Rising
                </div>
                <div className="text-xs text-[var(--color-muted-fg)]">
                  Descendant: {result.descA}
                </div>
              </Card>
              <Card variant="feature" padding="lg" className="text-center">
                <div className="text-xs uppercase tracking-wider text-[var(--romantic-rose)] mb-3">Person B</div>
                <div className="flex justify-center mb-2">
                  <ZodiacIcon sign={result.ascB} size="lg" showElement />
                </div>
                <div className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  {result.ascB} Rising
                </div>
                <div className="text-xs text-[var(--color-muted-fg)]">
                  Descendant: {result.descB}
                </div>
              </Card>
            </div>

            <div className="max-w-2xl mx-auto text-center mb-8">
              <p className="text-[var(--color-muted-fg)] italic leading-relaxed" style={{ fontFamily: "var(--font-display)" }}>
                {compat.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <InsightBlock
                title="First Impressions"
                content={`${result.ascA} Rising and ${result.ascB} Rising create ${compat.overall >= 70 ? "an immediate sense of comfort and attraction" : compat.overall >= 50 ? "an intriguing contrast in energy" : "a dynamic that takes time to understand and appreciate"} when you first meet.`}
                icon={<Eye className="w-4 h-4" />}
                variant="gold"
              />
              <InsightBlock
                title="Partnership Dynamics"
                content={`Person A's Descendant in ${result.descA} seeks ${result.descA} qualities in a partner. Person B's Descendant in ${result.descB} is drawn to ${result.descB} energy. ${result.descA === result.ascB || result.descB === result.ascA ? "Notably, one partner naturally embodies what the other seeks!" : "Understanding what each person seeks helps bridge different approaches."}`}
                icon={<Users className="w-4 h-4" />}
                variant="rose"
              />
            </div>

            <ShareResult
              title="Rising Sign Compatibility"
              text={`${result.ascA} Rising & ${result.ascB} Rising compatibility`}
            />
          </ResultsSection>
        </>
      )}

      <FAQSection
        items={[
          { question: "What is a Rising sign?", answer: "Your Rising sign (Ascendant) is the zodiac sign that was on the eastern horizon at your exact time and place of birth. It shapes your outward personality, appearance, and how others perceive you." },
          { question: "What is the Descendant?", answer: "The Descendant is the sign directly opposite your Ascendant. It represents the qualities you seek in partnerships and long-term relationships — often qualities that complement your own." },
          { question: "Why is birth time so important?", answer: "The Ascendant changes sign approximately every 2 hours. Even a 30-minute difference can change your Rising sign, which is why accurate birth time is essential for this calculation." },
        ]}
      />

      <RelatedTools
        tools={[
          { title: "Birth Chart Compatibility", description: "Full chart comparison.", href: "/birth-chart-compatibility" },
          { title: "Love Compatibility", description: "Sun sign comparison.", href: "/love-compatibility" },
          { title: "Venus Sign Calculator", description: "Your love planet.", href: "/venus-sign-calculator" },
        ]}
      />
          {educationalContent}
    </CalculatorShell>
  );
}
