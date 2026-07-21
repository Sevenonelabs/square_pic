# SEO Implementation Plan — SquarePic

## Keyword Research Results

| Keyword | Intent | Difficulty | SquarePic Rank | Opportunity |
|---------|--------|------------|----------------|-------------|
| square image maker | Commercial | Medium | ~Page 1 | ✅ Already winning |
| square pic maker | Commercial | Medium | #2 | ✅ Strong position |
| instagram square image | Commercial / Info | Low–Medium | #2 | ✅ Strong position |
| make photo square online | Commercial | Medium | #5 | Room to improve |
| free image resizer | Commercial | **High** | Not ranked | Compete via long-tail only |

### Long-Tail Opportunities
- `make image square without cropping`
- `square photo for instagram`
- `1:1 image converter`
- `resize image for instagram without cropping`
- `square photo maker no signup`

---

## Phase 1: Content & Metadata (✅ Done)

### Homepage
| Field | Value |
|-------|-------|
| Title | Make Photo Square Online Free \| Instagram Square Image Maker |
| Description | Make any photo square online free without cropping. Square image maker with blur backgrounds, white borders, or smart crop. Perfect square pics for Instagram, WhatsApp, LinkedIn, Facebook, and more. No uploads or signup. |
| Keywords added | "square pic maker", "square photo maker no signup", "1:1 image converter", "social media resizer", "photo resizer" |
| Internal links added | `/resize/instagram` ("Instagram Square Image Maker"), `/resize/whatsapp` ("WhatsApp Image Resizer"), `/resize/linkedin` ("LinkedIn Photo Resizer") |

### Tool Pages

| Page | Title | Description |
|------|-------|-------------|
| **Compressor** | Compress Image Online Free - Reduce JPG, PNG, WebP File Size | Compress image online free — reduce JPG, PNG, and WebP file sizes without losing quality. Batch compress and download as ZIP. No uploads, no signup. |
| **Converter** | Convert Image to JPG, PNG, WebP Online Free - Image Format Converter | Convert image to JPG, PNG, WebP, AVIF, and more online free. Batch convert between 8 image formats instantly. No uploads, no signup. |
| **Cropper** | Crop Image Online Free - Crop Photos for Instagram, Facebook, LinkedIn | Crop image online free — crop photos for Instagram, Facebook, and LinkedIn with aspect ratio presets. Zoom, pan, and export to JPEG, PNG, or WebP. No uploads required. |
| **Upscaler** | Upscale Image Online Free - Enlarge Photos 2x, 3x, 4x HD Quality | Upscale image online free — enlarge photos 2x, 3x, or 4x HD quality with bicubic interpolation and smart sharpening. All processing is private and local. |

### Supporting Pages

| Page | Title | Description |
|------|-------|-------------|
| **About** | About SquarePic - Free Square Image Maker & Photo Editor | Learn about SquarePic, the free online square image maker and photo editor. Make any photo square for Instagram, WhatsApp, LinkedIn, and more. Privacy-first, no uploads, no watermarks. |
| **FAQ** | FAQ - How to Make a Square Image Online \| SquarePic Help | Answers to common questions about making square images online, resizing photos for social media, and using SquarePic's free image editor. No uploads, no signup, no watermarks. |
| **Support** | Help & Support - Square Image Maker Troubleshooting | Get help with SquarePic's free online square image maker. Troubleshooting guides, tips for resizing and editing photos, and contact support. No signup needed. |
| **Guides** | Image Editing Guides & Tutorials - Social Media Size Cheat Sheets | Step-by-step image editing guides, social media size cheat sheets for Instagram, Facebook, LinkedIn, and more. Learn how to resize, crop, convert, and optimize images for every platform. |
| **Image Size Calc** | Image Size Calculator - Aspect Ratio & Dimensions for Social Media | Find the perfect image dimensions and aspect ratios for Instagram, Facebook, LinkedIn, YouTube, and more. Search by pixel size or browse platform presets. |

### Resize Platform Pages (all 17 platforms)

| Old Format | New Format |
|------------|------------|
| `{Platform} Image Sizes - Complete Dimension Guide` | **Instagram**: `Instagram Square Image Maker - Resize Photos for Instagram Free` |
| | **All others**: `Resize Images for {Platform} - {Platform} Image Sizes & Dimensions` |

Old descriptions were generic dimension lists. New descriptions include:
- "without cropping" keyword
- Platform-specific use cases (profile, posts, covers)
- "No uploads, no signup" closing

### Converter [slug] Pages

