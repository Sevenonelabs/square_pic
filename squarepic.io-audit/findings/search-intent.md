# Search intent and search experience audit

Audit date: 2026-10-08. Live target: https://www.squarepic.io. No application changes made. This assessment uses the fresh live crawl, a rendered Instagram page, current GSC exports and representative web-search results.

## Main finding

The homepage and four main image-tool pages match task-completion intent. Platform resizer and format-pair pages promise a task in their titles but serve explanatory copy with generic links to another page. The calculator's live behavior also falls short of the broader calculation intent visible in competitor tools. These are **high-priority task/interaction mismatches**. More prose would not fix them.

The classification follows the skill's taxonomy. A page with a functional tool is Tool/Interactive; an explanatory page with a tool CTA but no local tool is Hybrid. A guide is Blog/Guide. These labels do not imply a Google ranking category.

## Fresh GSC priorities

Period: September 8 to October 5, 2026. Comparison: August 11 to September 7, 2026. Page rows include anonymized-query traffic; query rows do not. Positions and CTR are aggregated across countries, devices and queries, so they are not controlled rank or snippet tests.

| Page | Current clicks / impressions | Previous clicks | Live task alignment | Recommended priority |
|---|---:|---:|---|---|
| `/` | 363 /20,622 |293 | Tool/Interactive, square-image task aligned | Protect this page, improve clear no-crop wording, outcomes and core usability. |
| `/upscaler` |28 /1,105 | No previous page row | Tool/Interactive aligned with enlargement, trust gap | Correct non-AI claims and show tested output. |
| `/guides/instagram-reels-stories-guide` |12 /1,964 |6 | Informational guide aligned, unsupported/currentness gap | Source and verify dimensions/limits; add original safe-area examples. |
| `/image-size-calculator` |12 /2,378 |4 | Live preset-finder is only partial calculator match | Verify/deploy current local ratio and proportional-size calculations. |
| `/resize/linkedin` |6 /454 |0 | Hybrid with generic editor link | Answer exact dimension question and preserve selected LinkedIn preset. |
| `/resize/instagram` |5 /465 |0 | Hybrid, title promises square-image tool | Put square/fit workflow first and preserve the Instagram selection. |
| `/resize/twitch` |4 /202 |1 | Hybrid with repeated generic advice | Distinguish profile, banner, panel and offline assets; configure the action. |
| `/guides/social-media-image-sizes-2026` |0 /716 | See GSC parent analysis | Guide aligned, table credibility/CTR opportunity | Correct source-backed reference table and link each placement to its exact action. |
| `/guides/discord-image-sizes-2026` |1 /283 | No previous page row | Guide aligned, factual trust gap | Correct and source banner/splash/sticker requirements before expanding coverage. |

The table shows the www URL row. Across both hosts, homepage performance is **382 clicks and 21,085 impressions**, versus 296 clicks in the previous period. The non-www row contributes 19 clicks/463 impressions. Report this combined total explicitly and review canonical attribution in the technical/GSC analysis; it is not a second landing-page strategy. A missing previous row is not proof of zero historical activity or infinite growth. One-impression conversion-page clicks are too sparse to justify a growth strategy.

## Page and keyword mapping

These are recommendations, not deployed metadata changes. Query figures come from `../data/gsc/page-query-current.json`.

