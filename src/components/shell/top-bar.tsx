"use client";

import React, { useState } from "react";
import { Search, Sun, Moon, Bell, User, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  pageName?: string;
  onOpenCommandPalette?: () => void;
}

export function TopBar({ pageName = "Home", onOpenCommandPalette }: TopBarProps) {
  const [darkMode, setDarkMode] = useState(true);
  const notificationCount = 3;

  return (
    <header className="flex h-16 items-center gap-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl px-6">
      {/* Breadcrumb */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
          Dashboard OS
        </p>
        <h1 className="text-sm font-semibold text-zinc-100 truncate">{pageName}</h1>
      </div>

      {/* Search */}
      <div className="relative hidden sm:flex items-center">
        <Search className="absolute left-3 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          className={cn(
            "h-9 w-56 rounded-lg border border-white/8 bg-white/5 pl-9 pr-3",
            "text-sm text-zinc-300 placeholder:text-zinc-600",
            "focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50",
            "transition-all"
          )}
        />
      </div>

      {/* Cmd+K button */}
      <button
        onClick={onOpenCommandPalette}
        className="hidden md:flex items-center gap-1.5 h-9 px-3 rounded-lg border border-white/8 bg-white/5 text-xs text-zinc-500 hover:bg-white/10 hover:text-zinc-300 transition-colors"
      >
        <Command className="h-3 w-3" />
        <span>K</span>
      </button>

      {/* Theme toggle */}
      <button
        onClick={() => setDarkMode((d) => !d)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200 transition-colors"
        aria-label="Toggle theme"
      >
        {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>

      {/* Notifications */}
      <button
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white leading-none">
            {notificationCount}
          </span>
        )}
      </button>

      {/* User avatar */}
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-600 to-indigo-600 text-white hover:opacity-80 transition-opacity shrink-0"
        aria-label="User menu"
      >
        <User className="h-4 w-4" />
      </button>
    </header>
  );
}
