"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Home,
  BarChart3,
  BrainCircuit,
  FileText,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "Workspace", icon: BrainCircuit, href: "/workspace" },
  { label: "Reports", icon: FileText, href: "/reports" },
  { label: "Settings", icon: Settings, href: "/settings" },
] as const;

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigate?: () => void;
  className?: string;
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  onNavigate,
  className,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "group/sidebar flex h-full flex-col border-r border-white/[0.06] bg-zinc-950/95",
        "transition-[width] duration-300 ease-out shrink-0",
        collapsed ? "w-[64px]" : "w-[232px]",
        className
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          "flex h-14 items-center gap-2.5 border-b border-white/[0.06]",
          collapsed ? "justify-center px-2" : "px-4"
        )}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/25 text-violet-300">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        {!collapsed && (
          <span className="text-[13px] font-semibold tracking-tight text-zinc-100 whitespace-nowrap">
            Dashboard OS
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {!collapsed && (
          <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">
            Navigate
          </p>
        )}
        <ul className={cn("space-y-0.5", collapsed ? "px-2" : "px-2")}>
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  title={collapsed ? label : undefined}
                  className={cn(
                    "relative flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50",
                    isActive
                      ? "bg-white/[0.06] text-zinc-100"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100",
                    collapsed && "justify-center px-2"
                  )}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r-full bg-violet-400"
                    />
                  )}
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive ? "text-violet-300" : "text-zinc-500"
                    )}
                  />
                  {!collapsed && (
                    <span className="truncate">{label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] p-2">
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-3 py-2 text-[12px] text-zinc-500",
            "hover:bg-white/[0.04] hover:text-zinc-300 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? (
            <ChevronsRight className="h-3.5 w-3.5" />
          ) : (
            <>
              <ChevronsLeft className="h-3.5 w-3.5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
