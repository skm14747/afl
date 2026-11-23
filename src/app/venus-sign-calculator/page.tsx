"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import { ResultsSection, InsightBlock, RelatedTools, FAQSection, ShareResult } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ZodiacIcon } from "@/components/astrology/ZodiacIcon";
import { ZODIAC_ELEMENTS } from "@/lib/astrology-data";
import { calculateNatalChart, VENUS_SIGN_INTERPRETATIONS, type BirthDetails, type PlanetPosition } from "@/lib/astro-engine";
import { Heart, Sparkles, Eye, MessageCircle, Shield } from "lucide-react";

export default function VenusSignCalculatorPage() {
  const [birthDetails, setBirthDetails] = useState<Partial<BirthDetails>>({});
  const [venus, setVenus] = useState<PlanetPosition | null>(null);
  const [birthTimeKnown, setBirthTimeKnown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    if (!birthDetails.date) errs.date = "Date of birth is required.";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const chart = calculateNatalChart(birthDetails as BirthDetails);
    setVenus(chart.venus);
    setBirthTimeKnown(chart.birthTimeKnown);
  };

  const interp = venus ? VENUS_SIGN_INTERPRETATIONS[venus.sign] : null;

  return (
    <CalculatorShell
      title="Venus Sign Calculator"
      subtitle="Love & Attraction"
      description="Venus governs how you love, what attracts you, and how you express affection. Discover your Venus sign and understand your romantic nature."
      icon={<span className="text-3xl">♀</span>}
    >
      {/* Intro */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          In astrology, Venus represents love, beauty, pleasure, and attraction. Your Venus sign
          reveals your romantic style, what you find beautiful, and how you connect with others
          on an emotional and physical level. It is one of the most important placements for
          understanding your love life.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto">
        <Card variant="default" padding="lg">
          <BirthDetailsForm
            label="Enter Your Birth Details"
            value={birthDetails}
            onChange={setBirthDetails}
            showTime
            showLocation={false}
            errors={errors}
          />
          <div className="mt-6 flex justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCalculate}
              icon={<Heart className="w-4 h-4" />}
            >
              Calculate Venus Sign
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {venus && interp && (
        <>
          <ResultsSection title="Your Venus Sign">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <div className="flex justify-center mb-4">
                <ZodiacIcon sign={venus.sign} size="lg" showElement />
              </div>
              <h3
                className="mb-2"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", fontWeight: 600 }}
              >
                Venus in {venus.sign}
              </h3>
              <div className="flex justify-center gap-2 mb-4">
                <Badge variant="gold">{venus.degree.toFixed(1)}° {venus.sign}</Badge>
                <Badge variant="cosmic">{ZODIAC_ELEMENTS[venus.sign]} Element</Badge>
                {venus.retrograde && <Badge variant="rose">Retrograde ℞</Badge>}
              </div>

              {!birthTimeKnown && (
                <p className="text-xs text-[var(--color-warning)] bg-[var(--color-warning-bg)] px-3 py-2 rounded-[var(--radius-md)] inline-block">
                  Venus sign calculated without birth time. Venus changes signs approximately every
                  3–4 weeks, so this result is likely accurate. For exact degree, provide your birth time.
                </p>
              )}
            </div>

            {/* Interpretation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <InsightBlock
                title="Your Love Style"
                content={interp.loveStyle}
                icon={<Heart className="w-4 h-4" />}
                variant="rose"
              />
              <InsightBlock
                title="What Attracts You"
                content={interp.attracted}
                icon={<Eye className="w-4 h-4" />}
                variant="gold"
              />
              <InsightBlock
                title="In Relationships"
                content={interp.relationship}
                icon={<MessageCircle className="w-4 h-4" />}
              />
              <InsightBlock
                title="How You Express Love"
                content={interp.expression}
                icon={<Sparkles className="w-4 h-4" />}
                variant="gold"
              />
              <InsightBlock
                title="What You Need"
                content={interp.needs}
                icon={<Shield className="w-4 h-4" />}
                variant="rose"
              />
            </div>

            <ShareResult
              title="My Venus Sign"
              text={`My Venus is in ${venus.sign}! ${interp.loveStyle}`}
            />
          </ResultsSection>

          {/* How Venus sign works */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3
              className="text-center mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              Understanding Venus in Astrology
            </h3>
            <div className="text-sm text-[var(--color-muted-fg)] leading-relaxed space-y-3">
              <p>
                Venus orbits the Sun in approximately 225 days, spending about 3–4 weeks in each zodiac
                sign. Its position at the time of your birth determines your Venus sign. Because Venus
                is never more than 47° from the Sun, your Venus sign is always the same as, or within
                two signs of, your Sun sign.
              </p>
              <p>
                This calculator uses precise astronomical ephemeris data to determine Venus&apos;s
                exact position at your time of birth. When birth time is provided, the calculation
                is accurate to the degree. Without birth time, Venus&apos;s sign is typically still
                correct since it moves relatively slowly through the zodiac.
              </p>
            </div>
          </div>
        </>
      )}

      {/* FAQ */}
      <FAQSection
        items={[
          {
            question: "What is a Venus sign?",
            answer: "Your Venus sign is the zodiac sign Venus was in at the moment of your birth. It governs your approach to love, beauty, pleasure, and attraction — revealing your romantic personality.",
          },
          {
            question: "Is my Venus sign the same as my Sun sign?",
            answer: "Not necessarily. Venus can only be within two signs of your Sun sign, so it may be the same sign or one of the four adjacent signs. Many people have different Sun and Venus signs.",
          },
          {
            question: "Do I need my exact birth time?",
            answer: "For Venus sign, exact birth time is usually not critical since Venus moves slowly (3-4 weeks per sign). However, for the exact degree, birth time improves accuracy.",
          },
          {
            question: "What if Venus was retrograde when I was born?",
            answer: "Venus retrograde in a birth chart can indicate a more internalized or unconventional approach to love. You may be more reflective about relationships and take longer to express your feelings openly.",
          },
        ]}
      />

      <RelatedTools
        tools={[
          {
            title: "Love Compatibility",
            description: "Check your zodiac compatibility with a partner.",
            href: "/love-compatibility",
          },
          {
            title: "Moon Sign Compatibility",
            description: "Explore emotional compatibility through Moon placements.",
            href: "/moon-sign-compatibility",
          },
          {
            title: "Soulmate Calculator",
            description: "Discover your astrological soulmate profile.",
            href: "/soulmate-calculator",
          },
        ]}
      />
    </CalculatorShell>
  );
}
