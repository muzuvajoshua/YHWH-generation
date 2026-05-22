"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartBlockData } from "@/types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { TooltipContentProps } from "recharts/types/component/Tooltip";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

const DEFAULT_COLORS = ["#818cf8", "#a78bfa", "#34d399", "#f472b6", "#fb923c"];

interface BarChartBlockProps {
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

export function BarChartBlock({ data }: BarChartBlockProps) {
  const { title, description, data: chartData, colors } = data;
  const yKeys = data.yKeys?.length ? data.yKeys : ["value"];
  const resolvedColors = colors?.length ? colors : DEFAULT_COLORS;
  const isSingleKey = yKeys.length === 1;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barCategoryGap="30%">
            <defs>
              {yKeys.map((key: string, i: number) => (
                <linearGradient key={key} id={`bar-gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={resolvedColors[i % resolvedColors.length]} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={resolvedColors[i % resolvedColors.length]} stopOpacity={0.4} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
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
            <Tooltip content={(props) => <CustomTooltip {...props} />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            {yKeys.length > 1 && (
              <Legend wrapperStyle={{ paddingTop: "12px", fontSize: "12px", color: "#a1a1aa" }} />
            )}
            {yKeys.map((key: string, i: number) =>
              isSingleKey ? (
                <Bar key={key} dataKey={key} radius={[4, 4, 0, 0]}>
                  {chartData.map((_: unknown, idx: number) => (
                    <Cell
                      key={idx}
                      fill={`url(#bar-gradient-${idx % resolvedColors.length})`}
                    />
                  ))}
                </Bar>
              ) : (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={`url(#bar-gradient-${i})`}
                  radius={[4, 4, 0, 0]}
                />
              )
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
