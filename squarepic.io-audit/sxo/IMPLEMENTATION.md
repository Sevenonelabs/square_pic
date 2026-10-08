# SXO implementation

8 October 2026. Changes based on `SXO-REPORT.md`, implemented locally.

| Report priority | Implementation |
| --- | --- |
| Transparent output | Added a named Transparent style. It fits the source without filling the canvas, preserves source alpha, and selects PNG. Checkerboards appear only in the preview and export dialog. Solid colors retain their existing behavior. |
| Exact square dimensions | Added Original size, 1080 × 1080, 1200 × 1200 and a custom edge field beside Style. Custom requests accept whole numbers from 1 to 4096. Invalid requests explain the range and keep the current dimensions. Preview readouts and export encoding share one dimensions calculation. Oversized original images show a limit notice. |
| Crop clarity | Style helper text distinguishes fitting at 100% zoom from a centered crop. Higher zoom can trim edges. Homepage, FAQ, support and the square-photo guide now match the controls. Removed Smart Crop wording and the obsolete Export Perfect Square instruction. |
| Earlier examples | Moved the portrait fit/crop comparison directly after the editor, ahead of related-tool cards. Both outputs appear side by side on mobile. Kept the product comparison further down the homepage. Added Try sample image using the existing local portrait asset. |
| Mobile controls | Mode, preset, color and export buttons have a minimum 44px height on mobile. Settings have a visible scrollbar and scroll guidance. Style comes first, followed by square sizing. Export remains outside settings scrolling. The initial upload and export actions fit at 1366 × 900 and 390 × 844. Shorter initial screens use document scrolling; the loaded editor keeps its preview and export in view. |
| Completion measurement | Existing upload, processing-success and download events now carry editor mode and viewport layout. Upload events distinguish an uploaded image from the bundled sample. Processing success fires when an encoded export is ready; download fires when saving is initiated. No filenames, image pixels or source URLs enter these events. |

## Verification

- `npm run lint` and `npm run build` passed.
- `python scripts/validate-seo.py --base http://localhost:3012 --output squarepic.io-audit/sxo/verification/seo.json` passed for 50 pages, two XML sitemaps, 14 preview images and 35 llms links.
- `python scripts/verify-sxo-improvements.py http://localhost:3012 final` passed against the production build at 1366 × 900, 390 × 844 and 320 × 568. Pillow independently decoded the downloaded files.
- Verified 800 × 800 transparent PNG output with alpha 0 in padding and original empty areas, with both edge subjects retained. Verified opaque solid-color output, 1080 and 1200 shortcuts, invalid custom requests, WebP crop exports, 1080 × 1920 platform exports, and a capped 4096 × 4096 download from a 5000 × 1000 source.
- The focused check also covers sample loading, checkerboard preview, mobile touch sizes, document width, visible loaded preview/export, safe analytics parameters and absence of browser page errors.
- The existing Chromium viewport regression passed 32 measurements, including rotated screens, platform presets, zoom, the embedded platform editor and invalid-file recovery. Results are under `../release/sxo-editor-final/`.
- `python scripts/verify-editor-actions.py http://localhost:3012 sxo-actions` passed in Chromium, Firefox and WebKit. It checks real file dimensions, native-share activation, PNG clipboard output, cancelled/failed sharing, download fallback, focus restoration, invalid inputs and export-error recovery. Results are under `../release/sxo-actions/`.

Focused downloads, screenshots and event evidence are under `verification/final/`. The regression script is `scripts/verify-sxo-improvements.py`.

The product comparison now uses Ryan Waring's red sneaker photo from Unsplash. Its source is 900 × 600; the 900 × 900 fit and crop images were regenerated through SquarePic. Credits, alt text and the reusable photo-export script match the new assets. The production build passed again, and the three images loaded on the homepage and square-photo guide.

## Release and measurement follow-up

These changes have not been deployed. After the normal release, verify production copy and repeat the focused output checks against the live host. A new SXO score has not been assigned; passing functional checks does not establish a ranking or conversion increase.

For GA4 explorations, configure event-scoped custom dimensions for `editor_mode`, `device_layout` and `input_source` if they are not already configured. `device_layout` describes viewport width, not a physical-device classification. Analyze sample starts separately from personal-image uploads. No GA4 account configuration was changed here.

Collect completion data after release, then compare homepage query CTR in matched 28-day GSC windows with country and device context. Keep the existing title during that measurement. No new testimonials, review ratings or unsupported rich-result claims were added.
