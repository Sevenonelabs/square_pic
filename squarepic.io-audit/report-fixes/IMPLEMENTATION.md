# SquarePic audit fixes — October 9, 2026

Changes are implemented in the working tree and tested against a local production build. They have not been deployed. Google PageSpeed Insights and production redirect behavior still need verification on the deployed canonical URL, `https://www.squarepic.io/`.

## Changes covering the nine findings

| Finding | Implemented change |
| --- | --- |
| Social sharing | Added visible X, Facebook, LinkedIn and WhatsApp links, native sharing and copy-link controls. Clipboard failure exposes a selectable URL. No sharing SDK is loaded. |
| Repeated anchor text | Distinguished calculator and social-share labels. Homepage HTML checks reject identical visible anchor text pointing to different destinations. Navigation links to the same destination retain consistent labels. |
| Skipped heading level | Added an accessible settings heading and appropriate subsection levels for standalone and embedded editors. Export dialogs use an h2. |
| Usability | Focusable upload buttons, a skip link, accessible menu names and Escape focus restoration, larger controls, readable text and visible link underlines. Editing controls appear after an image is chosen. Loaded previews and export actions fit small phones and rotated screens. |
| Mobile performance | Server-rendered homepage content, removed initial Motion animations, reduced initial editor markup, system fonts, scoped Tailwind scanning and deferred Google Analytics. StartupBar loads only through its footer button. |
| Desktop performance | The same request and rendering reductions apply to desktop. Legacy paths on the apex hostname redirect directly to their final canonical destination in the application configuration. |
| Render-blocking resources | Next.js includes the compiled stylesheet in the HTML response. Final Lighthouse checks identify no render-blocking requests. The compiled stylesheet is 61,066 bytes. |
| Exposed email addresses | Removed plaintext support addresses and mailto links from public page HTML and organization schema. Contact links open a labeled, validated form that prepares an encoded email draft. A public GitHub support link provides a fallback. |
| Inline style attributes | Moved theme, swatch, border and canvas presentation into CSS classes and data attributes. Removed initial animation attributes and unnecessary generated image styles while preserving optimized responsive image URLs. Homepage HTML and its initial main content contain no element style attributes. |

Stylesheet blocks in HTML are different from element `style` attributes. Inlining the compiled stylesheet removes a first-paint network dependency while keeping presentation rules in the CSS source. Dynamic canvas dimensions remain necessary for image rendering. The optional third-party widget can add its own markup after a visitor enables it.

## Performance measurements

Local production builds were audited sequentially with Lighthouse's default mobile profile and desktop preset. The comparison source was an isolated archive of the original Git HEAD with the same installed dependencies. Its Turbopack filesystem root was widened only to support the temporary dependency junction.

| Metric | Original mobile | Updated mobile | Original desktop | Updated desktop |
| --- | ---: | ---: | ---: | ---: |
| Performance | 45 | 85 | 90 | 99 |
| Accessibility | 95 | 100 | 95 | 100 |
| Best practices | 73 | 100 | 73 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| First contentful paint | 3.4 s | 1.4 s | 1.0 s | 0.3 s |
| Largest contentful paint | 6.4 s | 2.9 s | 1.7 s | 0.8 s |
| Total blocking time | 1,210 ms | 380 ms | 90 ms | 40 ms |
| Cumulative layout shift | 0 | 0 | 0 | 0.009 |
| Host CPU benchmark | 894.5 | 1,019 | 1,238.5 | 1,075 |

Both updated profiles have zero render-blocking requests and no failed binary audits. The final mobile performance result is still below 90 on this host; it is not presented as a passed green performance target.

These are localhost lab results, not Google PageSpeed Insights results or real-user Core Web Vitals. Host CPU benchmarks varied substantially during the session (about 850–2,960), so scores from different phases are not directly comparable. The earlier original build scored 87 mobile / 98 desktop when the host benchmark was near 2,960. The table uses the later comparison runs and the final build's latest results, and exposes their CPU benchmarks to make that limitation clear.

Raw reports: `matched-before-mobile.json`, `matched-before-desktop.json`, `release-mobile.json`, and `release-desktop.json` in this directory. The final mobile report completed without a Lighthouse runtime error; the CLI subsequently returned an EPERM error while cleaning up its Windows temporary Chrome profile. Generated JSON reports and screenshots are ignored by Git.

## Validation

- `npm run build` — production compilation, TypeScript and static generation passed.
- `npm run lint` and `git diff --check` — passed.
- `python scripts/validate-seo.py --base http://localhost:4173 --output squarepic.io-audit/report-fixes/seo-validation.json` — 50 pages, two XML sitemaps, 14 preview images and 35 llms links passed.
- `python scripts/verify-report-fixes.py http://localhost:4173` — eight HTML routes and five viewports passed; keyboard upload, menu focus, themes, actual PNG downloads, native sharing, clipboard success/failure, contact validation and encoded draft navigation were checked.
- The same script checks analytics queuing, delayed loading after interaction, browsers without idle callbacks, and optional recommendations loading/failure. External services are intercepted in functional tests.
- `python scripts/verify-sxo-improvements.py http://localhost:4173 report-fixes-final` — desktop and two phone sizes passed actual downloaded-file checks for transparency, retained edge pixels, solid colors, custom and preset sizes, WebP, crop, story output and the 4096-pixel limit.
- `python scripts/verify-editor-viewport.py http://localhost:4173 report-fixes-complete` — all 96 loaded-editor measurements passed across Chromium, Firefox and WebKit, including rotation, zoom, embedded platform editors and invalid-file recovery. Results are saved in `../release/report-fixes-complete/results.json`.
- `python scripts/verify-editor-actions.py http://localhost:4173 report-fixes-complete-actions` — all three engines passed native file-sharing, PNG clipboard, cancellation, failure handling and dialog focus checks. Sharing APIs are mocked; no messages are sent to social apps.

## Behavior to review

- Google Analytics loads after the first pointer, keyboard or scroll interaction, with a short delay and idle scheduling. Events queue before the library loads. Visits with no interaction are not recorded by Google Analytics. Google advertising signals and advertising personalization are disabled. Vercel telemetry remains enabled on Vercel deployments.
- The contact form opens a draft in the visitor's email application. It does not submit to a server or claim to have sent a message. Removing plaintext addresses reduces exposure to simple scrapers; browser-side address construction does not make the address secret.
- Startup recommendations are optional and no longer occupy space or load third-party resources on arrival. Failure restores the normal header spacing and exposes an external StartupBar link.
- System fonts replace downloaded fonts throughout the site.
- Existing unrelated audit files were preserved. Automatic approval review blocked deletion of the temporary comparison build, which remains at `C:/Users/shiva/AppData/Local/Temp/squarepic-audit-baseline-1fb355c3a5744f6fbf6101a96ac476b2`. Its server has been stopped.

## Implementation references

[Next.js inline CSS](https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss), [Tailwind source detection](https://tailwindcss.com/docs/detecting-classes-in-source-files), [third-party JavaScript loading](https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript).
