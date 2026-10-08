# Performance audit

Live audit on 2026-10-08. Suggested performance category score: 64/100, based on the mobile Lighthouse lab score. This is not a Core Web Vitals field pass/fail score.

## Measured results

Lighthouse CLI 13.5.0 ran against https://www.squarepic.io/ in headless Chromium. Mobile uses Lighthouse's default mobile simulated throttling; desktop uses its desktop preset. One run per device, so results are diagnostic samples.

| Metric | Mobile lab | Desktop lab | Interpretation |
|---|---:|---:|---|
| Performance score | 64 | 84 | Mobile needs work |
| LCP | 3.963 s | 0.621 s | Mobile needs improvement; desktop good |
| FCP | 2.935 s | 0.302 s | Mobile delayed first paint |
| TBT | 529 ms | 173 ms | Main thread blocking in mobile simulation |
| CLS | 0.039 | 0.212 | Mobile good in sample; desktop needs improvement |
| Speed index | 5.8 s | 1.193 s | Mobile visual completion delayed |
| Accessibility score | 83 | 83 | Contrast, controls and semantics fail audits |
| Best practices score | 73 | 73 | Console/CSP and third-party cookie issues |
| Lighthouse SEO score | 100 | 100 | Checklist only; does not assess intent or export quality |

Evidence: `data/lighthouse-home-mobile.json`, `data/lighthouse-home-desktop.json`. The desktop command reported a Windows temporary-directory cleanup permission error after writing its complete report. The saved JSON contains completed audits and metrics.

PSI API attempts returned a rate-limit error. No configured CrUX key was available. No real-user LCP, INP or CLS data was obtained. TBT is a lab diagnostic and must not be reported as INP. Site-wide CWV pass/fail remains unknown.

## Findings and actions

1. **High: improve initial mobile rendering.** The LCP element was the introductory paragraph, not an image. The insight reports about 191 ms TTFB and 2,755 ms element render delay in its trace breakdown. Main-thread work totals about 2.4 s, including 1.06 s script evaluation and 402 ms style/layout. Prioritize hydration, animation and nonessential scripts. Expected outcome is less startup work and shorter render delay, to be measured after release.
2. **High: investigate desktop layout instability.** CLS 0.212 exceeds the good threshold of 0.1. The trace identifies a large footer shift and another main-content shift. Dynamic header/startupbar insertion is a candidate to investigate, not a proven cause of the footer shift. Reserve dimensions for dynamic UI and avoid content-height changes during hydration. Re-run with and without the widget to isolate its contribution.
3. **Medium: reduce unused JavaScript.** Lighthouse estimates 126 KiB unused JS, with about 76 KiB in Google tag manager and 50 KiB across two first-party chunks. Its modeled LCP saving is roughly 650 ms. Defer analytics/promotional widget work and load export libraries when needed. Modeled savings are not a guaranteed speed increase.
4. **Medium: resolve third-party integration errors.** Live console evidence includes CSP-blocked requests to `analytics.google.com/g/collect`, `www.google.com/g/collect`, Google regional audience images and `startupbar.co/api/public/widget/heartbeat`. Startupbar displays promotions, but its heartbeat image is blocked because the domain is absent from `img-src`. Confirm which analytics/ad functions are intended, remove unnecessary integrations, then narrowly allow intended endpoints. These errors do not prove all GA4 collection fails and do not affect GSC data.

## Scope

Homepage Lighthouse only. Tool pages received browser/network/layout/functional inspection, not separate Lighthouse runs. Browser diagnostics across eight routes are in `data/browser-inspect.json`. No claim of site-wide field performance is made.
