"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ZODIAC_SIGNS, ZODIAC_SYMBOLS, ZODIAC_ELEMENTS, type ZodiacSign } from "@/lib/astrology-data";

interface ZodiacSelectorProps {
  value?: ZodiacSign;
  onChange: (sign: ZodiacSign) => void;
  label?: string;
  className?: string;
}

const elementBg: Record<string, string> = {
  Fire: "bg-[var(--gold-50)] border-[var(--gold-200)] text-[var(--gold-700)]",
  Earth: "bg-[var(--neutral-50)] border-[var(--neutral-300)] text-[var(--neutral-700)]",
  Air: "bg-[var(--secondary-50)] border-[var(--secondary-200)] text-[var(--secondary-700)]",
  Water: "bg-[var(--rose-50)] border-[var(--rose-200)] text-[var(--rose-700)]",
};

const elementBgSelected: Record<string, string> = {
  Fire: "bg-[var(--champagne-gold)] border-[var(--gold-500)] text-[var(--cosmic-navy)]",
  Earth: "bg-[var(--neutral-700)] border-[var(--neutral-800)] text-white",
  Air: "bg-[var(--mystic-plum)] border-[var(--secondary-700)] text-white",
  Water: "bg-[var(--romantic-rose)] border-[var(--rose-500)] text-[var(--cosmic-navy)]",
};

export function ZodiacSelector({ value, onChange, label, className }: ZodiacSelectorProps) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      {label && (
        <legend className="text-sm font-medium text-[var(--color-fg)] mb-1">{label}</legend>
      )}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {ZODIAC_SIGNS.map((sign) => {
          const isSelected = value === sign;
          const element = ZODIAC_ELEMENTS[sign];

          return (
            <button
              key={sign}
              type="button"
              onClick={() => onChange(sign)}
              className={cn(
                "flex flex-col items-center gap-1.5 py-3 px-1.5 rounded-[var(--radius-xl)] border transition-all duration-250 cursor-pointer",
                "hover:shadow-[var(--shadow-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
                isSelected
                  ? cn(elementBgSelected[element], "shadow-[var(--shadow-lg)] scale-105 ring-2 ring-offset-2 ring-[var(--champagne-gold)]/30")
                  : cn(elementBg[element], "hover:scale-[1.04] hover:-translate-y-0.5")
              )}
              aria-pressed={isSelected}
              aria-label={`Select ${sign}`}
            >
              <span className={cn("text-xl transition-transform duration-200", isSelected && "scale-110")}>{ZODIAC_SYMBOLS[sign]}</span>
              <span className="text-[10px] font-semibold leading-tight tracking-wide">{sign}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
