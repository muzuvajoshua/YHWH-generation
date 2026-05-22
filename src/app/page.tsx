import React from "react";
import { Sparkles } from "lucide-react";
import { KpiCard } from "@/components/blocks/kpi-card";
import { LineChartBlock } from "@/components/blocks/line-chart-block";
import { AreaChartBlock } from "@/components/blocks/area-chart-block";
import { ActivityFeed } from "@/components/blocks/activity-feed";
import {
  saasMetrics,
  revenueData,
  userGrowthData,
  recentActivity,
} from "@/lib/data/mock-data";

export default function HomePage() {
  const kpiList = Object.values(saasMetrics);

  const revenueChartData = {
    title: "Revenue Trends",
    description: "Monthly recurring revenue over the past 12 months",
    data: revenueData,
    xKey: "name",
    yKeys: ["value", "value2"],
    colors: ["#8b5cf6", "#6366f1"],
  };

  const userGrowthChartData = {
    title: "User Growth",
    description: "Cumulative active users this year",
    data: userGrowthData,
    xKey: "name",
    yKeys: ["value"],
    colors: ["#10b981"],
  };

  const activityFeedData = {
    title: "Recent Activity",
    items: recentActivity,
  };

  return (
    <div className="p-6 space-y-8">
      {/* Hero section */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-violet-900/20 via-zinc-900/50 to-indigo-900/20 p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.15),_transparent_60%)] pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300 mb-4">
            <Sparkles className="h-3 w-3" />
            AI-Powered Dashboard OS
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Welcome to Dashboard OS
          </h1>
          <p className="text-zinc-400 text-base max-w-xl">
            Your intelligent command center. Ask the AI to generate dashboards, analyze data,
            and surface insights — all in real time.
          </p>
        </div>
      </div>

      {/* KPI grid */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Key Metrics
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiList.map((metric) => (
            <KpiCard key={metric.title} data={metric} />
          ))}
        </div>
      </section>

      {/* Charts row */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Performance Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <LineChartBlock data={revenueChartData} />
          <AreaChartBlock data={userGrowthChartData} />
        </div>
      </section>

      {/* Activity feed */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Activity
        </h2>
        <div className="max-w-2xl">
          <ActivityFeed data={activityFeedData} />
        </div>
      </section>
    </div>
  );
}
