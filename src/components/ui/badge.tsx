import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium leading-none tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-white/[0.06] text-zinc-300 border border-white/[0.08]",
        accent:
          "bg-violet-500/12 text-violet-300 border border-violet-500/25",
        success:
          "bg-emerald-500/10 text-emerald-300 border border-emerald-500/25",
        warning:
          "bg-amber-500/10 text-amber-300 border border-amber-500/25",
        destructive:
          "bg-red-500/10 text-red-300 border border-red-500/25",
        info:
          "bg-sky-500/10 text-sky-300 border border-sky-500/25",
        outline:
          "bg-transparent text-zinc-400 border border-white/[0.12]",
        secondary:
          "bg-zinc-800/60 text-zinc-300 border border-white/[0.08]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
