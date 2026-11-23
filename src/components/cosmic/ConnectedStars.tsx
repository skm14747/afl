import { cn } from "@/lib/utils";

export function ConnectedStars({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      viewBox="0 0 200 80"
      fill="none"
    >
      <path
        d="M16 52 C 62 8, 138 72, 184 26"
        stroke="#E45D91"
        strokeOpacity="0.55"
        strokeWidth="0.7"
      />
      <circle cx="16" cy="52" r="2.4" fill="#F2A9C4" />
      <circle cx="16" cy="52" r="5" fill="#E45D91" opacity="0.18" />
      <circle cx="184" cy="26" r="2.4" fill="#FFF5F5" />
      <circle cx="184" cy="26" r="5" fill="#F2A9C4" opacity="0.2" />
    </svg>
  );
}
