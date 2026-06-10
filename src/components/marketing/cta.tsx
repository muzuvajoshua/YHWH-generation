import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export function CtaSection({ authed = false }: { authed?: boolean }) {
  return (
    <section className="relative isolate py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/40 px-6 py-14 sm:px-12 sm:py-20 text-center">
            <div aria-hidden className="absolute inset-0 -z-10 spotlight blur-2xl opacity-70" />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 grid-pattern opacity-30"
            />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/12 px-3 py-1 text-[11px] font-medium text-violet-200">
              <Sparkles className="h-3 w-3" />
              Ship your first dashboard before lunch
            </span>
            <h2 className="mt-6 text-[32px] sm:text-[48px] font-semibold tracking-tight text-gradient leading-[1.05]">
              Stop dragging widgets.
              <br className="hidden sm:block" />
              <span className="text-gradient-violet"> Start having conversations.</span>
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-[15px] text-zinc-400 leading-relaxed">
              Spin up a free workspace, point it at your data — or ours — and
              ask for what you need. We&apos;ll do the composing.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Magnetic strength={0.18}>
                <Link
                  href={authed ? "/app" : "/signup"}
                  className="group inline-flex items-center gap-2 rounded-md bg-zinc-100 h-11 px-5 text-[14px] font-medium text-zinc-950 hover:bg-white transition-colors shadow-[0_8px_30px_-10px_rgba(255,255,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  {authed ? "Open dashboard" : "Create your workspace"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.1] bg-white/[0.03] h-11 px-4 text-[14px] font-medium text-zinc-200 hover:bg-white/[0.06] hover:border-white/[0.16] transition-colors"
              >
                See pricing
              </Link>
            </div>
            <p className="mt-6 text-[12px] text-zinc-500">
              Free forever for individuals · No credit card required
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
