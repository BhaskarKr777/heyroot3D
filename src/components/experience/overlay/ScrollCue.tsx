"use client";

import { useEffect, useRef } from "react";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";

const fadeEnd = getSceneRange("surface").end * 0.55;

export default function ScrollCue() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (ref.current) {
        const opacity = Math.max(0, 1 - scrollProgress.value / fadeEnd);
        ref.current.style.opacity = String(opacity);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
        Scroll to dig in
      </span>
      <span className="scroll-cue-chevron w-5 h-5 border-b-2 border-r-2 border-ink-muted rotate-45" />
    </div>
  );
}
