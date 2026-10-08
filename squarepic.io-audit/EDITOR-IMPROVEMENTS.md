# Editor improvements

8 October 2026. Follow-up requested fixes for the SquarePic editor.

| Before | After | Why |
| --- | --- | --- |
| Canvas intrinsic height expanded an unconstrained container. | Loaded workspace has a definite viewport height; the preview fits its available width and height, with a display buffer up to 2× for retina screens. | The complete canvas stays visible for square, portrait and landscape presets. Export resolution is independent of preview pixels. |
| Export scrolled away with mobile settings. | Settings scroll within their own region; Export remains visible below them. Short phone landscape layouts place controls beside the canvas. | Download stays reachable without scrolling through settings. |
| Four app buttons invoked the same native share function. | One Share image button opens the device share menu, with an explicit Download fallback. | Users see what the browser can actually do. |
| Encoding the image after a share click could lose user activation. | The modal prepares the actual full-size file before sharing; Copy Image provides a PNG clipboard item with a pending blob. | Native share and clipboard permissions retain the click in browsers that require it. |
| Upload errors used blocking alerts; other failures vanished in a short toast. | Recoverable inline alerts explain the next action. Export retry clears the busy state; cancelled sharing leaves Download available. | Failed actions do not block or discard the editing workflow. |
| QA color markers illustrated results. | Licensed portrait and product photographs show actual fit and crop exports. | Visitors can judge the effects on faces, subjects and edges. |
| Valid WebP inputs without an operating-system MIME mapping were rejected. | Known image extensions are accepted when MIME is empty; the browser decoder checks the image. | Valid inputs work in the Windows WebKit test environment and browsers with missing MIME mappings. |
| Export overlay lacked native modal focus handling. | A native dialog handles focus confinement and Escape, then restores focus to Export. | Keyboard and touch users can dismiss and recover consistently. |
| Downloads used detached anchors with one-second blob cleanup. | All image tools use a connected hidden anchor and ten-second cleanup through one shared download helper. | The browser has time to begin the blob download before its URL is revoked. |
| Global smooth scrolling could move controls under the fixed header during programmatic focus/scroll. | Page scrolling reserves the header height and completes immediately. | Focused controls and automated browser actions reach a stable, visible position. |
| StartupBar replaced the root scroll padding with its own 36px height on production. | Root scroll padding is fixed at 96px/88px with priority, accounting for both bars. | Upload alignment keeps the preview and controls below the entire header. |

## Photographs

