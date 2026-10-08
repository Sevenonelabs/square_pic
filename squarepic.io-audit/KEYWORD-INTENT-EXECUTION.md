# Keyword intent implementation

8 October 2026. Execution of [KEYWORD-INTENT-PLAN.md](KEYWORD-INTENT-PLAN.md).

The existing tool fixes and prepared guides were retained and verified. This run
closed gaps in preset links, platform CTAs, factual copy and worked examples.
The changes are implemented and tested locally. This run did not deploy them,
request indexing or establish an organic traffic or conversion improvement.

## Changes by intent

| Page or family | Reviewed implementation and new changes |
| --- | --- |
| Homepage | Remains the principal square-photo tool. Opening copy distinguishes fit from centered crop and explains the 100% zoom condition. Existing real portrait/product exports and the worked-example guide remain. Added the 4096-pixel export limit and still-frame/metadata limits. Kept its existing descriptive title. |
| Upscaler | Retained the non-AI smoothing/sharpening explanation. Added actual 2x and 4x PNG downloads from the displayed transparent test artwork, with dimensions and checkerboard explanation. Disclosed input and output limits, JPEG flattening, animation and metadata behavior. Unsupported inputs and oversize files report errors; Smart Sharpen has an accessible name and pressed state. |
| Calculator | Verified 1200 × 800 → 3:2, 0.96 MP, 1080 × 720 and existing validation. Exact matches, ratio matches and platform browsing now link to the specific preset. Copy separates pixels/megapixels from encoded KB/MB and removes universal display and minimum-resolution claims. |
| Reels/Stories guide | Keeps the direct 9:16 answer and still-artwork scope. The workflow opens the 1080 × 1920 Instagram preset directly. Added the review method and the access limitation for Meta's reference. |
| LinkedIn resizer and guide | Corrected a stale 1128 × 191 description. The resizer title now includes 1200×627, and the explanation gives 400:209 ≈ 1.914:1. Company and personal covers remain separate. Guide links select the named cover/post preset. A shared 400 × 400 size now displays the selected LinkedIn label rather than another platform's label. |
| Instagram resizer and feed guide | Existing configured editor retained. Bottom CTAs scroll to that editor without discarding the selected preset or loaded photo. Feed-guide links select square, portrait, landscape, vertical or profile presets; the resizer links to both Instagram guides. |
| Discord guide and resizer | Retained the prepared specification and eligibility corrections. Guide links now open Server Banner or Server Splash directly, and the final action retains the server-banner task. Added the checking method. Verified the invite-background export at 1920 × 1080. |
| Twitch resizer | Profile banner and offline video-player image have distinct labels and explanations. The 320 × 160 panel is explicitly a working preset. Added dated official references and disclosed conflicting indexed height/byte limits. No additional panel landing page was created from the small query sample. |
| Converter pairs | Verified all eight supported pairs as actual downloads. Their tool remains preconfigured for the named input/output. Added related working conversions for the same input. Animation copy promises one still frame rather than guaranteeing the first frame. AVIF/BMP/GIF/TIFF output remains disabled, and unsupported pair pages disclose unavailability. |
| Cropper | Verified bounded source-pixel exports on desktop/mobile. Corrected copy about freeform selection, output dimensions, still frames, transparency and failed inputs. Contextual links select the appropriate Instagram or LinkedIn workflow. Source-coordinate fixes were already present and retained. |

Guide bylines continue to identify SevenOneLabs as an organization. Review methods
were added to the scoped guides. Sitemap modification dates reflect changed pages;
unsupported converter pages retain their previous dates. Existing uncommitted work
was preserved. No Git commit was created.

## Verification

- TypeScript, ESLint, the Next production build and `git diff --check` passed.
- [Core tool regression results](release/keyword-intent-tools-final/results.json)
  contain 22 downloads decoded by Pillow and Chromium. Checks cover MIME/signature,
  dimensions, transparency, source crop pixels, changed settings, browser history,
  calculator validation and fixed-label analytics events.
- [Intent journey results](keyword-intent/verification/results.json) contain 15
  further decoded downloads. Calculator and guide links produce the selected
  preset dimensions; bottom CTAs retain the loaded image. All eight supported
  converter pairs work, and six unsupported pairs disclose their status.
- The same journey suite checks 13 priority pages at 320, 390 and 1366 pixels for
  horizontal overflow, one H1, self-canonicals and parseable JSON-LD. It records no
  page errors. Screenshot capture waits for hydration, image decoding and finite
  animations so below-fold examples are visible.
