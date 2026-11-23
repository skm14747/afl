"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { ResultsSection, InsightBlock, RelatedTools, FAQSection, ShareResult } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TextInput, DateInput } from "@/components/ui/Input";
import { calculateLifePathNumber, LIFE_PATH_MEANINGS } from "@/lib/astro-engine";
import { Hash, Heart, Star, AlertTriangle } from "lucide-react";

function getNumerologyCompatibility(lp1: number, lp2: number) {
  // Compatible pairs based on numerological tradition
  const highCompat: [number, number][] = [
    [1, 5], [1, 7], [2, 4], [2, 6], [2, 8], [3, 5], [3, 6], [3, 9],
    [4, 6], [4, 8], [5, 7], [5, 9], [6, 9], [7, 9],
  ];
  const modCompat: [number, number][] = [
    [1, 2], [1, 3], [1, 9], [2, 3], [2, 7], [3, 4], [3, 7],
    [4, 5], [4, 7], [5, 6], [5, 8], [6, 7], [6, 8], [7, 8], [8, 9],
  ];

  const pair = [Math.min(lp1, lp2), Math.max(lp1, lp2)] as [number, number];
  const isHigh = highCompat.some((c) => c[0] === pair[0] && c[1] === pair[1]) || lp1 === lp2;
  const isMod = modCompat.some((c) => c[0] === pair[0] && c[1] === pair[1]);

  if (isHigh) {
    return {
      level: "Strong" as const,
      score: 82,
      summary: `Life Paths ${lp1} and ${lp2} share a natural resonance. Your core drives and life purposes complement each other well.`,
    };
  }
  if (isMod) {
    return {
      level: "Moderate" as const,
      score: 62,
      summary: `Life Paths ${lp1} and ${lp2} have complementary qualities that can create a balanced partnership with mutual understanding.`,
    };
  }
  return {
    level: "Growth-Oriented" as const,
    score: 45,
    summary: `Life Paths ${lp1} and ${lp2} bring different energies — this pairing encourages growth through learning to appreciate contrasting approaches to life.`,
  };
}

