"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/shell/sidebar";
import { TopBar } from "@/components/shell/top-bar";
import { CommandPalette } from "@/components/shell/command-palette";
import { usePathname } from "next/navigation";

const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/analytics": "Analytics",
  "/workspace": "AI Workspace",
  "/reports": "Reports",
  "/settings": "Settings",
};

export default function Template({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const pathname = usePathname();
  const pageName = PAGE_NAMES[pathname] ?? "Dashboard OS";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <TopBar
          pageName={pageName}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Command palette overlay */}
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />
    </div>
  );
}
