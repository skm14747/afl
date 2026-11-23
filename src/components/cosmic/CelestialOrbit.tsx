import { cn } from "@/lib/utils";

export function CelestialOrbit({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("absolute inset-[6%] animate-orbit-slow", className)}>
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <ellipse
          cx="50"
          cy="50"
          rx="46"
          ry="27"
          fill="none"
          stroke="#F2A9C4"
          strokeOpacity="0.45"
          strokeWidth="0.35"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="34"
          ry="42"
          fill="none"
          stroke="#E45D91"
          strokeOpacity="0.28"
          strokeWidth="0.3"
          transform="rotate(-18 50 50)"
        />
        <circle cx="96" cy="50" r="1.1" fill="#FFF5F5" />
        <circle cx="50" cy="8" r="0.8" fill="#F2A9C4" />
      </svg>
    </div>
  );
}
