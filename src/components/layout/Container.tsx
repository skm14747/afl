import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  size?: "reading" | "standard" | "wide" | "full";
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const sizeStyles = {
  reading: "max-w-[var(--container-reading)]",
  standard: "max-w-[var(--container-standard)]",
  wide: "max-w-[var(--container-wide)]",
  full: "max-w-full",
};

export function Container({ children, size = "standard", className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto px-4 md:px-6 w-full", sizeStyles[size], className)}
    >
      {children}
    </Tag>
  );
}
