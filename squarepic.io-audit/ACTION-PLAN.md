# SquarePic prioritized action plan

Execution update, 8 October 2026: implementation, release evidence and remaining recrawl/measurement work are recorded in [EXECUTION-REPORT.md](EXECUTION-REPORT.md). The observations below remain the original audit baseline.

8 October 2026. Audit only. Existing source fixes have not been assumed deployed. No confirmed critical sitewide indexing blocker was found. High priority actions address live tool reliability, mobile task completion and the release gap.

Dependency sequence: A1/A2/A3/A12 → reviewed release A4 → A5/A6/A7 → A8/A9/A10, with measurement A11 prepared during release. Do not wait for a 28-day SEO comparison to fix a known corrupt/mislabeled download. Effort estimates are indicative and exclude Google recrawl latency.

## A1 · High · Make advertised converter outputs valid

Observation: Live AVIF and BMP downloads contain PNG bytes and MIME despite .avif/.bmp filenames. See tool-quality.md for other decoder results.

Action: Use verified encoders or disable unsupported outputs with a clear message. Confirm MIME and extension from the actual encoded blob, then align all conversion landing-page claims.

Dependency: None; before promoting converters or linking the orphan AVIF page.

Acceptance: For each advertised format, a known input exports a matching signature/MIME/extension and decodes in two independent readers. Transparency/dimensions follow documented behavior.

Failed if: Any advertised output is mislabeled, fails decoding, or becomes a silent PNG fallback.

Leading indicator: Format regression pass rate and conversion error reports.

Estimated effort: 1-3 days, longer if new encoders are needed.

## A2 · High · Correct compressor state and target-size behavior

Observation: Changing a completed JPEG job to WebP can leave a JPEG download. Source repeats the same midpoint quality asynchronously; live copy promises exact size/lossless PNG.

Action: Invalidate results when settings change; make quality search sequential; disclose dimension changes and impossible targets. Remove lossless PNG claims unless implemented.

Dependency: None; review code and visible claims together.

Acceptance: Recompressing after a format/quality/target change produces the new requested result. Output is at/below the target or clearly reports failure, with resulting dimensions and transparency shown.

Failed if: Old bytes remain after changed settings, target is exceeded without warning, or PNG is silently represented as lossless while transcoded.

Leading indicator: Changed-setting and target-size regression results, successful download rate.

Estimated effort: 1-2 days.

## A12 · High · Export crop selections in the intended source dimensions

Observation: A 600 x 400 source exported as 560 x 560 by default and 700 x 394 in 16:9. The output uses the displayed crop rectangle size, with source-coordinate scaling handled separately.

Action: Map the selected rectangle into source-image coordinates, constrain bounds, and distinguish cropping from intentional resizing. Show resulting export dimensions before download.

Dependency: Before A4 release and before treating cropper quality as resolved in A9.

Acceptance: Known marked test images crop to the selected source region without unintended blank space, stretching or enlargement. Export dimensions match the documented mode on desktop and mobile.

Failed if: Display size still controls an undocumented output resize or selected content/bounds differ from the download.

Leading indicator: Source-region and dimension regression checks; crop-related error reports.

Estimated effort: 1-2 days.

## A3 · High · Restore narrow-screen usability and reduce page instability

Observation: 375 px tests show document overflow to 523 px on converter and 382 px on home. Mobile supplies 69.2% of search clicks; desktop lab CLS is 0.212.

Action: Fix header/control min-width and wrapping, improve title letter spacing, reserve widget space, and investigate the third-party StartupBar cost before removing or deferring it.

Dependency: Capture comparable screenshots and traces first; verify any widget change preserves intended business behavior.

Acceptance: At 320,375,390,768 px the document has no unintended horizontal overflow; upload/export/nav controls remain visible and operable. Repeated lab runs show reduced layout shift and no lost functions.

Failed if: Menus/download controls still clip or layout shifts persist after the suspected cause is changed.

