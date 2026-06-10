"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
}

/**
 * Lightweight scroll-tied parallax. Updates a CSS variable each frame instead
 * of triggering React renders, so it's cheap even with several instances.
 */
export function Parallax({
  speed = 0.15,
  className,
  children,
  style,
  ...rest
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.setProperty("--parallax-y", `${-centerOffset * speed}px`);
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ transform: "translate3d(0, var(--parallax-y, 0px), 0)", ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
