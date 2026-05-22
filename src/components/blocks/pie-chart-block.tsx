"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartBlockData } from "@/types";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";
import { TooltipContentProps } from "recharts/types/component/Tooltip";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

const DEFAULT_COLORS = ["#818cf8", "#a78bfa", "#34d399", "#f472b6", "#fb923c", "#38bdf8"];

interface PieChartBlockProps {
  data: ChartBlockData;
}

function CustomTooltip({ active, payload }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-900/95 backdrop-blur-sm px-3 py-2 shadow-xl">
      <div className="flex items-center gap-2 text-xs">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
        <span className="text-zinc-300">{String(item.name ?? "")}</span>
        <span className="font-semibold text-white ml-auto pl-3">{String(item.value ?? "")}</span>
      </div>
    </div>
  );
}

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) {
  if (!percent || percent < 0.05) return null;
  const cxNum = Number(cx ?? 0);
  const cyNum = Number(cy ?? 0);
  const irNum = Number(innerRadius ?? 0);
  const orNum = Number(outerRadius ?? 0);
  const angle = Number(midAngle ?? 0);
  const RADIAN = Math.PI / 180;
  const radius = irNum + (orNum - irNum) * 0.5;
  const x = cxNum + radius * Math.cos(-angle * RADIAN);
  const y = cyNum + radius * Math.sin(-angle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="rgba(255,255,255,0.85)"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function PieChartBlock({ data }: PieChartBlockProps) {
  const { title, description, data: chartData, colors } = data;
  const resolvedColors = colors?.length ? colors : DEFAULT_COLORS;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              outerRadius={100}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              label={(props: PieLabelRenderProps) => <CustomLabel {...props} />}
              strokeWidth={2}
              stroke="rgba(0,0,0,0.3)"
            >
              {chartData.map((_: unknown, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={resolvedColors[index % resolvedColors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={(props) => <CustomTooltip {...props} />} />
            <Legend
              wrapperStyle={{ paddingTop: "12px", fontSize: "12px", color: "#a1a1aa" }}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
