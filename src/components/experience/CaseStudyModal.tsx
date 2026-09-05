"use client";

import { useEffect, useState } from "react";
import { caseStudyModal } from "@/lib/caseStudyModal";
import { cameraFocus } from "@/lib/cameraFocus";

const CASE_STUDIES: Record<string, { name: string; result: string; body: string }> = {
  orchard: {
    name: "Orchard & Co.",
    result: "3x organic conversion in 90 days",
    body: "A local retail brand with beautiful products and a website that hid them. We rebuilt the funnel around what customers actually search for, not what looked nice in a moodboard.",
  },
  northwind: {
    name: "Northwind SaaS",
    result: "40% more activated trials",
    body: "Strong retention, leaky signup flow. We found the root cause in five user interviews, not five dashboards — then fixed the one screen that was quietly losing everyone.",
  },
  marrow: {
    name: "Marrow Studio",
    result: "Inbound leads doubled",
    body: "A design studio whose own site undersold their work. We rebuilt the brand story from the ground up so it finally matched the quality of what they actually make.",
  },
};

export default function CaseStudyModal() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = caseStudyModal.subscribe(setActiveId);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Lock body scroll while the modal is open so the underlying scroll
    // position can't drift while the camera is parked on the leaf.
    document.documentElement.style.overflow = activeId ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [activeId]);

  const close = () => {
    caseStudyModal.close();
    cameraFocus.clear();
  };

  if (!activeId) return null;
  const study = CASE_STUDIES[activeId];
  if (!study) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center px-6 bg-ink/40 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="bg-paper rounded-2xl max-w-md w-full p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center text-ink-muted transition-colors"
        >
          ×
        </button>
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-sprout">
          {study.result}
        </span>
        <h2 className="font-display text-2xl font-semibold text-ink mt-2 mb-3">
          {study.name}
        </h2>
        <p className="text-ink-muted">{study.body}</p>
        <button
          onClick={close}
          className="font-display text-sm font-semibold rounded-full px-5 py-2.5 bg-coral text-white hover:bg-coral-dark transition-colors mt-6"
        >
          Back to the tree
        </button>
      </div>
    </div>
  );
}
