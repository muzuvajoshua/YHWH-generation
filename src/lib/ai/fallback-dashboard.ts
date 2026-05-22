import { DashboardLayout } from "@/types";
import {
  revenueData,
  userGrowthData,
  salesByRegion,
  marketingChannels,
  saasMetrics,
  teamProductivity,
  recentActivity,
  customerData,
  taskData,
} from "@/lib/data/mock-data";

// ─── Revenue / Sales Dashboard ───────────────────────────

function getRevenueDashboard(): DashboardLayout {
  return {
    title: "Revenue & Sales Overview",
    description: "Key revenue metrics, sales trends, and regional performance",
    blocks: [
      {
        id: "rev-kpi-1",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.mrr.title,
          value: saasMetrics.mrr.value,
          change: saasMetrics.mrr.change,
          changeLabel: "vs last month",
          trend: saasMetrics.mrr.trend,
          icon: "dollar-sign",
        },
      },
      {
        id: "rev-kpi-2",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.arr.title,
          value: saasMetrics.arr.value,
          change: saasMetrics.arr.change,
          changeLabel: "vs last year",
          trend: saasMetrics.arr.trend,
          icon: "trending-up",
        },
      },
      {
        id: "rev-kpi-3",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.ltv.title,
          value: saasMetrics.ltv.value,
          change: saasMetrics.ltv.change,
          changeLabel: "vs last quarter",
          trend: saasMetrics.ltv.trend,
          icon: "users",
        },
      },
      {
        id: "rev-kpi-4",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.churn.title,
          value: saasMetrics.churn.value,
          change: saasMetrics.churn.change,
          changeLabel: "vs last month",
          trend: saasMetrics.churn.trend,
          icon: "activity",
        },
      },
      {
        id: "rev-line",
        type: "line-chart",
        span: 3,
        data: {
          title: "Monthly Revenue Trend",
          description: "Revenue, gross profit, and net income over 12 months",
          data: revenueData,
          xKey: "name",
          yKeys: ["value", "value2", "value3"],
          colors: ["#6366f1", "#22c55e", "#f59e0b"],
        },
      },
      {
        id: "rev-pie",
        type: "pie-chart",
        span: 1,
        data: {
          title: "Sales by Region",
          description: "Revenue distribution across global regions",
          data: salesByRegion,
          xKey: "name",
          yKeys: ["value"],
        },
      },
      {
        id: "rev-insight",
        type: "insight-panel",
        span: 2,
        data: {
          title: "Revenue Insights",
          summary:
            "Revenue grew 95% YoY, with Q4 being the strongest quarter. Customer LTV is up while CAC is declining — improving unit economics.",
          bullets: [
            "MRR reached $284K, up 12.4% month-over-month",
            "ARR on track to exceed $4M by year-end",
            "Churn rate improved to 2.1%, down 0.4pp from last month",
            "North America accounts for 42% of total revenue",
            "Enterprise segment driving highest LTV at $12.8K per customer",
          ],
          sentiment: "positive",
        },
      },
      {
        id: "rev-table",
        type: "table",
        span: 2,
        data: {
          title: "Top Customer Accounts",
          columns: [
            { key: "name", label: "Customer", align: "left" },
            { key: "plan", label: "Plan", align: "left" },
            { key: "mrr", label: "MRR", align: "right" },
            { key: "status", label: "Status", align: "center" },
            { key: "health", label: "Health Score", align: "right" },
          ],
          rows: customerData,
        },
      },
    ],
  };
}

// ─── Marketing Dashboard ─────────────────────────────────

