"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scrollProgress";
import { getSceneRange } from "@/lib/timeline";
import { generateCanopy, generateBranches } from "@/lib/canopy";
import { cameraFocus } from "@/lib/cameraFocus";
import { caseStudyModal } from "@/lib/caseStudyModal";
import { serviceModal } from "@/lib/serviceModal";

const glowStart = getSceneRange("glow").start;
const treeStart = getSceneRange("tree").start;
// Keep the mature tree to the right of the left-aligned story cards in the
// later scenes. Children use local coordinates, so this moves the complete
// tree composition (trunk, canopy, service nodes, and case-study fruit) as one.
const TREE_POSITION = new THREE.Vector3(2.4, 0, 0);

function treeGrowth(p: number) {
  if (p < glowStart) return 0;
  if (p > treeStart) return 1;
  return (p - glowStart) / (treeStart - glowStart);
}

// Spatially staggered service positions to guarantee zero label overlap at any camera angle
const services = [
  { id: "web-development", name: "Web Development", pos: new THREE.Vector3(-4.4, 3.8, 3.0), color: "#ff6b4a" },
  { id: "3d-web-development", name: "3D Web Dev", pos: new THREE.Vector3(4.4, 4.2, 2.6), color: "#ffb23e" },
  { id: "seo-optimization", name: "SEO Optimization", pos: new THREE.Vector3(-5.4, 5.8, -0.6), color: "#4fb286" },
  { id: "website-optimization", name: "Website Optimization", pos: new THREE.Vector3(5.4, 6.0, -0.4), color: "#5fc79a" },
  { id: "rebranding", name: "Rebranding", pos: new THREE.Vector3(-3.4, 7.8, -3.2), color: "#ff8a70" },
  { id: "website-redesign", name: "Website Redesign", pos: new THREE.Vector3(3.5, 8.0, -3.0), color: "#72c9a0" },
  { id: "brand-redesign", name: "Brand Redesign", pos: new THREE.Vector3(0, 9.2, 3.8), color: "#ffd25f" },
];

const caseStudies = [
  { id: "orchard", name: "Orchard & Co.", pos: new THREE.Vector3(-3.2, 12.2, 2.2), color: "#ff8a70" },
  { id: "northwind", name: "Northwind SaaS", pos: new THREE.Vector3(3.2, 13.8, -1.0), color: "#72c9a0" },
  { id: "marrow", name: "Marrow Studio", pos: new THREE.Vector3(-1.8, 15.4, -1.5), color: "#ffc96a" },
];

function visibleRange(id: string, padding = 0.08) {
  const r = getSceneRange(id);
  return { start: r.start - padding, end: r.end + padding };
}

function useRangeOpacity(id: string) {
  const ref = useRef(0);
  const { start, end } = useMemo(() => visibleRange(id), [id]);
  return () => {
    const p = scrollProgress.value;
    if (p < start || p > end) return 0;
    const fadeSpan = 0.015;
    const fadeIn = Math.min(1, (p - start) / fadeSpan);
    const fadeOut = Math.min(1, (end - p) / fadeSpan);
    ref.current = Math.min(fadeIn, fadeOut);
    return ref.current;
  };
}

/**
 * Floating Service Pedestal with glowing pulse ring,
 * mossy crystal stone, and glassmorphic badge.
 */
