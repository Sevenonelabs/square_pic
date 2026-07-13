# Implementation Roadmap: SquarePic SEO

---

## Phase 1: Foundation (Weeks 1-4)

### Week 1: Technical Setup

- [ ] **Connect Google Search Console** — Verify domain property (DNS/TXT record)
- [ ] **Connect Bing Webmaster Tools** — Verify + submit sitemap
- [ ] **Verify Vercel Analytics** — Enable if not already active
- [ ] **Add canonical URLs** to pages missing them (/about, /support, /privacy, /terms)
- [ ] **Set SITE_URL env var** to production domain (not Vercel subdomain)
- [ ] **Update robots.txt** to allow AI crawlers selectively (or add AI-specific directives)
- [ ] **Submit sitemap** to GSC + Bing

### Week 2: Schema Expansion

- [ ] **Upgrade WebApplication → SoftwareApplication** on all tool pages
  - Add `applicationCategory: MultimediaApplication`, `operatingSystem: "Any"`, `offers: { "@type": "Offer", price: "0" }`
  - Add `featureList` with bullet points of tool capabilities
- [ ] **Add HowTo schema** to /edit, /compress, /convert, /crop pages
  - Define 4-6 steps per tool with tool images
- [ ] **Expand FAQPage** on /faq from 8 to 15+ questions
- [ ] **Expand FAQPage** on /resize/[platform] pages from 3 to 5+ questions
- [ ] **Add Organization schema** with complete sameAs profiles (GitHub, ProductHunt, etc.)
- [ ] **Add WebSite SearchAction schema** for site search

### Week 3: Core Page Optimization

- [ ] **Homepage** — Expand content to 500+ words, add feature comparisons, add review schema
- [ ] **Tool pages** — Expand each to 800+ words with step-by-step instructions, tips, format support table
- [ ] **Platform pages** — Expand each to 600+ words with platform-specific tips, examples, image stats
- [ ] **Add `dateModified`** to all pages for freshness signals
- [ ] **Ensure all tool pages have canonical URLs** pointing to themselves

### Week 4: Content Foundation

- [ ] **Create `/guides/` section** — Publish "Social Media Image Sizes 2026" pillar guide
- [ ] **Create `/blog/` section** — Set up blog layout, categories, RSS feed
- [ ] **Publish first 2 blog posts** (How to Square Image + Privacy-First Editing)
- [ ] **Add author pages** — Create `/about/team/` with Person schema for each contributor
- [ ] **Add alt text strategy** — Ensure all images (screenshots, icons, OG images) have descriptive alt text

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

- [ ] **Publish 4 blog posts/month** (see Content Calendar months 2-3)
- [ ] **Add internal links** from platform pages to relevant blog posts
- [ ] **Create category hubs** for blog topics (Social Media Sizes, Image Formats, Privacy, How-To)
- [ ] **Add blog section to sitemap** with appropriate priorities
- [ ] **Submit new URLs** to GSC as they publish

### Weeks 7-8: Content Clusters

- [ ] **Build out Social Media Sizes cluster** — Link all 13 platform pages to/from pillar guide
- [ ] **Build out Privacy cluster** — Link privacy-focused blog posts to all tool pages
- [ ] **Add structured data to blog posts** — Article + HowTo schema as appropriate
- [ ] **Create `/convert/format-to-format` pages** — Start with top 8 format pairs (PNG→JPG, JPG→PNG, PNG→WebP, etc.)

### Weeks 9-10: Schema Refinement

- [ ] **Add AggregateRating** to homepage + tool pages (if reviews exist)
- [ ] **Add VideoObject schema** for any tutorial videos (YouTube Loom)
- [ ] **Add BreadcrumbList** to blog posts
- [ ] **Add Table of Contents jump links** to long-form blog posts

### Weeks 11-12: Performance & Mobile

- [ ] **Audit Core Web Vitals** via PageSpeed Insights + CrUX
- [ ] **Optimize LCP** — Ensure hero images are properly sized, preload critical assets
- [ ] **Optimize CLS** — Check for layout shifts on tool pages (editor loading states)
- [ ] **Mobile optimization** — Test all tool pages on mobile viewports, fix any issues
- [ ] **Image optimization** — Convert PNG screenshots to WebP, lazy-load below-fold images

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

- [ ] **Publish comparison pages** (SquarePic vs iLoveIMG, vs TinyPNG, vs Canva)
- [ ] **Publish listicle posts** ("Top 10 Free Image Editors No Signup")
- [ ] **Create "Best Of" roundups** — industry-specific (best photo editors for real estate, for social media managers, for devs)
- [ ] **Expand format-specific tool pages** — target every format combination that has search volume
- [ ] **Guest post outreach** — Publish on dev blogs, design blogs, privacy blogs (with backlinks)

### Months 5-6: Link Building & GEO

- [ ] **GitHub SEO** — Optimize README, add links to tool pages, encourage GitHub stars → referral traffic
- [ ] **Open source directory listings** — Submit to open source directories, alternative.to, etc.
- [ ] **Tool directory submissions** — Submit to web tool directories (6-10 relevant directories)
- [ ] **Backlink analysis** — Monthly monitoring of new backlinks, disavow toxic links
- [ ] **GEO/AI search optimization** — Update llms.txt, ensure citations in AI responses
- [ ] **Create data-driven content** — Compression benchmarks, format comparison tests (original data = citations)

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
- [ ] **Create interactive content** — Image size calculator, dimension comparison tool
- [ ] **Influencer outreach** — Partner with design/dev YouTubers for mentions
- [ ] **Advanced schema implementation** — Add/update emerging schema types
- [ ] **Content refresh** — Update all 2026 data for 2027, add freshness signals
- [ ] **Internationalization research** — Assess multilingual SEO opportunity (Spanish, German, French, Japanese)

### Months 10-12: Continuous Optimization

- [ ] **Monthly content audit** — Identify low-performing pages for rewrite or consolidation
- [ ] **Quarterly keyword gap analysis** — Re-assess competitive landscape, find new opportunities
- [ ] **Schema audit** — Check for errors/warnings in GSC, fix any issues
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