Leading indicator: Viewport regression checks, CLS/LCP lab median, eventual mobile CrUX p75.

Estimated effort: 1-3 days.

## A4 · High · Publish the verified existing fixes through a controlled release

Observation: Local branch has substantial prepared SEO changes while live sitemap XML, copy and CSP still show old behavior.

Action: Review existing diffs rather than rewriting them. Revalidate the current Next.js build and release bundle, including new tool fixes, then verify production output.

Dependency: Review A1-A3 and existing local changes; pass appropriate build/browser/SEO checks before deployment.

Acceptance: Live image sitemap parses, current metadata/copy is present, relevant analytics requests succeed, new guide resolves 200 and legacy article redirects permanently to it, with no tool regression.

Failed if: Source checks pass but public URLs retain old behavior, or the release regresses exports/presets.

Leading indicator: Public smoke checks and deployment commit identification.

Estimated effort: Half to one day after release candidate is ready.

## A5 · High · Optimize the square-maker cluster around demonstrated output

Observation: Home contributes 382 clicks/21,085 impressions. 'square image' has 2,309 impressions at 9.12 with 10 clicks; 'make image square'1,003 impressions at 7.72 with 3 clicks.

Action: Keep the homepage as the working tool. Explain fit/pad versus crop clearly; show a real before/after and export dimensions. Publish the prepared worked-example guide for instructional intent and link both ways.

Dependency: A3/A4; use tested tool output for illustrations.

Acceptance: Tool keeps the whole photo in pad modes, crop loss is disclosed, one clear primary H1/title matches the task, guide/tool links and old-URL redirect work.

Failed if: After recrawl and 28 complete days the comparable non-branded query cohort fails to improve clicks/CTR and users still abandon the task; investigate competing results and completion friction.

Leading indicator: Same-query clicks/CTR by device, tool-to-download completion, guide-to-tool use.

Estimated effort: 1-2 days; much copy already prepared.

## A6 · High · Complete the calculator and qualify upscaler promises

Observation: Calculator 12 clicks/2,378 impressions; live tool mainly matches preset dimensions. Upscaler 28 clicks, with relevant PNG/non-AI query leads but unsupported GPU/bicubic/detail-recovery claims.

Action: Release the prepared ratio/megapixel/proportional-resize functions and honest smoothing/sharpening copy after verifying boundaries and downloads. Add useful examples and transparency limits.

Dependency: A4 and functional QA; do not claim an AI model or recovered detail.

Acceptance: 1200 x 800 reports 3:2,0.96 MP and 1080 x 720 at proportional 1080 width. Invalid values produce clear feedback. Upscale output dimensions match 2 x/3 x/4 x and documented alpha/format behavior.

Failed if: Calculator outputs are wrong or the upscaler still implies unsupported detail reconstruction; search uplift without successful results is insufficient.

Leading indicator: Task regression checks and relevant calculator/PNG-upscaler query clicks.

Estimated effort: Half to one day; substantial local fixes exist.

## A7 · Medium · Give platform/conversion landing pages a configured action

Observation: 13 resizer pages are guide/CTA pages. Action-oriented converter URLs likewise send users elsewhere without retaining the selected pair.

Action: Embed the working tool or pass and apply platform, preset, input/output selection into it. Make WebApplication schema agree with what is available on the URL.

Dependency: A1/A2 for conversion/compression and verified presets; avoid claiming a tool before it works.

Acceptance: A visitor arriving on LinkedIn, Instagram, Discord or PNG-to-AVIF can complete the named task without reselecting it. Browser back/forward and preset state behave correctly.

Failed if: CTA returns to a generic tool and loses the promised task, or schema still describes absent functionality.

Leading indicator: Landing-to-upload/download completion and task-state regression checks.

Estimated effort: 2-4 days across shared templates.

## A8 · Medium · Review platform guides against current official sources

Observation: Reels guide 12 clicks/1,964 impressions; queries ask whether Reels and Stories share a size. Guide tables/limits lack clear primary-source links and original visual evidence.

