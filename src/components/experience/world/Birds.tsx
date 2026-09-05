"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";
import { pointer } from "@/lib/pointer";
import { prefersReducedMotion } from "@/lib/motionPreference";

const crackRange = getSceneRange("crack");

// Same open-sky fade as Clouds — birds belong to the surface/crack scenes
// and shouldn't linger once the camera drops underground.
function skyOpacity(p: number) {
  if (p <= crackRange.start) return 1;
  if (p >= crackRange.end) return 0;
  return 1 - (p - crackRange.start) / (crackRange.end - crackRange.start);
}

// Two wing-flap frames of a simple ink-colored bird silhouette (a shallow
// "M"), drawn once and reused across all birds/frames via a texture atlas.
function birdTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.strokeStyle = "rgba(42,33,28,0.55)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  // wings up
  ctx.beginPath();
  ctx.moveTo(6, 40);
  ctx.quadraticCurveTo(32, 8, 32, 30);
  ctx.quadraticCurveTo(32, 8, 58, 40);
  ctx.stroke();

  // wings down (offset right, second "frame" in the same texture)
  ctx.beginPath();
  ctx.moveTo(70, 30);
  ctx.quadraticCurveTo(96, 42, 96, 32);
  ctx.quadraticCurveTo(96, 42, 122, 30);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

type BirdDef = {
  x: number;
  y: number;
  z: number;
  scale: number;
  speed: number;
  flapSpeed: number;
  bob: number;
};

const BIRD_DEFS: BirdDef[] = [
  { x: -14, y: 5.6, z: -10, scale: 0.6, speed: 0.55, flapSpeed: 6, bob: 0.12 },
  { x: -16.5, y: 6.1, z: -11.5, scale: 0.5, speed: 0.55, flapSpeed: 6.4, bob: 0.1 },
  { x: -12.5, y: 4.9, z: -9, scale: 0.45, speed: 0.55, flapSpeed: 5.6, bob: 0.14 },
];

const WRAP = 20;
const UV_UP = new THREE.Vector2(0, 0);
const UV_DOWN = new THREE.Vector2(0.5, 0);
const UV_SIZE = new THREE.Vector2(0.5, 1);

export default function Birds() {
  // Each bird needs its own texture instance so its wing-flap UV offset
  // (set per-frame below) doesn't clobber the others — they all share the
  // same underlying canvas image via .clone(), just with independent state.
  const textures = useMemo(() => {
    if (typeof document === "undefined") return null;
    const base = birdTexture();
    return BIRD_DEFS.map(() => {
      const t = base.clone();
      t.repeat.copy(UV_SIZE);
      t.needsUpdate = true;
      return t;
    });
  }, []);
  const sprites = useRef<(THREE.Sprite | null)[]>([]);
  const parallax = useRef<THREE.Group>(null);
  const reducedMotion = useRef(prefersReducedMotion());

  useFrame(({ clock }) => {
    const fade = skyOpacity(scrollProgress.value);
    const t = clock.getElapsedTime();
    sprites.current.forEach((sprite, i) => {
      if (!sprite) return;
      const def = BIRD_DEFS[i];
      const drifted = def.x + t * def.speed;
      const wrapped = (((drifted + WRAP) % (WRAP * 2)) + WRAP * 2) % (WRAP * 2);
      sprite.position.x = wrapped - WRAP;
      sprite.position.y = def.y + Math.sin(t * 1.4 + i) * def.bob;

      const flap = Math.sin(t * def.flapSpeed + i * 2) > 0;
      const mat = sprite.material as THREE.SpriteMaterial;
      mat.opacity = 0.85 * fade;
      mat.map?.offset.copy(flap ? UV_UP : UV_DOWN);
    });

    // Same slow parallax layer as Clouds, at a slightly stronger factor
    // since the birds sit closer to camera. Skipped under
    // prefers-reduced-motion.
    if (parallax.current && !reducedMotion.current) {
      parallax.current.position.x = THREE.MathUtils.lerp(
        parallax.current.position.x,
        pointer.x * 1.4,
        0.03
      );
      parallax.current.position.y = THREE.MathUtils.lerp(
        parallax.current.position.y,
        pointer.y * 0.6,
        0.03
      );
    }
  });

  if (!textures) return null;

  return (
    <group ref={parallax}>
      {BIRD_DEFS.map((def, i) => (
        <sprite
          key={i}
          ref={(el) => {
            sprites.current[i] = el;
          }}
          position={[def.x, def.y, def.z]}
          scale={[def.scale, def.scale * 0.5, 1]}
        >
          <spriteMaterial map={textures[i]} transparent depthWrite={false} opacity={0.85} />
        </sprite>
      ))}
    </group>
  );
}
