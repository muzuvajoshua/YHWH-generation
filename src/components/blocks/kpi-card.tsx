import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { KpiCardData } from "@/types";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart2,
  DollarSign,
  Users,
  Activity,
  ShoppingCart,
  Zap,
  Eye,
  Target,
  Globe,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "bar-chart": BarChart2,
  dollar: DollarSign,
  users: Users,
  activity: Activity,
  cart: ShoppingCart,
  zap: Zap,
  eye: Eye,
  target: Target,
  globe: Globe,
};

interface KpiCardProps {
  data: KpiCardData;
}

export function KpiCard({ data }: KpiCardProps) {
  const { title, value, change, changeLabel, trend, icon } = data;

  const IconComponent = icon ? ICON_MAP[icon] ?? BarChart2 : null;

  const isPositive = trend === "up";
  const isNegative = trend === "down";
  const isFlat = trend === "flat";

  const trendColor = isPositive
    ? "text-emerald-400"
    : isNegative
    ? "text-red-400"
    : "text-zinc-400";

  const trendBg = isPositive
    ? "bg-emerald-500/10"
    : isNegative
    ? "bg-red-500/10"
    : "bg-zinc-500/10";

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <Card className="relative overflow-hidden group hover:border-white/10 transition-all duration-300">
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-indigo-600/5 pointer-events-none" />

      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-400 truncate mb-1">{title}</p>
            <p className="text-3xl font-bold text-white tracking-tight leading-none mb-3">
              {value}
            </p>
            <div
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                trendBg,
                trendColor
              )}
            >
              <TrendIcon className="w-3 h-3" />
              <span>
                {isFlat ? "0%" : `${Math.abs(change)}%`}
                {changeLabel ? ` ${changeLabel}` : ""}
              </span>
            </div>
          </div>

          {IconComponent && (
            <div className="flex-shrink-0 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-zinc-400 group-hover:text-zinc-300 transition-colors">
              <IconComponent className="w-5 h-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
