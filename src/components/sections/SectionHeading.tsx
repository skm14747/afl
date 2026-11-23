import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  headline: React.ReactNode;
  body?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  headline,
  body,
  align = "center",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-start";
  const isDark = theme === "dark";

  return (
    <div className={cn(alignClass, className)}>
      {eyebrow && (
        <span
          className={cn(
            "text-xs uppercase tracking-[0.2em] font-semibold block mb-4",
            isDark ? "text-[var(--cosmic-rose)]" : "text-[var(--crimson-love)]"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "underline-gold",
          isDark ? "text-[var(--moonlight-cream)]" : "text-[var(--color-fg)]"
        )}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h2)",
          lineHeight: "var(--leading-heading)",
          fontWeight: 600,
          letterSpacing: "-0.01em",
        }}
      >
        {headline}
      </h2>
      {body && (
        <p
          className={cn(
            "mt-5 leading-relaxed",
            align === "center" && "max-w-xl mx-auto",
            isDark ? "text-[var(--neutral-300)]" : "text-[var(--color-muted-fg)]"
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}
