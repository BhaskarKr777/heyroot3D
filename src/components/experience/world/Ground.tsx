"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";
import { pointer } from "@/lib/pointer";
import { prefersReducedMotion } from "@/lib/motionPreference";

const crackRange = getSceneRange("crack");

function localProgress(p: number) {
  if (p <= crackRange.start) return 0;
  if (p >= crackRange.end) return 1;
  return (p - crackRange.start) / (crackRange.end - crackRange.start);
}

const GRASS_COUNT = 260;

function bladeGeometry() {
  const geo = new THREE.PlaneGeometry(0.09, 1, 1, 4);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) + 0.5; // 0 (base) .. 1 (tip)
    const taper = 1 - y * 0.72;
    pos.setX(i, pos.getX(i) * taper);
    // gentle forward bend toward the tip
    pos.setZ(i, Math.pow(y, 2) * 0.16);
  }
  geo.translate(0, 0.5, 0);
  geo.computeVertexNormals();
  return geo;
}

function Grass() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const cursorTilt = useRef(0);
  const reducedMotion = useRef(prefersReducedMotion());
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geo = useMemo(() => bladeGeometry(), []);

  const blades = useMemo(() => {
    const arr: { x: number; z: number; scale: number; rot: number; phase: number; lean: number }[] = [];
    for (let i = 0; i < GRASS_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.2 + Math.random() * 10.5;
      arr.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        scale: 0.32 + Math.random() * 0.4,
        rot: Math.random() * Math.PI,
        phase: Math.random() * Math.PI * 2,
        lean: (Math.random() - 0.5) * 0.5,
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      // Wind sway plus a gentle lean toward the cursor, smoothed so the
      // blades don't twitch on every small mouse move. The cursor part is
      // skipped under prefers-reduced-motion.
      if (!reducedMotion.current) {
        cursorTilt.current = THREE.MathUtils.lerp(cursorTilt.current, pointer.x * 0.05, 0.04);
      }
      group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.01 + cursorTilt.current;
    }
    const m = ref.current;
    if (!m) return;
    const t = clock.getElapsedTime();
    blades.forEach((b, i) => {
      const sway = Math.sin(t * 1.4 + b.phase) * 0.14;
      dummy.position.set(b.x, 0, b.z);
      dummy.rotation.set(sway * 0.3, b.rot, b.lean + sway);
      dummy.scale.set(1, b.scale, 1);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={ref} args={[geo, undefined, GRASS_COUNT]}>
        <meshStandardMaterial color="#6bbd93" roughness={0.65} side={THREE.DoubleSide} />
      </instancedMesh>
    </group>
  );
}

function SunGlow() {
  const mat = useRef<THREE.SpriteMaterial>(null);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.opacity = 0.5 + Math.sin(clock.getElapsedTime() * 0.6) * 0.05;
  });
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(255,230,180,0.9)");
    grad.addColorStop(0.4, "rgba(255,210,140,0.35)");
    grad.addColorStop(1, "rgba(255,210,140,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }, []);
  if (!texture) return null;
  return (
    <sprite position={[-5.5, 6.5, -14]} scale={[9, 9, 1]}>
      <spriteMaterial ref={mat} map={texture} transparent depthWrite={false} opacity={0.5} />
    </sprite>
  );
}

export default function Ground() {
  const leftSlab = useRef<THREE.Mesh>(null);
  const rightSlab = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const t = localProgress(scrollProgress.value);
    const shift = t * 3.2;
    if (leftSlab.current) leftSlab.current.position.x = -2.5 - shift;
    if (rightSlab.current) rightSlab.current.position.x = 2.5 + shift;
  });

  return (
    <group>
      <SunGlow />

      {/* distant hill silhouette for atmospheric depth */}
      <mesh position={[0, -3.4, -22]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[26, 32]} />
        <meshStandardMaterial color="#e7d3ae" roughness={1} />
      </mesh>

      {/* dark gap revealed beneath the crack */}
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 40]} />
        <meshStandardMaterial color="#241811" roughness={1} />
      </mesh>

      {/* Standard (lit) material instead of basic so the ground actually
          shades and receives the sun's shadow — a flat unlit color was
          the single biggest thing making this read as flat/cartoon. */}
      <mesh ref={leftSlab} position={[-2.5, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 40]} />
        <meshStandardMaterial color="#fdeee0" roughness={0.95} />
      </mesh>
      <mesh ref={rightSlab} position={[2.5, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 40]} />
        <meshStandardMaterial color="#fdeee0" roughness={0.95} />
      </mesh>

      <Grass />
    </group>
  );
}
