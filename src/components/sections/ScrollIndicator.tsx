"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center gap-2 text-[var(--ivory)]/50 hover:text-[var(--champagne-gold)] transition-colors duration-300 cursor-pointer",
        className
      )}
      aria-label="Scroll to content"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
        Explore
      </span>
      <ChevronDown className="w-4 h-4 animate-float" />
    </button>
  );
}
