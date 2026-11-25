"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import {
  ResultsSection,
  InsightBlock,
  RelatedTools,
  FAQSection,
  ShareResult,
} from "@/components/calculators/ResultsSection";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ZodiacIcon } from "@/components/astrology/ZodiacIcon";
import { ChartWheel } from "@/components/astrology/ChartWheel";
import { SynastryReport } from "@/components/calculators/SynastryReport";
import { SavedChartsBar } from "@/components/calculators/SavedChartsBar";
import {
  calculateNatalChart,
  calculateAspects,
  calculateChartCompatibility,
  houseOverlays,
  type BirthDetails,
  type NatalChart,
  type AspectInfo,
  type OverlayHit,
  type CompatibilityResult,
} from "@/lib/astro-engine";
import { Orbit } from "lucide-react";

const ASPECT_SYMBOLS: Record<string, { symbol: string; label: string; nature: string }> = {
  conjunction: { symbol: "☌", label: "Conjunction", nature: "intense" },
  sextile: { symbol: "⚹", label: "Sextile", nature: "harmonious" },
  square: { symbol: "□", label: "Square", nature: "tense" },
  trine: { symbol: "△", label: "Trine", nature: "harmonious" },
  opposition: { symbol: "☍", label: "Opposition", nature: "tense" },
};

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

function categorizAspect(a: AspectInfo): string {
  const p1 = a.planet1.toLowerCase();
  const p2 = a.planet2.toLowerCase();
  const planets = [p1, p2];
  if (planets.includes("venus") || planets.includes("mars"))
    return "Chemistry & Attraction";
  if (planets.includes("moon"))
    return "Emotional Bond";
  if (planets.includes("sun"))
    return "Core Identity";
  if (planets.includes("mercury"))
    return "Communication";
  if (planets.includes("saturn") || planets.includes("pluto"))
    return "Long-term & Growth";
  return "Other Connections";
}

