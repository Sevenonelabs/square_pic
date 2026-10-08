# SquarePic full-site SEO and tool-quality audit

8 October 2026, Asia/Calcutta. Live site [squarepic.io](https://squarepic.io/) redirects to the production origin [www.squarepic.io](https://www.squarepic.io/).

Provisional SEO health score: **70/100**. This is a weighted editorial assessment of the observed site, not a Google score, a ranking forecast, a compliance certification or a field Core Web Vitals result. Tool failures affect content quality because the tool is the main content of a utility page. The expanded scope and fresh tests make this unsuitable as a before/after comparison with earlier audit scores.

The immediate opportunity is to improve the pages already earning traffic while making their tools dependable. The homepage dominates search clicks. Adding more keyword pages before fixing downloads, mobile layout and task continuity would expose more people to incomplete promises.

## Scope and evidence

All 49 main-sitemap canonical pages were fetched, plus one redirect alias. Robots rules were respected, the crawl queue was exhausted below the 500-page cap, and the main/image sitemaps, internal anchor graph, metadata, headings, JSON-LD and sample assets were inspected. Nine guides and shared platform/conversion templates were reviewed. Desktop/mobile browser screenshots and representative real upload-to-download workflows supplement the raw crawl.

Search Console was accessed successfully through existing read-only credentials for `sc-domain:squarepic.io`. Fresh page/query/device/country/date data and 11 stored URL inspections are saved. Current dates are 8 September to 5 October; previous dates 11 August to 7 September; support window 8 July to 5 October 2026. These are Pacific reporting dates, with 28 complete days in both comparison windows.

Application code, production configuration and existing local edits were not changed. The earlier `docs/seo-audit` and `docs/gsc-2026-10-07` reports were treated as history, not proof of current production behavior. New files are confined to this audit directory.

## Search performance and priorities

| Metric | Previous 28 days | Current 28 days | Change |
| --- | ---: | ---: | ---: |
| Clicks |309|461|+49.2%|
| Impressions |21,843|28,926|+32.4%|
| CTR |1.41%|1.59%|+0.18 percentage points|
| Average position |24.00|8.97|15.04 positions lower numerically|

This improvement predates this audit and is not attributed to local edits, a Google update or a particular optimization. Average position changes with query mix. Site totals use separate dimensionless requests; page/query rows are not interchangeable with property totals. [Google explains these API aggregation and data limits](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).

| Priority page | Clicks | Impressions | CTR | Avg position | First improvement |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` |382|21,085|1.81%|7.51|Clarify pad versus crop; demonstrate output and preserve mobile usability.|
| `/upscaler` |28|1,105|2.53%|23.09|Deliver honest non-AI enlargement and verified PNG/alpha behavior.|
| `/guides/instagram-reels-stories-guide` |12|1,964|0.61%|8.34|Answer shared-size intent immediately; verify platform claims.|
| `/image-size-calculator` |12|2,378|0.50%|14.47|Calculate ratio, megapixels and proportional dimensions.|
| `/resize/linkedin` |6|454|1.32%|10.24|Explain 1200 x 627 and retain the chosen preset in the tool.|
| `/resize/instagram` |5|465|1.08%|9.25|Offer configured sizing and explain display cropping.|

Home's 382 clicks combine 363 www and 19 apex clicks by path, about 83% of property clicks. Historical apex performance does not establish a current canonical failure. Mobile supplies 319 clicks, 69.2%, making phone usability a business priority. Upscaler's 28 clicks are recent emergence; it had no impressions in the previous window. LinkedIn/Instagram and secondary platform topics have small samples.

The most actionable homepage query leads are `square image`, 2,309 impressions/10 clicks/position 9.12, and `make image square`, 1,003/3/7.72. Calculator's exact `image size calculator` query has 138 impressions/2 clicks/9.09. Upscaler's `png upscaler` has 42 impressions/0 clicks/3.74. These observations guide relevance work; they do not justify a forecast or a generic CTR target. `square pic` is ambiguous between brand and generic intent.

See [full Google findings](findings/google.md), [page performance CSV](page-performance.csv), [query opportunities CSV](query-opportunities.csv), and [keyword/intent plan](KEYWORD-INTENT-PLAN.md).

## Findings that change the order of work

No critical sitewide crawl blocker was demonstrated. All 49 canonical pages return 200, expose text/headings in HTML, self-canonicalize and lack noindex. The main sitemap is valid, with 49 submitted URLs and zero reported GSC errors. The largest risks are product reliability, intent mismatch and mobile experience.

### High priority

1. **Converter output does not always match the selected format.** Live AVIF and BMP jobs download PNG bytes with changed extensions. The TIFF test file fails two independent decoders. GIF interoperability also needs review, though Chromium accepts that export. A browser can silently fall back to PNG for unsupported Canvas output types; the product must detect that result or use an encoder. [MDN documents the fallback](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob).
2. **Compressor settings can leave stale output.** A completed JPEG job can still download JPEG after selecting WebP and recompressing. Its target-size search also fires identical midpoint qualities before asynchronous results update the bounds. Exact-size and lossless-PNG claims exceed demonstrated behavior. Test targets, formats, dimensions and transparency together.
3. **Narrow-screen layout and readability need repair.** At 375 px, the converter document overflows to 523 px and navigation clips. Home overflows to 382 px. Homepage H1 letter spacing is -2 px at a 17.6 px font size, visibly compressing the heading. Third-party promotions occupy the top bar. Reserve space and measure their performance effect before making a widget decision.
4. **Prepared fixes have not reached the public site.** The live image sitemap contains an unescaped ampersand at line 104 and fails XML parsing, while the main sitemap remains valid. Live upscaler/calculator/guide copy and CSP still show older behavior. Several repairs are already in local diffs. Review/revalidate those changes and release them rather than writing a second version. [Google's image-sitemap specification](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps) lists the supported tags.
5. **Some product claims are inaccurate or unsupported.** Live upscaler copy promises specific bicubic/GPU/detail-recovery behavior not established by its Canvas smoothing/sharpening implementation. Crop mode cannot preserve the whole image as padding does. Platform tables mix square and non-square destinations and make broad no-crop promises. Correct copy and visible FAQs to match actual tools.
6. **Crop downloads use display dimensions.** A 600 x 400 test image exports as 560 x 560 in the default mode and 700 x 394 in 16:9. The implementation derives output size from the display rectangle rather than the intended source region. Map coordinates and constrain bounds before promising full-resolution cropping. The same default size occurred on mobile, so this sample does not establish device-dependent output.

### Medium priority

- Platform resizer and conversion detail pages often act as instructions/CTAs rather than configured tools. Users must navigate elsewhere and reselect their task. Align title, first-screen action, tool state and schema.
- Google reports `/cropper` as discovered, currently not indexed. Nine other sampled existing URLs are indexed with intended www canonicals. The pending new square guide is unknown to Google. This sample is not a 49-page index count or evidence of a penalty.
- `/converter/webp-to-avif` is sitemap-only in the observed raw-anchor graph. Link it contextually after AVIF export works. 48 of 49 sitemap pages are reachable within two anchor clicks.
- All nine live guides lack original HTML image examples and clear linked official specification references. Add practical before/after/crop diagrams and dated primary citations on priority topics rather than expanding generic prose.
- SevenOneLabs is described as a team/lab but typed both Person and Organization. Choose truthful authorship and a consistent entity ID. 13 informational resizer pages use WebApplication despite no embedded tool on those URLs.
- 35 of 49 pages lack `og:image`. The 14 existing share PNGs are 1200 x 630 and under 51 KB; the logo is valid. Reuse relevant assets. This improves sharing consistency, not a guaranteed ranking signal.
- `llms.txt` says no tracking while the site loads analytics. Local image processing and anonymous/event analytics are different statements. Verify actual network behavior and align wording. Some analytics requests are blocked by live CSP, limiting measurement.

### Low priority and informational findings

31 HowTo blocks are obsolete for Google's rich results. Cleanup is optional during template work, with visible instructions preserved. 23 FAQPage blocks do not create a Google FAQ rich-result opportunity; Google retired that feature on 7 May 2026. Existing FAQ markup is not a critical defect and should not be removed merely to improve a checklist. [Google's changelog records the retirement](https://developers.google.com/search/updates).

No AggregateRating/Review markup was found. Do not invent reviews to make software-app validators pass. The existing entities can describe software without qualifying for a particular rich result. Long titles/descriptions warrant editing for relevance and clarity, but 60/160 characters are audit heuristics, not fixed Google limits or indexing requirements. The author page repeats the brand suffix once unnecessarily.

`llms.txt` lacks Markdown links. Optional formatting repair can help supporting tools, but it is not a Google ranking requirement. No measured AI citation lift, WebMCP conformance score or Lighthouse Agentic fraction is claimed. Google says [ordinary SEO applies to AI features](https://developers.google.com/search/docs/appearance/ai-features).

## Performance evidence

Lighthouse 13.5.0, one fresh live homepage lab run per device. Results vary with server/network/browser/widget conditions; these are not a controlled regression against the old report.

| Profile | Performance | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: |
| Mobile |64/100|3.96 s|529 ms|0.039|
| Desktop |84/100|0.62 s|173 ms|0.212|

Mobile LCP and desktop CLS need improvement against the usual thresholds. TBT is a laboratory blocking metric, not field INP. Both runs scored 83 accessibility, 73 best practices and 100 automated SEO; those narrow automated checks do not cover tool correctness or search-intent quality. The desktop CLI reported a Windows cleanup error after writing its complete report; the JSON measurement is preserved.

PSI returned quota 429 and no CrUX API key was available. Field LCP/INP/CLS and a sitewide CWV pass/fail remain unknown. Repeat comparable lab runs after targeted performance changes and validate real-user data when available. [Web Vitals guidance](https://web.dev/articles/vitals) distinguishes field and lab measurement.

## Score and confidence

The seven category scores below are editorial judgments. A lower score prioritizes the observed weaknesses; it does not identify an algorithmic penalty. Performance is provisional because field data are missing. No separate tool-quality score is mixed into the weights; it contributes to content-quality assessment.

| Category | Weight | Score | Basis |
| --- | ---: | ---: | --- |
| Technical SEO |22%|88/100|All 49 canonical pages accessible, self-canonical and allowed; malformed image sitemap and one orphan remain.|
| Content Quality |23%|53/100|Useful tools and guidance, undermined by demonstrated format defects and unsupported product/platform claims.|
| On-Page SEO |20%|65/100|Distinct titles, H1s and readable server HTML; action-oriented landing pages add an unconfigured extra step and important intent answers are missing.|
| Schema / Structured Data |10%|70/100|Parseable JSON-LD and breadcrumbs; page-function and author-entity mismatches remain.|
| Performance (lab only) |10%|64/100|Mobile Lighthouse 64, LCP 3.96 s/TBT 529 ms; desktop CLS 0.212. Field CWV/INP unavailable, so this category is provisional.|
| AI Search Readiness |10%|80/100|Readable HTML and crawler access; source accuracy, attribution and optional llms formatting need work. Visibility unmeasured.|
| Images |5%|78/100|All 15 sampled assets valid and small; invalid image sitemap and absent original explanatory visuals.|

Confidence is high for fetched HTTP/XML/metadata, saved GSC responses and reproduced Chromium downloads. It is moderate for search-intent hypotheses and implementation-wide conclusions from representative tests. Field performance, conversion impact, full cross-browser support, backlink quality and AI citation visibility were not measured. Common Crawl's January-March 2026 graph did not contain the domain; that does not establish zero backlinks.

## Release sequence and what success means

Fix and verify the actual tools and mobile paths, then review/release the prepared source changes. Improve the homepage and calculator/upscaler next, followed by configured platform flows and sourced guides. Expand content only when recurring demand and a functioning tool support it. Google's [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) includes functional tools as main content and rejects a preferred word count.

The [action plan](ACTION-PLAN.md) gives each action its observation, dependency, acceptance test, failure condition and leading indicator. The first five practical wins are image-sitemap repair, honest upscaler copy, the prepared calculator functions, reused share previews and clearer homepage framing. Most are already partly prepared; all need public verification after deployment.

Do not attribute this snapshot's traffic growth to unshipped changes. Record the deployment date and compare the same page/query cohorts after recrawl and 28 complete post-release days. Track successful downloads as well as clicks. The next audit should verify real file formats, changed compressor settings, mobile overflow, live XML/copy/CSP, cropper indexing, and whether the priority query groups produce more successful tool use.

## Evidence index

- [Action plan](ACTION-PLAN.md) and [keyword/intent plan](KEYWORD-INTENT-PLAN.md)
- [Technical](findings/technical.md), [sitemap](findings/sitemap.md), [schema](findings/schema.md), [images](findings/images.md)
- [Content quality](findings/content.md), [search intent](findings/search-intent.md), [Google data](findings/google.md)
- [Tool quality](findings/tool-quality.md), [performance](findings/performance.md), [visual/mobile](findings/visual.md), [AI/agent readiness](findings/geo-agentic.md)
- [Structured audit envelope](audit-data.json), [crawl](data/crawl.json), [GSC manifest](data/gsc/manifest.json), [screenshots](screenshots/)

A formatted PDF can be generated from `audit-data.json` with `/seo google report full`. This audit has not deployed changes or submitted indexing requests.
