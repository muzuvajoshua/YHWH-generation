import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InsightPanelData } from "@/types";
import { Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightPanelProps {
  data: InsightPanelData;
}

const sentimentMap = {
  positive: {
    variant: "success" as const,
    label: "Positive",
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  negative: {
    variant: "destructive" as const,
    label: "Needs attention",
    accent: "text-red-400 bg-red-500/10 border-red-500/20",
  },
  neutral: {
    variant: "secondary" as const,
    label: "Neutral",
    accent: "text-zinc-400 bg-white/[0.04] border-white/[0.08]",
  },
};

export function InsightPanel({ data }: InsightPanelProps) {
  const { title, summary, bullets, sentiment } = data;
  const config = sentiment ? sentimentMap[sentiment as keyof typeof sentimentMap] : null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-violet-500/25 bg-violet-500/12 text-violet-300 shrink-0">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <CardTitle className="truncate">{title}</CardTitle>
          </div>
          {config ? (
            <Badge variant={config.variant} className="shrink-0">
              {config.label}
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[13.5px] text-zinc-300 leading-relaxed">{summary}</p>
        {bullets.length > 0 && (
          <ul className="space-y-2.5">
            {bullets.map((bullet: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] text-zinc-400">
                <span
                  className={cn(
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                    config?.accent ?? "text-violet-300 bg-violet-500/10 border-violet-500/20"
                  )}
                >
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
