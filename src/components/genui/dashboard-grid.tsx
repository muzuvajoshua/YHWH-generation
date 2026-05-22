"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { DashboardLayout, BlockDefinition } from "@/types";
import { BlockRenderer } from "./block-renderer";
import { cn } from "@/lib/utils";

interface DashboardGridProps {
  layout: DashboardLayout;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
};

export function DashboardGrid({ layout, className }: DashboardGridProps) {
  return (
    <div className={cn("w-full space-y-4", className)}>
      <div>
        <h2 className="text-[15px] font-semibold tracking-tight text-zinc-100">
          {layout.title}
        </h2>
        {layout.description && (
          <p className="mt-0.5 text-[12.5px] text-zinc-500 leading-relaxed">
            {layout.description}
          </p>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
      >
        {layout.blocks.map((block: BlockDefinition) => {
          const span = Math.min(Math.max(block.span ?? 2, 1), 4);
          return (
            <motion.div
              key={block.id}
              variants={itemVariants}
              className={cn(
                "col-span-1",
                span >= 2 && "sm:col-span-2",
                span === 1 && "sm:col-span-1",
                span === 1 && "lg:col-span-1",
                span === 2 && "lg:col-span-2",
                span === 3 && "lg:col-span-3",
                span === 4 && "lg:col-span-4"
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
