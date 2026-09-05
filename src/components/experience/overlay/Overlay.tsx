"use client";

import { useEffect, useState } from "react";
import SceneText from "./SceneText";
import { scrollToElementId } from "@/lib/scrollTo";
import { heroReveal } from "@/lib/heroReveal";

const problems = ["No Leads", "Low Trust", "Confusing Brand", "Busy Work"];
const digLayers = ["Ask Why", "Find the Root", "Fix the Cause", "Build Beautifully"];

// Backing card for scenes that sit in front of the tree — guarantees
// contrast regardless of how dark the trunk/foliage behind it are.
const card =
  "bg-paper/85 backdrop-blur-md rounded-2xl px-6 py-5 md:px-8 md:py-6 shadow-[0_8px_30px_rgba(42,33,28,0.1)]";

// Same guarantee for the underground scenes, which sit on dark backgrounds
// and use light (paper/honey) text instead of ink.
const cardDark =
  "bg-ink/70 backdrop-blur-md rounded-2xl px-6 py-5 md:px-8 md:py-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)]";

// Staggered mount entrance for the hero copy — held invisible (via the
// .hero-rise base class in globals.css) until the loader starts fading,
// so the rise-in plays as the loader clears instead of finishing
// underneath it.
function riseClass(revealed: boolean) {
  return `hero-rise ${revealed ? "hero-rise-play" : ""}`;
}

export default function Overlay() {
  const [revealed, setRevealed] = useState(heroReveal.value);

  useEffect(() => {
    const unsubscribe = heroReveal.subscribe(setRevealed);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <SceneText sceneId="surface" className="pt-0 md:-translate-y-6">
        <span
          className={`${riseClass(revealed)} font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-coral-dark/80 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1`}
          style={{ animationDelay: "0ms" }}
        >
          Hey, it&apos;s HeyRoot
        </span>
        <h1
          className={`${riseClass(revealed)} font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-ink leading-[1.05] drop-shadow-[0_2px_18px_rgba(255,255,255,0.85)]`}
          style={{ animationDelay: "120ms" }}
        >
          Something isn&apos;t working.
        </h1>
        <p
          className={`${riseClass(revealed)} text-ink-muted text-base md:text-xl max-w-md drop-shadow-[0_1px_10px_rgba(255,255,255,0.75)]`}
          style={{ animationDelay: "240ms" }}
        >
          Your site looks fine. Your funnel doesn&apos;t convert. Let&apos;s dig until we find out why.
        </p>
        <button
          onClick={() => scrollToElementId("root-audit")}
          className={`${riseClass(revealed)} pointer-events-auto font-display text-sm md:text-base font-semibold rounded-full px-6 py-3 bg-coral text-white shadow-md shadow-coral/25 hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/30 hover:-translate-y-0.5 transition-all w-fit`}
          style={{ animationDelay: "360ms" }}
        >
          Claim your free Root Audit
        </button>
      </SceneText>

      <SceneText sceneId="crack">
        <p className="font-display text-2xl md:text-3xl text-ink/90">Let&apos;s find out why.</p>
      </SceneText>

      <SceneText sceneId="underground">
        <div className={cardDark}>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-paper">
            The problems are hiding underground.
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {problems.map((p) => (
              <span
                key={p}
                className="font-mono text-sm md:text-base text-honey-light border border-honey-light/40 rounded-full px-4 py-1.5"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </SceneText>

      <SceneText sceneId="dig">
        <div className={cardDark}>
          <h2 className="font-display text-2xl md:text-4xl font-semibold text-paper/95 mb-2">
            So we keep digging.
          </h2>
          <div className="flex flex-col gap-3 items-center">
            {digLayers.map((l, i) => (
              <span key={l} className="font-display text-lg md:text-2xl text-paper/80">
                {i > 0 && <span className="text-honey-light mr-2">↓</span>}
                {l}
              </span>
            ))}
          </div>
        </div>
      </SceneText>

      <SceneText sceneId="root">
        <div className={cardDark}>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-paper">
            The Real Problem
          </h2>
          <p className="text-paper/70 max-w-md">
            This is where most agencies stop looking. We don&apos;t.
          </p>
        </div>
      </SceneText>

      <SceneText sceneId="rootAudit" align="left">
        <div className={cardDark}>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-paper">
            The Root Audit
          </h2>
          <p className="text-paper/70 max-w-sm">
            Three things we check before touching a single pixel:
          </p>
          <ul className="text-paper/90 font-display text-lg md:text-xl flex flex-col gap-1.5">
            <li>→ Your Website</li>
            <li>→ Your Funnel</li>
            <li>→ Your Brand</li>
          </ul>
        </div>
      </SceneText>

      <SceneText sceneId="glow">
        <div className={cardDark}>
          <p className="font-display text-2xl md:text-4xl text-honey-light font-medium">
            We found it. Now we fix it.
          </p>
        </div>
      </SceneText>

      <SceneText sceneId="sprout">
        <div className={card}>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-ink">
            Growth starts at the root.
          </h2>
        </div>
      </SceneText>

      <SceneText sceneId="tree" align="left">
        <div className={card}>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink">
            What we do
          </h2>
          <p className="text-ink-muted max-w-md mt-2">
            Seven core disciplines, one root system. Click any node to explore or read our full service guides.
          </p>
        </div>
      </SceneText>

      <SceneText sceneId="process" align="right">
        <div className={card}>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink">
            How we work
          </h2>
          <p className="text-ink-muted max-w-sm mt-2">
            Seed → Root → Sprout → Tree. Every project grows through the same
            honest stages — no shortcuts, no guesswork.
          </p>
        </div>
      </SceneText>

      <SceneText sceneId="caseStudies" align="left">
        <div className={card}>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink">
            Proof it works
          </h2>
          <p className="text-ink-muted max-w-sm mt-2">
            Every leaf on this tree is a business that found its root.
          </p>
        </div>
      </SceneText>

      <SceneText sceneId="about" align="right">
        <div className={card}>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink">
            Why HeyRoot
          </h2>
          <p className="text-ink-muted max-w-md mt-2">
            We got tired of agencies treating symptoms. So we built a studio
            that starts underground — and doesn&apos;t stop until it finds the
            real cause.
          </p>
        </div>
      </SceneText>

      <SceneText sceneId="cta" align="left">
        <div className={card}>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-ink">
            Ready to dig?
          </h2>
          <p className="text-ink-muted max-w-md mt-2">
            Claim your free Root Audit — we&apos;ll show you exactly what&apos;s
            holding your growth back.
          </p>
        </div>
      </SceneText>
    </>
  );
}
