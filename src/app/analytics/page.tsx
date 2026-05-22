import React from "react";
import { BarChart3 } from "lucide-react";
import { LineChartBlock } from "@/components/blocks/line-chart-block";
import { PieChartBlock } from "@/components/blocks/pie-chart-block";
import { BarChartBlock } from "@/components/blocks/bar-chart-block";
import { DataTableBlock } from "@/components/blocks/data-table-block";
import {
  Container,
  PageHeader,
  SectionHeader,
} from "@/components/ui/page-header";
import {
  revenueData,
  salesByRegion,
  marketingChannels,
  customerData,
} from "@/lib/data/mock-data";

export default function AnalyticsPage() {
  const revenueTrendsData = {
    title: "Revenue, costs and net profit",
    description: "Twelve-month view with gross profit and net income overlays",
    data: revenueData,
    xKey: "name",
    yKeys: ["value", "value2", "value3"],
  };

  const salesByRegionData = {
    title: "Sales by region",
    description: "Revenue distribution across global markets",
    data: salesByRegion,
    xKey: "name",
    yKeys: ["value"],
  };

  const marketingChannelsData = {
    title: "Marketing channels",
    description: "Leads this month versus last month by acquisition channel",
    data: marketingChannels,
    xKey: "name",
    yKeys: ["value", "value2"],
  };

  const customerTableData = {
    title: "Customer accounts",
    columns: [
      { key: "name", label: "Company", align: "left" as const },
      { key: "plan", label: "Plan", align: "left" as const },
      { key: "mrr", label: "MRR", align: "right" as const },
      { key: "status", label: "Status", align: "center" as const },
      { key: "health", label: "Health", align: "right" as const },
    ],
    rows: customerData,
  };

  return (
    <Container className="py-6 lg:py-8 space-y-8">
      <PageHeader
        eyebrow="Analytics"
        title="Operational analytics"
        description="Deep-dive into revenue, regional performance, channel attribution and customer accounts."
        icon={<BarChart3 className="h-4 w-4" />}
      />

      <section>
        <SectionHeader title="Revenue trend" />
        <LineChartBlock data={revenueTrendsData} />
      </section>

      <section>
        <SectionHeader
          title="Distribution and channels"
          description="Where revenue comes from, and how leads are being acquired."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <PieChartBlock data={salesByRegionData} />
          <BarChartBlock data={marketingChannelsData} />
        </div>
      </section>

      <section className="pb-2">
        <SectionHeader
          title="Customer accounts"
          description="Sortable view of MRR and account health across the book."
        />
        <DataTableBlock data={customerTableData} />
      </section>
    </Container>
  );
}
