"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import {
  ResultsSection,
  RelatedTools,
  FAQSection,
  ShareResult,
} from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Moon, Heart, Sparkles } from "lucide-react";
import * as Astronomy from "astronomy-engine";

/* ── Moon Phase Computation ── */

interface MoonPhaseResult {
  phase: number;
  illumination: number;
  phaseName: string;
  emoji: string;
}

const PHASE_NAMES: { name: string; emoji: string; min: number; max: number }[] = [
  { name: "New Moon", emoji: "🌑", min: 0, max: 22.5 },
  { name: "Waxing Crescent", emoji: "🌒", min: 22.5, max: 67.5 },
  { name: "First Quarter", emoji: "🌓", min: 67.5, max: 112.5 },
  { name: "Waxing Gibbous", emoji: "🌔", min: 112.5, max: 157.5 },
  { name: "Full Moon", emoji: "🌕", min: 157.5, max: 202.5 },
  { name: "Waning Gibbous", emoji: "🌖", min: 202.5, max: 247.5 },
  { name: "Last Quarter", emoji: "🌗", min: 247.5, max: 292.5 },
  { name: "Waning Crescent", emoji: "🌘", min: 292.5, max: 360 },
];

function getMoonPhase(dateStr: string): MoonPhaseResult {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const astroTime = Astronomy.MakeTime(date);

  const sunLon = Astronomy.SunPosition(astroTime).elon;
  const moonLon = Astronomy.EclipticGeoMoon(astroTime).lon;

  let elongation = moonLon - sunLon;
  if (elongation < 0) elongation += 360;

  const illumination = Astronomy.Illumination(Astronomy.Body.Moon, astroTime);

  const phaseInfo =
    PHASE_NAMES.find((p) => elongation >= p.min && elongation < p.max) ??
    PHASE_NAMES[0];

  return {
    phase: elongation,
    illumination: illumination.phase_fraction,
    phaseName: phaseInfo.name,
    emoji: phaseInfo.emoji,
  };
}

function getCompatibility(phaseA: number, phaseB: number) {
  let diff = Math.abs(phaseA - phaseB);
  if (diff > 180) diff = 360 - diff;

  const fitScore = Math.round(100 * (diff / 180));

  if (diff >= 157.5) {
    return {
      score: fitScore,
      band: "Soulmate Match",
      bandColor: "gold" as const,
      description:
        "Your birth moons are nearly opposite — one lit where the other is dark. Together they form a full moon. This is what the viral trend calls a soulmate match: two halves of the same cycle.",
    };
  }
  if (diff >= 112.5) {
    return {
      score: fitScore,
      band: "Strong Complement",
      bandColor: "cosmic" as const,
      description:
        "Your moon phases sit on different sides of the cycle with strong overlap coverage. There is both enough similarity to understand each other and enough difference to keep things interesting.",
    };
  }
  if (diff >= 67.5) {
    return {
      score: fitScore,
      band: "Balanced Pair",
      bandColor: "rose" as const,
      description:
        "A moderate gap between your moon phases. You share some rhythmic ground while each bringing a different emotional emphasis. Balance pairs are often described as comfortable and grounding.",
    };
  }
  return {
    score: fitScore,
    band: "Kindred Phase",
    bandColor: "gold" as const,
    description:
      "Your birth moons are close together on the cycle — similar rhythms, similar instincts. Kindred phase pairs often feel immediately understood. The two moons overlap rather than complete each other.",
  };
}

/* ── Moon Disc SVG ── */

function MoonDisc({
  phase,
  size = 120,
  label,
}: {
  phase: number;
  size?: number;
  label?: string;
}) {
  const r = size / 2;
  const illuminationFraction = phase / 360;
  const isWaxing = phase < 180;

  const sweep = Math.abs(Math.cos(illuminationFraction * 2 * Math.PI));
  const litSide = isWaxing ? "right" : "left";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
      >
        <circle cx={r} cy={r} r={r - 2} fill="#1a1a2e" stroke="#334" strokeWidth={1} />
        <path
          d={`M ${r} 2
              A ${r - 2} ${r - 2} 0 0 ${litSide === "right" ? 1 : 0} ${r} ${size - 2}
              A ${(r - 2) * sweep} ${r - 2} 0 0 ${litSide === "right" ? (phase < 90 || phase > 270 ? 0 : 1) : (phase > 90 && phase < 270 ? 0 : 1)} ${r} 2
              Z`}
          fill="#e8d5b7"
          opacity={0.9}
        />
      </svg>
      {label && (
        <span className="text-xs text-[var(--color-muted-fg)]">{label}</span>
      )}
    </div>
  );
}