- [Local SEO results](keyword-intent/seo-local.json) cover 50 pages, two XML
  sitemaps, 14 preview images and 35 llms links. Title/description lengths are
  repository rules, not evidence of ranking potential.

Inspect the [mobile upscaler](keyword-intent/verification/upscaler-390.png),
[mobile Twitch page](keyword-intent/verification/resize/twitch-390.png) and
[mobile calculator](keyword-intent/verification/image-size-calculator-390.png).
The two upscaler output assets total about 103 KB before responsive delivery.

Rerun against a built application:

```powershell
npx tsc --noEmit
npm run lint
npm run build
npm run start -- --port 3100
# In a second terminal:
python scripts/verify-tools.py http://localhost:3100 keyword-intent-tools-final
python scripts/verify-keyword-intent.py http://localhost:3100
npm run check:seo -- --base http://localhost:3100 --output squarepic.io-audit/keyword-intent/seo-local.json
```

## Source freshness and limits

[LinkedIn Pages specifications](https://www.linkedin.com/help/linkedin/answer/a563309/image-specifications-for-your-linkedin-pages-and-career-pages)
were opened on 8 October 2026 and support the company cover and custom link-image
distinctions used here. [Twitch channel setup](https://help.twitch.tv/s/article/channel-page-setup?language=en_US)
and [panel editing](https://help.twitch.tv/s/article/how-to-edit-info-panels?language=en_US)
could be read through indexed official results; direct opens returned a loading/CSS
error. Indexed official versions disagree on panel height and byte limits, so those
limits are not presented as universal requirements.

[Meta's Reels ad reference](https://www.facebook.com/business/ads/facebook-instagram-reels-ads)
required sign-in. Instagram dimensions remain working canvas recommendations.
Existing dated Discord reference checks are retained from the earlier audit, not
represented as newly verified platform settings in this run.

Browser checks use local Chromium and synthetic fixtures. The intent suite blocks
external traffic. These checks do not replace actual platform upload previews,
iPhone/Safari hardware testing, maximum-size memory tests or production analytics
verification. There is no new GA4 customer conversion baseline, controlled SERP
overlap study, keyword-volume estimate or ranking uplift estimate.

## Release and measurement

| Stage | Status |
| --- | --- |
| Implemented | Local code and content changes complete; checks passed. |
| Deployed and observable | These additional changes have not been deployed by this run. Earlier releases are recorded separately in EXECUTION-REPORT.md. |
| Processed by search platforms | No new recrawl or index-processing evidence was collected. Cropper inspection after a new crawl remains pending. |
| Outcome observed | No post-change organic or customer-completion outcome is claimed. |

After an authorized release, verify public metadata, presets, downloads and
analytics collection against the deployed source. Retain the saved
[page baseline](page-performance.csv), [query opportunities](query-opportunities.csv)
and [Google findings](findings/google.md). Compare the same page/query cohorts
after recrawl and 28 complete post-release days, with device and country context
where samples permit. Keep clear brand, ambiguous `square pic` and descriptive
task queries separate. Treat a before/after change as observational evidence.

AVIF/BMP/GIF/TIFF exports require verified encoders before their promises can be
restored. Further pages or consolidation should depend on task demand and query
overlap, not shared keywords or word counts.

## Review and rollback

The [before manifest](keyword-intent/before-source-manifest.json) and
[after manifest](keyword-intent/after-source-manifest.json) identify the actual local
inputs, including existing uncommitted work. The after manifest covers 122 inputs;
22 changed or new inputs belong to this run. Its combined SHA-256 is
`a1ab0773b15d12b013e1146c8e2b30b74b21c3257ec9c86ae024022e39af2f6e`.

Before-source copies are stored under `keyword-intent/before` with `.before.txt`
suffixes so Next and TypeScript do not compile the snapshots. The
[review patch](keyword-intent/changes.patch) contains snapshot-backed text changes
and new text files. It is a partial patch; it does not include the converter-pair
file or the cropper/upscaler tool handlers. Review those small changes directly:
pair-specific related links/date/animation wording, input-rejection messages/events
and the accessible sharpening toggle.

Rollback should remove only this run's changes and new example assets, then rerun
the checks. Preserve earlier local fixes. A checkout-wide reset to the base commit
would also discard the user's prepared work and would not restore the previous
deployed source.
