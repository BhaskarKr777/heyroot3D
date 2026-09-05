import * as THREE from "three";

export type FoliageCluster = {
  pos: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  color: string;
  swaySpeed: number;
  swayPhase: number;
};

export type BranchSegment = {
  position: [number, number, number];
  rotation: [number, number, number];
  length: number;
  radiusStart: number;
  radiusEnd: number;
};

/**
 * Generates an organic, lush canopy with natural volume distribution:
 * dense foliage clusters forming a beautiful broadleaf crown that tapers gracefully.
 */
export function generateCanopy(opts: {
  count: number;
  center: [number, number, number];
  radiusXZ: number;
  radiusY: number;
  colors: string[];
  minScale?: number;
  maxScale?: number;
}): FoliageCluster[] {
  const {
    count,
    center,
    radiusXZ,
    radiusY,
    colors,
    minScale = 0.45,
    maxScale = 1.05,
  } = opts;
  const clusters: FoliageCluster[] = [];

  // Seeded layered clusters: main volume + crown crownlets + outer canopy highlights
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Layered elevation
    const elevation = (Math.random() - 0.45) * 2; // -0.9 .. 1.1
    const distFromCenter = Math.pow(Math.random(), 0.7); // slight bias to outer shape

    // Ellipsoidal shape with organic scalloped variations
    const scallop = 1 + Math.sin(angle * 3) * 0.15 + Math.cos(angle * 2) * 0.1;
    const currentRadiusXZ = radiusXZ * distFromCenter * scallop;
    const currentRadiusY = radiusY * (1 - Math.abs(elevation) * 0.25);

    const x = Math.cos(angle) * currentRadiusXZ;
    const z = Math.sin(angle) * currentRadiusXZ;
    const y = elevation * currentRadiusY;

    // Scale is larger near center, smaller toward edge and top
    const edgeDist = Math.sqrt((x * x) / (radiusXZ * radiusXZ) + (z * z) / (radiusXZ * radiusXZ));
    const baseScale = THREE.MathUtils.lerp(maxScale, minScale, Math.min(1, edgeDist));
    const randomScale = baseScale * (0.8 + Math.random() * 0.4);

    // Non-uniform scales give organic leaf-puff silhouettes
    const scaleX = randomScale * (0.9 + Math.random() * 0.25);
    const scaleY = randomScale * (0.8 + Math.random() * 0.3);
    const scaleZ = randomScale * (0.9 + Math.random() * 0.25);

    // Color gradient: higher clusters get sunnier, lighter tones
    const heightFactor = Math.min(1, Math.max(0, (y + radiusY) / (radiusY * 2)));
    const colorIdx = Math.floor(heightFactor * (colors.length - 1) + Math.random() * 0.5);
    const selectedColor = colors[Math.min(colors.length - 1, Math.max(0, colorIdx))];

    clusters.push({
      pos: [center[0] + x, center[1] + y, center[2] + z],
      scale: [scaleX, scaleY, scaleZ],
      rotation: [
        Math.random() * 0.4 - 0.2,
        Math.random() * Math.PI * 2,
        Math.random() * 0.4 - 0.2,
      ],
      color: selectedColor,
      swaySpeed: 0.8 + Math.random() * 0.8,
      swayPhase: Math.random() * Math.PI * 2,
    });
  }

  return clusters;
}

/** Rotation + position to place a unit cylinder between two 3D points. */
export function alignBetween(
  from: [number, number, number],
  to: [number, number, number],
  radiusStart: number,
  radiusEnd: number
): BranchSegment {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const dir = new THREE.Vector3().subVectors(b, a);
  const length = dir.length();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize()
  );
  const euler = new THREE.Euler().setFromQuaternion(quat);

  return {
    position: [mid.x, mid.y, mid.z],
    rotation: [euler.x, euler.y, euler.z],
    length,
    radiusStart,
    radiusEnd,
  };
}

/**
 * Procedurally generates natural branching limbs radiating upward and outward from the trunk.
 */
export function generateBranches(opts: {
  count: number;
  trunkTop: [number, number, number];
  canopyCenter: [number, number, number];
  spread: number;
  radiusStart: number;
  radiusEnd: number;
}): BranchSegment[] {
  const { count, trunkTop, canopyCenter, spread, radiusStart, radiusEnd } = opts;
  const branches: BranchSegment[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const reach = 0.65 + Math.random() * 0.45;
    const startY = trunkTop[1] - Math.random() * (trunkTop[1] - canopyCenter[1]) * 0.35;
    
    // Main branch start
    const from: [number, number, number] = [
      trunkTop[0] + Math.cos(angle) * 0.18,
      startY,
      trunkTop[2] + Math.sin(angle) * 0.18,
    ];
    
    // Main branch end
    const toY = canopyCenter[1] + (Math.random() - 0.2) * spread * 0.4;
    const to: [number, number, number] = [
      canopyCenter[0] + Math.cos(angle) * spread * reach,
      toY,
      canopyCenter[2] + Math.sin(angle) * spread * reach,
    ];

    branches.push(alignBetween(from, to, radiusStart, radiusEnd));

    // Secondary sub-branch for extra organic detail
    if (Math.random() > 0.3) {
      const subAngle = angle + (Math.random() - 0.5) * 0.8;
      const subFrom: [number, number, number] = [
        THREE.MathUtils.lerp(from[0], to[0], 0.6),
        THREE.MathUtils.lerp(from[1], to[1], 0.6),
        THREE.MathUtils.lerp(from[2], to[2], 0.6),
      ];
      const subTo: [number, number, number] = [
        subFrom[0] + Math.cos(subAngle) * spread * 0.4,
        subFrom[1] + 0.6 + Math.random() * 0.5,
        subFrom[2] + Math.sin(subAngle) * spread * 0.4,
      ];
      branches.push(alignBetween(subFrom, subTo, radiusEnd * 1.1, radiusEnd * 0.5));
    }
  }

  return branches;
}
