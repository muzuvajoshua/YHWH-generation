import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InsightPanelData } from "@/types";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightPanelProps {
  data: InsightPanelData;
}

const sentimentConfig = {
  positive: {
    badge: "success" as const,
    label: "Positive",
    glow: "from-emerald-600/5 to-transparent",
    border: "border-emerald-500/10",
  },
  negative: {
    badge: "destructive" as const,
    label: "Negative",
    glow: "from-red-600/5 to-transparent",
    border: "border-red-500/10",
  },
  neutral: {
    badge: "secondary" as const,
    label: "Neutral",
    glow: "from-zinc-600/5 to-transparent",
    border: "border-zinc-500/10",
  },
};

export function InsightPanel({ data }: InsightPanelProps) {
  const { title, summary, bullets, sentiment } = data;
  const config = sentiment ? sentimentConfig[sentiment as keyof typeof sentimentConfig] : null;

  return (
    <Card className={cn("relative overflow-hidden", config?.border)}>
      {config && (
        <div className={cn("absolute inset-0 bg-gradient-to-br pointer-events-none", config.glow)} />
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <Sparkles className="w-4 h-4 text-violet-400" />
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
          {config && (
            <Badge variant={config.badge} className="text-xs">
              {config.label}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-zinc-300 leading-relaxed">{summary}</p>
        {bullets.length > 0 && (
          <ul className="space-y-2">
            {bullets.map((bullet: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
