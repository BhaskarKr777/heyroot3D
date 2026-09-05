"use client";

import { useEffect, useState } from "react";
import { sceneReady } from "@/lib/sceneReady";
import { heroReveal } from "@/lib/heroReveal";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";

    let canvasDone = sceneReady.value;
    let fontsDone = false;
    let minTimeDone = false;
    let finished = false;

    const tryFinish = () => {
      if (finished || !(canvasDone && fontsDone && minTimeDone)) return;
      finished = true;
      setFading(true);
      heroReveal.set(true);
      window.setTimeout(() => {
        setVisible(false);
        html.style.overflow = "";
      }, 500);
    };

    const unsubscribe = sceneReady.subscribe((ready) => {
      if (ready) {
        canvasDone = true;
        tryFinish();
      }
    });

    document.fonts.ready.then(() => {
      fontsDone = true;
      tryFinish();
    });

    // Minimum display time so the loader reads as intentional branding
    // rather than a flash — but skip the wait for reduced-motion users
    // who'd rather see content sooner.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minDelay = prefersReducedMotion ? 150 : 900;
    const timer = window.setTimeout(() => {
      minTimeDone = true;
      tryFinish();
    }, minDelay);

    return () => {
      unsubscribe();
      window.clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-50 bg-paper flex flex-col items-center justify-center gap-5 transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        <span className="loader-seed absolute w-9 h-9 rounded-full bg-coral" />
        <span className="loader-sprout absolute -top-2 w-2.5 h-7 bg-sprout rounded-full origin-bottom" />
      </div>
      <p className="font-display text-sm tracking-wide text-ink-muted">Digging in…</p>
    </div>
  );
}
