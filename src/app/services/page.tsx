import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Core Digital Disciplines & Growth Services | HeyRoot",
  description:
    "Explore HeyRoot's 7 core digital disciplines: Web Development, 3D Web Development, SEO Optimization, Website Optimization, Rebranding, Website Redesign, and Brand Redesign.",
  alternates: {
    canonical: "https://heyroot.com/services",
  },
  openGraph: {
    title: "Core Digital Disciplines & Growth Services | HeyRoot",
    description:
      "Explore HeyRoot's 7 core digital disciplines: Web Development, 3D Web Development, SEO Optimization, Website Optimization, Rebranding, Website Redesign, and Brand Redesign.",
    url: "https://heyroot.com/services",
    type: "website",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "HeyRoot Digital Services & Disciplines",
    description:
      "Explore HeyRoot's 7 core digital disciplines: Web Development, 3D Web Development, SEO Optimization, Website Optimization, Rebranding, Website Redesign, and Brand Redesign.",
    url: "https://heyroot.com/services",
    hasPart: services.map((service) => ({
      "@type": "Service",
      name: service.eyebrow,
      description: service.description,
      url: `https://heyroot.com/services/${service.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-paper text-ink selection:bg-coral selection:text-white">
        {/* Navigation Header */}
        <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="font-display text-xl font-bold tracking-tight text-ink hover:opacity-90 transition-opacity"
            >
              <span className="text-coral">Hey</span>Root
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="hidden sm:inline-flex text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-ink transition-colors"
              >
                Back to Experience
              </Link>
              <Link
                href="/#root-audit"
                className="rounded-full bg-coral px-5 py-2 font-display text-xs sm:text-sm font-semibold text-white shadow-sm shadow-coral/20 hover:bg-coral-dark transition-all"
              >
                Claim Root Audit
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-16 text-center">
          <div className="mx-auto max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-coral-dark font-semibold bg-blush/60 px-4 py-1.5 rounded-full">
              7 Core Disciplines
            </span>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink">
              Build a stronger root system for your digital growth.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-ink-muted leading-relaxed">
              Every digital business is a living ecosystem. When your site, funnel, or brand is underperforming, we uncover the root cause and engineer high-impact solutions.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-6 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => (
                <article
                  key={service.slug}
                  className="group rounded-2xl border border-ink/10 bg-white p-8 shadow-[0_4px_20px_rgba(42,33,28,0.03)] hover:-translate-y-1 hover:border-coral/40 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-coral-dark">
                        0{idx + 1} • {service.eyebrow}
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-2xl font-bold text-ink group-hover:text-coral-dark transition-colors">
                      {service.title}
                    </h2>

                    <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                      {service.description}
                    </p>

                    {/* Highlights Pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.heroHighlights.slice(0, 2).map((h) => (
                        <span
                          key={h.label}
                          className="rounded-lg bg-paper px-2.5 py-1 font-mono text-[11px] text-ink-muted border border-ink/5"
                        >
                          {h.label}: <strong className="text-ink font-semibold">{h.value}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      className="font-display text-sm font-semibold text-coral group-hover:text-coral-dark inline-flex items-center gap-1.5 transition-colors"
                    >
                      Explore Service Guide <span>→</span>
                    </Link>
                    <Link
                      href={`/services/${service.slug}#service-audit-cta`}
                      className="text-xs font-mono text-ink-muted hover:text-ink transition-colors"
                    >
                      Audit →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Assessment / CTA Section */}
        <section className="bg-paper-panel px-6 py-20 md:py-28 border-t border-ink/10">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-coral-dark font-semibold">
              Root Diagnostic
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink">
              Not sure which discipline your business needs first?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-ink-muted leading-relaxed">
              Our free Root Audit investigates your website speed, conversion funnel, search visibility, and brand equity to tell you exactly where the highest-ROI opportunity lies.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/#root-audit"
                className="rounded-full bg-coral px-8 py-4 font-display text-sm font-semibold text-white shadow-lg shadow-coral/25 hover:bg-coral-dark hover:shadow-xl transition-all"
              >
                Claim Your Free Root Audit
              </Link>
              <Link
                href="/"
                className="rounded-full border border-ink/15 bg-white px-7 py-4 font-display text-sm font-semibold text-ink hover:bg-paper-panel transition-all"
              >
                Experience The Interactive Story
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
