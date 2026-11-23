import { cn } from "@/lib/utils";

export function CosmicGlow({
  className,
  color = "var(--cosmic-rose)",
  size = 420,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute rounded-full pointer-events-none blur-3xl animate-nebula", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.22,
      }}
    />
  );
}
