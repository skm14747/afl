"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BiWheel, ChartWheel } from "@/components/astrology/ChartWheel";
import {
  calculateAspects,
  calculateNatalChart,
  compositeChart,
  davisonDetails,
  houseOverlays,
  transitAspects,
  type BirthDetails,
  type CompatibilityResult,
  type NatalChart,
} from "@/lib/astro-engine";
import { describeAspect } from "@/lib/aspect-copy";

interface SynastryReportProps {
  chartA: NatalChart;
  chartB: NatalChart;
  detailsA: BirthDetails;
  detailsB: BirthDetails;
  result: CompatibilityResult;
}

export function SynastryReport({ chartA, chartB, detailsA, detailsB, result }: SynastryReportProps) {
  const [orbFactor, setOrbFactor] = useState(1);
  const [showMinor, setShowMinor] = useState(false);
  const aspects = useMemo(
    () => calculateAspects(chartA, chartB, { includeMinor: showMinor, orbFactor }),
    [chartA, chartB, showMinor, orbFactor],
  );
  const overlaysA = houseOverlays(chartA, chartB);
  const overlaysB = houseOverlays(chartB, chartA);
  const composite = useMemo(() => compositeChart(chartA, chartB), [chartA, chartB]);
  const davison = useMemo(() => {
    const details = davisonDetails(detailsA, detailsB);
    return details ? calculateNatalChart(details) : null;
  }, [detailsA, detailsB]);
  const transitsA = useMemo(() => transitAspects(chartA).slice(0, 8), [chartA]);
  const transitsB = useMemo(() => transitAspects(chartB).slice(0, 8), [chartB]);
  const transitsComposite = useMemo(() => transitAspects(composite).slice(0, 6), [composite]);

  return (
    <div className="print-results mt-10 flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <ChartWheel chart={chartA} caption="Person A" />
        <ChartWheel chart={chartB} caption="Person B" />
      </div>
      <BiWheel inner={chartA} outer={chartB} innerLabel="Person A" outerLabel="Person B" />

      <div className="no-print max-w-xl mx-auto flex flex-col gap-3">
        <label className="text-sm" htmlFor="orb-factor">
          Orb scale {orbFactor.toFixed(2)} — the headline scores stay on the default major-aspect orbs.
        </label>
        <input
          id="orb-factor"
          type="range"
          min={0.5}
          max={1.5}
          step={0.05}
          value={orbFactor}
          onChange={(event) => setOrbFactor(Number(event.target.value))}
        />
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={showMinor} onChange={(event) => setShowMinor(event.target.checked)} />
          Include minor aspects
        </label>
      </div>

      {(overlaysA.length > 0 || overlaysB.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <OverlayList title="Person A in Person B’s houses" hits={overlaysA} />
          <OverlayList title="Person B in Person A’s houses" hits={overlaysB} />
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <h3 className="text-center mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}>
          Aspect readings ({aspects.length})
        </h3>
        <Card variant="default" padding="sm">
          <div className="divide-y divide-[var(--color-border-subtle)] max-h-[32rem] overflow-y-auto">
            {aspects.map((aspect, index) => (
              <div key={`${aspect.planet1}-${aspect.aspect}-${aspect.planet2}-${index}`} className="py-3 px-3 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{aspect.planet1} {aspect.aspect} {aspect.planet2}</span>
                  <Badge variant={aspect.nature === "harmonious" ? "success" : aspect.nature === "challenging" ? "warning" : "default"} size="sm">
                    {aspect.orb.toFixed(1)}°
                  </Badge>
                </div>
                <p className="mt-1 text-[var(--color-muted-fg)]">{describeAspect(aspect)}</p>
              </div>
            ))}
          </div>
        </Card>
        <p className="mt-3 text-xs text-[var(--color-muted-fg)] text-center">
          Score {result.overall} uses the default major aspects only.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-center mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}>
          Composite chart
        </h3>
        <ChartWheel chart={composite} caption="Midpoint composite" />
      </div>

      {davison && (
        <div className="max-w-3xl mx-auto">
          <h3 className="text-center mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}>
            Davison chart
          </h3>
          <ChartWheel chart={davison} caption="Midpoint in time and place" />
        </div>
      )}

      <TransitList title="Transits to Person A" aspects={transitsA} />
      <TransitList title="Transits to Person B" aspects={transitsB} />
      <TransitList title="Transits to the composite" aspects={transitsComposite} />
    </div>
  );
}

function OverlayList({ title, hits }: { title: string; hits: { planet: string; house: number }[] }) {
  if (hits.length === 0) return null;
  return (
    <Card variant="default" padding="md">
      <h3 className="mb-3 font-medium" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      <ul className="text-sm space-y-1">
        {hits.map((hit) => (
          <li key={hit.planet}>
            {hit.planet} in house {hit.house}
            {hit.house === 7 ? " — partnership house" : ""}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function TransitList({ title, aspects }: { title: string; aspects: { planet1: string; aspect: string; planet2: string; orb: number }[] }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="mb-3 font-medium" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      <ul className="text-sm space-y-1 text-[var(--color-muted-fg)]">
        {aspects.map((aspect, index) => (
          <li key={index}>{aspect.planet1} {aspect.aspect} {aspect.planet2} ({aspect.orb.toFixed(1)}°)</li>
        ))}
      </ul>
    </div>
  );
}
