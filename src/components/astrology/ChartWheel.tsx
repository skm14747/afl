"use client";

import React from "react";
import type { NatalChart } from "@/lib/astro-engine";

const GLYPH: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
  Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
  Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂", Jupiter: "♃",
  Saturn: "♄", Uranus: "♅", Neptune: "♆", Pluto: "♇", Ascendant: "Asc",
  "North Node": "☊", Fortune: "⊗",
};

function polar(cx: number, cy: number, radius: number, longitude: number) {
  const angle = ((180 - longitude) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

function WheelRing({
  chart,
  radius,
  glyphRadius,
  cx,
  cy,
}: {
  chart: NatalChart;
  radius: number;
  glyphRadius: number;
  cx: number;
  cy: number;
}) {
  const bodies = [
    chart.sun, chart.moon, chart.mercury, chart.venus, chart.mars,
    chart.jupiter, chart.saturn, chart.uranus, chart.neptune, chart.pluto,
    chart.northNode, chart.partOfFortune, chart.ascendant,
  ].filter((body): body is NonNullable<typeof body> => Boolean(body));

  return (
    <>
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--color-border)" strokeWidth="1" />
      {bodies.map((body) => {
        const point = polar(cx, cy, glyphRadius, body.longitude);
        return (
          <text
            key={`${body.planet}-${radius}`}
            x={point.x}
            y={point.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--color-fg)"
            fontSize={body.planet === "Ascendant" ? 8 : 11}
          >
            {GLYPH[body.planet] ?? body.planet.slice(0, 2)}
          </text>
        );
      })}
    </>
  );
}

export function ChartWheel({ chart, caption }: { chart: NatalChart; caption?: string }) {
  const cx = 160;
  const cy = 160;
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 320 320" className="w-full max-w-[320px]" role="img" aria-label={caption ?? "Natal chart wheel"}>
        <circle cx={cx} cy={cy} r={150} fill="var(--color-surface)" stroke="var(--color-border)" />
        {Array.from({ length: 12 }, (_, index) => {
          const start = polar(cx, cy, 150, index * 30);
          const label = polar(cx, cy, 132, index * 30 + 15);
          return (
            <g key={index}>
              <line x1={cx} y1={cy} x2={start.x} y2={start.y} stroke="var(--color-border-subtle)" strokeWidth="1" />
              <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle" fill="var(--champagne-gold)" fontSize="13">
                {GLYPH[["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][index]]}
              </text>
            </g>
          );
        })}
        <WheelRing chart={chart} radius={108} glyphRadius={88} cx={cx} cy={cy} />
        {chart.ascendant && (
          <text x="16" y="28" fill="var(--color-muted-fg)" fontSize="11">
            Asc {chart.ascendant.sign} {chart.ascendant.degree.toFixed(1)}°
          </text>
        )}
      </svg>
      {caption && <figcaption className="text-xs text-[var(--color-muted-fg)]">{caption}</figcaption>}
    </figure>
  );
}

export function BiWheel({
  inner,
  outer,
  innerLabel,
  outerLabel,
}: {
  inner: NatalChart;
  outer: NatalChart;
  innerLabel: string;
  outerLabel: string;
}) {
  const cx = 170;
  const cy = 170;
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 340 340" className="w-full max-w-[420px]" role="img" aria-label={`Synastry bi-wheel, ${innerLabel} inside, ${outerLabel} outside`}>
        <circle cx={cx} cy={cy} r={164} fill="var(--color-surface)" stroke="var(--color-border)" />
        {Array.from({ length: 12 }, (_, index) => {
          const edge = polar(cx, cy, 164, index * 30);
          const label = polar(cx, cy, 150, index * 30 + 15);
          return (
            <g key={index}>
              <line x1={cx} y1={cy} x2={edge.x} y2={edge.y} stroke="var(--color-border-subtle)" />
              <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle" fill="var(--champagne-gold)" fontSize="12">
                {GLYPH[["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][index]]}
              </text>
            </g>
          );
        })}
        <WheelRing chart={outer} radius={128} glyphRadius={118} cx={cx} cy={cy} />
        <WheelRing chart={inner} radius={78} glyphRadius={62} cx={cx} cy={cy} />
      </svg>
      <figcaption className="text-xs text-[var(--color-muted-fg)]">
        Inner: {innerLabel}. Outer: {outerLabel}. Whole-sign houses follow the inner ascendant when it is known.
      </figcaption>
    </figure>
  );
}
