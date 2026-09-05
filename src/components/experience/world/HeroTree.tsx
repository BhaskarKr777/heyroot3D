"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";
import { generateCanopy, generateBranches } from "@/lib/canopy";
import { pointer } from "@/lib/pointer";
import { prefersReducedMotion } from "@/lib/motionPreference";

const surfaceEnd = getSceneRange("surface").end;
const crackEnd = getSceneRange("crack").end;

function heroTreeScale(p: number) {
  if (p < surfaceEnd) return 1;
  if (p > crackEnd) return 0;
  return 1 - (p - surfaceEnd) / (crackEnd - surfaceEnd);
}

const FOLIAGE_COLORS = [
  "#3a9b6e",
  "#4fb286",
  "#5fc79a",
  "#72c9a0",
  "#8de0b2",
  "#a8e89d",
];

const CANOPY_CENTER: [number, number, number] = [0, 5.6, 0];

function createHeroTrunkCurve() {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.08, 1.2, 0.05),
    new THREE.Vector3(-0.06, 2.6, -0.04),
    new THREE.Vector3(0, 4.2, 0),
  ]);
  return new THREE.TubeGeometry(curve, 20, 0.34, 10, false);
}

export default function HeroTree() {
  const group = useRef<THREE.Group>(null);
  const foliageGroup = useRef<THREE.Group>(null);
  const tiltX = useRef(0);
  const tiltZ = useRef(0);
  const reducedMotion = useRef(prefersReducedMotion());

  const foliage = useMemo(
    () =>
      generateCanopy({
        count: 42,
        center: CANOPY_CENTER,
        radiusXZ: 1.85,
        radiusY: 1.5,
        colors: FOLIAGE_COLORS,
        minScale: 0.4,
        maxScale: 0.95,
      }),
    []
  );

  const branches = useMemo(
    () =>
      generateBranches({
        count: 6,
        trunkTop: [0, 4.1, 0],
        canopyCenter: CANOPY_CENTER,
        spread: 1.6,
        radiusStart: 0.18,
        radiusEnd: 0.06,
      }),
    []
  );

  const trunkGeo = useMemo(() => createHeroTrunkCurve(), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const scale = heroTreeScale(scrollProgress.value);
    group.current.visible = scale > 0.001;
    group.current.scale.setScalar(scale);
    group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.04;

    if (foliageGroup.current) {
      foliageGroup.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.6) * 0.015;
    }

    if (!reducedMotion.current) {
      tiltX.current = THREE.MathUtils.lerp(tiltX.current, pointer.y * 0.05, 0.05);
      tiltZ.current = THREE.MathUtils.lerp(tiltZ.current, pointer.x * 0.06, 0.05);
      group.current.rotation.x = tiltX.current;
      group.current.rotation.z = tiltZ.current;
    }
  });

  return (
    <group ref={group} position={[0, 0, -9]}>
      {/* Curved organic trunk */}
      <mesh geometry={trunkGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#503624" roughness={0.8} />
      </mesh>

      {/* Root flare at the ground */}
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.72, 0.35, 10]} />
        <meshStandardMaterial color="#503624" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[0, 0.3, 0]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.95, 0.12, 10]} />
        <meshStandardMaterial color="#3e2a1b" roughness={0.9} />
      </mesh>

      {/* Supporting branches */}
      {branches.map((b, i) => (
        <mesh key={i} position={b.position} rotation={b.rotation} castShadow>
          <cylinderGeometry args={[b.radiusEnd, b.radiusStart, b.length, 7]} />
          <meshStandardMaterial color="#503624" roughness={0.8} />
        </mesh>
      ))}

      {/* Lush Foliage Clouds */}
      <group ref={foliageGroup}>
        {foliage.map((f, i) => (
          <mesh
            key={i}
            position={f.pos}
            scale={f.scale}
            rotation={f.rotation}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color={f.color}
              roughness={0.65}
              metalness={0.05}
              flatShading
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
