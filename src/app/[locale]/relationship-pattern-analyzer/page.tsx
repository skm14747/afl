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
import { PlanetBadge } from "@/components/astrology/PlanetBadge";
import {
  analyzeRelationshipPatterns,
  type BirthDetails,
  type RelationshipPatternResult,
} from "@/lib/astro-engine";
import {
  Orbit,
  Heart,
  Shield,
  TrendingUp,
  Eye,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

const ATTACHMENT_ICONS: Record<string, React.ReactNode> = {
  secure: <Shield className="w-5 h-5 text-[var(--champagne-gold)]" />,
  anxious: <Heart className="w-5 h-5 text-[var(--romantic-rose)]" />,
  avoidant: <Eye className="w-5 h-5 text-[var(--lavender-mist)]" />,
  "fearful-avoidant": <AlertTriangle className="w-5 h-5 text-[var(--romantic-rose)]" />,
};

const ATTACHMENT_LABELS: Record<string, string> = {
  secure: "Secure",
  anxious: "Anxious",
  avoidant: "Avoidant",
  "fearful-avoidant": "Fearful-Avoidant",
};

export default function RelationshipPatternAnalyzerPage() {
  const [birthDetails, setBirthDetails] = useState<Partial<BirthDetails>>({});
  const [result, setResult] = useState<RelationshipPatternResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    const errs: Record<string, string> = {};
    if (!birthDetails.date) errs.date = "Date of birth is required.";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const r = analyzeRelationshipPatterns(birthDetails as BirthDetails);
    setResult(r);
  };

  const handleReset = () => {
    setBirthDetails({});
    setResult(null);
  };

  return (
    <CalculatorShell
      title="Relationship Pattern Analyzer"
      subtitle="Patterns · Attachment · Growth"
      description="Why do you keep attracting the same type? Your Venus, Mars, Moon, and Saturn reveal recurring themes in your love life — the patterns you repeat and the growth they're guiding you toward."
      icon={<Orbit className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      {/* Introduction */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          Every person has relationship patterns — the types of partners they attract, the
          dynamics that keep recurring, and the lessons that keep appearing. This tool analyses
          your natal Venus, Mars, Moon, and Saturn to map those patterns, identify your
          attachment tendency, and suggest where your growth edge lies. This is not a diagnosis
          — it&apos;s a mirror for self-reflection.
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
              icon={<Orbit className="w-4 h-4" />}
            >
              Analyze My Patterns
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
          <ResultsSection title="Your Relationship Patterns">
            {/* Key Placements */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {result.keyPlacements.map((p) => (
                <div
                  key={p.planet}
                  className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)]"
                >
                  <ZodiacIcon sign={p.sign} size="sm" />
                  <span className="text-sm font-medium">
                    {p.planet} in {p.sign}
                  </span>
                </div>
              ))}
            </div>

            {!result.birthTimeKnown && (
              <div className="max-w-2xl mx-auto mb-6">
                <p className="text-xs text-[var(--color-warning)] bg-[var(--color-warning-bg)] px-3 py-2 rounded-[var(--radius-md)] text-center">
                  Calculated without birth time. Venus, Mars, and Saturn are reliable.
                  {result.moonUncertain
                    ? " Moon may have been in an adjacent sign — provide birth time for certainty."
                    : " Moon sign is likely accurate for this date."}
                </p>
              </div>
            )}

            {/* Attachment Style */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  {ATTACHMENT_ICONS[result.attachmentStyle]}
                  <div>
                    <h3
                      className="font-semibold"
                      style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}
                    >
                      Attachment Tendency: {ATTACHMENT_LABELS[result.attachmentStyle]}
                    </h3>
                    <p className="text-xs text-[var(--color-muted-fg)] mt-0.5">
                      Based on Moon, Venus, and Saturn element analysis
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed">
                  {result.attachmentDescription}
                </p>
              </div>
            </div>

            {/* Attraction Pattern */}
            <div className="max-w-3xl mx-auto mb-10">
              <h3
                className="text-center mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
              >
                Your Attraction Pattern
              </h3>
              <InsightBlock
                title={`Venus in ${result.venusSign} — ${result.attractionPlanetaryBasis}`}
                content={result.attractionPattern}
                icon={<Heart className="w-4 h-4" />}
                variant="rose"
              />
            </div>

            {/* Recurring Themes */}
            <div className="max-w-3xl mx-auto mb-10">
              <h3
                className="text-center mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
              >
                Recurring Themes in Your Love Life
              </h3>
              <div className="space-y-4">
                {result.themes.map((theme, i) => (
                  <div
                    key={i}
                    className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] p-6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-muted)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="text-sm font-bold"
                          style={{ color: "var(--champagne-gold)" }}
                        >
                          {i + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4
                          className="font-semibold mb-2"
                          style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)" }}
                        >
                          {theme.title}
                        </h4>
                        <p className="text-sm text-[var(--color-muted-fg)] leading-relaxed mb-3">
                          {theme.description}
                        </p>
                        <div className="text-xs text-[var(--color-muted-fg)] mb-2">
                          <strong>Planetary basis:</strong> {theme.planetaryBasis}
                        </div>
                        <div className="p-3 bg-[var(--gold-50)] border border-[var(--gold-200)] rounded-[var(--radius-md)]">
                          <p className="text-xs text-[var(--color-fg)]">
                            <strong>Growth advice:</strong> {theme.growthAdvice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Edge */}
            <div className="max-w-2xl mx-auto mb-8">
              <InsightBlock
                title="Your Growth Edge"
                content={result.growthEdge}
                icon={<TrendingUp className="w-4 h-4" />}
                variant="gold"
              />
            </div>

            {/* Planetary Roles Table */}
            <div className="max-w-2xl mx-auto mb-8">
              <h3
                className="text-center mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
              >
                Your Key Placements
              </h3>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-lg)] overflow-hidden">
                {result.keyPlacements.map((p, i) => (
                  <div
                    key={p.planet}
                    className={`flex items-center gap-4 px-5 py-3.5 ${
                      i < result.keyPlacements.length - 1 ? "border-b border-[var(--color-border-subtle)]" : ""
                    }`}
                  >
                    <ZodiacIcon sign={p.sign} size="sm" />
                    <div className="flex-1">
                      <span className="font-medium text-sm">
                        {p.planet} in {p.sign}
                      </span>
                      <p className="text-xs text-[var(--color-muted-fg)]">{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ShareResult
              title="My Relationship Patterns"
              text={`My attachment tendency is ${ATTACHMENT_LABELS[result.attachmentStyle]}. Venus in ${result.venusSign}, Moon in ${result.moonSign}, Mars in ${result.marsSign}, Saturn in ${result.saturnSign}.`}
            />
          </ResultsSection>

          {/* How it works */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3
              className="text-center mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}
            >
              How This Analysis Works
            </h3>
            <div className="text-sm text-[var(--color-muted-fg)] leading-relaxed space-y-3">
              <p>
                This tool calculates the actual positions of Venus, Mars, Moon, and Saturn at your
                birth using astronomical ephemeris data. It then analyses the relationships between
                these placements to identify patterns:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li><strong>Venus</strong> — What you value and are attracted to in partners.</li>
                <li><strong>Mars</strong> — How you pursue connection and express desire.</li>
                <li><strong>Moon</strong> — Your emotional needs and security patterns.</li>
                <li><strong>Saturn</strong> — Where you face fear, limitation, and growth in relationships.</li>
              </ul>
              <p>
                The attachment style assessment uses the elemental qualities of these placements
                (Fire, Earth, Air, Water) to identify tendencies. This is a product-specific model
                inspired by attachment theory — not a clinical assessment.
              </p>
            </div>
          </div>

          {/* Methodology transparency */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-[var(--color-muted)] rounded-[var(--radius-lg)] p-5 text-xs text-[var(--color-muted-fg)] space-y-2">
              <p className="font-semibold text-sm text-[var(--color-fg)]">Calculation Transparency</p>
              <ul className="list-disc ml-4 space-y-1">
                <li><strong>Astronomical:</strong> Real planetary positions via astronomy-engine ephemeris.</li>
                <li><strong>Traditional astrology:</strong> Venus attraction patterns, Moon-Saturn dynamics, element relationships.</li>
                <li><strong>Scoring model:</strong> Attachment tendency from weighted element analysis — product-specific, not clinical.</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* FAQ */}
      <FAQSection
        items={[
          {
            question: "Can astrology really explain my relationship patterns?",
            answer: "Astrology offers a symbolic language for self-reflection, not scientific proof. Many people find that their natal chart placements resonate with their observed patterns. Use this as a mirror for insight, not a deterministic explanation.",
          },
          {
            question: "Is the attachment style assessment clinically accurate?",
            answer: "No. This is an astrological model inspired by attachment theory, not a clinical tool. Actual attachment style is shaped by childhood experiences, relationships, and personal growth. For clinical assessment, consult a licensed therapist.",
          },
          {
            question: "Why is Saturn included in relationship analysis?",
            answer: "Saturn represents structure, responsibility, fear, and long-term commitment. In relationships, Saturn shows where you face your deepest fears — fear of rejection, fear of vulnerability, or fear of commitment. Understanding Saturn's role helps identify growth edges.",
          },
          {
            question: "Can I change my relationship patterns?",
            answer: "Absolutely. Natal chart tendencies are starting points, not fixed destinies. Awareness is the first step toward change. Many people evolve beyond their natal patterns through self-work, therapy, and conscious relationship choices.",
          },
          {
            question: "Do I need my birth time?",
            answer: "Birth time improves Moon accuracy. Venus, Mars, and Saturn are reliable from date alone. If your Moon is near a sign boundary, birth time helps determine which sign it's in.",
          },
        ]}
      />

      {/* Related Tools */}
      <RelatedTools
        tools={[
          {
            title: "Love Language Calculator",
            description: "Discover how you give and receive love through your chart.",
            href: "/love-language-calculator",
          },
          {
            title: "Venus Sign Calculator",
            description: "Deep-dive into your Venus sign and romantic personality.",
            href: "/venus-sign-calculator",
          },
          {
            title: "Love Compatibility",
            description: "Check zodiac compatibility with a partner.",
            href: "/love-compatibility",
          },
        ]}
      />
    </CalculatorShell>
  );
}
