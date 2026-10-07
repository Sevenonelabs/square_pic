# SquarePic SEO Audit

Audit date: 2026-10-07 (Asia/Calcutta)

Scope: live `https://www.squarepic.io` plus the checked-out Vite repository in this workspace. The live site and repository are not the same deployment: live responses identify a Vercel/Next.js app and use `www.squarepic.io`, while this repository builds a Vite/Apache/Hostinger site with non-`www` canonicals.

## Executive summary

Provisional live-site health score: **70/100**.

The live site is crawlable and server-rendered. The 49 URLs in the main sitemap returned HTTP 200, the homepage rendered 932 words without JavaScript, the agent UX heuristic scored 100/100, and the homepage emitted valid Organization, WebSite, and SoftwareApplication JSON-LD.

The highest-leverage issue is deployment/source drift. If this repository is intended to be production, it is not what the canonical domain currently serves. Resolve that ownership and canonical-host decision before optimizing individual pages.

## Findings by priority

### High — deployment and canonical-host drift

Evidence: repository canonicals and `.htaccess` target `https://squarepic.io`, with `.htaccess` redirecting `www` to the apex host. The live domain redirects `https://squarepic.io/` to `https://www.squarepic.io/`, serves Vercel headers, and emits `www` canonicals. The live sitemap contains 49 URLs such as `/guides/*`, `/resize/*`, and `/converter/*` that do not exist in this repository; the repository sitemap contains 37 URLs based on the older `.html` page set.

Recommendation: choose one production application and one canonical host, then make the repository, redirects, sitemap, analytics, and deployment workflow agree. If this repo is retired, archive it or label it clearly; if it is intended to ship, reconcile the Vercel/Next deployment before changing SEO metadata.

How to know it failed: after deployment, `curl -I` for apex, `www`, HTTP, and HTTPS should produce one redirect maximum to the chosen host; every sitemap URL should belong to that same application and its HTML canonical should match.

### High — malformed live image sitemap

Evidence: `https://www.squarepic.io/sitemap-images` returns HTTP 200 but fails XML parsing at lines 104 and 120 because `<image:title>` contains unescaped ampersands (`YouTube Banner & Thumbnail...` and `Instagram Reels & Stories...`). The URL is declared in `robots.txt`, so crawlers are invited to process a broken sitemap.

Recommendation: escape ampersands as `&amp;`, validate the feed in CI, and keep only image sitemap tags supported by the current Google documentation. The image URLs themselves returned HTTP 200.

How to know it failed: XML parsing and sitemap discovery should report the image sitemap as valid, with no declared sitemap errors.

### High — source CSP blocks inline analytics

Evidence: every repository HTML page includes inline GTM/GA code, but the HTML meta CSP has `script-src` and `script-src-elem` without `unsafe-inline`. The repository `.htaccess` CSP is a different policy and includes `unsafe-inline`, so the two policies are not synchronized. Because browsers enforce both, the stricter meta policy can block the inline analytics snippets.

Recommendation: remove inline scripts by externalizing them with nonces/hashes, or deliberately align the header and meta CSP after confirming the security trade-off. Keep the policy in one source of truth and test a production build in a browser console.

How to know it failed: GTM and GA4 load without CSP violations, and the final response header and meta policy are identical in directives and allowed origins.

### Medium — titles and descriptions are too long on the live site

Evidence: across 49 live sitemap pages, 33 titles exceed 60 characters and 39 meta descriptions exceed 160 characters. Examples include `/resize/x-twitter` (84-character title, 223-character description) and `/guides/youtube-banner-thumbnail-sizes-2026` (87-character title, 166-character description).

Recommendation: rewrite the highest-value tool and guide templates first, keeping the primary query near the beginning and the brand at the end. Preserve the page’s actual intent; do not mechanically truncate every string.

How to know it failed: rerun the metadata scan and reduce out-of-range titles/descriptions without lowering Search Console CTR or impressions for the affected URL groups.