Action: Answer the shared 9:16-canvas question first, distinguish image artwork from video requirements, date verified official references, and add original crop/safe-zone examples. Prioritize Reels, LinkedIn and Instagram, then Discord.

Dependency: A4/A7; verify fast-changing requirements before stating them as facts.

Acceptance: Every material platform limit has a dated official citation or is qualified as a recommendation; examples match actual presets and display-crop behavior.

Failed if: Official references contradict page statements or equivalent query clicks and guide-to-tool use stagnate after a sufficiently sized comparison.

Leading indicator: Specification review checklist, guide query cohorts, relevant tool referrals.

Estimated effort: 1-2 days per priority cluster.

## A9 · Medium · Investigate cropper indexing and repair contextual links

Observation: Google reports cropper discovered-currently not indexed, while 9 other sampled existing pages are indexed. WebP-to-AVIF is sitemap-only in the raw anchor graph.

Action: Improve cropper task quality and contextual placement, then inspect after recrawl. Link the orphan conversion page only after AVIF works. Do not create duplicate keyword URLs or submit ordinary tools to Google's restricted Indexing API.

Dependency: A1/A3 and improved relevant tool content.

Acceptance: Target pages are reachable in relevant HTML anchors, return 200/self-canonical/no-noindex, and URL Inspection is rechecked after Google crawls them.

Failed if: Pages remain uncrawled/excluded after meaningful quality/link changes; investigate exact coverage signals rather than assuming a sitemap guarantees inclusion.

Leading indicator: Last-crawl timestamp, coverage state and useful query impressions.

Estimated effort: Half to one day plus crawl latency.

## A10 · Medium · Align authorship, privacy claims and social previews

Observation: SevenOneLabs is typed both Person and Organization; llms says no tracking despite analytics;35/49 pages lack OG images.

Action: Use truthful author/reviewer identities and consistent schema IDs; distinguish local image processing from analytics; reuse validated share assets on missing templates. Optional llms Markdown cleanup comes afterwards.

Dependency: Verify actual network/consent behavior; coordinate shared metadata/entity templates.

Acceptance: Author types agree across profile/guides, privacy statements match measured behavior, and intended pages emit a valid relevant share image with alt text.

Failed if: Identity/claim contradictions remain or share scrapers cannot retrieve the declared image.

Leading indicator: Entity/claim checks, share-preview coverage and support reports.

Estimated effort: 1 day; several local fixes already prepared.

## A11 · Medium · Measure successful tool use alongside search traffic

Observation: GSC is connected but GA4 property/conversion data are unavailable. Source event tracking covers the shared square editor and does not establish completion events for every standalone tool; live CSP blocks some analytics requests.

Action: Repair/verify collection, then record upload accepted, processing success/error and download for each tool with consistent event labels and applicable consent behavior. Keep page/query/device baselines and record deployment dates.

Dependency: A1-A4; verified analytics access required to report actual conversions.

Acceptance: Each test workflow produces one correctly labeled completion or error event; no private image content/file names are sent. Compare 28 complete post-release days after recrawl with this baseline.

Failed if: Events duplicate, disappear or count a mislabeled/corrupt file as success, or changes cannot be tied to a recorded deployment.

Leading indicator: Event QA, successful-download rate and GSC same-cohort clicks.

Estimated effort: 1-2 days plus measurement window.

## Low-priority maintenance

Clean the duplicated author-title suffix, direct redirecting links to their actual configured destination, optionally simplify obsolete HowTo markup, and improve optional llms Markdown formatting. Preserve helpful FAQs. Missing WebMCP/agent catalogs, FAQ rich-result markup, arbitrary word counts and wholesale image-format replacement are not growth priorities.

## Measurement window

Capture deployment/commit, verify public output, then inspect after recrawl. Compare the same query groups across 28 complete post-release days and the saved baseline, split by device and important market when samples allow. Track successful tool exports, not just visits. If clicks rise while success falls, the release has not achieved the intended result.
