"use client";

import React, { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BirthDetailsForm } from "@/components/calculators/BirthDetailsForm";
import { ResultsSection, FAQSection, RelatedTools } from "@/components/calculators/ResultsSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChartWheel } from "@/components/astrology/ChartWheel";
import {
  birthDetailsToDate,
  calculateNatalChart,
  type BirthDetails,
  type NatalChart,
  type PlanetPosition,
} from "@/lib/astro-engine";
import {
  NAKSHATRAS,
  nakshatraIndex,
  nakshatraPada,
  navamsaSign,
  siderealLongitude,
  signFromLongitude,
  vimshottariDashas,
  type Nakshatra,
} from "@/lib/chart-math";
import { ashtakoota, mangalDosha, tenPorutham } from "@/lib/guna";
import type { ZodiacSign } from "@/lib/astrology-data";

interface SiderealPerson {
  moonSign: ZodiacSign;
  marsSign: ZodiacSign;
  lagna?: ZodiacSign;
  star: Nakshatra;
  pada: number;
  chart: NatalChart;
  dasha: ReturnType<typeof vimshottariDashas>;
  navamsaMoon: ZodiacSign;
}

function siderealPerson(details: BirthDetails): SiderealPerson {
  const chart = calculateNatalChart(details);
  const when = birthDetailsToDate(details);
  const moonLon = siderealLongitude(chart.moon.longitude, when);
  const marsLon = siderealLongitude(chart.mars.longitude, when);
  const star = NAKSHATRAS[nakshatraIndex(moonLon)];
  let lagna: ZodiacSign | undefined;
  if (chart.ascendant) {
    lagna = signFromLongitude(siderealLongitude(chart.ascendant.longitude, when)).sign;
  }
  return {
    moonSign: signFromLongitude(moonLon).sign,
    marsSign: signFromLongitude(marsLon).sign,
    lagna,
    star,
    pada: nakshatraPada(moonLon),
    chart,
    dasha: vimshottariDashas(moonLon, when),
    navamsaMoon: navamsaSign(moonLon),
  };
}

function siderealWheel(chart: NatalChart, when: Date): NatalChart {
  const shift = (body: PlanetPosition): PlanetPosition => {
    const longitude = siderealLongitude(body.longitude, when);
    return { ...body, longitude, ...signFromLongitude(longitude) };
  };
  return {
    ...chart,
    sun: shift(chart.sun),
    moon: shift(chart.moon),
    mercury: shift(chart.mercury),
    venus: shift(chart.venus),
    mars: shift(chart.mars),
    jupiter: shift(chart.jupiter),
    saturn: shift(chart.saturn),
    uranus: shift(chart.uranus),
    neptune: shift(chart.neptune),
    pluto: shift(chart.pluto),
    ascendant: chart.ascendant ? shift(chart.ascendant) : undefined,
    northNode: chart.northNode ? shift(chart.northNode) : undefined,
  };
}

