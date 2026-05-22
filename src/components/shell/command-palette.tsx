"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  shortcut?: string;
  section: "Quick Actions" | "Navigation" | "AI Commands";
  action?: () => void;
}

const allItems: CommandItem[] = [
  // Quick Actions
  {
    id: "new-dashboard",
    label: "New Dashboard",
    description: "Create a blank dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    shortcut: "N",
    section: "Quick Actions",
  },
  {
    id: "refresh",
    label: "Refresh Data",
    description: "Pull latest metrics",
    icon: <Zap className="h-4 w-4" />,
    shortcut: "R",
    section: "Quick Actions",
  },
  {
    id: "export",
    label: "Export Dashboard",
    description: "Download as PDF or PNG",
    icon: <FileText className="h-4 w-4" />,
    section: "Quick Actions",
  },
  // Navigation
  {
    id: "nav-home",
    label: "Home",
    icon: <Home className="h-4 w-4" />,
    shortcut: "G H",
    section: "Navigation",
  },
  {
    id: "nav-analytics",
    label: "Analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    shortcut: "G A",
    section: "Navigation",
  },
  {
    id: "nav-workspace",
    label: "AI Workspace",
    icon: <BrainCircuit className="h-4 w-4" />,
    shortcut: "G W",
    section: "Navigation",
  },
  {
    id: "nav-reports",
    label: "Reports",
    icon: <FileText className="h-4 w-4" />,
    shortcut: "G R",
    section: "Navigation",
  },
  {
    id: "nav-settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
    shortcut: "G S",
    section: "Navigation",
  },
  // AI Commands
  {
    id: "ai-revenue",
    label: "Show quarterly revenue",
    description: "Generate revenue dashboard",
    icon: <TrendingUp className="h-4 w-4" />,
    section: "AI Commands",
  },
  {
    id: "ai-marketing",
    label: "Create marketing dashboard",
    description: "Analyze campaign performance",
    icon: <Sparkles className="h-4 w-4" />,
    section: "AI Commands",
  },
  {
    id: "ai-users",
    label: "Analyze user growth",
    description: "User acquisition & retention",
    icon: <Users className="h-4 w-4" />,
    section: "AI Commands",
  },
  {
    id: "ai-productivity",
    label: "Compare team productivity",
    description: "Team performance metrics",
    icon: <BarChart3 className="h-4 w-4" />,
    section: "AI Commands",
  },
];

const SECTIONS = ["Quick Actions", "Navigation", "AI Commands"] as const;

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
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

  // Cmd+K listener
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

  // Reset query when closed
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

  // Keyboard nav
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
        filtered[selectedIndex]?.action?.();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, filtered, selectedIndex, setIsOpen]);

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
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                  "fixed left-1/2 top-[20%] z-50 -translate-x-1/2",
                  "w-full max-w-xl rounded-2xl",
                  "border border-white/10 bg-zinc-900/90 backdrop-blur-2xl",
                  "shadow-2xl shadow-black/60",
                  "overflow-hidden"
                )}
              >
                <DialogPrimitive.Title className="sr-only">Command Palette</DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">Search for commands, navigation, and AI actions</DialogPrimitive.Description>
                {/* Search bar */}
                <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3.5">
                  <Search className="h-4 w-4 shrink-0 text-zinc-500" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                    ESC
                  </kbd>
                </div>

                {/* Items */}
                <div className="max-h-[400px] overflow-y-auto py-2">
                  {filtered.length === 0 && (
                    <p className="py-8 text-center text-sm text-zinc-600">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                  )}

                  {SECTIONS.map((section) => {
                    const items = filtered.filter((i) => i.section === section);
                    if (items.length === 0) return null;
                    return (
                      <div key={section} className="mb-1">
                        <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                          {section}
                        </p>
                        {items.map((item) => {
                          const globalIdx = filtered.indexOf(item);
                          const isSelected = globalIdx === selectedIndex;
                          return (
                            <button
                              key={item.id}
                              onMouseEnter={() => setSelectedIndex(globalIdx)}
                              onClick={() => {
                                item.action?.();
                                setIsOpen(false);
                              }}
                              className={cn(
                                "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                                isSelected
                                  ? "bg-violet-600/20 text-zinc-100"
                                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                              )}
                            >
                              <span
                                className={cn(
                                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border",
                                  isSelected
                                    ? "border-violet-500/40 bg-violet-600/20 text-violet-400"
                                    : "border-white/8 bg-white/5 text-zinc-500"
                                )}
                              >
                                {item.icon}
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block text-sm font-medium truncate">
                                  {item.label}
                                </span>
                                {item.description && (
                                  <span className="block text-xs text-zinc-600 truncate">
                                    {item.description}
                                  </span>
                                )}
                              </span>
                              {item.shortcut && (
                                <kbd className="shrink-0 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600">
                                  {item.shortcut}
                                </kbd>
                              )}
                              {isSelected && (
                                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 border-t border-white/5 px-4 py-2.5 text-[10px] text-zinc-700">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5">⌘K</kbd>
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
