"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { sampleTimeline } from "@/lib/timeline";
import { cameraFocus } from "@/lib/cameraFocus";
import { prefersReducedMotion } from "@/lib/motionPreference";

const posA = new THREE.Vector3();
const posB = new THREE.Vector3();
const lookA = new THREE.Vector3();
const lookB = new THREE.Vector3();
const targetPos = new THREE.Vector3();
const targetLook = new THREE.Vector3();
const pullBack = new THREE.Vector3();
const colorA = new THREE.Color();
const colorB = new THREE.Color();

// Waypoints are framed for a ~16:9 desktop viewport. On narrower/taller
// viewports (tablet, mobile portrait) we pull the camera back along its
// existing look-direction so the same composition still fits instead of
// cropping the sides or clipping through foreground objects.
function aspectPullBack(aspect: number) {
  const NARROW = 0.9;
  const WIDE = 1.5;
  const t = THREE.MathUtils.clamp((WIDE - aspect) / (WIDE - NARROW), 0, 1);
  return THREE.MathUtils.lerp(1, 1.55, t);
}

export default function CameraRig() {
  const { scene } = useThree();
  const currentLook = useRef(new THREE.Vector3(0, 1, 0));
  const currentPos = useRef(new THREE.Vector3(0, 3.4, 9));
  const fog = useRef(new THREE.Fog("#fff6ee", 8, 28));
  const bg = useRef(new THREE.Color("#fff6ee"));
  const reducedMotion = useRef(prefersReducedMotion());

  scene.fog = fog.current;
  scene.background = bg.current;

  useFrame(({ camera, size, clock }) => {
    const { a, b, t } = sampleTimeline(scrollProgress.value);

    colorA.set(a.bg);
    colorB.set(b.bg);
    bg.current.copy(colorA).lerp(colorB, t);

    colorA.set(a.fog);
    colorB.set(b.fog);
    fog.current.color.copy(colorA).lerp(colorB, t);
    fog.current.near = THREE.MathUtils.lerp(a.fogNear, b.fogNear, t);
    fog.current.far = THREE.MathUtils.lerp(a.fogFar, b.fogFar, t);

    if (cameraFocus.active) {
      // A case-study leaf was clicked — fly to it instead of the
      // scroll-driven waypoint, ignoring aspect pullback so the framing
      // is exact.
      targetPos.set(...cameraFocus.position);
      targetLook.set(...cameraFocus.lookAt);
    } else {
      posA.set(...a.camPos);
      posB.set(...b.camPos);
      targetPos.copy(posA).lerp(posB, t);

      lookA.set(...a.lookAt);
      lookB.set(...b.lookAt);
      targetLook.copy(lookA).lerp(lookB, t);

      const aspect = size.width / size.height;
      const scale = aspectPullBack(aspect);
      currentLook.current.lerp(targetLook, 0.18);
      pullBack.copy(targetPos).sub(currentLook.current).multiplyScalar(scale);
      targetPos.copy(currentLook.current).add(pullBack);
    }

    if (cameraFocus.active) {
      currentLook.current.lerp(targetLook, 0.12);
    }

    // Ease the camera toward its target rather than snapping every frame —
    // reads as a smooth cinematic dolly instead of a rigid scroll-locked rig.
    currentPos.current.lerp(targetPos, 0.14);

    // Faint idle drift so the world still feels alive when the user isn't
    // scrolling. Skipped for prefers-reduced-motion — this motion isn't
    // tied to any user action, so it's exactly the kind of thing that
    // preference asks us to drop.
    let driftX = 0;
    let driftY = 0;
    if (!reducedMotion.current) {
      const time = clock.getElapsedTime();
      driftX = Math.sin(time * 0.15) * 0.06;
      driftY = Math.cos(time * 0.12) * 0.04;
    }

    camera.position.set(
      currentPos.current.x + driftX,
      currentPos.current.y + driftY,
      currentPos.current.z
    );
    camera.lookAt(currentLook.current);
  });

  return null;
}
