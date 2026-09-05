"use client";

import { useEffect, useRef } from "react";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";

type Align = "left" | "center" | "right";

// Fade in over the first ~24% of the scene's own range, hold at full
// opacity through the middle, fade out over the last ~24%. Driven directly
// off the same progress value the camera uses — no DOM-position math, so
// it can't be thrown off by sticky/absolute edge cases at either end of
// the (very tall) scroll track.
function computeOpacity(progress: number, start: number, end: number) {
  if (progress < start || progress > end) return 0;
  const local = (progress - start) / (end - start);
  const rate = 4.2;
  // The very first scene should be fully visible on initial load, not
  // require a scroll nudge to fade in from progress===start===0.
  const fadeIn = start <= 0 ? 1 : Math.min(1, local * rate);
  const fadeOut = Math.min(1, (1 - local) * rate);
  return Math.min(fadeIn, fadeOut);
}

export default function SceneText({
  sceneId,
  align = "center",
  className = "",
  children,
}: {
  sceneId: string;
  align?: Align;
  className?: string;
  children: React.ReactNode;
}) {
  const range = getSceneRange(sceneId);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const opacity = computeOpacity(scrollProgress.value, range.start, range.end);
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${(1 - opacity) * 24}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [range.start, range.end]);

  const justifyClass =
    align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";
  const alignClass =
    align === "left" ? "items-start text-left" : align === "right" ? "items-end text-right" : "items-center text-center";

  return (
    <div
      className={`fixed inset-0 z-10 flex items-center ${justifyClass} px-6 md:px-16 py-24`}
      style={{ pointerEvents: "none" }}
    >
      <div
        ref={ref}
        className={`flex flex-col ${alignClass} max-w-xl gap-4 ${className}`}
        style={{ opacity: 0 }}
      >
        {children}
      </div>
    </div>
  );
}
