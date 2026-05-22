import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-white/[0.08] bg-white/[0.03] px-3 text-[13px] text-zinc-100",
          "placeholder:text-zinc-500",
          "transition-[background,border,box-shadow] duration-150",
          "hover:border-white/[0.14] hover:bg-white/[0.05]",
          "focus-visible:outline-none focus-visible:border-violet-500/40 focus-visible:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-violet-500/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
