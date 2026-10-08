# Image SEO audit — production, 8 October 2026

Evidence: `data/crawl.json`, `data/image-assets.json`, raw image-sitemap source `raw/sitemap-images.html`. All checks refer to the live deployment.

## Measured inventory

| Metric | Result |
|---|---|
| Raw-HTML `<img>` elements across 49 canonical pages | 0 |
| Distinct schema/OG assets fetched | 15 |
| Successful image responses | 15/15 HTTP 200 with image MIME types |
| OG/article PNGs | 14, each 1200×630; 43,324–50,935 bytes |
| Organization SVG logo | 1, 11,194 bytes |
| Assets larger than 200 KB | 0/15 |
| Alt/dimensions/srcset/lazy-loading defects on HTML images | Not applicable to zero-element inventory |

Do not report missing alt text counts or invent an image-performance penalty where there are no `<img>` elements. Client-created uploaded previews/canvas, CSS backgrounds, and images appearing after interaction were not comprehensively inventoried here. User uploads are not public crawlable site assets.

Editorial images score suggestion: **78/100**. Rubric: sampled asset availability 30/30; asset weight/dimensions 30/30; discovery/share coverage 8/20 (invalid image sitemap and missing OG metadata); useful demonstrative media 10/20 (text-only public HTML). This is a manual audit rubric, not an image ranking score; no penalty is assigned for nonexistent alt defects or retaining small PNG social cards.

## High: repair invalid image sitemap

[Image sitemap](https://www.squarepic.io/sitemap-images) is HTTP 200 application/xml but has an unescaped ampersand in line 104. Both XML parsers reject it. Replace string concatenation with XML-safe serialization or remove obsolete image title/caption fields. Supported image locations are present and all 14 intended OG assets work, but successful asset delivery does not fix malformed sitemap discovery.

## Medium: add useful original visual examples where they improve the task

The homepage and guides explain a visual image-editing product entirely with text in server HTML. Example: [Instagram guide](https://www.squarepic.io/guides/instagram-feed-sizes-2026) and [square image maker](https://www.squarepic.io/) would benefit from actual annotated before/after crops, safe-zone examples and resulting export comparisons. This is a demonstrated-content and user-understanding opportunity, not an alt-text emergency or a reason to add decorative stock art. Build examples from verified real tool output after tool correctness is fixed.

For each substantive illustration use a descriptive filename, accurate alt text, explicit dimensions/aspect ratio, responsive sizing, and modern delivery where it materially saves bytes. Lazy-load below-fold examples; identify the actual LCP element before assigning fetchpriority or changing above-fold loading. Validation: examples show the promised result, are available in HTML, remain clear on mobile, and do not cause measured layout shifts.

## Medium: improve share-preview coverage on traffic-bearing pages

Only 14 of 49 canonical pages declare `og:image` in raw HTML: the homepage, four core tools and nine guide articles. The other 35, including `/image-size-calculator`, all 13 platform landings and all 14 format-conversion pages, lack it. Use a correct default and distinct cards for important landing/tool pages when useful; legal pages do not need bespoke cards. This affects share previews and consistent presentation, not demonstrated rankings. Validation: fetch live metadata and preview representative shares. Fix tool output before investing in unsupported-format marketing cards.

## Low/info: no blanket PNG conversion required

Existing 1200×630 share PNGs are small (under 51 KB) and appropriate for social-card compatibility. Replacing all with AVIF solely for an audit checklist offers little proven benefit. CDN delivery through Vercel is present. Improve on-page explanatory imagery and sitemap validity first. Image search rankings, traffic and full rendered image delivery were not measured.

Primary sources: [Google image SEO](https://developers.google.com/search/docs/appearance/google-images), [Google image sitemap supported tags](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).
