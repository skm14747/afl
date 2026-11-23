"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import { ResultsSection, InsightBlock, RelatedTools, FAQSection, ShareResult } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ZodiacIcon } from "@/components/astrology/ZodiacIcon";
import { PlanetBadge } from "@/components/astrology/PlanetBadge";
import {
  calculateNatalChart,
  VENUS_SIGN_INTERPRETATIONS,
  MOON_SIGN_INTERPRETATIONS,
  type BirthDetails,
  type NatalChart,
} from "@/lib/astro-engine";
import { ZODIAC_ELEMENTS, ZODIAC_SIGNS, type ZodiacSign } from "@/lib/astrology-data";
import { Heart, Sparkles, Moon, Eye, Star, Users } from "lucide-react";

function getPartnerTraits(chart: NatalChart): {
  attractedTo: string[];
  emotionalNeeds: string[];
  partnerQualities: string[];
  compatibleSigns: ZodiacSign[];
} {
  const venusSign = chart.venus.sign;
  const moonSign = chart.moon.sign;
  const marsSign = chart.mars.sign;

  const venusElement = ZODIAC_ELEMENTS[venusSign];
  const moonElement = ZODIAC_ELEMENTS[moonSign];

  // Compatible signs: same element + complementary element for Venus and Moon
  const compatibleElements = new Set<string>();
  compatibleElements.add(venusElement);
  compatibleElements.add(moonElement);
  if (venusElement === "Fire") compatibleElements.add("Air");
  if (venusElement === "Air") compatibleElements.add("Fire");
  if (venusElement === "Earth") compatibleElements.add("Water");
  if (venusElement === "Water") compatibleElements.add("Earth");

  const compatibleSigns = ZODIAC_SIGNS.filter((s) =>
    compatibleElements.has(ZODIAC_ELEMENTS[s])
  ).slice(0, 5) as ZodiacSign[];

  const attractedTo = [
    `Venus in ${venusSign}: You are drawn to ${VENUS_SIGN_INTERPRETATIONS[venusSign].attracted.toLowerCase()}.`,
    `Mars in ${marsSign}: Physical attraction is sparked by ${marsSign} qualities — ${ZODIAC_ELEMENTS[marsSign].toLowerCase()} energy appeals to your desire nature.`,
  ];

  const emotionalNeeds = [
    `Moon in ${moonSign}: ${MOON_SIGN_INTERPRETATIONS[moonSign].needs}`,
    `You nurture through ${MOON_SIGN_INTERPRETATIONS[moonSign].nurturingStyle.toLowerCase()}.`,
  ];

  const partnerQualities = [
    `Someone who resonates with ${venusElement} and ${moonElement} energy.`,
    `A partner who understands your ${moonSign} Moon's need for ${MOON_SIGN_INTERPRETATIONS[moonSign].needs.toLowerCase()}.`,
    `Someone who matches your Venus in ${venusSign} love language: ${VENUS_SIGN_INTERPRETATIONS[venusSign].expression.toLowerCase()}.`,
  ];

  return { attractedTo, emotionalNeeds, partnerQualities, compatibleSigns };
}

