import React from "react";
import { FileText } from "lucide-react";
import { ComparisonCard } from "@/components/blocks/comparison-card";
import { DataTableBlock } from "@/components/blocks/data-table-block";
import { AlertPanel } from "@/components/blocks/alert-panel";
import { InsightPanel } from "@/components/blocks/insight-panel";
import { teamProductivity, taskData } from "@/lib/data/mock-data";

export default function ReportsPage() {
  const productivityData = {
    title: "Team Productivity",
    items: teamProductivity.map((t) => ({
      label: t.name,
      value: t.value,
      previousValue: t.value2,
    })),
  };

  const taskTableData = {
    title: "Task Overview",
    columns: [
      { key: "id", label: "ID", align: "left" as const },
      { key: "title", label: "Task", align: "left" as const },
      { key: "assignee", label: "Assignee", align: "left" as const },
      { key: "priority", label: "Priority", align: "center" as const },
      { key: "status", label: "Status", align: "center" as const },
      { key: "dueDate", label: "Due", align: "right" as const },
    ],
    rows: taskData,
  };

  const alertsData = {
    title: "System Alerts",
    alerts: [
      { level: "error" as const, message: "API rate limit exceeded for integration key ending in ...a4f2" },
      { level: "warning" as const, message: "CloudNine AI account health dropped below 50% — churn risk" },
      { level: "warning" as const, message: "StreamBase subscription has been inactive for 14 days" },
      { level: "info" as const, message: "Scheduled maintenance window: May 10, 02:00–04:00 UTC" },
      { level: "success" as const, message: "Q1 revenue target of $3.2M achieved — 106% attainment" },
    ],
  };

  const insightData = {
    title: "Monthly Summary",
    summary:
      "May has been a strong month for growth. MRR climbed 12.4% driven by enterprise upsells and new logo acquisitions in APAC. Churn remains low but two at-risk accounts need immediate attention.",
    bullets: [
      "MRR reached $284K, up from $253K in April",
      "3 new enterprise deals closed totaling $54K ARR",
      "NPS improved to 72 — highest since Q3 last year",
      "Engineering team hitting 94% sprint velocity",
      "2 accounts flagged for proactive customer success outreach",
    ],
    sentiment: "positive" as const,
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <FileText className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Reports</h1>
          <p className="text-sm text-zinc-400">
            Pre-built reports and operational summaries
          </p>
        </div>
      </div>

      {/* Team productivity + Alerts */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Team & Operations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ComparisonCard data={productivityData} />
          <AlertPanel data={alertsData} />
        </div>
      </section>

      {/* Task table */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Task Tracker
        </h2>
        <DataTableBlock data={taskTableData} />
      </section>

      {/* Monthly insight */}
      <section>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          AI Insight
        </h2>
        <div className="max-w-2xl">
          <InsightPanel data={insightData} />
        </div>
      </section>
    </div>
  );
}
