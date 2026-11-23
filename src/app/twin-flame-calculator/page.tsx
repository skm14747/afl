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
  calculateAspects,
  type BirthDetails,
  type NatalChart,
  type AspectInfo,
} from "@/lib/astro-engine";
import { Flame, Sparkles, Heart, Moon, Star } from "lucide-react";

function analyzeTwinFlameIndicators(chartA: NatalChart, chartB: NatalChart, aspects: AspectInfo[]) {
  const indicators: { title: string; description: string; present: boolean; significance: string }[] = [];

  // Venus-Mars cross-aspects
  const venusMarsCross = aspects.filter(
    (a) =>
      (a.planet1.includes("Venus") && a.planet2.includes("Mars")) ||
      (a.planet1.includes("Mars") && a.planet2.includes("Venus"))
  );
  indicators.push({
    title: "Venus-Mars Connection",
    description: "Cross-aspects between Venus and Mars indicate magnetic romantic and physical attraction.",
    present: venusMarsCross.length > 0,
    significance: venusMarsCross.length > 0
      ? `Found ${venusMarsCross.length} Venus-Mars aspect(s): ${venusMarsCross.map((a) => a.aspect).join(", ")}.`
      : "No direct Venus-Mars aspects found — attraction may operate through other channels.",
  });

  // Moon connections
  const moonAspects = aspects.filter(
    (a) =>
      (a.planet1.includes("Moon") && !a.planet2.includes("Moon")) ||
      (!a.planet1.includes("Moon") && a.planet2.includes("Moon"))
  );
  const moonHarmonious = moonAspects.filter((a) => a.nature === "harmonious");
  indicators.push({
    title: "Lunar Bond",
    description: "Moon contacts between charts indicate deep emotional recognition and familiarity.",
    present: moonHarmonious.length > 0,
    significance: moonHarmonious.length > 0
      ? `${moonHarmonious.length} harmonious Moon aspect(s) suggest intuitive emotional understanding.`
      : "Moon contacts are more complex — emotional connection may require conscious effort.",
  });

  // Sun-Moon interchange
  const sunMoonCross = aspects.filter(
    (a) =>
      (a.planet1.includes("Sun") && a.planet2.includes("Moon")) ||
      (a.planet1.includes("Moon") && a.planet2.includes("Sun"))
  );
  indicators.push({
    title: "Sun-Moon Exchange",
    description: "Sun-Moon contacts are among the most significant markers of deep relationship bonding.",
    present: sunMoonCross.length > 0,
    significance: sunMoonCross.length > 0
      ? `Sun-Moon ${sunMoonCross[0].aspect} found — this is traditionally one of the strongest indicators of a soul-level connection.`
      : "No direct Sun-Moon aspects — the connection may express through other planetary channels.",
  });

  // Saturn contacts (karmic)
  const saturnAspects = aspects.filter(
    (a) => a.planet1.includes("Saturn") || a.planet2.includes("Saturn")
  );
  indicators.push({
    title: "Saturn (Karmic) Contacts",
    description: "Saturn aspects between charts suggest a fated quality — lessons, responsibility, and endurance.",
    present: saturnAspects.length > 0,
    significance: saturnAspects.length > 0
      ? `${saturnAspects.length} Saturn aspect(s) found, suggesting themes of commitment, lessons, and lasting bonds.`
      : "Fewer Saturn contacts may indicate a lighter, less karmically charged dynamic.",
  });

  // Same sign Venus
  const sameVenus = chartA.venus.sign === chartB.venus.sign;
  indicators.push({
    title: "Venus Alignment",
    description: "When both people share the same Venus sign, they instinctively understand each other's love language.",
    present: sameVenus,
    significance: sameVenus
      ? `Both have Venus in ${chartA.venus.sign} — a natural harmony in how you give and receive love.`
      : `Venus in ${chartA.venus.sign} and ${chartB.venus.sign} — different but potentially complementary love styles.`,
  });

  return indicators;
}

