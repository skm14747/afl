import { cn } from "@/lib/utils";
import { CelestialOrbit } from "./CelestialOrbit";
import { ConnectedStars } from "./ConnectedStars";
import { CosmicGlow } from "./CosmicGlow";
import { HeartNebula } from "./HeartNebula";
import { StarField } from "./StarField";

export function CosmicHeartMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full w-full", className)} aria-hidden="true">
      <HeartNebula />
      <CelestialOrbit />
      <div className="absolute inset-[20%]">
        <ConnectedStars />
      </div>
    </div>
  );
}

export function CosmicHeartBackground({
  className,
  intensity = "full",
  heart = "none",
}: {
  className?: string;
  intensity?: "full" | "quiet";
  heart?: "aside" | "corner" | "none";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <StarField sparse={intensity === "quiet"} />
      <CosmicGlow
        className="-top-24 left-[6%]"
        color="var(--cosmic-rose)"
        size={intensity === "full" ? 520 : 300}
      />
      <CosmicGlow
        className="-bottom-28 right-[4%]"
        color="var(--crimson-love)"
        size={intensity === "full" ? 420 : 240}
      />
      {heart === "aside" && (
        <div className="absolute top-1/2 right-[-8%] h-[min(520px,78vh)] w-[min(520px,70vw)] -translate-y-1/2 opacity-80">
          <CosmicHeartMark />
        </div>
      )}
      {heart === "corner" && (
        <div className="absolute -top-10 -right-10 h-56 w-56 opacity-70">
          <CosmicHeartMark />
        </div>
      )}
    </div>
  );
}
