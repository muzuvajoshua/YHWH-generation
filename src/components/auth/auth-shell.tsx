import Link from "next/link";
import { BrandMark } from "@/components/marketing/brand-mark";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  side?: "left" | "right";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  footerHint: React.ReactNode;
  children: React.ReactNode;
}

const TESTIMONIAL = {
  quote:
    "We replaced four reporting tools with one prompt box. The team writes what they want — Dashboard OS does the rest.",
  name: "Sarah Chen",
  role: "VP Engineering · Acme Corp",
};

export function AuthShell({
  side = "left",
  eyebrow = "Welcome",
  title,
  subtitle,
  footerHint,
  children,
}: AuthShellProps) {
  return (
    <div className="grid min-h-[100dvh] grid-cols-1 lg:grid-cols-[1fr_1.05fr] bg-zinc-950 text-zinc-100">
      {/* Form column */}
      <div
        className={cn(
          "relative flex flex-col px-6 sm:px-10 lg:px-14 py-8",
          side === "right" && "lg:order-2"
        )}
      >
        <div className="flex items-center justify-between">
          <BrandMark size="md" href="/" />
          <Link
            href="/"
            className="text-[12.5px] text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            ← Back to site
          </Link>
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-sm mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300/90">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-[28px] sm:text-[32px] font-semibold tracking-tight text-gradient leading-[1.1]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-[14px] text-zinc-400 leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="mt-8">{children}</div>
          </div>
        </div>

        <div className="pt-6 mt-auto text-[12.5px] text-zinc-500 text-center">
          {footerHint}
        </div>
      </div>

      {/* Showcase column */}
      <aside
        className={cn(
          "relative hidden lg:block overflow-hidden border-l border-white/[0.06]",
          side === "right" && "lg:order-1 lg:border-l-0 lg:border-r"
        )}
      >
        <div aria-hidden className="absolute inset-0 aurora opacity-70" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,9,11,0)_30%,rgba(9,9,11,0.92)_90%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 grid-pattern opacity-40"
        />

        <div className="relative h-full w-full flex flex-col p-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300/90">
              Live workspace
            </p>
            <h2 className="mt-3 text-[28px] font-semibold tracking-tight text-gradient leading-tight max-w-md">
              The dashboard that builds itself.
            </h2>
          </div>

          {/* Floating preview card */}
          <div className="mt-auto">
            <div className="relative rounded-2xl border border-white/[0.08] bg-zinc-950/70 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] p-5 float-soft">
              <div className="flex items-center gap-2 text-[10.5px] text-zinc-500">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                Composing: Customer health
                <span className="ml-auto numeric">280ms</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: "MRR", value: "$284K", tone: "text-emerald-300" },
                  { label: "Churn", value: "2.1%", tone: "text-zinc-200" },
                  { label: "NPS", value: "72", tone: "text-violet-300" },
                ].map((k) => (
                  <div
                    key={k.label}
                    className="rounded-md border border-white/[0.06] bg-white/[0.025] p-2.5"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                      {k.label}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-[18px] font-semibold tracking-tight numeric",
                        k.tone
                      )}
                    >
                      {k.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md border border-violet-500/25 bg-violet-500/[0.08] p-2.5">
                <p className="text-[11.5px] text-zinc-200 leading-relaxed">
                  Revenue grew{" "}
                  <span className="font-semibold text-zinc-50 numeric">95%</span>{" "}
                  YoY, two accounts flagged at-risk —{" "}
                  <span className="text-violet-200">review them?</span>
                </p>
              </div>
            </div>

            <figure className="mt-8 max-w-md">
              <blockquote className="text-[14.5px] leading-relaxed text-zinc-300">
                &ldquo;{TESTIMONIAL.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[12px] text-zinc-500">
                — {TESTIMONIAL.name},{" "}
                <span className="text-zinc-400">{TESTIMONIAL.role}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </aside>
    </div>
  );
}
