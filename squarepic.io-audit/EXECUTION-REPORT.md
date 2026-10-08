# Action-plan execution

8 October 2026. Implementation and release work for [ACTION-PLAN.md](ACTION-PLAN.md).
Existing prepared source changes were reviewed and retained alongside the new tool fixes.

The requested canvas, mobile export, sharing, errors, photo examples and browser
follow-up is recorded in [EDITOR-IMPROVEMENTS.md](EDITOR-IMPROVEMENTS.md), including
confirmed GA4 reporting access and received tool events.

Current production is the verified editor follow-up, deployment
`dpl_B4JEY3WHPd8BupRvD21eeNvLiu2C`, with 96 public viewport checks and 30 public
sharing/recovery checks across Chromium, Firefox and WebKit. See the follow-up
report for its source manifest, screenshots and remaining device-test limit.

## Initial action-plan release

Production: [www.squarepic.io](https://www.squarepic.io).

The final deployment identity is saved in [deployment.json](release/deployment.json).
Vercel deployment `dpl_4RBdrZiNhNaiEoLLQV1iahhu4Ks7` is ready at
[the release URL](https://squarepic-next-g43leg9fu-sevenonelabs-projects.vercel.app),
aliased to production. It was created at 07:00:32 UTC / 12:30:32 IST on 8 October 2026.
The checkout base is `82f78b8f7a4013e4a0a8c0888aa9261d6eb041ba`; this release also includes uncommitted local changes.
The base commit alone does not identify the deployed source.
[source-manifest.json](release/source-manifest.json) records release input SHA-256 hashes, including both lockfiles.
Its combined hash is `39a41e0ce33175efde08aeb531b01c1dac28d7eadc517d88ed5e171fed0f17ac`.
No Git commit was created over the user's existing work.

## Actions

| Action | Implementation and remaining work |
| --- | --- |
| A1 | JPEG, PNG, WebP and PNG-backed ICO exports validate MIME/signatures and decode in Pillow and Chromium. AVIF, BMP, GIF and TIFF output are disabled with an explanation. Converter landing pages, help pages and navigation agree with that availability. JPEG flattens alpha onto white; other advertised outputs retain alpha. ICO preserves aspect ratio with a longest edge of at most 256 px. Animated inputs produce one still frame. |
| A2 | Format, quality and target changes invalidate compressor results. Quality search awaits each encode; target mode reduces dimensions when needed and reports impossible targets. Output dimensions, format and transparency limits are visible. Lossless PNG and exact-size promises were removed. |
| A12 | Crop export maps the selection to bounded source coordinates. The preview declares source dimensions; viewport changes do not silently resize the selected region. Exact marked-image pixels and dimensions pass at desktop DPR 1 and mobile DPR 2. |
| A3 | Narrow controls, titles, tables and headers fit the viewport. StartupBar remains enabled; reserved page padding prevents its late padding change from moving content. A production trace exposed an additional short loading fallback that brought the footer into view before the page arrived; the fallback now reserves viewport space. Screenshots and traces are retained. Field CrUX performance still needs later observation. |
| A4 | Type checking, lint, Next build, browser downloads, public SEO and release smoke checks were run. Reviewed sitemap, metadata, CSP, guide and redirect fixes are deployed through Vercel. Audit traces and environment files are excluded from upload. |
| A5 | Home remains the square maker, explains fit versus centered crop, shows actual export dimensions, and links both ways with the instructional guide. Three real browser exports illustrate which colored source edges fit retains and crop removes. The legacy article redirects permanently to the guide. Search uplift requires the later measurement window. |
| A6 | Calculator computes ratios, megapixels and proportional dimensions with bounds checks. Upscaler validates 2x/3x/4x output, clears stale scale/sharpen results, reports decode/export errors, preserves PNG/WebP alpha and flattens JPEG onto white. Copy describes browser smoothing and optional sharpening without promising an AI model or recovered detail. |
| A7 | All 13 platform pages embed the configured editor. Supported converter pairs embed the selected input/output workflow. LinkedIn, Instagram and Discord presets and browser history pass. Unsupported conversion URLs show an unavailable explanation and omit WebApplication schema; PNG-to-AVIF cannot complete until a verified AVIF encoder exists. |
| A8 | LinkedIn and Discord requirements were checked against dated official references. Instagram and Reels dimensions are explicitly working canvas recommendations where official organic upload requirements could not be verified. Guides separate image artwork, video requirements and destination previews, and contain original framing/overlay examples. |
| A9 | Cropper quality and contextual links were improved. The page returns 200, is self-canonical and has no noindex. Release-time GSC inspection still reports discovered/currently not indexed, without a crawl timestamp. Inspection after a new crawl remains pending. WebP-to-AVIF promotion is intentionally deferred while AVIF output is unavailable. |
| A10 | SevenOneLabs uses Organization consistently in profile, about and article author markup. Photo processing is distinguished from analytics and referral-widget traffic in privacy, home, about and author copy. Shared metadata provides valid share images and alt text. |
| A11 | Fixed event names cover upload accepted, processing success/error and download for applicable image workflows. Calculator reports committed valid/invalid calculations without sending dimensions; it has no upload or download step. Export failures are excluded from success and report errors. Tool events contain fixed tool/format labels, never file names or photo content. GA4 collection and reporting access are verified; the editor follow-up confirmed received upload, processing-success and download events in Realtime. Customer completion rates still require clean measurement. |

## Evidence

- `npx tsc --noEmit`, `npm run lint`, `npm run build`, and `git diff --check` passed. Vercel's production build passed as well.
- [Tool results](release/production-final/results.json) contain 22 independently decoded exports, signatures/MIME, dimensions, alpha and event observations. The suite also covers corrupt inputs, impossible targets, stale settings, calculator bounds/deduplication, browser history and failed preview recovery.
- [Public SEO results](release/seo-production-final.json) cover 50 pages, two XML sitemaps, 14 distinct preview images and 35 llms links.
- [Release smoke checks](release/production-final/smoke.json) record guide/alias redirects, canonical/indexing controls, real example assets, GA4 collection, referral traffic and CSP observations. GA4 batches multiple event records into one POST; the checker preserves every event name. Navigation can abort earlier queued page views, so the completion workflow is held open for collection.
- [Host redirects](release/production-final/host-redirects.json) confirm permanent 308 responses for HTTP and apex home/cropper URLs. GA4 collection returned 204 for accepted upload, processing success and download; the final workflow recorded no CSP violations.
- [Vercel SDK scripts](release/production-final/vercel-sdk.json) identify the SDK's configured script paths. Vercel uses hashed paths on this deployment, rather than the default `/_vercel` URLs. Successful script responses do not establish dashboard counts or conversion reporting.
- [Layout captures](release/production-complete/layout.json) cover 320, 375, 390, 768 and 1366 px, with repeated home/converter/compressor runs at 375 and 1366. [Before captures](release/before/layout.json) retain the old overflow/shift evidence. These are lab observations, not CrUX results.
  All 47 final production recordings have document width equal to viewport width and recorded CLS of 0. Three further 390 px runs with delayed JavaScript recorded no layout shifts. This is bounded browser evidence, not a guarantee for all devices or network conditions.
- [Delayed-chunk diagnostics](release/home-shift-diagnostics-delayed.json) exercise the loading fallback with delayed JavaScript. [GSC inspection](release/inspect-cropper-release.json) retains the cropper's release-time coverage state.

## Official-source review

Checked 8 October 2026:

- LinkedIn [Page images](https://www.linkedin.com/help/linkedin/answer/a563309/) and [personal background photos](https://www.linkedin.com/help/linkedin/answer/a568217/). Company cover and personal background are distinct presets. Post artwork recommendations are qualified by placement.
- Discord [server banners](https://support.discord.com/hc/en-us/articles/360028716472-Server-Banners), [invite backgrounds](https://support.discord.com/hc/en-us/articles/4415841146391-Server-Invite-Background), [Boost perks](https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-FAQ), [Custom Profiles](https://support.discord.com/hc/en-us/articles/4403147417623-Custom-Profiles), [Server Profile](https://support.discord.com/hc/en-us/articles/30715364399511-Server-Profile), [emoji uploads](https://support.discord.com/hc/en-us/articles/360041139231-How-to-Add-Emojis-on-Discord) and [sticker requirements](https://support.discord.com/hc/en-us/articles/4402687377815-Tips-for-Sticker-Creators-FAQ).
- Instagram's [photo-resolution help](https://help.instagram.com/1631821640426723) could not be verified in this environment. Meta's [Reels advertising guidance](https://www.facebook.com/business/ads/facebook-instagram-reels-ads) can require sign-in and is not treated as proof of organic video limits. The guides state working recommendations and direct visitors to the actual upload preview.

## Measurement still pending

Reinspect cropper after Google records a new crawl. Compare the saved GSC cohorts over 28 complete post-release days, split by device and market where sample sizes permit, and relate traffic to successful exports. The earliest complete calendar window after this release is 9 October–5 November 2026; reporting latency and recrawl timing may require waiting longer. Preserve the October 7/8 baseline in this audit and `docs/gsc-2026-10-07`.

GA4 reporting access and received events are now confirmed in the editor follow-up. Realtime includes controlled tests; use a clean observation window before reporting customer completion rates or configuring key events. No improved rankings, indexed cropper state, conversions, or field Core Web Vitals are claimed from this release's tests.