function getMarketingDashboard(): DashboardLayout {
  return {
    title: "Marketing Performance",
    description: "Channel attribution, campaign metrics, and acquisition trends",
    blocks: [
      {
        id: "mkt-kpi-1",
        type: "kpi-card",
        span: 1,
        data: {
          title: "Total Leads",
          value: "12,840",
          change: 18.4,
          changeLabel: "vs last month",
          trend: "up",
          icon: "users",
        },
      },
      {
        id: "mkt-kpi-2",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.conversionRate.title,
          value: saasMetrics.conversionRate.value,
          change: saasMetrics.conversionRate.change,
          changeLabel: "vs last month",
          trend: saasMetrics.conversionRate.trend,
          icon: "target",
        },
      },
      {
        id: "mkt-kpi-3",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.cac.title,
          value: saasMetrics.cac.value,
          change: saasMetrics.cac.change,
          changeLabel: "vs last month",
          trend: saasMetrics.cac.trend,
          icon: "dollar-sign",
        },
      },
      {
        id: "mkt-kpi-4",
        type: "kpi-card",
        span: 1,
        data: {
          title: "Email Open Rate",
          value: "28.4%",
          change: 2.1,
          changeLabel: "vs last campaign",
          trend: "up",
          icon: "mail",
        },
      },
      {
        id: "mkt-pie",
        type: "pie-chart",
        span: 2,
        data: {
          title: "Traffic by Channel",
          description: "Visitor distribution across acquisition channels",
          data: [
            { name: "Organic Search", value: 34 },
            { name: "Paid Ads", value: 28 },
            { name: "Social Media", value: 20 },
            { name: "Email", value: 10 },
            { name: "Referral", value: 8 },
          ],
          xKey: "name",
          yKeys: ["value"],
        },
      },
      {
        id: "mkt-bar",
        type: "bar-chart",
        span: 2,
        data: {
          title: "Leads by Channel",
          description: "Current vs. previous period lead volume",
          data: marketingChannels,
          xKey: "name",
          yKeys: ["value", "value2"],
          colors: ["#6366f1", "#a5b4fc"],
        },
      },
      {
        id: "mkt-table",
        type: "table",
        span: 3,
        data: {
          title: "Campaign Performance",
          columns: [
            { key: "campaign", label: "Campaign", align: "left" },
            { key: "channel", label: "Channel", align: "left" },
            { key: "impressions", label: "Impressions", align: "right" },
            { key: "clicks", label: "Clicks", align: "right" },
            { key: "conversions", label: "Conversions", align: "right" },
            { key: "cpa", label: "CPA", align: "right" },
          ],
          rows: [
            { campaign: "Spring Product Launch", channel: "Paid Search", impressions: "284,100", clicks: "12,400", conversions: "842", cpa: "$82" },
            { campaign: "Retargeting Q2", channel: "Display", impressions: "1,240,000", clicks: "8,200", conversions: "612", cpa: "$108" },
            { campaign: "LinkedIn Awareness", channel: "Social", impressions: "98,400", clicks: "4,820", conversions: "284", cpa: "$124" },
            { campaign: "Newsletter Drip #4", channel: "Email", impressions: "42,100", clicks: "6,840", conversions: "394", cpa: "$48" },
            { campaign: "SEO Content Push", channel: "Organic", impressions: "512,000", clicks: "24,800", conversions: "1,120", cpa: "$18" },
          ],
        },
      },
      {
        id: "mkt-insight",
        type: "insight-panel",
        span: 1,
        data: {
          title: "Marketing Insights",
          summary: "Organic search remains the highest-ROI channel. Paid ads volume is strong but CPA is rising.",
          bullets: [
            "Organic SEO delivers $18 CPA — 4.5x more efficient than social",
            "Email open rates increased 2.1pp, highest in 6 months",
            "LinkedIn CPL is high but lead quality scores 40% above average",
            "Retargeting campaigns need creative refresh — CTR down 12%",
          ],
          sentiment: "positive",
        },
      },
    ],
  };
}

// ─── User Growth Dashboard ────────────────────────────────

