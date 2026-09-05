"use client";

import Link from "next/link";
import { scrollToScene, scrollToElementId } from "@/lib/scrollTo";
import { services } from "@/lib/services";

const EXPLORE_LINKS = [
  { label: "3D Journey", sceneId: "tree" },
  { label: "Our Process", sceneId: "process" },
  { label: "Case Studies", sceneId: "caseStudies" },
  { label: "About HeyRoot", sceneId: "about" },
];

const SOCIALS = [
  {
    label: "X",
    href: "#",
    path: "M18.24 3H21l-6.55 7.49L22 21h-6.13l-4.8-6.27L5.6 21H3l7.02-8.02L2 3h6.28l4.34 5.73L18.24 3Zm-1.07 16.2h1.7L7.1 4.7H5.28l11.9 14.5Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.2c2.72 0 3.05.01 4.12.06 1.07.05 1.8.22 2.44.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.44.05 1.07.06 1.4.06 4.12s-.01 3.05-.06 4.12c-.05 1.07-.22 1.8-.47 2.44a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.44.47-1.07.05-1.4.06-4.12.06s-3.05-.01-4.12-.06c-1.07-.05-1.8-.22-2.44-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.44C2.21 15.05 2.2 14.72 2.2 12s.01-3.05.06-4.12c.05-1.07.22-1.8.47-2.44.26-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.64-.25 1.37-.42 2.44-.47C8.95 2.21 9.28 2.2 12 2.2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.92.04-1.42.19-1.75.32-.44.17-.75.37-1.08.7-.33.33-.53.64-.7 1.08-.13.33-.28.83-.32 1.75C4.06 9 4.05 9.32 4.05 12s.01 2.99.06 4.04c.04.92.19 1.42.32 1.75.17.44.37.75.7 1.08.33.33.64.53 1.08.7.33.13.83.28 1.75.32 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.92-.04 1.42-.19 1.75-.32.44-.17.75-.37 1.08-.7.33-.33.53-.64.7-1.08.13-.33.28-.83.32-1.75.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.92-.19-1.42-.32-1.75a2.9 2.9 0 0 0-.7-1.08 2.9 2.9 0 0 0-1.08-.7c-.33-.13-.83-.28-1.75-.32C14.99 4.01 14.67 4 12 4Zm0 3.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Zm0 1.8a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm4.6-2a1.03 1.03 0 1 1 0 2.06 1.03 1.03 0 0 1 0-2.06Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.5V21h-3.5V8.75Zm6.2 0h3.36v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.35V21h-3.5v-6.35c0-1.51-.03-3.46-2.11-3.46-2.11 0-2.43 1.65-2.43 3.35V21H9.4V8.75Z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80 border-t border-paper/10">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand */}
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" className="font-display text-2xl font-bold text-paper inline-block">
            <span className="text-coral">Hey</span>Root
          </Link>
          <p className="text-sm text-paper/70 mt-3 max-w-[32ch] leading-relaxed">
            Get to the root of it. We uncover the real bottlenecks holding back your website, funnel, and brand — and engineer high-converting digital solutions.
          </p>
          <div className="mt-6">
            <button
              onClick={() => scrollToElementId("root-audit")}
              className="rounded-full bg-coral px-5 py-2.5 font-display text-xs font-semibold text-white hover:bg-coral-light transition-all shadow-sm"
            >
              Claim Free Root Audit →
            </button>
          </div>
        </div>

        {/* Col 2: Services SEO Pages */}
        <div>
          <h3 className="font-display text-sm font-semibold text-paper mb-4 uppercase tracking-wider text-honey-light">
            Services
          </h3>
          <ul className="flex flex-col gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-paper/70 hover:text-paper hover:translate-x-0.5 transition-all inline-block"
                >
                  {service.eyebrow}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href="/services"
                className="text-xs font-mono text-coral hover:text-coral-light transition-colors font-medium"
              >
                All Services Overview →
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Explore */}
        <div>
          <h3 className="font-display text-sm font-semibold text-paper mb-4 uppercase tracking-wider text-honey-light">
            Explore
          </h3>
          <ul className="flex flex-col gap-2.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.sceneId}>
                <button
                  onClick={() => scrollToScene(link.sceneId)}
                  className="text-sm text-paper/70 hover:text-paper hover:translate-x-0.5 transition-all text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollToElementId("root-audit")}
                className="text-sm text-paper/70 hover:text-paper hover:translate-x-0.5 transition-all text-left"
              >
                Root Audit
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Follow & Connect */}
        <div>
          <h3 className="font-display text-sm font-semibold text-paper mb-4 uppercase tracking-wider text-honey-light">
            Connect
          </h3>
          <div className="flex gap-3 mb-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-paper/10 hover:bg-coral hover:text-white flex items-center justify-center transition-colors text-paper/80"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
          <p className="text-xs text-paper/50 leading-relaxed">
            Ready to chat? Contact our team for custom consultations and audits.
          </p>
        </div>
      </div>

      <div className="border-t border-paper/10 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
        <p className="text-xs text-paper/50">
          © {new Date().getFullYear()} HeyRoot. All rights reserved.
        </p>
        <p className="text-xs text-paper/50">Made with roots, not shortcuts.</p>
      </div>
    </footer>
  );
}
