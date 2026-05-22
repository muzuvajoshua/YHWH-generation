import React from "react";
import { BarChart3 } from "lucide-react";
import { LineChartBlock } from "@/components/blocks/line-chart-block";
import { PieChartBlock } from "@/components/blocks/pie-chart-block";
import { BarChartBlock } from "@/components/blocks/bar-chart-block";
import { DataTableBlock } from "@/components/blocks/data-table-block";
import {
  revenueData,
  salesByRegion,
  marketingChannels,
  customerData,
} from "@/lib/data/mock-data";

export default function AnalyticsPage() {
  const revenueTrendsData = {
    title: "Revenue Trends",
    description: "Revenue, gross profit, and net income across the year",
    data: revenueData,
    xKey: "name",
    yKeys: ["value", "value2", "value3"],
    colors: ["#8b5cf6", "#6366f1", "#10b981"],
  };

  const salesByRegionData = {
    title: "Sales by Region",
    description: "Revenue distribution across global markets",
    data: salesByRegion,
    xKey: "name",
    yKeys: ["value"],
    colors: ["#8b5cf6", "#6366f1", "#10b981", "#f59e0b", "#ef4444"],
  };

  const marketingChannelsData = {
    title: "Marketing Channels",
    description: "Leads this month vs. last month by acquisition channel",
    data: marketingChannels,
    xKey: "name",
    yKeys: ["value", "value2"],
    colors: ["#8b5cf6", "#6366f1"],
  };

  const customerTableData = {
    title: "Customer Overview",
    columns: [
      { key: "name", label: "Company", align: "left" as const },
      { key: "plan", label: "Plan", align: "left" as const },
      { key: "mrr", label: "MRR", align: "right" as const },
      { key: "status", label: "Status", align: "center" as const },
      { key: "health", label: "Health Score", align: "right" as const },
    ],
    rows: customerData,
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
          <BarChart3 className="h-5 w-5 text-violet-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-zinc-400">
            Deep-dive into your business performance metrics
          </p>
        </div>
      </div>

      {/* Revenue trends — full width */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Revenue Trends
        </h2>
        <LineChartBlock data={revenueTrendsData} />
      </section>

      {/* Pie + Bar side by side */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Distribution & Channels
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PieChartBlock data={salesByRegionData} />
          <BarChartBlock data={marketingChannelsData} />
        </div>
      </section>

      {/* Customer table */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Customer Data
        </h2>
        <DataTableBlock data={customerTableData} />
      </section>
    </div>
  );
}
