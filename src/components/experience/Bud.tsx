"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { sampleTimeline } from "@/lib/timeline";
import { pointer } from "@/lib/pointer";

const posA = new THREE.Vector3();
const posB = new THREE.Vector3();
const target = new THREE.Vector3();

const DIGGING_SCENES = new Set(["underground", "dig"]);
const WAVING_SCENES = new Set(["surface", "cta"]);

// Blinks in short, irregular bursts rather than a constant metronome —
// reads as a living creature instead of a looping animation.
function blinkScale(time: number) {
  const cycle = 3.4;
  const local = time % cycle;
  const blinkStart = cycle - 0.18;
  if (local < blinkStart) return 1;
  const bt = (local - blinkStart) / 0.18;
  return 1 - Math.sin(bt * Math.PI) * 0.92;
}

export default function Bud() {
  const group = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);
  const eyeLeft = useRef<THREE.Group>(null);
  const eyeRight = useRef<THREE.Group>(null);
  const pupilLeft = useRef<THREE.Mesh>(null);
  const pupilRight = useRef<THREE.Mesh>(null);
  const facingY = useRef(0);

  useFrame(({ clock, camera }) => {
    if (!group.current) return;
    const { a, b, t, activeId } = sampleTimeline(scrollProgress.value);
    const time = clock.getElapsedTime();

    posA.set(...a.budPos);
    posB.set(...b.budPos);
    target.copy(posA).lerp(posB, t);
    target.y += Math.sin(time * 1.6) * 0.06; // idle bob

    group.current.position.lerp(target, 0.15);

    // Bud is the guide — it should always be looking at the viewer, not
    // pointed at some arbitrary per-scene angle. Face the camera, with a
    // gentle extra turn toward the cursor for a bit of "it's watching you".
    const dx = camera.position.x - group.current.position.x;
    const dz = camera.position.z - group.current.position.z;
    const faceCameraYaw = Math.atan2(dx, dz);
    const cursorTurn = pointer.x * 0.18;
    facingY.current = THREE.MathUtils.lerp(facingY.current, faceCameraYaw + cursorTurn, 0.08);
    group.current.rotation.y = facingY.current;

    if (head.current) {
      head.current.rotation.z = Math.sin(time * 1.2) * 0.05;
      head.current.rotation.x = THREE.MathUtils.lerp(
        head.current.rotation.x,
        pointer.y * -0.08,
        0.06
      );
    }

    // Pupils drift toward the cursor within the eye socket — the classic
    // "it's watching your mouse" trick, kept subtle so it doesn't look wall-eyed.
    const pupilX = THREE.MathUtils.clamp(pointer.x * 0.045, -0.045, 0.045);
    const pupilY = THREE.MathUtils.clamp(pointer.y * 0.035, -0.035, 0.035);
    if (pupilLeft.current) {
      pupilLeft.current.position.x = THREE.MathUtils.lerp(pupilLeft.current.position.x, pupilX, 0.15);
      pupilLeft.current.position.y = THREE.MathUtils.lerp(pupilLeft.current.position.y, pupilY, 0.15);
    }
    if (pupilRight.current) {
      pupilRight.current.position.x = THREE.MathUtils.lerp(pupilRight.current.position.x, pupilX, 0.15);
      pupilRight.current.position.y = THREE.MathUtils.lerp(pupilRight.current.position.y, pupilY, 0.15);
    }

    const blink = blinkScale(time);
    if (eyeLeft.current) eyeLeft.current.scale.y = blink;
    if (eyeRight.current) eyeRight.current.scale.y = blink;

    const digging = DIGGING_SCENES.has(activeId);
    const waving = WAVING_SCENES.has(activeId);

    if (leftArm.current) {
      leftArm.current.rotation.x = digging
        ? Math.sin(time * 6) * 0.9 - 0.4
        : Math.sin(time * 1.4) * 0.12;
    }
    if (rightArm.current) {
      rightArm.current.rotation.z = waving
        ? Math.sin(time * 4) * 0.5 + 0.6
        : -0.15 + Math.sin(time * 1.4 + 1) * 0.1;
    }
  });

  return (
    <group ref={group} scale={0.62}>
      {/* body */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshStandardMaterial color="#ff6b4a" roughness={0.55} />
      </mesh>
      {/* belly */}
      <mesh position={[0, -0.05, 0.5]}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial color="#ffd9c2" roughness={0.6} />
      </mesh>

      {/* head group (eyes + sprout) */}
      <group ref={head} position={[0, 0.55, 0.15]}>
        {/* sprout leaf */}
        <mesh position={[0, 0.35, -0.1]} rotation={[0.1, 0, 0.15]}>
          <coneGeometry args={[0.16, 0.5, 8]} />
          <meshStandardMaterial color="#4fb286" roughness={0.5} />
        </mesh>
        <mesh position={[0.16, 0.28, -0.15]} rotation={[0.1, 0, -0.4]}>
          <coneGeometry args={[0.12, 0.36, 8]} />
          <meshStandardMaterial color="#5fc79a" roughness={0.5} />
        </mesh>

        {/* eyes */}
        <group ref={eyeLeft} position={[-0.2, 0.05, 0]}>
          <mesh position={[0, 0, 0.52]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh ref={pupilLeft} position={[0, 0, 0.64]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#2a211c" />
          </mesh>
        </group>
        <group ref={eyeRight} position={[0.2, 0.05, 0]}>
          <mesh position={[0, 0, 0.52]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh ref={pupilRight} position={[0, 0, 0.64]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#2a211c" />
          </mesh>
        </group>

        {/* blush */}
        <mesh position={[-0.34, -0.12, 0.48]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#ffb23e" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.34, -0.12, 0.48]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#ffb23e" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* arms */}
      <mesh ref={leftArm} position={[-0.55, -0.05, 0.1]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.08, 0.35, 4, 8]} />
        <meshStandardMaterial color="#ff6b4a" roughness={0.55} />
      </mesh>
      <mesh ref={rightArm} position={[0.55, -0.05, 0.1]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.08, 0.35, 4, 8]} />
        <meshStandardMaterial color="#ff6b4a" roughness={0.55} />
      </mesh>
    </group>
  );
}