| Page | Observed query evidence | Desired primary job | Suggested title / H1 | Live/local status |
|---|---|---|---|---|
| `/` | square image:10 clicks/2,302 impressions; make image square:3/998; square image maker:4/309 | Make an existing photo square, with a clear fit-or-crop choice | Title: Make an Image Square Online Free \| SquarePic. H1: Make an image square without cropping. Add an immediately visible Crop alternative without contradicting the fit promise. | Local homepage rewrite exists. Preserve existing URL and the functioning editor; verify real output and live text after deployment. |
| `/upscaler` | upscale image -ai:4/33; image upscaler -ai:2/50; png upscaler:0/42 at average position3.74 | Enlarge PNG/JPG locally without invented AI details | Title: Free Image Upscaler: Enlarge PNG & JPG \| SquarePic. H1: Free image upscaler, without AI. | Accurate local page/component changes already present; live still uses HD/bicubic/recovery copy. |
| `/image-size-calculator` | image size calculator:2/138 | Calculate ratio, megapixels and proportional dimensions for arbitrary valid inputs | Title: Image Size & Aspect Ratio Calculator \| SquarePic. H1: Image size and aspect ratio calculator. | Local calculation implementation exists; live page is still preset-matching focused. |
| `/resize/linkedin` |1200x627 aspect ratio:0/26 at average 9.38 | Understand1200x627 and create the correct LinkedIn image | Title: LinkedIn Image Resizer &1200×627 Sizes \| SquarePic. H1: Resize an image for LinkedIn. Explain1200:627 =400:209 ≈1.914:1 and personal vs company covers. | Local answer section/citations already exist; CTA still needs actual preset handoff. |
| `/resize/instagram` | Page5 clicks, visible query rows sparse | Create a square/portrait/story image and preview intentional crop vs fit | Title: Instagram Image Resizer: Square, Portrait & Story \| SquarePic. H1: Resize images for Instagram. | Local specificity improved; live H1 remains Image Sizes: Complete Dimensions Guide, no upload input. |
| Reels/Stories guide | instagram stories dimensions safe zone:0/20, average34; page traffic exceeds visible query traffic | Find dimensions and understand placement-safe artwork | Title: Instagram Reels & Stories Sizes and Safe Zones \| SquarePic. Keep2026 only if facts are actually verified. | Local guide edits exist but must be source checked. Avoid targeting video export if the product handles only still artwork. |
| Discord guide | discord server banner size:0/26 at average6.81 | Find server-banner requirements and resolve missing invite-background/crop problems | Title: Discord Banner, Invite Background & Image Sizes \| SquarePic. H1 should clearly distinguish server banner and invite background. | Local Discord corrections already exist; live remains inconsistent. |
| `/converter/png-to-jpg` and other pair pages | Too little current traffic for firm query prioritization | Convert the specified input to the specified output | Pair-specific title/H1 may stay, but embed configured conversion or set output using an explicit parameter/state handoff. | Live links drop visitors at generic `/converter`; source has no preconfigured pair workflow. |

Do not add every synonym to one title or target every query with a new URL. Branded `squarepic` is 77 clicks/203 impressions; ambiguous `square pic` is 76/2,211. Report those separately from nonbrand image tasks. Foreign phrases and generic 1-impression query strings are not a content brief.

Suggested opening paragraphs for the highest-value pages, subject to the verified behavior being shipped:

- Homepage: "Fit a portrait or landscape photo into a square with a blurred or solid background. Keep the whole photo, or choose Crop to trim the edges and fill the frame. Edit and download in your browser without an account."
- Upscaler: "Enlarge a PNG, JPG or WebP image 2x, 3x or 4x using browser smoothing and optional sharpening. This tool does not use AI or restore detail missing from the original. Choose PNG to retain transparency."
- Calculator: "Enter width and height to calculate aspect ratio and megapixels. Set a new width to find the proportional height, then choose a matching image-editing preset. This calculates dimensions; it does not estimate a compressed file's size."
- LinkedIn resizer: "Prepare an image for a LinkedIn post, profile or company Page. Choose the placement before resizing: the 1200×627 post preset, 400×400 profile preset and 1128×191 company-cover preset serve different layouts. Preview the result in LinkedIn before publishing."
- Reels/Stories guide: "Use 1080×1920 artwork as a starting point for a vertical Story or Reel cover. Check the actual placement preview before positioning text: controls and crop previews vary. SquarePic prepares still artwork; video duration and export settings belong to your video workflow."

These paragraphs clarify scope and intent. The conversion page must first pass real encoding tests: current Chromium AVIF/BMP downloads are PNG files, despite their extensions. No title or paragraph rewrite can close that tool defect.

## Representative search-result evidence

Queries explored included make image square without cropping online free, png to avif converter online free, discord image resizer server banner emoji, image upscaler online free, image upscaler non AI online free, image size calculator aspect ratio, and Instagram resizing. This was a representative search-engine sample, **not a location/device-controlled Google top 10 export**. No claim is made about result positions, numeric Google page-type consensus, ad counts, PAA, AI Overviews or search volume. Those were not observed reliably.

