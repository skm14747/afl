"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import { ResultsSection, InsightBlock, RelatedTools, FAQSection, ShareResult } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ZodiacIcon } from "@/components/astrology/ZodiacIcon";
import { ChartWheel } from "@/components/astrology/ChartWheel";
import { PlanetBadge } from "@/components/astrology/PlanetBadge";
import {
  calculateNatalChart,
  VENUS_SIGN_INTERPRETATIONS,
  MOON_SIGN_INTERPRETATIONS,
  type BirthDetails,
  type NatalChart,
} from "@/lib/astro-engine";
import { ZODIAC_ELEMENTS, ZODIAC_SIGNS, type ZodiacSign } from "@/lib/astrology-data";
import { Link } from "@/i18n/navigation";
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
  const t = useTranslations("soulmate");
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
      title={t("title")}
      subtitle={t("subtitle")}
      description={t("description")}
      icon={<Sparkles className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          {t("intro")}{" "}
          <Link href="/synastry-chart" className="underline">{t("introSynastryLink")}</Link>
          {" "}{t("introOr")}{" "}
          <Link href="/moon-phase-soulmate" className="underline">{t("introMoonLink")}</Link>.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto">
        <Card variant="default" padding="lg">
          <BirthDetailsForm
            label={t("formLabel")}
            value={birthDetails}
            onChange={setBirthDetails}
            showTime
            showLocation
            errors={errors}
          />
          <div className="mt-6 flex justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCalculate}
              icon={<Sparkles className="w-4 h-4" />}
            >
              {t("calculate")}
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {chart && traits && (
        <>
          <ResultsSection title={t("resultsTitle")}>
            <div className="max-w-md mx-auto mb-10">
              <ChartWheel chart={chart} caption={t("chartCaption")} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
              <Card variant="feature" padding="md" className="text-center">
                <div className="flex justify-center mb-2">
                  <ZodiacIcon sign={chart.venus.sign} size="md" showElement />
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-1">{t("venusLabel")}</div>
                <div className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {chart.venus.sign}
                </div>
                <div className="text-xs text-[var(--color-muted-fg)] mt-1">{t("loveAttraction")}</div>
                {chart.venus.retrograde && <Badge variant="rose" className="mt-2">{t("retrograde", { ns: "venus" })}</Badge>}
              </Card>

              <Card variant="feature" padding="md" className="text-center">
                <div className="flex justify-center mb-2">
                  <ZodiacIcon sign={chart.moon.sign} size="md" showElement />
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--romantic-rose)] mb-1">{t("moonLabel")}</div>
                <div className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {chart.moon.sign}
                </div>
                <div className="text-xs text-[var(--color-muted-fg)] mt-1">{t("emotionalNeeds")}</div>
                {chart.moonUncertain && <Badge variant="default" className="mt-2">{t("timeSensitive")}</Badge>}
              </Card>

              <Card variant="feature" padding="md" className="text-center">
                <div className="flex justify-center mb-2">
                  <ZodiacIcon sign={chart.mars.sign} size="md" showElement />
                </div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-error)] mb-1">{t("marsLabel")}</div>
                <div className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {chart.mars.sign}
                </div>
                <div className="text-xs text-[var(--color-muted-fg)] mt-1">{t("passionDrive")}</div>
              </Card>
            </div>

            {/* What you're attracted to */}
            <div className="max-w-3xl mx-auto mb-8">
              <h3
                className="text-center mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
              >
                {t("drawsTitle")}
              </h3>
              <div className="space-y-4">
                {traits.attractedTo.map((item, i) => (
                  <InsightBlock
                    key={i}
                    title={i === 0 ? t("romanticAttraction") : t("physicalChemistry")}
                    content={item}
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
                {t("emotionalNeedsTitle")}
              </h3>
              <div className="space-y-4">
                {traits.emotionalNeeds.map((item, i) => (
                  <InsightBlock
                    key={i}
                    title={i === 0 ? t("coreNeed") : t("nurturingStyle")}
                    content={item}
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
                {t("partnerTitle")}
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
                {t("affinityTitle")}
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
                {t("affinityNote")}
              </p>
            </div>

            <ShareResult
              title={t("shareTitle")}
              text={t("shareText", { venus: chart.venus.sign, moon: chart.moon.sign, mars: chart.mars.sign })}
            />
          </ResultsSection>

          {/* Planetary details */}
          <div className="mt-10 max-w-3xl mx-auto">
            <h3
              className="text-center mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              {t("planetsTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <PlanetBadge name="Sun" symbol="☉" meaning={chart.sun.sign} influence={t("sunInfluence")} />
              <PlanetBadge name="Moon" symbol="☽" meaning={chart.moon.sign} influence={t("moonInfluence")} />
              <PlanetBadge name="Venus" symbol="♀" meaning={chart.venus.sign} influence={t("venusInfluence")} />
              <PlanetBadge name="Mars" symbol="♂" meaning={chart.mars.sign} influence={t("marsInfluence")} />
              <PlanetBadge name="Jupiter" symbol="♃" meaning={chart.jupiter.sign} influence={t("jupiterInfluence")} />
              <PlanetBadge name="Saturn" symbol="♄" meaning={chart.saturn.sign} influence={t("saturnInfluence")} />
            </div>
          </div>
        </>
      )}

      <FAQSection
        items={[
          { question: t("faq1q"), answer: t("faq1a") },
          { question: t("faq2q"), answer: t("faq2a") },
          { question: t("faq3q"), answer: t("faq3a") },
        ]}
      />

      <RelatedTools
        tools={[
          { title: t("relatedMoonPhase"), description: t("relatedMoonPhaseDesc"), href: "/moon-phase-soulmate" },
          { title: t("relatedSynastry"), description: t("relatedSynastryDesc"), href: "/synastry-chart" },
          { title: t("relatedVenus"), description: t("relatedVenusDesc"), href: "/venus-sign-calculator" },
          { title: t("relatedMars"), description: t("relatedMarsDesc"), href: "/mars-sign-compatibility" },
          { title: t("relatedMarriage"), description: t("relatedMarriageDesc"), href: "/marriage-compatibility" },
        ]}
      />
    </CalculatorShell>
  );
}
