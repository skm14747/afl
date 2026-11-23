import { cn } from "@/lib/utils";

const STARS: { x: number; y: number; r: number; o: number; delay: string }[] = [
  { x: 8, y: 18, r: 0.7, o: 0.7, delay: "0s" },
  { x: 16, y: 62, r: 0.4, o: 0.45, delay: "1.2s" },
  { x: 24, y: 34, r: 0.5, o: 0.55, delay: "0.4s" },
  { x: 33, y: 12, r: 0.35, o: 0.4, delay: "2s" },
  { x: 41, y: 78, r: 0.6, o: 0.5, delay: "0.8s" },
  { x: 52, y: 26, r: 0.45, o: 0.65, delay: "1.6s" },
  { x: 61, y: 48, r: 0.3, o: 0.35, delay: "0.2s" },
  { x: 70, y: 16, r: 0.55, o: 0.6, delay: "2.4s" },
  { x: 78, y: 70, r: 0.4, o: 0.4, delay: "1s" },
  { x: 86, y: 38, r: 0.65, o: 0.7, delay: "0.6s" },
  { x: 93, y: 84, r: 0.35, o: 0.35, delay: "1.8s" },
  { x: 12, y: 88, r: 0.3, o: 0.3, delay: "2.2s" },
  { x: 47, y: 54, r: 0.25, o: 0.3, delay: "0.9s" },
  { x: 28, y: 46, r: 0.4, o: 0.4, delay: "1.4s" },
  { x: 74, y: 90, r: 0.3, o: 0.28, delay: "2.6s" },
];

export function StarField({
  className,
  sparse = false,
}: {
  className?: string;
  sparse?: boolean;
}) {
  const stars = sparse ? STARS.filter((_, i) => i % 2 === 0) : STARS;

  return (
    <svg
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {stars.map((star) => (
        <circle
          key={`${star.x}-${star.y}`}
          className="animate-twinkle"
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill="#FFF5F5"
          opacity={star.o}
          style={{ animationDelay: star.delay }}
        />
      ))}
    </svg>
  );
}