export default function TwinFlameCalculatorPage() {
  const [personA, setPersonA] = useState<Partial<BirthDetails>>({});
  const [personB, setPersonB] = useState<Partial<BirthDetails>>({});
  const [chartA, setChartA] = useState<NatalChart | null>(null);
  const [chartB, setChartB] = useState<NatalChart | null>(null);
  const [aspects, setAspects] = useState<AspectInfo[]>([]);
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
    setAspects(calculateAspects(cA, cB));
  };

  const indicators = chartA && chartB ? analyzeTwinFlameIndicators(chartA, chartB, aspects) : [];
  const presentCount = indicators.filter((i) => i.present).length;

  return (
    <CalculatorShell
      title="Twin Flame Calculator"
      subtitle="Soul Connection"
      description="Explore the astrological indicators of a deep soul-level connection between two people. This tool examines synastry contacts traditionally associated with intense, transformative bonds."
      icon={<Flame className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="text-xs text-[var(--color-warning)] bg-[var(--color-warning-bg)] px-4 py-3 rounded-[var(--radius-md)] mb-6">
          <strong>Important:</strong> This calculator cannot verify whether two people are
          &ldquo;twin flames.&rdquo; It identifies astrological contacts traditionally associated
          with deep, intense connections. The concept of twin flames is a spiritual belief, not
          an astrological certainty.
        </div>
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          Certain planetary aspects between two natal charts have been traditionally associated
          with profound soul recognition, intense attraction, and transformative relationships.
          This tool examines those specific contacts.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BirthDetailsForm label="Person A" value={personA} onChange={setPersonA} showTime errors={errors.a} />
            <BirthDetailsForm label="Person B" value={personB} onChange={setPersonB} showTime errors={errors.b} />
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="secondary" size="lg" onClick={handleCalculate} icon={<Flame className="w-4 h-4" />}>
              Analyze Connection
            </Button>
          </div>
        </Card>
      </div>

      {chartA && chartB && indicators.length > 0 && (
        <>
          <ResultsSection title="Soul Connection Indicators">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <div className="text-4xl font-bold text-[var(--champagne-gold)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {presentCount} of {indicators.length}
              </div>
              <p className="text-sm text-[var(--color-muted-fg)]">
                traditional indicators present in your synastry
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {indicators.map((ind, i) => (
                <Card key={i} variant={ind.present ? "feature" : "outlined"} padding="md">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 ${ind.present ? "text-[var(--champagne-gold)]" : "text-[var(--neutral-400)]"}`}>
                      {ind.present ? <Star className="w-5 h-5" /> : <span className="w-5 h-5 block rounded-full border-2 border-current" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{ind.title}</h4>
                        <Badge variant={ind.present ? "gold" : "default"} size="sm">
                          {ind.present ? "Present" : "Not found"}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--color-muted-fg)] mb-1">{ind.description}</p>
                      <p className="text-sm text-[var(--color-fg)]">{ind.significance}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <ShareResult
              title="Twin Flame Analysis"
              text={`${presentCount} of ${indicators.length} soul connection indicators found`}
            />
          </ResultsSection>

          {/* Aspects detail */}
          {aspects.length > 0 && (
            <div className="mt-10 max-w-3xl mx-auto">
              <h3 className="text-center mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}>
                All Synastry Aspects
              </h3>
              <Card variant="default" padding="sm">
                <div className="divide-y divide-[var(--color-border-subtle)] max-h-72 overflow-y-auto">
                  {aspects.map((a, i) => (
                    <div key={i} className="py-2 px-3 flex items-center justify-between text-sm">
                      <span>
                        <span className="font-medium">{a.planet1}</span>
                        <span className="text-[var(--color-muted-fg)]"> {a.aspect} </span>
                        <span className="font-medium">{a.planet2}</span>
                      </span>
                      <Badge variant={a.nature === "harmonious" ? "success" : a.nature === "challenging" ? "warning" : "default"} size="sm">
                        {a.orb.toFixed(1)}° orb
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </>
      )}

      <FAQSection
        items={[
          {
            question: "What is a twin flame in astrology?",
            answer: "The twin flame concept suggests two souls that share an intense, transformative connection. In astrology, certain synastry aspects — like Sun-Moon contacts, Venus-Mars crossings, and Saturn bonds — are traditionally associated with this kind of deep connection.",
          },
          {
            question: "Can this tool confirm I've found my twin flame?",
            answer: "No. No astrological tool can confirm a twin flame connection. This tool identifies specific planetary contacts associated with intense bonds. The concept of twin flames is spiritual, not scientifically or astrologically provable.",
          },
          {
            question: "What aspects indicate a twin flame connection?",
            answer: "Sun-Moon contacts, Venus-Mars cross-aspects, North Node conjunctions, Pluto aspects to personal planets, and Saturn contacts are traditionally considered significant for deep soul-level connections.",
          },
        ]}
      />

      <RelatedTools
        tools={[
          { title: "Birth Chart Compatibility", description: "Full synastry analysis.", href: "/birth-chart-compatibility" },
          { title: "Soulmate Calculator", description: "Your romantic astrology profile.", href: "/soulmate-calculator" },
          { title: "Love Compatibility", description: "Zodiac sign comparison.", href: "/love-compatibility" },
        ]}
      />
    </CalculatorShell>
  );
}
