# Discord keyword improvements and measurement baseline

Collected October 7, 2026 using the authenticated, read-only `gsc` CLI for `sc-domain:squarepic.io`, web search. Current window: September 7–October 4, 2026. Previous: August 10–September 6. Supporting 90 days: July 7–October 4. Dates use Search Console reporting dates; collection uses Asia/Calcutta.

This continuation preserves the earlier changes on `codex/seo-action-plan`. Deployment remains pending. Figures describe the live site before release, not the new copy. The original report and API snapshots remain intact.

## Selection and keyword ownership

The opportunity screen selects at least 25 page/query impressions, CTR below 2%, and average position 3–20. This is a triage rule, not a CTR benchmark or a ranking guarantee. The highest-volume qualifying queries still belong to the homepage and calculator already improved in the original report. Those edits are preserved. The complete screen is saved in [discord-keyword-baseline.json](discord-keyword-baseline.json).

Within Discord, server banner size is the largest qualifying lead. Splash troubleshooting has only 13 impressions, but its 2.69 position, zero clicks, and inaccurate existing content justify a supporting answer on the same guide. Broad banner size is at position 67 and is not a near-term ranking win. The 90-day counts equal the current-period counts for these queries, and the previous filtered response has no rows. This is emerging visibility, not evidence of recurrence across several windows.

| Query | Current clicks | Impressions | CTR | Position | 90-day impressions | Owner and action |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| discord server banner size | 0 | 26 | 0.00% | 6.81 | 26 | `/guides/discord-image-sizes-2026`: lead with dimensions, placement, and access |
| discord server splash image not showing on invite link | 0 | 13 | 0.00% | 2.69 | 13 | Same guide: placement, access, preview, file checks, and escalation |
| discord server icon size | 0 | 11 | 0.00% | 12.82 | 11 | Same guide: distinguish a 512 × 512 working preset from official requirements |
| discord banner size | 0 | 8 | 0.00% | 67.00 | 8 | Same guide: compare placements; avoid a duplicate broad-banner page |

All four have no returned query row in the previous window. No returned row does not establish zero search demand. Query data omits anonymized traffic and must not be summed into page or property totals. Apex and www variants are combined by path, CTR is clicks divided by impressions, and position is weighted by impressions. Google can revise historical values, so refreshed responses are saved separately.

The existing guide owns dimension explanations and troubleshooting. `/resize/discord` supports the workflow with presets and links to the guide; `/` remains the actual editor. The social-media cheat sheet summarizes dimensions and links to the guide. No additional Discord URLs were created. Existing keyword ownership for square-photo, calculator, Instagram, and LinkedIn intents remains documented in [REPORT.md](REPORT.md).

## Page and indexing baseline

| Page | Current clicks | Impressions | CTR | Position | Previous |
| --- | ---: | ---: | ---: | ---: | --- |
| `/guides/discord-image-sizes-2026` | 1 | 279 | 0.36% | 14.61 | No returned page row |
| `/resize/discord` | No returned page row | — | — | — | No returned page row |

Page-only totals above come from filtered authenticated API requests. They include traffic missing from query rows.

| Inspected live URL | Verdict / coverage | Google canonical | Last crawl UTC |
| --- | --- | --- | --- |
| `/guides/discord-image-sizes-2026` | PASS / Submitted and indexed | `https://www.squarepic.io/guides/discord-image-sizes-2026` | 2026-09-26T22:26:22Z |
| `/resize/discord` | NEUTRAL / URL is unknown to Google | Unavailable | Unavailable |

Inspection describes Google's stored live version, not the local build. The preset page is a support and discovery improvement, not an existing ranked landing-page win.

## Changes and verified sources

- Corrected the shared Server Splash editor preset from 960 × 540 to 1920 × 1080. The editor, preset reference, calculator presets, and cheat sheet consume the same data.
- Rewrote the existing guide with a descriptive title, comparison table, early answers, jump links, missing-splash checks, a real resize workflow, and matching visible FAQ/JSON-LD. Updated directory and RSS listings without changing its URL.
- Added guide links from the Discord preset page and cheat sheet. The guide links back to presets, editor, calculator, square-photo guide, compressor, and converter. Fixed a raw ampersand in the main RSS channel title exposed by XML parsing.
- Removed unsupported chat-upload limits, fixed safe-area percentages, universal compression claims, an invented guild-template size, and incorrect emoji/sticker maxima. Still-image output is stated explicitly. No FAQ rich-result uplift is claimed.

Official Discord sources were checked October 7, 2026:

