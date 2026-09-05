"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import World from "./World";
import SmoothScroll from "./SmoothScroll";
import Overlay from "./overlay/Overlay";
import { initPointerTracking } from "@/lib/pointer";
import { sceneReady } from "@/lib/sceneReady";
import { scrollProgress } from "@/lib/scrollProgress";

export default function Experience() {
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => initPointerTracking(), []);

  // The canvas is fixed for the whole page so the scroll-driven tree scene
  // reads as one continuous journey, but it must not keep showing through
  // once the scroll track ends and the flat ContactSection/Footer take
  // over below it — otherwise the frozen tree leaks through their
  // transparent-background nav bar.
  useEffect(() => {
    const unsubscribe = scrollProgress.subscribe((p) => {
      const el = canvasWrapRef.current;
      if (!el) return;
      const pastEnd = p >= 1;
      el.style.opacity = pastEnd ? "0" : "1";
      el.style.visibility = pastEnd ? "hidden" : "visible";
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="relative">
      <div ref={canvasWrapRef} className="fixed inset-0 -z-10 transition-opacity duration-200">
        <Canvas
          dpr={[1, 1.5]}
          shadows="soft"
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
          camera={{ fov: 55, near: 0.1, far: 80 }}
          onCreated={() => sceneReady.set(true)}
        >
          <CameraRig />
          <World />
        </Canvas>
      </div>

      <SmoothScroll>
        <Overlay />
      </SmoothScroll>
    </div>
  );
}
