"use client";

import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function ThinkingDots() {
  return (
    <span className="inline-flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -1.5, 0] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.18,
          }}
          className="block w-[5px] h-[5px] rounded-full bg-violet-400"
        />
      ))}
    </span>
  );
}

const skeletonBlocks = [
  { span: 1, height: "h-[110px]" },
  { span: 1, height: "h-[110px]" },
  { span: 1, height: "h-[110px]" },
  { span: 1, height: "h-[110px]" },
  { span: 2, height: "h-[220px]" },
  { span: 2, height: "h-[220px]" },
];

export function StreamingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
      className="w-full space-y-4"
    >
      <div className="flex items-center gap-2.5 text-[12.5px] text-zinc-400">
        <ThinkingDots />
        <span>Composing your dashboard…</span>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-44 rounded" />
        <Skeleton className="h-3 w-72 rounded" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {skeletonBlocks.map((block, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border border-white/[0.06] bg-white/[0.025] overflow-hidden",
              block.height,
              block.span === 1 && "col-span-1",
              block.span === 2 && "col-span-2 sm:col-span-2"
            )}
          >
            <div className="p-4 space-y-3 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-6 w-6 rounded-md" />
              </div>
              <Skeleton className="h-7 w-24 rounded" />
              {block.span >= 2 && (
                <Skeleton className="flex-1 w-full rounded mt-2" />
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
