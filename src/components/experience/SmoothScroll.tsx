"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollProgress } from "@/lib/scrollProgress";
import { TOTAL_VH } from "@/lib/timeline";
import { lenisStore } from "@/lib/lenisStore";
import { prefersReducedMotion } from "@/lib/motionPreference";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reduced motion: keep scroll input 1:1 instead of layering extra
    // eased/lagged momentum on top — the lag itself is "animation from
    // interaction" that this preference asks us to drop.
    const reduced = prefersReducedMotion();
    const lenis = new Lenis({
      duration: reduced ? 0.01 : 1.15,
      smoothWheel: !reduced,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);
    lenisStore.instance = lenis;

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const trigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.set(self.progress);
      },
    });

    return () => {
      trigger.kill();
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisStore.instance = null;
    };
  }, []);

  return (
    <div ref={trackRef} style={{ height: `${TOTAL_VH}vh`, position: "relative" }}>
      {children}
    </div>
  );
}
