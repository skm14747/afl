"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CompatibilityMeterProps {
  score: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CompatibilityMeter({ score, label, size = "md", className }: CompatibilityMeterProps) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (clampedScore / 100) * circumference;

  const dimensions = { sm: 80, md: 120, lg: 160 };
  const dim = dimensions[size];

  const scoreColor =
    clampedScore >= 80
      ? "var(--champagne-gold)"
      : clampedScore >= 60
        ? "var(--lavender-mist)"
        : clampedScore >= 40
          ? "var(--romantic-rose)"
          : "var(--neutral-400)";

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={dim} height={dim} viewBox="0 0 100 100" className="-rotate-90">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="var(--color-border-subtle)"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={scoreColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all"
          style={{ transitionDuration: "var(--transition-slow)" }}
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ width: dim, height: dim }}
      >
        <span
          className="font-bold text-[var(--color-fg)]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: size === "lg" ? "2rem" : size === "md" ? "1.5rem" : "1.125rem",
          }}
        >
          {clampedScore}%
        </span>
      </div>
      {label && (
        <span className="mt-2 text-xs text-[var(--color-muted-fg)] text-center">{label}</span>
      )}
    </div>
  );
}
