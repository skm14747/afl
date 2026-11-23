"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import { SavedChartsBar } from "@/components/calculators/SavedChartsBar";
import { ResultsSection, FAQSection, RelatedTools } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChartWheel } from "@/components/astrology/ChartWheel";
import {
  calculateNatalChart,
  compositeChart,
  davisonDetails,
  type BirthDetails,
  type NatalChart,
} from "@/lib/astro-engine";
import { Compass } from "lucide-react";

export default function CompositeChartPage() {
  const [personA, setPersonA] = useState<Partial<BirthDetails>>({});
  const [personB, setPersonB] = useState<Partial<BirthDetails>>({});
  const [composite, setComposite] = useState<NatalChart | null>(null);
  const [davison, setDavison] = useState<NatalChart | null>(null);
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
    setComposite(compositeChart(chartA, chartB));
    const midpoint = davisonDetails(personA as BirthDetails, personB as BirthDetails);
    setDavison(midpoint ? calculateNatalChart(midpoint) : null);
  };

  return (
    <CalculatorShell
      title="Composite Chart"
      subtitle="The relationship as a chart"
      description="A composite chart is the midpoint of two tropical charts. It describes the relationship itself. The Davison chart appears when both people have a birth time and a city."
      icon={<Compass className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
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
            <Button variant="secondary" size="lg" onClick={handleCalculate}>Calculate composite</Button>
          </div>
        </Card>
      </div>

      {composite && (
        <ResultsSection title="Composite and Davison">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ChartWheel chart={composite} caption="Composite midpoint chart" />
            {davison ? (
              <ChartWheel chart={davison} caption="Davison chart" />
            ) : (
              <p className="text-sm text-[var(--color-muted-fg)] self-center">
                Add a birth time and city for both people to calculate the Davison chart.
              </p>
            )}
          </div>
        </ResultsSection>
      )}

      <FAQSection
        items={[
          {
            question: "What is a composite chart?",
            answer: "Each planet is placed at the shorter-arc midpoint of the two people’s tropical positions. The result is read as the chart of the relationship.",
          },
          {
            question: "What is a Davison chart?",
            answer: "The Davison chart is a normal natal chart cast for the midpoint in time and the midpoint in place of the two births.",
          },
        ]}
      />
      <RelatedTools
        tools={[
          { title: "Birth Chart Compatibility", description: "Synastry of the two charts.", href: "/birth-chart-compatibility" },
          { title: "Kundli Matching", description: "Vedic marriage match.", href: "/kundli-matching" },
        ]}
      />
    </CalculatorShell>
  );
}
