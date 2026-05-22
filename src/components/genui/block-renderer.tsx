"use client";

import React from "react";
import { BlockDefinition } from "@/types";
import { blockRegistry } from "@/components/blocks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface BlockRendererProps {
  block: BlockDefinition;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  const Component = blockRegistry[block.type];

  if (!Component) {
    return (
      <Card className="flex flex-col items-center justify-center gap-2 p-6 text-center min-h-[120px]">
        <AlertTriangle className="h-6 w-6 text-amber-500/70" />
        <p className="text-sm font-medium text-zinc-400">Unknown block type</p>
        <p className="text-xs text-zinc-600 font-mono">&ldquo;{block.type}&rdquo;</p>
      </Card>
    );
  }

  return <Component data={block.data} />;
}
