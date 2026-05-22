import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface StatTrendProps {
  trend?: "up" | "down" | "flat";
  change?: number;
  label?: string;
  className?: string;
}

export function StatTrend({ trend, change, label, className }: StatTrendProps) {
  if (trend === undefined) return null;
  const isUp = trend === "up";
  const isDown = trend === "down";
  const Icon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;
  const tone = isUp
    ? "text-emerald-300 bg-emerald-500/8 border-emerald-500/20"
    : isDown
    ? "text-red-300 bg-red-500/8 border-red-500/20"
    : "text-zinc-400 bg-white/[0.04] border-white/[0.08]";

  const pct =
    change === undefined
      ? null
      : trend === "flat"
      ? "0%"
      : `${Math.abs(change).toFixed(1)}%`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-none",
        tone,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {pct ? <span className="numeric">{pct}</span> : null}
      {label ? <span className="text-zinc-500 ml-0.5 font-normal">{label}</span> : null}
    </span>
  );
}

interface StatValueProps {
  value: string;
  className?: string;
}

export function StatValue({ value, className }: StatValueProps) {
  return (
    <span
      className={cn(
        "block text-[28px] leading-none font-semibold tracking-tight text-zinc-50 numeric",
        className
      )}
    >
      {value}
    </span>
  );
}
