"use client";

import React, { useState } from "react";
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

export default function SynastryChartPage() {
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
      title="Synastry Chart Calculator"
      subtitle="Relationship Astrology"
      description="Compare two birth charts to see every planetary aspect between them. A synastry chart reveals the connections, tensions, and themes that shape your relationship."
      icon={<Orbit className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      {/* Intro */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          A synastry chart overlays two natal charts and reads the aspects
          between one person&apos;s planets and the other&apos;s. Unlike
          Sun-sign compatibility, synastry compares every planet — revealing
          where the connection flows, where it rubs, and what makes this
          particular relationship unique. This page is the aspect grid.
          For dated stretches of the year ahead, use the{" "}
          <Link href="/relationship-forecast" className="underline">relationship forecast</Link>.
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
                label="Person A"
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
                label="Person B"
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
              Generate Synastry Chart
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {chartA && chartB && aspects.length > 0 && (
        <>
          {/* Visual biwheel */}
          <ResultsSection title="Synastry Chart">
            <div className="max-w-2xl mx-auto mb-8 flex flex-col md:flex-row gap-6 justify-center items-center">
              <ChartWheel chart={chartA} caption="Person A" />
              <ChartWheel chart={chartB} caption="Person B" />
            </div>

            {/* Summary badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="cosmic">{aspects.length} Aspects Found</Badge>
              <Badge variant="gold">
                {harmonious.length} Harmonious (△ ⚹)
              </Badge>
              <Badge variant="rose">{tense.length} Tense (□ ☍)</Badge>
            </div>
          </ResultsSection>

          {/* Aspect table grouped by theme */}
          <ResultsSection title="Aspects by Theme">
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
                            Person A
                          </th>
                          <th className="text-center py-2 px-2 text-[var(--color-muted-fg)]">
                            Aspect
                          </th>
                          <th className="text-left py-2 px-2 text-[var(--color-muted-fg)]">
                            Person B
                          </th>
                          <th className="text-right py-2 px-2 text-[var(--color-muted-fg)]">
                            Orb
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
            <ResultsSection title="House Overlays">
              <div className="max-w-2xl mx-auto">
                <p className="text-[var(--color-muted-fg)] text-sm text-center mb-4">
                  Where one person&apos;s planets land in the other&apos;s
                  houses — showing which life areas the relationship activates.
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
                            In House
                          </th>
                          <th className="text-left py-2 px-2 text-[var(--color-muted-fg)]">
                            Sign
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
            <ResultsSection title="Relationship Overview">
              <SynastryReport result={compat} chartA={chartA} chartB={chartB} detailsA={personA as BirthDetails} detailsB={personB as BirthDetails} />
            </ResultsSection>
          )}

          <ShareResult
            title="Synastry Chart"
            text={`Our synastry chart has ${aspects.length} aspects (${harmonious.length} harmonious, ${tense.length} tense). Generated at AstrologyForLove.`}
          />

          <RelatedTools
            tools={[
              { title: "Relationship Forecast", description: "See the next 12 months of this bond.", href: "/relationship-forecast" },
              { title: "Composite Chart", description: "The relationship as its own chart.", href: "/composite-chart" },
              { title: "Birth Chart Compatibility", description: "Full natal chart comparison.", href: "/birth-chart-compatibility" },
              { title: "Mars Sign Compatibility", description: "Compare passion, desire, and conflict styles.", href: "/mars-sign-compatibility" },
              { title: "Moon Phase Soulmate", description: "Do your birth moons make a full moon?", href: "/moon-phase-soulmate" },
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
            What is a synastry chart?
          </h2>
          <p className="text-[var(--color-muted-fg)] leading-relaxed">
            A synastry chart compares two natal charts planet by planet. The
            angles between your planets and theirs — called aspects — show
            where the connection flows naturally and where it creates friction.
            Sun-sign compatibility compares one point in each chart. A synastry
            chart compares every planet with every planet, which is why two
            people with &ldquo;incompatible&rdquo; Sun signs can still have a
            strong connection.
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
            How to read your synastry chart
          </h2>
          <ol className="text-[var(--color-muted-fg)] leading-relaxed list-decimal pl-6 space-y-2">
            <li>
              <strong>Start with the tightest aspects</strong> — the smaller
              the orb, the stronger the contact. Anything under 2° is felt
              strongly by both people.
            </li>
            <li>
              <strong>Look at Venus and Mars contacts first</strong> — these
              describe attraction and chemistry. Venus-Mars aspects between two
              charts are the classic indicator of romantic spark.
            </li>
            <li>
              <strong>Check Moon contacts</strong> — Moon-to-Moon and
              Moon-to-Sun aspects reveal whether you feel emotionally safe and
              understood with each other.
            </li>
            <li>
              <strong>Note Saturn aspects</strong> — Saturn brings commitment
              but also friction. A Saturn trine to Venus is long-lasting love;
              a Saturn square can feel limiting.
            </li>
            <li>
              <strong>Count harmonious vs tense</strong> — a healthy
              relationship chart usually has both. Trines and sextiles provide
              ease; squares and oppositions create growth.
            </li>
          </ol>
        </div>

        <FAQSection
          items={[
            {
              question: "Do I need an exact birth time for a synastry chart?",
              answer: "Planet-to-planet aspects work without a birth time. House overlays, the Rising sign, and the exact Moon position need a known time. Without a time, positions are calculated at noon and the Moon is marked as approximate.",
            },
            {
              question: "How is synastry different from a composite chart?",
              answer: "Synastry compares the two charts directly — planet to planet. A composite chart blends them into one midpoint chart for the relationship. Synastry shows how you interact; a composite shows what the relationship itself is like.",
            },
            {
              question: "What are the most important synastry aspects?",
              answer: "Venus-Mars cross-aspects (romantic attraction), Moon-Moon and Sun-Moon (emotional bond), and Saturn contacts (long-term staying power) are what most astrologers look at first.",
            },
            {
              question: "Is this synastry chart calculator free?",
              answer: "Yes. The full synastry chart, aspects, house overlays, and compatibility themes are free. No signup, no account, no payment required.",
            },
            {
              question: "Can I use this for friendships or family?",
              answer: "Absolutely. Synastry works for any two people. The same aspects that show romantic chemistry also reveal communication patterns, friction points, and areas of natural support in any relationship.",
            },
          ]}
        />
      </div>
    </CalculatorShell>
  );
}
