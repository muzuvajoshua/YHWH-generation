"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Wand2 } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const ROTATING_INTENTS = [
  "MRR by cohort.",
  "Churn risk by account.",
  "Revenue retention.",
  "Top 5 expansion plays.",
  "Where leads are leaking.",
];

function RotatingPrompt() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % ROTATING_INTENTS.length),
      2600
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block min-w-[16ch] align-baseline">
      {ROTATING_INTENTS.map((t, idx) => (
        <span
          key={t}
          aria-hidden={idx !== i}
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-500 ease-out",
            idx === i
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-1 pointer-events-none"
          )}
        >
          {t}
        </span>
      ))}
      <span className="invisible">{ROTATING_INTENTS[0]}</span>
    </span>
  );
}

export function Hero({ authed = false }: { authed?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Cinematic background layers */}
      <div aria-hidden className="absolute inset-0 -z-10 aurora opacity-80" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(9,9,11,0)_30%,rgba(9,9,11,0.92)_85%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal as="div">
            <Link
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur px-3 py-1 text-[12px] text-zinc-300 hover:bg-white/[0.07] hover:text-zinc-100 transition-colors"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-violet-400 animate-pulse-soft" />
                <span className="absolute inset-0 rounded-full bg-violet-400" />
              </span>
              Now with conversational dashboard generation
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </Reveal>

          <Reveal as="h1" delay={80} className="mt-8 text-[40px] sm:text-[56px] lg:text-[68px] font-semibold leading-[1.05] tracking-tight text-gradient">
            The dashboard that
            <br className="hidden sm:block" />
            <span className="text-gradient-violet"> builds itself.</span>
          </Reveal>

          <Reveal as="p" delay={140} className="mt-6 text-[15px] sm:text-[17px] leading-relaxed text-zinc-400 max-w-2xl mx-auto">
            Stop dragging widgets. Describe what you want — Dashboard OS
            composes KPIs, charts, tables, and insights, grounded in your
            real data, in real time.
          </Reveal>

          {/* Live prompt teaser */}
          <Reveal delay={200} className="mt-8 mx-auto max-w-xl">
            <div className="group relative rounded-xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
              <div className="flex items-start gap-3 px-4 py-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                <div className="flex-1 text-left text-[14px] text-zinc-200 leading-relaxed">
                  Show me{" "}
                  <RotatingPrompt />
                  <span className="caret inline-block ml-0.5 -mb-0.5 h-[14px] w-[1.5px] bg-violet-300 align-middle" />
                </div>
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                  ⌘K
                </kbd>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <div className="px-4 py-2.5 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Live workspace</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Connected
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={260} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={0.18}>
              <Link
                href={authed ? "/app" : "/signup"}
                className={cn(
                  "group relative inline-flex items-center gap-2 rounded-md h-11 px-5",
                  "bg-zinc-100 text-zinc-950 text-[14px] font-medium",
                  "hover:bg-white transition-colors",
                  "shadow-[0_8px_30px_-10px_rgba(255,255,255,0.25),0_0_0_1px_rgba(255,255,255,0.1)_inset]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                )}
              >
                <Wand2 className="h-4 w-4" />
                {authed ? "Open your workspace" : "Start free — no credit card"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
            <Link
              href="#product"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md h-11 px-4",
                "border border-white/[0.1] bg-white/[0.03] text-zinc-200 text-[14px] font-medium",
                "hover:bg-white/[0.06] hover:border-white/[0.16] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
              )}
            >
              See it in motion
            </Link>
          </Reveal>

          <Reveal delay={320} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SOC 2 Type II
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400" />
              GDPR & DPA ready
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
              Self-host on request
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
