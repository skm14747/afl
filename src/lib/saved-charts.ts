import type { BirthDetails } from "./astro-engine";

export interface SavedChart {
  id: string;
  name: string;
  details: BirthDetails;
}

const KEY = "afl-saved-charts";
const EVENT = "afl-saved-charts-change";

function notify() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}

export function loadSavedCharts(): SavedChart[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedChart[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveChart(name: string, details: BirthDetails): SavedChart[] {
  const next = [
    { id: `${Date.now()}`, name: name.trim() || "Untitled chart", details },
    ...loadSavedCharts(),
  ].slice(0, 20);
  window.localStorage.setItem(KEY, JSON.stringify(next));
  notify();
  return next;
}

export function deleteSavedChart(id: string): SavedChart[] {
  const next = loadSavedCharts().filter((chart) => chart.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(next));
  notify();
  return next;
}

export function subscribeSavedCharts(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

export function savedChartsSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(KEY) ?? "[]";
}
