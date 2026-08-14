# SquarePic — Full SEO Audit Report

**Audit date:** 2026-08-14
**Auditor:** Qiaomu SEO workflow
**Engine scope:** Google, Bing, AI-search (OpenAI/Perplexity), image search
**Work mode:** site inventory
**Evidence modes:** live (production build, localhost:3999) + code
**Action boundary:** audit only — no code/content/system changes made

---

## 1. Executive Summary

The site's technical SEO foundation is **solid**: all 48 sitemap URLs plus the homepage return HTTP 200 with correct self-referential canonicals, unique titles/descriptions/H1s, valid robots.txt and llms.txt, working permanent redirects, and server-rendered content. No crawl-blocked resources, no duplicate-content URLs, no soft 404s were found.

**Top three priorities:**

1. **Fix broken category feeds + guides filter** (two confirmed bugs) — `/guides/facebook/feed.xml` emits non-facebook guides, and `?category=social media` returns zero guides.
2. **Deduplicate/clean structured data** — 15 pages emit duplicate `Organization` schema (13 resize + about), tool pages emit both `WebApplication` AND `SoftwareApplication`, and the homepage `SearchAction` points at a search that does not exist.
3. **Establish field measurement** — no Search Console / CrUX / analytics data exists in scope, so indexing, Core Web Vitals, and traffic claims are currently unverifiable. Add per-page truthful sitemap `lastmod`.

---

## 2. Outcome, Scope, and Coverage

| Item | Value |
|---|---|
| **Outcome** | Qualified organic discoverability on Google / Bing / AI-search / image surfaces |
| **Scope** | Full site: 50 URLs (homepage + 48 sitemap + dynamic templates) |
| **Discovered** | 50 |
| **Selected** | 50 |
| **Fetched** | 50 |
| **Rendered (DOM)** | 0 — no headless renderer run; SSR HTML inspected instead |
| **Data-backed** | 0 — no first-party exports (Search Console / GA / logs) provided |
| **Failed** | none |
| **Market / language** | Global English |
| **Device** | Mobile + desktop |
| **Source freshness** | Registry validated 2026-08-14 — 33 sources, 0 overdue, `ok: true` |

### Exclusions / limitations

- Search Console, Bing Webmaster Tools, analytics, and server logs not provided (no crawl/index/traffic data).
- No field Core Web Vitals (CrUX / Search Console) available; lab checks only.
- No SERP-rank or competitor data provided.
- AI-search citation observation not performed (no authorized query set / protocol).
- Rendered-DOM evidence not collected; static SSR HTML inspected.
- Live checks ran against a local production build (`localhost:3999`) using `SITE_URL=https://www.squarepic.io` on 2026-08-14.

---

## 3. Findings

### 3.1 Confirmed bugs (status: fail)

| ID | Category | Issue | Impact | Confidence | Recommended fix |
|---|---|---|---|---|---|
| **FEED-01** | technical | Category feed bug: `matchesCategory()` returns *all* guides when a category has no keywords, so `/guides/facebook/feed.xml` lists Instagram/LinkedIn/YouTube/TikTok guides | low | high | Add facebook/pinterest/discord/social-media keywords to `CATEGORY_KEYWORDS`, or invert logic so unknown categories return empty |
| **FEED-02** | technical | Category-feed `GUIDES` array has 6 of 9 guides (missing facebook, pinterest, discord); the main `/feed.xml` has all 9 | low | high | Extract a shared `GUIDES` constant used by both feeds |
| **GUIDE-01** | technical | Guides hub filter: `?category=social media` → "No guides in this category yet" (unencoded space in href + label mismatch `social media` vs `Social Media`) | low | high | Add `social-media` slug mapping and URL-encode hrefs |
| **CANON-01** | structured_data | Duplicate `Organization` schema on all 13 `/resize/*` pages (root layout and each page both render `<OrgSchema>`) | low | high | Remove the page-level `OrgSchema` from `resize/[platform]/page.tsx` |
| **CANON-02** | structured_data | Duplicate `Organization` schema on `/about` (root layout + inline JSON-LD) | low | high | Remove the inline Organization block |

### 3.2 Warnings (status: warning)

