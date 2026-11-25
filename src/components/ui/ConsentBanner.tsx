"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "afl.cookie-consent";

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentPreferences {
  necessary: true; // always on
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: "",
};

/** Read stored consent preferences, or null if not yet set. */
export function getConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

/** Check if a specific category has been consented to. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const prefs = getConsentPreferences();
  if (!prefs) return false;
  return prefs[category] === true;
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = getConsentPreferences();
    setVisible(!stored);
  }, []);

  const save = useCallback(
    (prefs: Omit<ConsentPreferences, "necessary" | "timestamp">) => {
      const consent: ConsentPreferences = {
        necessary: true,
        analytics: prefs.analytics,
        marketing: prefs.marketing,
        timestamp: new Date().toISOString(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      setVisible(false);

      // Dispatch a custom event so analytics scripts can react
      window.dispatchEvent(
        new CustomEvent("consent-updated", { detail: consent }),
      );
    },
    [],
  );

  const acceptAll = useCallback(
    () => save({ analytics: true, marketing: true }),
    [save],
  );

  const rejectAll = useCallback(
    () => save({ analytics: false, marketing: false }),
    [save],
  );

  const saveCustom = useCallback(
    () => save({ analytics, marketing }),
    [save, analytics, marketing],
  );

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-4 py-4 shadow-lg"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4">
          {/* Main message */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Cookie Preferences</p>
              <p className="max-w-2xl text-xs leading-relaxed text-[var(--neutral-300)]">
                We use cookies to improve your experience. All astrological
                calculations stay in your browser — no personal birth data is
                ever collected or sent to our servers.
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-lg bg-[var(--crimson-love)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--primary-600)]"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-lg border border-[var(--color-border-subtle)] px-4 py-2 text-xs font-medium text-[var(--neutral-300)] transition-colors hover:border-[var(--cosmic-rose)]"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="rounded-lg border border-[var(--color-border-subtle)] px-4 py-2 text-xs font-medium text-[var(--neutral-300)] transition-colors hover:border-[var(--cosmic-rose)]"
              >
                {showDetails ? "Hide" : "Customize"}
              </button>
            </div>
          </div>

          {/* Detailed category selection */}
          {showDetails && (
            <div className="border-t border-[var(--color-border-subtle)] pt-4 space-y-3">
              {/* Necessary — always on */}
              <label className="flex items-center gap-3 text-xs">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="accent-[var(--crimson-love)] w-4 h-4 rounded"
                />
                <span className="flex-1">
                  <span className="font-medium text-[var(--color-fg)]">
                    Necessary
                  </span>
                  <span className="block text-[var(--neutral-400)] mt-0.5">
                    Essential for the site to function. Includes consent
                    preferences and language selection. Cannot be disabled.
                  </span>
                </span>
              </label>

              {/* Analytics */}
              <label className="flex items-center gap-3 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="accent-[var(--crimson-love)] w-4 h-4 rounded"
                />
                <span className="flex-1">
                  <span className="font-medium text-[var(--color-fg)]">
                    Analytics
                  </span>
                  <span className="block text-[var(--neutral-400)] mt-0.5">
                    Helps us understand which pages and tools are used most, so
                    we can improve them. No personal data is collected.
                  </span>
                </span>
              </label>

              {/* Marketing */}
              <label className="flex items-center gap-3 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="accent-[var(--crimson-love)] w-4 h-4 rounded"
                />
                <span className="flex-1">
                  <span className="font-medium text-[var(--color-fg)]">
                    Marketing
                  </span>
                  <span className="block text-[var(--neutral-400)] mt-0.5">
                    Used for anonymous attribution to understand how visitors
                    find the site. No personal data is shared with third
                    parties.
                  </span>
                </span>
              </label>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={saveCustom}
                  className="rounded-lg bg-[var(--crimson-love)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--primary-600)]"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