| Old Format | New Format |
|------------|------------|
| `Convert {From} to {To} Online Free - Image Converter` | `Convert {From} to {To} Online Free - {From} {To} Converter` |
| Description: "...Convert your images instantly..." | Description: "...Convert your {from} images to {to} format instantly in your browser..." |

---

## Phase 2: Content Depth (✅ Done)

### Homepage
- Added "How to Make a Square Image Online" (3-step section)
- Added "Three Ways to Make a Square Photo" with feature details
- Added "Best Uses for Square Images" with 7 use cases
- Added "Social Media Square Size Quick Reference" table (10 platforms)
- Added "Why Make Images Square?" explanatory section
- Added "Square Image Best Practices" with 7 tips
- Added "Private & Secure — No Uploads" trust section
- Added "square pic maker", "square photo maker no signup", "1:1 image converter" keyword phrases

### Tool Pages
- **Compressor**: Added "Compression Targets by Use Case", "Quality Settings Guide"
- **Converter**: Added "How to Choose the Right Image Format" decision framework
- **Cropper**: Added "Cropping for Different Platforms", "Composition Techniques"
- **Upscaler**: Added "Understanding Upscaling Quality", "When Each Scale Factor Works Best"

### Image Size Calculator
- Added "Why Image Dimensions Matter" (4 cards)
- Added "How to Use the Image Size Calculator" (step-by-step)
- Added "Common Image Dimension Questions" (3 FAQs)

### About Page
- Added "Who Built SquarePic" section with team credentials (E-E-A-T signal)
- Retitled all sections for clarity
- Added author Person schema

---

## Phase 3: Technical Fixes (✅ Done)

| Issue | Fix |
|-------|-----|
| Stale sitemap dates | Reverted from static `"2026-07-19"` to `new Date()` dynamic date |
| www redirect | Added `squarepic.io` → `www.squarepic.io` 301 redirect |
| robots.txt | Removed `/sitemap-images` reference (route does exist, but was incorrectly referenced) |
| Duplicate Organization schema | Removed inline schema with wrong logo path |
| Logo path | Fixed `squareframe_preview.png` → `images/logo-icon.svg` in resize pages |
| Missing platforms | Added WhatsApp, Telegram, Discord to image calculator; added Pinterest, Snapchat, WhatsApp, Discord to homepage table |

---

## Phase 4: Comprehensive Audit — Remaining Issues & Opportunities

### Critical Issues

| # | Issue | Impact | Evidence | Fix | Priority |
|---|-------|--------|----------|-----|----------|
| C1 | **llms.txt references 6 pages that don't exist** — `/blog/`, `/research/`, `/compare/` routes are listed in llms.txt but have no corresponding files | **High** — AI crawlers (GPTBot, ClaudeBot) following llms.txt will hit 404s, wasting crawl budget and signaling incompleteness | `public/llms.txt:49-66` lists blog, research, and comparison URLs that return 404 | Either: (a) create the pages, or (b) remove the references from llms.txt | **High** |
| C2 | **RSS feed (feed.xml) only includes 6 of 9 guide pages** — Missing facebook, pinterest, and discord guides | **Medium** — RSS subscribers won't see these newer guides | `src/app/feed.xml/route.ts:12-49` — GUIDES array missing 3 entries | Add missing guide entries to the GUIDES array | **High** |
| C3 | **Not-found page has weak metadata** — Title "404 - Page Not Found" doesn't include brand or keywords | **Low** — But 404 pages can rank for "site:domain.com 404" queries | `src/app/not-found.tsx:5-7` | Add brand name to title, more helpful description | **Medium** |
| C4 | **No AggregateRating schema despite 4.9 star rating** — About page mentions "4.9 out of 5 stars" but no structured data exists | **Medium** — Rating stars in SERP increase CTR by 10-30% | `src/app/about/page.tsx:88` mentions the rating but no schema exists | Add AggregateRating schema to about page | **Medium** |

### Content Gaps