| ID | Category | Issue | Impact | Confidence | Recommended fix |
|---|---|---|---|---|---|
| **SD-01** | structured_data | Tool pages emit both `WebApplication` and `SoftwareApplication`; homepage emits `SoftwareApplication` — redundant/inconsistent application schema | low | high | Consolidate to one application type per page |
| **SD-02** | structured_data | LinkedIn & YouTube guides have visible FAQ sections but no `FAQPageSchema` (7 of 9 other guides do) | low | high | Add FAQ schema to those 2 pages |
| **SCHEMA-01** | structured_data | Homepage `WebSite` schema declares a `SearchAction` targeting `/?q=...` but no site search exists | low | high | Remove the SearchAction or implement a real search endpoint |
| **DATE-01** | technical | Sitemap `lastmod` set to the build date for **all** URLs, including unchanged legal pages — untruthful lastmod signal | low | high | Attach stable per-page `lastModified` values |
| **DATE-02** | content | Visible "Last updated: March 2026" on `/converter`, `/cropper`, `/upscaler` while homepage/compressor say August 2026 | low | high | Refresh dates or drive from a shared constant |
| **ARCH-01** | architecture | Homepage links to only 3 of 13 `/resize` platform pages; converter hub links zero; 10 platform pages rely on sitemap alone | medium | high | Add an all-13-platform links block to homepage or a hub |
| **IMG-01** | image_search | Image sitemap lists the same 2 images across all 14 entries (OG + logo only); no unique per-page imagery | low | high | Create per-tool representative images |
| **OG-01** | content | Single OG image (`/squareframe_preview.png`) used site-wide — low social CTR differentiation | low | high | Generate distinct OG images per tool/guide page |

### 3.3 Not checked / missing evidence

| ID | Category | Issue | Impact |
|---|---|---|---|
| **PERF-01** | performance | No field Core Web Vitals (CrUX / Search Console not provided); lab only | medium |
| **CWV-01** | performance | Lab evidence: self-hosted fonts preloaded with `display:swap`, OG image 1200×630 at 26.7 KB, largest JS chunk ~221 KB — no field verdict | low |
| — | measurement | Search Console, Bing WMT, GA, server logs, SERP data, backlinks, keyword volumes, AI-citation observations | unknown |

### 3.4 Passes (status: pass)

| ID | Category | Evidence |
|---|---|---|
| **PASS-01** | indexing | All 48 sitemap URLs + homepage: HTTP 200, self-canonicals, `index,follow`, unique titles/descriptions/H1s |
| **PASS-02** | discovery | robots.txt allows all crawlers incl. GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot; all 46 llms.txt URLs resolve; all redirects return 308 to correct targets |
| **PASS-03** | on_page | Homepage fully SSR'd (H1 + How-to steps + size table + trust sections in raw HTML); 404 returns real HTTP 404 + `noindex` |

---

## 4. Prioritized Action Plan

### Quick wins (one afternoon, zero risk)

| # | Action | Findings | Effort | Impact |
|---|---|---|---|---|
| 1 | Fix category feeds (shared `GUIDES` + correct filtering) | FEED-01, FEED-02 | s | low |
| 2 | Fix guides "Social Media" filter | GUIDE-01 | xs | low |
| 3 | Structured-data cleanup: dedupe Organization, consolidate application type, remove SearchAction, add FAQ schema | CANON-01/02, SD-01/02, SCHEMA-01 | s | low |

### Strategic work

| # | Action | Findings | Effort | Impact |
|---|---|---|---|---|
| 4 | Truthful per-page sitemap `lastmod` + refresh visible dates | DATE-01/02 | m | low |
| 5 | All-13-platform internal linking from homepage/converter hub | ARCH-01 | s | medium |
| 6 | Unique per-tool images → image sitemap + OG tags | IMG-01, OG-01 | m | low |
| 7 | Enable CrUX API / Search Console CWV report + Lighthouse baseline | PERF-01, CWV-01 | s | medium |

### Destructive actions

None.

### Experiments

None registered. Any future title/meta or internal-link change should be staged with a registered hypothesis, treatment unit, comparison, observation window, and decision rule.

---

## 5. Machine-Readable Audit

`squarepic-seo-audit.json` (18 findings + 7 actions) was produced alongside this report and validated with:

```bash
python3 scripts/validate_audit.py squarepic-seo-audit.json
# => {"ok": true, "failures": [], "warnings": []}
```

---

## 6. Missing Evidence, Limitations, and Next Measurement Step

### Missing evidence

- Search Console property access (index coverage, performance, CWV field data)
- Bing Webmaster Tools data
- Analytics / GA data
- Server access logs (crawler verification, crawl frequency)
- Field Core Web Vitals (CrUX)
- SERP observation for target queries (ranks, features, competitors)
- AI-search citation / presence observation
- Backlink profile
- Keyword volume/difficulty data with provider + date

### Next measurement step

Provide Search Console (index coverage, performance, Core Web Vitals) + GA + Bing WMT access, then rerun the audit to confirm indexing status and establish a 2–4 week baseline.

### Rerun inputs

- Audit date: 2026-08-14
- Target domain: `https://www.squarepic.io` (canonical host)
- Environment: local production build (`npm run build` + `npm run start -- -p 3999`), `SITE_URL=https://www.squarepic.io`
- Inventory: sitemap.xml (48 URLs) + homepage + dynamic templates (13 resize, 14 converter pairs, 9 guides)
- Tools: PowerShell `Invoke-WebRequest` + regex extraction, Next.js 16.2.10 build output, Qiaomu `validate_audit.py` + `validate_knowledge.py`

---

*Copyright (c) 向阳乔木 · Generated via the Qiaomu SEO audit workflow.*
