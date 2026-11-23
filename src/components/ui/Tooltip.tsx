"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
  className?: string;
}

export function Tooltip({ content, children, position = "top", className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-2.5 py-1.5 text-xs font-medium rounded-[var(--radius-lg)]",
            "bg-[var(--cosmic-navy)] text-white shadow-[var(--shadow-md)]",
            "whitespace-nowrap pointer-events-none",
            position === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
            position === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2"
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
