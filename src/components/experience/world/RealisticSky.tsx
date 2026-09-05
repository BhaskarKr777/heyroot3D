"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";

const crackRange = getSceneRange("crack");

// The physically-based atmosphere only belongs to the open-air surface/crack
// scenes — hidden once the camera drops underground so it doesn't show
// through gaps in the soil geometry.
function skyVisible(p: number) {
  return p < crackRange.end;
}

export default function RealisticSky() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current) {
      group.current.visible = skyVisible(scrollProgress.value);
    }
  });

  return (
    <group ref={group}>
      {/* distance kept well inside the camera's far plane (80) so the sky
          dome isn't clipped — every waypoint's camera position sits well
          within this radius of the origin. */}
      <Sky
        distance={70}
        sunPosition={[12, 16, 10]}
        turbidity={1.5}
        rayleigh={2.4}
        mieCoefficient={0.0025}
        mieDirectionalG={0.8}
      />
    </group>
  );
}
