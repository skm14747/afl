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
  calculateNatalChart,
  type BirthDetails,
  type PlanetPosition,
} from "@/lib/astro-engine";
import {
  ZODIAC_ELEMENTS,
  ZODIAC_SIGNS,
  type ZodiacSign,
} from "@/lib/astrology-data";
import { Flame, Zap, Swords, Heart, Shield } from "lucide-react";

/* ── Mars Sign Interpretations ── */

const MARS_INTERPS: Record<
  ZodiacSign,
  {
    drive: string;
    desire: string;
    conflict: string;
    chemistry: string;
  }
> = {
  Aries: {
    drive: "Direct, impulsive, and competitive. You charge into action before others finish deliberating.",
    desire: "Bold, spontaneous attraction. You pursue what you want immediately and lose interest if the chase fades.",
    conflict: "Quick to anger, quick to forgive. You fight head-on and prefer resolution over grudges.",
    chemistry: "Explosive fire energy. You bring raw, unfiltered passion — matches lit fast, burning bright.",
  },
  Taurus: {
    drive: "Steady, persistent, and sensual. You build momentum slowly but are unstoppable once committed.",
    desire: "Physical, earthy desire. Touch and presence matter more than words. You want tangible closeness.",
    conflict: "Slow to anger, but stubborn when pushed. You avoid fights until you can't — then you don't back down.",
    chemistry: "Deep, sensual warmth. Your passion is slow-building but long-lasting and physically intense.",
  },
  Gemini: {
    drive: "Quick, adaptable, and mentally restless. You juggle multiple interests and need variety in action.",
    desire: "Mentally stimulated desire. Flirtation, wit, and conversation are foreplay. Boredom is the enemy.",
    conflict: "Argues with words, not fists. You can talk circles around opponents but may avoid emotional depth.",
    chemistry: "Playful, verbal, curious. Your chemistry is intellectual — you turn people on with ideas and banter.",
  },
  Cancer: {
    drive: "Protective, emotionally fueled, and tenacious. You act to defend what you love.",
    desire: "Emotionally driven desire. You need safety before you open up — but once safe, you're deeply passionate.",
    conflict: "Passive-aggressive when hurt. You retreat before confronting and need emotional reassurance to reconcile.",
    chemistry: "Tender, nurturing intensity. Your passion is emotionally layered — feelings and desire are inseparable.",
  },
  Leo: {
    drive: "Confident, dramatic, and generous. You act boldly and expect recognition for your efforts.",
    desire: "Desire for admiration and grand romance. You want to be wanted — passion is a performance and a gift.",
    conflict: "Proud and theatrical in conflict. You need respect even during disagreements and won't tolerate dismissal.",
    chemistry: "Warm, magnetic, and generous in bed. You bring fire, creativity, and a desire to please your partner.",
  },
  Virgo: {
    drive: "Methodical, detail-oriented, and service-driven. You improve everything you touch, including relationships.",
    desire: "Understated, attentive desire. You show attraction through acts of care and noticing what others miss.",
    conflict: "Critical under stress. You may over-analyze friction but resolve issues by finding practical solutions.",
    chemistry: "Quiet, attentive devotion. Your passion shows in precision — you study what your partner needs and deliver.",
  },
  Libra: {
    drive: "Diplomatic, partnership-oriented, and aesthetically motivated. You act to create harmony and beauty.",
    desire: "Desire for connection and reciprocity. You're attracted to elegance and want romance to feel balanced.",
    conflict: "Avoids direct conflict. You seek compromise and can be indecisive when pushed into confrontation.",
    chemistry: "Refined, romantic, and attentive. Your passion is about creating a beautiful, harmonious experience.",
  },
  Scorpio: {
    drive: "Intense, strategic, and relentless. You pursue goals with single-minded determination and emotional depth.",
    desire: "Deep, transformative desire. You want all-or-nothing intimacy — surface-level connections don't satisfy you.",
    conflict: "Calculating when provoked. You remember everything and can sting when betrayed, but loyalty runs equally deep.",
    chemistry: "Magnetic, intense, and psychologically penetrating. The most emotionally charged Mars placement.",
  },
  Sagittarius: {
    drive: "Adventurous, optimistic, and freedom-loving. You act on enthusiasm and hate being confined.",
    desire: "Desire for adventure and new experiences. Travel, philosophy, and spontaneity are your aphrodisiacs.",
    conflict: "Blunt and direct in arguments. You say what you think without sugarcoating but rarely hold grudges.",
    chemistry: "Wild, fun, and expansive. Your passion is about shared experience — the more adventurous, the better.",
  },
  Capricorn: {
    drive: "Ambitious, disciplined, and enduring. You play the long game and build power through patience.",
    desire: "Earned, authoritative desire. You respect competence and are drawn to people who have built something real.",
    conflict: "Cold and controlled under pressure. You withdraw rather than explode, but your boundaries are absolute.",
    chemistry: "Commanding, steady, and surprisingly intense. Your passion is controlled on the surface, volcanic beneath.",
  },
  Aquarius: {
    drive: "Independent, unconventional, and intellectually motivated. You act to change systems, not follow them.",
    desire: "Desire for uniqueness and mental freedom. You're attracted to originality and repelled by possessiveness.",
    conflict: "Detached and logical in conflict. You can analyze a fight without feeling it, which frustrates emotional partners.",
    chemistry: "Experimental, cerebral, and unpredictable. Your passion follows its own rules — conventional romance doesn't apply.",
  },
  Pisces: {
    drive: "Intuitive, creative, and emotionally fluid. You act on feeling and imagination rather than logic.",
    desire: "Desire for transcendence and soul-level merging. Physical intimacy is spiritual for you.",
    conflict: "Absorbs and retreats. You feel others' anger deeply and may sacrifice your own needs to avoid confrontation.",
    chemistry: "Dreamy, empathetic, and boundary-dissolving. Your passion is about losing yourself in another person.",
  },
};

