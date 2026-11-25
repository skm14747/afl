"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import {
  ResultsSection,
  RelatedTools,
  FAQSection,
  ShareResult,
} from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  calculateNatalChart,
  calculateAspects,
  type BirthDetails,
  type NatalChart,
  type AspectInfo,
} from "@/lib/astro-engine";
import { Flame, Heart } from "lucide-react";

interface ChemistryContact {
  label: string;
  aspect: string;
  orb: number;
  nature: "harmonious" | "challenging" | "neutral";
  reading: string;
}

function analyzeVenusMars(chartA: NatalChart, chartB: NatalChart, aspects: AspectInfo[]): ChemistryContact[] {
  const contacts: ChemistryContact[] = [];

  for (const a of aspects) {
    const p1 = a.planet1.toLowerCase();
    const p2 = a.planet2.toLowerCase();

    const isVenusMars =
      (p1.includes("venus") && p2.includes("mars")) ||
      (p1.includes("mars") && p2.includes("venus"));
    const isVenusVenus = p1.includes("venus") && p2.includes("venus");
    const isMarsMars = p1.includes("mars") && p2.includes("mars");

    if (!isVenusMars && !isVenusVenus && !isMarsMars) continue;

    let label = "";
    let reading = "";

    if (isVenusMars) {
      label = `${a.planet1} ${a.aspect} ${a.planet2}`;
      if (a.nature === "harmonious") {
        reading =
          "A flowing Venus–Mars contact. Attraction feels natural and easy — what one person finds beautiful, the other pursues without effort.";
      } else if (a.nature === "challenging") {
        reading =
          "A tense Venus–Mars contact. The pull is strong but can feel like friction: desire is there, but timing, pace, or style may clash before it settles.";
      } else {
        reading =
          "A Venus–Mars conjunction. Intense magnetic attraction — the strongest single chemistry signal in synastry. How it plays out depends on the signs involved.";
      }
    } else if (isVenusVenus) {
      label = `${a.planet1} ${a.aspect} ${a.planet2}`;
      if (a.nature === "harmonious" || a.nature === "neutral") {
        reading =
          "Both Venuses in harmony. You share a similar sense of beauty, comfort, and what a good relationship looks like. Date nights come naturally.";
      } else {
        reading =
          "Venus–Venus tension. You love differently — different aesthetics, different love languages, different ideas of romance. Not a dealbreaker, but worth naming.";
      }
    } else {
      label = `${a.planet1} ${a.aspect} ${a.planet2}`;
      if (a.nature === "harmonious" || a.nature === "neutral") {
        reading =
          "Mars–Mars in sync. You share a compatible drive and energy level. Conflict styles are similar, which can mean fewer misunderstandings.";
      } else {
        reading =
          "Mars–Mars friction. Both people assert strongly and may butt heads. The attraction can be fierce, but so can the arguments.";
      }
    }

    contacts.push({ label, aspect: a.aspect, orb: a.orb, nature: a.nature, reading });
  }

  return contacts;
}

function overallChemistryNote(contacts: ChemistryContact[], chartA: NatalChart, chartB: NatalChart): string {
  const venusMarsDirect = contacts.filter(
    (c) =>
      (c.label.toLowerCase().includes("venus") && c.label.toLowerCase().includes("mars")),
  );
  if (venusMarsDirect.length >= 2) {
    return "Multiple Venus–Mars contacts across both charts. This is an unusually strong chemistry signature — the attraction is probably obvious to both people.";
  }
  if (venusMarsDirect.length === 1) {
    return "One Venus–Mars cross-aspect found. There is a clear line of attraction, though other aspects decide how it plays out day to day.";
  }
  if (contacts.length > 0) {
    return "No direct Venus–Mars cross-aspect, but Venus–Venus or Mars–Mars contacts shape how you relate. Chemistry may build through shared taste or shared energy rather than instant magnetism.";
  }
  return `No Venus–Mars, Venus–Venus, or Mars–Mars aspects within standard orbs. Attraction may operate through other channels — Moon contacts, Sun–Venus, or house overlays. Venus in ${chartA.venus.sign} and ${chartB.venus.sign}; Mars in ${chartA.mars.sign} and ${chartB.mars.sign}.`;
}

