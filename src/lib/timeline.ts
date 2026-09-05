export type Waypoint = {
  id: string;
  weight: number;
  camPos: [number, number, number];
  lookAt: [number, number, number];
  bg: string;
  fog: string;
  fogNear: number;
  fogFar: number;
  budPos: [number, number, number];
  budRotY: number;
};

// weight = relative scroll length for this scene (in "units" of 100vh)
export const waypoints: Waypoint[] = [
  {
    id: "surface",
    weight: 1.3,
    camPos: [0, 3.4, 9],
    lookAt: [0, 1, 0],
    bg: "#8ecdf2",
    fog: "#cdeafd",
    fogNear: 10,
    fogFar: 32,
    budPos: [-3.4, 0.55, 3.2],
    budRotY: 0.55,
  },
  {
    id: "crack",
    weight: 0.9,
    camPos: [0, 1.4, 4.2],
    lookAt: [0, -0.4, 0],
    bg: "#e9d9c4",
    fog: "#c9b092",
    fogNear: 4,
    fogFar: 18,
    budPos: [-0.8, -0.3, -1],
    budRotY: 1.4,
  },
  {
    id: "underground",
    weight: 1.3,
    camPos: [0, -5.5, 2.6],
    lookAt: [0, -7, 0],
    bg: "#4a3324",
    fog: "#35241a",
    fogNear: 3,
    fogFar: 16,
    budPos: [-1, -6.6, -2],
    budRotY: 2.3,
  },
  {
    id: "dig",
    weight: 1.5,
    camPos: [0, -13.5, 1.8],
    lookAt: [0, -16, 0],
    bg: "#35241a",
    fog: "#241811",
    fogNear: 3,
    fogFar: 15,
    budPos: [0.9, -15.6, -2.5],
    budRotY: 3.0,
  },
  {
    id: "root",
    weight: 1.4,
    camPos: [3.2, -20, 5.5],
    lookAt: [0, -20.5, 0],
    bg: "#241811",
    fog: "#150d09",
    fogNear: 2,
    fogFar: 14,
    budPos: [1.6, -20.3, -2.6],
    budRotY: 2.6,
  },
  {
    id: "rootAudit",
    weight: 1.2,
    camPos: [1.6, -20, 3.2],
    lookAt: [0, -20.2, 0],
    bg: "#1c1310",
    fog: "#150d09",
    fogNear: 2,
    fogFar: 13,
    budPos: [-1.3, -20.1, -1.4],
    budRotY: -2.4,
  },
  {
    id: "glow",
    weight: 1.1,
    camPos: [0, -13, 3.6],
    lookAt: [0, -8, 0],
    bg: "#1a2a1f",
    fog: "#22392a",
    fogNear: 3,
    fogFar: 16,
    budPos: [0.9, -12.5, -3],
    budRotY: 0,
  },
  {
    id: "sprout",
    weight: 1.2,
    camPos: [0, -1.5, 5.8],
    lookAt: [0, 2, 0],
    bg: "#eef7ee",
    fog: "#f4faf0",
    fogNear: 6,
    fogFar: 24,
    budPos: [0.6, 1.2, -1],
    budRotY: 0,
  },
  {
    id: "tree",
    weight: 1.7,
    camPos: [0, 6.8, 16.5],
    lookAt: [0, 5.2, 0],
    bg: "#fbfff5",
    fog: "#ffffff",
    fogNear: 14,
    fogFar: 42,
    budPos: [-2.8, 3.8, 2.8],
    budRotY: 0.6,
  },
  {
    id: "process",
    weight: 1.4,
    camPos: [7.5, 6.2, 11.8],
    lookAt: [0, 5.5, 0],
    bg: "#fbfff5",
    fog: "#ffffff",
    fogNear: 12,
    fogFar: 38,
    budPos: [2.4, 4.2, 3.2],
    budRotY: -0.6,
  },
  {
    id: "caseStudies",
    weight: 1.4,
    camPos: [-7.5, 9.5, 11.5],
    lookAt: [0, 9.0, 0],
    bg: "#fbfff5",
    fog: "#ffffff",
    fogNear: 12,
    fogFar: 38,
    budPos: [-2.2, 8.2, 2.8],
    budRotY: 0.8,
  },
  {
    id: "about",
    weight: 1.2,
    camPos: [0, 14.5, 13.5],
    lookAt: [0, 12.8, 0],
    bg: "#fff0d8",
    fog: "#ffe8c2",
    fogNear: 14,
    fogFar: 42,
    budPos: [1.2, 12.8, 1.2],
    budRotY: -0.9,
  },
  {
    id: "cta",
    weight: 1.3,
    camPos: [0, 13.2, 12.2],
    lookAt: [0, 11.8, 0],
    bg: "#fff6ee",
    fog: "#ffe3d2",
    fogNear: 10,
    fogFar: 32,
    budPos: [-1.2, 11.8, 1.6],
    budRotY: 0.5,
  },
];

const totalWeight = waypoints.reduce((sum, w) => sum + w.weight, 0);

export type SceneRange = { id: string; start: number; end: number; mid: number };

// cumulative [0,1] progress range each scene occupies along the whole journey
export const sceneRanges: SceneRange[] = (() => {
  let acc = 0;
  return waypoints.map((w) => {
    const start = acc / totalWeight;
    acc += w.weight;
    const end = acc / totalWeight;
    return { id: w.id, start, end, mid: (start + end) / 2 };
  });
})();

export const VH_PER_UNIT = 130;
export const TOTAL_VH = totalWeight * VH_PER_UNIT;

export function getSceneRange(id: string): SceneRange {
  const r = sceneRanges.find((s) => s.id === id);
  if (!r) throw new Error(`Unknown scene id: ${id}`);
  return r;
}

// smoothstep-style ease for interpolation between waypoints
function smoothstep(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

export function sampleTimeline(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  const scaled = p * totalWeight;

  let acc = 0;
  let i = 0;
  for (; i < waypoints.length - 1; i++) {
    const next = acc + waypoints[i].weight;
    if (scaled < next) break;
    acc = next;
  }

  const a = waypoints[i];
  const b = waypoints[Math.min(i + 1, waypoints.length - 1)];
  const localT = a === b ? 0 : smoothstep((scaled - acc) / (b.weight || 1));

  return { a, b, t: localT, activeId: a.id };
}
