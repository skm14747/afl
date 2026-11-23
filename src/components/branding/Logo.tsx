"use client";

import React from "react";
import { CosmicSymbol } from "./CosmicSymbol";

interface LogoProps {
  variant?: "horizontal" | "symbol" | "wordmark";
  theme?: "gold" | "light" | "dark" | "mono";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

const sizes = {
  sm: { symbol: 32, wordmark: "text-lg", tagline: "text-xs" },
  md: { symbol: 44, wordmark: "text-xl", tagline: "text-xs" },
  lg: { symbol: 56, wordmark: "text-2xl", tagline: "text-sm" },
};

export function Logo({
  variant = "horizontal",
  theme = "gold",
  size = "md",
  showTagline = false,
  className = "",
}: LogoProps) {
  const s = sizes[size];

  const wordmarkColor = {
    gold: "text-[var(--champagne-gold)]",
    light: "text-[var(--cosmic-navy)]",
    dark: "text-[var(--ivory)]",
    mono: "",
  }[theme];

  const taglineColor = {
    gold: "text-[var(--lavender-mist)]",
    light: "text-[var(--neutral-500)]",
    dark: "text-[var(--neutral-300)]",
    mono: "opacity-60",
  }[theme];

  if (variant === "symbol") {
    return <CosmicSymbol size={s.symbol} variant={theme} className={className} />;
  }

  if (variant === "wordmark") {
    return (
      <div className={`flex flex-col ${className}`}>
        <span
          className={`font-[var(--font-display)] font-semibold tracking-wide ${s.wordmark} ${wordmarkColor}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          AstrologyForLove
        </span>
        {showTagline && (
          <span
            className={`${taglineColor} ${s.tagline} tracking-widest uppercase mt-1`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Written in the Stars. Felt in the Heart.
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <CosmicSymbol size={s.symbol} variant={theme} />
      <div className="flex flex-col">
        <span
          className={`font-semibold tracking-wide ${s.wordmark} ${wordmarkColor}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          AstrologyForLove
        </span>
        {showTagline && (
          <span
            className={`${taglineColor} ${s.tagline} tracking-widest uppercase mt-0.5`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Written in the Stars. Felt in the Heart.
          </span>
        )}
      </div>
    </div>
  );
}
