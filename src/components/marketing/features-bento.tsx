"use client";

import * as React from "react";
import {
  Sparkles,
  Layers,
  Gauge,
  Shield,
  GitBranch,
  Wand2,
  Bot,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionShell } from "./section-shell";
import { StaggerGroup } from "@/components/motion/reveal";

/* ─────────────────────────────────────────────────────────────
   Bento cells. Each is intentionally small and composable —
   no business logic, just demonstration UI. They are visual
   proof-of-the-product, not the product itself.
   ───────────────────────────────────────────────────────────── */

function MiniSparkline({ values, color = "#a78bfa" }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id="sparkline-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#sparkline-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function CellShell({
  className,
  children,
  tone = "violet",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "violet" | "cyan" | "emerald";
}) {
  const toneClasses = {
    violet: "from-violet-500/15 via-transparent",
    cyan: "from-cyan-500/15 via-transparent",
    emerald: "from-emerald-500/15 via-transparent",
  }[tone];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025]",
        "transition-[border,background] duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]",
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-br to-transparent",
          toneClasses
        )}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function CellHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-violet-500/25 bg-violet-500/12 text-violet-300">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          {eyebrow}
        </span>
      </div>
      <h3 className="mt-4 text-[18px] font-semibold tracking-tight text-zinc-100">
        {title}
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-zinc-400 max-w-md">
        {description}
      </p>
    </div>
  );
}

// ──── Individual feature cells ───────────────────────────────

function CellGenerative() {
  return (
    <CellShell tone="violet" className="md:row-span-2 md:col-span-2">
      <CellHeader
        icon={Sparkles}
        eyebrow="Generative UI"
        title="Type the question. Get the dashboard."
        description="Describe an outcome in plain English. Dashboard OS composes KPIs, charts, and insights using validated UI blocks — never freeform HTML."
      />
      <div className="px-6 pb-6">
        <div className="rounded-xl border border-white/[0.08] bg-zinc-950/60 overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-3 text-[11px] text-zinc-500 numeric">workspace · /app/workspace</span>
          </div>
          <div className="p-4 space-y-3 text-[12.5px] font-mono">
            <p className="text-zinc-500">
              <span className="text-violet-300">›</span> Compare Q3 vs Q4 revenue by region with churn callouts
            </p>
            <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] uppercase tracking-wider text-zinc-500">MRR · QoQ</span>
                <span className="text-[10.5px] text-emerald-300 numeric">+12.4%</span>
              </div>
              <div className="h-10">
                <MiniSparkline values={[42, 48, 51, 49, 56, 62, 68, 71, 69, 74, 78, 82]} />
              </div>
              <div className="flex items-center gap-3 text-[10.5px] text-zinc-500">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> NA 42%
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> EU 28%
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> APAC 18%
                </span>
              </div>
            </div>
            <p className="text-zinc-400">
              ✓ 4 charts · 1 table · 1 insight panel ·{" "}
              <span className="text-violet-300">280ms</span>
            </p>
          </div>
        </div>
      </div>
    </CellShell>
  );
}

function CellRealData() {
  return (
    <CellShell tone="emerald">
      <CellHeader
        icon={GitBranch}
        eyebrow="Grounded"
        title="Wired to your data — not hallucinations."
        description="Connect a warehouse, an API, or a CSV. The model only reasons over your data; numbers are never invented."
      />
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Postgres", dot: "bg-sky-400" },
            { label: "Snowflake", dot: "bg-cyan-400" },
            { label: "BigQuery", dot: "bg-emerald-400" },
            { label: "REST API", dot: "bg-violet-400" },
            { label: "CSV / S3", dot: "bg-amber-400" },
            { label: "Webhooks", dot: "bg-pink-400" },
          ].map((src) => (
            <div
              key={src.label}
              className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-2"
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", src.dot)} />
              <span className="text-[11.5px] text-zinc-300 truncate">{src.label}</span>
            </div>
          ))}
        </div>
      </div>
    </CellShell>
  );
}

