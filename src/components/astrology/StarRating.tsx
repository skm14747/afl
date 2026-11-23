import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}

export function StarRating({ rating, max = 5, size = "md", label, className }: StarRatingProps) {
  const iconSize = size === "sm" ? 14 : 18;

  return (
    <div className={cn("flex items-center gap-2", className)} aria-label={`${rating} out of ${max} stars`}>
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            size={iconSize}
            className={cn(
              i < rating
                ? "fill-[var(--champagne-gold)] text-[var(--champagne-gold)]"
                : "text-[var(--neutral-300)]"
            )}
          />
        ))}
      </div>
      {label && <span className="text-xs text-[var(--color-muted-fg)]">{label}</span>}
    </div>
  );
}
