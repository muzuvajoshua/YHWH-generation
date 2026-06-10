"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

/**
 * SSR-safe reveal: starts hidden, transitions in once it intersects the viewport.
 * Falls back to visible-by-default if IntersectionObserver is unavailable or
 * the user prefers reduced motion (handled by globals.css).
 */
export function Reveal({
  as = "div",
  className,
  children,
  delay = 0,
  once = true,
  threshold = 0.15,
  style,
  ...rest
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  // If IntersectionObserver isn't available (SSR-rendered HTML or older
  // environments) start visible — never block content on motion.
  const [inView, setInView] = React.useState<boolean>(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined"
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      data-state={inView ? "in-view" : "out"}
      className={cn("reveal", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

interface StaggerGroupProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
}

/**
 * Marks every direct child with .stagger-item + a --stagger-i custom property,
 * then flips them to in-view on intersection. No framer-motion needed for this.
 */
export function StaggerGroup({
  as = "div",
  className,
  children,
  threshold = 0.15,
  ...rest
}: StaggerGroupProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [inView, setInView] = React.useState<boolean>(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined"
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const wrapped = React.Children.map(children, (child, i) => {
    if (!React.isValidElement(child)) return child;
    const el = child as React.ReactElement<{
      className?: string;
      style?: React.CSSProperties;
      "data-state"?: string;
    }>;
    return React.cloneElement(el, {
      className: cn("stagger-item", el.props.className),
      style: { ...(el.props.style ?? {}), ["--stagger-i" as string]: i },
      "data-state": inView ? "in-view" : "out",
    });
  });

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className} {...rest}>
      {wrapped}
    </Tag>
  );
}
