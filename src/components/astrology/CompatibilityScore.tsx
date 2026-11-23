"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ZodiacIcon } from "./ZodiacIcon";
import { CompatibilityMeter } from "./CompatibilityMeter";
import type { ZodiacSign } from "@/lib/astrology-data";

interface CompatibilityScoreProps {
  sign1: ZodiacSign;
  sign2: ZodiacSign;
  overallScore: number;
  categories?: {
    label: string;
    score: number;
  }[];
  summary?: string;
  className?: string;
}

export function CompatibilityScore({
  sign1,
  sign2,
  overallScore,
  categories,
  summary,
  className,
}: CompatibilityScoreProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] p-6 md:p-8",
        className
      )}
    >
      {/* Header with signs and score */}
      <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
        <div className="flex flex-col items-center gap-2">
          <ZodiacIcon sign={sign1} size="lg" showElement />
          <span className="text-sm font-medium">{sign1}</span>
        </div>

        <div className="relative">
          <CompatibilityMeter score={overallScore} size="lg" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <ZodiacIcon sign={sign2} size="lg" showElement />
          <span className="text-sm font-medium">{sign2}</span>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <p className="text-center text-[var(--color-muted-fg)] mb-8 max-w-lg mx-auto leading-relaxed">
          {summary}
        </p>
      )}

      {/* Category breakdown */}
      {categories && categories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.label} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{cat.label}</span>
                  <span className="text-xs text-[var(--color-muted-fg)]">{cat.score}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--color-muted)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${cat.score}%`,
                      backgroundColor:
                        cat.score >= 80
                          ? "var(--champagne-gold)"
                          : cat.score >= 60
                            ? "var(--lavender-mist)"
                            : "var(--romantic-rose)",
                      transitionDuration: "var(--transition-slow)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
