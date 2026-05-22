import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsWidgetData } from "@/types";
import { cn } from "@/lib/utils";

interface MetricsWidgetProps {
  data: MetricsWidgetData;
}

export function MetricsWidget({ data }: MetricsWidgetProps) {
  const { title, metrics } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "grid gap-2",
            metrics.length <= 2 && "grid-cols-2",
            metrics.length > 2 && metrics.length <= 4 && "grid-cols-2",
            metrics.length > 4 && metrics.length <= 6 && "grid-cols-2 sm:grid-cols-3",
            metrics.length > 6 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {metrics.map(
            (
              metric: { label: string; value: string; unit?: string },
              idx: number
            ) => (
              <div
                key={idx}
                className="rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-3 transition-colors hover:bg-white/[0.04]"
              >
                <p className="text-[11px] text-zinc-500 truncate leading-tight mb-1.5">
                  {metric.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] font-semibold tracking-tight text-zinc-100 numeric leading-none">
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-[11px] text-zinc-500 font-medium">
                      {metric.unit}
                    </span>
                  )}
                </div>
              </div>
            )
          )}
          {metrics.length === 0 && (
            <div className="col-span-full py-6 text-center text-[13px] text-zinc-500">
              No metrics available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
