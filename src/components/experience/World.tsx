"use client";

import { Environment, Lightformer } from "@react-three/drei";
import Ground from "./world/Ground";
import SoilLayers from "./world/SoilLayers";
import RootSystem from "./world/RootSystem";
import Crystal from "./world/Crystal";
import Tree from "./world/Tree";
import HeroTree from "./world/HeroTree";
import Clouds from "./world/Clouds";
import Birds from "./world/Birds";
import Butterflies from "./world/Butterflies";
import RealisticSky from "./world/RealisticSky";
import ParticlesField from "./world/ParticlesField";
import Bud from "./Bud";

export default function World() {
  return (
    <group>
      {/* Balanced ambient fill light so shadows preserve warm color depth */}
      <ambientLight intensity={0.28} />

      {/* Sun: warm golden key light casting soft crisp shadows */}
      <directionalLight
        position={[8, 15, 7]}
        intensity={2.8}
        color="#fff7e8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-bias={-0.0008}
      />
      
      {/* Hemisphere light: sky tint above, warm ground reflection below */}
      <hemisphereLight args={["#dff2ff", "#503824", 0.32]} />

      {/* Soft image-based lighting reflection maps */}
      <Environment resolution={128} background={false}>
        <Lightformer
          form="rect"
          intensity={0.65}
          color="#e8f5ff"
          scale={[30, 30, 1]}
          position={[0, 22, -6]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#fff2da"
          scale={[14, 14, 1]}
          position={[8, 8, 7]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <Lightformer
          form="rect"
          intensity={0.35}
          color="#422f20"
          scale={[30, 30, 1]}
          position={[0, -22, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Environment>

      <RealisticSky />
      <Clouds />
      <Birds />
      <Ground />
      <HeroTree />
      <Butterflies />
      <SoilLayers />
      <RootSystem />
      <Crystal />
      <Tree />
      <ParticlesField />
      <Bud />
    </group>
  );
}
