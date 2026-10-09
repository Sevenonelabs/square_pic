# SquarePic untargeted-query content opportunities

Collected October 9, 2026, Asia/Calcutta. Search Console property `sc-domain:squarepic.io`. Authenticated Tier 1 access.

## Evidence and limits

Current finalized web-search window: September 9 to October 6, 2026. Supporting 90-day window: July 9 to October 6. The API returned 1,108 current queries and 2,134 supporting queries, both below the 25,000-row cap. The filter is clicks >= 0 and impressions > 0. Of the current queries, 1,036 have zero clicks. Dimensionless property totals are 450 clicks and 28,279 impressions.

The full filtered export is `queries-with-impressions.csv`. Raw API responses are in `data/`. Query-only responses supply opportunity metrics. Page/query responses identify landing URLs; they are not summed to replace property or query metrics. Google omits anonymized queries and reports top rows, so this is not an exhaustive list of all searches. See [Google performance report guidance](https://support.google.com/webmasters/answer/7576553?hl=en).

Untargeted means absent as an explicit primary target in the October 8 keyword map and lacking a dedicated guide for the selected intent. The saved `target-map-before.json` records that map. It does not establish that these phrases have never appeared in older content or campaigns. Existing tools already mention some supporting concepts.

## Selected opportunities

Prioritize the square-size guide. Its direct image-related queries have 266 impressions and one click. The enlargement guide is an experiment with 26 direct-match impressions and zero clicks. Intent labels are editorial judgments based on wording and product fit, not measured search-engine classifications.

| Priority | Cluster | Direct-match impressions | Ambiguous impressions | All selected impressions | New guide |
| --- | --- | ---: | ---: | ---: | --- |
| 1 | Square dimensions and size selection | 266 | 313 | 579 | `/guides/square-image-size` |
| 2, exploratory | Photo enlargement and print preparation | 26 | 30 | 56 | `/guides/how-to-enlarge-a-photo` |

Keep ambiguous queries separate when assessing results. `square size` can refer to other sizing tasks; `where to enlarge photos` and `where can i enlarge a photo` can mean a physical print service. The latter two are answered as a distinction between digital preparation and ordering a print, without advertising a local service. These queries remain in the broad cluster for discovery, but do not establish direct product demand.

Cluster counts sum distinct query rows. They are impressions, not unique people or market search volume. The CSV and selected-opportunity JSON now include intent-confidence labels; other queries are marked not-reviewed.

### square-size

| Query | Clicks | Impressions | Average position | 90-day impressions | Intent assessment |
| --- | ---: | ---: | ---: | ---: | --- |
| square size | 0 | 313 | 8.04 | 509 | ambiguous |
| square image size | 0 | 174 | 8.75 | 465 | direct-match |
| square photo size | 1 | 31 | 8.52 | 96 | direct-match |
| square picture size | 0 | 22 | 7.23 | 45 | direct-match |
| square size photo | 0 | 18 | 9.22 | 85 | direct-match |
| square pixel size | 0 | 9 | 10.33 | 13 | direct-match |
| square aspect ratio | 0 | 5 | 23.40 | 15 | direct-match |
| square ratio size | 0 | 4 | 10.25 | 6 | direct-match |
| square size in pixels | 0 | 3 | 59.67 | 3 | direct-match |

### photo-enlargement

| Query | Clicks | Impressions | Average position | 90-day impressions | Intent assessment |
| --- | ---: | ---: | ---: | ---: | --- |
| where to enlarge photos | 0 | 17 | 21.82 | 17 | ambiguous |
| where can i enlarge a photo | 0 | 13 | 22.31 | 13 | ambiguous |
| enlarge image without losing quality | 0 | 5 | 15.60 | 5 | direct-match |
| how to enlarge a photo | 0 | 4 | 11.25 | 4 | direct-match |
| how to enlarge an image | 0 | 4 | 3.75 | 4 | direct-match |
| how to enlarge image | 0 | 4 | 4.00 | 4 | direct-match |
| upscale image for printing | 0 | 4 | 8.00 | 4 | direct-match |
| how do i enlarge a photo | 0 | 2 | 4.50 | 2 | direct-match |
| how do you enlarge a photo | 0 | 1 | 5.00 | 1 | direct-match |
| how to enlarge an image without losing quality | 0 | 1 | 28.00 | 1 | direct-match |
| how to enlarge image without losing quality | 0 | 1 | 11.00 | 1 | direct-match |

## Research and content decisions

Research was checked October 9 using live web search and first-party documentation. Results vary by location, personalization and time; this was qualitative intent research, not a location-controlled Google top-ten ranking report. No keyword difficulty, search volume or guaranteed ranking estimate is available.

- Square-size searches returned dedicated dimension guides and square-making tools. [Square Image's dimension guide](https://square-image.org/guides/square-image-sizes) illustrates the guide format. SquarePic's new article adds a source-dimension decision rule, a calculated crop-versus-padding example, and print-size math. Platform-specific requirements stay in the existing platform guides, avoiding a second set of unsupported specifications.
- Enlargement searches mixed tools and tutorials. [Adobe's resampling documentation](https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/resize-adjust-resolution/image-size-resolution-and-resampling.html) distinguishes pixel counts from resolution. The new article focuses on deciding whether enlargement is needed, comparing shape with a target print, checking artifacts, and understanding the actual browser export limits.
- [Adobe's print-dimension instructions](https://helpx.adobe.com/photoshop/desktop/crop-resize-transform/resize-adjust-resolution/change-print-dimensions-and-resolution.html) support 300 PPI as a common reference, with the print provider's specification taking priority. All size tables and multiplier examples are calculated from stated inputs.
- [MDN's smoothing documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled) supports the pixel-art limitation. SquarePic enables smoothing, so the 14-impression query `pixel art upscaler` is a poor capability match. No pixel-art landing page was created.

## Topics kept on existing pages

| Query or group | Current evidence | Decision |
| --- | --- | --- |
| `1200x627 aspect ratio` | 25 impressions, 0 clicks | Existing LinkedIn guide and resizer already explain this ratio. Keep one destination. |
| `discord server banner size` | 26 impressions, 0 clicks | Already a primary target of the Discord guide. |
| `are reels and stories the same size` | 15 impressions, 0 clicks | Already answered in the Reels and Stories guide. |
| `png upscaler` | 42 impressions, 0 clicks | Existing primary target of the upscaler. |
| Brand misspellings and square-maker synonyms | Existing homepage intent | Do not create near-duplicate pages for each spelling. |
| Unsupported GIF/AVIF output and pixel-art intent | Capability mismatch | Do not promise unsupported output or scaling behavior. |

## Implementation

Two guides with interactive calculation tools are registered in the guide index, global RSS feed and photo-editing category feed through their respective registries. Both have canonical URLs, article/social metadata, Article and Breadcrumb structured data, author links, accessible tables and dated publication details. The main sitemap includes both routes. The homepage and square-framing guide link to the square-size planner. The calculator and upscaler link to the enlargement guide. Both articles also appear in the image sitemap. The new guides link to each other and relevant tools.

The square-size planner computes fitted dimensions, padding per edge, the retained crop and enlargement factors. The print planner computes pixel targets, source PPI after filling a print, crop needs and the smallest available enlargement within the full-source output limits. It identifies inputs that need no enlargement or cannot use a supported factor. Both accept manual dimensions and require no photo upload.

The enlargement article reuses the existing downloadable original, 2x and 4x examples. It does not claim a new experiment or measured quality gain. Product behavior was checked against the editor renderer, upscaler implementation and controls.

## Release and measurement

Content is implemented in the local checkout. It has not been deployed, submitted for indexing or observed ranking. Existing unrelated working-tree changes remain in place.

After deployment, verify both production URLs return 200 with their intended canonicals and appear in the sitemap and feeds. Inspect the two URLs in Search Console. Compare the same saved query clusters over complete 28-day windows. Evaluate direct matches and ambiguous queries separately. Track both the new guide and the existing tool URL so a traffic shift is not mistaken for growth. Compare query-level property counts across all URLs first, then use page/query rows to explain movement between pages. Use the deployment date to establish the post-release window. Review at roughly four and eight weeks after release, allowing for indexing delay. No scheduled automation was created.

If the guide and tool compete for the same query, inspect which intent Google is serving before revising links or consolidating. A new article may attract different searches without improving an existing average position. Ranking improvement remains unmeasured.

## Validation from initial content pass

- Production build and TypeScript passed. Both new guide routes are statically rendered.
- Targeted ESLint passed for the changed content, registry, sitemap and link files.
- SEO validator passed for all 52 sitemap pages, two XML sitemaps, 14 preview images and 35 llms links. Results are saved in `seo-validation.json`.
- Both article schemas, single H1s, table-of-contents anchors, guide-category listings and both RSS feeds passed rendered-content checks. See `content-verification.json`.
- Both articles were opened in the local production build. A desktop preview is saved as `square-size-preview.jpg`.
- Search Console was left open on the matching 28-day window, with impressions greater than zero and no click restriction, sorted by impressions. The evidence is saved as `search-console.jpg`. The UI shows up to 1,000 query rows; the API export contains 1,108.

## Improvements and verification

The guides now answer reader-specific questions through embedded calculators. This adds original utility in line with [Google's helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). It is not evidence of a ranking increase. Metadata and index summaries now describe the calculators. Each article has an early jump link, calculation-method details and relevant reader questions.

Validation for this revision is recorded in `planner-math-verification.json`, `planner-browser-verification.json` and `seo-validation-improved.json`. Production build, TypeScript, targeted ESLint and the full 52-page SEO validation passed. Ten calculation fixtures passed, covering portrait and landscape geometry, ratio mismatch, fractional print dimensions, invalid values, the square-export cap, and upscaler pixel and edge limits. Six browser checks passed for live updates and validation branches. The earlier screenshots and validation files describe the initial content pass.

Current calculator previews are saved as `square-planner-improved.jpg` and `print-planner-improved.jpg`. The articles remain local and have not been deployed or observed ranking.

Default calculator results are present in server-rendered HTML. Both pages retain one H1 and valid in-page anchors; results are saved in `planner-rendered-verification.json`. The browser error log was empty during the planner checks.
