export type Service = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  description: string;
  intro: string;
  heroHighlights: { label: string; value: string }[];
  symptoms: { title: string; description: string }[];
  deliverables: { category: string; items: string[] }[];
  outcomes: { metric: string; label: string; detail: string }[];
  approach: { step: string; title: string; body: string; deliverable: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    eyebrow: "Web Development",
    title: "High-performance websites engineered for real conversion.",
    metaTitle: "Custom Web Development Services | Fast, Scalable & Converting | HeyRoot",
    metaDescription: "Bespoke custom web development engineered for speed, clean code, accessibility, and high conversion. Next.js, modern frontends, and robust architecture.",
    keywords: [
      "custom web development",
      "Next.js web development",
      "high performance web development",
      "accessible web development",
      "custom frontend engineering",
      "conversion focused web development",
    ],
    description: "Custom web development for ambitious brands: fast, accessible, measurable websites built around your customers and revenue goals.",
    intro: "A great website is much more than a cosmetic layout. We turn strategy, content models, and modern web architecture into a resilient build that loads instantly, converts visitors into customers, and scales effortlessly without technical debt.",
    heroHighlights: [
      { label: "Core Web Vitals", value: "95+ Score" },
      { label: "Architecture", value: "Next.js & Modern Stacks" },
      { label: "Accessibility", value: "WCAG 2.1 AA Compliant" },
    ],
    symptoms: [
      {
        title: "Sluggish page speed & high bounce rates",
        description: "Your site takes over 3 seconds to load, causing mobile visitors to abandon the page before reading your value proposition.",
      },
      {
        title: "Fragile templates & bloated plugins",
        description: "Your current CMS breaks with every update, plugins conflict, and making simple design changes requires expensive developer interventions.",
      },
      {
        title: "Broken tracking & conversion leakage",
        description: "Analytics are misconfigured, leads fall through form glitches, and you can't pinpoint which traffic channels drive revenue.",
      },
      {
        title: "Poor mobile responsiveness",
        description: "The experience degrades on smaller viewports, with frustrating layouts, overlapping elements, and unclickable buttons.",
      },
    ],
    deliverables: [
      {
        category: "Frontend & Architecture",
        items: [
          "Custom Next.js / TypeScript build",
          "Component-driven design system",
          "Zero layout shift (CLS) & sub-second page loads",
          "Semantic, accessible HTML5 structure",
        ],
      },
      {
        category: "Backend & Integrations",
        items: [
          "Headless CMS integration (Sanity, Strapi, or Contentful)",
          "CRM and lead capture pipelines (HubSpot, Zapier, Webhooks)",
          "Custom API endpoints & serverless functions",
          "Automated transactional email triggers",
        ],
      },
      {
        category: "Measurement & Quality Assurance",
        items: [
          "Google Tag Manager & GA4 custom event tracking",
          "Conversion funnel goal setup",
          "Cross-browser and mobile device matrix testing",
          "Automated CI/CD deployment pipelines",
        ],
      },
    ],
    outcomes: [
      {
        metric: "< 1.2s",
        label: "Average Load Time",
        detail: "Instant page transitions that keep visitors engaged and boost search visibility.",
      },
      {
        metric: "+48%",
        label: "Conversion Lift",
        detail: "Frictionless form journeys, clear callouts, and conversion-optimized architectures.",
      },
      {
        metric: "100%",
        label: "Full Code Ownership",
        detail: "Clean, documented code with no proprietary lock-in or recurring template fees.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Architecture & Data Modeling",
        body: "We map page hierarchies, user journeys, data schemas, and measurement requirements before writing a single line of code.",
        deliverable: "Technical specification & component architecture",
      },
      {
        step: "02",
        title: "Component Engineering",
        body: "We craft accessible, responsive UI components with clean Tailwind/CSS tokens, ensuring rock-solid consistency across devices.",
        deliverable: "Modular component library & staging preview",
      },
      {
        step: "03",
        title: "Integrations & Analytics",
        body: "We connect your CRM, CMS, authentication, and analytics pipelines so marketing and sales run seamlessly from day one.",
        deliverable: "End-to-end integration test suite & event tracking plan",
      },
      {
        step: "04",
        title: "Speed Optimization & Launch",
        body: "We run deep lighthouse audits, compress assets, configure CDN edge caching, and execute zero-downtime DNS cutovers.",
        deliverable: "Production deployment & handoff documentation",
      },
    ],
    faqs: [
      {
        question: "Do you use pre-made WordPress or Webflow templates?",
        answer: "No. We build custom web applications using modern technologies like Next.js, React, and tailored headless CMS platforms. This guarantees unmatched speed, bulletproof security, and full freedom to implement custom workflows.",
      },
      {
        question: "Will our marketing team be able to update content without code?",
        answer: "Yes. We integrate intuitive headless CMS interfaces (like Sanity or Strapi) where your team can easily publish blog posts, edit landing page copy, upload assets, and create new pages using modular blocks.",
      },
      {
        question: "How do you ensure the website is SEO-friendly?",
        answer: "Every website we develop is built with server-side rendering (SSR/SSG), structured JSON-LD data schema, OpenGraph metadata, automated sitemaps, semantic HTML5, and strict Core Web Vitals optimization.",
      },
      {
        question: "How long does a custom web development project typically take?",
        answer: "A standard marketing or product website takes between 4 to 8 weeks depending on scope, custom interactive features, and CMS complexity. We provide detailed sprint milestones before kicking off.",
      },
    ],
    relatedSlugs: ["website-redesign", "website-optimization", "3d-web-development"],
  },
  {
    slug: "3d-web-development",
    eyebrow: "3D Web Development",
    title: "Immersive 3D & WebGL experiences that captivate and convert.",
    metaTitle: "Interactive 3D Web Development & Three.js WebGL Experiences | HeyRoot",
    metaDescription: "Custom 3D web development, Three.js, React Three Fiber, and WebGL animations. Interactive digital experiences optimized for mobile speed, accessibility, and high engagement.",
    keywords: [
      "3D web development",
      "Three.js developer",
      "React Three Fiber agency",
      "interactive WebGL website",
      "3D interactive product showcase",
      "WebGL performance optimization",
    ],
    description: "Interactive 3D web development that makes your brand unforgettable while preserving speed, accessibility, and commercial conversion.",
    intro: "3D on the web shouldn't be an expensive gimmick that stalls mobile browsers. We design purposeful Three.js and WebGL interactions that bring your products, brand narrative, and value proposition to life with smooth 60fps performance across all devices.",
    heroHighlights: [
      { label: "Graphics Engine", value: "Three.js / R3F" },
      { label: "Frame Rate", value: "Locked 60 FPS" },
      { label: "Fallback", value: "Accessible Non-3D Path" },
    ],
    symptoms: [
      {
        title: "Boring, static product presentations",
        description: "Flat photos and 2D graphics fail to convey the craftsmanship, complexity, or tactile luxury of your physical or digital product.",
      },
      {
        title: "Slow, crashing WebGL implementations",
        description: "Heavy 3D models that freeze mobile devices, spike GPU memory, drain batteries, and frustrate high-intent visitors.",
      },
      {
        title: "Sacrificing conversions for visual fluff",
        description: "Visual experiments that look great in a designer's portfolio but distract visitors from understanding pricing, benefits, and taking action.",
      },
      {
        title: "Zero accessibility or reduced-motion support",
        description: "Disorienting scroll animations that penalize users with motion sensitivities and fail screen-reader accessibility audits.",
      },
    ],
    deliverables: [
      {
        category: "3D Modeling & Asset Optimization",
        items: [
          "Low-poly mesh optimization with Draco/KTX2 texture compression",
          "Custom PBR shaders and procedural material pipelines",
          "Interactive camera controls & scroll-driven timelines",
          "Configurable 3D product viewports & hotspots",
        ],
      },
      {
        category: "Performance Engineering",
        items: [
          "Dynamic LOD (Level of Detail) rendering based on hardware tier",
          "Progressive asset streaming & lazy-loading loaders",
          "Graceful 2D fallback paths for low-powered or legacy devices",
          "Strict 60 FPS mobile performance budgets",
        ],
      },
      {
        category: "UX & Storytelling Integration",
        items: [
          "Reduced-motion accessibility switches (WCAG compliant)",
          "Touch gesture controls & intuitive orbit/pan interaction",
          "Seamless UI overlay pairing with Next.js/HTML",
          "Analytics on 3D interaction depth & user dwell time",
        ],
      },
    ],
    outcomes: [
      {
        metric: "+240%",
        label: "Dwell Time Increase",
        detail: "Interactive storytelling keeps visitors exploring your product story 2.4x longer.",
      },
      {
        metric: "< 4MB",
        label: "Total 3D Asset Payload",
        detail: "Optimized geometry and GPU texture compression ensure instant initial loads.",
      },
      {
        metric: "60 FPS",
        label: "Smooth Performance",
        detail: "Silky framerates on iPhone, Android, tablets, and desktop workstations alike.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Concept & Narrative Blueprint",
        body: "We identify the exact moments where 3D depth, movement, and camera choreography clarify your product's value proposition.",
        deliverable: "3D scene storyboard & performance budget",
      },
      {
        step: "02",
        title: "Asset Optimization & Shader Craft",
        body: "We model, retopologize, and bake custom PBR textures, reducing file sizes by up to 90% without sacrificing visual fidelity.",
        deliverable: "Compressed GLTF/GLB models & shader pipeline",
      },
      {
        step: "03",
        title: "WebGL Integration & Choreography",
        body: "We integrate React Three Fiber, bind scroll triggers, connect lighting rigs, and build intuitive interactive touchpoints.",
        deliverable: "Functional WebGL prototype with overlay UI",
      },
      {
        step: "04",
        title: "Hardware Stress Testing & Accessibility",
        body: "We test on real-world mobile devices, implement reduced-motion fallbacks, and tune draw calls for rock-solid stability.",
        deliverable: "Multi-device QA report & production launch",
      },
    ],
    faqs: [
      {
        question: "Will a 3D website work smoothly on mobile phones?",
        answer: "Yes. We employ aggressive geometry compression (Draco), GPU-native textures (KTX2/Basis), and adaptive rendering resolutions. If a device has limited hardware, our progressive engine automatically simplifies effects or displays a high-resolution 2D fallback.",
      },
      {
        question: "Does 3D web development hurt Google SEO rankings?",
        answer: "Not when built properly. We render all text, headings, and semantic content in native HTML overlays that search engines can easily index. The 3D canvas is treated as a visual canvas, keeping your site fast, crawlable, and fully accessible.",
      },
      {
        question: "What 3D formats and engines do you work with?",
        answer: "We primarily work with Three.js, React Three Fiber (R3F), GLSL custom shaders, and Blender/Spline for asset creation, exported as Draco-compressed GLB files.",
      },
      {
        question: "When is 3D NOT recommended?",
        answer: "We advise against 3D if it exists merely for decoration without clarifying your message, or for content-heavy text portals where quick skimming is the primary user intent.",
      },
    ],
    relatedSlugs: ["web-development", "website-redesign", "brand-redesign"],
  },
  {
    slug: "seo-optimization",
    eyebrow: "SEO Optimization",
    title: "Search visibility engineered around genuine search intent and revenue.",
    metaTitle: "Technical & Organic SEO Optimization Services | HeyRoot",
    metaDescription: "Data-driven SEO optimization: technical audits, Core Web Vitals, programmatic architecture, on-page content strategy, and semantic entity mapping.",
    keywords: [
      "technical SEO optimization",
      "organic search strategy",
      "Core Web Vitals SEO",
      "search intent content strategy",
      "semantic SEO schema architecture",
      "enterprise SEO audit",
    ],
    description: "Technical, on-page, and semantic SEO optimization that helps high-intent customers discover your business and take decisive action.",
    intro: "Real SEO is not about stuffing keywords or buying low-quality backlinks. We bridge the gap between what your best buyers search for, how search engine crawlers interpret your architecture, and how your pages deliver unmatched value.",
    heroHighlights: [
      { label: "Audit Depth", value: "100+ Ranking Factors" },
      { label: "Schema Markup", value: "Full JSON-LD Graph" },
      { label: "Focus", value: "Revenue & Qualified Leads" },
    ],
    symptoms: [
      {
        title: "Invisible on high-intent search queries",
        description: "Your competitors rank #1 for commercial keywords while your site only surfaces for obscure branded searches.",
      },
      {
        title: "Crawl errors & indexation bottlenecks",
        description: "Search engines are missing key pages, canonical tags are conflicting, or duplicate content is diluting your ranking authority.",
      },
      {
        title: "High impressions but zero clicks or leads",
        description: "Your meta titles and descriptions are generic, search intent is mismatched, and visitors bounce immediately upon landing.",
      },
      {
        title: "Traffic drops after site redesigns",
        description: "Previous agencies launched a new website without redirect mapping, causing severe organic traffic collapses.",
      },
    ],
    deliverables: [
      {
        category: "Technical SEO Infrastructure",
        items: [
          "Complete technical audit (Crawlability, Indexability, Robots, Sitemaps)",
          "Core Web Vitals (LCP, INP, CLS) optimization roadmap",
          "Automated dynamic XML sitemaps & canonical link architecture",
          "Custom JSON-LD schema graphs (Organization, Service, FAQ, Product)",
        ],
      },
      {
        category: "On-Page & Semantic Architecture",
        items: [
          "Commercial keyword research & search-intent mapping",
          "Information architecture & topical cluster restructuring",
          "High-converting title tag & meta description copywriting",
          "Internal linking matrix to distribute page authority",
        ],
      },
      {
        category: "Content Strategy & Conversion",
        items: [
          "Competitor content gap analysis",
          "High-intent bottom-of-funnel content briefs",
          "Search intent CRO (Call-To-Action) alignment",
          "Google Search Console & custom GA4 reporting dashboards",
        ],
      },
    ],
    outcomes: [
      {
        metric: "+185%",
        label: "Organic Traffic Growth",
        detail: "Targeted, compound growth from high-intent buyers searching for your exact solutions.",
      },
      {
        metric: "Top 3",
        label: "Target Keyword Placements",
        detail: "Dominating competitive industry terms through superior technical health and content depth.",
      },
      {
        metric: "3.2x",
        label: "Qualified Lead Volume",
        detail: "Transforming organic visits into measurable consultations and revenue opportunities.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Deep Technical & Content Audit",
        body: "We crawl every URL on your site, uncovering crawl traps, broken schemas, speed bottlenecks, and cannibalized keywords.",
        deliverable: "Comprehensive 50+ point SEO diagnostic report",
      },
      {
        step: "02",
        title: "Topical Mapping & Keyword Strategy",
        body: "We identify the exact search terms your most profitable customers use and structure pages into authoritative topic clusters.",
        deliverable: "Keyword priority map & content hierarchy",
      },
      {
        step: "03",
        title: "Technical Fixes & Schema Injection",
        body: "We implement server-side optimizations, clean up canonicals, configure JSON-LD schemas, and resolve Core Web Vitals issues.",
        deliverable: "Executed code changes & schema verification",
      },
      {
        step: "04",
        title: "Content Optimization & Tracking",
        body: "We refine on-page copywriting, embed conversion pathways, and configure custom tracking to measure organic revenue impact.",
        deliverable: "Live reporting dashboard & ongoing roadmap",
      },
    ],
    faqs: [
      {
        question: "How long does it take to see tangible results from SEO?",
        answer: "Technical fixes and on-page improvements often produce noticeable ranking increases within 3 to 6 weeks. Sustainable, compounding organic growth from topic clusters typically matures over 3 to 6 months.",
      },
      {
        question: "How is HeyRoot's SEO different from traditional SEO agencies?",
        answer: "Most agencies focus on vanity traffic metrics and low-quality keyword volume. We focus on search intent, technical excellence, and revenue-generating keywords that attract ready-to-buy decision-makers.",
      },
      {
        question: "Do you fix technical issues directly in our codebase?",
        answer: "Yes. We are developers as well as SEO strategists. We don't just hand you a 40-page PDF of problems; we write the code, optimize the assets, and deploy the fixes directly.",
      },
      {
        question: "Will you help protect our SEO during a site redesign?",
        answer: "Absolutely. We manage URL redirects (301 mapping), preserve URL structures, match title/heading parity, and ensure zero loss in search authority during migrations.",
      },
    ],
    relatedSlugs: ["website-optimization", "web-development", "website-redesign"],
  },
  {
    slug: "website-optimization",
    eyebrow: "Website Optimization",
    title: "Turn existing traffic into higher conversion rates and revenue.",
    metaTitle: "Website Speed & Conversion Rate Optimization (CRO) | HeyRoot",
    metaDescription: "Evidence-based website optimization: Core Web Vitals speed tuning, user journey friction removal, and conversion rate optimization (CRO).",
    keywords: [
      "website optimization services",
      "conversion rate optimization",
      "Core Web Vitals tuning",
      "website performance audit",
      "user journey optimization",
      "funnel conversion optimization",
    ],
    description: "Website optimization for sub-second speeds, frictionless user journeys, and stronger conversion rates—guided by data, not subjective opinions.",
    intro: "When a website underperforms, the solution is rarely changing a button color. We analyze speed bottlenecks, messaging clarity, cognitive friction, and funnel drop-off points to make the few surgical changes that dramatically lift commercial outcomes.",
    heroHighlights: [
      { label: "Speed Target", value: "Sub-Second TTFB" },
      { label: "CRO Focus", value: "Full Funnel Audit" },
      { label: "Testing", value: "Data & Usability Led" },
    ],
    symptoms: [
      {
        title: "High traffic, but disappointing conversions",
        description: "You're spending on ads or SEO to drive visitors, but only a fraction of a percent ever book a call or purchase.",
      },
      {
        title: "Failing Core Web Vitals benchmarks",
        description: "Lighthouse flags poor Largest Contentful Paint (LCP) and Interaction to Next Paint (INP), degrading your SEO and user experience.",
      },
      {
        title: "High drop-off on checkout or lead forms",
        description: "Visitors start filling out inquiries or carts but abandon midway due to unclear fields, bugs, or lack of trust signals.",
      },
      {
        title: "Unclear value proposition above the fold",
        description: "Visitors leave within 5 seconds because they cannot immediately understand what you do or who you serve.",
      },
    ],
    deliverables: [
      {
        category: "Performance & Speed Optimization",
        items: [
          "Asset minification, tree-shaking, and code splitting",
          "Next-gen image conversion (AVIF/WebP) & responsive srcset tuning",
          "Server response time (TTFB) & CDN edge caching configuration",
          "Font preloading and layout shift elimination (zero CLS)",
        ],
      },
      {
        category: "Conversion Architecture & UX",
        items: [
          "Heuristic UX & conversion friction evaluation",
          "Hero section value proposition rewrites",
          "Lead form simplification & multi-step conversion flow redesign",
          "Strategic placement of social proof and risk-reversal guarantees",
        ],
      },
      {
        category: "Funnel Analytics & Experimentation",
        items: [
          "Heatmap and user session recording analysis (Hotjar/Clarity)",
          "Micro-conversion goal tracking in GA4",
          "A/B split testing design & statistical validation",
          "Post-optimization impact report and ROI measurement",
        ],
      },
    ],
    outcomes: [
      {
        metric: "+64%",
        label: "Conversion Rate Lift",
        detail: "Eliminating friction points turns more existing visitors into paying clients.",
      },
      {
        metric: "-72%",
        label: "Page Weight Reduction",
        detail: "Streamlined bundles deliver lightning-fast experiences on 4G/5G mobile networks.",
      },
      {
        metric: "100/100",
        label: "Lighthouse Performance",
        detail: "Green scores across Performance, Accessibility, Best Practices, and SEO.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Friction & Diagnostic Audit",
        body: "We audit your site using heatmaps, analytics, speed profiling tools, and user behavior recordings to uncover the true root causes of drop-off.",
        deliverable: "Conversion friction & speed audit",
      },
      {
        step: "02",
        title: "High-Impact Prioritization",
        body: "We score potential fixes using an Impact vs. Effort matrix, focusing on the changes most likely to move your revenue needle first.",
        deliverable: "Prioritized optimization roadmap",
      },
      {
        step: "03",
        title: "Code & Copy Implementation",
        body: "We implement speed fixes, simplify navigation, refine copy, and rebuild critical form journeys directly in your codebase.",
        deliverable: "Deployed performance & UX enhancements",
      },
      {
        step: "04",
        title: "Measurement & Validation",
        body: "We measure conversion rate changes, verify Core Web Vitals improvements, and iterate based on real behavioral data.",
        deliverable: "Executive performance report & next steps",
      },
    ],
    faqs: [
      {
        question: "Can you optimize our website without rebuilding it from scratch?",
        answer: "Yes. Many optimization gains come from refactoring front-end scripts, optimizing images, fixing server caching, and rewriting confusing copy. If an existing platform is holding you back, we'll give you an honest appraisal.",
      },
      {
        question: "Do we need huge amounts of traffic for website optimization?",
        answer: "No. While high traffic allows for fast statistical A/B testing, qualitative usability audits, heuristic analysis, and Core Web Vitals speed tuning deliver immediate conversion improvements for sites with any traffic volume.",
      },
      {
        question: "What is the difference between Web Development and Website Optimization?",
        answer: "Web Development is the full construction or rebuild of a website. Website Optimization is the focused diagnostic and refinement of an existing site to maximize speed, user experience, and conversion yield.",
      },
      {
        question: "Will speed optimization help our paid advertising ROAS?",
        answer: "Yes. Faster landing pages reduce bounce rates on ad clicks and improve Google Ads Quality Scores, which lowers your cost-per-click (CPC) and improves your return on ad spend (ROAS).",
      },
    ],
    relatedSlugs: ["seo-optimization", "web-development", "website-redesign"],
  },
  {
    slug: "rebranding",
    eyebrow: "Rebranding",
    title: "Strategic rebranding for businesses ready to dominate their market.",
    metaTitle: "Strategic Rebranding Services for Growing Companies | HeyRoot",
    metaDescription: "Comprehensive rebranding services: market positioning, verbal identity, visual systems, and brand rollout strategies that command premium pricing.",
    keywords: [
      "rebranding agency",
      "strategic rebranding services",
      "corporate rebranding strategy",
      "brand repositioning",
      "visual identity redesign",
      "brand architecture and guidelines",
    ],
    description: "Strategic rebranding for businesses that have outgrown their original identity and need a commanding market position, clear messaging, and a modern visual system.",
    intro: "Rebranding is a commercial growth strategy before it is an aesthetic one. We help you clarify what has changed in your market, uncover your defensible advantage, and craft a compelling brand that earns deep trust with high-value customers.",
    heroHighlights: [
      { label: "Deliverable", value: "Complete Brand System" },
      { label: "Positioning", value: "Defensible & Distinct" },
      { label: "Scope", value: "Visual, Verbal & Digital" },
    ],
    symptoms: [
      {
        title: "Your identity looks like every competitor",
        description: "Your visual style is generic, blending into the industry noise and forcing you to compete on price rather than premium value.",
      },
      {
        title: "Your business has outgrown its brand",
        description: "You've evolved from a small startup into a mature enterprise, but your branding still reflects your scrappy early days.",
      },
      {
        title: "Confusing messaging that loses prospects",
        description: "Your team gives five different answers when asked what your company does, creating friction across sales and marketing.",
      },
      {
        title: "Inconsistent touchpoints across channels",
        description: "Your website, pitch decks, social presence, and product interfaces look like they were built by five different companies.",
      },
    ],
    deliverables: [
      {
        category: "Brand Strategy & Positioning",
        items: [
          "Stakeholder & customer interview synthesis",
          "Competitive whitespace analysis & positioning matrix",
          "Core brand pillars, mission, and value proposition",
          "Target persona definitions & customer journey mapping",
        ],
      },
      {
        category: "Verbal & Messaging Architecture",
        items: [
          "Tagline, elevator pitch, and narrative frameworks",
          "Brand voice, tone, and editorial guidelines",
          "Key messaging pillars for sales, marketing, and recruiting",
          "Sample copy applications across web and social",
        ],
      },
      {
        category: "Visual Identity System",
        items: [
          "Logo suite, symbol, wordmark, and responsive responsive variants",
          "Color palette architecture with accessibility contrast ratings",
          "Typography pairings, licensing guidelines, and hierarchy specs",
          "Design system token library, iconography, and digital guidelines",
        ],
      },
    ],
    outcomes: [
      {
        metric: "+80%",
        label: "Brand Value Perception",
        detail: "A commanding market position empowers your business to charge premium rates.",
      },
      {
        metric: "100%",
        label: "Team Alignment",
        detail: "A cohesive brand voice and visual guide that eliminates marketing ambiguity.",
      },
      {
        metric: "3x",
        label: "Sales Deck Win Rate",
        detail: "Sharpened messaging that instantly resonates with executive buyers and clients.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Root Discovery & Stakeholder Research",
        body: "We conduct in-depth interviews with leadership, sales teams, and customers to uncover your true competitive strengths.",
        deliverable: "Brand audit & market positioning brief",
      },
      {
        step: "02",
        title: "Strategic Positioning & Narrative",
        body: "We define your sharp point of view, audience promise, tone of voice, and the core narrative that sets you apart.",
        deliverable: "Brand strategy deck & messaging framework",
      },
      {
        step: "03",
        title: "Visual System Exploration & Craft",
        body: "We design complete identity directions across logos, typography, color palettes, motion principles, and digital applications.",
        deliverable: "Interactive brand presentation & concept reveal",
      },
      {
        step: "04",
        title: "Guidelines & Launch Execution",
        body: "We package design tokens, asset libraries, guidelines, and collateral templates, ensuring a seamless company-wide rollout.",
        deliverable: "Digital brand guidelines & asset kit",
      },
    ],
    faqs: [
      {
        question: "How do we know if our company truly needs a rebrand?",
        answer: "You need a rebrand when your current identity no longer reflects the sophistication of your offering, your audience has shifted, you're entering new markets, or you're losing deals to competitors with clearer positioning.",
      },
      {
        question: "What is the difference between a Rebrand and a Brand Redesign?",
        answer: "A Rebrand fundamentally redefines your business strategy, target market positioning, and core messaging. A Brand Redesign focuses on evolving and modernizing the visual identity while keeping the existing strategic position intact.",
      },
      {
        question: "How long does a strategic rebrand take?",
        answer: "A comprehensive rebranding engagement typically spans 6 to 10 weeks, from initial customer research and strategic positioning through visual identity development and final guidelines handoff.",
      },
      {
        question: "Can you help us build the new website after the rebrand?",
        answer: "Yes! We specialize in carrying new brand systems seamlessly into high-converting digital websites and 3D experiences, ensuring zero disconnect between strategy and execution.",
      },
    ],
    relatedSlugs: ["brand-redesign", "website-redesign", "web-development"],
  },
  {
    slug: "website-redesign",
    eyebrow: "Website Redesign",
    title: "Strategic website redesign that fixes more than just the surface.",
    metaTitle: "Strategic Website Redesign Services | Modern UX & High Conversion | HeyRoot",
    metaDescription: "Transform underperforming websites into high-converting digital revenue engines with human-centered UX design, modern architecture, and zero SEO drop-off.",
    keywords: [
      "website redesign services",
      "custom website redesign agency",
      "B2B website redesign",
      "UI UX website redesign",
      "website redesign without losing SEO",
      "high converting website overhaul",
    ],
    description: "Strategic website redesign for brands whose current site no longer reflects their value, converts their traffic, or supports ambitious business growth.",
    intro: "A redesign should solve the root reasons your current site is falling short—not just apply a trendy coat of paint. We start with user research, sales objections, and conversion friction, then rebuild the information architecture, messaging, and interface from the ground up.",
    heroHighlights: [
      { label: "SEO Safety", value: "Zero Traffic Loss" },
      { label: "UX Approach", value: "Conversion-Centric" },
      { label: "Stack", value: "Next.js & Clean CMS" },
    ],
    symptoms: [
      {
        title: "Outdated visual aesthetic",
        description: "Your site looks like it was built five years ago, undermining credibility with discerning buyers who expect modern polish.",
      },
      {
        title: "Confusing navigation & buried content",
        description: "Visitors get lost in cluttered menus and cannot quickly locate case studies, pricing, or product specifications.",
      },
      {
        title: "High bounce rate on key landing pages",
        description: "Key product and service pages fail to engage visitors, resulting in lost pipeline opportunities and wasted ad spend.",
      },
      {
        title: "Difficult CMS workflows",
        description: "Marketing must wait weeks for developer help just to publish a blog post or update a team member's bio.",
      },
    ],
    deliverables: [
      {
        category: "Discovery & User Experience (UX)",
        items: [
          "Heuristic UX audit of current website & analytics review",
          "Streamlined information architecture & sitemap blueprint",
          "Interactive wireframes mapping high-conversion user flows",
          "Mobile-first responsive interaction models",
        ],
      },
      {
        category: "UI Design & Visual Systems",
        items: [
          "Bespoke, high-fidelity Figma design prototypes",
          "Interactive micro-animations and component states",
          "Custom iconography, graphic assets, and imagery direction",
          "Design system token library ready for front-end engineering",
        ],
      },
      {
        category: "Migration & Launch Assurance",
        items: [
          "Complete 301 redirect mapping to protect existing SEO rankings",
          "Content migration assistance & formatting",
          "Full cross-browser, tablet, and mobile device QA testing",
          "Analytics tracking validation & goal transition",
        ],
      },
    ],
    outcomes: [
      {
        metric: "+75%",
        label: "Inquiry & Lead Increase",
        detail: "Clearer customer journeys and persuasive layouts turn more visitors into sales calls.",
      },
      {
        metric: "0%",
        label: "Organic Traffic Drop",
        detail: "Strict 301 redirect mapping and metadata preservation protect your search equity.",
      },
      {
        metric: "2.8x",
        label: "Mobile Conversion Rate",
        detail: "Touch-optimized, responsive interfaces designed specifically for mobile buyers.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Diagnosis & Funnel Analytics",
        body: "We analyze your current site's analytics, heatmaps, and user drop-off points to identify what to keep and what to rebuild.",
        deliverable: "Redesign strategy & customer journey map",
      },
      {
        step: "02",
        title: "Wireframing & Information Architecture",
        body: "We structure the content hierarchy and design low-fidelity wireframes focused purely on clarity and conversion flow.",
        deliverable: "Complete interactive wireframe clickable prototype",
      },
      {
        step: "03",
        title: "High-Fidelity UI & Motion Craft",
        body: "We apply rich typography, bespoke color palettes, micro-interactions, and visual assets to create a stunning final design.",
        deliverable: "Production Figma design system & responsive views",
      },
      {
        step: "04",
        title: "Build, SEO Migration & Launch",
        body: "We engineer the build in Next.js, configure redirects, verify metadata, and execute a flawless, zero-downtime launch.",
        deliverable: "Live website deployment & post-launch audit",
      },
    ],
    faqs: [
      {
        question: "Will our website lose search rankings during a redesign?",
        answer: "No, if executed properly. We perform meticulous 301 URL redirect mapping, maintain keyword-optimized heading hierarchies, preserve high-ranking URLs, and update XML sitemaps to safeguard your existing SEO equity.",
      },
      {
        question: "Can we redesign only specific landing pages instead of the whole site?",
        answer: "Yes. For many clients, we begin with high-impact pages like the Homepage, Service pages, and Pricing calculators before transitioning the rest of the site.",
      },
      {
        question: "Do you write the website copy or do we provide it?",
        answer: "We offer full strategic copywriting services. We can write the copy from scratch, collaborate with your in-house team, or refine your existing content to sharpen clarity and conversion.",
      },
      {
        question: "What design tools do you use for prototyping?",
        answer: "We design and prototype all website redesigns in Figma, allowing your team to leave comments, test interactive flows, and review layouts in real time before development begins.",
      },
    ],
    relatedSlugs: ["web-development", "seo-optimization", "rebranding"],
  },
  {
    slug: "brand-redesign",
    eyebrow: "Brand Redesign",
    title: "Make your brand identity feel as formidable as your work.",
    metaTitle: "Brand Redesign & Visual Identity Refresh Services | HeyRoot",
    metaDescription: "Modernize your visual identity, typography, design systems, and brand assets while preserving the core trust and recognition you have worked hard to build.",
    keywords: [
      "brand redesign services",
      "visual identity redesign",
      "logo redesign agency",
      "brand refresh services",
      "design system modernization",
      "corporate visual identity refresh",
    ],
    description: "Brand redesign for established businesses that need a cohesive, contemporary visual identity without losing the hard-earned trust and recognition of their current brand.",
    intro: "A brand redesign refines the expression of an established business. We preserve the visual equity and customer recognition that already work, while modernizing outdated logos, broken color schemes, and chaotic typography into an authoritative visual system.",
    heroHighlights: [
      { label: "Preservation", value: "Protected Brand Equity" },
      { label: "Design System", value: "Figma & Token Library" },
      { label: "Applications", value: "Web, Print & Social" },
    ],
    symptoms: [
      {
        title: "Your visual assets feel dated or inconsistent",
        description: "Your logo doesn't render well as a mobile app icon or fav icon, and team members use mismatched fonts and color codes across documents.",
      },
      {
        title: "Lack of a unified design system",
        description: "Every new marketing campaign requires starting from scratch because there is no standardized component library or brand guide.",
      },
      {
        title: "Fear of alienating existing loyal customers",
        description: "You know you need an upgrade, but you can't afford to confuse existing customers with an unrecognizable drastic rebrand.",
      },
      {
        title: "Poor digital translation",
        description: "A brand identity originally designed for print that fails to look crisp on Retina screens, dark mode, or dynamic web interfaces.",
      },
    ],
    deliverables: [
      {
        category: "Identity Evolution & Geometry",
        items: [
          "Refined logo mark & wordmark with vector mathematical balance",
          "Responsive logo suite (Full, compact, icon, favicon, app icon)",
          "Protected brand equity audit (what stays vs. what evolves)",
          "Monochrome and reversed dark mode variants",
        ],
      },
      {
        category: "Color, Typography & Asset System",
        items: [
          "Modernized color palette with accessible contrast ratios",
          "Curated typography system with web font licensing guidance",
          "Custom 2D/3D iconography and illustration styleguide",
          "Social media header, post, and banner design templates",
        ],
      },
      {
        category: "Digital Brand Guidelines & Toolkits",
        items: [
          "Interactive Figma design token library",
          "Comprehensive digital brand guidelines (Usage, Do's & Don'ts)",
          "Ready-to-use presentation slide templates (Keynote/Google Slides)",
          "High-resolution vector asset repository (SVG, PNG, PDF, EPS)",
        ],
      },
    ],
    outcomes: [
      {
        metric: "100%",
        label: "Equity Retained",
        detail: "Immediate visual recognition from existing customers with a dramatic boost in modern appeal.",
      },
      {
        metric: "5x",
        label: "Faster Asset Creation",
        detail: "Modular Figma templates let your team produce on-brand marketing collateral in minutes.",
      },
      {
        metric: "+40%",
        label: "Cross-Channel Cohesion",
        detail: "A seamless aesthetic across your website, pitch decks, social media, and product packaging.",
      },
    ],
    approach: [
      {
        step: "01",
        title: "Brand Equity & Asset Audit",
        body: "We analyze your existing visual touchpoints to determine what elements carry high customer recognition and must be preserved.",
        deliverable: "Visual equity diagnostic & moodboard direction",
      },
      {
        step: "02",
        title: "Logo & Typography Refinement",
        body: "We refine logo geometry, improve kerning, select modern typography, and optimize colors for both digital screens and physical print.",
        deliverable: "Evolutionary identity concepts for review",
      },
      {
        step: "03",
        title: "Design System & Template Creation",
        body: "We expand the refreshed identity across slide decks, social graphics, web UI components, and branded email signatures.",
        deliverable: "Production template suite in Figma",
      },
      {
        step: "04",
        title: "Brand Book & Asset Library Delivery",
        body: "We package all production vector assets, export formats, and build an accessible digital guideline book for your entire organization.",
        deliverable: "Comprehensive brand book & master asset vault",
      },
    ],
    faqs: [
      {
        question: "How is a Brand Redesign different from a full Rebranding?",
        answer: "A Brand Redesign focuses on updating and modernizing the visual elements (logo, fonts, colors, layout rules) while keeping your name, company positioning, and core audience intact. A full Rebrand involves changing your market positioning, name, or core strategy.",
      },
      {
        question: "Will our existing customers be confused by the redesign?",
        answer: "No. Our approach is evolutionary: we retain the visual memory anchors (such as iconic color cues or core symbol motifs) so that existing customers recognize you instantly, but perceive your brand as significantly more modern and trustworthy.",
      },
      {
        question: "Do you deliver files formatted for web and print?",
        answer: "Yes. You receive clean vector formats (SVG, EPS, PDF) for professional print and signage, as well as web-optimized raster formats (PNG, WebP) with transparent backgrounds and strict color space definitions (RGB, CMYK, Pantone).",
      },
      {
        question: "Can this redesign be directly integrated into our website?",
        answer: "Yes. As a digital-first studio, we translate your refreshed brand tokens directly into your CSS/Tailwind variables, ensuring instantaneous consistency across your digital presence.",
      },
    ],
    relatedSlugs: ["rebranding", "website-redesign", "3d-web-development"],
  },
];

export const servicesBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service])
) as Record<string, Service>;
