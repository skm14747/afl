"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import { ResultsSection, InsightBlock, ScoreSummary, RelatedTools, FAQSection, ShareResult } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  calculateNatalChart,
  calculateChartCompatibility,
  VENUS_SIGN_INTERPRETATIONS,
  MOON_SIGN_INTERPRETATIONS,
  type BirthDetails,
  type NatalChart,
  type CompatibilityResult,
} from "@/lib/astro-engine";
import { SynastryReport } from "@/components/calculators/SynastryReport";
import { RotateCcw, Heart, MessageCircle, AlertTriangle, Eye, Sparkles } from "lucide-react";

export function ExCompatibilityCalculator({ educationalContent }: { educationalContent?: React.ReactNode }) {
  const [personA, setPersonA] = useState<Partial<BirthDetails>>({});
  const [personB, setPersonB] = useState<Partial<BirthDetails>>({});
  const [result, setResult] = useState<{ chartA: NatalChart; chartB: NatalChart; compat: CompatibilityResult } | null>(null);
  const [errors, setErrors] = useState<{ a: Record<string, string>; b: Record<string, string> }>({ a: {}, b: {} });

  const handleCalculate = () => {
    const errA: Record<string, string> = {};
    const errB: Record<string, string> = {};
    if (!personA.date) errA.date = "Required";
    if (!personB.date) errB.date = "Required";
    if (Object.keys(errA).length > 0 || Object.keys(errB).length > 0) { setErrors({ a: errA, b: errB }); return; }
    setErrors({ a: {}, b: {} });
    const cA = calculateNatalChart(personA as BirthDetails);
    const cB = calculateNatalChart(personB as BirthDetails);
    setResult({ chartA: cA, chartB: cB, compat: calculateChartCompatibility(cA, cB) });
  };

  return (
    <CalculatorShell
      title="Ex-Relationship Compatibility"
      subtitle="Reflective Insights"
      description="Understand the astrological dynamics of a past relationship. This tool offers reflective insights — not predictions about whether a relationship will reignite."
      icon={<RotateCcw className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="text-xs text-[var(--color-info)] bg-[var(--color-info-bg)] px-4 py-3 rounded-[var(--radius-md)] mb-6">
          This tool provides astrological perspective on relationship dynamics. It does not predict
          whether an ex-partner will return or whether reconciliation is advisable.
        </div>
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          Looking back at a relationship through an astrological lens can help you understand
          recurring patterns, recognize where communication may have broken down, and gain
          self-awareness for future relationships.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BirthDetailsForm label="You" value={personA} onChange={setPersonA} showTime showLocation errors={errors.a} />
            <BirthDetailsForm label="Your Ex" value={personB} onChange={setPersonB} showTime showLocation errors={errors.b} />
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="secondary" size="lg" onClick={handleCalculate} icon={<Eye className="w-4 h-4" />}>
              Analyze Past Relationship
            </Button>
          </div>
        </Card>
      </div>

      {result && (
        <>
          <ResultsSection title="Relationship Reflection">
            <ScoreSummary
              scores={[
                { label: "Emotional Bond", value: result.compat.emotional },
                { label: "Communication", value: result.compat.communication },
                { label: "Romance", value: result.compat.romance },
                { label: "Shared Values", value: result.compat.values },
                { label: "Long-term Pattern", value: result.compat.longTerm },
              ]}
            />

            <div className="max-w-2xl mx-auto mt-8 text-center">
              <p className="italic text-[var(--color-muted-fg)]" style={{ fontFamily: "var(--font-display)" }}>
                {result.compat.summary}
              </p>
            </div>
          </ResultsSection>

          <div className="mt-10 max-w-3xl mx-auto">
            <h3 className="text-center mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}>
              What the Stars Reveal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightBlock
                title="Communication Patterns"
                content={`Your Mercury in ${result.chartA.mercury.sign} and their Mercury in ${result.chartB.mercury.sign}: ${
                  result.compat.communication >= 70
                    ? "Communication likely flowed naturally between you, though other factors may have created friction."
                    : "Different communication styles may have been a source of misunderstanding. Awareness of these differences is key."
                }`}
                icon={<MessageCircle className="w-4 h-4" />}
              />
              <InsightBlock
                title="Emotional Connection"
                content={`Your Moon in ${result.chartA.moon.sign} and their Moon in ${result.chartB.moon.sign}: ${
                  result.compat.emotional >= 70
                    ? "There was genuine emotional understanding here. The bond likely felt deep and intuitive."
                    : "Emotional needs differed — one may have felt unheard or unsupported despite genuine care from both sides."
                }`}
                icon={<Heart className="w-4 h-4" />}
                variant="rose"
              />
              <InsightBlock
                title="What Drew You Together"
                content={`Venus in ${result.chartA.venus.sign} was drawn to ${VENUS_SIGN_INTERPRETATIONS[result.chartB.venus.sign].attracted.toLowerCase()}. ${
                  result.compat.romance >= 70
                    ? "The attraction was powerful and genuine — the chemistry was real."
                    : "The attraction may have been more complex — involving projection, challenge, or complementary opposites."
                }`}
                icon={<Sparkles className="w-4 h-4" />}
                variant="gold"
              />
              <InsightBlock
                title="Recurring Challenges"
                content={result.compat.challenges[0] || "Every relationship has growth areas. Understanding astrological dynamics helps recognize patterns."}
                icon={<AlertTriangle className="w-4 h-4" />}
                variant="rose"
              />
            </div>
          </div>

          <div className="mt-10 max-w-2xl mx-auto">
            <Card variant="elevated" padding="lg" className="text-center">
              <Sparkles className="w-5 h-5 text-[var(--champagne-gold)] mx-auto mb-3" />
              <h4 className="font-semibold mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}>
                What to Take Forward
              </h4>
              <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
                Understanding the astrological dynamics of past relationships helps you recognize
                your patterns and needs. Your Moon sign needs ({MOON_SIGN_INTERPRETATIONS[result.chartA.moon.sign].needs.toLowerCase()})
                and your Venus sign expression ({VENUS_SIGN_INTERPRETATIONS[result.chartA.venus.sign].expression.toLowerCase()})
                remain consistent across relationships — knowing them empowers healthier connections.
              </p>
            </Card>
          </div>
          <SynastryReport
            chartA={result.chartA}
            chartB={result.chartB}
            detailsA={personA as BirthDetails}
            detailsB={personB as BirthDetails}
            result={result.compat}
          />
        </>
      )}

      <FAQSection
        items={[
          { question: "Can astrology tell me if my ex will come back?", answer: "No. Astrology reveals dynamics and patterns in a relationship, but cannot predict future human decisions. This tool is designed for self-reflection, not prediction." },
          { question: "Why analyze a past relationship?", answer: "Understanding what worked and what didn't — through an astrological lens — can illuminate patterns you bring to all relationships. This self-awareness supports healthier future connections." },
          { question: "Is low compatibility why we broke up?", answer: "Not necessarily. Relationships end for many reasons — timing, life circumstances, communication, personal growth. Astrological compatibility is just one factor among many." },
        ]}
      />

      <RelatedTools
        tools={[
          { title: "Love Compatibility", description: "New relationship potential.", href: "/love-compatibility" },
          { title: "Soulmate Calculator", description: "Your romantic profile.", href: "/soulmate-calculator" },
          { title: "Venus Sign Calculator", description: "Understand your love language.", href: "/venus-sign-calculator" },
        ]}
      />
          {educationalContent}
    </CalculatorShell>
  );
}
