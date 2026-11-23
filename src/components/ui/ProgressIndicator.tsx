import React from "react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  value: number;
  max?: number;
  variant?: "default" | "gold" | "rose" | "cosmic";
  size?: "sm" | "md";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const trackVariants = {
  default: "bg-[var(--color-muted)]",
  gold: "bg-[var(--gold-100)]",
  rose: "bg-[var(--rose-100)]",
  cosmic: "bg-[var(--primary-100)]",
};

const fillVariants = {
  default: "bg-[var(--color-fg)]",
  gold: "bg-[var(--champagne-gold)]",
  rose: "bg-[var(--romantic-rose)]",
  cosmic: "bg-[var(--cosmic-navy)]",
};

export function ProgressIndicator({
  value,
  max = 100,
  variant = "gold",
  size = "md",
  showLabel = false,
  label,
  className,
}: ProgressIndicatorProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-[var(--color-fg)]">{label}</span>}
          {showLabel && <span className="text-xs text-[var(--color-muted-fg)]">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-[var(--radius-full)] overflow-hidden",
          trackVariants[variant],
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            "h-full rounded-[var(--radius-full)] transition-all",
            fillVariants[variant]
          )}
          style={{ width: `${pct}%`, transitionDuration: "var(--transition-slow)" }}
        />
      </div>
    </div>
  );
}
