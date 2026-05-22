"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartBlockData } from "@/types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TooltipContentProps } from "recharts/types/component/Tooltip";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

const DEFAULT_COLORS = ["#818cf8", "#a78bfa", "#34d399", "#f472b6", "#fb923c"];

interface AreaChartBlockProps {
  data: ChartBlockData;
}

function CustomTooltip({ active, payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-900/95 backdrop-blur-sm px-3 py-2 shadow-xl">
      <p className="text-xs font-medium text-zinc-400 mb-1.5">{String(label ?? "")}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-zinc-300 capitalize">{String(entry.dataKey ?? "")}</span>
          <span className="font-semibold text-white ml-auto pl-3">{String(entry.value ?? "")}</span>
        </div>
      ))}
    </div>
  );
}

export function AreaChartBlock({ data }: AreaChartBlockProps) {
  const { title, description, data: chartData, colors } = data;
  const yKeys = data.yKeys?.length ? data.yKeys : ["value"];
  const resolvedColors = colors?.length ? colors : DEFAULT_COLORS;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {yKeys.map((key: string, i: number) => (
                <linearGradient key={key} id={`area-gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={resolvedColors[i % resolvedColors.length]}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={resolvedColors[i % resolvedColors.length]}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={(props) => <CustomTooltip {...props} />} />
            {yKeys.length > 1 && (
              <Legend wrapperStyle={{ paddingTop: "12px", fontSize: "12px", color: "#a1a1aa" }} />
            )}
            {yKeys.map((key: string, i: number) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={resolvedColors[i % resolvedColors.length]}
                strokeWidth={2}
                fill={`url(#area-gradient-${i})`}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: resolvedColors[i % resolvedColors.length],
                  strokeWidth: 0,
                }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
