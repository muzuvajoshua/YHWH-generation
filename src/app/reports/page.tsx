import React from "react";
import { FileText } from "lucide-react";
import { ComparisonCard } from "@/components/blocks/comparison-card";
import { DataTableBlock } from "@/components/blocks/data-table-block";
import { AlertPanel } from "@/components/blocks/alert-panel";
import { InsightPanel } from "@/components/blocks/insight-panel";
import {
  Container,
  PageHeader,
  SectionHeader,
} from "@/components/ui/page-header";
import { teamProductivity, taskData } from "@/lib/data/mock-data";

export default function ReportsPage() {
  const productivityData = {
    title: "Team productivity",
    items: teamProductivity.map((t) => ({
      label: t.name,
      value: t.value,
      previousValue: t.value2,
    })),
  };

  const taskTableData = {
    title: "Task tracker",
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
    title: "System alerts",
    alerts: [
      {
        level: "error" as const,
        message: "API rate limit exceeded for integration key ending in ...a4f2",
      },
      {
        level: "warning" as const,
        message: "CloudNine AI account health dropped below 50% — churn risk",
      },
      {
        level: "warning" as const,
        message: "StreamBase subscription has been inactive for 14 days",
      },
      {
        level: "info" as const,
        message:
          "Scheduled maintenance window: May 10, 02:00–04:00 UTC",
      },
      {
        level: "success" as const,
        message: "Q1 revenue target of $3.2M achieved — 106% attainment",
      },
    ],
  };

  const insightData = {
    title: "Monthly summary",
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
    <Container className="py-6 lg:py-8 space-y-8">
      <PageHeader
        eyebrow="Reports"
        title="Operational reports"
        description="Pre-built reports across team health, alerts, and weekly summaries."
        icon={<FileText className="h-4 w-4" />}
      />

      <section>
        <SectionHeader
          title="Team and operations"
          description="Productivity scores quarter-over-quarter alongside open system alerts."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <ComparisonCard data={productivityData} />
          <AlertPanel data={alertsData} />
        </div>
      </section>

      <section>
        <SectionHeader
          title="Task tracker"
          description="Open work across teams, sortable by any column."
        />
        <DataTableBlock data={taskTableData} />
      </section>

      <section className="pb-2">
        <SectionHeader
          title="AI insight"
          description="The model&apos;s read on the month."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <InsightPanel data={insightData} />
        </div>
      </section>
    </Container>
  );
}