### Medium — social preview images are missing on 35 live pages

Evidence: 35 of 49 live sitemap pages have neither `og:image` nor `twitter:image`. Missing pages include all `/resize/*` pages, all converter-pair pages, and several support/information pages.

Recommendation: add a reusable platform-specific default image for tool pages and unique images for guide pages where sharing is valuable. Keep dimensions and alt text explicit.

How to know it failed: each indexable page intended for sharing exposes a 200 image URL in both Open Graph and Twitter metadata, and link-preview validators render it.

### Medium — deprecated HowTo structured data is widespread

Evidence: 31 live pages emit `HowTo` JSON-LD, including tool, resize, and converter pages. The current quality gate treats HowTo rich results as deprecated and says not to recommend new HowTo schema.

Recommendation: remove HowTo JSON-LD from the live templates unless it is required for a non-Google consumer. Keep valid WebApplication/WebApplication, Article/BlogPosting, Organization, BreadcrumbList, and genuine FAQ data where it matches visible content.

How to know it failed: the 31 affected URLs no longer emit HowTo, while Schema.org validation shows no replacement errors and visible step content remains useful to people.

### Medium — performance is unverified

Evidence: the PageSpeed Insights call was rate-limited, so no LCP, INP, CLS, CrUX, or Lighthouse score was available. Agent UX was independently 100/100, and server-rendered content was present, but that is not a Core Web Vitals result.

Recommendation: rerun PSI or Lighthouse from an authenticated/local runner and record mobile and desktop LCP, INP, and CLS. Prioritize the editor’s JavaScript and image/font loading after measurement.

How to know it failed: no conclusion should be drawn until field data or a repeatable lab run exists; then use the thresholds LCP ≤2.5s, INP ≤200ms, and CLS ≤0.1.

### Low / Info — AI-agent content layer

Evidence: the live site is server-rendered, allows named search crawlers, has a real 404, and exposes `/llms.txt`. The `llms.txt` check failed because it contains no Markdown links and no blockquote summary. Markdown negotiation and `.md` sibling delivery are absent. Content-Signal is not declared.

Recommendation: make `llms.txt` syntactically useful with Markdown links and a short blockquote summary. Treat Markdown delivery and Content-Signal as optional experiments, not Google Search requirements. Do not claim that either will improve rankings.

How to know it failed: rerun the agentic check; `llms-txt` should pass while Google Search performance is evaluated separately in Search Console.

### Info — FAQ schema

Evidence: 23 live pages emit FAQPage JSON-LD. The questions are a useful content format, but Google FAQ rich results are retired for general sites as of 2026-05-07.

Recommendation: do not add FAQPage for SERP rich-result eligibility. Do not remove existing markup solely for that reason; keep it only when it accurately describes visible FAQs.

## What is working

- 49/49 main-sitemap URLs returned HTTP 200.
- Homepage content is available without JavaScript; the render contained 932 words and no client-shell marker.
- All crawled live pages had one H1 and valid-looking title, description, canonical, and index-follow directives.
- The live homepage emitted valid Organization, WebSite, and SoftwareApplication JSON-LD.
- HTTPS, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and frame protections were present on the live response.
- The repository production build completed successfully with Vite.
- The repository HTML scan found 38 pages with no missing title, description, canonical, H1, or image alt attributes.

## Measurement limits

- PSI was unavailable because the public API reported rate limiting; performance scores are therefore provisional.
- No Google Search Console, GA4, backlink, SERP, or CrUX credentials were available in this audit, so traffic, rankings, index coverage, and field CWV trends were not measured.
- Visual inspection was represented by the agent UX check, not a full manual design review.

## Next audit

First verify which deployment is authoritative, then rerun sitemap, metadata, schema, and PSI checks against that single host. After the technical reconciliation, compare Search Console impressions and CTR by page family and record CrUX/Lighthouse baselines.

