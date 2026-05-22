import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsWidgetData } from "@/types";
import { cn } from "@/lib/utils";

interface MetricsWidgetProps {
  data: MetricsWidgetData;
}

const ACCENT_COLORS = [
  "text-indigo-400",
  "text-violet-400",
  "text-emerald-400",
  "text-pink-400",
  "text-orange-400",
  "text-cyan-400",
];

export function MetricsWidget({ data }: MetricsWidgetProps) {
  const { title, metrics } = data;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "grid gap-3",
            metrics.length <= 2
              ? "grid-cols-2"
              : metrics.length <= 4
              ? "grid-cols-2"
              : metrics.length <= 6
              ? "grid-cols-3"
              : "grid-cols-3 sm:grid-cols-4"
          )}
        >
          {metrics.map((metric: { label: string; value: string; unit?: string }, idx: number) => (
            <div
              key={idx}
              className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors"
            >
              <span className="text-xs text-zinc-500 truncate leading-tight">{metric.label}</span>
              <div className="flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-xl font-bold tracking-tight",
                    ACCENT_COLORS[idx % ACCENT_COLORS.length]
                  )}
                >
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-xs text-zinc-500 font-medium">{metric.unit}</span>
                )}
              </div>
            </div>
          ))}
          {metrics.length === 0 && (
            <div className="col-span-full py-6 text-center text-sm text-zinc-500">
              No metrics available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