function getUserGrowthDashboard(): DashboardLayout {
  return {
    title: "User Growth & Engagement",
    description: "Active users, growth trends, and engagement metrics",
    blocks: [
      {
        id: "ug-kpi-1",
        type: "kpi-card",
        span: 1,
        data: {
          title: "Total Users",
          value: "47,800",
          change: 12.5,
          changeLabel: "vs last month",
          trend: "up",
          icon: "users",
        },
      },
      {
        id: "ug-kpi-2",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.dau.title,
          value: saasMetrics.dau.value,
          change: saasMetrics.dau.change,
          changeLabel: "vs last week",
          trend: saasMetrics.dau.trend,
          icon: "activity",
        },
      },
      {
        id: "ug-kpi-3",
        type: "kpi-card",
        span: 1,
        data: {
          title: "Avg Session Length",
          value: "8m 42s",
          change: 6.2,
          changeLabel: "vs last month",
          trend: "up",
          icon: "clock",
        },
      },
      {
        id: "ug-kpi-4",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.nps.title,
          value: saasMetrics.nps.value,
          change: saasMetrics.nps.change,
          changeLabel: "vs last quarter",
          trend: saasMetrics.nps.trend,
          icon: "star",
        },
      },
      {
        id: "ug-area",
        type: "area-chart",
        span: 3,
        data: {
          title: "User Growth Over Time",
          description: "Cumulative registered users over 12 months",
          data: userGrowthData,
          xKey: "name",
          yKeys: ["value"],
          colors: ["#6366f1"],
        },
      },
      {
        id: "ug-metrics",
        type: "metrics-widget",
        span: 1,
        data: {
          title: "Engagement Snapshot",
          metrics: [
            { label: "WAU", value: "84,200", unit: "users" },
            { label: "MAU", value: "182,400", unit: "users" },
            { label: "DAU/MAU Ratio", value: "10.1", unit: "%" },
            { label: "Pages / Session", value: "6.4" },
            { label: "Bounce Rate", value: "28.4", unit: "%" },
            { label: "Retention (30d)", value: "68.2", unit: "%" },
          ],
        },
      },
      {
        id: "ug-activity",
        type: "activity-feed",
        span: 2,
        data: {
          title: "Recent User Activity",
          items: recentActivity,
        },
      },
      {
        id: "ug-bar",
        type: "bar-chart",
        span: 2,
        data: {
          title: "New Signups by Day of Week",
          description: "Average new user registrations per day",
          data: [
            { name: "Mon", value: 820 },
            { name: "Tue", value: 940 },
            { name: "Wed", value: 1020 },
            { name: "Thu", value: 980 },
            { name: "Fri", value: 860 },
            { name: "Sat", value: 540 },
            { name: "Sun", value: 420 },
          ],
          xKey: "name",
          yKeys: ["value"],
          colors: ["#6366f1"],
        },
      },
    ],
  };
}

// ─── Default Overview Dashboard ──────────────────────────

function getDefaultDashboard(): DashboardLayout {
  return {
    title: "Business Overview",
    description: "A high-level view across revenue, users, team, and operations",
    blocks: [
      {
        id: "ov-kpi-1",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.mrr.title,
          value: saasMetrics.mrr.value,
          change: saasMetrics.mrr.change,
          changeLabel: "vs last month",
          trend: saasMetrics.mrr.trend,
          icon: "dollar-sign",
        },
      },
      {
        id: "ov-kpi-2",
        type: "kpi-card",
        span: 1,
        data: {
          title: "Total Users",
          value: "47,800",
          change: 12.5,
          changeLabel: "vs last month",
          trend: "up",
          icon: "users",
        },
      },
      {
        id: "ov-kpi-3",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.nps.title,
          value: saasMetrics.nps.value,
          change: saasMetrics.nps.change,
          changeLabel: "vs last quarter",
          trend: saasMetrics.nps.trend,
          icon: "star",
        },
      },
      {
        id: "ov-kpi-4",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.churn.title,
          value: saasMetrics.churn.value,
          change: saasMetrics.churn.change,
          changeLabel: "vs last month",
          trend: saasMetrics.churn.trend,
          icon: "activity",
        },
      },
      {
        id: "ov-line",
        type: "line-chart",
        span: 2,
        data: {
          title: "Revenue Trend",
          description: "Monthly revenue over the past 12 months",
          data: revenueData,
          xKey: "name",
          yKeys: ["value"],
          colors: ["#6366f1"],
        },
      },
      {
        id: "ov-area",
        type: "area-chart",
        span: 2,
        data: {
          title: "User Growth",
          description: "Cumulative user base growth",
          data: userGrowthData,
          xKey: "name",
          yKeys: ["value"],
          colors: ["#22c55e"],
        },
      },
      {
        id: "ov-bar",
        type: "bar-chart",
        span: 2,
        data: {
          title: "Team Productivity",
          description: "Current vs. previous period performance scores by team",
          data: teamProductivity,
          xKey: "name",
          yKeys: ["value", "value2"],
          colors: ["#6366f1", "#a5b4fc"],
        },
      },
      {
        id: "ov-activity",
        type: "activity-feed",
        span: 1,
        data: {
          title: "Recent Activity",
          items: recentActivity.slice(0, 4),
        },
      },
      {
        id: "ov-alert",
        type: "alert-panel",
        span: 1,
        data: {
          title: "System Alerts",
          alerts: [
            { level: "success", message: "All services operating normally" },
            { level: "info", message: "Scheduled maintenance window: May 10, 2am UTC" },
            { level: "warning", message: "CloudNine AI account at risk — health score 45" },
            { level: "error", message: "StreamBase account churned — review offboarding" },
          ],
        },
      },
      {
        id: "ov-tasks",
        type: "table",
        span: 4,
        data: {
          title: "Open Tasks",
          columns: [
            { key: "id", label: "ID", align: "left" },
            { key: "title", label: "Title", align: "left" },
            { key: "assignee", label: "Assignee", align: "left" },
            { key: "priority", label: "Priority", align: "center" },
            { key: "status", label: "Status", align: "center" },
            { key: "dueDate", label: "Due Date", align: "right" },
          ],
          rows: taskData,
        },
      },
    ],
  };
}

