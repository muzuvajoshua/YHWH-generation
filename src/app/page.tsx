import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { KpiCard } from "@/components/blocks/kpi-card";
import { LineChartBlock } from "@/components/blocks/line-chart-block";
import { AreaChartBlock } from "@/components/blocks/area-chart-block";
import { ActivityFeed } from "@/components/blocks/activity-feed";
import { Container, SectionHeader } from "@/components/ui/page-header";
import {
  saasMetrics,
  revenueData,
  userGrowthData,
  recentActivity,
} from "@/lib/data/mock-data";

export default function HomePage() {
  const kpiList = Object.values(saasMetrics).slice(0, 4);

  const revenueChartData = {
    title: "Revenue trend",
    description: "Monthly recurring revenue and gross profit",
    data: revenueData,
    xKey: "name",
    yKeys: ["value", "value2"],
  };

  const userGrowthChartData = {
    title: "User growth",
    description: "Cumulative active users this year",
    data: userGrowthData,
    xKey: "name",
    yKeys: ["value"],
    colors: ["#34d399"],
  };

  const activityFeedData = {
    title: "Recent activity",
    items: recentActivity,
  };

  return (
    <Container className="py-6 lg:py-8 space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/40">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.18),transparent_55%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_85%_100%,rgba(56,189,248,0.10),transparent_55%)]"
        />
        <div className="relative px-6 sm:px-8 py-8 sm:py-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/12 px-2.5 py-0.5 text-[11px] font-medium text-violet-200">
            <Sparkles className="h-3 w-3" />
            AI-native analytics
          </span>
          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-50 max-w-2xl leading-tight">
            Your command center for the numbers that move the business.
          </h1>
          <p className="mt-3 text-[14px] text-zinc-400 leading-relaxed max-w-xl">
            Ask the workspace to compose any dashboard, drill into trends, or
            surface what changed since last week — all grounded in your real
            data.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-3.5 h-9 text-[13px] font-medium text-zinc-950 hover:bg-white transition-colors"
            >
              Open the workspace
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/analytics"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.1] bg-white/[0.04] px-3.5 h-9 text-[13px] font-medium text-zinc-200 hover:bg-white/[0.07] hover:border-white/[0.16] transition-colors"
            >
              Browse analytics
            </Link>
          </div>
        </div>
      </section>

      {/* KPI grid */}
      <section>
        <SectionHeader
          title="Key metrics"
          description="The four numbers worth checking first thing each morning."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {kpiList.map((metric) => (
            <KpiCard key={metric.title} data={metric} />
          ))}
        </div>
      </section>

      {/* Charts */}
      <section>
        <SectionHeader
          title="Performance overview"
          description="Trailing twelve months across revenue and user growth."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <LineChartBlock data={revenueChartData} />
          <AreaChartBlock data={userGrowthChartData} />
        </div>
      </section>

      {/* Activity */}
      <section className="pb-2">
        <SectionHeader
          title="What&apos;s happening"
          description="Recent activity across the workspace."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <ActivityFeed data={activityFeedData} />
        </div>
      </section>
    </Container>
  );
}
