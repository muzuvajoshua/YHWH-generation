"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "text-[13px] font-medium leading-none",
    "transition-[background,border,color,box-shadow] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        // Quiet, sophisticated default — no gradient
        default:
          "bg-zinc-100 text-zinc-950 hover:bg-white border border-transparent",
        // Subtle surface button
        secondary:
          "bg-white/[0.06] text-zinc-100 border border-white/[0.08] hover:bg-white/[0.09] hover:border-white/[0.12]",
        // Transparent — used for icon buttons and toolbar actions
        ghost:
          "bg-transparent text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100 border border-transparent",
        // Outlined — for medium-importance secondary actions
        outline:
          "border border-white/[0.12] bg-transparent text-zinc-200 hover:bg-white/[0.04] hover:border-white/[0.18]",
        // Accent — the brand action
        accent:
          "bg-violet-600 text-white hover:bg-violet-500 border border-violet-500/30 shadow-[0_0_0_1px_rgba(139,92,246,0.2)_inset]",
        // Destructive
        destructive:
          "bg-red-600/15 text-red-300 border border-red-500/30 hover:bg-red-600/22 hover:border-red-500/45",
        // Link
        link:
          "bg-transparent text-violet-300 hover:text-violet-200 underline-offset-4 hover:underline border border-transparent px-0",
      },
      size: {
        xs: "h-7 px-2.5 rounded-md text-[12px]",
        sm: "h-8 px-3 rounded-md",
        md: "h-9 px-3.5 rounded-md",
        lg: "h-10 px-4 rounded-lg text-sm",
        icon: "h-9 w-9 rounded-md",
        "icon-sm": "h-8 w-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
