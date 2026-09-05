"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { serviceModal } from "@/lib/serviceModal";
import { cameraFocus } from "@/lib/cameraFocus";
import { scrollToElementId } from "@/lib/scrollTo";
import { servicesBySlug } from "@/lib/services";

export default function ServiceModal() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = serviceModal.subscribe(setActiveId);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = activeId ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [activeId]);

  const close = () => {
    serviceModal.close();
    cameraFocus.clear();
  };

  const handleAuditClick = () => {
    close();
    scrollToElementId("root-audit");
  };

  if (!activeId) return null;
  const service = servicesBySlug[activeId];
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center px-4 sm:px-6 bg-ink/50 backdrop-blur-sm animate-fade-in"
      onClick={close}
    >
      <div
        className="bg-paper rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-ink/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center text-ink-muted hover:text-ink transition-colors font-mono text-lg"
        >
          ×
        </button>

        <span className="font-mono text-xs tracking-[0.2em] uppercase text-coral-dark font-medium">
          {service.eyebrow}
        </span>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-2 mb-3">
          {service.title}
        </h2>

        <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
          {service.description}
        </p>

        {/* Highlights */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {service.heroHighlights.slice(0, 2).map((h) => (
            <div key={h.label} className="bg-white/80 border border-ink/5 rounded-xl p-3">
              <span className="block font-mono text-[10px] uppercase text-ink-muted">
                {h.label}
              </span>
              <span className="block font-display text-sm font-semibold text-ink mt-0.5">
                {h.value}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href={`/services/${service.slug}`}
            onClick={close}
            className="flex-1 font-display text-sm font-semibold rounded-full px-5 py-3 bg-coral text-white hover:bg-coral-dark transition-all text-center shadow-md shadow-coral/25"
          >
            Explore Full Service Guide →
          </Link>
          <button
            onClick={handleAuditClick}
            className="font-display text-sm font-semibold rounded-full px-5 py-3 border border-ink/15 text-ink hover:bg-white transition-colors"
          >
            Claim Root Audit
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={close}
            className="font-mono text-xs text-ink-muted hover:text-ink transition-colors"
          >
            ← Return to 3D Tree
          </button>
        </div>
      </div>
    </div>
  );
}
