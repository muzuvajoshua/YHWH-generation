"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number;
  radius?: number;
  as?: "div" | "span";
}

/**
 * Cursor-aware magnetic hover. Pointer-only — no-ops on touch and reduced-motion.
 * Costs one rAF per pointer move. Inert until the cursor enters.
 */
export function Magnetic({
  strength = 0.25,
  radius = 120,
  className,
  children,
  as = "div",
  ...rest
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const frame = React.useRef(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) return reset();
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = "translate3d(0,0,0)";
      });
    };
    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(frame.current);
    };
  }, [strength, radius]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={cn("transition-transform duration-300 ease-out will-change-transform", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
