"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";

const rootStart = getSceneRange("root").start;
const glowEnd = getSceneRange("glow").end;
const sproutMid = getSceneRange("sprout").mid;

function glowIntensity(p: number) {
  if (p < rootStart) return 0.15;
  if (p > sproutMid) return 3.2;
  const t = (p - rootStart) / (glowEnd - rootStart);
  return THREE.MathUtils.lerp(0.15, 3.2, Math.min(1, Math.max(0, t)));
}

function makeTube(points: THREE.Vector3[], radius: number) {
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, 64, radius, 8, false);
}

export default function RootSystem() {
  const trunkMat = useRef<THREE.MeshStandardMaterial>(null);
  const branchMats = useRef<THREE.MeshStandardMaterial[]>([]);

  // The trunk hugs the tunnel wall (off-axis, out of the camera's direct
  // path) while the story is still in the soil/dig scenes, then curves back
  // to center exactly where the "root" scene camera arrives — so it reads
  // as something glimpsed in the periphery until the story reaches it.
  const trunkGeo = useMemo(
    () =>
      makeTube(
        [
          new THREE.Vector3(-2.8, -0.3, -1.8),
          new THREE.Vector3(-3.2, -6.5, -1.2),
          new THREE.Vector3(-2.6, -12.5, -0.6),
          new THREE.Vector3(-1.2, -16.5, -0.2),
          new THREE.Vector3(0.4, -19, 0.3),
          new THREE.Vector3(0, -22, 0),
          new THREE.Vector3(-0.5, -25.5, 0.6),
        ],
        0.32
      ),
    []
  );

  const branches = useMemo(() => {
    const seeds: [THREE.Vector3, THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(-1, -17, -0.1), new THREE.Vector3(2.2, -13, -1.5), new THREE.Vector3(3.6, -16, -2)],
      [new THREE.Vector3(-2, -13, -0.5), new THREE.Vector3(-3.6, -17, 0.6), new THREE.Vector3(-4.4, -20.5, 1.6)],
      [new THREE.Vector3(0.2, -20, 0.1), new THREE.Vector3(2, -22, 1.4), new THREE.Vector3(2.8, -24.5, 2.4)],
    ];
    return seeds.map((pts) => makeTube(pts, 0.16));
  }, []);

  useFrame(() => {
    const intensity = glowIntensity(scrollProgress.value);
    if (trunkMat.current) trunkMat.current.emissiveIntensity = intensity;
    branchMats.current.forEach((m) => {
      if (m) m.emissiveIntensity = intensity * 0.75;
    });
  });

  return (
    <group>
      <mesh geometry={trunkGeo}>
        <meshStandardMaterial
          ref={trunkMat}
          color="#4a3324"
          emissive="#ffd25f"
          emissiveIntensity={0.15}
          roughness={0.7}
        />
      </mesh>
      {branches.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshStandardMaterial
            ref={(m) => {
              if (m) branchMats.current[i] = m;
            }}
            color="#3c2a1c"
            emissive="#ffd25f"
            emissiveIntensity={0.15}
            roughness={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}
