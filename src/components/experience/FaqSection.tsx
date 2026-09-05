"use client";

import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const FAQS = [
  {
    q: "What actually happens during a Root Audit?",
    a: "We spend a few days going through your website, funnel, and brand the way a real customer would — then hand back a short, specific report on the exact points where people drop off, and why.",
  },
  {
    q: "Is the Root Audit really free?",
    a: "Yes. No call required to get it, no obligation after. If there's a good fit for a bigger project, we'll say so — but the audit stands on its own either way.",
  },
  {
    q: "Do you work with early-stage startups, or only established brands?",
    a: "Both. Early-stage teams get the same root-cause process, just scoped to what matters most before launch. We'd rather fix the foundation early than rebuild it later.",
  },
  {
    q: "How long does a full project take?",
    a: "Most projects move through Seed, Root, Sprout, and Tree in six to ten weeks, depending on scope. We'll give you a real timeline after the audit, not a generic estimate.",
  },
  {
    q: "What if we already have a designer or dev team?",
    a: "That's common. We can run the audit and strategy work, then hand off clear specs — or work alongside your team through build. Either way, no territorial handoffs.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="border-b border-ink/10 transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg md:text-xl font-semibold text-ink">{q}</span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center text-ink transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-ink-muted pb-6 max-w-2xl">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const { ref: headingRef, visible: headingVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative z-20 bg-paper-panel px-6 py-24 md:py-28">
      <div className="max-w-3xl mx-auto">
        <div
          ref={headingRef}
          className="flex flex-col gap-4 mb-10 transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-coral-dark/80">
            Questions
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink">
            Before you dig in
          </h2>
        </div>

        <div>
          {FAQS.map((f) => (
            <FaqItem key={f.q} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