export function SynastryChartCalculator({
  educationalContent,
}: {
  educationalContent?: React.ReactNode;
}) {
  const t = useTranslations("synastry");
  const [personA, setPersonA] = useState<Partial<BirthDetails>>({});
  const [personB, setPersonB] = useState<Partial<BirthDetails>>({});
  const [chartA, setChartA] = useState<NatalChart | null>(null);
  const [chartB, setChartB] = useState<NatalChart | null>(null);
  const [aspects, setAspects] = useState<AspectInfo[]>([]);
  const [overlays, setOverlays] = useState<OverlayHit[]>([]);
  const [compat, setCompat] = useState<CompatibilityResult | null>(null);
  const [errors, setErrors] = useState<{
    a: Record<string, string>;
    b: Record<string, string>;
  }>({ a: {}, b: {} });

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
    setAspects(calculateAspects(cA, cB));
    setOverlays(houseOverlays(cA, cB));
    setCompat(calculateChartCompatibility(cA, cB));
  };

  const groupedAspects = aspects.reduce<Record<string, AspectInfo[]>>(
    (acc, a) => {
      const cat = categorizAspect(a);
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(a);
      return acc;
    },
    {}
  );

  const harmonious = aspects.filter(
    (a) => ASPECT_SYMBOLS[a.aspect]?.nature === "harmonious"
  );
  const tense = aspects.filter(
    (a) => ASPECT_SYMBOLS[a.aspect]?.nature === "tense"
  );

  return (
    <CalculatorShell
      title={t("title")}
      subtitle={t("subtitle")}
      description={t("description")}
      icon={<Orbit className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      {/* Intro */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          {t("intro")}{" "}
          <Link href="/birth-chart-compatibility" className="underline">{t("introBccLink")}</Link>.
          {" "}{t("introForecastPrefix")}{" "}
          <Link href="/relationship-forecast" className="underline">{t("introForecastLink")}</Link>.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <SavedChartsBar
                details={personA as BirthDetails}
                onLoad={setPersonA}
              />
              <BirthDetailsForm
                label={t("personA")}
                value={personA}
                onChange={setPersonA}
                showTime
                showLocation
                errors={errors.a}
              />
            </div>
            <div className="flex flex-col gap-4">
              <SavedChartsBar
                details={personB as BirthDetails}
                onLoad={setPersonB}
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
          </div>
          <div className="flex justify-center mt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCalculate}
              icon={<Orbit className="w-4 h-4" />}
            >
              {t("calculate")}
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {chartA && chartB && aspects.length > 0 && (
        <>
          {/* Visual biwheel */}
          <ResultsSection title={t("resultsTitle")}>
            <div className="max-w-2xl mx-auto mb-8 flex flex-col md:flex-row gap-6 justify-center items-center">
              <ChartWheel chart={chartA} caption={t("personA")} />
              <ChartWheel chart={chartB} caption={t("personB")} />
            </div>

            {/* Summary badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="cosmic">{t("aspectsFound", { count: aspects.length })}</Badge>
              <Badge variant="gold">{t("harmoniousCount", { count: harmonious.length })}</Badge>
              <Badge variant="rose">{t("tenseCount", { count: tense.length })}</Badge>
            </div>
          </ResultsSection>

          {/* Aspect table grouped by theme */}
          <ResultsSection title={t("aspectsByTheme")}>
            <div className="max-w-3xl mx-auto space-y-6">
              {Object.entries(groupedAspects).map(([category, catAspects]) => (
                <Card key={category} variant="default" padding="md">
                  <h4
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h4)",
                      fontWeight: 600,
                    }}
                  >
                    {category}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--color-border-subtle)]">
                          <th className="text-left py-2 px-2 text-[var(--color-muted-fg)]">
                            {t("personA")}
                          </th>
                          <th className="text-center py-2 px-2 text-[var(--color-muted-fg)]">
                            Aspect
                          </th>
                          <th className="text-left py-2 px-2 text-[var(--color-muted-fg)]">
                            {t("personB")}
                          </th>
                          <th className="text-right py-2 px-2 text-[var(--color-muted-fg)]">
                            {t("orb")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {catAspects
                          .sort((a, b) => a.orb - b.orb)
                          .map((asp, i) => {
                            const info = ASPECT_SYMBOLS[asp.aspect];
                            const p1 =
                              PLANET_LABELS[asp.planet1.toLowerCase()];
                            const p2 =
                              PLANET_LABELS[asp.planet2.toLowerCase()];
                            return (
                              <tr
                                key={i}
                                className="border-b border-[var(--color-border-subtle)] last:border-0"
                              >
                                <td className="py-2 px-2">
                                  {p1?.symbol} {p1?.label ?? asp.planet1}
                                </td>
                                <td className="py-2 px-2 text-center">
                                  <span
                                    title={info?.label}
                                    className={
                                      info?.nature === "harmonious"
                                        ? "text-emerald-400"
                                        : info?.nature === "tense"
                                          ? "text-rose-400"
                                          : "text-amber-400"
                                    }
                                  >
                                    {info?.symbol ?? asp.aspect}
                                  </span>
                                </td>
                                <td className="py-2 px-2">
                                  {p2?.symbol} {p2?.label ?? asp.planet2}
                                </td>
                                <td className="py-2 px-2 text-right text-[var(--color-muted-fg)]">
                                  {asp.orb.toFixed(1)}°
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </div>
          </ResultsSection>

          {/* House overlays (when birth times known) */}
          {overlays.length > 0 && (
            <ResultsSection title={t("houseOverlays")}>
              <div className="max-w-2xl mx-auto">
                <p className="text-[var(--color-muted-fg)] text-sm text-center mb-4">
                  {t("houseOverlaysDesc")}
                </p>
                <Card variant="default" padding="md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--color-border-subtle)]">
                          <th className="text-left py-2 px-2 text-[var(--color-muted-fg)]">
                            Planet
                          </th>
                          <th className="text-center py-2 px-2 text-[var(--color-muted-fg)]">
                            {t("inHouse")}
                          </th>
                          <th className="text-left py-2 px-2 text-[var(--color-muted-fg)]">
                            {t("sign")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {overlays.map((o, i) => (
                          <tr
                            key={i}
                            className="border-b border-[var(--color-border-subtle)] last:border-0"
                          >
                            <td className="py-2 px-2">
                              {
                                PLANET_LABELS[o.planet.toLowerCase()]
                                  ?.symbol
                              }{" "}
                              {o.planet}
                            </td>
                            <td className="py-2 px-2 text-center">
                              {o.house}
                            </td>
                            <td className="py-2 px-2 text-[var(--color-muted-fg)]">
                              {o.sign}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </ResultsSection>
          )}

          {/* Compatibility overview from the full engine */}
          {compat && (
            <ResultsSection title={t("overviewTitle")}>
              <SynastryReport result={compat} chartA={chartA} chartB={chartB} detailsA={personA as BirthDetails} detailsB={personB as BirthDetails} />
            </ResultsSection>
          )}

          <ShareResult
            title={t("shareTitle")}
            text={t("shareText", { total: aspects.length, harmonious: harmonious.length, tense: tense.length })}
          />

          <RelatedTools
            tools={[
              { title: t("relatedForecast"), description: t("relatedForecastDesc"), href: "/relationship-forecast" },
              { title: t("relatedComposite"), description: t("relatedCompositeDesc"), href: "/composite-chart" },
              { title: t("relatedBirthChart"), description: t("relatedBirthChartDesc"), href: "/birth-chart-compatibility" },
              { title: t("relatedMars"), description: t("relatedMarsDesc"), href: "/mars-sign-compatibility" },
              { title: t("relatedMoonPhase"), description: t("relatedMoonPhaseDesc"), href: "/moon-phase-soulmate" },
            ]}
          />
        </>
      )}

      {/* SEO content + FAQ */}
      <div className="max-w-2xl mx-auto mt-16 space-y-8">
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h3)",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            {t("whatIsTitle")}
          </h2>
          <p className="text-[var(--color-muted-fg)] leading-relaxed">
            {t("whatIsP1")}
          </p>
        </div>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h3)",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            {t("howToReadTitle")}
          </h2>
          <ol className="text-[var(--color-muted-fg)] leading-relaxed list-decimal pl-6 space-y-2">
            <li><strong>{t("howToRead1").split(" — ")[0]}</strong> — {t("howToRead1").split(" — ")[1]}</li>
            <li><strong>{t("howToRead2").split(" — ")[0]}</strong> — {t("howToRead2").split(" — ")[1]}</li>
            <li><strong>{t("howToRead3").split(" — ")[0]}</strong> — {t("howToRead3").split(" — ")[1]}</li>
            <li><strong>{t("howToRead4").split(" — ")[0]}</strong> — {t("howToRead4").split(" — ")[1]}</li>
            <li><strong>{t("howToRead5").split(" — ")[0]}</strong> — {t("howToRead5").split(" — ")[1]}</li>
          </ol>
        </div>

        <FAQSection
          items={[
            { question: t("faq1q"), answer: t("faq1a") },
            { question: t("faq2q"), answer: t("faq2a") },
            { question: t("faq3q"), answer: t("faq3a") },
            { question: t("faq4q"), answer: t("faq4a") },
            { question: t("faq5q"), answer: t("faq5a") },
          ]}
        />
      </div>
      {educationalContent}
    </CalculatorShell>
  );
}
