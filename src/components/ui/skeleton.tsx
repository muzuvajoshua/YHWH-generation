import * as React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use "shimmer" for a moving gradient effect or "pulse" for opacity animation */
  variant?: "pulse" | "shimmer";
}

function Skeleton({ className, variant = "shimmer", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white/5",
        variant === "pulse" && "animate-pulse",
        variant === "shimmer" && [
          "relative overflow-hidden",
          "before:absolute before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent before:via-white/[0.07] before:to-transparent",
        ],
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
