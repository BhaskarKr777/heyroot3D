// Normalized pointer position in [-1, 1], updated from a single window
// listener. Read (not subscribed to) inside useFrame loops, same pattern
// as scrollProgress — avoids per-move React re-renders.
class PointerStore {
  x = 0;
  y = 0;

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export const pointer = new PointerStore();

export function initPointerTracking() {
  if (typeof window === "undefined") return () => {};

  const handleMove = (e: PointerEvent) => {
    pointer.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -((e.clientY / window.innerHeight) * 2 - 1)
    );
  };

  window.addEventListener("pointermove", handleMove, { passive: true });
  return () => window.removeEventListener("pointermove", handleMove);
}