/* ── Compatibility Logic ── */

function getMarsCompatibility(
  signA: ZodiacSign,
  signB: ZodiacSign
): {
  score: number;
  passion: string;
  conflictDynamic: string;
  advice: string;
} {
  const elA = ZODIAC_ELEMENTS[signA];
  const elB = ZODIAC_ELEMENTS[signB];

  const idxA = ZODIAC_SIGNS.indexOf(signA);
  const idxB = ZODIAC_SIGNS.indexOf(signB);
  let distance = Math.abs(idxA - idxB);
  if (distance > 6) distance = 12 - distance;

  let score: number;
  let passion: string;
  let conflictDynamic: string;
  let advice: string;

  if (distance === 0) {
    score = 85;
    passion = `Both Mars in ${signA} — you match each other's intensity exactly. Same speed, same fuel, same fire. This is passionate but can become a power struggle if neither yields.`;
    conflictDynamic = "You fight the same way, which means arguments escalate fast but resolve the same way too.";
    advice = "Take turns leading. Two identical Mars signs need to channel their shared fire into joint projects, not competition.";
  } else if (distance === 4) {
    score = 92;
    passion = `Mars in ${signA} and ${signB} share the ${elA} element — a natural trine. Your drives complement each other instinctively. Passion flows without negotiation.`;
    conflictDynamic = "Friction is rare because you understand each other's anger language. When it happens, it resolves quickly.";
    advice = "Don't let easy flow become stagnation. Same-element Mars pairs can coast — keep introducing new shared challenges.";
  } else if (distance === 2) {
    score = 82;
    const compEls = `${elA} and ${elB}`;
    passion = `A sextile between Mars in ${signA} and ${signB}. ${compEls} are complementary elements — you each bring something the other lacks. Friendly spark with room to grow.`;
    conflictDynamic = "Disagreements are productive. You approach problems differently enough to see solutions the other misses.";
    advice = "Lean into the difference. Your Mars signs are different enough to teach each other, similar enough to stay in rhythm.";
  } else if (distance === 6) {
    score = 72;
    passion = `Mars in ${signA} and ${signB} are opposite signs. The magnetic pull is strong — attraction fueled by everything that's different between you. Electric when it works.`;
    conflictDynamic = "Fights are real and can feel polarizing. Each of you triggers the other's blind spots, which is uncomfortable but growthful.";
    advice = "Opposites attract for a reason. The friction between you is also the source of the chemistry. Don't try to eliminate it — learn to navigate it.";
  } else if (distance === 3) {
    score = 55;
    passion = `A square between Mars in ${signA} and ${signB}. Same mode (cardinal, fixed, or mutable) but clashing elements. The tension creates friction that can feel like passion — or irritation.`;
    conflictDynamic = "Friction is high. You push each other's buttons because you operate at the same pace but with incompatible fuel.";
    advice = "Name the tension out loud. Squares are the aspect of growth — the discomfort is not a sign of failure, it's a sign that you challenge each other.";
  } else {
    score = 48;
    passion = `Mars in ${signA} and ${signB} sit at an inconjunct angle. Your drives don't naturally align — what motivates one may confuse the other.`;
    conflictDynamic = "Miscommunication is the main friction. You may not understand why the other person is angry or what they want.";
    advice = "Translate for each other. This pairing requires explicit communication about desires and boundaries — things same-element pairs intuit automatically.";
  }

  return { score, passion, conflictDynamic, advice };
}