// ─── Team / HR Dashboard ──────────────────────────────────

function getTeamDashboard(): DashboardLayout {
  return {
    title: "Team & Operations",
    description: "Team productivity, task tracking, and recent activity",
    blocks: [
      {
        id: "tm-kpi-1",
        type: "kpi-card",
        span: 1,
        data: {
          title: "Team Size",
          value: "48",
          change: 8.3,
          changeLabel: "vs last quarter",
          trend: "up",
          icon: "users",
        },
      },
      {
        id: "tm-kpi-2",
        type: "kpi-card",
        span: 1,
        data: {
          title: "Open Tasks",
          value: "124",
          change: -6.1,
          changeLabel: "vs last week",
          trend: "down",
          icon: "check-square",
        },
      },
      {
        id: "tm-kpi-3",
        type: "kpi-card",
        span: 1,
        data: {
          title: "PRs Merged (30d)",
          value: "284",
          change: 14.2,
          changeLabel: "vs last month",
          trend: "up",
          icon: "git-merge",
        },
      },
      {
        id: "tm-kpi-4",
        type: "kpi-card",
        span: 1,
        data: {
          title: "Bug Backlog",
          value: "38",
          change: -18.4,
          changeLabel: "vs last sprint",
          trend: "down",
          icon: "bug",
        },
      },
      {
        id: "tm-bar",
        type: "bar-chart",
        span: 2,
        data: {
          title: "Team Productivity Scores",
          description: "Current vs. previous sprint performance by department",
          data: teamProductivity,
          xKey: "name",
          yKeys: ["value", "value2"],
          colors: ["#6366f1", "#a5b4fc"],
        },
      },
      {
        id: "tm-activity",
        type: "activity-feed",
        span: 2,
        data: {
          title: "Recent Activity",
          items: recentActivity,
        },
      },
      {
        id: "tm-tasks",
        type: "table",
        span: 3,
        data: {
          title: "Task Tracker",
          columns: [
            { key: "id", label: "ID", align: "left" },
            { key: "title", label: "Title", align: "left" },
            { key: "assignee", label: "Assignee", align: "left" },
            { key: "priority", label: "Priority", align: "center" },
            { key: "status", label: "Status", align: "center" },
            { key: "dueDate", label: "Due Date", align: "right" },
          ],
          rows: taskData,
        },
      },
      {
        id: "tm-metrics",
        type: "metrics-widget",
        span: 1,
        data: {
          title: "Sprint Metrics",
          metrics: [
            { label: "Velocity", value: "84", unit: "pts" },
            { label: "Completed", value: "72", unit: "pts" },
            { label: "Carry-over", value: "12", unit: "pts" },
            { label: "Deploys (7d)", value: "18" },
            { label: "Avg Review Time", value: "4.2", unit: "hrs" },
            { label: "Test Coverage", value: "84.6", unit: "%" },
          ],
        },
      },
    ],
  };
}

// ─── Customer Dashboard ───────────────────────────────────

