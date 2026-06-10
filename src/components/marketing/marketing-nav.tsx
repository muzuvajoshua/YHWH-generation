"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";

const links = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
];

interface MarketingNavProps {
  authed?: boolean;
}

export function MarketingNav({ authed = false }: MarketingNavProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background,border,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-zinc-950/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <BrandMark size="md" />

        <nav className="hidden md:flex items-center gap-1 ml-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-[13px] font-medium text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2">
          {authed ? (
            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-3.5 h-9 text-[13px] font-medium text-zinc-950 hover:bg-white transition-colors"
            >
              Open dashboard
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="inline-flex items-center rounded-md px-3 h-9 text-[13px] font-medium text-zinc-300 hover:text-zinc-100 hover:bg-white/[0.04] transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-3.5 h-9 text-[13px] font-medium text-zinc-950 hover:bg-white transition-colors"
              >
                Start free
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-md text-zinc-300 hover:bg-white/[0.05]"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-[14px] font-medium text-zinc-300 hover:text-zinc-100 hover:bg-white/[0.04]"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 mt-3 border-t border-white/[0.05] grid grid-cols-2 gap-2">
              {authed ? (
                <Link
                  href="/app"
                  className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-zinc-100 h-10 text-[13.5px] font-medium text-zinc-950"
                >
                  Open dashboard
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="inline-flex items-center justify-center rounded-md border border-white/[0.1] h-10 text-[13.5px] font-medium text-zinc-200"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-zinc-100 h-10 text-[13.5px] font-medium text-zinc-950"
                  >
                    Start free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
