// Mutable, non-reactive store for scroll progress (0..1).
// R3F reads this every frame via useFrame — we deliberately avoid React
// state here so camera updates don't trigger component re-renders.
type Listener = (progress: number) => void;

class ScrollProgressStore {
  value = 0;
  private listeners = new Set<Listener>();

  set(v: number) {
    this.value = v;
    this.listeners.forEach((fn) => fn(v));
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

export const scrollProgress = new ScrollProgressStore();