function getCustomerDashboard(): DashboardLayout {
  return {
    title: "Customer Success",
    description: "Account health, churn risk, and support metrics",
    blocks: [
      {
        id: "cs-kpi-1",
        type: "kpi-card",
        span: 1,
        data: {
          title: "Active Accounts",
          value: "1,284",
          change: 4.8,
          changeLabel: "vs last month",
          trend: "up",
          icon: "briefcase",
        },
      },
      {
        id: "cs-kpi-2",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.churn.title,
          value: saasMetrics.churn.value,
          change: saasMetrics.churn.change,
          changeLabel: "vs last month",
          trend: saasMetrics.churn.trend,
          icon: "activity",
        },
      },
      {
        id: "cs-kpi-3",
        type: "kpi-card",
        span: 1,
        data: {
          title: saasMetrics.nps.title,
          value: saasMetrics.nps.value,
          change: saasMetrics.nps.change,
          changeLabel: "vs last quarter",
          trend: saasMetrics.nps.trend,
          icon: "star",
        },
      },
      {
        id: "cs-kpi-4",
        type: "kpi-card",
        span: 1,
        data: {
          title: "Avg Health Score",
          value: "81.5",
          change: 3.2,
          changeLabel: "vs last month",
          trend: "up",
          icon: "heart",
        },
      },
      {
        id: "cs-table",
        type: "table",
        span: 4,
        data: {
          title: "Account Health Overview",
          columns: [
            { key: "name", label: "Customer", align: "left" },
            { key: "plan", label: "Plan", align: "left" },
            { key: "mrr", label: "MRR", align: "right" },
            { key: "status", label: "Status", align: "center" },
            { key: "health", label: "Health Score", align: "right" },
          ],
          rows: customerData,
        },
      },
      {
        id: "cs-comparison",
        type: "comparison-card",
        span: 2,
        data: {
          title: "MoM Account Metrics",
          items: [
            { label: "New Accounts", value: 84, previousValue: 72 },
            { label: "Expansions", value: 38, previousValue: 29 },
            { label: "Churned", value: 12, previousValue: 18 },
            { label: "Support Tickets", value: 284, previousValue: 312 },
          ],
        },
      },
      {
        id: "cs-alert",
        type: "alert-panel",
        span: 2,
        data: {
          title: "At-Risk Accounts",
          alerts: [
            { level: "error", message: "StreamBase: Health score 12 — churned last week" },
            { level: "warning", message: "CloudNine AI: Health score 45 — QBR overdue" },
            { level: "warning", message: "PixelForge: 3 support tickets open > 5 days" },
            { level: "info", message: "TechFlow Inc: Contract renewal due in 30 days" },
            { level: "success", message: "DataSync Labs: Upsell to enterprise tier confirmed" },
          ],
        },
      },
    ],
  };
}

// ─── Main Export ──────────────────────────────────────────

export function getFallbackDashboard(query: string): {
  content: string;
  dashboard: DashboardLayout;
} {
  const q = query.toLowerCase();

  if (/revenue|sales|mrr|arr|billing|invoice|payment|profit|finance|financial/.test(q)) {
    return {
      content:
        "Here's your revenue and sales dashboard with MRR, ARR, churn metrics, and a 12-month revenue trend. North America leads regional performance at 42% of total revenue, and unit economics continue to improve with CAC declining while LTV grows.",
      dashboard: getRevenueDashboard(),
    };
  }

  if (/marketing|campaign|ads|seo|email|channel|lead|acquisition|funnel/.test(q)) {
    return {
      content:
        "This marketing dashboard breaks down channel performance, lead volume, and campaign ROI. Organic search is your most cost-efficient channel at $18 CPA, while email open rates are at a 6-month high.",
      dashboard: getMarketingDashboard(),
    };
  }

  if (/user|growth|signup|retention|engagement|dau|mau|active|session/.test(q)) {
    return {
      content:
        "Your user growth dashboard shows 47,800 total users — up 12.5% this month — with daily active users at 18.4K. Wednesday is the peak day for new signups, and the 30-day retention rate stands at 68.2%.",
      dashboard: getUserGrowthDashboard(),
    };
  }

  if (/team|productivity|task|sprint|employee|hr|people|engineering|developer/.test(q)) {
    return {
      content:
        "This team operations dashboard highlights productivity scores across all departments, open tasks, and recent activity. Engineering and Support are top performers, and the bug backlog has shrunk 18.4% from last sprint.",
      dashboard: getTeamDashboard(),
    };
  }

  if (/customer|churn|account|health|nps|success|support|retention|client/.test(q)) {
    return {
      content:
        "Your customer success dashboard surfaces account health scores, churn risk alerts, and month-over-month performance comparisons. NPS stands at 72 and average account health is 81.5, though two accounts are flagged as at-risk.",
      dashboard: getCustomerDashboard(),
    };
  }

  // Default
  return {
    content:
      "Here's a high-level business overview combining revenue, user growth, team productivity, and recent operational activity. MRR is at $284K with a 12.4% month-over-month increase, and the user base has grown to 47,800 active accounts.",
    dashboard: getDefaultDashboard(),
  };
}