| First-party result examined | Type | Observed mechanism relevant to SquarePic |
|---|---|---|
| [SquareImage.dev](https://squareimage.dev/) | Tool/Interactive | Explicit crop, fit and output-size distinctions; browser processing. |
| [Fair Toolbox square-image tool](https://fairtoolbox.com/square-image/) | Tool/Interactive | Input, shape, background, output and download controls are directly accessible. |
| [ImageToolsFree no-crop tool](https://imagetoolsfree.com/square-image.html) | Tool/Interactive | A sample image lets a visitor try the actual workflow; fit options are visible. |
| [Adobe Instagram resizer](https://www.adobe.com/express/feature/image/resize/instagram) | Tool/Interactive | Upload action starts the task; selection and export are described. Competitor copy is not accepted as the authority for Instagram rules. |
| [CloudConvert PNG→AVIF](https://cloudconvert.com/png-to-avif) | Tool/Interactive | Pair-specific upload/action and output options, rather than only a generic converter link. |
| [Convertio PNG→AVIF](https://convertio.co/png-avif/) | Tool/Interactive | Input/output choice and conversion workflow are on the destination page. |
| [On Air Kit Discord resizer](https://www.onairkit.com/discord-emoji-resizer) | Tool/Interactive | Separate emoji/avatar/server-icon/banner choices and visible crop/fit action. |
| [SuperToolsOnline non-AI upscaler](https://www.supertoolsonline.com/tool/image-upscaler/) | Tool/Interactive | Explicit classic resampling identity and non-AI limitations. Its own quality claims were not independently validated. |
| [Bushe image-size calculator](https://bushe.co/tools/image-size-calculator/) | Tool/Interactive | Arbitrary source dimensions and proportional new dimensions; explicitly explains calculation vs image-file processing. |
| [PrintSizeKit calculator](https://printsizekit.com/image-size-calculator) | Tool/Interactive | Ratio, megapixels and print-density results with explicit units. This shows a different adjacent calculation intent, not a requirement to add every feature. |

The inference from this sample is strong for direct tool availability on task queries. It does not prove that a static explanation page can never rank. Actual task success and suitable page selection matter more than matching competitors' word counts or unverified claims.

## User stories derived from observed mechanisms

1. As someone preparing a full portrait for a profile, I want to fit every edge into a square and preview the result before download. I need to know whether the chosen mode trims content. Evidence: Fair Toolbox and ImageToolsFree expose fit/background controls; SquarePic's home queries include no-crop and square-photo variations. Journey: decision/action.
2. As a user avoiding generative changes, I want a non-AI PNG upscaler with a truthful comparison and intact transparency. Evidence: GSC has six clicks across the two `-ai` queries; the non-AI competitor labels classic resampling explicitly. Journey: consideration/action.
3. As a designer with arbitrary dimensions, I want the correct ratio and new height without guessing a platform preset. Evidence: Bushe and PrintSizeKit calculate from arbitrary dimensions; GSC has 138 image-size-calculator impressions. Journey: action.
4. As a Discord moderator, I want to know which banner or invite background my server can use and export the correct asset. Evidence: the Discord competitor separates assets and first-party Discord documentation distinguishes requirements; GSC shows 26 server-banner-size impressions. Journey: awareness/action.
5. As a web publisher converting PNG to AVIF, I want an actual AVIF file with known alpha behavior and encoding support. Evidence: CloudConvert and Convertio expose pair-specific workflows, while SquarePic's pair pages reset to the generic converter. Journey: action.

## Persona review

Scores below are internal and provisional. They assess observed content and workflow affordances, not measured session recordings or Google ranking inputs. Each column is out of25.

| Persona / current page | Relevance | Clarity | Trust | Action | Total | Concrete improvement |
|---|---:|---:|---:|---:|---|
| Format-specific converter user / pair page |18 |17 |9 |9 |53 | Keep selected output, verify file signature, and explain alpha/animation behavior. |
| Discord moderator / resizer + guide |18 |16 |9 |12 |55 | Correct requirements, distinguish assets and configure the editor. |
| Arbitrary-dimensions designer / calculator |17 |17 |15 |13 |62 | Return ratio/proportional results for any valid dimensions; deploy and validate local work. |
| Non-AI enlargement user / upscaler |22 |19 |11 |20 |72 | State non-AI method and limitations before upload; add real 2x/4x examples. |
| No-crop photo user / homepage |24 |22 |17 |22 |85 | Separate crop from fit and show the downloaded dimension before export. |

The weakest outcomes come from workflow resets and unsupported output promises. Fix those before adding new keyword pages.

## SXO gap score

For the current live Instagram resizer: **44/100**, separate from SEO Health Score. This is an internal review against the observed direct-tool intent.

| Dimension | Score | Evidence |
|---|---:|---|
| Page type |5/15 | Hybrid dimension guide instead of a local resizing workflow. |
| Content/task coverage |8/15 | Useful preset table; generic advice and missing crop/preview distinctions. |
| UX |6/15 | Generic homepage CTA loses the selected platform and placement. |
| Schema |8/15 | Parsable application schema exists, but a schema label does not supply the absent interaction. Technical review owns eligibility. |
| Media |3/15 | No original HTML image or real preset preview in the fresh crawl. |
| Authority |7/15 | Named site/team and support, no specification citations or tested examples on page. |
| Freshness |7/10 |2026 framing is present, but actual current platform facts need verification. |

No sitewide SXO average is calculated from this one deep review.

## Topic clusters and internal links

Keep a clear separation of user jobs while connecting the workflows:

| Cluster | Primary task page | Supporting reference/how-to | Useful links and action preservation |
|---|---|---|---|
| Square photo / no crop | Homepage editor | Existing local no-crop guide after review/deployment | Guide steps open the editor in Blur/Solid fit mode; homepage links to the explanation when needed. |
| Platform resize | `/resize/{platform}` | Platform-specific size guide | Each asset row opens exactly that platform/placement; guide tables link to corresponding preset. |
| Image dimensions | Calculator | Social-size reference and aspect-ratio explanations | Calculation results keep width/height when passed to the editor, rather than linking to a generic guide. |
| Format conversion | Main converter and viable pair pages | Tested format/alpha/animation notes | Pair pages preserve output; link directly to relevant compressor/cropper tasks, not every sibling uniformly. |
| Enlargement | Upscaler | Original comparison/method explanation on the page | Link to calculator for dimensions and crop/fit guide when changing shape. |
| Compression | Compressor | Target-size troubleshooting on the same page | Conversion choice and before/after size explain the next action. |

Live platform Related Resources usually points to the general social-media guide even when a dedicated guide exists. Instagram should link directly to feed and Story/Reel references; Discord to banner/invite troubleshooting. The graph review found `/converter/webp-to-avif` only in the sitemap, with no crawlable internal link from the homepage graph. Link it from the converter only after the actual encoding output works. Do not grow more pair pages while unsupported outputs remain.

Overlap between platform dimension pages and guides is a cannibalization hypothesis, not a demonstrated ranking defect. First assign distinct jobs, then use page-query overlap and actual GSC landing-page changes to decide whether to consolidate. Retain the working homepage's broad square-image cluster.

## Measurable acceptance criteria

- In each priority landing page, the first action starts the promised task with the correct preset/output selected. Record the landing URL, selected state and independent download verification.
- Every mutable guide claim has a primary-source URL and checked date or is clearly marked as a practical recommendation based on a described preview test.
- Main task completion can be measured as editor start, successful process and verified download. Analytics events must contain no filenames or image content. Do not promise a numeric uplift before a baseline exists.
- After deployment and recrawl, compare the same 28-day GSC page/query groups against the previous 28 days, with device/country context and brand/nonbrand separation. Track clicks, impressions, CTR and task completion; avoid interpreting tiny rows as winners.
- Record local pending work separately from live verified work. Existing edits alone cannot close these findings.

## Limits

No controlled Google SERP capture, paid keyword-volume data, independent backlink audit or full browser matrix was run for this content review. No invented PAA, advertisements, AI Overview presence or result-position counts are included. The technical/tool agent owns live output-file tests and the parent owns complete GSC opportunity scoring. This review does not attribute performance changes to an algorithm update or guarantee rankings. Google's [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) supports evaluating whether the content and tools actually fulfill their purpose.
