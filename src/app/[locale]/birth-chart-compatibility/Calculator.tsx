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
import { SavedChartsBar } from "@/components/calculators/SavedChartsBar";
import { Compass, Star, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/navigation";

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

export function BirthChartCompatibilityCalculator({ educationalContent }: { educationalContent?: React.ReactNode }) {
  const t = useTranslations("birthChartCompat");
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
      icon={<Compass className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          {t("intro")}{" "}
          <Link href="/synastry-chart" className="underline">{t("introSynastryLink")}</Link>.
          {" "}{t("introForecastPrefix")}{" "}
          <Link href="/relationship-forecast" className="underline">{t("introForecastLink")}</Link>.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <SavedChartsBar details={personA as BirthDetails} onLoad={setPersonA} />
              <BirthDetailsForm label={t("personA")} value={personA} onChange={setPersonA} showTime showLocation errors={errors.a} />
            </div>
            <div className="flex flex-col gap-4">
              <SavedChartsBar details={personB as BirthDetails} onLoad={setPersonB} />
              <BirthDetailsForm label={t("personB")} value={personB} onChange={setPersonB} showTime showLocation errors={errors.b} />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="secondary" size="lg" onClick={handleCalculate} icon={<Compass className="w-4 h-4" />}>
              {t("calculate")}
            </Button>
          </div>
        </Card>
      </div>

      {result && chartA && chartB && (
        <>
          <ResultsSection title={t("resultsTitle")}>
            {/* Full chart comparison table */}
            <div className="max-w-3xl mx-auto mb-10">
              <Card variant="default" padding="md" className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border-subtle)]">
                      <th className="text-left py-2 px-3 text-[var(--color-muted-fg)] font-medium">{t("planet")}</th>
                      <th className="text-center py-2 px-3 text-[var(--color-muted-fg)] font-medium">{t("personA")}</th>
                      <th className="text-center py-2 px-3 text-[var(--color-muted-fg)] font-medium">{t("personB")}</th>
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
                { label: t("overall"), value: result.overall },
                { label: t("emotional"), value: result.emotional },
                { label: t("communication"), value: result.communication },
                { label: t("romance"), value: result.romance },
                { label: t("values"), value: result.values },
                { label: t("longTerm"), value: result.longTerm },
              ]}
            />

            <div className="max-w-2xl mx-auto mt-6 text-center">
              <p className="text-[var(--color-muted-fg)] italic" style={{ fontFamily: "var(--font-display)" }}>
                {result.summary}
              </p>
            </div>

            <ShareResult title={t("shareTitle")} text={t("shareText", { score: result.overall })} />
          </ResultsSection>

          {/* Aspects */}
          {result.aspects.length > 0 && (
            <div className="mt-10 max-w-3xl mx-auto">
              <h3 className="text-center mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}>
                {t("aspectsTitle", { count: result.aspects.length })}
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
                <Star className="w-4 h-4 text-[var(--champagne-gold)]" /> {t("strengthsTitle")}
              </h3>
              {result.strengths.map((s, i) => (
                <InsightBlock key={i} title="" content={s} variant="gold" className="mb-3" />
              ))}
            </div>
            <div>
              <h3 className="mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}>
                <AlertTriangle className="w-4 h-4 text-[var(--romantic-rose)]" /> {t("challengesTitle")}
              </h3>
              {result.challenges.map((c, i) => (
                <InsightBlock key={i} title="" content={c} variant="rose" className="mb-3" />
              ))}
            </div>
          </div>
          <SynastryReport
            chartA={chartA}
            chartB={chartB}
            detailsA={personA as BirthDetails}
            detailsB={personB as BirthDetails}
            result={result}
          />
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
          { title: t("relatedForecast"), description: t("relatedForecastDesc"), href: "/relationship-forecast" },
          { title: t("relatedSynastry"), description: t("relatedSynastryDesc"), href: "/synastry-chart" },
          { title: t("relatedComposite"), description: t("relatedCompositeDesc"), href: "/composite-chart" },
          { title: t("relatedMars"), description: t("relatedMarsDesc"), href: "/mars-sign-compatibility" },
          { title: t("relatedMoonPhase"), description: t("relatedMoonPhaseDesc"), href: "/moon-phase-soulmate" },
          { title: t("relatedVenus"), description: t("relatedVenusDesc"), href: "/venus-sign-calculator" },
        ]}
      />
          {educationalContent}
    </CalculatorShell>
  );
}
