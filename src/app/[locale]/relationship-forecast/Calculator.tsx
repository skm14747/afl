"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import { SavedChartsBar } from "@/components/calculators/SavedChartsBar";
import { ScoreSummary, FAQSection, RelatedTools } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  calculateNatalChart,
  calculateAspects,
  calculateChartCompatibility,
  compositeChart,
  relationshipForecast,
  type BirthDetails,
  type CompatibilityResult,
  type ForecastWindow,
  type NatalChart,
  type AspectInfo,
} from "@/lib/astro-engine";
import { CalendarDays } from "lucide-react";
import { CosmicHeartBackground, CosmicHeartMark } from "@/components/cosmic/CosmicHeartBackground";

const THEME_LINE: Record<ForecastWindow["theme"], string> = {
  attraction: "Attraction is easier to feel.",
  emotional: "Emotional weather is louder.",
  commitment: "A commitment check is in the sky.",
  tension: "A tense patch asks for care.",
  ease: "The month has more room.",
};

export function RelationshipForecastCalculator({ educationalContent }: { educationalContent?: React.ReactNode }) {
  const [personA, setPersonA] = useState<Partial<BirthDetails>>({});
  const [personB, setPersonB] = useState<Partial<BirthDetails>>({});
  const [score, setScore] = useState<CompatibilityResult | null>(null);
  const [contacts, setContacts] = useState<AspectInfo[]>([]);
  const [composite, setComposite] = useState<NatalChart | null>(null);
  const [windows, setWindows] = useState<ForecastWindow[]>([]);
  const [approximate, setApproximate] = useState(false);
  const [errors, setErrors] = useState<{ a: Record<string, string>; b: Record<string, string> }>({ a: {}, b: {} });

  const handleCalculate = () => {
    const errA: Record<string, string> = {};
    const errB: Record<string, string> = {};
    if (!personA.date) errA.date = "Required";
    if (!personB.date) errB.date = "Required";
    if (Object.keys(errA).length || Object.keys(errB).length) {
      setErrors({ a: errA, b: errB });
      return;
    }
    setErrors({ a: {}, b: {} });
    const chartA = calculateNatalChart(personA as BirthDetails);
    const chartB = calculateNatalChart(personB as BirthDetails);
    const aspects = calculateAspects(chartA, chartB);
    setScore(calculateChartCompatibility(chartA, chartB));
    setContacts(aspects.slice(0, 3));
    setComposite(compositeChart(chartA, chartB));
    const forecast = relationshipForecast(chartA, chartB);
    setWindows(forecast.windows);
    setApproximate(forecast.timesApproximate);
  };

  return (
    <CalculatorShell
      title="Relationship Forecast"
      subtitle="Two people, the year ahead"
      description="A compatibility score for how these two charts meet, then the dated stretches of the next 12 months. These are planning markers, not a promise that you will marry, stay, or split."
      icon={<CalendarDays className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          The score describes the present contact between two tropical charts. The months that follow are transits to the composite chart, the midpoint chart of the relationship itself.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <SavedChartsBar details={personA as BirthDetails} onLoad={setPersonA} />
              <BirthDetailsForm label="Person A" value={personA} onChange={setPersonA} showTime showLocation errors={errors.a} />
            </div>
            <div className="flex flex-col gap-4">
              <SavedChartsBar details={personB as BirthDetails} onLoad={setPersonB} />
              <BirthDetailsForm label="Person B" value={personB} onChange={setPersonB} showTime showLocation errors={errors.b} />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button size="lg" onClick={handleCalculate}>See the year ahead</Button>
          </div>
        </Card>
      </div>

      {score && composite && (
        <section className="relative mt-12 overflow-hidden rounded-[var(--radius-2xl)] bg-immersive px-5 py-10 text-[var(--moonlight-cream)] md:px-10">
          <CosmicHeartBackground intensity="quiet" />
          <div className="relative">
            <div className="grid items-center gap-8 md:grid-cols-[200px_1fr]">
              <div className="mx-auto h-44 w-44">
                <CosmicHeartMark />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--blush-pink)]">How you meet now</p>
                <p
                  className="mt-2 tabular-nums"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 8vw, 5.5rem)", lineHeight: 0.95, fontWeight: 500 }}
                >
                  {score.overall}%
                </p>
                <p className="mt-3 max-w-md text-sm text-[var(--neutral-300)]">
                  Composite Sun in {composite.sun.sign}, Moon in {composite.moon.sign}, Venus in {composite.venus.sign}.
                </p>
              </div>
            </div>

            <ScoreSummary
              className="mt-10"
              scores={[
                { label: "Emotional", value: score.emotional },
                { label: "Romance", value: score.romance },
                { label: "Communication", value: score.communication },
                { label: "Values", value: score.values },
                { label: "Long-term", value: score.longTerm },
              ]}
            />

            <ul className="mx-auto mt-8 max-w-2xl space-y-2 text-sm">
              {contacts.map((contact) => (
                <li key={`${contact.planet1}-${contact.aspect}-${contact.planet2}`}>
                  {contact.planet1} {contact.aspect.toLowerCase()} {contact.planet2}
                  <span className="text-[var(--neutral-300)]"> · orb {contact.orb}°</span>
                </li>
              ))}
            </ul>

            {approximate && (
              <p className="mx-auto mt-6 max-w-xl text-center text-sm text-[var(--neutral-300)]">
                Without both birth times, these months are approximate. Houses are left out.
              </p>
            )}

            <h2
              className="mb-6 mt-12 text-center"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              The next 12 months
            </h2>
            {windows.length === 0 ? (
              <p className="text-center text-sm text-[var(--neutral-300)]">
                No close Venus, Mars, Jupiter, or Saturn transit to the composite falls in these twelve months.
              </p>
            ) : (
              <ol className="mx-auto max-w-2xl space-y-3">
                {windows.map((window) => (
                  <li key={window.peakDate} className="rounded-[var(--radius-lg)] border border-[var(--blush-pink)]/25 bg-[var(--deep-romance)]/55 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--blush-pink)]">{window.monthLabel}</p>
                    <p className="mt-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
                      {THEME_LINE[window.theme]}
                    </p>
                    <p className="mt-1 text-sm tabular-nums text-[var(--neutral-300)]">
                      Peak {window.peakDate}. Transit {window.transiting} {window.aspect.toLowerCase()} composite {window.target}, orb {window.orb}°.
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      )}

      <FAQSection
        items={[
          {
            question: "Does this say whether we will stay together?",
            answer: "No. Each date is the day a transit to the composite chart is tightest. It names a theme for that stretch. It is not a probability of marriage, staying, or splitting.",
          },
          {
            question: "Why are some months missing?",
            answer: "A month appears only when Venus, Mars, Jupiter, or Saturn makes a major aspect to the composite Sun, Moon, Venus, Mars, Saturn, or Jupiter. Empty months are left empty.",
          },
          {
            question: "What if we do not know the birth times?",
            answer: "The planet contacts still calculate. The composite Moon is less exact, houses are omitted, and the months are labeled approximate.",
          },
        ]}
      />
      <RelatedTools
        tools={[
          { title: "Synastry Chart", description: "Every aspect between the two charts.", href: "/synastry-chart" },
          { title: "Composite Chart", description: "The midpoint chart, plus a Davison chart when places are known.", href: "/composite-chart" },
          { title: "Marriage Compatibility", description: "A long-term reading of both charts.", href: "/marriage-compatibility" },
        ]}
      />
          {educationalContent}
    </CalculatorShell>
  );
}
