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
import { ZODIAC_ELEMENTS } from "@/lib/astrology-data";
import { calculateNatalChart, VENUS_SIGN_INTERPRETATIONS, type BirthDetails, type PlanetPosition } from "@/lib/astro-engine";
import { Heart, Sparkles, Eye, MessageCircle, Shield } from "lucide-react";

export default function VenusSignCalculatorPage() {
  const t = useTranslations("venus");
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
      title={t("title")}
      subtitle={t("subtitle")}
      description={t("description")}
      icon={<span className="text-3xl">♀</span>}
    >
      {/* Intro */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          {t("intro")}
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
              {t("calculate")}
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {venus && interp && (
        <>
          <ResultsSection title={t("resultsTitle")}>
            <div className="max-w-2xl mx-auto text-center mb-8">
              <div className="flex justify-center mb-4">
                <ZodiacIcon sign={venus.sign} size="lg" showElement />
              </div>
              <h3
                className="mb-2"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", fontWeight: 600 }}
              >
                {t("venusIn", { sign: venus.sign })}
              </h3>
              <div className="flex justify-center gap-2 mb-4">
                <Badge variant="gold">{venus.degree.toFixed(1)}° {venus.sign}</Badge>
                <Badge variant="cosmic">{t("element", { element: ZODIAC_ELEMENTS[venus.sign] })}</Badge>
                {venus.retrograde && <Badge variant="rose">{t("retrograde")}</Badge>}
              </div>

              {!birthTimeKnown && (
                <p className="text-xs text-[var(--color-warning)] bg-[var(--color-warning-bg)] px-3 py-2 rounded-[var(--radius-md)] inline-block">
                  {t("noTimeWarning")}
                </p>
              )}
            </div>

            {/* Interpretation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <InsightBlock
                title={t("loveStyle")}
                content={interp.loveStyle}
                icon={<Heart className="w-4 h-4" />}
                variant="rose"
              />
              <InsightBlock
                title={t("attracted")}
                content={interp.attracted}
                icon={<Eye className="w-4 h-4" />}
                variant="gold"
              />
              <InsightBlock
                title={t("inRelationships")}
                content={interp.relationship}
                icon={<MessageCircle className="w-4 h-4" />}
              />
              <InsightBlock
                title={t("expression")}
                content={interp.expression}
                icon={<Sparkles className="w-4 h-4" />}
                variant="gold"
              />
              <InsightBlock
                title={t("needs")}
                content={interp.needs}
                icon={<Shield className="w-4 h-4" />}
                variant="rose"
              />
            </div>

            <ShareResult
              title={t("shareTitle")}
              text={t("shareText", { sign: venus.sign, loveStyle: interp.loveStyle })}
            />
          </ResultsSection>

          {/* How Venus sign works */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3
              className="text-center mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              {t("howTitle")}
            </h3>
            <div className="text-sm text-[var(--color-muted-fg)] leading-relaxed space-y-3">
              <p>{t("howP1")}</p>
              <p>{t("howP2")}</p>
            </div>
          </div>
        </>
      )}

      {/* FAQ */}
      <FAQSection
        items={[
          { question: t("faq1q"), answer: t("faq1a") },
          { question: t("faq2q"), answer: t("faq2a") },
          { question: t("faq3q"), answer: t("faq3a") },
          { question: t("faq4q"), answer: t("faq4a") },
        ]}
      />

      <RelatedTools
        tools={[
          { title: t("relatedMars"), description: t("relatedMarsDesc"), href: "/mars-sign-compatibility" },
          { title: t("relatedLove"), description: t("relatedLoveDesc"), href: "/love-compatibility" },
          { title: t("relatedMoon"), description: t("relatedMoonDesc"), href: "/moon-sign-compatibility" },
          { title: t("relatedSynastry"), description: t("relatedSynastryDesc"), href: "/synastry-chart" },
        ]}
      />
    </CalculatorShell>
  );
}
