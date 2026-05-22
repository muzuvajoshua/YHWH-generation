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
  AreaChart,
  Area,
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

interface AreaChartBlockProps {
  data: ChartBlockData;
}

export function AreaChartBlock({ data }: AreaChartBlockProps) {
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
          <AreaChart
            data={chartData}
            margin={{ top: 4, right: 4, left: -18, bottom: 0 }}
          >
            <defs>
              {yKeys.map((key: string, i: number) => (
                <linearGradient
                  key={key}
                  id={`area-gradient-${i}-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={palette[i % palette.length]}
                    stopOpacity={0.32}
                  />
                  <stop
                    offset="100%"
                    stopColor={palette[i % palette.length]}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
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
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={palette[i % palette.length]}
                strokeWidth={2}
                fill={`url(#area-gradient-${i}-${key})`}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: palette[i % palette.length],
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
