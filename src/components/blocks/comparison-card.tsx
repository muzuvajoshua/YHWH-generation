import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComparisonCardData, ComparisonItem } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface ComparisonCardProps {
  data: ComparisonCardData;
}

function calcChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function ComparisonCard({ data }: ComparisonCardProps) {
  const { title, items } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item: ComparisonItem, idx: number) => {
          const change = calcChange(item.value, item.previousValue);
          const isUp = change > 0.05;
          const isDown = change < -0.05;
          const Icon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;
          const tone = isUp
            ? "text-emerald-300"
            : isDown
            ? "text-red-300"
            : "text-zinc-400";

          const maxVal = Math.max(item.value, item.previousValue, 1);
          const currentPct = (item.value / maxVal) * 100;
          const prevPct = (item.previousValue / maxVal) * 100;

          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-medium text-zinc-200 truncate">
                  {item.label}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-[11.5px] font-semibold numeric",
                    tone
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {change === 0
                    ? "—"
                    : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-violet-400/85 transition-[width] duration-500 ease-out"
                      style={{ width: `${currentPct}%` }}
                    />
                  </div>
                  <span className="text-[11.5px] font-semibold text-zinc-200 w-16 text-right numeric">
                    {item.value.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-zinc-600/70 transition-[width] duration-500 ease-out"
                      style={{ width: `${prevPct}%` }}
                    />
                  </div>
                  <span className="text-[11.5px] text-zinc-500 w-16 text-right numeric">
                    {item.previousValue.toLocaleString()}
                  </span>
                </div>
              </div>

              {idx === 0 && (
                <div className="flex items-center gap-3 text-[10.5px] text-zinc-500 pt-0.5">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block w-2 h-1 rounded-full bg-violet-400/85" />
                    Current
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block w-2 h-1 rounded-full bg-zinc-600/70" />
                    Previous
                  </span>
                </div>
              )}
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="text-[13px] text-zinc-500 text-center py-4">
            No data available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
