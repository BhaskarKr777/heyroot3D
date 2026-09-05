"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";

const crackRange = getSceneRange("crack");

// Same open-air fade as Clouds/Birds — butterflies belong to the
// surface/crack scenes near the grass, not the scenes below ground.
function skyOpacity(p: number) {
  if (p <= crackRange.start) return 1;
  if (p >= crackRange.end) return 0;
  return 1 - (p - crackRange.start) / (crackRange.end - crackRange.start);
}

// Two wing-flap frames drawn as a plain white silhouette so each instance
// can be tinted a different color via its own spriteMaterial.color.
function butterflyTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";

  // wings open (left half of the atlas)
  ctx.beginPath();
  ctx.ellipse(18, 24, 12, 9, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(46, 24, 12, 9, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(22, 38, 7, 6, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(42, 38, 7, 6, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // wings folded (right half — narrow, mid-flap)
  ctx.beginPath();
  ctx.ellipse(86, 26, 4, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(106, 26, 4, 13, 0, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

type ButterflyDef = {
  baseX: number;
  baseZ: number;
  baseY: number;
  ampX: number;
  ampZ: number;
  freqX: number;
  freqZ: number;
  flapSpeed: number;
  color: string;
};

const BUTTERFLY_DEFS: ButterflyDef[] = [
  { baseX: -3.2, baseZ: 2.5, baseY: 0.6, ampX: 1.8, ampZ: 1.1, freqX: 0.35, freqZ: 0.55, flapSpeed: 9, color: "#ff8a70" },
  { baseX: 2.6, baseZ: 3.6, baseY: 0.75, ampX: 1.4, ampZ: 1.4, freqX: 0.42, freqZ: 0.3, flapSpeed: 10, color: "#ffc96a" },
  { baseX: -1.2, baseZ: 5.2, baseY: 0.45, ampX: 1.6, ampZ: 0.9, freqX: 0.28, freqZ: 0.48, flapSpeed: 8.4, color: "#72c9a0" },
];

const UV_OPEN = new THREE.Vector2(0, 0);
const UV_FOLDED = new THREE.Vector2(0.5, 0);
const UV_SIZE = new THREE.Vector2(0.5, 1);

export default function Butterflies() {
  // Each butterfly gets its own texture clone so wing-flap UV offset stays
  // independent, same trick as Birds.
  const textures = useMemo(() => {
    if (typeof document === "undefined") return null;
    const base = butterflyTexture();
    return BUTTERFLY_DEFS.map(() => {
      const t = base.clone();
      t.repeat.copy(UV_SIZE);
      t.needsUpdate = true;
      return t;
    });
  }, []);
  const sprites = useRef<(THREE.Sprite | null)[]>([]);

  useFrame(({ clock }) => {
    const fade = skyOpacity(scrollProgress.value);
    const t = clock.getElapsedTime();
    sprites.current.forEach((sprite, i) => {
      if (!sprite) return;
      const def = BUTTERFLY_DEFS[i];
      sprite.position.x = def.baseX + Math.sin(t * def.freqX + i) * def.ampX;
      sprite.position.z = def.baseZ + Math.cos(t * def.freqZ + i * 2) * def.ampZ;
      sprite.position.y = def.baseY + Math.sin(t * 1.8 + i * 3) * 0.18;

      const flap = Math.sin(t * def.flapSpeed + i) > 0;
      const mat = sprite.material as THREE.SpriteMaterial;
      mat.opacity = 0.9 * fade;
      mat.map?.offset.copy(flap ? UV_OPEN : UV_FOLDED);
    });
  });

  if (!textures) return null;

  return (
    <group>
      {BUTTERFLY_DEFS.map((def, i) => (
        <sprite
          key={i}
          ref={(el) => {
            sprites.current[i] = el;
          }}
          position={[def.baseX, def.baseY, def.baseZ]}
          scale={[0.32, 0.16, 1]}
        >
          <spriteMaterial
            map={textures[i]}
            color={def.color}
            transparent
            depthWrite={false}
            opacity={0.9}
          />
        </sprite>
      ))}
    </group>
  );
}
