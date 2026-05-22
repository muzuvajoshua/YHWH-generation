"use client";

import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

export const CHART_PALETTE = [
  "#a78bfa", // violet-400
  "#22d3ee", // cyan-400
  "#34d399", // emerald-400
  "#f472b6", // pink-400
  "#fbbf24", // amber-400
  "#60a5fa", // blue-400
];

export const CHART_GRID = "rgba(255,255,255,0.045)";
export const CHART_AXIS = "rgba(255,255,255,0.04)";
export const CHART_TICK = "#71717a";

export function ChartTooltip({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-white/[0.08] bg-zinc-900/95 backdrop-blur-md px-3 py-2 shadow-xl shadow-black/40">
      {label !== undefined && label !== "" && (
        <p className="text-[10.5px] font-medium uppercase tracking-wider text-zinc-500 mb-1.5">
          {String(label)}
        </p>
      )}
      <div className="space-y-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 text-[12px]">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-zinc-400 capitalize mr-auto">
              {String(entry.dataKey ?? entry.name ?? "")}
            </span>
            <span className="font-semibold text-zinc-100 ml-3 numeric">
              {String(entry.value ?? "")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