function ServiceIsland({
  id,
  name,
  pos,
  color,
}: {
  id: string;
  name: string;
  pos: THREE.Vector3;
  color: string;
}) {
  const group = useRef<THREE.Group>(null);
  const stone = useRef<THREE.Mesh>(null);
  const glowRing = useRef<THREE.Mesh>(null);
  const sprout = useRef<THREE.Mesh>(null);
  const html = useRef<HTMLButtonElement>(null);
  const getOpacity = useRangeOpacity("tree");
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = pos.y + Math.sin(t * 1.2 + pos.x) * 0.15;
      group.current.rotation.y = Math.sin(t * 0.5 + pos.z) * 0.08;
    }
    if (stone.current) {
      const targetScale = hovered ? 1.2 : 1;
      stone.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.2);
    }
    if (glowRing.current) {
      const pulse = 1 + Math.sin(t * 2.5 + pos.x) * 0.12;
      glowRing.current.scale.set(pulse, pulse, pulse);
      (glowRing.current.material as THREE.MeshBasicMaterial).opacity = hovered ? 0.85 : 0.45;
    }
    if (sprout.current) {
      sprout.current.rotation.y = t * 1.5;
    }
    if (html.current) {
      html.current.style.opacity = String(getOpacity());
    }
  });

  const openService = () => {
    const worldPos = pos.clone().add(TREE_POSITION);
    const dir = worldPos.clone().setY(0).normalize();
    if (dir.lengthSq() === 0) dir.set(0, 0, 1);
    const camPos = worldPos.clone().add(dir.multiplyScalar(2.6)).add(new THREE.Vector3(0, 0.5, 0));
    cameraFocus.focus(
      [camPos.x, camPos.y, camPos.z],
      [worldPos.x, worldPos.y + 0.3, worldPos.z]
    );
    serviceModal.open(id);
  };

  return (
    <group ref={group} position={pos}>
      {/* Glowing base ring */}
      <mesh ref={glowRing} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <ringGeometry args={[0.42, 0.62, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating stone pedestal */}
      <mesh
        ref={stone}
        rotation={[0.15, 0.4, 0.1]}
        onClick={(e) => {
          e.stopPropagation();
          openService();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        castShadow
      >
        <dodecahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial
          color={hovered ? "#6e4a32" : "#503624"}
          roughness={0.75}
          metalness={0.1}
          flatShading
        />
      </mesh>

      {/* Sprouting glowing gem atop the stone */}
      <mesh ref={sprout} position={[0, 0.42, 0]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.0 : 0.45}
          roughness={0.3}
        />
      </mesh>

      <Html center occlude={false} position={[0, 1.05, 0]}>
        <button
          ref={html}
          onClick={openService}
          className="pointer-events-auto font-display text-xs font-semibold text-ink bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-ink/10 whitespace-nowrap hover:bg-coral hover:text-white hover:border-coral hover:scale-105 transition-all cursor-pointer"
          style={{ opacity: 0 }}
        >
          {name}
        </button>
      </Html>
    </group>
  );
}

/**
 * Elegant glowing Case Study Leaf/Fruit node nestled on branch tips
 */
function CaseStudyFruit({
  id,
  name,
  pos,
  color,
}: {
  id: string;
  name: string;
  pos: THREE.Vector3;
  color: string;
}) {
  const group = useRef<THREE.Group>(null);
  const fruit = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const html = useRef<HTMLButtonElement>(null);
  const getOpacity = useRangeOpacity("caseStudies");
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = pos.y + Math.sin(t * 1.5 + pos.x) * 0.12;
      group.current.rotation.y = t * 0.6;
    }
    if (fruit.current) {
      const targetScale = hovered ? 1.25 : 1;
      fruit.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.2);
    }
    if (ring.current) {
      ring.current.rotation.x = t * 1.2;
      ring.current.rotation.z = t * 0.8;
    }
    if (html.current) html.current.style.opacity = String(getOpacity());
  });

  const openCaseStudy = () => {
    const worldPos = pos.clone().add(TREE_POSITION);
    const dir = worldPos.clone().setY(0).normalize();
    if (dir.lengthSq() === 0) dir.set(0, 0, 1);
    const camPos = worldPos.clone().add(dir.multiplyScalar(2.6)).add(new THREE.Vector3(0, 0.4, 0));
    cameraFocus.focus([camPos.x, camPos.y, camPos.z], [worldPos.x, worldPos.y, worldPos.z]);
    caseStudyModal.open(id);
  };

  return (
    <group ref={group} position={pos}>
      {/* Floating orbital aura ring */}
      <mesh ref={ring}>
        <torusGeometry args={[0.38, 0.02, 12, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.65} />
      </mesh>

      {/* Crystalline Fruit Mesh */}
      <mesh
        ref={fruit}
        onClick={(e) => {
          e.stopPropagation();
          openCaseStudy();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        castShadow
      >
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.5}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>

      <Html center occlude={false} position={[0, 0.65, 0]}>
        <button
          ref={html}
          onClick={openCaseStudy}
          className="pointer-events-auto font-display text-xs font-semibold text-ink bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-ink/10 whitespace-nowrap hover:bg-sprout hover:text-white hover:border-sprout hover:scale-105 transition-all cursor-pointer"
          style={{ opacity: 0 }}
        >
          {name}
        </button>
      </Html>
    </group>
  );
}

/**
 * Procedurally builds a beautiful curved organic trunk mesh with root flares.
 */
function createTrunkCurve() {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.12, 2.5, 0.08),
    new THREE.Vector3(-0.15, 5.5, -0.1),
    new THREE.Vector3(0.08, 8.5, 0.12),
    new THREE.Vector3(0, 11.2, 0),
  ]);
  return new THREE.TubeGeometry(curve, 32, 0.65, 12, false);
}

