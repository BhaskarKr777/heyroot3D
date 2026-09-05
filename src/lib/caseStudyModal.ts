type Listener = (id: string | null) => void;

class CaseStudyModalStore {
  activeId: string | null = null;
  private listeners = new Set<Listener>();

  open(id: string) {
    this.activeId = id;
    this.listeners.forEach((fn) => fn(id));
  }

  close() {
    this.activeId = null;
    this.listeners.forEach((fn) => fn(null));
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}

export const caseStudyModal = new CaseStudyModalStore();
