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
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ZodiacIcon } from "@/components/astrology/ZodiacIcon";
import {
  calculateLoveLanguage,
  type BirthDetails,
  type LoveLanguageResult,
} from "@/lib/astro-engine";
import {
  Heart,
  Hand,
  Gift,
  Wrench,
  Clock,
  MessageCircleHeart,
  Sparkles,
  Flame,
} from "lucide-react";

const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  "words-of-affirmation": <MessageCircleHeart className="w-5 h-5" />,
  "physical-touch": <Hand className="w-5 h-5" />,
  gifts: <Gift className="w-5 h-5" />,
  "acts-of-service": <Wrench className="w-5 h-5" />,
  "quality-time": <Clock className="w-5 h-5" />,
};

const DIMENSION_COLORS: Record<string, string> = {
  "words-of-affirmation": "var(--champagne-gold)",
  "physical-touch": "var(--romantic-rose)",
  gifts: "var(--champagne-gold)",
  "acts-of-service": "var(--lavender-mist)",
  "quality-time": "var(--romantic-rose)",
};

export function LoveLanguageCalculatorWidget({ educationalContent }: { educationalContent?: React.ReactNode }) {
  const [birthDetails, setBirthDetails] = useState<Partial<BirthDetails>>({});
  const [result, setResult] = useState<LoveLanguageResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    if (!birthDetails.date) errs.date = "Date of birth is required.";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const r = calculateLoveLanguage(birthDetails as BirthDetails);
    setResult(r);
  };

  const handleReset = () => {
    setBirthDetails({});
    setResult(null);
  };

  return (
    <CalculatorShell
      title="Astrology Love Language Calculator"
      subtitle="Venus · Moon · Mars"
      description="Your Venus sign reveals how you give love. Your Moon sign reveals how you need to receive it. Your Mars sign reveals how you pursue it. Together, they map your astrological love language."
      icon={<MessageCircleHeart className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      {/* Introduction */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          The concept of love languages describes five primary ways people express and experience
          love. This calculator maps your Venus, Moon, and Mars placements to those five
          dimensions — revealing not just your love language, but the astrological forces that
          shape it. Unlike generic quizzes, this is rooted in your actual birth chart.
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
          <div className="mt-6 flex justify-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCalculate}
              icon={<Sparkles className="w-4 h-4" />}
            >
              Discover My Love Language
            </Button>
            {result && (
              <Button variant="outline" size="lg" onClick={handleReset}>
                Start Over
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Results */}
      {result && (
        <>
          <ResultsSection title="Your Astrological Love Language">
            {/* Planet Summary Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] border border-[var(--gold-200)] bg-[var(--gold-50)]">
                <ZodiacIcon sign={result.venusSign} size="sm" />
                <span className="text-sm font-medium">Venus in {result.venusSign}</span>
                <Badge variant="gold">Giving</Badge>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] border border-[var(--color-border-subtle)] bg-[var(--color-muted)]">
                <ZodiacIcon sign={result.moonSign} size="sm" />
                <span className="text-sm font-medium">Moon in {result.moonSign}</span>
                <Badge variant="cosmic">Receiving</Badge>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] border border-[var(--rose-200)] bg-[var(--rose-50)]">
                <ZodiacIcon sign={result.marsSign} size="sm" />
                <span className="text-sm font-medium">Mars in {result.marsSign}</span>
                <Badge variant="rose">Desire</Badge>
              </div>
            </div>

            {!result.birthTimeKnown && (
              <div className="max-w-2xl mx-auto mb-6">
                <p className="text-xs text-[var(--color-warning)] bg-[var(--color-warning-bg)] px-3 py-2 rounded-[var(--radius-md)] text-center">
                  Calculated without birth time. Venus and Mars results are reliable.
                  {result.moonUncertain
                    ? " Moon may have been in an adjacent sign — provide birth time for certainty."
                    : " Moon sign is likely accurate for this date."}
                </p>
              </div>
            )}

            {/* Love Language Spectrum */}
            <div className="max-w-2xl mx-auto mb-10">
              <h3
                className="text-center mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
              >
                Your Love Language Spectrum
              </h3>
              <div className="space-y-4">
                {result.dimensions.map((dim, i) => (
                  <div
                    key={dim.dimension}
                    className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-lg)] p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="flex-shrink-0"
                        style={{ color: DIMENSION_COLORS[dim.dimension] }}
                      >
                        {DIMENSION_ICONS[dim.dimension]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{dim.label}</span>
                          <span
                            className="text-sm font-bold"
                            style={{
                              fontFamily: "var(--font-display)",
                              color: DIMENSION_COLORS[dim.dimension],
                            }}
                          >
                            {dim.score}%
                          </span>
                        </div>
                        <div className="h-2 bg-[var(--color-muted)] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${dim.score}%`,
                              background: DIMENSION_COLORS[dim.dimension],
                              animationDelay: `${i * 100}ms`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {i === 0 && (
                      <p className="text-xs text-[var(--champagne-gold)] mt-1 ml-8">
                        ✦ Primary Love Language
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Giving vs Receiving */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
              <InsightBlock
                title="How You Give Love"
                content={`Your Venus in ${result.venusSign} makes your primary giving language ${result.dimensions.find((d) => d.dimension === result.primaryGiving)?.label ?? ""}. ${result.elementStyle}`}
                icon={<Heart className="w-4 h-4" />}
                variant="gold"
              />
              <InsightBlock
                title="How You Need to Receive Love"
                content={`Your Moon in ${result.moonSign} means you feel most loved through ${result.dimensions.find((d) => d.dimension === result.primaryReceiving)?.label ?? ""}. When a partner speaks this language, your emotional needs are deeply met.`}
                icon={<Sparkles className="w-4 h-4" />}
                variant="rose"
              />
            </div>

            {/* Desire Expression */}
            <div className="max-w-3xl mx-auto mb-8">
              <InsightBlock
                title={`How You Express Desire — Mars in ${result.marsSign}`}
                content={result.desireExpression}
                icon={<Flame className="w-4 h-4" />}
              />
            </div>

            <ShareResult
              title="My Astrological Love Language"
              text={`My primary love language is ${result.dimensions[0]?.label}! Venus in ${result.venusSign}, Moon in ${result.moonSign}, Mars in ${result.marsSign}.`}
            />
          </ResultsSection>

          {/* How it works */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3
              className="text-center mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              How This Calculator Works
            </h3>
            <div className="text-sm text-[var(--color-muted-fg)] leading-relaxed space-y-3">
              <p>
                This calculator uses precise astronomical calculations to determine the positions of
                Venus, Moon, and Mars at your time of birth. Each planet is then mapped to a love
                language profile based on its zodiac sign placement.
              </p>
              <p>
                <strong>Venus (40% weight)</strong> governs how you express affection — your giving style.
                <strong> Moon (40% weight)</strong> governs your emotional needs — how you need to receive love.
                <strong> Mars (20% weight)</strong> governs desire and pursuit — how you actively seek connection.
              </p>
              <p>
                The scoring model maps each sign to five love language dimensions using element
                (Fire, Earth, Air, Water) and sign-specific weights. These weights are based on
                traditional astrological associations, not random assignments. The final score
                is a product-specific model — not a scientifically validated measure.
              </p>
            </div>
          </div>

          {/* Methodology transparency */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-[var(--color-muted)] rounded-[var(--radius-lg)] p-5 text-xs text-[var(--color-muted-fg)] space-y-2">
              <p className="font-semibold text-sm text-[var(--color-fg)]">Calculation Transparency</p>
              <ul className="list-disc ml-4 space-y-1">
                <li><strong>Astronomical:</strong> Planet positions via astronomy-engine ephemeris (real calculations, not tables).</li>
                <li><strong>Traditional astrology:</strong> Sign-to-love-language mapping based on element and sign associations.</li>
                <li><strong>Scoring model:</strong> Weighted blend (Venus 40%, Moon 40%, Mars 20%) — product-specific, not scientifically proven.</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* FAQ */}
      <FAQSection
        items={[
          {
            question: "How is this different from a regular love language quiz?",
            answer: "Traditional love language quizzes ask you to self-report preferences. This calculator derives your love language profile from your birth chart — specifically your Venus, Moon, and Mars placements — offering an astrological perspective you can't get from a questionnaire.",
          },
          {
            question: "Can my astrological love language differ from my quiz results?",
            answer: "Yes, and that's valuable information. Your birth chart reflects innate tendencies, while quiz results reflect your current conscious preferences. Differences can highlight areas where you've grown or adapted.",
          },
          {
            question: "Why do you use Venus, Moon, AND Mars?",
            answer: "Venus alone only tells half the story — it shows how you give love. Moon reveals how you need to receive it, which is often different. Mars adds the dimension of active desire and pursuit. Together, they create a complete love language profile.",
          },
          {
            question: "Do I need my exact birth time?",
            answer: "Birth time improves Moon accuracy (the Moon changes signs every ~2.5 days). Venus and Mars move slowly enough that date alone is usually sufficient. If your Moon is near a sign boundary, birth time becomes important.",
          },
          {
            question: "Is this scientifically proven?",
            answer: "No. This tool combines real astronomical calculations with traditional astrological interpretation and a product-specific scoring model. It's designed for self-reflection and entertainment, not scientific diagnosis.",
          },
        ]}
      />

      {/* Related Tools */}
      <RelatedTools
        tools={[
          {
            title: "Venus Sign Calculator",
            description: "Deep-dive into your Venus sign and romantic personality.",
            href: "/venus-sign-calculator",
          },
          {
            title: "Moon Sign Compatibility",
            description: "Compare emotional needs with a partner through Moon signs.",
            href: "/moon-sign-compatibility",
          },
          {
            title: "Relationship Pattern Analyzer",
            description: "Discover recurring themes in your love life through your chart.",
            href: "/relationship-pattern-analyzer",
          },
        ]}
      />
          {educationalContent}
    </CalculatorShell>
  );
}
