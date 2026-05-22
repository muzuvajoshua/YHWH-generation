import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComparisonCardData, ComparisonItem } from "@/types";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

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
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item: ComparisonItem, idx: number) => {
          const change = calcChange(item.value, item.previousValue);
          const isUp = change > 0;
          const isDown = change < 0;
          const TrendIcon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
          const trendColor = isUp ? "text-emerald-400" : isDown ? "text-red-400" : "text-zinc-400";

          // Progress bar: show percentage relative to max of the two values
          const maxVal = Math.max(item.value, item.previousValue, 1);
          const currentPct = (item.value / maxVal) * 100;
          const prevPct = (item.previousValue / maxVal) * 100;

          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-zinc-300 truncate">{item.label}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <TrendIcon className={cn("w-3.5 h-3.5", trendColor)} />
                  <span className={cn("text-xs font-semibold", trendColor)}>
                    {change === 0 ? "—" : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1.5">
                  {/* Current value bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                        style={{ width: `${currentPct}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-zinc-200 w-16 text-right tabular-nums">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                  {/* Previous value bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-zinc-600 transition-all duration-500"
                        style={{ width: `${prevPct}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-500 w-16 text-right tabular-nums">
                      {item.previousValue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 inline-block" />
                  Current
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-0.5 rounded-full bg-zinc-600 inline-block" />
                  Previous
                </span>
              </div>

              {idx < items.length - 1 && (
                <div className="border-b border-white/[0.04] pt-1" />
              )}
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="text-sm text-zinc-500 text-center py-4">No data available</p>
        )}
      </CardContent>
    </Card>
  );
}
