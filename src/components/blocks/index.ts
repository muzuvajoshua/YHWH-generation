import React from "react";
import { BlockType } from "@/types";

export { KpiCard } from "./kpi-card";
export { LineChartBlock } from "./line-chart-block";
export { BarChartBlock } from "./bar-chart-block";
export { PieChartBlock } from "./pie-chart-block";
export { AreaChartBlock } from "./area-chart-block";
export { DataTableBlock } from "./data-table-block";
export { InsightPanel } from "./insight-panel";
export { ActivityFeed } from "./activity-feed";
export { ComparisonCard } from "./comparison-card";
export { MetricsWidget } from "./metrics-widget";
export { NotesPanel } from "./notes-panel";
export { AlertPanel } from "./alert-panel";

import { KpiCard } from "./kpi-card";
import { LineChartBlock } from "./line-chart-block";
import { BarChartBlock } from "./bar-chart-block";
import { PieChartBlock } from "./pie-chart-block";
import { AreaChartBlock } from "./area-chart-block";
import { DataTableBlock } from "./data-table-block";
import { InsightPanel } from "./insight-panel";
import { ActivityFeed } from "./activity-feed";
import { ComparisonCard } from "./comparison-card";
import { MetricsWidget } from "./metrics-widget";
import { NotesPanel } from "./notes-panel";
import { AlertPanel } from "./alert-panel";

// The block registry maps a block type discriminator to its renderer. Each
// renderer accepts its own typed `data` payload; the AI route validates the
// payload against the matching schema before it ever reaches the renderer.
type AnyBlockRenderer = React.ComponentType<{ data: unknown }>;
export const blockRegistry = {
  "kpi-card": KpiCard,
  "line-chart": LineChartBlock,
  "bar-chart": BarChartBlock,
  "pie-chart": PieChartBlock,
  "area-chart": AreaChartBlock,
  "table": DataTableBlock,
  "insight-panel": InsightPanel,
  "activity-feed": ActivityFeed,
  "comparison-card": ComparisonCard,
  "metrics-widget": MetricsWidget,
  "notes-panel": NotesPanel,
  "alert-panel": AlertPanel,
} as Record<BlockType, AnyBlockRenderer>;
