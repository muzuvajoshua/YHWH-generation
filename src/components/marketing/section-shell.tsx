import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type SectionAttrs = Omit<React.HTMLAttributes<HTMLElement>, "title">;
interface SectionShellProps extends SectionAttrs {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  innerClassName?: string;
  children: React.ReactNode;
}

/**
 * A canonical marketing section: optional eyebrow / title / description,
 * consistent vertical rhythm, and an inner max-width container. Use this
 * for every section on the landing page so spacing never drifts.
 */
export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  innerClassName,
  children,
  ...rest
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("relative py-20 sm:py-28", className)}
      {...rest}
    >
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8")}>
        {(eyebrow || title || description) && (
          <header
            className={cn(
              "max-w-2xl mb-12",
              align === "center" && "mx-auto text-center"
            )}
          >
            {eyebrow && (
              <Reveal as="p" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300/90">
                {eyebrow}
              </Reveal>
            )}
            {title && (
              <Reveal as="h2" delay={60} className="mt-3 text-[28px] sm:text-[40px] font-semibold tracking-tight text-gradient leading-[1.1]">
                {title}
              </Reveal>
            )}
            {description && (
              <Reveal as="p" delay={120} className="mt-4 text-[15px] sm:text-[16px] text-zinc-400 leading-relaxed">
                {description}
              </Reveal>
            )}
          </header>
        )}
        <div className={innerClassName}>{children}</div>
      </div>
    </section>
  );
}
