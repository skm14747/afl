"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { ZodiacSelector } from "@/components/calculators/ZodiacSelector";
import { ResultsSection, InsightBlock, ScoreSummary, RelatedTools, FAQSection, ShareResult } from "@/components/calculators/ResultsSection";
import { CompatibilityScore } from "@/components/astrology/CompatibilityScore";
import { Button } from "@/components/ui/Button";
import type { ZodiacSign } from "@/lib/astrology-data";
import { getSignCompatibilityScore, type CompatibilityResult } from "@/lib/astro-engine";
import { Heart, MessageCircle, Flame, Shield, Star, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function LoveCompatibilityPage() {
  const t = useTranslations("loveCompat");
  const [sign1, setSign1] = useState<ZodiacSign | undefined>();
  const [sign2, setSign2] = useState<ZodiacSign | undefined>();
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const handleCalculate = () => {
    if (!sign1 || !sign2) return;
    const r = getSignCompatibilityScore(sign1, sign2);
    setResult(r);
  };

  const handleReset = () => {
    setSign1(undefined);
    setSign2(undefined);
    setResult(null);
  };

  return (
    <CalculatorShell
      title={t("title")}
      subtitle={t("subtitle")}
      description={t("description")}
      icon={<Heart className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      {/* Introduction */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          {t("intro")}
        </p>
      </div>

      {/* Calculator Form */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ZodiacSelector
              label={t("yourSign")}
              value={sign1}
              onChange={setSign1}
            />
            <ZodiacSelector
              label={t("partnerSign")}
              value={sign2}
              onChange={setSign2}
            />
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCalculate}
              disabled={!sign1 || !sign2}
              icon={<Heart className="w-4 h-4" />}
            >
              {t("calculate")}
            </Button>
            {result && (
              <Button variant="outline" size="lg" onClick={handleReset}>
                {t("startOver")}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && sign1 && sign2 && (
        <>
          <ResultsSection title={t("resultsTitle")}>
            <CompatibilityScore
              sign1={sign1}
              sign2={sign2}
              overallScore={result.overall}
              summary={result.summary}
              categories={[
                { label: t("emotional"), score: result.emotional },
                { label: t("communication"), score: result.communication },
                { label: t("romance"), score: result.romance },
                { label: t("values"), score: result.values },
                { label: t("longTerm"), score: result.longTerm },
              ]}
            />

            <ShareResult
              title={t("shareTitle", { sign1, sign2 })}
              text={t("shareText", { sign1, sign2, score: result.overall })}
            />
          </ResultsSection>

          {/* Detailed Scores */}
          <div className="mt-10">
            <ScoreSummary
              scores={[
                { label: t("overall"), value: result.overall },
                { label: t("emotional"), value: result.emotional },
                { label: t("communication"), value: result.communication },
                { label: t("romance"), value: result.romance },
                { label: t("values"), value: result.values },
                { label: t("longTerm"), value: result.longTerm },
              ]}
            />
          </div>

          {/* Strengths */}
          <div className="mt-10">
            <h3
              className="text-center mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              {t("strengthsTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {result.strengths.map((s, i) => (
                <InsightBlock
                  key={i}
                  title={t("strengthLabel", { n: i + 1 })}
                  content={s}
                  icon={<Star className="w-4 h-4" />}
                  variant="gold"
                />
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="mt-10">
            <h3
              className="text-center mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              {t("challengesTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {result.challenges.map((c, i) => (
                <InsightBlock
                  key={i}
                  title={t("challengeLabel", { n: i + 1 })}
                  content={c}
                  icon={<AlertTriangle className="w-4 h-4" />}
                  variant="rose"
                />
              ))}
            </div>
          </div>

          {/* How it works */}
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

      {/* Sign Pair Pages */}
      <div className="mt-12 mb-8">
        <h2
          className="text-center mb-6"
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
        >
          {t("pairsTitle")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-2xl mx-auto">
          {[
            "aries-and-taurus", "aries-and-gemini", "aries-and-cancer", "aries-and-leo",
            "aries-and-virgo", "aries-and-libra", "aries-and-scorpio", "aries-and-sagittarius",
            "taurus-and-cancer", "taurus-and-virgo", "taurus-and-scorpio", "taurus-and-capricorn",
            "gemini-and-leo", "gemini-and-libra", "gemini-and-sagittarius", "gemini-and-aquarius",
            "cancer-and-scorpio", "cancer-and-pisces", "leo-and-sagittarius", "leo-and-aquarius",
            "virgo-and-capricorn", "libra-and-aquarius", "scorpio-and-pisces", "sagittarius-and-aquarius",
          ].map((pair) => {
            const [a, b] = pair.split("-and-");
            return (
              <Link
                key={pair}
                href={`/compatibility/${pair}` as never}
                className="text-xs text-center py-2 px-3 rounded-lg border border-[var(--color-border-subtle)] hover:border-[var(--cosmic-rose)]/40 hover:text-[var(--crimson-love)] transition-colors"
              >
                {a.charAt(0).toUpperCase() + a.slice(1)} & {b.charAt(0).toUpperCase() + b.slice(1)}
              </Link>
            );
          })}
        </div>
        <p className="text-center mt-4 text-xs text-[var(--color-muted-fg)]">
          {t("pairsNote")}
        </p>
      </div>

      {/* FAQ */}
      <FAQSection
        items={[
          { question: t("faq1q"), answer: t("faq1a") },
          { question: t("faq2q"), answer: t("faq2a") },
          { question: t("faq3q"), answer: t("faq3a") },
          { question: t("faq4q"), answer: t("faq4a") },
        ]}
      />

      {/* Related Tools */}
      <RelatedTools
        tools={[
          {
            title: t("relatedVenus"),
            description: t("relatedVenusDesc"),
            href: "/venus-sign-calculator",
          },
          {
            title: t("relatedMoon"),
            description: t("relatedMoonDesc"),
            href: "/moon-sign-compatibility",
          },
          {
            title: t("relatedMarriage"),
            description: t("relatedMarriageDesc"),
            href: "/marriage-compatibility",
          },
        ]}
      />
    </CalculatorShell>
  );
}
