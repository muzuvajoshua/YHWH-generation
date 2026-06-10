import { Reveal } from "@/components/motion/reveal";

const LOGOS = [
  "ACME · CO",
  "QUANTUM EDGE",
  "STREAMBASE",
  "PIXELFORGE",
  "NEURALPATH",
  "DATASYNC",
  "TECHFLOW",
  "CLOUDNINE",
];

export function LogoCloud() {
  // Duplicate for seamless marquee loop.
  const items = [...LOGOS, ...LOGOS];

  return (
    <section className="relative py-14 sm:py-20 border-y border-white/[0.05]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal as="p" className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Trusted by teams shipping with confidence
        </Reveal>
        <Reveal delay={120} className="mt-8 marquee-pause overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee flex w-max items-center gap-12 sm:gap-16">
            {items.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-[14px] sm:text-[15px] font-semibold tracking-[0.18em] text-zinc-500/80 whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
