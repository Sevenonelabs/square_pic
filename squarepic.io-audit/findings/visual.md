# Visual and mobile UX audit

Live audit on 2026-10-08 in Chromium. Eight pages captured at desktop 1920 x 1080 and mobile 375 x 812. Uploaded tool states also captured at 1366 x 900. Evidence is in `screenshots/`, `data/browser-inspect.json`, `data/typography-layout.json` and `data/extra-results.json`.

## Findings

1. **High: horizontal overflow breaks mobile navigation.** With client and visual viewport both 375 CSS pixels at scale 1, homepage scroll width is 382 pixels and converter scroll width is 523 pixels. The converter header extends beyond the right edge and its menu is clipped. The broad scan also found compressor width 411 and cropper width 394; upscaler, calculator, Instagram and PNG-to-AVIF landings stayed at 375. Wide sections/tables need `min-width:0`, responsive wrapping or contained horizontal scroll. Fix the source rather than hiding overflow globally. Evidence: `screenshots/converter-mobile.png`, `screenshots/home-mobile.png`; precise dimensions in `data/typography-layout.json`.
2. **Medium: the homepage H1 is hard to read.** Mobile H1 is 17.6 px, weight 900, letter spacing -2 px and line height 18.48 px. Heavy letters are visibly squeezed together. Desktop still uses -2 px spacing at 28.16 px. Reduce negative tracking, use a readable weight and allow more line height. Evidence: `screenshots/home-mobile.png`, `screenshots/home-desktop.png`, `data/typography-layout.json`.
3. **Medium: controls and secondary copy are small and low contrast.** Lighthouse accessibility is 83 on both presets. Theme controls are roughly 12 to 14 px square and fail the 24 px target/spacing check. Settings headings are about 8.8 px with 3.29:1 contrast; the drag/drop hint is 11.2 px at 3.06:1. Increase copy size/contrast and use practical 44 to 48 px touch hit areas. Evidence: Lighthouse `color-contrast` and `target-size` entries.
4. **Medium: sliders lack accessible names.** Homepage range inputs lack associated labels or equivalent names. Connect labels to padding, blur, zoom and edge radius inputs and announce values. Lighthouse also flags skipped heading levels. Evidence: Lighthouse `label` and `heading-order` entries.
5. **Medium: promotional bar takes priority over the task.** Startupbar injects a roughly 36 px bar above navigation with rotating unrelated products. Consider removing it from tool surfaces or reserving its space and reducing mobile prominence. No conversion impact was measured. Its heartbeat CSP errors are separately documented in performance findings.

## What works

Homepage upload CTA is visible in the initial mobile viewport, around the middle of the screen. Converter/compressor/cropper/upscaler show a clear heading and upload region without scrolling. Dark theme and accent buttons are consistent. Synthetic image previews load. Main shortcomings are overflow, cramped typography, control readability and completion accuracy.

## Limits

No assistive-technology user test or physical-device test. Mobile uses Chromium touch/mobile emulation. Screenshots/computed CSS support the layout findings; rankings and conversion effects were not measured.
