"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import {
  ResultsSection,
  RelatedTools,
  FAQSection,
  ShareResult,
} from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { wetonFromDate, jodohFromNeptu, type WetonDay, type JodohResult } from "@/lib/weton";
import { Heart, Moon } from "lucide-react";

export function WetonJodohCalculator({ educationalContent }: { educationalContent?: React.ReactNode }) {
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [result, setResult] = useState<{
    wetonA: WetonDay;
    wetonB: WetonDay;
    jodoh: JodohResult;
    total: number;
  } | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    if (!dateA || !dateB) {
      setError("Both birth dates are required.");
      return;
    }
    setError("");
    const dA = new Date(dateA + "T00:00:00Z");
    const dB = new Date(dateB + "T00:00:00Z");
    if (isNaN(dA.getTime()) || isNaN(dB.getTime())) {
      setError("One of the dates is not valid.");
      return;
    }
    const wetonA = wetonFromDate(dA);
    const wetonB = wetonFromDate(dB);
    const total = wetonA.neptu + wetonB.neptu;
    const jodoh = jodohFromNeptu(wetonA.neptu, wetonB.neptu);
    setResult({ wetonA, wetonB, jodoh, total });
  };

  return (
    <CalculatorShell
      title="Weton Jodoh"
      subtitle="Javanese Love Match"
      description="A Javanese cultural reading from two birth dates. The weton is your weekday plus market day; the neptu total maps to one of eight traditional labels."
      icon={<Moon className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          In Javanese tradition, every birth date carries a weton — the combination of the
          seven-day week (saptawara) and the five-day market cycle (pancawara). Each day has a
          neptu value. When two people's neptu are added together, the total maps to a jodoh label
          that describes the quality of the match.
        </p>
        <p className="text-xs text-[var(--color-muted-fg)] mt-3">
          This is a cultural reading passed down through the primbon tradition. It is not a verdict
          on a relationship and not a substitute for communication and commitment.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Card variant="default" padding="lg">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Person A — birth date</label>
              <input
                type="date"
                value={dateA}
                onChange={(e) => setDateA(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-input-bg)] text-[var(--color-fg)] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Person B — birth date</label>
              <input
                type="date"
                value={dateB}
                onChange={(e) => setDateB(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-input-bg)] text-[var(--color-fg)] text-sm"
              />
            </div>
            {error && <p className="text-sm text-[var(--cosmic-rose)]">{error}</p>}
            <div className="flex justify-center">
              <Button variant="primary" size="lg" onClick={handleCalculate} icon={<Heart className="w-4 h-4" />}>
                Hitung jodoh
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {result && (
        <>
          <ResultsSection title="Weton and jodoh">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
              <Card variant="default" padding="md">
                <p className="font-semibold mb-1 text-sm">Person A</p>
                <p className="text-lg" style={{ fontFamily: "var(--font-display)" }}>
                  {result.wetonA.hari} {result.wetonA.pasaran}
                </p>
                <p className="text-sm text-[var(--color-muted-fg)]">Neptu: {result.wetonA.neptu}</p>
              </Card>
              <Card variant="default" padding="md">
                <p className="font-semibold mb-1 text-sm">Person B</p>
                <p className="text-lg" style={{ fontFamily: "var(--font-display)" }}>
                  {result.wetonB.hari} {result.wetonB.pasaran}
                </p>
                <p className="text-sm text-[var(--color-muted-fg)]">Neptu: {result.wetonB.neptu}</p>
              </Card>
            </div>

            <div className="max-w-xl mx-auto text-center mb-6">
              <p className="text-sm text-[var(--color-muted-fg)] mb-2">
                Total neptu: {result.total} · Remainder when divided by 8: {result.total % 8}
              </p>
              <div
                className="text-3xl font-bold text-[var(--champagne-gold)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {result.jodoh.label}
              </div>
              <p className="text-sm text-[var(--color-fg)] mt-2 leading-relaxed">
                {result.jodoh.description}
              </p>
            </div>

            {/* Neptu reference table */}
            <div className="max-w-lg mx-auto mt-8 overflow-x-auto">
              <h4 className="text-sm font-semibold mb-2">Neptu reference</h4>
              <div className="grid grid-cols-2 gap-4 text-xs text-[var(--color-muted-fg)]">
                <div>
                  <p className="font-medium text-[var(--color-fg)] mb-1">Hari (saptawara)</p>
                  <ul className="space-y-0.5">
                    <li>Minggu — 5</li>
                    <li>Senin — 4</li>
                    <li>Selasa — 3</li>
                    <li>Rabu — 7</li>
                    <li>Kamis — 8</li>
                    <li>Jumat — 6</li>
                    <li>Sabtu — 9</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-[var(--color-fg)] mb-1">Pasaran (pancawara)</p>
                  <ul className="space-y-0.5">
                    <li>Legi — 5</li>
                    <li>Pahing — 9</li>
                    <li>Pon — 7</li>
                    <li>Wage — 4</li>
                    <li>Kliwon — 8</li>
                  </ul>
                </div>
              </div>
            </div>

            <ShareResult
              title="Weton Jodoh"
              text={`${result.jodoh.label} — ${result.wetonA.hari} ${result.wetonA.pasaran} and ${result.wetonB.hari} ${result.wetonB.pasaran}`}
            />
          </ResultsSection>

          <FAQSection
            items={[
              {
                question: "What is a weton?",
                answer:
                  "A weton is the combination of the seven-day week (saptawara) and the five-day Javanese market cycle (pancawara). Every day has both a weekday name and a pasaran name, each with a neptu value.",
              },
              {
                question: "How is the jodoh label calculated?",
                answer:
                  "Each person's neptu (hari value + pasaran value) is added together. The total is divided by 8, and the remainder maps to one of eight traditional labels: Pegat, Ratu, Jodoh, Topo, Tinari, Padu, Sujanan, or Pesthi.",
              },
              {
                question: "Is this a prediction?",
                answer:
                  "No. This is a cultural reading from the Javanese primbon tradition. It names a theme for the relationship, not a guarantee or a warning. Communication, respect, and commitment matter more than any calculation.",
              },
              {
                question: "How is this different from zodiac compatibility?",
                answer:
                  "Zodiac compatibility uses the Western tropical zodiac (Sun signs, Moon, Venus, Mars). Weton jodoh uses the Javanese calendar. They are independent traditions.",
              },
            ]}
          />

          <RelatedTools
            tools={[
              { title: "Love Compatibility", description: "Western zodiac sign match.", href: "/love-compatibility" },
              { title: "Kundli Matching", description: "Vedic 36-guna match.", href: "/kundli-matching" },
            ]}
          />
        </>
      )}
          {educationalContent}
    </CalculatorShell>
  );
}