export default function RelationshipNumerologyPage() {
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [result, setResult] = useState<{
    lpA: number;
    lpB: number;
    meaningA: (typeof LIFE_PATH_MEANINGS)[number];
    meaningB: (typeof LIFE_PATH_MEANINGS)[number];
    compat: ReturnType<typeof getNumerologyCompatibility>;
  } | null>(null);
  const [errors, setErrors] = useState<{ a?: string; b?: string }>({});

  const handleCalculate = () => {
    const errs: { a?: string; b?: string } = {};
    if (!dateA) errs.a = "Required";
    if (!dateB) errs.b = "Required";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    const lpA = calculateLifePathNumber(dateA);
    const lpB = calculateLifePathNumber(dateB);
    setResult({
      lpA,
      lpB,
      meaningA: LIFE_PATH_MEANINGS[lpA] || LIFE_PATH_MEANINGS[lpA > 9 ? lpA : 1],
      meaningB: LIFE_PATH_MEANINGS[lpB] || LIFE_PATH_MEANINGS[lpB > 9 ? lpB : 1],
      compat: getNumerologyCompatibility(lpA, lpB),
    });
  };

  return (
    <CalculatorShell
      title="Relationship Numerology"
      subtitle="Life Path Compatibility"
      description="Discover how your Life Path numbers interact and what numerology reveals about your relationship dynamics."
      icon={<Hash className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          In numerology, your Life Path number is derived from your full date of birth. It represents
          your core life purpose and personality. By comparing two Life Path numbers, numerology
          offers insights into relationship dynamics, shared tendencies, and potential challenges.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <Card variant="default" padding="lg">
          <div className="space-y-4">
            <DateInput label="Person A — Date of Birth" value={dateA} onChange={(e) => setDateA(e.target.value)} error={errors.a} />
            <DateInput label="Person B — Date of Birth" value={dateB} onChange={(e) => setDateB(e.target.value)} error={errors.b} />
          </div>
          <div className="flex justify-center mt-6">
            <Button variant="secondary" size="lg" onClick={handleCalculate} icon={<Hash className="w-4 h-4" />}>
              Calculate Life Paths
            </Button>
          </div>
        </Card>
      </div>

      {result && (
        <>
          <ResultsSection title="Your Numerology Compatibility">
            {/* Life Path Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
              <Card variant="feature" padding="lg" className="text-center">
                <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-2">Person A</div>
                <div className="text-5xl font-bold mb-2 text-gold-gradient" style={{ fontFamily: "var(--font-display)" }}>
                  {result.lpA}
                </div>
                <div className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  {result.meaningA.title}
                </div>
                <div className="text-xs text-[var(--color-muted-fg)]">{result.meaningA.traits}</div>
              </Card>
              <Card variant="feature" padding="lg" className="text-center">
                <div className="text-xs uppercase tracking-wider text-[var(--romantic-rose)] mb-2">Person B</div>
                <div className="text-5xl font-bold mb-2 text-gold-gradient" style={{ fontFamily: "var(--font-display)" }}>
                  {result.lpB}
                </div>
                <div className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  {result.meaningB.title}
                </div>
                <div className="text-xs text-[var(--color-muted-fg)]">{result.meaningB.traits}</div>
              </Card>
            </div>

            {/* Compatibility */}
            <div className="max-w-2xl mx-auto text-center mb-8">
              <Badge variant={result.compat.level === "Strong" ? "gold" : result.compat.level === "Moderate" ? "cosmic" : "rose"} size="md">
                {result.compat.level} Compatibility
              </Badge>
              <p className="mt-4 text-[var(--color-muted-fg)] leading-relaxed italic" style={{ fontFamily: "var(--font-display)" }}>
                {result.compat.summary}
              </p>
            </div>

            {/* Individual interpretations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <InsightBlock title={`Life Path ${result.lpA} in Love`} content={result.meaningA.inLove} icon={<Heart className="w-4 h-4" />} variant="gold" />
              <InsightBlock title={`Life Path ${result.lpB} in Love`} content={result.meaningB.inLove} icon={<Heart className="w-4 h-4" />} variant="rose" />
            </div>

            <ShareResult
              title="Relationship Numerology"
              text={`Life Path ${result.lpA} & Life Path ${result.lpB}: ${result.compat.level} compatibility!`}
            />
          </ResultsSection>

          {/* How it works */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3 className="text-center mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}>
              How Life Path Number Is Calculated
            </h3>
            <div className="text-sm text-[var(--color-muted-fg)] leading-relaxed space-y-3">
              <p>
                Your Life Path number is calculated by reducing your full date of birth to a single digit
                (or Master Number 11, 22, or 33). Each digit of the date is added together, and the
                sum is reduced until a single digit or Master Number remains.
              </p>
              <p>
                For example, a birth date of July 15, 1990 (1990-07-15): 1+9+9+0+0+7+1+5 = 32, then 3+2 = 5.
                The Life Path number is 5.
              </p>
            </div>
          </div>
        </>
      )}

      <FAQSection
        items={[
          { question: "What is a Life Path number?", answer: "It's the most significant number in numerology, derived from your full birth date. It represents your core personality, life purpose, and the qualities you bring to relationships." },
          { question: "What are Master Numbers?", answer: "Numbers 11, 22, and 33 are considered Master Numbers in numerology — they carry intensified energy and are not reduced further. They indicate heightened intuition, vision, or spiritual purpose." },
          { question: "Is numerology the same as astrology?", answer: "No. Numerology uses numbers derived from dates and names, while astrology uses planetary positions. Both offer complementary perspectives on personality and relationships." },
        ]}
      />

      <RelatedTools
        tools={[
          { title: "Love Compatibility", description: "Zodiac sign comparison.", href: "/love-compatibility" },
          { title: "Soulmate Calculator", description: "Astrological love profile.", href: "/soulmate-calculator" },
          { title: "Marriage Compatibility", description: "Chart-based partnership analysis.", href: "/marriage-compatibility" },
        ]}
      />
    </CalculatorShell>
  );
}
