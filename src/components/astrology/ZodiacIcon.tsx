"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ZODIAC_SYMBOLS, ZODIAC_ELEMENTS, ELEMENT_COLORS, type ZodiacSign } from "@/lib/astrology-data";

interface ZodiacIconProps {
  sign: ZodiacSign;
  size?: "sm" | "md" | "lg";
  showElement?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: { container: "w-8 h-8", text: "text-base" },
  md: { container: "w-12 h-12", text: "text-xl" },
  lg: { container: "w-16 h-16", text: "text-3xl" },
};

export function ZodiacIcon({ sign, size = "md", showElement = false, className }: ZodiacIconProps) {
  const s = sizeStyles[size];
  const element = ZODIAC_ELEMENTS[sign];
  const elementColor = ELEMENT_COLORS[element];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        "border border-[var(--color-border)]",
        s.container,
        className
      )}
      style={{ borderColor: showElement ? elementColor : undefined }}
      title={`${sign} — ${element}`}
      aria-label={sign}
    >
      <span className={s.text} role="img" aria-hidden="true">
        {ZODIAC_SYMBOLS[sign]}
      </span>
    </div>
  );
}