export default function KundliMatchingPage() {
  const [bride, setBride] = useState<Partial<BirthDetails>>({});
  const [groom, setGroom] = useState<Partial<BirthDetails>>({});
  const [result, setResult] = useState<{ bride: SiderealPerson; groom: SiderealPerson; brideWhen: Date; groomWhen: Date } | null>(null);
  const [errors, setErrors] = useState<{ a: Record<string, string>; b: Record<string, string> }>({ a: {}, b: {} });

  const handleCalculate = () => {
    const errA: Record<string, string> = {};
    const errB: Record<string, string> = {};
    if (!bride.date) errA.date = "Required";
    if (!groom.date) errB.date = "Required";
    if (Object.keys(errA).length || Object.keys(errB).length) {
      setErrors({ a: errA, b: errB });
      return;
    }
    setErrors({ a: {}, b: {} });
    const brideDetails = bride as BirthDetails;
    const groomDetails = groom as BirthDetails;
    setResult({
      bride: siderealPerson(brideDetails),
      groom: siderealPerson(groomDetails),
      brideWhen: birthDetailsToDate(brideDetails),
      groomWhen: birthDetailsToDate(groomDetails),
    });
  };

  const guna = result
    ? ashtakoota(result.bride.moonSign, result.bride.star, result.groom.moonSign, result.groom.star)
    : null;
  const brideMangal = result ? mangalDosha(result.bride.marsSign, result.bride.lagna) : null;
  const groomMangal = result ? mangalDosha(result.groom.marsSign, result.groom.lagna) : null;
  const porutham = result
    ? tenPorutham(result.bride.moonSign, result.bride.star, result.groom.moonSign, result.groom.star)
    : null;
  const bothManglik = Boolean(brideMangal?.manglik && groomMangal?.manglik && !brideMangal.cancelled && !groomMangal.cancelled);

  return (
    <CalculatorShell
      title="Kundli Matching"
      subtitle="Vedic marriage match"
      description="Ashtakoota, Mangal dosha, and the ten poruthams from the Lahiri sidereal zodiac. This is not the tropical marriage score."
      icon={<span className="text-[var(--champagne-gold)] text-xl">☽</span>}
    >
      <p className="max-w-2xl mx-auto text-center text-sm text-[var(--color-muted-fg)] mb-8">
        Person A is read as the bride and Person B as the groom, because several kootas are directional.
        A birth time and city are required for Mangal dosha from the lagna. The Moon nakshatra can be judged from the date alone, with less certainty if the time is missing.
      </p>
      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BirthDetailsForm label="Bride" value={bride} onChange={setBride} showTime showLocation errors={errors.a} />
            <BirthDetailsForm label="Groom" value={groom} onChange={setGroom} showTime showLocation errors={errors.b} />
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="secondary" size="lg" onClick={handleCalculate}>Match kundlis</Button>
          </div>
        </Card>
      </div>

      {result && guna && porutham && brideMangal && groomMangal && (
        <ResultsSection title="Vedic match">
          <p className="text-center text-sm mb-6">
            {guna.total} / {guna.max} guna. {porutham.filter((row) => row.pass).length} of 10 poruthams pass.
            {bothManglik ? " Both charts carry Mangal dosha, which cancels for the match." : ""}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <ChartWheel chart={siderealWheel(result.bride.chart, result.brideWhen)} caption={`Bride · ${result.bride.star} pada ${result.bride.pada}`} />
            <ChartWheel chart={siderealWheel(result.groom.chart, result.groomWhen)} caption={`Groom · ${result.groom.star} pada ${result.groom.pada}`} />
          </div>
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <th className="text-left py-2">Koota</th>
                  <th className="text-right py-2">Points</th>
                  <th className="text-left py-2 pl-4">Note</th>
                </tr>
              </thead>
              <tbody>
                {guna.kootas.map((koota) => (
                  <tr key={koota.name} className="border-b border-[var(--color-border-subtle)]">
                    <td className="py-2">{koota.name}</td>
                    <td className="py-2 text-right">{koota.points} / {koota.max}</td>
                    <td className="py-2 pl-4 text-[var(--color-muted-fg)]">{koota.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mt-8">
            <Card variant="default" padding="md">
              <h3 className="font-medium mb-2">Bride Mangal</h3>
              <p className="text-sm text-[var(--color-muted-fg)]">{brideMangal.note}</p>
            </Card>
            <Card variant="default" padding="md">
              <h3 className="font-medium mb-2">Groom Mangal</h3>
              <p className="text-sm text-[var(--color-muted-fg)]">{groomMangal.note}</p>
            </Card>
          </div>
          <div className="max-w-3xl mx-auto mt-8">
            <h3 className="mb-3" style={{ fontFamily: "var(--font-display)" }}>Ten poruthams</h3>
            <ul className="text-sm space-y-1">
              {porutham.map((row) => (
                <li key={row.name}>{row.pass ? "Pass" : "Fail"} — {row.name}. {row.note}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
            <Card variant="default" padding="md">
              <h3 className="font-medium mb-2">Bride Navamsa Moon: {result.bride.navamsaMoon}</h3>
              <h3 className="font-medium mb-2">Vimshottari from birth</h3>
              <ul className="text-sm space-y-1">
                {result.bride.dasha.map((period) => (
                  <li key={period.lord}>{period.lord} · {period.years} years · {period.start} to {period.end}</li>
                ))}
              </ul>
            </Card>
            <Card variant="default" padding="md">
              <h3 className="font-medium mb-2">Groom Navamsa Moon: {result.groom.navamsaMoon}</h3>
              <h3 className="font-medium mb-2">Vimshottari from birth</h3>
              <ul className="text-sm space-y-1">
                {result.groom.dasha.map((period) => (
                  <li key={period.lord}>{period.lord} · {period.years} years · {period.start} to {period.end}</li>
                ))}
              </ul>
            </Card>
          </div>
        </ResultsSection>
      )}

      <FAQSection
        items={[
          {
            question: "Is this the same as the marriage compatibility page?",
            answer: "No. That page is tropical Western synastry. This page uses the Lahiri sidereal zodiac, the 36 guna, Mangal dosha, and the ten poruthams.",
          },
          {
            question: "Which chart is the bride?",
            answer: "Person A is the bride. Varna, Tara, Gana, and Bhakoot change if the charts are swapped.",
          },
        ]}
      />
      <RelatedTools
        tools={[
          { title: "Marriage Compatibility", description: "Tropical Western reading.", href: "/marriage-compatibility" },
          { title: "Composite Chart", description: "Midpoint relationship chart.", href: "/composite-chart" },
        ]}
      />
    </CalculatorShell>
  );
}
