import { getSceneRange, TOTAL_VH } from "@/lib/timeline";
import { lenisStore } from "@/lib/lenisStore";

function scrollToPx(px: number) {
  if (lenisStore.instance) {
    lenisStore.instance.scrollTo(px, { duration: 1.4 });
  } else {
    window.scrollTo({ top: px, behavior: "smooth" });
  }
}

export function scrollToScene(sceneId: string) {
  const range = getSceneRange(sceneId);
  const px = (range.start * TOTAL_VH * window.innerHeight) / 100;
  scrollToPx(px);
}

export function scrollToElementId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const px = el.getBoundingClientRect().top + window.scrollY;
  scrollToPx(px);
}
