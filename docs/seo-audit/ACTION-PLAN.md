# SquarePic SEO Action Plan

## Phase 1 — resolve the upstream constraint

1. Decide whether production is the Vercel/Next app or this Vite/Hostinger repo.
   - Unblocks: canonical, sitemap, redirects, analytics, and every page-level audit.
   - Verify: one host, one sitemap family, matching canonicals, and no stale application serving the domain.
2. If the static repo remains active, align `.htaccess`, HTML canonicals, `robots.txt`, `sitemap.xml`, and the GitHub deployment workflow. Explicitly deploy/update `.htaccess`.
   - Verify: preview and production response headers/routes match.

## Phase 2 — fix crawl-facing defects

3. Escape the two ampersands in the live image sitemap and add XML validation to deployment CI.
   - Verify: sitemap discovery reports the image sitemap as valid.
4. Fix the source CSP mismatch so inline GTM/GA is either safely externalized or deliberately permitted in both policies.
   - Verify: no CSP console errors and analytics requests occur.
5. Re-run PSI/Lighthouse with a usable quota/key and capture mobile + desktop LCP, INP, and CLS.

## Phase 3 — improve search presentation

6. Rewrite the 33 overlong live titles and 39 overlong descriptions, starting with `/resize/*`, converter pairs, and high-intent tools.
7. Add social preview images to the 35 live pages that lack them.
8. Remove deprecated HowTo JSON-LD from the 31 live pages where it is only present for search markup.

## Phase 4 — AI/search maintenance

9. Repair `llms.txt` with Markdown links and a concise blockquote summary; keep its purpose separate from Google Search.
10. Monitor Search Console by page family, CTR, indexed URLs, and query clusters. Re-audit after the deployment decision and again after the metadata/schema release.

## Implementation update, 7 October 2026

Production decision: keep the live Next.js/Vercel application. Source fixes
and production-build verification are complete in the sibling
`squarepic-next` repository on `codex/seo-action-plan`, committed as
`dcce9a1` and pushed to GitHub. Deployment and
Search Console reauthentication remain pending. Weekly monitoring is
scheduled for Mondays at 09:00 IST.

See [the implementation report](IMPLEMENTATION-REPORT.md) for item-by-item
status, verification evidence, Lighthouse measurements, and remaining dependencies.
