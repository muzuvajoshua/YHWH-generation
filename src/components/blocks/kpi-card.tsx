import { Card, CardContent } from "@/components/ui/card";
import { StatTrend, StatValue } from "@/components/ui/stat";
import { KpiCardData } from "@/types";
import {
  BarChart2,
  DollarSign,
  Users,
  Activity,
  ShoppingCart,
  Zap,
  Eye,
  Target,
  Globe,
  TrendingUp,
  Star,
  Heart,
  Briefcase,
  CheckSquare,
  GitMerge,
  Bug,
  Clock,
  Mail,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "bar-chart": BarChart2,
  dollar: DollarSign,
  "dollar-sign": DollarSign,
  users: Users,
  activity: Activity,
  cart: ShoppingCart,
  zap: Zap,
  eye: Eye,
  target: Target,
  globe: Globe,
  "trending-up": TrendingUp,
  star: Star,
  heart: Heart,
  briefcase: Briefcase,
  "check-square": CheckSquare,
  "git-merge": GitMerge,
  bug: Bug,
  clock: Clock,
  mail: Mail,
};

interface KpiCardProps {
  data: KpiCardData;
}

export function KpiCard({ data }: KpiCardProps) {
  const { title, value, change, changeLabel, trend, icon } = data;
  const IconComponent = icon ? ICON_MAP[icon] ?? BarChart2 : BarChart2;

  return (
    <Card className="group/kpi">
      <CardContent className="px-5 py-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] font-medium text-zinc-400 truncate">
            {title}
          </p>
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.03] text-zinc-500 group-hover/kpi:text-zinc-300 transition-colors">
            <IconComponent className="h-3.5 w-3.5" />
          </span>
        </div>
        <StatValue value={value} />
        <div className="mt-3">
          <StatTrend trend={trend} change={change} label={changeLabel} />
        </div>
      </CardContent>
    </Card>
  );
}
