"use client";

import { useMemo } from "react";
import * as THREE from "three";

// Camera travels down the vertical axis; these are open-ended cylinder
// "tunnel walls" seen from the inside, so depth reads as layers passing by
// rather than a flat wall blocking the view.
const LAYERS = [
  { y: -4, color: "#4a3324", height: 6 },
  { y: -9.5, color: "#3c2a1c", height: 7 },
  { y: -16, color: "#2e2015", height: 7 },
  { y: -22.5, color: "#1e140d", height: 7 },
];

const TUNNEL_RADIUS = 5.5;

function Rocks() {
  const rocks = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: number; rot: [number, number, number] }[] = [];
    for (let i = 0; i < 26; i++) {
      const y = -2 - Math.random() * 21;
      const angle = Math.random() * Math.PI * 2;
      const radius = TUNNEL_RADIUS * (0.7 + Math.random() * 0.25);
      arr.push({
        pos: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        scale: 0.2 + Math.random() * 0.45,
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {rocks.map((r, i) => (
        <mesh key={i} position={r.pos} rotation={r.rot} scale={r.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#5c4632" roughness={0.95} flatShading />
        </mesh>
      ))}
    </group>
  );
}

export default function SoilLayers() {
  return (
    <group>
      {LAYERS.map((layer, i) => (
        <mesh key={i} position={[0, layer.y, 0]}>
          <cylinderGeometry
            args={[TUNNEL_RADIUS, TUNNEL_RADIUS, layer.height, 24, 1, true]}
          />
          <meshStandardMaterial color={layer.color} roughness={1} side={THREE.BackSide} />
        </mesh>
      ))}
      {/* floor cap at the very bottom so the shaft doesn't look bottomless */}
      <mesh position={[0, -26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[TUNNEL_RADIUS, 24]} />
        <meshStandardMaterial color="#150d09" roughness={1} />
      </mesh>
      <Rocks />
    </group>
  );
}
