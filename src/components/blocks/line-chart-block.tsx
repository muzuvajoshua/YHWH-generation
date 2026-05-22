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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  CHART_PALETTE,
  CHART_GRID,
  CHART_AXIS,
  CHART_TICK,
  ChartTooltip,
} from "./chart-shared";

interface LineChartBlockProps {
  data: ChartBlockData;
}

export function LineChartBlock({ data }: LineChartBlockProps) {
  const { title, description, data: chartData, colors } = data;
  const yKeys = data.yKeys?.length ? data.yKeys : ["value"];
  const palette = colors?.length ? colors : CHART_PALETTE;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={chartData}
            margin={{ top: 4, right: 4, left: -18, bottom: 0 }}
          >
            <CartesianGrid stroke={CHART_GRID} vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: CHART_TICK, fontSize: 11 }}
              axisLine={{ stroke: CHART_AXIS }}
              tickLine={false}
              dy={6}
            />
            <YAxis
              tick={{ fill: CHART_TICK, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip
              content={(props) => <ChartTooltip {...props} />}
              cursor={{ stroke: "rgba(255,255,255,0.08)", strokeDasharray: 3 }}
            />
            {yKeys.length > 1 && (
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                  fontSize: "11px",
                  color: "#a1a1aa",
                }}
                iconType="circle"
                iconSize={8}
              />
            )}
            {yKeys.map((key: string, i: number) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={palette[i % palette.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: palette[i % palette.length],
                  strokeWidth: 0,
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
