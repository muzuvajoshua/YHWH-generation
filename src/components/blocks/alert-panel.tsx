import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertPanelData } from "@/types";
import { cn } from "@/lib/utils";
import {
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle2,
} from "lucide-react";

interface AlertPanelProps {
  data: AlertPanelData;
}

const LEVEL_CONFIG = {
  info: {
    icon: Info,
    label: "Info",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon_color: "text-blue-400",
    text: "text-blue-300",
    dot: "bg-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon_color: "text-amber-400",
    text: "text-amber-300",
    dot: "bg-amber-500",
  },
  error: {
    icon: XCircle,
    label: "Error",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon_color: "text-red-400",
    text: "text-red-300",
    dot: "bg-red-500",
  },
  success: {
    icon: CheckCircle2,
    label: "Success",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon_color: "text-emerald-400",
    text: "text-emerald-300",
    dot: "bg-emerald-500",
  },
} as const;

export function AlertPanel({ data }: AlertPanelProps) {
  const { title, alerts } = data;

  // Sort by severity: error > warning > info > success
  const ORDER: Record<string, number> = { error: 0, warning: 1, info: 2, success: 3 };
  const sorted = [...alerts].sort((a, b) => (ORDER[a.level] ?? 9) - (ORDER[b.level] ?? 9));

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {alerts.length > 0 && (
            <span className="text-xs font-medium text-zinc-500 bg-white/[0.05] rounded-full px-2.5 py-0.5 border border-white/[0.06]">
              {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {sorted.map((alert: { level: "info" | "warning" | "error" | "success"; message: string }, idx: number) => {
          const config = LEVEL_CONFIG[alert.level];
          const IconComponent = config.icon;
          return (
            <div
              key={idx}
              className={cn(
                "flex items-start gap-3 rounded-lg px-3.5 py-3 border",
                config.bg,
                config.border
              )}
            >
              <IconComponent className={cn("w-4 h-4 mt-0.5 flex-shrink-0", config.icon_color)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={cn("text-xs font-semibold uppercase tracking-wide", config.icon_color)}>
                    {config.label}
                  </span>
                </div>
                <p className="text-sm text-zinc-300 leading-snug">{alert.message}</p>
              </div>
            </div>
          );
        })}
        {alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500/40" />
            <p className="text-sm text-zinc-500">All clear — no alerts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
