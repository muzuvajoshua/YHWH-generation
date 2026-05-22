"use client";

import React from "react";
import { BlockDefinition } from "@/types";
import { blockRegistry } from "@/components/blocks";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface BlockRendererProps {
  block: BlockDefinition;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  const Component = blockRegistry[block.type];

  if (!Component) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center gap-2 p-6 text-center min-h-[120px]">
          <AlertTriangle className="h-5 w-5 text-amber-400/70" />
          <p className="text-[13px] font-medium text-zinc-300">
            Unknown block type
          </p>
          <p className="text-[11px] text-zinc-600 font-mono">
            &ldquo;{block.type}&rdquo;
          </p>
        </div>
      </Card>
    );
  }

  return <Component data={block.data} />;
}
