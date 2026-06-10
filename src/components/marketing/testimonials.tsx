import { SectionShell } from "./section-shell";
import { StaggerGroup } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const QUOTES = [
  {
    quote:
      "Dashboard OS replaced four reporting tools and three dashboards we kept forgetting to update. The team types what they want and gets it — in seconds.",
    name: "Sarah Chen",
    role: "VP Engineering",
    company: "Acme Corp",
    tone: "violet" as const,
  },
  {
    quote:
      "The blocks-only model is the right answer. We get cinematic UI without ever shipping AI-generated HTML to production. It just feels safe.",
    name: "Marcus Johnson",
    role: "Head of Data",
    company: "Quantum Edge",
    tone: "cyan" as const,
  },
  {
    quote:
      "We onboarded 40 PMs in a week. They build their own dashboards now. Analytics requests are down 78%.",
    name: "Aisha Patel",
    role: "Director, Product Ops",
    company: "DataSync Labs",
    tone: "emerald" as const,
  },
  {
    quote:
      "The motion design alone was worth the switch — but the structured-output guarantee is what got it past procurement.",
    name: "James Lee",
    role: "CTO",
    company: "PixelForge",
    tone: "violet" as const,
  },
];

const STATS = [
  { label: "Time-to-first-dashboard", value: "9s", sub: "from a blank prompt" },
  { label: "Reduction in BI tickets", value: "78%", sub: "first quarter" },
  { label: "Customer NPS", value: "72", sub: "Q3 → Q4" },
];

const toneRing: Record<string, string> = {
  violet: "from-violet-500/30 via-violet-500/5 to-transparent",
  cyan: "from-cyan-500/30 via-cyan-500/5 to-transparent",
  emerald: "from-emerald-500/30 via-emerald-500/5 to-transparent",
};
const toneText: Record<string, string> = {
  violet: "text-violet-200 border-violet-500/30 bg-violet-500/15",
  cyan: "text-cyan-200 border-cyan-500/30 bg-cyan-500/15",
  emerald: "text-emerald-200 border-emerald-500/30 bg-emerald-500/15",
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

export function Testimonials() {
  return (
    <SectionShell
      id="customers"
      eyebrow="From operators"
      title={
        <>
          Loved by teams who&apos;d
          <span className="text-gradient-violet"> rather ship </span>
          than report.
        </>
      }
      description="Real teams replacing their internal BI stack with a single conversational surface."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-zinc-500">
              {s.label}
            </p>
            <p className="mt-3 text-[40px] font-semibold tracking-tight text-gradient-violet leading-none numeric">
              {s.value}
            </p>
            <p className="mt-2 text-[13px] text-zinc-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {QUOTES.map((q) => (
          <article
            key={q.name}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 transition-[border,background] duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
          >
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                toneRing[q.tone]
              )}
            />
            <p className="relative text-[15px] leading-relaxed text-zinc-200">
              &ldquo;{q.quote}&rdquo;
            </p>
            <div className="relative mt-5 flex items-center gap-3">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold",
                  toneText[q.tone]
                )}
              >
                {initials(q.name)}
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-zinc-100 truncate">
                  {q.name}
                </p>
                <p className="text-[12px] text-zinc-500 truncate">
                  {q.role} · {q.company}
                </p>
              </div>
            </div>
          </article>
        ))}
      </StaggerGroup>
    </SectionShell>
  );
}
