"use client";

import React from "react";
import { Bell, LogOut, Menu, Search, Settings as SettingsIcon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth/actions";
import { initials, type Session } from "@/lib/auth/types";

interface TopBarProps {
  pageName?: string;
  user: Session;
  onOpenCommandPalette?: () => void;
  onOpenMobileNav?: () => void;
}

export function TopBar({
  pageName = "Home",
  user,
  onOpenCommandPalette,
  onOpenMobileNav,
}: TopBarProps) {
  const userInitials = initials(user.name);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/[0.06] bg-zinc-950/85 backdrop-blur-xl px-4 sm:px-6">
      <button
        onClick={onOpenMobileNav}
        aria-label="Open navigation"
        className="lg:hidden flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200 transition-colors"
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600 leading-none">
          Dashboard OS
        </p>
        <h1 className="mt-0.5 text-[13px] font-semibold text-zinc-100 truncate leading-tight">
          {pageName}
        </h1>
      </div>

      <button
        onClick={onOpenCommandPalette}
        aria-label="Open command palette"
        className={cn(
          "group hidden sm:inline-flex items-center gap-2 h-8 rounded-md",
          "border border-white/[0.08] bg-white/[0.03] pl-2.5 pr-2 text-[12px] text-zinc-500",
          "hover:bg-white/[0.06] hover:border-white/[0.14] hover:text-zinc-300",
          "transition-colors min-w-[180px] md:min-w-[240px]"
        )}
      >
        <Search className="h-3.5 w-3.5 shrink-0 text-zinc-500 group-hover:text-zinc-400" />
        <span className="flex-1 text-left text-zinc-500 group-hover:text-zinc-400">
          Search or run a command…
        </span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-white/[0.08] bg-white/[0.04] px-1 py-0.5 text-[10px] font-medium text-zinc-500">
          <span className="text-[11px] leading-none">⌘</span>K
        </kbd>
      </button>

      <button
        aria-label="Notifications"
        className="relative flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
      >
        <Bell className="h-4 w-4" />
        <span
          aria-hidden
          className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 ring-2 ring-zinc-950"
        />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Account menu"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-[11px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
          >
            {userInitials}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="normal-case tracking-normal py-2 font-normal">
            <span className="block text-[13px] font-medium text-zinc-100 truncate">
              {user.name}
            </span>
            <span className="block text-[11.5px] text-zinc-500 truncate">
              {user.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/app/settings" className="cursor-pointer">
              <User className="h-3.5 w-3.5 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/app/settings" className="cursor-pointer">
              <SettingsIcon className="h-3.5 w-3.5 mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <form action={signOut} className="w-full">
              <button
                type="submit"
                className="flex w-full items-center text-[13px] text-zinc-300"
              >
                <LogOut className="h-3.5 w-3.5 mr-2" />
                Sign out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