function CellLatency() {
  return (
    <CellShell tone="cyan">
      <CellHeader
        icon={Gauge}
        eyebrow="Performance"
        title="Sub-second first paint."
        description="Server-first rendering with tiny client islands. Streamed updates, edge caches, and a render budget you can feel."
      />
      <div className="px-6 pb-6">
        <div className="space-y-2.5">
          {[
            { label: "First byte", value: 38, max: 200, color: "bg-emerald-400" },
            { label: "First paint", value: 92, max: 400, color: "bg-violet-400" },
            { label: "Interactive", value: 240, max: 1000, color: "bg-cyan-400" },
          ].map((m) => (
            <div key={m.label} className="space-y-1">
              <div className="flex items-baseline justify-between text-[11.5px]">
                <span className="text-zinc-400">{m.label}</span>
                <span className="text-zinc-200 numeric font-semibold">
                  {m.value}
                  <span className="text-zinc-500 font-normal">ms</span>
                </span>
              </div>
              <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                <div
                  className={cn("h-full rounded-full", m.color)}
                  style={{ width: `${(m.value / m.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CellShell>
  );
}

function CellBlocks() {
  const blocks = [
    "KPI",
    "Line",
    "Bar",
    "Pie",
    "Area",
    "Table",
    "Insight",
    "Activity",
    "Compare",
    "Metrics",
    "Notes",
    "Alert",
  ];
  return (
    <CellShell tone="violet" className="md:col-span-2">
      <CellHeader
        icon={Layers}
        eyebrow="Block registry"
        title="Twelve studio-grade primitives — composed by the model."
        description="Every dashboard is built from typed, validated UI blocks. Designed by humans, assembled by AI, rendered safely."
      />
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-1.5">
          {blocks.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[11.5px] font-medium text-zinc-300 hover:border-violet-500/30 hover:text-violet-200 transition-colors"
            >
              <span className="h-1 w-1 rounded-full bg-violet-300/80" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </CellShell>
  );
}

function CellSecurity() {
  return (
    <CellShell>
      <CellHeader
        icon={Shield}
        eyebrow="Security"
        title="Production posture, day one."
        description="SOC 2 Type II, SSO, role-based access, audit trails, encrypted at rest and in transit."
      />
      <div className="px-6 pb-6">
        <ul className="space-y-2 text-[12.5px] text-zinc-400">
          {[
            "SAML / OIDC single sign-on",
            "Per-workspace IP allow-list",
            "Field-level masking",
            "Immutable audit log",
          ].map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </CellShell>
  );
}

function CellInsights() {
  return (
    <CellShell tone="emerald">
      <CellHeader
        icon={TrendingUp}
        eyebrow="Always on"
        title="Insights that find you."
        description="The model watches the data and surfaces what changed — anomalies, expansions, churn risk — in your inbox or in chat."
      />
      <div className="px-6 pb-6">
        <div className="space-y-2">
          {[
            { tone: "text-emerald-300 border-emerald-500/30 bg-emerald-500/8", text: "ARR crossed $3.4M · +18.2% YoY" },
            { tone: "text-amber-300 border-amber-500/30 bg-amber-500/8", text: "CloudNine health dropped to 45" },
            { tone: "text-violet-300 border-violet-500/30 bg-violet-500/8", text: "Organic CPA improved to $18" },
          ].map((row) => (
            <div
              key={row.text}
              className={cn("rounded-md border px-2.5 py-1.5 text-[11.5px] font-medium", row.tone)}
            >
              {row.text}
            </div>
          ))}
        </div>
      </div>
    </CellShell>
  );
}

export function FeaturesBento() {
  return (
    <SectionShell
      id="features"
      eyebrow="Why teams switch"
      title={
        <>
          Built for the
          <span className="text-gradient-violet"> next decade </span>
          of analytics.
        </>
      }
      description="A focused set of primitives, composed by an AI that respects your data, your design system, and your shipping speed."
    >
      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 md:grid-flow-row-dense md:auto-rows-[minmax(220px,_auto)]">
        <CellGenerative />
        <CellRealData />
        <CellLatency />
        <CellBlocks />
        <CellSecurity />
        <CellInsights />
      </StaggerGroup>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        {[
          { icon: Bot, label: "Block-registry safety" },
          { icon: Wand2, label: "Conversational refinement" },
          { icon: Gauge, label: "Streamed everywhere" },
          { icon: Shield, label: "Audit-grade trails" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] py-3 flex items-center justify-center gap-2 text-[12px] text-zinc-400"
          >
            <Icon className="h-3.5 w-3.5 text-violet-300" />
            {label}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