export default function SoulmateCalculatorPage() {
  const [birthDetails, setBirthDetails] = useState<Partial<BirthDetails>>({});
  const [chart, setChart] = useState<NatalChart | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    if (!birthDetails.date) errs.date = "Date of birth is required.";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const c = calculateNatalChart(birthDetails as BirthDetails);
    setChart(c);
  };

  const traits = chart ? getPartnerTraits(chart) : null;

  return (
    <CalculatorShell
      title="Soulmate Calculator"
      subtitle="Romantic Destiny"
      description="Explore your astrological profile to understand your romantic tendencies, what you're drawn to in a partner, and the cosmic patterns that shape your love life."
      icon={<Sparkles className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      {/* Important disclaimer */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          This tool explores your astrological placements related to love and partnership.
          It offers traditional astrological interpretations and reflective insights about your
          romantic nature — not a prediction of a specific soulmate or guaranteed romantic outcome.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto">
        <Card variant="default" padding="lg">
          <BirthDetailsForm
            label="Your Birth Details"
            value={birthDetails}
            onChange={setBirthDetails}
            showTime
            errors={errors}
          />
          <div className="mt-6 flex justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCalculate}
              icon={<Sparkles className="w-4 h-4" />}
            >
              Discover Your Profile
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {chart && traits && (
        <>
          <ResultsSection title="Your Romantic Astrology Profile">
            {/* Key placements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
              <Card variant="feature" padding="md" className="text-center">
                <div className="flex justify-center mb-2">
                  <ZodiacIcon sign={chart.venus.sign} size="md" showElement />
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-1">Venus</div>
                <div className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {chart.venus.sign}
                </div>
                <div className="text-xs text-[var(--color-muted-fg)] mt-1">Love & Attraction</div>
                {chart.venus.retrograde && <Badge variant="rose" className="mt-2">Retrograde</Badge>}
              </Card>

              <Card variant="feature" padding="md" className="text-center">
                <div className="flex justify-center mb-2">
                  <ZodiacIcon sign={chart.moon.sign} size="md" showElement />
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--romantic-rose)] mb-1">Moon</div>
                <div className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {chart.moon.sign}
                </div>
                <div className="text-xs text-[var(--color-muted-fg)] mt-1">Emotional Needs</div>
                {chart.moonUncertain && <Badge variant="default" className="mt-2">Time-sensitive</Badge>}
              </Card>

              <Card variant="feature" padding="md" className="text-center">
                <div className="flex justify-center mb-2">
                  <ZodiacIcon sign={chart.mars.sign} size="md" showElement />
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-error)] mb-1">Mars</div>
                <div className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {chart.mars.sign}
                </div>
                <div className="text-xs text-[var(--color-muted-fg)] mt-1">Passion & Drive</div>
              </Card>
            </div>

            {/* What you're attracted to */}
            <div className="max-w-3xl mx-auto mb-8">
              <h3
                className="text-center mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
              >
                What Draws You to a Partner
              </h3>
              <div className="space-y-4">
                {traits.attractedTo.map((t, i) => (
                  <InsightBlock
                    key={i}
                    title={i === 0 ? "Romantic Attraction" : "Physical Chemistry"}
                    content={t}
                    icon={i === 0 ? <Heart className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    variant="gold"
                  />
                ))}
              </div>
            </div>

            {/* Emotional needs */}
            <div className="max-w-3xl mx-auto mb-8">
              <h3
                className="text-center mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
              >
                Your Emotional Needs in Love
              </h3>
              <div className="space-y-4">
                {traits.emotionalNeeds.map((t, i) => (
                  <InsightBlock
                    key={i}
                    title={i === 0 ? "Core Emotional Need" : "Nurturing Style"}
                    content={t}
                    icon={<Moon className="w-4 h-4" />}
                    variant="rose"
                  />
                ))}
              </div>
            </div>

            {/* Partner qualities */}
            <div className="max-w-3xl mx-auto mb-8">
              <h3
                className="text-center mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
              >
                Qualities in a Compatible Partner
              </h3>
              <Card variant="elevated" padding="lg">
                <ul className="space-y-3">
                  {traits.partnerQualities.map((q, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-muted-fg)]">
                      <Star className="w-4 h-4 text-[var(--champagne-gold)] flex-shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Compatible signs */}
            <div className="max-w-3xl mx-auto">
              <h3
                className="text-center mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
              >
                Signs with Natural Affinity
              </h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {traits.compatibleSigns.map((sign) => (
                  <div key={sign} className="flex flex-col items-center gap-1">
                    <ZodiacIcon sign={sign} size="md" showElement />
                    <span className="text-xs">{sign}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--color-muted-fg)] text-center mt-4">
                These signs share elemental affinity with your Venus and Moon placements.
                This does not mean other signs are incompatible — full chart comparison reveals much more.
              </p>
            </div>

            <ShareResult
              title="My Soulmate Profile"
              text={`Venus in ${chart.venus.sign}, Moon in ${chart.moon.sign}, Mars in ${chart.mars.sign}`}
            />
          </ResultsSection>

          {/* Planetary details */}
          <div className="mt-10 max-w-3xl mx-auto">
            <h3
              className="text-center mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              Your Love Planets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <PlanetBadge name="Sun" symbol="☉" meaning={chart.sun.sign} influence={`Core identity: Your fundamental self in relationships.`} />
              <PlanetBadge name="Moon" symbol="☽" meaning={chart.moon.sign} influence={`Emotional needs and nurturing style.`} />
              <PlanetBadge name="Venus" symbol="♀" meaning={chart.venus.sign} influence={`How you love and what attracts you.`} />
              <PlanetBadge name="Mars" symbol="♂" meaning={chart.mars.sign} influence={`Passion, desire, and pursuit style.`} />
              <PlanetBadge name="Jupiter" symbol="♃" meaning={chart.jupiter.sign} influence={`Growth, generosity, and shared beliefs.`} />
              <PlanetBadge name="Saturn" symbol="♄" meaning={chart.saturn.sign} influence={`Commitment, responsibility, and longevity.`} />
            </div>
          </div>
        </>
      )}

      <FAQSection
        items={[
          {
            question: "Can astrology really find my soulmate?",
            answer: "Astrology cannot identify a specific person as your soulmate. What it can do is illuminate your romantic patterns, emotional needs, and what you're naturally drawn to — helping you understand yourself and your relationships more deeply.",
          },
          {
            question: "What planets are most important for love?",
            answer: "Venus (love style and attraction), Moon (emotional needs), Mars (passion and desire), and the 7th house ruler (partnerships) are the most significant placements for understanding your romantic nature.",
          },
          {
            question: "Why do I need my birth time?",
            answer: "Birth time makes Moon sign calculations more precise and allows for Ascendant and house calculations. Without birth time, Venus and Mars are still accurate, but Moon may have some uncertainty.",
          },
        ]}
      />

      <RelatedTools
        tools={[
          {
            title: "Venus Sign Calculator",
            description: "Deep dive into your Venus sign.",
            href: "/venus-sign-calculator",
          },
          {
            title: "Love Compatibility",
            description: "Compare two signs for compatibility.",
            href: "/love-compatibility",
          },
          {
            title: "Marriage Compatibility",
            description: "Explore long-term partnership potential.",
            href: "/marriage-compatibility",
          },
        ]}
      />
    </CalculatorShell>
  );
}
