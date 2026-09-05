"use client";

import { Sparkles } from "@react-three/drei";

export default function ParticlesField() {
  return (
    <group>
      {/* Surface golden pollen & sunbeams */}
      <Sparkles
        count={70}
        scale={[16, 5, 16]}
        position={[0, 1.2, 0]}
        size={2.4}
        speed={0.25}
        color="#ffb23e"
        opacity={0.8}
      />
      {/* Underground earthy dust motes */}
      <Sparkles
        count={85}
        scale={[7, 26, 7]}
        position={[0, -14, 0]}
        size={1.6}
        speed={0.15}
        color="#e8c99a"
        opacity={0.45}
      />
      {/* Root glow bioluminescent energy particles */}
      <Sparkles
        count={60}
        scale={[5, 6, 5]}
        position={[0, -20, 0]}
        size={3.2}
        speed={0.5}
        color="#ffd25f"
        opacity={0.9}
      />
      {/* Tree canopy blossoming fireflies & pollen */}
      <Sparkles
        count={110}
        scale={[12, 10, 12]}
        position={[0, 13, 0]}
        size={2.8}
        speed={0.35}
        color="#fff1c2"
        opacity={0.85}
      />
      {/* Sprout vitality particles */}
      <Sparkles
        count={45}
        scale={[8, 6, 8]}
        position={[0, 3, 0]}
        size={2.2}
        speed={0.3}
        color="#72c9a0"
        opacity={0.7}
      />
    </group>
  );
}