/* ── Page Component ── */

export default function MarsSignCompatibilityPage() {
  const [detailsA, setDetailsA] = useState<Partial<BirthDetails>>({});
  const [detailsB, setDetailsB] = useState<Partial<BirthDetails>>({});
  const [marsA, setMarsA] = useState<PlanetPosition | null>(null);
  const [marsB, setMarsB] = useState<PlanetPosition | null>(null);
  const [errors, setErrors] = useState<{
    a: Record<string, string>;
    b: Record<string, string>;
  }>({ a: {}, b: {} });

  const handleCalculate = () => {
    const errA: Record<string, string> = {};
    const errB: Record<string, string> = {};
    if (!detailsA.date) errA.date = "Required";
    if (!detailsB.date) errB.date = "Required";
    if (Object.keys(errA).length > 0 || Object.keys(errB).length > 0) {
      setErrors({ a: errA, b: errB });
      return;
    }
    setErrors({ a: {}, b: {} });

    const chartA = calculateNatalChart(detailsA as BirthDetails);
    const chartB = calculateNatalChart(detailsB as BirthDetails);
    setMarsA(chartA.mars);
    setMarsB(chartB.mars);
  };

  const interpA = marsA ? MARS_INTERPS[marsA.sign] : null;
  const interpB = marsB ? MARS_INTERPS[marsB.sign] : null;
  const compat =
    marsA && marsB ? getMarsCompatibility(marsA.sign, marsB.sign) : null;

  return (
    <CalculatorShell
      title="Mars Sign Compatibility"
      subtitle="Passion & Chemistry"
      description="Mars governs desire, drive, and how you fight. Compare two Mars placements to see where the fire meets — attraction, conflict style, and physical chemistry."
      icon={<Flame className="w-8 h-8 text-[var(--romantic-rose)]" />}
    >
      {/* Intro */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          Where Venus shows how you love and what you find beautiful, Mars shows
          how you pursue, what turns you on, and how you fight. When two
          people&apos;s Mars signs harmonize, the physical chemistry and shared
          drive feel instinctive. When they clash, the same friction that
          creates tension also creates heat.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BirthDetailsForm
              label="Person A"
              value={detailsA}
              onChange={setDetailsA}
              showTime
              showLocation={false}
              errors={errors.a}
            />
            <BirthDetailsForm
              label="Person B"
              value={detailsB}
              onChange={setDetailsB}
              showTime
              showLocation={false}
              errors={errors.b}
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCalculate}
              icon={<Flame className="w-4 h-4" />}
            >
              Compare Mars Signs
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {marsA && marsB && interpA && interpB && compat && (
        <>
          {/* Mars placements side by side */}
          <ResultsSection title="Your Mars Signs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              {[
                { label: "Person A", mars: marsA, interp: interpA },
                { label: "Person B", mars: marsB, interp: interpB },
              ].map(({ label, mars, interp }) => (
                <Card key={label} variant="default" padding="md">
                  <div className="text-center mb-4">
                    <p className="text-xs text-[var(--color-muted-fg)] mb-1">
                      {label}
                    </p>
                    <ZodiacIcon sign={mars.sign} size="md" showElement />
                    <h3
                      className="mt-2"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-h4)",
                        fontWeight: 600,
                      }}
                    >
                      ♂ Mars in {mars.sign}
                    </h3>
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge variant="rose">
                        {mars.degree.toFixed(1)}° {mars.sign}
                      </Badge>
                      <Badge variant="cosmic">
                        {ZODIAC_ELEMENTS[mars.sign]}
                      </Badge>
                      {mars.retrograde && (
                        <Badge variant="gold">Retrograde ℞</Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-[var(--color-fg)]">
                        <Zap className="w-3 h-3 inline mr-1" /> Drive
                      </p>
                      <p className="text-[var(--color-muted-fg)]">
                        {interp.drive}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-fg)]">
                        <Heart className="w-3 h-3 inline mr-1" /> Desire
                      </p>
                      <p className="text-[var(--color-muted-fg)]">
                        {interp.desire}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-fg)]">
                        <Swords className="w-3 h-3 inline mr-1" /> Conflict
                      </p>
                      <p className="text-[var(--color-muted-fg)]">
                        {interp.conflict}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Compatibility score */}
            <div className="max-w-xl mx-auto text-center mb-8">
              <div className="mb-4">
                <span className="text-6xl font-bold">{compat.score}</span>
                <span className="text-2xl text-[var(--color-muted-fg)]">
                  /100
                </span>
              </div>
              <Badge
                variant={compat.score >= 75 ? "gold" : compat.score >= 55 ? "cosmic" : "rose"}
                className="text-sm px-3 py-1"
              >
                Mars Compatibility
              </Badge>
            </div>

            {/* Detailed breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <InsightBlock
                title="Passion & Chemistry"
                content={compat.passion}
                icon={<Flame className="w-4 h-4" />}
                variant="rose"
              />
              <InsightBlock
                title="Conflict Dynamic"
                content={compat.conflictDynamic}
                icon={<Swords className="w-4 h-4" />}
                variant="gold"
              />
              <InsightBlock
                title="Your Mars Advice"
                content={compat.advice}
                icon={<Shield className="w-4 h-4" />}
                variant="default"
              />
            </div>
          </ResultsSection>

          <ShareResult
            title="Mars Sign Compatibility"
            text={`Mars in ${marsA.sign} + Mars in ${marsB.sign} = ${compat.score}/100 passion match! Check yours at AstrologyForLove.`}
          />

          <RelatedTools
            tools={[
              { title: "Venus Sign Calculator", description: "Discover your love planet.", href: "/venus-sign-calculator" },
              { title: "Synastry Chart", description: "Full biwheel chart with every aspect.", href: "/synastry-chart" },
              { title: "Birth Chart Compatibility", description: "Full natal chart comparison.", href: "/birth-chart-compatibility" },
              { title: "Moon Phase Soulmate", description: "Do your birth moons make a full moon?", href: "/moon-phase-soulmate" },
            ]}
          />
        </>
      )}

      {/* SEO content + FAQ */}
      <div className="max-w-2xl mx-auto mt-16 space-y-8">
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h3)",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            What is Mars sign compatibility?
          </h2>
          <p className="text-[var(--color-muted-fg)] leading-relaxed">
            Mars sign compatibility compares the Mars placements of two people
            to reveal their passion, physical chemistry, shared drive, and
            conflict style. Mars is the planet of desire, energy, and action —
            it governs how you pursue what you want, express attraction, and
            assert yourself. Where Venus shows how you love, Mars shows how you
            go after what you want. Comparing Mars signs is one of the most
            revealing layers for physical and romantic chemistry.
          </p>
        </div>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h3)",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            Mars and the elements
          </h2>
          <ul className="text-[var(--color-muted-fg)] leading-relaxed list-disc pl-6 space-y-1">
            <li>
              <strong>Fire Mars (Aries, Leo, Sagittarius)</strong> — bold,
              spontaneous, physically expressive passion.
            </li>
            <li>
              <strong>Earth Mars (Taurus, Virgo, Capricorn)</strong> — steady,
              sensual, enduring chemistry.
            </li>
            <li>
              <strong>Air Mars (Gemini, Libra, Aquarius)</strong> — mentally
              stimulated, playful, experimental.
            </li>
            <li>
              <strong>Water Mars (Cancer, Scorpio, Pisces)</strong> — emotionally
              deep, intuitive, intense desire.
            </li>
          </ul>
        </div>

        <FAQSection
          items={[
            {
              question: "Do I need my birth time for Mars sign?",
              answer: "Usually not. Mars stays in each sign for roughly six to seven weeks, so a birth date alone is usually enough. A birth time is only needed if Mars changed signs on your exact birthday.",
            },
            {
              question: "Is Mars compatibility about sexual chemistry?",
              answer: "Partly. Mars describes desire, pursuit, and physical energy, so it's one of the strongest indicators of sexual chemistry. But it also covers how you fight, how you take initiative, and how you pursue goals together.",
            },
            {
              question: "What if our Mars signs are incompatible?",
              answer: "A challenging Mars combination doesn't mean the relationship won't work. It means you express desire and handle conflict differently, which requires more explicit communication. Many strong couples have square or inconjunct Mars signs — the friction keeps things dynamic.",
            },
            {
              question: "How is this different from Venus compatibility?",
              answer: "Venus is what you want and how you give love. Mars is how you go after it and what turns you on. Venus-Mars cross-aspects (your Venus to their Mars, and vice versa) are what most astrologers check first for attraction chemistry.",
            },
            {
              question: "Is this calculator free?",
              answer: "Yes. The Mars sign calculation, compatibility score, and interpretations are free. No signup required.",
            },
          ]}
        />
      </div>
    </CalculatorShell>
  );
}
