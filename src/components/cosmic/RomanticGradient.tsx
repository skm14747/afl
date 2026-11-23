import { cn } from "@/lib/utils";

export function RomanticGradient({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-[linear-gradient(165deg,var(--stardust-pink)_0%,var(--moonlight-cream)_42%,var(--soft-white)_100%)]",
        className
      )}
    >
      {children}
    </div>
  );
}
