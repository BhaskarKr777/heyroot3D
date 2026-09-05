export default function NoScriptFallback() {
  return (
    <noscript>
      <div className="bg-paper text-ink px-6 py-16 max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-semibold mb-4">
          HeyRoot — Something isn&apos;t working.
        </h1>
        <p className="text-ink-muted mb-6">
          Your site looks fine. Your funnel doesn&apos;t convert. We dig past
          the symptoms to find the actual root cause — then fix it.
        </p>

        <h2 className="font-display text-2xl font-semibold mt-10 mb-3">The Root Audit</h2>
        <p className="text-ink-muted mb-2">
          Three things we check before touching a single pixel: your
          website, your funnel, and your brand.
        </p>

        <h2 className="font-display text-2xl font-semibold mt-10 mb-3">Our Core Disciplines</h2>
        <ul className="list-disc list-inside text-ink-muted mb-6 flex flex-col gap-1.5">
          <li><a href="/services/web-development" className="underline hover:text-coral">Web Development</a></li>
          <li><a href="/services/3d-web-development" className="underline hover:text-coral">3D Web Development</a></li>
          <li><a href="/services/seo-optimization" className="underline hover:text-coral">SEO Optimization</a></li>
          <li><a href="/services/website-optimization" className="underline hover:text-coral">Website Optimization</a></li>
          <li><a href="/services/rebranding" className="underline hover:text-coral">Rebranding</a></li>
          <li><a href="/services/website-redesign" className="underline hover:text-coral">Website Redesign</a></li>
          <li><a href="/services/brand-redesign" className="underline hover:text-coral">Brand Redesign</a></li>
        </ul>

        <h2 className="font-display text-2xl font-semibold mt-10 mb-3">How we work</h2>
        <p className="text-ink-muted mb-6">
          Seed → Root → Sprout → Tree. Every project grows through the same
          honest stages — no shortcuts, no guesswork.
        </p>

        <h2 className="font-display text-2xl font-semibold mt-10 mb-3">Why HeyRoot</h2>
        <p className="text-ink-muted mb-6">
          We got tired of agencies treating symptoms. So we built a studio
          that starts underground — and doesn&apos;t stop until it finds the
          real cause.
        </p>

        <h2 className="font-display text-2xl font-semibold mt-10 mb-3">Ready to dig?</h2>
        <p className="text-ink-muted mb-2">
          This site uses an interactive experience that needs JavaScript
          enabled. To claim your free Root Audit, please enable JavaScript,
          or email us directly to get started.
        </p>
      </div>
    </noscript>
  );
}
