"use client";

import { useState } from "react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <section
      id="root-audit"
      className="relative z-20 bg-paper px-6 py-28 flex flex-col items-center text-center gap-6"
    >
      <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink max-w-lg">
        Claim your free Root Audit
      </h2>
      <p className="text-ink-muted max-w-md">
        Tell us where to send it. We&apos;ll take a look at your website,
        funnel, and brand — and show you exactly what&apos;s holding growth
        back.
      </p>

      {status === "idle" ? (
        <form
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("sent");
          }}
        >
          <input
            type="email"
            required
            placeholder="you@company.com"
            className="flex-1 rounded-full px-5 py-3 bg-white border border-ink/10 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-coral"
          />
          <button
            type="submit"
            className="font-display font-semibold rounded-full px-6 py-3 bg-coral text-white hover:bg-coral-dark transition-colors"
          >
            Get my audit
          </button>
        </form>
      ) : (
        <p className="font-display text-lg text-sprout font-medium mt-2">
          Planted. We&apos;ll be in touch within 2 business days.
        </p>
      )}
    </section>
  );
}
