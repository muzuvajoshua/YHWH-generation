"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { CHART_PALETTE, ChartTooltip } from "./chart-shared";

interface PieChartBlockProps {
  data: ChartBlockData;
}

function PieLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) {
  if (!percent || percent < 0.07) return null;
  const cxNum = Number(cx ?? 0);
  const cyNum = Number(cy ?? 0);
  const irNum = Number(innerRadius ?? 0);
  const orNum = Number(outerRadius ?? 0);
  const angle = Number(midAngle ?? 0);
  const RADIAN = Math.PI / 180;
  const radius = irNum + (orNum - irNum) * 0.55;
  const x = cxNum + radius * Math.cos(-angle * RADIAN);
  const y = cyNum + radius * Math.sin(-angle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="rgba(255,255,255,0.95)"
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
  const palette = colors?.length ? colors : CHART_PALETTE;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="46%"
              outerRadius={100}
              innerRadius={56}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              label={(props: PieLabelRenderProps) => <PieLabel {...props} />}
              strokeWidth={2}
              stroke="rgb(9,9,11)"
            >
              {chartData.map((_: unknown, index: number) => (
                <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
              ))}
            </Pie>
            <Tooltip content={(props) => <ChartTooltip {...props} />} />
            <Legend
              wrapperStyle={{
                paddingTop: "10px",
                fontSize: "11px",
                color: "#a1a1aa",
              }}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
