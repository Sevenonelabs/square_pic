# Live technical SEO audit — 8 October 2026

This report measures production `https://www.squarepic.io`, reached by redirect from the supplied apex domain. It does not treat local code or historical `docs/seo-audit` files as deployed fixes. No application code was changed.

## Coverage and method

- Robots-respecting raw HTML crawl: 50 requested URLs, 49 canonical pages plus the `/resize` redirect alias; all final responses HTTP 200. Five concurrent workers maximum, at least one second between each worker's request starts. All 49 main-sitemap URLs fetched, queue exhausted below 500-URL ceiling. Query variants, API routes, authenticated content, external links, CSS background images, and an exhaustive asset graph were excluded.
- Main evidence: `data/crawl.json`, with status, headers, canonical, robots, title, description, H1, headings, visible raw text, internal links, images, JSON-LD and a `raw_path` per response. Additional evidence: `data/http-probes.json`, `data/sitemap-discovery.json`, `data/agentic-check.json`, `data/agent-ux.json`.
- This is an accessibility/indexability audit, not proof Google has indexed every page. GSC URL Inspection is the required source for actual index status.

## Checks measured

| Check | Result |
|---|---|
| HTTPS / preferred hostname | Pass: HTTPS apex → www via one permanent 308. HTTP apex takes two 308 hops; optional cleanup. |
| robots.txt | Pass: HTTP 200; public content allowed; wildcard group disallows `/api/`. |
| Main XML sitemap | Pass: valid XML with 49 HTTPS canonical URLs, all return 200. |
| Declared image sitemap | Fail: HTTP 200 XML is malformed at line 104, column 35; unescaped ampersand. |
| Title, description, H1 | Pass: exactly one of each on every canonical page. Author title has duplicated brand suffix. |
| Canonical / noindex | Pass: self-canonical on all 49 pages; no noindex observed. `/resize` redirects home correctly. |
| Raw HTML content | Pass: all pages have substantive HTML text; largest HTML is 156,604 bytes, safely below even a 2 MB fetch budget. |
| Internal graph | Warning: 48/49 sitemap pages reachable from homepage in ≤2 anchor clicks. `/converter/webp-to-avif` has no discovered internal anchor. |
| Unknown URL handling | Pass: random probe returns true HTTP 404, no general catch-all 200. |
| Security headers | Pass: HSTS, CSP, X-Content-Type-Options, frame protection and Referrer-Policy present on homepage. This is operational hygiene, not a material ranking opportunity. |
| Mobile viewport | Pass in source; rendered mobile quality owned by separate visual audit. |
| Core Web Vitals | Not measured here: PSI requests returned HTTP 429 shared quota. No LCP/INP/CLS or performance score inferred. |
| Hreflang | None present; single-language English content offers no demonstrated need. |
| Back-button hijacking / WAF verified bots / IndexNow | Not comprehensively tested. No negative finding inferred. |

No critical crawl/indexing blocker was found on the 49 canonical public pages. GSC follow-up in `data/gsc/summary.json` confirms 9 of 10 sampled existing URLs are submitted and indexed; `/cropper` is `Discovered - currently not indexed`. Its live HTML is 200, indexable and self-canonical, so this is a discovery/indexation follow-up rather than evidence of a global block. A separate locally pending guide is unknown to Google and must not be counted as a production failure.

Editorial technical score suggestion: **88/100**, limited to measured checks. Rubric: crawl/discovery/indexability 25/30 (cropper sample and orphan), metadata/canonical 19/20 (author suffix), raw HTML rendering 20/20, sitemap validity 6/10 (valid main, broken image), URL behavior 8/10 (redirect links/chain), headers/HTTPS 10/10. This is a manual audit rubric, not Google/Lighthouse. Field CWV and rendered mobile quality are excluded and must be separately marked unavailable or owned by the visual audit.

## Prioritized findings

### High: repair declared image sitemap XML

Evidence: [live image sitemap](https://www.squarepic.io/sitemap-images), raw `raw/sitemap-images.html` (file contains XML despite extension), line 104: `<image:title>YouTube Banner & Thumbnail Sizes 2026</image:title>`. XML parser fails because `&` is unescaped. Both custom crawler and bundled `sitemap_discovery.py` independently reject it. Correct escaping or omit deprecated title/caption fields. This unblocks parsing of this one sitemap; it does not imply the whole site is unindexable. Validation: parse the fetched live response as XML and observe GSC's sitemap status after resubmission.

### Medium: link the orphan conversion page from the relevant conversion hub

Evidence: [WebP to AVIF](https://www.squarepic.io/converter/webp-to-avif) is in the main sitemap and returns 200 with self-canonical, but zero incoming raw anchors were found across the 50 requested URLs. Add a descriptive anchor to the conversions hub / relevant WebP pages, after verifying actual AVIF export capability. This depends on the tool-capability fix; avoid increasing discovery of an unfulfilled conversion promise. Validation: a new homepage-rooted anchor crawl reaches it within two clicks; monitor indexed-page state and query impressions in GSC.

### Medium: follow up on cropper indexing

Fresh GSC URL Inspection reports `/cropper` discovered but not indexed. Ensure the production tool and its unique value are complete, keep prominent internal links and a truthful sitemap entry, then run a live inspection and request indexing after material improvements. Do not add arbitrary text or repeatedly request indexing without improvements. Validation: coverage transitions to indexed over time; leading indicators are successful live inspection and Google crawl dates. If it remains excluded, review actual tool quality, relevance and Google's canonical choice rather than assuming robots is the cause.

### Low: clean title and redirect destination links

- [Author](https://www.squarepic.io/author/sevenonelabs) title is `SevenOneLabs - The Team Behind SquarePic | SquarePic | SquarePic`. Remove one template suffix. Validate one suffix in live HTML; monitor CTR only after enough impressions accumulate.
- [Discord guide](https://www.squarepic.io/guides/discord-image-sizes-2026) links to `/resize` three times, which 308s to home. Link to the intended working tool/preset directly. Validate final destination and preset retained after navigation.
- HTTP apex → HTTPS apex → HTTPS www is a two-hop chain; HTTPS apex already uses one hop. Direct the HTTP apex to the final hostname where deployment configuration permits. Low impact; validate request history.

Descriptions are often long (homepage 223 characters; Instagram landing 232); truncation is possible, not an indexing defect or a fixed Google character limit. Rewrite descriptions around distinct intent and demonstrated product benefits when making the content changes.

## Dependencies and monitoring

Fix tool-capability and intent issues before adding more landing-page links or generating additional URLs. Deploy fixes, refetch the production URLs, then use GSC URL Inspection and sitemap processing as downstream checks. Monitor page/query clicks and impressions rather than assuming crawlable means ranking.

Primary guidance: [Google sitemap construction](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).
