import { useId } from "react";
import { cn } from "@/lib/utils";

const HEART =
  "M100 168 C 48 124 12 96 12 58 C 12 32 32 14 56 14 C 76 14 90 26 100 42 C 110 26 124 14 144 14 C 168 14 188 32 188 58 C 188 96 152 124 100 168 Z";

export function HeartNebula({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      viewBox="0 0 200 184"
    >
      <defs>
        <radialGradient id={`${id}-fill`} cx="50%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#F2A9C4" stopOpacity="0.85" />
          <stop offset="38%" stopColor="#E45D91" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#B52D52" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#54152F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={HEART} fill={`url(#${id}-fill)`} />
      <path
        d={HEART}
        fill="none"
        stroke="#F9DCE8"
        strokeOpacity="0.35"
        strokeWidth="0.6"
      />
      <circle cx="68" cy="48" r="1.1" fill="#FFF5F5" opacity="0.8" />
      <circle cx="132" cy="44" r="0.8" fill="#FFF5F5" opacity="0.65" />
      <circle cx="100" cy="78" r="1.3" fill="#FFFCFC" opacity="0.9" />
      <circle cx="86" cy="112" r="0.7" fill="#F2A9C4" opacity="0.7" />
      <circle cx="118" cy="124" r="0.6" fill="#FFF5F5" opacity="0.5" />
    </svg>
  );
}