/* ── Page Component ── */

export default function MoonPhaseSoulmatePage() {
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [resultA, setResultA] = useState<MoonPhaseResult | null>(null);
  const [resultB, setResultB] = useState<MoonPhaseResult | null>(null);
  const [compatibility, setCompatibility] = useState<ReturnType<
    typeof getCompatibility
  > | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    if (!dateA || !dateB) {
      setError("Enter both birth dates.");
      return;
    }
    setError("");

    const a = getMoonPhase(dateA);
    const b = getMoonPhase(dateB);
    setResultA(a);
    setResultB(b);
    setCompatibility(getCompatibility(a.phase, b.phase));
  };

  return (
    <CalculatorShell
      title="Moon Phase Soulmate Calculator"
      subtitle="Lunar Compatibility"
      description="Enter two birth dates to find each person's birth moon phase and see if your moons complete a full moon together — the viral soulmate test, calculated from real astronomy."
      icon={<Moon className="w-8 h-8 text-[var(--champagne-gold)]" />}
    >
      {/* Intro */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-[var(--color-muted-fg)] leading-relaxed">
          The Moon Phase Soulmate trend says that if two people&apos;s birth
          moon phases fit together to make one complete full moon, they are
          soulmates. This calculator finds the actual astronomical phase of the
          Moon on each birth date and checks the fit. Everything runs in your
          browser — no data is stored.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto">
        <Card variant="default" padding="lg">
          <div className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                htmlFor="dateA"
              >
                Person A — Birth Date
              </label>
              <input
                id="dateA"
                type="date"
                value={dateA}
                onChange={(e) => setDateA(e.target.value)}
                className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-fg)]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                htmlFor="dateB"
              >
                Person B — Birth Date
              </label>
              <input
                id="dateB"
                type="date"
                value={dateB}
                onChange={(e) => setDateB(e.target.value)}
                className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-fg)]"
              />
            </div>
            {error && (
              <p className="text-sm text-[var(--color-error)]">{error}</p>
            )}
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCalculate}
              icon={<Moon className="w-4 h-4" />}
            >
              Check Moon Phase Compatibility
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {resultA && resultB && compatibility && (
        <>
          <ResultsSection title="Your Birth Moon Phases">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-8">
              <div className="text-center">
                <MoonDisc phase={resultA.phase} size={140} label="Person A" />
                <p className="mt-3 font-semibold text-lg">
                  {resultA.emoji} {resultA.phaseName}
                </p>
                <p className="text-sm text-[var(--color-muted-fg)]">
                  {Math.round(resultA.illumination * 100)}% illuminated
                </p>
              </div>

              <div className="text-4xl text-[var(--color-muted-fg)]">+</div>

              <div className="text-center">
                <MoonDisc phase={resultB.phase} size={140} label="Person B" />
                <p className="mt-3 font-semibold text-lg">
                  {resultB.emoji} {resultB.phaseName}
                </p>
                <p className="text-sm text-[var(--color-muted-fg)]">
                  {Math.round(resultB.illumination * 100)}% illuminated
                </p>
              </div>
            </div>

            {/* Compatibility result */}
            <div className="max-w-xl mx-auto text-center">
              <Badge variant={compatibility.bandColor} className="text-lg px-4 py-1 mb-4">
                {compatibility.band}
              </Badge>
              <div className="mb-4">
                <span className="text-5xl font-bold">
                  {compatibility.score}%
                </span>
                <span className="text-[var(--color-muted-fg)] ml-2">
                  full-moon fit
                </span>
              </div>
              <p className="text-[var(--color-muted-fg)] leading-relaxed">
                {compatibility.description}
              </p>
            </div>
          </ResultsSection>

          {/* How it works */}
          <ResultsSection title="How the Score Works">
            <div className="max-w-2xl mx-auto">
              <Card variant="default" padding="md">
                <p className="text-[var(--color-muted-fg)] leading-relaxed text-sm">
                  The calculator finds each person&apos;s Moon elongation — the
                  angular distance between the Moon and Sun — at noon UTC on
                  their birthday, using the astronomy-engine ephemeris (the
                  same data source professional astronomy software uses). Two
                  moons exactly 180° apart in elongation are on opposite sides
                  of the cycle: one is lit where the other is dark, so together
                  they form a perfect full disc. The score is{" "}
                  <code className="bg-[var(--color-surface)] px-1 rounded">
                    100 × (angular_difference / 180)
                  </code>
                  , where 100% is a perfect soulmate match (opposite phases)
                  and 0% means identical phases.
                </p>
              </Card>
            </div>
          </ResultsSection>

          <ShareResult
            title="Moon Phase Soulmate"
            text={`Our moon phases: ${resultA.phaseName} + ${resultB.phaseName} = ${compatibility.score}% soulmate match! Try it at AstrologyForLove.`}
          />

          <RelatedTools
            tools={[
              { title: "Moon Sign Compatibility", description: "Compare emotional compatibility through Moon placements.", href: "/moon-sign-compatibility" },
              { title: "Synastry Chart", description: "Full biwheel chart with every aspect.", href: "/synastry-chart" },
              { title: "Soulmate Calculator", description: "Explore your astrological soulmate profile.", href: "/soulmate-calculator" },
              { title: "Love Compatibility", description: "Quick zodiac sign compatibility.", href: "/love-compatibility" },
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
            What is a moon phase soulmate?
          </h2>
          <p className="text-[var(--color-muted-fg)] leading-relaxed">
            A moon phase soulmate is someone whose birth moon phase is opposite
            yours on the lunar cycle. When two birth moons are placed side by
            side, one person&apos;s lit half fills the other person&apos;s dark
            half — together they make one complete full moon. The trend went
            viral on TikTok in early 2023 through a CapCut template, and the
            search interest has held steady since.
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
            The four soulmate phase pairs
          </h2>
          <ul className="text-[var(--color-muted-fg)] leading-relaxed list-disc pl-6 space-y-1">
            <li>
              <strong>New Moon + Full Moon</strong> — the classic opposite pair.
              One at the beginning of the cycle, one at the peak.
            </li>
            <li>
              <strong>Waxing Crescent + Waning Gibbous</strong> — growing
              meets releasing, with matching illumination shapes.
            </li>
            <li>
              <strong>First Quarter + Last Quarter</strong> — both half-lit, but
              from different sides.
            </li>
            <li>
              <strong>Waxing Gibbous + Waning Crescent</strong> — the almost-full
              meets the almost-new.
            </li>
          </ul>
        </div>

        <FAQSection
          items={[
            {
              question: "Is the moon phase soulmate test real astrology?",
              answer: "It's a modern pop-astrology trend, not part of classical astrology. Traditional astrologers look at the Moon sign and Moon aspects in synastry, not the phase shape. That said, the phase is astronomically real — this calculator uses the same ephemeris data that observatories use.",
            },
            {
              question: "Do I need my birth time?",
              answer: "Usually not. The Moon phase changes roughly every 3.7 days, so a birth date alone identifies the phase correctly most of the time. On the ~27% of days when the phase changes partway through, a birth time helps, but even then the difference is usually small.",
            },
            {
              question: "What if our score is low?",
              answer: "A low score means your birth moons sit on the same side of the cycle — kindred phases. It doesn't mean you're incompatible. It means your emotional rhythms are similar rather than complementary. For a deeper look at emotional compatibility, try the Moon Sign Compatibility calculator.",
            },
            {
              question: "Is this calculator free?",
              answer: "Yes. Everything runs in your browser using the astronomy-engine library. No data is stored, no signup required.",
            },
          ]}
        />
      </div>
    </CalculatorShell>
  );
}
