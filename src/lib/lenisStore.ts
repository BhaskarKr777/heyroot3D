import type Lenis from "lenis";

// Set once by SmoothScroll on mount so nav/footer links can trigger a
// smooth programmatic scroll using the same easing as user-driven scroll.
class LenisStore {
  instance: Lenis | null = null;
}

export const lenisStore = new LenisStore();
