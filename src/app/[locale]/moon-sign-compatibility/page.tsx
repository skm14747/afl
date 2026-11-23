"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("moonCompat");
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
      title={t("title")}
      subtitle={t("subtitle")}
      description={t("description")}
      icon={<Moon className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          {t("intro")}
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
              errors={errors.a}
            />
            <BirthDetailsForm
              label={t("personB")}
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
              {t("calculate")}
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {moonA && moonB && compat && interpA && interpB && (
        <>
          <ResultsSection title={t("resultsTitle")}>
            {/* Uncertainty warnings */}
            {(resultA?.chart.moonUncertain || resultB?.chart.moonUncertain) && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="text-xs text-[var(--color-warning)] bg-[var(--color-warning-bg)] px-4 py-3 rounded-[var(--radius-md)]">
                  <strong>{t("uncertainNote")}</strong>{" "}
                  {resultA?.chart.moonUncertain && t("uncertainA")}{" "}
                  {resultA?.chart.moonUncertain && resultB?.chart.moonUncertain && t("uncertainAnd")}{" "}
                  {resultB?.chart.moonUncertain && t("uncertainB")}{" "}
                  {t("uncertainMsg")}
                </div>
              </div>
            )}

            {/* Moon sign display */}
            <div className="flex items-center justify-center gap-8 md:gap-16 mb-8">
              <div className="text-center">
                <ZodiacIcon sign={moonA.sign} size="lg" showElement />
                <div className="mt-2 text-sm font-medium">{t("personA")}</div>
                <div className="text-xs text-[var(--color-muted-fg)]">{t("moonIn", { sign: moonA.sign })}</div>
                <Badge variant="gold" className="mt-1">{moonA.degree.toFixed(1)}°</Badge>
              </div>

              <Heart className="w-6 h-6 text-[var(--romantic-rose)]" />

              <div className="text-center">
                <ZodiacIcon sign={moonB.sign} size="lg" showElement />
                <div className="mt-2 text-sm font-medium">{t("personB")}</div>
                <div className="text-xs text-[var(--color-muted-fg)]">{t("moonIn", { sign: moonB.sign })}</div>
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
                { label: t("emotionalBond"), score: compat.emotional },
                { label: t("communication"), score: compat.communication },
                { label: t("nurturingMatch"), score: compat.values },
                { label: t("longTermStability"), score: compat.longTerm },
              ]}
            />

            <ShareResult
              title={t("shareTitle")}
              text={t("shareText", { signA: moonA.sign, signB: moonB.sign, score: compat.emotional })}
            />
          </ResultsSection>

          {/* Individual Moon interpretations */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card variant="default" padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-4 h-4 text-[var(--champagne-gold)]" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}>
                  {t("personAMoon", { sign: moonA.sign })}
                </h3>
              </div>
              <div className="space-y-3 text-sm text-[var(--color-muted-fg)] leading-relaxed">
                <p><strong>{t("emotionalNature")}</strong> {interpA.emotionalNature}</p>
                <p><strong>{t("needs")}</strong> {interpA.needs}</p>
                <p><strong>{t("inRelationships")}</strong> {interpA.inRelationships}</p>
                <p><strong>{t("nurturingStyle")}</strong> {interpA.nurturingStyle}</p>
              </div>
            </Card>

            <Card variant="default" padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-4 h-4 text-[var(--romantic-rose)]" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}>
                  {t("personBMoon", { sign: moonB.sign })}
                </h3>
              </div>
              <div className="space-y-3 text-sm text-[var(--color-muted-fg)] leading-relaxed">
                <p><strong>{t("emotionalNature")}</strong> {interpB.emotionalNature}</p>
                <p><strong>{t("needs")}</strong> {interpB.needs}</p>
                <p><strong>{t("inRelationships")}</strong> {interpB.inRelationships}</p>
                <p><strong>{t("nurturingStyle")}</strong> {interpB.nurturingStyle}</p>
              </div>
            </Card>
          </div>
        </>
      )}

      <FAQSection
        items={[
          { question: t("faq1q"), answer: t("faq1a") },
          { question: t("faq2q"), answer: t("faq2a") },
          { question: t("faq3q"), answer: t("faq3a") },
        ]}
      />

      <RelatedTools
        tools={[
          { title: t("relatedMoonPhase"), description: t("relatedMoonPhaseDesc"), href: "/moon-phase-soulmate" },
          { title: t("relatedVenus"), description: t("relatedVenusDesc"), href: "/venus-sign-calculator" },
          { title: t("relatedSynastry"), description: t("relatedSynastryDesc"), href: "/synastry-chart" },
          { title: t("relatedBirthChart"), description: t("relatedBirthChartDesc"), href: "/birth-chart-compatibility" },
        ]}
      />
    </CalculatorShell>
  );
}
