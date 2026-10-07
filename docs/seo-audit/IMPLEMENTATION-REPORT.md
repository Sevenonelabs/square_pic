# SquarePic action plan implementation

Date: 7 October 2026, Asia/Calcutta.

The user chose the live Next.js/Vercel application as production. Changes
are in the sibling `squarepic-next` repository on `codex/seo-action-plan`.
The source fixes were committed as `dcce9a1` and pushed to
`origin/codex/seo-action-plan` in `Sevenonelabs/square_pic`. They have not
been merged to main or deployed to production. The original live
audit remains a record of the site before this release.

The legacy `Sevenonelabs/001_Square_Pic` repository is archived and
read-only. GitHub rejected its branch push with HTTP 403. Its workflow and
status changes are preserved in a local `codex/seo-production-status`
commit. Audit reports are also published under `docs/seo-audit` on the
active Next.js branch so they remain available on GitHub.

## Plan status

| Item | Result |
| --- | --- |
| 1. Production application | Next.js/Vercel retained; canonical origin is `https://www.squarepic.io`. |
| 2. Static deployment alignment | Static deployment branch does not apply. Legacy Hostinger FTP workflow changed to manual only; both checkouts document the production decision. Next redirects apex requests for every path to www. |
| 3. Image sitemap | Fixed in source. URLs are XML-escaped; deprecated image title/caption tags containing bare ampersands were removed. Both sitemaps pass XML parsing. Added CI validation. |
| 4. CSP and analytics | Fixed the active Next policy after live browser evidence showed blocked GA4 collection, audience, and StartupBar heartbeat requests. Local browser reports no CSP violations and GA4 responds with HTTP 204. Tracking IDs were preserved. Legacy HTML/meta CSP is outside the selected deployment. |
| 5. Performance baseline | Completed mobile and desktop Lighthouse runs against the live homepage. PSI still returns HTTP 429; field INP/CrUX requires an API key. |
| 6. Titles/descriptions | Updated shared resize and converter templates plus static tool, guide, and information-page metadata. All 49 sitemap pages pass: titles at most 60 characters, descriptions at most 145. |
| 7. Social previews | All 49 pages emit Open Graph and Twitter image URLs, alt text, and matching metadata. Reused 14 existing PNG assets; verified HTTP 200, image types, and actual dimensions. |
| 8. HowTo markup | Removed the component and all usages. All 49 pages have parseable JSON-LD with no HowTo. Visible instructions and other schema remain. |
| 9. llms.txt | Added a blockquote summary and 35 valid Markdown links. Removed unsupported no-tracking claims and kept its AI navigation purpose separate from Google indexing. |
| 10. Monitoring/re-audit | Weekly follow-up created for Mondays at 09:00 IST, beginning 12 October. It watches for release and meaningful changes. Search Console collection is pending renewed OAuth; token refresh returns HTTP 400. Re-audit of released fixes remains pending deployment. |

## Verification

- `npm run build` passed for the Next production build.
- TypeScript validation and ESLint on the changed TypeScript files passed.
- `npm run check:seo -- --start-server` passed for 49 pages, two XML
  sitemaps, 14 social preview images, and 35 llms links.
- Browser checks passed for the homepage, `/resize/x-twitter`,
  `/converter/png-to-jpg`, and the YouTube guide.
- Image upload rendered a 256 × 256 canvas and enabled Download & Share.
- An apex-host request to `/resize/facebook` returned one HTTP 308 redirect
  to `https://www.squarepic.io/resize/facebook` in the local production server.
- Local Vercel Analytics/Speed Insights script endpoints return 404 because
  `next start` does not supply Vercel's platform endpoints. Verify them on Vercel.

`seo-validation.json` contains the page-level metadata results.
`local-browser-verification.json` records successful GA4 collection and
the sample-page checks. `live-browser-baseline.json` records the original
CSP failures before the fix.

## Live performance baseline

Lighthouse 13.5.0, headless Chromium, one homepage run per device profile.
These are lab measurements of the current live release, before these changes.

| Profile | Performance | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 82 | 4.01 s | 0.039 | 93 ms |
| Desktop | 98 | 0.85 s | 0.024 | 0 ms |

Both runs completed without Lighthouse warnings. Results are saved as
`lighthouse-live-mobile.report.html/json` and
`lighthouse-live-desktop.report.html/json`. Mobile LCP warrants a separate
performance investigation. Lighthouse TBT is not field INP; no INP result
is available. See [Google's Lighthouse scoring guidance](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
for the limits of a single run.

## Release and data dependencies

The Vercel release is still pending. After release, run the SEO checker
against `https://www.squarepic.io`, check redirects and browser analytics,
and confirm Google can read the repaired image sitemap. The new CI workflow
exists locally; branch protection and Vercel release gating have not been
configured remotely.

Search Console OAuth is present but unusable. Reauthenticate and verify a
SquarePic property explicitly before querying. The saved default property
belongs to another website and was not used for performance queries. No
Search Console traffic, CTR, or index counts have been claimed.

The weekly automation ID is `squarepic-seo-monitoring`. It stays quiet on
unchanged results and does not repeat the already-reported authentication
failure. Monitoring instructions and release commands are documented in
`squarepic-next/PRODUCTION.md`.
