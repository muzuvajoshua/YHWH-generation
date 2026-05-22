"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  BarChart3,
  BrainCircuit,
  FileText,
  Settings,
  Sparkles,
  LayoutDashboard,
  TrendingUp,
  Users,
  Zap,
  CornerDownLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CommandSection = "Quick actions" | "Navigation" | "AI suggestions";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  shortcut?: string;
  section: CommandSection;
  href?: string;
}

const allItems: CommandItem[] = [
  {
    id: "new-dashboard",
    label: "New dashboard",
    description: "Open the workspace and start composing",
    icon: <LayoutDashboard className="h-3.5 w-3.5" />,
    shortcut: "N",
    section: "Quick actions",
    href: "/workspace",
  },
  {
    id: "refresh",
    label: "Refresh data",
    description: "Pull the latest metrics across the workspace",
    icon: <Zap className="h-3.5 w-3.5" />,
    shortcut: "R",
    section: "Quick actions",
  },
  {
    id: "export",
    label: "Export dashboard",
    description: "Download the current view as PDF or PNG",
    icon: <FileText className="h-3.5 w-3.5" />,
    section: "Quick actions",
  },
  // Navigation
  {
    id: "nav-home",
    label: "Home",
    icon: <Home className="h-3.5 w-3.5" />,
    shortcut: "G H",
    section: "Navigation",
    href: "/",
  },
  {
    id: "nav-analytics",
    label: "Analytics",
    icon: <BarChart3 className="h-3.5 w-3.5" />,
    shortcut: "G A",
    section: "Navigation",
    href: "/analytics",
  },
  {
    id: "nav-workspace",
    label: "Workspace",
    icon: <BrainCircuit className="h-3.5 w-3.5" />,
    shortcut: "G W",
    section: "Navigation",
    href: "/workspace",
  },
  {
    id: "nav-reports",
    label: "Reports",
    icon: <FileText className="h-3.5 w-3.5" />,
    shortcut: "G R",
    section: "Navigation",
    href: "/reports",
  },
  {
    id: "nav-settings",
    label: "Settings",
    icon: <Settings className="h-3.5 w-3.5" />,
    shortcut: "G S",
    section: "Navigation",
    href: "/settings",
  },
  // AI suggestions
  {
    id: "ai-revenue",
    label: "Show quarterly revenue",
    description: "Generate a revenue performance dashboard",
    icon: <TrendingUp className="h-3.5 w-3.5" />,
    section: "AI suggestions",
    href: "/workspace",
  },
  {
    id: "ai-marketing",
    label: "Create a marketing dashboard",
    description: "Analyze campaign performance and channels",
    icon: <Sparkles className="h-3.5 w-3.5" />,
    section: "AI suggestions",
    href: "/workspace",
  },
  {
    id: "ai-users",
    label: "Analyze user growth",
    description: "User acquisition and retention",
    icon: <Users className="h-3.5 w-3.5" />,
    section: "AI suggestions",
    href: "/workspace",
  },
  {
    id: "ai-productivity",
    label: "Compare team productivity",
    description: "Team performance metrics quarter-over-quarter",
    icon: <BarChart3 className="h-3.5 w-3.5" />,
    section: "AI suggestions",
    href: "/workspace",
  },
];

const SECTIONS: CommandSection[] = [
  "Quick actions",
  "Navigation",
  "AI suggestions",
];

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({
  open: controlledOpen,
  onOpenChange,
}: CommandPaletteProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = useCallback(
    (val: boolean) => {
      if (onOpenChange) onOpenChange(val);
      else setInternalOpen(val);
    },
    [onOpenChange]
  );

  // Cmd+K toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q)
    );
  }, [query]);

  const runItem = useCallback(
    (item: CommandItem) => {
      if (item.href) router.push(item.href);
      setIsOpen(false);
    },
    [router, setIsOpen]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[selectedIndex];
        if (item) runItem(item);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, filtered, selectedIndex, runItem]);

  useEffect(() => setSelectedIndex(0), [query]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -10 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "fixed left-1/2 top-[15%] z-50 -translate-x-1/2",
                  "w-[calc(100vw-2rem)] max-w-xl rounded-xl",
                  "border border-white/[0.08] bg-zinc-900/95 backdrop-blur-2xl",
                  "shadow-2xl shadow-black/60 overflow-hidden"
                )}
              >
                <DialogPrimitive.Title className="sr-only">
                  Command palette
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  Search for commands, navigation, and AI actions
                </DialogPrimitive.Description>

                <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-3.5 py-3">
                  <Search className="h-4 w-4 shrink-0 text-zinc-500" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command or search…"
                    className="flex-1 bg-transparent text-[13.5px] text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                    ESC
                  </kbd>
                </div>

                <div className="max-h-[400px] overflow-y-auto py-1.5">
                  {filtered.length === 0 && (
                    <p className="py-10 text-center text-[13px] text-zinc-500">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                  )}

                  {SECTIONS.map((section) => {
                    const items = filtered.filter((i) => i.section === section);
                    if (items.length === 0) return null;
                    return (
                      <div key={section} className="mb-1">
                        <p className="px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">
                          {section}
                        </p>
                        {items.map((item) => {
                          const globalIdx = filtered.indexOf(item);
                          const isSelected = globalIdx === selectedIndex;
                          return (
                            <button
                              key={item.id}
                              onMouseEnter={() => setSelectedIndex(globalIdx)}
                              onClick={() => runItem(item)}
                              className={cn(
                                "flex w-full items-center gap-2.5 px-3.5 py-2 text-left transition-colors",
                                isSelected
                                  ? "bg-white/[0.06] text-zinc-100"
                                  : "text-zinc-300 hover:bg-white/[0.04]"
                              )}
                            >
                              <span
                                className={cn(
                                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border",
                                  isSelected
                                    ? "border-violet-500/30 bg-violet-500/12 text-violet-200"
                                    : "border-white/[0.08] bg-white/[0.03] text-zinc-500"
                                )}
                              >
                                {item.icon}
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block text-[13px] font-medium truncate">
                                  {item.label}
                                </span>
                                {item.description && (
                                  <span className="block text-[11.5px] text-zinc-500 truncate">
                                    {item.description}
                                  </span>
                                )}
                              </span>
                              {item.shortcut && (
                                <kbd className="shrink-0 rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                                  {item.shortcut}
                                </kbd>
                              )}
                              {isSelected && (
                                <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-violet-300" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-4 border-t border-white/[0.05] px-3.5 py-2 text-[10.5px] text-zinc-600">
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1 py-px font-mono">
                      ↑↓
                    </kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1 py-px font-mono">
                      ↵
                    </kbd>
                    select
                  </span>
                  <span className="ml-auto flex items-center gap-1.5">
                    <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1 py-px font-mono">
                      ⌘K
                    </kbd>
                    toggle
                  </span>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
