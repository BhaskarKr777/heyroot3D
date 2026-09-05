"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const TESTIMONIALS = [
  {
    quote:
      "They didn't touch a single pixel until they understood why customers were leaving. That's never happened with an agency before.",
    name: "Priya Nair",
    role: "Founder, Orchard & Co.",
  },
  {
    quote:
      "We thought our funnel was fine. Five user interviews later, HeyRoot found the one screen that was quietly costing us a third of our trials.",
    name: "Sam Okafor",
    role: "Head of Growth, Northwind SaaS",
  },
  {
    quote:
      "Our site finally looks like the work we actually do. Inbound leads doubled within a quarter of launch.",
    name: "Lena Voss",
    role: "Creative Director, Marrow Studio",
  },
];

function TestimonialCard({
  quote,
  name,
  role,
  delay,
}: {
  quote: string;
  name: string;
  role: string;
  delay: number;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="flex flex-col gap-5 bg-paper-panel rounded-2xl p-7 shadow-[0_8px_30px_rgba(42,33,28,0.06)] transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="font-display text-4xl text-coral/40 leading-none">&ldquo;</span>
      <p className="text-ink text-base md:text-lg leading-relaxed -mt-4">{quote}</p>
      <div className="mt-auto pt-2">
        <p className="font-display font-semibold text-ink text-sm">{name}</p>
        <p className="text-ink-muted text-sm">{role}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref: headingRef, visible: headingVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative z-20 bg-paper px-6 py-24 md:py-28">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-4 mb-14">
        <div
          ref={headingRef}
          className="flex flex-col items-center gap-4 transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-coral-dark/80">
            Proof, not promises
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink max-w-lg">
            What clients say after we dig in
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.name} {...t} delay={i * 120} />
        ))}
      </div>
    </section>
  );
}
