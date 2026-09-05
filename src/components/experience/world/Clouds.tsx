"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";
import { pointer } from "@/lib/pointer";
import { prefersReducedMotion } from "@/lib/motionPreference";

const crackRange = getSceneRange("crack");

// Clouds only belong to the open-sky surface/crack scenes — fade them out
// as the camera dips underground so they don't linger behind the soil.
function skyOpacity(p: number) {
  if (p <= crackRange.start) return 1;
  if (p >= crackRange.end) return 0;
  return 1 - (p - crackRange.start) / (crackRange.end - crackRange.start);
}

function cloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 160;
  const ctx = canvas.getContext("2d")!;
  const puffs: [number, number, number][] = [
    [80, 100, 52],
    [128, 82, 62],
    [180, 100, 48],
    [105, 112, 42],
    [155, 108, 44],
  ];
  puffs.forEach(([x, y, r]) => {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(255,255,255,0.95)");
    grad.addColorStop(0.55, "rgba(255,255,255,0.65)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });
  return new THREE.CanvasTexture(canvas);
}

type CloudDef = {
  x: number;
  y: number;
  z: number;
  scale: number;
  speed: number;
  opacity: number;
};

const CLOUD_DEFS: CloudDef[] = [
  { x: -9, y: 6.2, z: -16, scale: 7, speed: 0.05, opacity: 0.95 },
  { x: 4, y: 7.4, z: -20, scale: 9, speed: 0.035, opacity: 0.85 },
  { x: 10, y: 5.6, z: -14, scale: 6, speed: 0.06, opacity: 0.9 },
  { x: -3, y: 8.6, z: -24, scale: 8, speed: 0.028, opacity: 0.75 },
  { x: -13, y: 5, z: -22, scale: 6.5, speed: 0.045, opacity: 0.8 },
];

const WRAP = 24;

export default function Clouds() {
  const texture = useMemo(() => (typeof document !== "undefined" ? cloudTexture() : null), []);
  const sprites = useRef<(THREE.Sprite | null)[]>([]);
  const parallax = useRef<THREE.Group>(null);
  const reducedMotion = useRef(prefersReducedMotion());

  useFrame(({ clock }) => {
    const fade = skyOpacity(scrollProgress.value);
    const t = clock.getElapsedTime();
    sprites.current.forEach((sprite, i) => {
      if (!sprite) return;
      const def = CLOUD_DEFS[i];
      const drifted = def.x + t * def.speed;
      const wrapped = (((drifted + WRAP) % (WRAP * 2)) + WRAP * 2) % (WRAP * 2);
      sprite.position.x = wrapped - WRAP;
      (sprite.material as THREE.SpriteMaterial).opacity = def.opacity * fade;
    });

    // Whole cloud layer drifts a little with the cursor — a slow, distant
    // parallax layer behind the tree, smoothed to stay lazy and cloud-like.
    // Skipped under prefers-reduced-motion, same as the other cursor-driven
    // motion in this scene.
    if (parallax.current && !reducedMotion.current) {
      parallax.current.position.x = THREE.MathUtils.lerp(
        parallax.current.position.x,
        pointer.x * 1.1,
        0.02
      );
      parallax.current.position.y = THREE.MathUtils.lerp(
        parallax.current.position.y,
        pointer.y * 0.5,
        0.02
      );
    }
  });

  if (!texture) return null;

  return (
    <group ref={parallax}>
      {CLOUD_DEFS.map((def, i) => (
        <sprite
          key={i}
          ref={(el) => {
            sprites.current[i] = el;
          }}
          position={[def.x, def.y, def.z]}
          scale={[def.scale, def.scale * 0.58, 1]}
        >
          <spriteMaterial map={texture} transparent depthWrite={false} opacity={def.opacity} />
        </sprite>
      ))}
    </group>
  );
}
