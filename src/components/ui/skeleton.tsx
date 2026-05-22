import * as React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "pulse" | "shimmer";
}

function Skeleton({ className, variant = "shimmer", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-white/[0.04]",
        variant === "pulse" && "animate-pulse",
        variant === "shimmer" && [
          "relative overflow-hidden isolate",
          "before:absolute before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_1.6s_linear_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent before:via-white/[0.06] before:to-transparent",
        ],
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
