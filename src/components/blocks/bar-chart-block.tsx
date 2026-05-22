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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import {
  CHART_PALETTE,
  CHART_GRID,
  CHART_AXIS,
  CHART_TICK,
  ChartTooltip,
} from "./chart-shared";

interface BarChartBlockProps {
  data: ChartBlockData;
}

export function BarChartBlock({ data }: BarChartBlockProps) {
  const { title, description, data: chartData, colors } = data;
  const yKeys = data.yKeys?.length ? data.yKeys : ["value"];
  const palette = colors?.length ? colors : CHART_PALETTE;
  const isSingleKey = yKeys.length === 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            margin={{ top: 4, right: 4, left: -18, bottom: 0 }}
            barCategoryGap="26%"
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
              cursor={{ fill: "rgba(255,255,255,0.025)" }}
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
            {yKeys.map((key: string, i: number) =>
              isSingleKey ? (
                <Bar
                  key={key}
                  dataKey={key}
                  radius={[3, 3, 0, 0]}
                  maxBarSize={36}
                >
                  {chartData.map((_: unknown, idx: number) => (
                    <Cell
                      key={idx}
                      fill={palette[idx % palette.length]}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              ) : (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={palette[i % palette.length]}
                  fillOpacity={0.85}
                  radius={[3, 3, 0, 0]}
                  maxBarSize={36}
                />
              )
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
