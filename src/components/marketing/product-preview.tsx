"use client";

import * as React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CornerDownLeft,
  FileText,
  Home,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionShell } from "./section-shell";
import { Parallax } from "@/components/motion/parallax";

const KPI_DATA = [
  { label: "MRR", value: "$284K", trend: "up", change: "+12.4%" },
  { label: "ARR", value: "$3.4M", trend: "up", change: "+18.2%" },
  { label: "Churn", value: "2.1%", trend: "down", change: "-0.4pp" },
  { label: "NPS", value: "72", trend: "up", change: "+4.0" },
];

function MiniArea({ color }: { color: string }) {
  const values = [12, 19, 15, 24, 22, 30, 28, 36, 34, 42, 40, 48];
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  const id = React.useId();
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${points} 100,100`} fill={`url(#${id})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function MiniBars() {
  const bars = [
    { v: 64, color: "#a78bfa" },
    { v: 88, color: "#a78bfa" },
    { v: 72, color: "#22d3ee" },
    { v: 92, color: "#22d3ee" },
    { v: 56, color: "#34d399" },
    { v: 78, color: "#34d399" },
  ];
  return (
    <div className="flex h-full w-full items-end gap-1.5 px-1">
      {bars.map((b, i) => (
        <div
          key={i}
          className="flex-1 rounded-t"
          style={{
            background: `linear-gradient(180deg, ${b.color}cc, ${b.color}66)`,
            height: `${b.v}%`,
          }}
        />
      ))}
    </div>
  );
}

export function ProductPreview() {
  return (
    <SectionShell
      id="product"
      eyebrow="The product"
      title={
        <>
          A dashboard you can
          <span className="text-gradient-violet"> talk to.</span>
        </>
      }
      description="The workspace renders structured layouts streamed from the model — blocks, charts, insights — animated and instant."
    >
      <div className="relative">
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 -top-12 h-64 opacity-70 spotlight blur-2xl"
        />

        <Parallax speed={0.06}>
          <div className="relative mx-auto max-w-6xl rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset] overflow-hidden">
            {/* Top chrome */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="ml-3 text-[11px] text-zinc-500 numeric truncate">
                dashboard.os/app/workspace
              </span>
              <div className="ml-auto hidden sm:inline-flex items-center gap-1 rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                ⌘K
              </div>
            </div>

            {/* App body */}
            <div className="grid grid-cols-12">
              {/* Sidebar */}
              <aside className="hidden md:flex md:col-span-2 flex-col gap-1 border-r border-white/[0.06] p-3">
                {[
                  { icon: Home, label: "Home", active: false },
                  { icon: BarChart3, label: "Analytics", active: false },
                  { icon: BrainCircuit, label: "Workspace", active: true },
                  { icon: FileText, label: "Reports", active: false },
                  { icon: Settings, label: "Settings", active: false },
                ].map(({ icon: Icon, label, active }) => (
                  <div
                    key={label}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11.5px]",
                      active
                        ? "bg-white/[0.06] text-zinc-100"
                        : "text-zinc-500"
                    )}
                  >
                    <Icon className={cn("h-3 w-3", active ? "text-violet-300" : "text-zinc-500")} />
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </aside>

              {/* Main */}
              <div className="col-span-12 md:col-span-10 p-4 sm:p-5 space-y-4">
                {/* Prompt bar */}
                <div className="flex items-center gap-2.5 rounded-lg border border-violet-500/30 bg-violet-500/[0.06] px-3 py-2">
                  <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                  <span className="flex-1 text-[12.5px] text-zinc-200">
                    Build a revenue health overview for Q4 with churn callouts
                  </span>
                  <CornerDownLeft className="h-3 w-3 text-violet-300" />
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {KPI_DATA.map((k) => (
                    <div
                      key={k.label}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-3"
                    >
                      <p className="text-[10.5px] uppercase tracking-wider text-zinc-500">
                        {k.label}
                      </p>
                      <p className="mt-1 text-[18px] font-semibold tracking-tight text-zinc-50 numeric">
                        {k.value}
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 inline-flex items-center gap-0.5 text-[10.5px] font-medium",
                          k.trend === "up" ? "text-emerald-300" : "text-zinc-400"
                        )}
                      >
                        {k.trend === "up" ? (
                          <ArrowUpRight className="h-2.5 w-2.5" />
                        ) : (
                          <ArrowDownRight className="h-2.5 w-2.5" />
                        )}
                        {k.change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  <div className="md:col-span-2 rounded-lg border border-white/[0.06] bg-white/[0.025] p-3">
                    <p className="text-[11.5px] font-semibold text-zinc-200">
                      Monthly revenue
                    </p>
                    <p className="text-[10.5px] text-zinc-500">
                      Trailing twelve months · gross + net
                    </p>
                    <div className="h-28 mt-2">
                      <MiniArea color="#a78bfa" />
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-3">
                    <p className="text-[11.5px] font-semibold text-zinc-200">
                      Team productivity
                    </p>
                    <p className="text-[10.5px] text-zinc-500">QoQ scores</p>
                    <div className="h-28 mt-2">
                      <MiniBars />
                    </div>
                  </div>
                </div>

                {/* Insight strip */}
                <div className="rounded-lg border border-violet-500/25 bg-violet-500/[0.06] p-3 flex items-start gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-violet-500/30 bg-violet-500/15 text-violet-200">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  <p className="text-[12px] text-zinc-300 leading-relaxed">
                    Revenue grew{" "}
                    <span className="text-zinc-100 font-semibold numeric">95% </span>
                    YoY with Q4 the strongest quarter. CAC declining, LTV up —
                    unit economics improving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </div>
    </SectionShell>
  );
}
