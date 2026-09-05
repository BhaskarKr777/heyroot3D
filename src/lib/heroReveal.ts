// Fires once the Loader starts its fade-out, so the hero's entrance
// animation plays as the loader clears rather than finishing underneath it.
type Listener = (revealed: boolean) => void;

class HeroRevealStore {
  value = false;
  private listeners = new Set<Listener>();

  set(v: boolean) {
    if (this.value === v) return;
    this.value = v;
    this.listeners.forEach((fn) => fn(v));
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

export const heroReveal = new HeroRevealStore();