export function VenusMarsAttractionCalculator({ educationalContent }: { educationalContent?: React.ReactNode }) {
  const [personA, setPersonA] = useState<Partial<BirthDetails>>({});
  const [personB, setPersonB] = useState<Partial<BirthDetails>>({});
  const [chartA, setChartA] = useState<NatalChart | null>(null);
  const [chartB, setChartB] = useState<NatalChart | null>(null);
  const [contacts, setContacts] = useState<ChemistryContact[]>([]);
  const [overallNote, setOverallNote] = useState("");
  const [errors, setErrors] = useState<{ a: Record<string, string>; b: Record<string, string> }>({
    a: {},
    b: {},
  });

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
    const allAspects = calculateAspects(cA, cB);
    const venusMarsList = analyzeVenusMars(cA, cB, allAspects);
    setContacts(venusMarsList);
    setOverallNote(overallChemistryNote(venusMarsList, cA, cB));
  };

  return (
    <CalculatorShell
      title="Venus–Mars Attraction"
      subtitle="Romantic Chemistry"
      description="Compare two birth charts for Venus–Mars cross-aspects — the classical signature of romantic and physical attraction in synastry."
      icon={<Flame className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          Venus is what you find beautiful and how you show affection. Mars is what you pursue and
          how you act on desire. When one person's Venus meets the other's Mars, astrologers read
          that as the chemistry line of the relationship.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BirthDetailsForm label="Person A" value={personA} onChange={setPersonA} showTime showLocation errors={errors.a} />
            <BirthDetailsForm label="Person B" value={personB} onChange={setPersonB} showTime showLocation errors={errors.b} />
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="primary" size="lg" onClick={handleCalculate} icon={<Flame className="w-4 h-4" />}>
              See the chemistry
            </Button>
          </div>
        </Card>
      </div>

      {chartA && chartB && (
        <>
          <ResultsSection title="Chemistry reading">
            {/* Placement summary */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm text-center">
                <Card variant="default" padding="md">
                  <p className="font-semibold mb-1">Person A</p>
                  <p className="text-[var(--color-muted-fg)]">
                    Venus in {chartA.venus.sign} · Mars in {chartA.mars.sign}
                  </p>
                </Card>
                <Card variant="default" padding="md">
                  <p className="font-semibold mb-1">Person B</p>
                  <p className="text-[var(--color-muted-fg)]">
                    Venus in {chartB.venus.sign} · Mars in {chartB.mars.sign}
                  </p>
                </Card>
              </div>
            </div>

            {/* Overall note */}
            <div className="max-w-2xl mx-auto text-center mb-8">
              <p className="text-[var(--color-fg)] leading-relaxed">{overallNote}</p>
            </div>

            {/* Contact cards */}
            {contacts.length > 0 && (
              <div className="max-w-3xl mx-auto space-y-4">
                {contacts.map((c, i) => (
                  <Card key={i} variant={c.nature === "harmonious" ? "feature" : "default"} padding="md">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 ${c.nature === "harmonious" ? "text-[var(--champagne-gold)]" : c.nature === "challenging" ? "text-[var(--cosmic-rose)]" : "text-[var(--color-muted-fg)]"}`}>
                        <Heart className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{c.label}</h4>
                          <Badge
                            variant={c.nature === "harmonious" ? "success" : c.nature === "challenging" ? "warning" : "default"}
                            size="sm"
                          >
                            {c.orb.toFixed(1)}° orb
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--color-fg)]">{c.reading}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {contacts.length === 0 && (
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-sm text-[var(--color-muted-fg)]">
                  No Venus–Mars, Venus–Venus, or Mars–Mars aspects within standard orbs. Try the
                  full synastry chart to see all cross-aspects.
                </p>
              </div>
            )}

            <ShareResult
              title="Venus–Mars Chemistry"
              text={
                contacts.length > 0
                  ? `${contacts.length} Venus/Mars contact(s) found`
                  : "No direct Venus–Mars contacts"
              }
            />
          </ResultsSection>

          <FAQSection
            items={[
              {
                question: "What does Venus–Mars mean in synastry?",
                answer:
                  "When one person's Venus (what they find attractive) aspects the other person's Mars (how they act on desire), astrologers read that as the chemistry signature. A trine or sextile flows easily; a square or opposition creates magnetic but sometimes frustrating attraction.",
              },
              {
                question: "What if no Venus–Mars aspect is found?",
                answer:
                  "Chemistry can operate through many channels: Sun–Venus, Moon–Mars, house overlays, or even Mars–Mars. This tool focuses on the Venus–Mars pair specifically. The full synastry chart shows every cross-aspect.",
              },
              {
                question: "Is a Venus–Mars square bad?",
                answer:
                  "Not bad — tense. Squares and oppositions often produce the most intense attraction. The challenge is that desire may express differently: one person reaches out while the other pulls back, or timing is off. Many long-term couples have this aspect.",
              },
            ]}
          />

          <RelatedTools
            tools={[
              { title: "Synastry Chart", description: "Full cross-aspect chart for two people.", href: "/synastry-chart" },
              { title: "Twin Flame Calculator", description: "Soul-level connection indicators.", href: "/twin-flame-calculator" },
              { title: "Love Compatibility", description: "Quick zodiac sign comparison.", href: "/love-compatibility" },
            ]}
          />
        </>
      )}
          {educationalContent}
    </CalculatorShell>
  );
}
