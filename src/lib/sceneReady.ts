type Listener = (ready: boolean) => void;

class SceneReadyStore {
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

export const sceneReady = new SceneReadyStore();
