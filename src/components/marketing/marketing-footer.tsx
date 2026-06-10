import Link from "next/link";
import { BrandMark } from "./brand-mark";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Workspace", href: "#product" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Customers", href: "#customers" },
      { label: "Careers", href: "#" },
      { label: "Press kit", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API reference", href: "#" },
      { label: "Status", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "DPA", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-2 space-y-4">
            <BrandMark size="md" href="/" />
            <p className="text-[13px] text-zinc-500 leading-relaxed max-w-xs">
              The dashboard operating system. Talk to your data, generate
              analytics in real time, ship insights without writing queries.
            </p>
            <p className="text-[11.5px] text-zinc-600">
              © {new Date().getFullYear()} Dashboard OS — all rights reserved.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {col.title}
              </p>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-zinc-400 hover:text-zinc-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <p className="text-[11.5px] text-zinc-600">
            Built with Next.js, Tailwind, Radix, Framer Motion, and the Vercel AI SDK.
          </p>
          <div className="flex items-center gap-4 text-[11.5px] text-zinc-600">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              All systems normal
            </span>
            <span className="hidden sm:inline">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
