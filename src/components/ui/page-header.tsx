import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        "border-b border-white/[0.06] pb-6",
        className
      )}
    >
      <div className="flex items-start gap-3 min-w-0">
        {icon ? (
          <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] text-zinc-400">
            {icon}
          </div>
        ) : null}
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 mb-1.5">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-[22px] sm:text-2xl font-semibold tracking-tight text-zinc-50 leading-tight">
            {title}
          </h1>
          {description ? (
            <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed max-w-2xl">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {actions ? (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      ) : null}
    </header>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-3 mb-4",
        className
      )}
    >
      <div className="min-w-0">
        <h2 className="text-[13px] font-semibold text-zinc-300 tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="mt-0.5 text-[12px] text-zinc-500 leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2 shrink-0">{actions}</div> : null}
    </div>
  );
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({
  size = "xl",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "sm" && "max-w-2xl",
        size === "md" && "max-w-3xl",
        size === "lg" && "max-w-5xl",
        size === "xl" && "max-w-7xl",
        size === "full" && "max-w-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
