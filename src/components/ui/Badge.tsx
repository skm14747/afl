import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "rose" | "cosmic" | "success" | "warning" | "error";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  default: "bg-[var(--color-muted)] text-[var(--color-muted-fg)]",
  gold: "bg-[var(--gold-100)] text-[var(--gold-800)]",
  rose: "bg-[var(--rose-100)] text-[var(--rose-800)]",
  cosmic: "bg-[var(--primary-100)] text-[var(--primary-800)]",
  success: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-[var(--radius-full)]",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