export default function Tree() {
  const group = useRef<THREE.Group>(null);
  const foliageGroup = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const growth = treeGrowth(scrollProgress.value);
    group.current.visible = growth > 0.001;
    group.current.scale.setScalar(0.06 + growth * 0.94);

    // Subtle natural foliage breeze sway
    if (foliageGroup.current) {
      const t = clock.getElapsedTime();
      foliageGroup.current.rotation.y = Math.sin(t * 0.4) * 0.025;
      foliageGroup.current.rotation.z = Math.sin(t * 0.6) * 0.015;
    }
  });

  const canopyCenter: [number, number, number] = [0, 13.2, 0];

  const foliageClusters = useMemo(
    () =>
      generateCanopy({
        count: 75,
        center: canopyCenter,
        radiusXZ: 3.4,
        radiusY: 2.8,
        colors: [
          "#3a9b6e", // deep vibrant base
          "#4fb286", // rich green
          "#5fc79a", // classic sprout
          "#72c9a0", // fresh leaf
          "#8de0b2", // soft sunny highlight
          "#a8e89d", // sun-kissed lime
        ],
        minScale: 0.5,
        maxScale: 1.15,
      }),
    []
  );

  const branches = useMemo(
    () =>
      generateBranches({
        count: 10,
        trunkTop: [0, 11, 0],
        canopyCenter,
        spread: 3.1,
        radiusStart: 0.36,
        radiusEnd: 0.1,
      }),
    []
  );

  const trunkGeo = useMemo(() => createTrunkCurve(), []);

  return (
    <group ref={group} position={TREE_POSITION}>
      {/* Curved organic main trunk */}
      <mesh geometry={trunkGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#4a3324" roughness={0.8} />
      </mesh>

      {/* Root buttresses spreading at the base */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 1.35, 0.6, 12]} />
        <meshStandardMaterial color="#4a3324" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[0, 0.4, 0]} receiveShadow>
        <cylinderGeometry args={[1.2, 1.8, 0.2, 12]} />
        <meshStandardMaterial color="#3c281b" roughness={0.9} />
      </mesh>

      {/* Branches supporting the crown */}
      {branches.map((b, i) => (
        <mesh key={i} position={b.position} rotation={b.rotation} castShadow>
          <cylinderGeometry args={[b.radiusEnd, b.radiusStart, b.length, 8]} />
          <meshStandardMaterial color="#4a3324" roughness={0.8} />
        </mesh>
      ))}

      {/* Lush Foliage Clusters with layered botanic tones */}
      <group ref={foliageGroup}>
        {foliageClusters.map((c, i) => (
          <mesh
            key={i}
            position={c.pos}
            scale={c.scale}
            rotation={c.rotation}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color={c.color}
              roughness={0.65}
              metalness={0.05}
              flatShading
            />
          </mesh>
        ))}
      </group>

      {/* 7 Spatially Staggered Service Pedestals */}
      {services.map((s) => (
        <ServiceIsland
          key={s.id}
          id={s.id}
          name={s.name}
          pos={s.pos}
          color={s.color}
        />
      ))}

      {/* 3 Interactive Case Study Fruit Nodes */}
      {caseStudies.map((c) => (
        <CaseStudyFruit
          key={c.id}
          id={c.id}
          name={c.name}
          pos={c.pos}
          color={c.color}
        />
      ))}
    </group>
  );
}
