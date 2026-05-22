"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function ThinkingDots() {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d % 3) + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex gap-0.5 items-end h-4">
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: i <= dots ? 1 : 0.2, y: i <= dots ? -2 : 0 }}
          transition={{ duration: 0.2 }}
          className="block w-1 h-1 rounded-full bg-violet-400"
        />
      ))}
    </span>
  );
}

// Skeleton layout: mimic a small dashboard grid
const skeletonBlocks = [
  { span: 1, height: "h-24" },
  { span: 1, height: "h-24" },
  { span: 1, height: "h-24" },
  { span: 1, height: "h-24" },
  { span: 2, height: "h-48" },
  { span: 2, height: "h-48" },
  { span: 4, height: "h-36" },
];

export function StreamingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-4"
    >
      {/* Thinking header */}
      <div className="flex items-center gap-2.5 text-sm text-zinc-400">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600/20 border border-violet-500/30">
          <span className="text-xs">✦</span>
        </div>
        <span>AI is thinking</span>
        <ThinkingDots />
      </div>

      {/* Skeleton header */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-48 rounded-md" />
        <Skeleton className="h-3.5 w-72 rounded-md" />
      </div>

      {/* Skeleton grid */}
      <div className="grid grid-cols-4 gap-4">
        {skeletonBlocks.map((block, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden",
              block.height,
              block.span === 1 && "col-span-1",
              block.span === 2 && "col-span-2",
              block.span === 4 && "col-span-4"
            )}
          >
            <div className="p-4 space-y-3 h-full">
              <Skeleton className="h-3.5 w-24 rounded" />
              <Skeleton className="h-6 w-16 rounded" />
              {block.span >= 2 && (
                <div className="flex-1 space-y-2 pt-2">
                  <Skeleton className="h-full w-full rounded" style={{ minHeight: 80 }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
