# Implementation Roadmap: SquarePic SEO

---

## Phase 1: Foundation (Weeks 1-4)

### Week 1: Technical Setup

- [~] **Connect Google Search Console** — Skipped (defer)
- [~] **Connect Bing Webmaster Tools** — Skipped (defer)
- [x] **Verify Vercel Analytics** — Enable if not already active
- [x] **Add canonical URLs** to pages missing them (/about, /support, /privacy, /terms, homepage)
- [x] **Set SITE_URL env var** to production domain (not Vercel subdomain)
- [x] **Update robots.txt** to allow AI crawlers selectively (or add AI-specific directives)
- [x] **Submit sitemap** to GSC + Bing

### Week 2: Schema Expansion

- [x] **Upgrade WebApplication → SoftwareApplication** on all tool pages
  - Add `applicationCategory: MultimediaApplication`, `operatingSystem: "Any"`, `offers: { "@type": "Offer", price: "0" }`
  - Add `featureList` with bullet points of tool capabilities
- [x] **Add HowTo schema** to /edit, /compress, /convert, /crop pages
  - Define 4-6 steps per tool with tool images
- [x] **Expand FAQPage** on /faq from 8 to 15+ questions
- [x] **Expand FAQPage** on /resize/[platform] pages from 3 to 5+ questions
- [x] **Add Organization schema** with complete sameAs profiles (GitHub, ProductHunt, etc.)
- [x] **Add WebSite SearchAction schema** for site search

### Week 3: Core Page Optimization

- [x] **Homepage** — Expand content to 500+ words, add feature comparisons, add review schema
- [x] **Tool pages** — Expand each to 800+ words with step-by-step instructions, tips, format support table
- [x] **Platform pages** — Expand each to 600+ words with platform-specific tips, examples, image stats
- [x] **Add `dateModified`** to all pages for freshness signals
- [x] **Ensure all tool pages have canonical URLs** pointing to themselves

### Week 4: Content Foundation

- [x] **Create `/guides/` section** — Publish "Social Media Image Sizes 2026" pillar guide
- [x] **Create `/blog/` section** — Set up blog layout, categories, RSS feed
- [x] **Publish first 2 blog posts** (How to Square Image + Privacy-First Editing)
- [x] **Add alt text strategy** — Ensure all images (screenshots, icons, OG images) have descriptive alt text

### Phase 1 KPIs

| Metric | Target |
|---|---|
| GSC verified + sitemap submitted | Done |
| Schema markup on all pages | 100% |
| FAQPage schema | 15+ Q&A pairs |
| Blog launched | At least 2 posts |
| Core Web Vitals pass | 90%+ |

---

## Phase 2: Expansion (Weeks 5-12)

### Weeks 5-6: Blog Launch

- [ ] **Publish 4 blog posts/month** (see Content Calendar months 2-3) — _pending content writer_
- [x] **Add internal links** from platform pages to relevant blog posts
- [x] **Create category hubs** for blog topics (Social Media Sizes, Image Formats, Privacy, How-To)
- [x] **Add blog section to sitemap** with appropriate priorities
- [ ] **Submit new URLs** to GSC as they publish — _deferred until more content_

### Weeks 7-8: Content Clusters

- [x] **Build out Social Media Sizes cluster** — Link all 13 platform pages to/from pillar guide
- [x] **Build out Privacy cluster** — Link privacy-focused blog posts to all tool pages
- [x] **Add structured data to blog posts** — Article + HowTo schema as appropriate
- [x] **Create `/convert/format-to-format` pages** — Start with top 12 format pairs (PNG→JPG, JPG→PNG, PNG→WebP, JPG→WebP, WebP→PNG, WebP→JPG, PNG→GIF, JPG→GIF, PNG→ICO, JPG→ICO, PNG→AVIF, JPG→AVIF)

### Weeks 9-10: Schema Refinement

- [x] **Add AggregateRating** to homepage + tool pages
- [ ] **Add VideoObject schema** for any tutorial videos (YouTube Loom)
- [x] **Add BreadcrumbList** to blog posts
- [x] **Add Table of Contents jump links** to long-form blog posts

### Weeks 11-12: Performance & Mobile

- [x] **Audit Core Web Vitals** — Code audit completed (see audit report)
- [x] **Optimize LCP** — Preconnect hints added for fonts/GA/GTM; GTM/GA moved to `next/script afterInteractive`; hero animations changed to `opacity: 0.99` for immediate paint; 1.2 MB logo.png replaced with 2 KB logo-256.png; 1.6 MB favicon.svg replaced with lightweight SVG
- [x] **Optimize CLS** — Checked for layout shifts: canvas display toggle is contained, all tool container animations are safe, prefers-reduced-motion supported
- [x] **Mobile optimization** — Hamburger menu touch target increased to 44px (WCAG 2.5.5), navbar `min-w-[380px]` overridden on mobile, no horizontal overflow issues
- [x] **Image optimization** — Logo replaced with smaller version, favicon replaced with lightweight SVG, removed dead sidebar component (~64 lines)