Sources were checked against the [Unsplash license](https://unsplash.com/license) on 8 October 2026. Attribution is visible alongside the examples. These are illustrative photographs, not testimonials or endorsements.

- Portrait: [Joseph Gonzalez, man in a white shirt](https://unsplash.com/photos/man-wearing-white-v-neck-shirt-iFgRcqHznqg). CDN original `photo-1507003211169-0a1dd7228f2d`, delivered as a 900 × 1350 WebP at quality 82. Source: 98,014 bytes.
- Product: [Robert Shunev, ceramic mug](https://unsplash.com/photos/ceramic-mug-on-table-OmOvMdiaZZ0). CDN original `photo-1516646227334-6102731f3c25`, delivered as a 900 × 600 WebP at quality 82. Source: 69,714 bytes.
- Fit and crop assets were downloaded from the actual local SquarePic editor with Padding 0%, Zoom 100%, WebP export and Solid/Crop modes. Portrait outputs are 1350 × 1350; product outputs are 900 × 900. Output assets are approximately 44–57 KB each. Next Image supplies responsive delivery.

## GA4 reporting verified

The existing browser login can read account `395143582`, property `538062694` (SevenOneLabs), and the SquarePic stream `14893658704`. The stream's measurement ID is `G-9TTBK0ZDM5`, matching the deployed tag.

The Realtime report visibly received `tool_upload_accepted`, `tool_processing_success` and `tool_download`; processing-success details include `output_format`. A live download with the licensed product fixture completed during this check. The stream settings initially showed an inactive collection warning while Realtime already received events. No account permissions, data filters or key-event settings were changed.

[Open the verified Realtime report](https://analytics.google.com/analytics/web/#/a395143582p538062694/realtime/overview). Realtime includes controlled test traffic and cannot establish a customer conversion rate. Google documents reporting latency in [data freshness](https://support.google.com/analytics/answer/11198161).

## Validation and release

TypeScript, focused ESLint, a production build and the local SEO checks passed (50 pages, two XML sitemaps, 14 preview images and 35 llms links). Chromium and Firefox tool regressions passed 22 independently decoded downloads each. Native sharing is tested with mocks that inspect the actual full-size file and retained user activation; tests never post images to third-party apps.

Production is [www.squarepic.io](https://www.squarepic.io), deployed as `dpl_B4JEY3WHPd8BupRvD21eeNvLiu2C` at 07:59:23 UTC / 13:29:23 IST on 8 October 2026. [Deployment details](release/editor-deployment.json) confirm READY and the production aliases; the immutable release URL is [squarepic-next-lxmwveevd-sevenonelabs-projects.vercel.app](https://squarepic-next-lxmwveevd-sevenonelabs-projects.vercel.app).

[Source manifest](release/editor-source-manifest.json): 118 release input files, SHA-256 `ab6ccaed0e38e5854954567f77b01f233bbdd98fde57ea1f7301b45ace8dc9b4`. The checkout base remains `82f78b8f7a4013e4a0a8c0888aa9261d6eb041ba`, with reviewed uncommitted work. The final workspace files were compared against the manifest and all match. No commit was created over the user's existing work.

Final evidence:

- [96 public viewport measurements](release/editor-production-final/results.json) across Chromium, Firefox and WebKit, at 2878 × 1614, 1366 × 768, 1024 × 600, 375 × 667, 390 × 844, 320 × 568 and 844 × 390, plus rotations. Square and 1080 × 1920 canvases, zoom changes, return to fit, embedded platform editors and corrupt-file recovery pass. Canvas and controls stay below the header, Export remains visible, document width never exceeds the viewport, and the display buffer matches DPR up to 2×. Six downloaded preset PNGs retain 1080 × 1920 dimensions independently of preview size.
- [30 public editor action checks](release/editor-actions-production-final/results.json) cover actual file dimensions/MIME passed to a mocked native share API, preserved user activation, PNG clipboard data, cancelled/failed/unsupported sharing, fallback downloads, wrong/oversized inputs, failed export retry and focus restoration in all three engines.
- Complete tool suites independently decoded 22 downloads per engine (66 total): [Chromium](release/tools-editor-chromium-final/results.json), [Firefox](release/tools-editor-firefox-final/results.json), [WebKit](release/tools-editor-webkit-production-build/results.json). These ran against local builds; final public checks verify the deployed editor and source manifest.
- [Public SEO results](release/editor-production-final-seo.json): 50 pages, two XML sitemaps, 14 preview images and 35 llms links.
- [Public release smoke](release/editor-production-final/smoke.json): redirects, canonical/indexing controls, six real-photo assets with WebP signatures/MIME/dimensions, received GA4 collection events, active referral widget and no CSP violations. [Vercel SDK paths](release/editor-production-final/vercel-sdk.json) resolve successfully.
- [GA4 reporting confirmation](release/editor-ga4-reporting.json) records received event names through the signed-in Realtime interface; the data includes controlled tests and does not establish customer conversion rates.

Screenshots: [desktop](release/editor-production-final/chromium-1366-portrait.png), [mobile](release/editor-production-final/chromium-375-portrait.png), [WebKit mobile](release/editor-production-final/webkit-375-portrait.png).

Actual iPhone/Safari hardware is unavailable in this Windows workspace. WebKit, mocked sharing/clipboard APIs and emulated touch checks do not replace that device test.
