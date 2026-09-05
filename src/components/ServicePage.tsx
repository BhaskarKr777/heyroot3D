"use client";

import { useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { servicesBySlug } from "@/lib/services";

export default function ServicePage({ service }: { service: Service }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");
  const [emailInput, setEmailInput] = useState("");

  const relatedServices = service.relatedSlugs
    .map((slug) => servicesBySlug[slug])
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.eyebrow,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: "HeyRoot",
          url: "https://heyroot.com",
        },
        serviceType: service.eyebrow,
        areaServed: "Worldwide",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "0",
          priceCurrency: "USD",
          description: "Free Initial Root Diagnostic & Comprehensive Audit",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://heyroot.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://heyroot.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.eyebrow,
            item: `https://heyroot.com/services/${service.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setFormStatus("sent");
    }
  };

  return (
    <>
      {/* Structured Data Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-paper text-ink font-sans selection:bg-coral selection:text-white">
        {/* Global Service Navigation Header */}
        <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-md transition-all">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="font-display text-xl font-bold tracking-tight text-ink hover:opacity-90 transition-opacity"
              >
                <span className="text-coral">Hey</span>Root
              </Link>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-ink-muted">
                <span>/</span>
                <Link
                  href="/services"
                  className="hover:text-coral transition-colors"
                >
                  Services
                </Link>
                <span>/</span>
                <span className="text-ink font-medium">{service.eyebrow}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/services"
                className="hidden md:inline-flex text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-ink px-3 py-1.5 transition-colors"
              >
                All Services
              </Link>
              <a
                href="#service-audit-cta"
                className="rounded-full bg-coral px-5 py-2 font-display text-xs sm:text-sm font-semibold text-white shadow-sm shadow-coral/20 hover:bg-coral-dark hover:shadow-md hover:shadow-coral/30 hover:-translate-y-0.5 transition-all"
              >
                Claim Root Audit
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          {/* Subtle background glow */}
          <div className="absolute -top-24 right-0 w-96 h-96 bg-blush/40 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-honey/15 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-5xl">
            {/* Breadcrumb row */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-mono text-xs text-ink-muted">
              <Link href="/" className="hover:text-coral transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-coral transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-coral-dark font-medium">{service.eyebrow}</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-white/80 px-4 py-1.5 backdrop-blur-sm shadow-sm">
              <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-coral-dark">
                {service.eyebrow}
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.08]">
              {service.title}
            </h1>

            <p className="mt-8 max-w-3xl text-lg sm:text-xl leading-relaxed text-ink-muted">
              {service.intro}
            </p>

            {/* Quick stats highlights */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-ink/10">
              {service.heroHighlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="rounded-xl border border-ink/10 bg-white/60 p-4 backdrop-blur-sm"
                >
                  <p className="font-mono text-xs text-ink-muted uppercase tracking-wider">
                    {highlight.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-ink">
                    {highlight.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Hero Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#service-audit-cta"
                className="rounded-full bg-coral px-8 py-4 font-display text-base font-semibold text-white shadow-lg shadow-coral/30 hover:bg-coral-dark hover:shadow-xl hover:shadow-coral/40 hover:-translate-y-0.5 transition-all"
              >
                Claim Free Root Audit
              </a>
              <a
                href="#deliverables"
                className="rounded-full border border-ink/20 bg-white px-7 py-4 font-display text-base font-semibold text-ink shadow-sm hover:bg-paper-panel hover:border-ink/30 transition-all"
              >
                Explore Deliverables & Process ↓
              </a>
            </div>
          </div>
        </section>

        {/* Symptoms / Diagnostic Section */}
        <section className="bg-paper-panel px-6 py-20 md:py-28 border-y border-ink/10">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral-dark font-medium">
                Symptom Diagnostic
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
                Is your business showing these signs?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink-muted">
                Most agencies treat symptoms with cosmetic patches. We diagnose the subterranean root cause so you never have to fix the same problem twice.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {service.symptoms.map((symptom, idx) => (
                <article
                  key={symptom.title}
                  className="group rounded-2xl border border-ink/10 bg-white p-7 shadow-[0_8px_30px_rgba(42,33,28,0.04)] hover:border-coral/40 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blush/60 font-mono text-xs font-semibold text-coral-dark">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink group-hover:text-coral-dark transition-colors">
                      {symptom.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-muted">
                    {symptom.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Measurable Outcomes / ROI Section */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral-dark font-medium">
                Business Outcomes
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
                Engineered for compound returns
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink-muted">
                We measure our success by the tangible commercial outcomes delivered to your bottom line.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {service.outcomes.map((outcome) => (
                <div
                  key={outcome.label}
                  className="rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-coral tracking-tight">
                      {outcome.metric}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold text-ink">
                      {outcome.label}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {outcome.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables / Scope Breakdown */}
        <section id="deliverables" className="bg-white px-6 py-20 md:py-28 border-y border-ink/10">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral-dark font-medium">
                What&apos;s Included
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
                Comprehensive deliverables, zero fluff.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink-muted">
                Everything required to turn strategy into an enduring, market-leading asset for your business.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {service.deliverables.map((col, idx) => (
                <div
                  key={col.category}
                  className="rounded-2xl bg-paper p-7 border border-ink/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold text-coral-dark uppercase tracking-wider">
                      Module 0{idx + 1}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink pb-4 border-b border-ink/10">
                      {col.category}
                    </h3>
                    <ul className="mt-6 flex flex-col gap-3.5">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted leading-relaxed">
                          <span className="text-sprout font-bold shrink-0 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-Step Process Section */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral-dark font-medium">
                The HeyRoot Method
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
                How we grow from the root up.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink-muted">
                Our proven 4-stage execution model ensures transparency, speed, and continuous alignment.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {service.approach.map((step) => (
                <article
                  key={step.step}
                  className="rounded-2xl border border-ink/10 bg-white p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                    <span className="font-mono text-2xl font-bold text-coral">
                      {step.step}
                    </span>
                    <span className="rounded-full bg-paper-panel px-3 py-1 font-mono text-xs text-ink-muted">
                      Milestone
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                  <div className="mt-6 rounded-xl bg-paper px-4 py-3 border border-ink/5">
                    <span className="font-mono text-xs font-medium text-coral-dark">
                      Key Deliverable:
                    </span>
                    <p className="mt-0.5 text-xs sm:text-sm font-semibold text-ink">
                      {step.deliverable}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-ink px-6 py-20 text-paper md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-honey-light font-medium">
                  Frequently Asked Questions
                </p>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-paper">
                  Everything you need to know before we dig.
                </h2>
                <p className="mt-6 text-base text-paper/70 leading-relaxed">
                  Have a question not listed here? Book your Root Audit and we&apos;ll address all technical and strategic questions directly.
                </p>
                <a
                  href="#service-audit-cta"
                  className="mt-8 inline-flex rounded-full bg-coral px-6 py-3 font-display text-sm font-semibold text-white hover:bg-coral-light transition-colors"
                >
                  Ask a Specific Question
                </a>
              </div>

              <div className="divide-y divide-paper/15">
                {service.faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div key={faq.question} className="py-6">
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between text-left font-display text-lg sm:text-xl font-semibold text-paper hover:text-honey-light transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <span className="ml-4 font-mono text-2xl text-coral transition-transform duration-200">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-paper/75">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Related Services Internal Linking */}
        {relatedServices.length > 0 && (
          <section className="px-6 py-20 md:py-28 border-b border-ink/10">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral-dark font-medium">
                    Explore Related Disciplines
                  </p>
                  <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-ink">
                    Integrated solutions for full-funnel growth
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="font-display text-sm font-semibold text-coral hover:text-coral-dark transition-colors inline-flex items-center gap-1"
                >
                  View all 7 services →
                </Link>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/services/${rel.slug}`}
                    className="group rounded-2xl border border-ink/10 bg-white p-6 shadow-sm hover:-translate-y-1 hover:border-coral/40 hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-coral-dark font-medium">
                        {rel.eyebrow}
                      </span>
                      <h3 className="mt-2 font-display text-xl font-bold text-ink group-hover:text-coral-dark transition-colors">
                        {rel.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-ink-muted line-clamp-3">
                        {rel.description}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1 font-display text-xs font-semibold text-coral">
                      Explore service →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* High-Converting Root Audit Conversion Section */}
        <section
          id="service-audit-cta"
          className="relative overflow-hidden px-6 py-24 md:py-32 bg-paper-panel text-center"
        >
          <div className="mx-auto max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-coral-dark font-semibold bg-blush/60 px-4 py-1.5 rounded-full">
              Get to the Root
            </span>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink">
              Ready to fix the real root cause?
            </h2>
            <p className="mt-6 text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl mx-auto">
              Claim your free Root Audit for <strong>{service.eyebrow}</strong>. We&apos;ll inspect your current site, funnel, and brand — pinpointing the exact bottlenecks holding back your growth.
            </p>

            {formStatus === "idle" ? (
              <form
                onSubmit={handleFormSubmit}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full sm:flex-1 rounded-full px-6 py-3.5 bg-white border border-ink/15 text-ink placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-coral shadow-sm text-sm"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto font-display font-semibold rounded-full px-7 py-3.5 bg-coral text-white hover:bg-coral-dark transition-all shadow-md shadow-coral/25 hover:shadow-lg text-sm shrink-0"
                >
                  Claim My Free Audit
                </button>
              </form>
            ) : (
              <div className="mt-10 rounded-2xl bg-white border border-sprout/30 p-6 max-w-md mx-auto shadow-sm">
                <p className="font-display text-xl font-bold text-sprout">
                  Root Audit Request Planted! 🌱
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  We received your request for {service.eyebrow}. Our lead strategist will review your web properties and respond within 2 business days.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-ink-muted">
              <span>✓ 100% Free & Actionable</span>
              <span>✓ No Obligation</span>
              <span>✓ 2 Business Day Turnaround</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
