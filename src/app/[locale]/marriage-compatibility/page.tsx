"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
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
import { SynastryReport } from "@/components/calculators/SynastryReport";
import { Link } from "@/i18n/navigation";
import { Heart, Shield, MessageCircle, Sparkles, AlertTriangle, Star } from "lucide-react";

export default function MarriageCompatibilityPage() {
  const t = useTranslations("marriage");
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
      title={t("title")}
      subtitle={t("subtitle")}
      description={t("description")}
      icon={<Shield className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          {t("intro")}{" "}
          <Link href="/kundli-matching" className="underline">{t("introKundliLink")}</Link>.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BirthDetailsForm
              label={t("personA")}
              value={personA}
              onChange={setPersonA}
              showTime
              showLocation
              errors={errors.a}
            />
            <BirthDetailsForm
              label={t("personB")}
              value={personB}
              onChange={setPersonB}
              showTime
              showLocation
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
              {t("calculate")}
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {result && chartA && chartB && (
        <>
          <ResultsSection title={t("resultsTitle")}>
            {/* Planetary overview */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto mb-10">
              {(["sun", "moon", "venus", "mars", "saturn"] as const).map((planet) => {
                const a = chartA[planet];
                const b = chartB[planet];
                const labels: Record<string, string> = {
                  sun: t("identity"),
                  moon: t("emotions"),
                  venus: t("love"),
                  mars: t("passion"),
                  saturn: t("commitment"),
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
                { label: t("overall"), value: result.overall },
                { label: t("emotionalBond"), value: result.emotional },
                { label: t("communication"), value: result.communication },
                { label: t("romance"), value: result.romance },
                { label: t("sharedValues"), value: result.values },
                { label: t("longTerm"), value: result.longTerm },
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
              title={t("shareTitle")}
              text={t("shareText", { score: result.overall })}
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
                {t("strengthsTitle")}
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
                {t("challengesTitle")}
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
                {t("aspectsTitle")}
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
                          {t("orb")} {a.orb.toFixed(1)}°
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
              {t("loveLangTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="default" padding="md">
                <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-2">{t("personAVenus", { sign: chartA.venus.sign })}</div>
                <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
                  {VENUS_SIGN_INTERPRETATIONS[chartA.venus.sign].expression}
                </p>
              </Card>
              <Card variant="default" padding="md">
                <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-2">{t("personBVenus", { sign: chartB.venus.sign })}</div>
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
              {t("howTitle")}
            </h3>
            <div className="text-sm text-[var(--color-muted-fg)] leading-relaxed space-y-3">
              <p>{t("howP1")}</p>
              <p>{t("howP2")}</p>
            </div>
          </div>
          {chartA && chartB && result && (
            <SynastryReport
              chartA={chartA}
              chartB={chartB}
              detailsA={personA as BirthDetails}
              detailsB={personB as BirthDetails}
              result={result}
            />
          )}
        </>
      )}

      <FAQSection
        items={[
          { question: t("faq1q"), answer: t("faq1a") },
          { question: t("faq2q"), answer: t("faq2a") },
          { question: t("faq3q"), answer: t("faq3a") },
          { question: t("faq4q"), answer: t("faq4a") },
        ]}
      />

      <RelatedTools
        tools={[
          { title: t("relatedForecast"), description: t("relatedForecastDesc"), href: "/relationship-forecast" },
          { title: t("relatedLove"), description: t("relatedLoveDesc"), href: "/love-compatibility" },
          { title: t("relatedMoon"), description: t("relatedMoonDesc"), href: "/moon-sign-compatibility" },
          { title: t("relatedBirthChart"), description: t("relatedBirthChartDesc"), href: "/birth-chart-compatibility" },
        ]}
      />
    </CalculatorShell>
  );
}
