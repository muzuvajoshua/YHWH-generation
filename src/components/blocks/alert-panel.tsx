import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertPanelData } from "@/types";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";

interface AlertPanelProps {
  data: AlertPanelData;
}

const LEVEL_CONFIG = {
  info: {
    icon: Info,
    label: "Info",
    tone: "text-sky-300",
    accent: "border-l-sky-500/60",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    tone: "text-amber-300",
    accent: "border-l-amber-500/60",
  },
  error: {
    icon: XCircle,
    label: "Critical",
    tone: "text-red-300",
    accent: "border-l-red-500/60",
  },
  success: {
    icon: CheckCircle2,
    label: "Success",
    tone: "text-emerald-300",
    accent: "border-l-emerald-500/60",
  },
} as const;

const ORDER: Record<string, number> = { error: 0, warning: 1, info: 2, success: 3 };

export function AlertPanel({ data }: AlertPanelProps) {
  const { title, alerts } = data;
  const sorted = [...alerts].sort(
    (a, b) => (ORDER[a.level] ?? 9) - (ORDER[b.level] ?? 9)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{title}</CardTitle>
          {alerts.length > 0 ? (
            <Badge variant="outline">
              {alerts.length} {alerts.length === 1 ? "alert" : "alerts"}
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5">
        {sorted.map(
          (
            alert: {
              level: "info" | "warning" | "error" | "success";
              message: string;
            },
            idx: number
          ) => {
            const config = LEVEL_CONFIG[alert.level];
            const Icon = config.icon;
            return (
              <div
                key={idx}
                className={cn(
                  "flex items-start gap-3 rounded-md border-l-2 bg-white/[0.025] px-3 py-2.5",
                  config.accent
                )}
              >
                <Icon className={cn("h-3.5 w-3.5 mt-0.5 shrink-0", config.tone)} />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-[10.5px] font-semibold uppercase tracking-wider leading-none mb-1", config.tone)}>
                    {config.label}
                  </p>
                  <p className="text-[13px] text-zinc-300 leading-snug">
                    {alert.message}
                  </p>
                </div>
              </div>
            );
          }
        )}
        {alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <CheckCircle2 className="h-8 w-8 text-emerald-400/40" />
            <p className="text-[13px] text-zinc-500">All clear — no alerts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
