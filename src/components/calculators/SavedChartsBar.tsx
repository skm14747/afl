"use client";

import React, { useSyncExternalStore } from "react";
import type { BirthDetails } from "@/lib/astro-engine";
import {
  deleteSavedChart,
  saveChart,
  savedChartsSnapshot,
  subscribeSavedCharts,
  type SavedChart,
} from "@/lib/saved-charts";

interface SavedChartsBarProps {
  details: BirthDetails;
  onLoad: (details: BirthDetails) => void;
}

export function SavedChartsBar({ details, onLoad }: SavedChartsBarProps) {
  const raw = useSyncExternalStore(subscribeSavedCharts, savedChartsSnapshot, () => "[]");
  const charts = JSON.parse(raw) as SavedChart[];
  const [name, setName] = React.useState("");

  return (
    <div className="no-print flex flex-col gap-2 text-sm">
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name this chart"
          aria-label="Name this chart"
          className="flex-1 px-3 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--color-input-bg)] border border-[var(--color-input)]"
        />
        <button
          type="button"
          className="px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)]"
          onClick={() => {
            if (!details.date) return;
            saveChart(name, details);
            setName("");
          }}
        >
          Save on this device
        </button>
      </div>
      {charts.length > 0 && (
        <ul className="flex flex-col gap-1">
          {charts.map((chart) => (
            <li key={chart.id} className="flex items-center justify-between gap-2">
              <button type="button" className="text-left hover:text-[var(--champagne-gold)]" onClick={() => onLoad(chart.details)}>
                {chart.name}
              </button>
              <button
                type="button"
                className="text-xs text-[var(--color-muted-fg)]"
                onClick={() => deleteSavedChart(chart.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
