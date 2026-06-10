"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionShell } from "./section-shell";
import { Magnetic } from "@/components/motion/magnetic";

interface Plan {
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    tagline: "For builders kicking the tires.",
    monthly: 0,
    annual: 0,
    features: [
      "1 workspace · 3 seats",
      "10 AI generations / day",
      "All 12 block primitives",
      "Mock data + 1 connector",
      "Community support",
    ],
    cta: "Start free",
    href: "/signup",
  },
  {
    name: "Team",
    tagline: "The workspace your operators ship from.",
    monthly: 49,
    annual: 39,
    features: [
      "Unlimited workspaces · 10 seats",
      "Unlimited AI generations",
      "All connectors + scheduled refresh",
      "Slack & email alerts",
      "Priority support · SLA-backed",
    ],
    cta: "Start 14-day trial",
    href: "/signup?plan=team",
    highlight: true,
  },
  {
    name: "Enterprise",
    tagline: "When procurement gets involved.",
    monthly: 0,
    annual: 0,
    features: [
      "SAML SSO · SCIM provisioning",
      "Dedicated infra + custom region",
      "Field-level masking & audit log",
      "Custom DPA, MSA, security review",
      "Solutions engineer on speed-dial",
    ],
    cta: "Talk to sales",
    href: "#",
  },
];

export function Pricing() {
  const [annual, setAnnual] = React.useState(true);

  return (
    <SectionShell
      id="pricing"
      eyebrow="Pricing"
      align="center"
      title={
        <>
          Honest pricing.
          <span className="text-gradient-violet"> No surprises.</span>
        </>
      }
      description="Start free. Upgrade when your team is ready. Cancel anytime — your dashboards stay readable forever."
    >
      <div className="mx-auto mb-10 flex w-fit items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] p-1">
        <button
          onClick={() => setAnnual(false)}
          aria-pressed={!annual}
          className={cn(
            "rounded-full px-4 h-8 text-[12.5px] font-medium transition-colors",
            !annual ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setAnnual(true)}
          aria-pressed={annual}
          className={cn(
            "rounded-full px-4 h-8 text-[12.5px] font-medium transition-colors inline-flex items-center gap-1.5",
            annual ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          Annual
          <span
            className={cn(
              "inline-flex items-center rounded-full px-1.5 py-px text-[10px] font-semibold",
              annual ? "bg-zinc-950/15 text-zinc-950" : "bg-violet-500/15 text-violet-200"
            )}
          >
            -20%
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {PLANS.map((plan) => {
          const price = annual ? plan.annual : plan.monthly;
          const isCustom = plan.name === "Enterprise";
          return (
            <article
              key={plan.name}
              className={cn(
                "relative rounded-2xl border bg-white/[0.025] p-6 flex flex-col",
                plan.highlight
                  ? "border-violet-500/40 bg-gradient-to-b from-violet-500/[0.08] to-transparent shadow-[0_0_80px_-20px_rgba(139,92,246,0.4)]"
                  : "border-white/[0.06]"
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border border-violet-500/40 bg-violet-500/15 backdrop-blur px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-violet-200">
                  Most loved
                </span>
              )}
              <div>
                <h3 className="text-[18px] font-semibold tracking-tight text-zinc-100">
                  {plan.name}
                </h3>
                <p className="mt-1.5 text-[13px] text-zinc-400">{plan.tagline}</p>
              </div>
              <div className="mt-6 flex items-baseline gap-1">
                {isCustom ? (
                  <span className="text-[36px] font-semibold tracking-tight text-zinc-100">
                    Custom
                  </span>
                ) : (
                  <>
                    <span className="text-[44px] font-semibold tracking-tight text-zinc-50 numeric leading-none">
                      ${price}
                    </span>
                    <span className="text-[13px] text-zinc-500">
                      /seat / mo {annual && price > 0 ? "· billed yearly" : ""}
                    </span>
                  </>
                )}
              </div>
              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-zinc-300">
                    <span
                      className={cn(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                        plan.highlight
                          ? "border-violet-500/40 bg-violet-500/15 text-violet-200"
                          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      )}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Magnetic strength={plan.highlight ? 0.18 : 0.12}>
                  <Link
                    href={plan.href}
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-1.5 h-10 rounded-md text-[13.5px] font-medium transition-colors",
                      plan.highlight
                        ? "bg-zinc-100 text-zinc-950 hover:bg-white"
                        : "border border-white/[0.1] bg-white/[0.04] text-zinc-200 hover:bg-white/[0.07] hover:border-white/[0.18]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                    )}
                  >
                    {plan.cta}
                  </Link>
                </Magnetic>
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
