"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { ResultsSection, RelatedTools } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ZodiacIcon } from "@/components/astrology/ZodiacIcon";
import {
  ZODIAC_SIGNS,
  ZODIAC_SYMBOLS,
  ZODIAC_ELEMENTS,
  ZODIAC_DATE_RANGES,
  type ZodiacSign,
} from "@/lib/astrology-data";
import { VENUS_SIGN_INTERPRETATIONS, MOON_SIGN_INTERPRETATIONS } from "@/lib/astro-engine";
import { Heart, Sparkles, Star, ChevronRight } from "lucide-react";

const SIGN_PROFILES: Record<ZodiacSign, {
  ruling: string;
  modality: string;
  loveProfile: string;
  strengths: string[];
  challenges: string[];
  bestMatches: ZodiacSign[];
}> = {
  Aries: { ruling: "Mars", modality: "Cardinal", loveProfile: "Passionate, direct, and fiercely loyal. Aries love with intensity and need a partner who can match their fire.", strengths: ["Passionate pursuit", "Honest and direct", "Protective and loyal"], challenges: ["Impatience", "Impulsiveness", "Competitive nature"], bestMatches: ["Leo", "Sagittarius", "Libra"] },
  Taurus: { ruling: "Venus", modality: "Fixed", loveProfile: "Sensual, devoted, and deeply committed. Taurus builds love slowly but creates an unshakeable bond.", strengths: ["Steadfast devotion", "Sensual and romantic", "Reliable partner"], challenges: ["Stubbornness", "Possessiveness", "Resistance to change"], bestMatches: ["Virgo", "Capricorn", "Cancer"] },
  Gemini: { ruling: "Mercury", modality: "Mutable", loveProfile: "Curious, witty, and endlessly engaging. Gemini brings mental stimulation and playful energy to love.", strengths: ["Brilliant communicator", "Adaptable and fun", "Intellectually stimulating"], challenges: ["Inconsistency", "Restlessness", "Difficulty with deep emotion"], bestMatches: ["Libra", "Aquarius", "Leo"] },
  Cancer: { ruling: "Moon", modality: "Cardinal", loveProfile: "Nurturing, intuitive, and deeply emotional. Cancer creates a haven of love and emotional safety.", strengths: ["Deep empathy", "Nurturing presence", "Fierce loyalty"], challenges: ["Moodiness", "Over-sensitivity", "Difficulty letting go"], bestMatches: ["Scorpio", "Pisces", "Taurus"] },
  Leo: { ruling: "Sun", modality: "Fixed", loveProfile: "Generous, warm, and theatrical in love. Leo loves grandly and makes their partner feel like the center of the universe.", strengths: ["Generous warmth", "Devoted loyalty", "Romantic flair"], challenges: ["Need for attention", "Pride", "Dramatic tendencies"], bestMatches: ["Aries", "Sagittarius", "Libra"] },
  Virgo: { ruling: "Mercury", modality: "Mutable", loveProfile: "Thoughtful, devoted, and quietly caring. Virgo shows love through attention to detail and acts of service.", strengths: ["Thoughtful devotion", "Practical support", "Quiet reliability"], challenges: ["Over-criticism", "Perfectionism", "Difficulty expressing emotion"], bestMatches: ["Taurus", "Capricorn", "Cancer"] },
  Libra: { ruling: "Venus", modality: "Cardinal", loveProfile: "Romantic, harmonious, and partnership-oriented. Libra believes love is the highest art form.", strengths: ["Natural romantic", "Fair and considerate", "Socially graceful"], challenges: ["Indecisiveness", "People-pleasing", "Avoiding conflict"], bestMatches: ["Gemini", "Aquarius", "Leo"] },
  Scorpio: { ruling: "Pluto/Mars", modality: "Fixed", loveProfile: "Intense, transformative, and utterly devoted. Scorpio loves with a depth few can match.", strengths: ["Profound depth", "Unwavering loyalty", "Transformative passion"], challenges: ["Jealousy", "Control issues", "Difficulty trusting"], bestMatches: ["Cancer", "Pisces", "Virgo"] },
  Sagittarius: { ruling: "Jupiter", modality: "Mutable", loveProfile: "Adventurous, honest, and freedom-loving. Sagittarius turns love into an epic journey.", strengths: ["Adventurous spirit", "Honest and direct", "Optimistic outlook"], challenges: ["Commitment anxiety", "Bluntness", "Restlessness"], bestMatches: ["Aries", "Leo", "Aquarius"] },
  Capricorn: { ruling: "Saturn", modality: "Cardinal", loveProfile: "Committed, traditional, and deeply reliable. Capricorn builds love that grows stronger with time.", strengths: ["Rock-solid commitment", "Long-term vision", "Quiet strength"], challenges: ["Emotional reserve", "Workaholism", "Rigidity"], bestMatches: ["Taurus", "Virgo", "Scorpio"] },
  Aquarius: { ruling: "Uranus/Saturn", modality: "Fixed", loveProfile: "Unconventional, intellectual, and fiercely independent. Aquarius reinvents love on their own terms.", strengths: ["Intellectual depth", "Respect for individuality", "Visionary thinking"], challenges: ["Emotional detachment", "Stubbornness about freedom", "Unpredictability"], bestMatches: ["Gemini", "Libra", "Sagittarius"] },
  Pisces: { ruling: "Neptune/Jupiter", modality: "Mutable", loveProfile: "Compassionate, dreamy, and boundlessly romantic. Pisces loves without limits or conditions.", strengths: ["Boundless empathy", "Creative romance", "Spiritual depth"], challenges: ["Escapism", "Boundary issues", "Idealization"], bestMatches: ["Cancer", "Scorpio", "Taurus"] },
};

