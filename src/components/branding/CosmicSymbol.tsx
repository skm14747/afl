"use client";

import React from "react";

interface CosmicSymbolProps {
  size?: number;
  variant?: "gold" | "light" | "dark" | "mono";
  className?: string;
}

export function CosmicSymbol({ size = 48, variant = "gold", className = "" }: CosmicSymbolProps) {
  const colors = {
    gold: { star: "#D8AF79", line: "#D8AF79", orbit: "#B9A9C9", glow: "#D8AF79" },
    light: { star: "#17152D", line: "#17152D", orbit: "#392544", glow: "#B9A9C9" },
    dark: { star: "#F6F0E9", line: "#F6F0E9", orbit: "#B9A9C9", glow: "#D8AF79" },
    mono: { star: "currentColor", line: "currentColor", orbit: "currentColor", glow: "currentColor" },
  };

  const c = colors[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer orbital ring */}
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="28"
        stroke={c.orbit}
        strokeWidth="0.5"
        opacity="0.4"
      />
      {/* Inner orbital arc */}
      <path
        d="M12 32 C12 20, 20 12, 32 12"
        stroke={c.orbit}
        strokeWidth="0.5"
        opacity="0.3"
        fill="none"
      />
      <path
        d="M52 32 C52 44, 44 52, 32 52"
        stroke={c.orbit}
        strokeWidth="0.5"
        opacity="0.3"
        fill="none"
      />

      {/* Constellation lines forming subtle heart */}
      <path
        d="M22 26 L28 22 L32 28 L36 22 L42 26"
        stroke={c.line}
        strokeWidth="0.75"
        opacity="0.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 26 L26 34 L32 40 L38 34 L42 26"
        stroke={c.line}
        strokeWidth="0.75"
        opacity="0.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Connecting line between two main stars */}
      <line
        x1="22"
        y1="26"
        x2="42"
        y2="26"
        stroke={c.line}
        strokeWidth="0.5"
        opacity="0.3"
        strokeDasharray="2 2"
      />

      {/* Star 1 — left soul */}
      <circle cx="22" cy="26" r="2.5" fill={c.star} />
      <circle cx="22" cy="26" r="4" fill={c.glow} opacity="0.15" />

      {/* Star 2 — right soul */}
      <circle cx="42" cy="26" r="2.5" fill={c.star} />
      <circle cx="42" cy="26" r="4" fill={c.glow} opacity="0.15" />

      {/* Heart bottom point */}
      <circle cx="32" cy="40" r="1.5" fill={c.star} opacity="0.8" />

      {/* Small constellation stars */}
      <circle cx="28" cy="22" r="1" fill={c.star} opacity="0.7" />
      <circle cx="36" cy="22" r="1" fill={c.star} opacity="0.7" />
      <circle cx="26" cy="34" r="0.8" fill={c.star} opacity="0.5" />
      <circle cx="38" cy="34" r="0.8" fill={c.star} opacity="0.5" />
      <circle cx="32" cy="28" r="1" fill={c.star} opacity="0.6" />

      {/* Tiny accent stars */}
      <circle cx="16" cy="18" r="0.5" fill={c.star} opacity="0.3" />
      <circle cx="48" cy="18" r="0.5" fill={c.star} opacity="0.3" />
      <circle cx="32" cy="48" r="0.5" fill={c.star} opacity="0.3" />
      <circle cx="14" cy="38" r="0.4" fill={c.star} opacity="0.2" />
      <circle cx="50" cy="38" r="0.4" fill={c.star} opacity="0.2" />
    </svg>
  );
}
