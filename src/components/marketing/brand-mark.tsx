import { cn } from "@/lib/utils";
import Link from "next/link";

interface BrandMarkProps {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  withWordmark?: boolean;
}

const SIZE = {
  sm: { box: "h-6 w-6", icon: 12, text: "text-[13px]" },
  md: { box: "h-7 w-7", icon: 14, text: "text-[14px]" },
  lg: { box: "h-9 w-9", icon: 18, text: "text-[16px]" },
} as const;

/**
 * The Dashboard OS logomark — a lattice glyph rendered in SVG so the
 * brand reads sharp on any device and animates on hover via CSS only.
 */
export function BrandMark({
  href = "/",
  className,
  size = "md",
  withWordmark = true,
}: BrandMarkProps) {
  const s = SIZE[size];
  const inner = (
    <span
      className={cn(
        "group/brand inline-flex items-center gap-2 select-none",
        className
      )}
    >
      <span
        className={cn(
          "relative shrink-0 grid place-items-center rounded-md",
          "border border-violet-500/30 bg-violet-500/12",
          "transition-[border,background] duration-200",
          "group-hover/brand:border-violet-400/50 group-hover/brand:bg-violet-500/18",
          s.box
        )}
      >
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-violet-200 transition-transform duration-300 group-hover/brand:scale-110"
        >
          <path
            d="M4 7 L12 3 L20 7 L12 11 Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M4 12 L12 16 L20 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            opacity="0.7"
          />
          <path
            d="M4 17 L12 21 L20 17"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            opacity="0.45"
          />
        </svg>
      </span>
      {withWordmark && (
        <span
          className={cn(
            "font-semibold tracking-tight text-zinc-100 whitespace-nowrap",
            s.text
          )}
        >
          Dashboard OS
        </span>
      )}
    </span>
  );
  if (!href) return inner;
  return (
    <Link
      href={href}
      className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      {inner}
    </Link>
  );
}