export default function ZodiacLovePage() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  const profile = selectedSign ? SIGN_PROFILES[selectedSign] : null;
  const venusInterp = selectedSign ? VENUS_SIGN_INTERPRETATIONS[selectedSign] : null;

  return (
    <CalculatorShell
      title="Zodiac Love Sign Guide"
      subtitle="Love Profiles"
      description="Explore how each zodiac sign expresses love, their relationship strengths, challenges, and most compatible matches."
      icon={<Star className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      {/* Sign selector */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = selectedSign === sign;
            return (
              <button
                key={sign}
                onClick={() => setSelectedSign(sign)}
                className={`flex flex-col items-center gap-2 py-4 px-2 rounded-[var(--radius-lg)] border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--cosmic-navy)] text-[var(--ivory)] border-[var(--cosmic-navy)] shadow-[var(--shadow-md)]"
                    : "bg-[var(--color-surface)] border-[var(--color-border-subtle)] hover:border-[var(--champagne-gold)] hover:shadow-sm"
                }`}
              >
                <span className="text-2xl">{ZODIAC_SYMBOLS[sign]}</span>
                <span className="text-xs font-medium">{sign}</span>
                <span className="text-[9px] text-[var(--color-muted-fg)]">{ZODIAC_DATE_RANGES[sign]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected sign profile */}
      {selectedSign && profile && venusInterp && (
        <div className="max-w-3xl mx-auto">
          <ResultsSection title={`${selectedSign} in Love`}>
            {/* Header */}
            <div className="text-center mb-10">
              <ZodiacIcon sign={selectedSign} size="lg" showElement />
              <div className="mt-3 flex justify-center gap-2 flex-wrap">
                <Badge variant="gold">{ZODIAC_ELEMENTS[selectedSign]} Element</Badge>
                <Badge variant="cosmic">{profile.modality}</Badge>
                <Badge variant="default">Ruled by {profile.ruling}</Badge>
              </div>
            </div>

            {/* Love profile */}
            <Card variant="feature" padding="lg" className="mb-8">
              <p className="text-lg leading-relaxed" style={{ fontFamily: "var(--font-display)" }}>
                {profile.loveProfile}
              </p>
            </Card>

            {/* Strengths & Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card variant="default" padding="md">
                <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                  <Star className="w-4 h-4 text-[var(--champagne-gold)]" /> Love Strengths
                </h4>
                <ul className="space-y-2">
                  {profile.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-muted-fg)]">
                      <span className="text-[var(--champagne-gold)]">✦</span> {s}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card variant="default" padding="md">
                <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                  <Heart className="w-4 h-4 text-[var(--romantic-rose)]" /> Growth Areas
                </h4>
                <ul className="space-y-2">
                  {profile.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-muted-fg)]">
                      <span className="text-[var(--romantic-rose)]">✦</span> {c}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Venus interpretation */}
            <div className="mb-8">
              <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}>
                How {selectedSign} Expresses Love
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card variant="default" padding="sm">
                  <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-1">Love Style</div>
                  <p className="text-sm text-[var(--color-muted-fg)]">{venusInterp.loveStyle}</p>
                </Card>
                <Card variant="default" padding="sm">
                  <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-1">Attracted To</div>
                  <p className="text-sm text-[var(--color-muted-fg)]">{venusInterp.attracted}</p>
                </Card>
                <Card variant="default" padding="sm">
                  <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-1">Expression</div>
                  <p className="text-sm text-[var(--color-muted-fg)]">{venusInterp.expression}</p>
                </Card>
                <Card variant="default" padding="sm">
                  <div className="text-xs uppercase tracking-wider text-[var(--champagne-gold)] mb-1">Needs</div>
                  <p className="text-sm text-[var(--color-muted-fg)]">{venusInterp.needs}</p>
                </Card>
              </div>
            </div>

            {/* Best matches */}
            <div>
              <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 600 }}>
                Most Compatible Signs
              </h3>
              <div className="flex gap-4 flex-wrap">
                {profile.bestMatches.map((match) => (
                  <a
                    key={match}
                    href={`/love-compatibility`}
                    className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] border border-[var(--color-border)] hover:border-[var(--champagne-gold)] transition-colors group"
                  >
                    <ZodiacIcon sign={match} size="sm" />
                    <span className="text-sm">{match}</span>
                    <ChevronRight className="w-3 h-3 text-[var(--color-muted-fg)] group-hover:text-[var(--champagne-gold)]" />
                  </a>
                ))}
              </div>
            </div>
          </ResultsSection>
        </div>
      )}

      {!selectedSign && (
        <div className="text-center py-10">
          <Sparkles className="w-8 h-8 text-[var(--champagne-gold)] mx-auto mb-3" />
          <p className="text-[var(--color-muted-fg)]">Select a zodiac sign above to explore their love profile.</p>
        </div>
      )}

      <RelatedTools
        tools={[
          { title: "Love Compatibility", description: "Compare two signs.", href: "/love-compatibility" },
          { title: "Venus Sign Calculator", description: "Find your Venus sign.", href: "/venus-sign-calculator" },
          { title: "Moon Sign Compatibility", description: "Emotional connection.", href: "/moon-sign-compatibility" },
        ]}
      />
    </CalculatorShell>
  );
}
