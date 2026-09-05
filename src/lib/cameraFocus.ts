// When a case-study leaf is clicked, this overrides the normal
// scroll-driven camera target so CameraRig flies to a close-up view
// instead. Clearing it lets the camera ease back to the scroll position
// naturally (same lerp, new target) — no extra "return" animation needed.
class CameraFocusStore {
  active = false;
  position: [number, number, number] = [0, 0, 0];
  lookAt: [number, number, number] = [0, 0, 0];

  focus(position: [number, number, number], lookAt: [number, number, number]) {
    this.position = position;
    this.lookAt = lookAt;
    this.active = true;
  }

  clear() {
    this.active = false;
  }
}

export const cameraFocus = new CameraFocusStore();
