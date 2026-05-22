"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { DashboardLayout, BlockDefinition } from "@/types";
import { BlockRenderer } from "./block-renderer";
import { cn } from "@/lib/utils";

interface DashboardGridProps {
  layout: DashboardLayout;
}

const spanClass: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export function DashboardGrid({ layout }: DashboardGridProps) {
  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">{layout.title}</h2>
        {layout.description && (
          <p className="mt-0.5 text-sm text-zinc-500">{layout.description}</p>
        )}
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {layout.blocks.map((block: BlockDefinition) => {
          const span = block.span ?? 2;
          const clampedSpan = Math.min(Math.max(span, 1), 4) as 1 | 2 | 3 | 4;
          return (
            <motion.div
              key={block.id}
              variants={itemVariants}
              className={cn(
                "col-span-1",
                // On large screens, apply the real span
                clampedSpan === 1 && "lg:col-span-1",
                clampedSpan === 2 && "lg:col-span-2",
                clampedSpan === 3 && "lg:col-span-3",
                clampedSpan === 4 && "lg:col-span-4",
                // medium screens: cap at 2
                clampedSpan >= 2 && "sm:col-span-2",
                clampedSpan === 1 && "sm:col-span-1"
              )}
            >
              <BlockRenderer block={block} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
