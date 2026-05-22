import { z } from "zod";

// ─── Block Types ─────────────────────────────────────────
export const BlockType = z.enum([
  "kpi-card",
  "line-chart",
  "bar-chart",
  "pie-chart",
  "area-chart",
  "table",
  "insight-panel",
  "activity-feed",
  "comparison-card",
  "metrics-widget",
  "notes-panel",
  "alert-panel",
]);
export type BlockType = z.infer<typeof BlockType>;

// ─── KPI ─────────────────────────────────────────────────
export const KpiCardData = z.object({
  title: z.string(),
  value: z.string(),
  change: z.number(),
  changeLabel: z.string().optional(),
  trend: z.enum(["up", "down", "flat"]),
  icon: z.string().optional(),
});
export type KpiCardData = z.infer<typeof KpiCardData>;

// ─── Chart ───────────────────────────────────────────────
export const ChartDataPoint = z.object({
  name: z.string(),
  value: z.number(),
  value2: z.number().optional(),
  value3: z.number().optional(),
});
export type ChartDataPoint = z.infer<typeof ChartDataPoint>;

export const ChartBlockData = z.object({
  title: z.string(),
  description: z.string().optional(),
  data: z.array(ChartDataPoint),
  xKey: z.string().default("name"),
  yKeys: z.array(z.string()).default(["value"]),
  colors: z.array(z.string()).optional(),
});
export type ChartBlockData = z.infer<typeof ChartBlockData>;

// ─── Table ───────────────────────────────────────────────
export const TableColumn = z.object({
  key: z.string(),
  label: z.string(),
  align: z.enum(["left", "center", "right"]).optional(),
});
export type TableColumn = z.infer<typeof TableColumn>;

export const TableBlockData = z.object({
  title: z.string(),
  columns: z.array(TableColumn),
  rows: z.array(z.record(z.string(), z.union([z.string(), z.number()]))),
});
export type TableBlockData = z.infer<typeof TableBlockData>;

// ─── Insight ─────────────────────────────────────────────
export const InsightPanelData = z.object({
  title: z.string(),
  summary: z.string(),
  bullets: z.array(z.string()),
  sentiment: z.enum(["positive", "negative", "neutral"]).optional(),
});
export type InsightPanelData = z.infer<typeof InsightPanelData>;

// ─── Activity Feed ───────────────────────────────────────
export const ActivityItem = z.object({
  id: z.string(),
  user: z.string(),
  action: z.string(),
  target: z.string(),
  time: z.string(),
});
export type ActivityItem = z.infer<typeof ActivityItem>;

export const ActivityFeedData = z.object({
  title: z.string(),
  items: z.array(ActivityItem),
});
export type ActivityFeedData = z.infer<typeof ActivityFeedData>;

// ─── Comparison ──────────────────────────────────────────
export const ComparisonItem = z.object({
  label: z.string(),
  value: z.number(),
  previousValue: z.number(),
});
export type ComparisonItem = z.infer<typeof ComparisonItem>;

export const ComparisonCardData = z.object({
  title: z.string(),
  items: z.array(ComparisonItem),
});
export type ComparisonCardData = z.infer<typeof ComparisonCardData>;

// ─── Metrics Widget ──────────────────────────────────────
export const MetricsWidgetData = z.object({
  title: z.string(),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      unit: z.string().optional(),
    })
  ),
});
export type MetricsWidgetData = z.infer<typeof MetricsWidgetData>;

// ─── Notes ───────────────────────────────────────────────
export const NotesPanelData = z.object({
  title: z.string(),
  content: z.string(),
});
export type NotesPanelData = z.infer<typeof NotesPanelData>;

// ─── Alert ───────────────────────────────────────────────
export const AlertPanelData = z.object({
  title: z.string(),
  alerts: z.array(
    z.object({
      level: z.enum(["info", "warning", "error", "success"]),
      message: z.string(),
    })
  ),
});
export type AlertPanelData = z.infer<typeof AlertPanelData>;

// ─── Block Definition ────────────────────────────────────
export const BlockDefinition = z.object({
  id: z.string(),
  type: BlockType,
  span: z.number().min(1).max(4).default(2),
  data: z.any(),
});
export type BlockDefinition = z.infer<typeof BlockDefinition>;

// ─── Dashboard Layout ────────────────────────────────────
export const DashboardLayout = z.object({
  title: z.string(),
  description: z.string(),
  blocks: z.array(BlockDefinition),
});
export type DashboardLayout = z.infer<typeof DashboardLayout>;

// ─── Chat Message ────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  dashboard?: DashboardLayout;
  createdAt: Date;
}