| # | Gap | Target Query | Evidence | Fix | Priority |
|---|-----|-------------|----------|-----|----------|
| G1 | **Missing comparison pages** — `/compare/squarepic-vs-canva`, `/compare/squarepic-vs-iloveimg`, `/compare/squarepic-vs-tinypng` referenced in llms.txt but don't exist | `squarepic vs canva`, `squarepic vs iloveimg`, `best free image editor` | `public/llms.txt:64-66` | Create comparison pages or remove from llms.txt | **Medium** |
| G2 | **Missing blog pages** — `/blog/how-to-square-image-for-any-platform`, `/blog/privacy-first-image-editing` referenced but don't exist | `how to square an image`, `privacy image editing` | `public/llms.txt:50-53` | Create blog pages or remove from llms.txt | **Medium** |
| G3 | **Missing research page** — `/research/image-compression-benchmarks` referenced but doesn't exist | `image compression benchmarks 2026`, `webp vs avif` | `public/llms.txt:60-61` | Create research page or remove from llms.txt | **Medium** |
| G4 | **No "how to" tutorial pages** — Beyond social media size guides, no standalone tutorials for common tasks | `how to make a picture square on iphone`, `how to resize image without cropping`, `how to convert png to jpg` | No such pages exist in the codebase | Create tutorial pages targeting informational intent | **Medium** |
| G5 | **No "vs" content on tool pages** — Converter page doesn't compare WebP vs AVIF directly, compressor doesn't show head-to-head format benchmarks | `webp vs avif`, `jpeg vs png quality` | `src/app/converter/page.tsx` — format comparison table exists but no dedicated comparison section | Add head-to-head format comparison sections to tool pages | **Low** |
| G6 | **No XML sitemap entry for image sitemap** — `robots.txt` no longer references `/sitemap-images` | — | `public/robots.txt` only references `sitemap.xml` | Add `Sitemap: https://www.squarepic.io/sitemap-images` back to robots.txt (the route exists and works) | **Low** |

### Technical SEO

| # | Issue | Impact | Evidence | Fix | Priority |
|---|-------|--------|----------|-----|----------|
| T1 | **Image sitemap only lists 2 unique images** — All 14 entries use `/squareframe_preview.png` or `/images/logo-256.png` | **Low** — Image sitemap isn't adding value | `src/app/sitemap-images/route.ts:3-18` — every entry uses the same OG image | Add unique images per page (screenshots of each tool, guide images) or consider removing the sitemap | **Low** |
| T2 | **CSP uses `unsafe-inline` and `unsafe-eval`** — Necessary for Next.js but weakens CSP | **Low** — Standard for Next.js apps, no practical SEO impact | `next.config.ts:3` — CSP policy | Acceptable for Next.js; no fix needed | — |
| T3 | **No HSTS preload** — HSTS exists but domain isn't submitted to browser preload list | **Low** — Security bonus, not SEO-critical | `next.config.ts:24` — HSTS header present but `preload` is a separate process | Submit to https://hstspreload.org | **Low** |
| T4 | **No `noarchive` meta for thin tool pages** — Tool pages are interactive but Google might cache them | **Low** — Standard behavior | Not implemented | Consider `noarchive` for tool pages where users process sensitive images | **Low** |

### On-Page SEO

| # | Issue | Impact | Evidence | Fix | Priority |
|---|-------|--------|----------|-----|----------|
| O1 | **Privacy page title lacks brand/keywords** — "Privacy Policy - Free Online Image Editor" doesn't include "SquarePic" in title | **Low** — Privacy pages rarely rank for competitive keywords | `src/app/privacy/page.tsx:5-6` | Add "SquarePic" to title for consistent branding | **Low** |
| O2 | **Terms page title lacks brand/keywords** — "Terms of Service - Free Online Image Editor" same issue | **Low** | `src/app/terms/page.tsx:5-6` | Add "SquarePic" to title | **Low** |
| O3 | **No social sharing image differentiation** — All pages use the same OG image `/squareframe_preview.png` | **Low** — Acceptable for a tool site, but unique images per page improve CTR on social | `layout.tsx:45` — single OG image for all pages | Consider unique OG images per tool page showing the tool interface | **Low** |

### Schema Markup

| # | Issue | Impact | Evidence | Fix | Priority |
|---|-------|--------|----------|-----|----------|
| S1 | **Missing AggregateRating schema** — 4.9 star rating mentioned on about page but not in structured data | **Medium** — Rating stars in SERP increase CTR | `src/app/about/page.tsx:88` — text mentions rating | Add `AggregateRating` to the Organization schema or about page | **Medium** |
| S2 | **Homepage has WebSite + SoftwareApplication + WebApplication but no `potentialAction` on all tool pages** | **Low** — Only the homepage has SearchAction | `src/app/page.tsx:43-47` — SearchAction only on homepage | Add SearchAction to all tool pages | **Low** |
| S3 | **Converter [slug] pages lack SoftwareApplication schema** — Only the converter hub page has it | **Low** — Each format conversion is a tool | `src/app/converter/[slug]/page.tsx` — only BreadcrumbSchema + HowToSchema | Add WebApplication schema to converter slug pages | **Low** |

### E-E-A-T Signals

