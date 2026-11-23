import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function DisplayHeading({ children, className, as: Tag = "h1" }: TypographyProps) {
  return (
    <Tag
      className={cn("leading-[var(--leading-display)] tracking-[var(--tracking-tight)]", className)}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-display-1)",
        fontWeight: 600,
      }}
    >
      {children}
    </Tag>
  );
}

export function DisplayHeading2({ children, className, as: Tag = "h2" }: TypographyProps) {
  return (
    <Tag
      className={cn("leading-[var(--leading-display)] tracking-[var(--tracking-tight)]", className)}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-display-2)",
        fontWeight: 600,
      }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ children, className, as: Tag = "h2" }: TypographyProps) {
  return (
    <Tag
      className={cn("leading-[var(--leading-heading)]", className)}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-h2)",
        fontWeight: 600,
      }}
    >
      {children}
    </Tag>
  );
}

export function Heading3({ children, className, as: Tag = "h3" }: TypographyProps) {
  return (
    <Tag
      className={cn("leading-[var(--leading-heading)]", className)}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-h3)",
        fontWeight: 500,
      }}
    >
      {children}
    </Tag>
  );
}

export function Heading4({ children, className, as: Tag = "h4" }: TypographyProps) {
  return (
    <Tag
      className={cn("leading-[var(--leading-heading)]", className)}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-h4)",
        fontWeight: 500,
      }}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        "uppercase tracking-[var(--tracking-wider)] text-[var(--color-muted-fg)]",
        className
      )}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-overline)",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

export function BodyText({
  children,
  className,
  size = "base",
}: TypographyProps & { size?: "lg" | "base" | "sm" }) {
  const fontSize = {
    lg: "var(--text-body-lg)",
    base: "var(--text-body)",
    sm: "var(--text-body-sm)",
  }[size];

  return (
    <p
      className={cn("leading-[var(--leading-body)]", className)}
      style={{ fontFamily: "var(--font-body)", fontSize }}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className }: TypographyProps) {
  return (
    <span
      className={cn("text-[var(--color-muted-fg)]", className)}
      style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)" }}
    >
      {children}
    </span>
  );
}

export function Metadata({ children, className }: TypographyProps) {
  return (
    <span
      className={cn("text-[var(--color-muted-fg)]", className)}
      style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)" }}
    >
      {children}
    </span>
  );
}
