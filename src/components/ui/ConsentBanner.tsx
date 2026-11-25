"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "afl.analytics-consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setVisible(stored !== "granted" && stored !== "denied");
  }, []);

  if (!visible) return null;

  function choose(value: "granted" | "denied") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-4 py-3 shadow-lg">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-xs leading-relaxed text-[var(--neutral-300)]">
          We use cookies and analytics to improve your experience. No personal
          birth data is ever collected — all calculations stay in your browser.
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-lg bg-[var(--crimson-love)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--primary-600)]"
          >
            Allow
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-lg border border-[var(--color-border-subtle)] px-4 py-2 text-xs font-medium text-[var(--neutral-300)] transition-colors hover:border-[var(--cosmic-rose)]"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
