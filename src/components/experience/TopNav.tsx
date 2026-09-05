"use client";

import { useEffect, useRef, useState } from "react";
import { scrollProgress } from "@/lib/scrollProgress";
import { scrollToScene, scrollToElementId } from "@/lib/scrollTo";

const NAV_LINKS = [
  { label: "Services", sceneId: "tree" },
  { label: "Process", sceneId: "process" },
  { label: "Work", sceneId: "caseStudies" },
  { label: "About", sceneId: "about" },
];

export default function TopNav() {
  const bar = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (bar.current) bar.current.style.width = `${scrollProgress.value * 100}%`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const goToScene = (sceneId: string) => {
    setOpen(false);
    scrollToScene(sceneId);
  };

  const goToAudit = () => {
    setOpen(false);
    scrollToElementId("root-audit");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      <div className="grid grid-cols-[1fr_auto_1fr] md:grid-cols-3 items-center gap-4 px-6 sm:px-10 py-4 md:py-5">
        {/* left: logo */}
        <div className="justify-self-start">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display text-lg font-semibold text-ink shrink-0 px-1"
          >
            <span className="text-coral">Hey</span>Root
          </a>
        </div>

        {/* center: nav links, boxed */}
        <nav className="hidden md:flex justify-self-center items-center gap-8 px-8 py-2.5 rounded-full border border-ink/10 bg-white/70 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <button
              key={link.sceneId}
              onClick={() => goToScene(link.sceneId)}
              className="font-sans text-sm text-ink-muted hover:text-ink transition-colors px-1"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* right: CTA */}
        <div className="hidden md:flex justify-self-end">
          <button
            onClick={goToAudit}
            className="font-display text-sm font-semibold rounded-full px-6 py-2.5 bg-coral text-white shadow-md shadow-coral/25 hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/30 transition-all"
          >
            Claim Root Audit
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden justify-self-end col-start-3 flex flex-col justify-center gap-1.5 w-9 h-9 items-center"
        >
          <span
            className={`block w-5 h-0.5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block w-5 h-0.5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block w-5 h-0.5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* scroll progress */}
      <div className="h-[2px] bg-ink-faint">
        <div ref={bar} className="h-full bg-coral" style={{ width: "0%" }} />
      </div>

      {/* mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-paper/95 backdrop-blur-md transition-[max-height] duration-300 ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.sceneId}
              onClick={() => goToScene(link.sceneId)}
              className="font-sans text-base text-ink text-left"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={goToAudit}
            className="font-display text-sm font-semibold rounded-full px-4 py-2.5 bg-coral text-white text-center mt-1"
          >
            Claim Root Audit
          </button>
        </nav>
      </div>
    </header>
  );
}