- [Server banners](https://support.discord.com/hc/en-us/articles/360028716472-Server-Banners): at least 960 × 540 at 16:9, 1920 × 1080 accepted, upper 48 pixels kept simple, Level 2 static, Level 3 animated, Partner exception.
- [Invite backgrounds](https://support.discord.com/hc/en-us/articles/4415841146391-Server-Invite-Background) and [Boost perks](https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-FAQ): 1920 × 1080 JPG/PNG, static, Level 1, separate setting and private-window preview.
- [Server Profile](https://support.discord.com/hc/en-us/articles/30715364399511-Server-Profile): color header and discoverable-server custom banner; separate from invite background. The troubleshooting checklist is an inference from documented placements and access, not a verified Discord defect or guaranteed fix.
- [Custom Profiles](https://support.discord.com/hc/en-us/articles/4403147417623-Custom-Profiles): personal banner minimum 680 × 240, under 10 MB, JPG/PNG/animated GIF, Nitro. Older 600 × 240 advice was not repeated as current.
- [Emoji guidance](https://support.discord.com/hc/en-us/articles/360041139231-How-to-Add-Emojis-on-Discord) and [sticker requirements](https://support.discord.com/hc/en-us/articles/4402687377815-Tips-for-Sticker-Creators-FAQ): emoji 128 × 128 recommended and under 256 KB; sticker exactly 320 × 320, maximum 512 KB, PNG/APNG.

## Data reproduction

Raw refresh responses are in `data/`. These requests returned fewer than the 10,000-row cap. The full current page/query response has 1,244 rows; filtered previous Discord queries and pages return no rows. The script validates successful responses and rejects a reached row cap before generating the baseline.

```powershell
gsc auth status
gsc analytics query --site sc-domain:squarepic.io --start 2026-09-07 --end 2026-10-04 --dimension 'page,query' --limit 10000 --type web
gsc analytics query --site sc-domain:squarepic.io --start 2026-07-07 --end 2026-10-04 --dimension 'page,query' --limit 10000 --type web --filter 'query~discord'
gsc analytics query --site sc-domain:squarepic.io --start 2026-08-10 --end 2026-09-06 --dimension 'page,query' --limit 10000 --type web --filter 'query~discord'
gsc analytics query --site sc-domain:squarepic.io --start 2026-09-07 --end 2026-10-04 --dimension page --limit 10000 --type web --filter 'page~discord'
gsc analytics query --site sc-domain:squarepic.io --start 2026-08-10 --end 2026-09-06 --dimension page --limit 10000 --type web --filter 'page~discord'
gsc inspect https://www.squarepic.io/guides/discord-image-sizes-2026 --site sc-domain:squarepic.io
gsc inspect https://www.squarepic.io/resize/discord --site sc-domain:squarepic.io
python scripts/report-discord-gsc.py
```

Save future API responses under a new dated directory; do not overwrite this pre-release baseline.

## Validation

Run from `squarepic-next`:

```powershell
npm run build
npx eslint src/app/guides/discord-image-sizes-2026/page.tsx 'src/app/resize/[platform]/page.tsx' src/app/guides/page.tsx src/app/guides/social-media-image-sizes-2026/page.tsx src/components/guides/related-guides.tsx src/data/guides.ts src/app/feed.xml/route.ts
npm run start -- --port 4174
# In another terminal:
npm run check:seo -- --base http://127.0.0.1:4174 --output docs/gsc-2026-10-07/discord-seo-validation.json
python scripts/verify-discord-improvements.py
python scripts/verify-gsc-improvements.py --base http://127.0.0.1:4174 --output docs/gsc-2026-10-07/discord-regression
```

Production build and TypeScript compilation passed. ESLint passed on all changed TypeScript files. `git diff --check` passed.

- [SEO validation](discord-seo-validation.json): 50 pages, two valid XML sitemaps, 14 preview images, and 35 llms links.
- [Discord browser evidence](discord-browser-verification.json): guide and preset page return 200 with descriptive titles, self-canonicals, exact visible FAQ/JSON-LD agreement, working anchors, and no page overflow at 320/390 pixels. Discovery links and both RSS feeds passed.
- Actual editor upload and PNG downloads passed: Server Banner is 960 × 540, Server Splash is 1920 × 1080. Dimensions were read from the downloaded PNG headers, not inferred from UI labels.
- [Earlier-work regression checks](discord-regression/browser-verification.json): calculator valid/invalid inputs, proportional sizes, square-guide discovery, legacy redirect, canonicals, mobile layout, Solid versus Crop image behavior, and actual 2x upscaler PNG download passed.
- No SquarePic browser errors occurred. Existing StartupBar iframe hydration errors remain recorded separately with vendor stack traces; the integration remains enabled. This external issue remains unresolved.

Desktop and mobile screenshots are saved beside this report. A production preview is available at `http://127.0.0.1:4174/guides/discord-image-sizes-2026` while the local server runs.

## Measurement after release

1. Record the actual release date and preserve these snapshots. Check live titles, canonical URLs, the 1920 × 1080 export, RSS, and links after release. Re-inspect both Discord URLs after recrawl. The read-only CLI cannot request indexing.
2. Compare these query/page mappings over 28 complete days after release and recrawl with September 7–October 4. End at least three days before collection and account for Google revisions. Use page-only totals alongside query rows; split device/country when samples permit. Separate branded navigation from non-branded intent in wider reports.
3. Record clicks, impressions, CTR, and impression-weighted position. A CTR change only supports the hypothesis if query mix and position remain comparable. The 26/13-impression samples cannot establish significance or attribute a gain to copy alone.
4. If impressions persist at similar positions but zero clicks continue across complete windows, reconsider the title and search-intent match. If impressions or positions worsen, inspect indexing, query mix, and competition before adding pages. Low or absent samples are inconclusive. Keep the guide as the owner unless GSC shows a recurring, distinct unmet intent.

Deployment is pending. No ranking, CTR, or traffic gain is claimed from these local changes.