| # | Issue | Impact | Evidence | Fix | Priority |
|---|-------|--------|----------|-----|----------|
| E1 | **No individual author pages** — Guide pages have authors (SevenOneLabs) but no `/author/` page | **Low** — Author pages build topical authority | No `/author/` route exists | Create `/author/sevenonelabs` page with bio and list of guides | **Low** |
| E2 | **Guide pages lack author bylines in visible content** — ArticleSchema includes author but no visible byline on the page | **Low** — Schema provides this to Google, but users don't see it | Guide pages have `<p>Published...by SevenOneLabs</p>` — actually they do have this | Already present ✅ | — |

### Internal Linking

| # | Issue | Impact | Evidence | Fix | Priority |
|---|-------|--------|----------|-----|----------|
| L1 | **No link from homepage to converter [slug] pages** — Homepage links to `/converter` but not to specific format pairs | **Low** — The converter hub links to all slug pages | Homepage `ToolLinks` only links to `/converter` | Add popular format pair links (PNG→JPG, PNG→WebP) in homepage content | **Low** |
| L2 | **Converter page doesn't link to platform resize pages** — When discussing JPEG for Instagram, no link to `/resize/instagram` | **Low** — Missed opportunity for contextual internal linking | `src/app/converter/page.tsx:149` — mentions "social media" but no links | Add relevant resize page links when platforms are mentioned | **Low** |
| L3 | **Guide pages don't cross-link to each other** — Each guide is standalone with no "related guides" navigation | **Medium** — Improves topical authority and reduces bounce | `src/components/guides/related-guides.tsx` exists but may not show all guides | Verify `RelatedGuides` component shows all relevant guides | **Low** |

### Image Optimization

| # | Issue | Impact | Evidence | Fix | Priority |
|---|-------|--------|----------|-----|----------|
| I1 | **Tool SVGs use `aria-hidden="true"`** — Decorative is fine, but tool icons in cards could be meaningful | **Low** — Decorative icons don't need alt text | `tool-links.tsx:86` — `aria-hidden="true"` on tool icons | Current approach is correct for decorative icons | — |
| I2 | **OG preview image is PNG (1.1 MB)** — Could be WebP for faster social share load | **Low** — OG images are fetched once per share | `/squareframe_preview.png` — check file size | Convert to WebP or compress further | **Low** |
| I3 | **No image CDN optimization** — All images served directly from Vercel, no `next/image` optimization on public images | **Low** — Vercel handles some optimization | `package.json` — no `next/image` usage in public images | Use `next/image` for static images (logos, OG) | **Low** |

### AI Search Readiness

| # | Issue | Impact | Evidence | Fix | Priority |
|---|-------|--------|----------|-----|----------|
| A1 | **llms.txt references non-existent pages** (same as C1) | **High** — AI crawlers get 404s | `public/llms.txt:49-66` | Fix broken references | **High** |
| A2 | **No GPTBot/ClaudeBot specific rules in robots.txt** | **Low** — Default behavior allows them | `public/robots.txt` — no AI crawler sections | Add explicit AI crawler rules if desired | **Low** |

---

## Phase 5: Prioritized Action Plan

### Critical — Fix Immediately
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| C1 | Fix llms.txt — either create missing pages or remove broken references | Low | High |
| C2 | Add missing guide entries to RSS feed (facebook, pinterest, discord) | Low | Medium |
| A1 | Same as C1 — fix llms.txt for AI crawlers | Low | High |

### Low Priority — Backlog
| # | Action | Effort | Impact |
|---|--------|--------|--------|
| L1-L2 | Add more cross-links between tools, converters, and resize pages | Medium | Medium |
| I2-I3 | Optimize OG image (WebP) and use next/image for static assets | Low | Low |
| A2 | Add explicit AI crawler rules to robots.txt | Low | Low |
| T3 | Submit domain to HSTS preload list | Low | Low |

---

## Ranking Recovery Notes

The drop from page 1 → page 2 was caused by:

1. **Stale sitemap** — Static date `2026-07-19` prevented Google from re-crawling updated content
   - **Fix**: Reverted to dynamic date ✅

2. **Lost old ranking keywords** — Old H1 "Square Pic - Social Media Resizer" was replaced; "social media resizer" and "square pic" keyword signals vanished from prominent positions
   - **Fix**: Restored "social media resizer", "square pic", "photo resizer", "image resizer" to homepage body content ✅

3. **Major content restructuring** — Homepage went from minimal content to extensive sections; Google needs time to re-index
   - **Monitor**: Expect 2-4 weeks for re-evaluation
