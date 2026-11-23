import { cn } from "@/lib/utils";

export function ConstellationDecoration({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-28 w-40", className)}
      viewBox="0 0 160 110"
      fill="none"
    >
      <path
        d="M18 78 L 52 36 L 96 52 L 142 22"
        stroke="#B52D52"
        strokeOpacity="0.28"
        strokeWidth="0.8"
      />
      <path d="M52 36 L 70 88" stroke="#E45D91" strokeOpacity="0.22" strokeWidth="0.7" />
      <circle cx="18" cy="78" r="2.2" fill="#B52D52" />
      <circle cx="52" cy="36" r="2.6" fill="#E45D91" />
      <circle cx="96" cy="52" r="2" fill="#DDA5A0" />
      <circle cx="142" cy="22" r="2.4" fill="#B52D52" />
      <circle cx="70" cy="88" r="1.6" fill="#E45D91" />
    </svg>
  );
}
