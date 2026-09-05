"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";

const range = getSceneRange("rootAudit");
const PADDING = 0.15;

function visibility(p: number) {
  const start = range.start - PADDING;
  const end = range.end + PADDING;
  if (p < start || p > end) return 0;
  const fadeIn = Math.min(1, (p - start) / PADDING);
  const fadeOut = Math.min(1, (end - p) / PADDING);
  return Math.min(fadeIn, fadeOut);
}

export default function Crystal() {
  const outerMesh = useRef<THREE.Mesh>(null);
  const innerMesh = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const vis = visibility(scrollProgress.value);
    const t = clock.getElapsedTime();

    if (outerMesh.current) {
      outerMesh.current.rotation.y = t * 0.45;
      outerMesh.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      outerMesh.current.position.y = -20 + Math.sin(t * 1.2) * 0.15;
      outerMesh.current.scale.setScalar(0.6 * vis);
    }

    if (innerMesh.current) {
      innerMesh.current.rotation.y = -t * 0.7;
      innerMesh.current.rotation.z = Math.cos(t * 0.6) * 0.3;
      innerMesh.current.position.y = -20 + Math.sin(t * 1.2) * 0.15;
      innerMesh.current.scale.setScalar(0.35 * vis);
    }

    if (ring1.current) {
      ring1.current.position.y = -20 + Math.sin(t * 1.2) * 0.15;
      ring1.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.8) * 0.2;
      ring1.current.rotation.y = t * 0.9;
      ring1.current.scale.setScalar(vis);
    }

    if (ring2.current) {
      ring2.current.position.y = -20 + Math.sin(t * 1.2) * 0.15;
      ring2.current.rotation.x = -Math.PI / 4 + Math.cos(t * 0.7) * 0.2;
      ring2.current.rotation.z = t * 0.75;
      ring2.current.scale.setScalar(vis);
    }

    if (mat.current) {
      mat.current.emissiveIntensity = 1.8 + Math.sin(t * 2.5) * 0.4;
    }

    if (light.current) {
      light.current.intensity = vis * 4.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Core Crystal */}
      <mesh ref={outerMesh} position={[0, -20, -0.3]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          ref={mat}
          color="#ffe9b0"
          emissive="#ffd25f"
          emissiveIntensity={1.8}
          roughness={0.12}
          metalness={0.4}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Inner Heart Core */}
      <mesh ref={innerMesh} position={[0, -20, -0.3]}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#ff8a70"
          emissive="#ff6b4a"
          emissiveIntensity={2.2}
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>

      {/* Energy Orbit Rings */}
      <mesh ref={ring1} position={[0, -20, -0.3]}>
        <torusGeometry args={[0.95, 0.018, 12, 32]} />
        <meshBasicMaterial color="#ffd25f" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2} position={[0, -20, -0.3]}>
        <torusGeometry args={[1.2, 0.015, 12, 32]} />
        <meshBasicMaterial color="#ff8a70" transparent opacity={0.45} />
      </mesh>

      <pointLight ref={light} color="#ffd25f" distance={10} intensity={0} />
    </group>
  );
}
