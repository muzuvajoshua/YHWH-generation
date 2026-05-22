// Realistic seeded mock datasets for the AI Dashboard OS

export const revenueData = [
  { name: "Jan", value: 4200, value2: 3800, value3: 2400 },
  { name: "Feb", value: 4800, value2: 4200, value3: 2800 },
  { name: "Mar", value: 5100, value2: 4600, value3: 3100 },
  { name: "Apr", value: 4900, value2: 4400, value3: 2900 },
  { name: "May", value: 5600, value2: 5100, value3: 3400 },
  { name: "Jun", value: 6200, value2: 5800, value3: 3900 },
  { name: "Jul", value: 6800, value2: 6200, value3: 4200 },
  { name: "Aug", value: 7100, value2: 6500, value3: 4600 },
  { name: "Sep", value: 6900, value2: 6100, value3: 4400 },
  { name: "Oct", value: 7400, value2: 6800, value3: 4800 },
  { name: "Nov", value: 7800, value2: 7200, value3: 5100 },
  { name: "Dec", value: 8200, value2: 7600, value3: 5500 },
];

export const userGrowthData = [
  { name: "Jan", value: 12400 },
  { name: "Feb", value: 14200 },
  { name: "Mar", value: 16800 },
  { name: "Apr", value: 18500 },
  { name: "May", value: 21200 },
  { name: "Jun", value: 24800 },
  { name: "Jul", value: 28100 },
  { name: "Aug", value: 31400 },
  { name: "Sep", value: 34200 },
  { name: "Oct", value: 38100 },
  { name: "Nov", value: 42500 },
  { name: "Dec", value: 47800 },
];

export const salesByRegion = [
  { name: "North America", value: 42 },
  { name: "Europe", value: 28 },
  { name: "Asia Pacific", value: 18 },
  { name: "Latin America", value: 8 },
  { name: "Africa", value: 4 },
];

export const marketingChannels = [
  { name: "Organic Search", value: 34200, value2: 28400 },
  { name: "Paid Ads", value: 28100, value2: 24800 },
  { name: "Social Media", value: 19800, value2: 16200 },
  { name: "Email", value: 15400, value2: 13100 },
  { name: "Referral", value: 12200, value2: 9800 },
  { name: "Direct", value: 8400, value2: 7200 },
];

export const saasMetrics = {
  mrr: { title: "MRR", value: "$284K", change: 12.4, trend: "up" as const },
  arr: { title: "ARR", value: "$3.4M", change: 18.2, trend: "up" as const },
  churn: { title: "Churn Rate", value: "2.1%", change: -0.4, trend: "down" as const },
  ltv: { title: "Customer LTV", value: "$12.8K", change: 8.6, trend: "up" as const },
  cac: { title: "CAC", value: "$340", change: -5.2, trend: "down" as const },
  nps: { title: "NPS Score", value: "72", change: 4.0, trend: "up" as const },
  dau: { title: "Daily Active Users", value: "18.4K", change: 15.3, trend: "up" as const },
  conversionRate: { title: "Conversion Rate", value: "3.8%", change: 0.6, trend: "up" as const },
};

export const teamProductivity = [
  { name: "Engineering", value: 94, value2: 87 },
  { name: "Design", value: 88, value2: 82 },
  { name: "Marketing", value: 76, value2: 71 },
  { name: "Sales", value: 82, value2: 78 },
  { name: "Support", value: 91, value2: 85 },
];

export const recentActivity = [
  { id: "1", user: "Sarah Chen", action: "deployed", target: "v2.4.1 to production", time: "2 min ago" },
  { id: "2", user: "Marcus Johnson", action: "merged", target: "PR #847 - Auth refactor", time: "15 min ago" },
  { id: "3", user: "Aisha Patel", action: "created", target: "Campaign Q2 Roadmap", time: "32 min ago" },
  { id: "4", user: "James Lee", action: "resolved", target: "Issue #392 - Memory leak", time: "1 hour ago" },
  { id: "5", user: "Elena Rodriguez", action: "published", target: "Blog: AI in 2026", time: "2 hours ago" },
  { id: "6", user: "David Kim", action: "closed", target: "Deal: Acme Corp ($48K)", time: "3 hours ago" },
];

export const customerData = [
  { name: "Acme Corp", plan: "Enterprise", mrr: "$12,400", status: "Active", health: 92 },
  { name: "TechFlow Inc", plan: "Business", mrr: "$4,800", status: "Active", health: 87 },
  { name: "DataSync Labs", plan: "Enterprise", mrr: "$18,200", status: "Active", health: 95 },
  { name: "CloudNine AI", plan: "Startup", mrr: "$1,200", status: "At Risk", health: 45 },
  { name: "PixelForge", plan: "Business", mrr: "$6,400", status: "Active", health: 78 },
  { name: "NeuralPath", plan: "Enterprise", mrr: "$22,800", status: "Active", health: 91 },
  { name: "StreamBase", plan: "Startup", mrr: "$800", status: "Churned", health: 12 },
  { name: "Quantum Edge", plan: "Business", mrr: "$8,600", status: "Active", health: 84 },
];

export const taskData = [
  { id: "T-001", title: "Implement SSO integration", assignee: "Sarah Chen", priority: "High", status: "In Progress", dueDate: "May 12" },
  { id: "T-002", title: "Dashboard performance audit", assignee: "Marcus Johnson", priority: "Medium", status: "Todo", dueDate: "May 15" },
  { id: "T-003", title: "Update pricing page", assignee: "Aisha Patel", priority: "High", status: "In Review", dueDate: "May 8" },
  { id: "T-004", title: "API rate limiting", assignee: "James Lee", priority: "Critical", status: "In Progress", dueDate: "May 10" },
  { id: "T-005", title: "Mobile responsive fixes", assignee: "Elena Rodriguez", priority: "Low", status: "Todo", dueDate: "May 20" },
];