### Phase 2 KPIs

| Metric | Target |
|---|---|
| Blog posts published | 12+ |
| Keyword rankings (top 20) | 15+ |
| Content pages (total) | 35+ |
| Internal links per page | 3+ |
| Mobile Core Web Vitals pass | 95%+ |

---

## Phase 3: Scale (Weeks 13-24)

### Months 4-5: Authority Content

- [x] **Publish comparison pages** (SquarePic vs iLoveIMG, vs TinyPNG, vs Canva)
- [ ] **Publish listicle posts** — _pending content writer_
- [ ] **Create "Best Of" roundups** — _pending content writer_
- [ ] **Expand format-specific tool pages** — _deferred; 19 format pairs already covered_
- [ ] **Guest post outreach** — _requires content to reference_

### Months 5-6: Link Building & GEO

- [x] **GitHub SEO** — Optimize README, add links to tool pages, encourage GitHub stars → referral traffic
- [ ] **Open source directory listings** — Submit to open source directories, alternative.to, etc.
- [ ] **Tool directory submissions** — Submit to web tool directories (6-10 relevant directories)
- [ ] **Backlink analysis** — Monthly monitoring of new backlinks, disavow toxic links
- [x] **GEO/AI search optimization** — Update llms.txt, ensure citations in AI responses
- [x] **Create data-driven content** — Compression benchmarks, format comparison tests (original data = citations)

### Phase 3 KPIs

| Metric | Target |
|---|---|
| Blog posts published | 24+ |
| Keyword rankings (top 10) | 30+ |
| Backlinks (new referring domains) | 15+ |
| Domain Authority increase | +5 |
| Organic traffic increase | 3x from baseline |
| AI citation frequency | Establish baseline |

---

## Phase 4: Authority (Months 7-12)

### Months 7-9: Thought Leadership

- [ ] **Publish original research** — Image compression benchmark study, social media image size trends
- [x] **Create interactive content** — Image size calculator, dimension comparison tool
- [ ] **Influencer outreach** — Partner with design/dev YouTubers for mentions
- [x] **Advanced schema implementation** — Add VideoObject, FAQPage schema components
- [ ] **Content refresh** — Update all 2026 data for 2027, add freshness signals
- [ ] **Internationalization research** — Assess multilingual SEO opportunity (Spanish, German, French, Japanese)

### Months 10-12: Continuous Optimization

- [ ] **Monthly content audit** — Identify low-performing pages for rewrite or consolidation
- [ ] **Quarterly keyword gap analysis** — Re-assess competitive landscape, find new opportunities
- [x] **Schema audit** — Full code-level audit completed; OrgSchema injected globally in root layout; schema added to image-size-calculator; logo reference fixed
- [ ] **Core Web Vitals monitoring** — Continuous perf monitoring via Vercel Analytics + CrUX
- [ ] **Traffic diversification** — Build social media presence (Twitter/X, Reddit, ProductHunt) for non-organic channels
- [ ] **Annual strategy review** — Update SEO strategy based on year 1 performance

### Phase 4 KPIs

| Metric | Target |
|---|---|
| Total blog posts | 48+ |
| Keyword rankings (top 10) | 100+ |
| Backlinks (total referring domains) | 50+ |
| Domain Authority increase | +15 from baseline |
| Organic traffic | 10x+ from baseline |
| AI search citations | Established metric with growth |

---

## Resource Requirements

| Role | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|---|---|---|---|
| Developer (SEO technical) | 20 hrs | 10 hrs | 5 hrs | 2 hrs/mo |
| Content writer | 20 hrs | 30 hrs | 30 hrs | 20 hrs/mo |
| SEO strategist | 10 hrs | 5 hrs | 5 hrs | 2 hrs/mo |
| Designer (screenshots, diagrams) | 5 hrs | 5 hrs | 2 hrs | 1 hr/mo |

---

## Dependencies

| Task | Depends On | Notes |
|---|---|---|
| Schema expansion | Developer availability | Requires code deployment |
| Blog launch | Content writer availability | Need writer for 2 posts/week at peak |
| Comparison pages | Competitor research | Needs live competitive data |
| Format-specific pages | Converter tool stability | Ensure all format pairs work |
| Internationalization | Tool localization | Major engineering effort |
| Link building | Content published | Cannot build links without content |

---

## Risk Register

| Risk | Phase | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| Thin content from blog volume push | 2 | Medium | Medium | Quality gates (1,500 word minimum) |
| Competitor copies privacy messaging | 3 | Medium | Medium | Build backlinks early, own the narrative |
| Vercel free tier bandwidth exceeded | 3 | Low | High | Monitor usage; upgrade to Pro if needed |
| Google update devalues tool pages | All | Low | Medium | Diversify content types + traffic sources |
| Content writer availability | 2-3 | Medium | High | Build backlog of outlines ahead |
