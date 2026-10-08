# AI search and agent readiness — production, 8 October 2026

This is a technical/readability readiness assessment, not measured visibility in AI Overviews, AI Mode, ChatGPT or Perplexity. Platform citation rates and brand-mention coverage were not measured. No platform readiness score is invented. Production behavior is separate from local pending edits.

Editorial AI-search-readiness score suggestion: **80/100**, distinct from platform visibility. Rubric: permitted robots access 25/25; raw-HTML readability 25/25; source-backed claims/entity consistency 8/25; optional discovery-file correctness 7/10; measured accessibility heuristic 15/15. The last item credits only the local heuristic; missing Lighthouse/WAF/CLS checks remain unmeasured. The rubric is a manual prioritization aid, not a probability of being cited.

## Measured results and limits

- Lighthouse Agentic Browsing: unavailable on both mobile and desktop; PSI returned HTTP 429 shared daily quota. `data/lighthouse-agentic.json` preserves both errors. No X/N fraction or Lighthouse version is asserted for an uncompleted run.
- Local Agent-UX heuristic, homepage: **100/100**, complete, 150 accessibility-tree nodes, 18 interactive nodes, 0 unnamed interactive nodes. This is the plugin's local heuristic, not Lighthouse, field CWV, WCAG conformance or full-tool usability proof. Evidence: `data/agent-ux.json`.
- Static P0 checks: primary content without JS, robots reachability and explicit AI groups passed; 0 observed failures among these three. Full Lighthouse accessibility rules, CLS and verified-agent/WAF handling remain untested, so do not state every P0 passes.
- All 49 canonical pages provide indexable, readable text in raw HTML, clear headings and canonical URLs. Homepage has 923 words using this crawler's extraction (bundled tool counts 932; extraction differences explain the small gap).

## Access policy observed

| Agent/token | Purpose | Root robots permission |
|---|---|---|
| Googlebot | Google Search and Search AI features | Allowed through wildcard |
| OAI-SearchBot | ChatGPT search | Explicit Allow |
| PerplexityBot | Perplexity search | Explicit Allow |
| Claude-SearchBot | Claude search | Allowed through wildcard |
| Applebot | Apple search/discovery | Allowed through wildcard |
| GPTBot | OpenAI training | Explicit Allow |
| ClaudeBot | Anthropic training | Explicit Allow |
| Google-Extended | Google training/use control | Allowed through wildcard |
| Applebot-Extended | Apple Intelligence training control | Allowed through wildcard |
| CCBot | Common Crawl | Allowed through wildcard |
| ChatGPT-User | User-requested browsing | Explicit Allow |
| Claude-User | User-requested browsing | Allowed through wildcard |
| Perplexity-User | User-requested browsing | Allowed through wildcard |

These are robots permissions, not proof actual verified bot requests succeed or the engines index/cite the site. `Claude-Web` is listed in robots but does not replace the actual Claude-SearchBot/Claude-User tokens. Named AI groups allow `/` without repeating wildcard `/api/` disallow; review intended policy if API crawling restrictions are important. Protect private APIs with authentication, never robots alone. Do not change training policy without the user's choice.

## Medium: existing llms.txt is malformed for the optional Lighthouse convention

[llms.txt](https://www.squarepic.io/llms.txt) is HTTP 200 text/plain, 6,519 bytes, with headings and bare URLs, but no Markdown links. The bundled static validator reports failure against Lighthouse's llms convention (`contains no Markdown links`). Convert useful bare-URL entries into `[Label](URL)` and add a concise summary. This is a low-cost optional interoperability improvement; Google states new AI text files or special schema are unnecessary for Search AI features. It does not establish a ranking or citation lift. Validation: rerun `agentic_check.py`; an actual Lighthouse run is still needed for a fraction.

## High: reconcile factual product/privacy claims before increasing AI extraction

`llms.txt` says `no tracking`, while homepage raw HTML preloads Google gtag and serializes an afterInteractive GA configuration. Image-locality claims are distinct from analytics; verify actual consent/network behavior and align llms, privacy, author and product copy with the implementation. Do not assume image uploads occur based on analytics. It also claims eight-format conversion and compression research without a reproducible test method; tool support and source quality should be fixed alongside the product audit. AI-readable unsupported statements can amplify trust problems.

Validation: test network behavior under each consent state, compare promised formats to the bytes/MIME of downloads, publish reproducible benchmark inputs/settings if using performance claims. Leading indicators: claim-to-test checklist passes and fewer format-related support failures; AI citation changes themselves remain unmeasured.

## Medium: stronger evidence and entity consistency

Guides provide extractable size tables and FAQ answers but many fast-changing platform specifications are asserted without linked official documentation or demonstrated updated testing. Add dated official source links and actual before/after examples, with named reviewers or a consistently typed Organization author. The SevenOneLabs Person/Organization mismatch is detailed in `schema.md`. These changes support ordinary helpfulness and factual reliability; no special passage length or schema guarantees AI inclusion.

## Optional capabilities, not defects

- Markdown negotiation returns HTML, no `Vary: Accept`; `/index.md` is 404. Existing HTML is already readable. A Markdown representation is optional.
- No static WebMCP registrations found in homepage plus eight same-origin scripts. Runtime tool list is unavailable without Lighthouse; do not call a static call-site count the number of tools. WebMCP is a W3C community proposal/draft per the skill's 2026-09-23 fact pack; no claim of universal browser support.
- No Content-Signal preference line, ai-catalog, agent card, OAuth discovery or UCP profile. Their absence is info/not applicable for this browser-only image editor without those services. Content-Signal is a preference proposal, not access enforcement or a Google ranking signal. Do not add irrelevant catalogs solely to increase audit denominators.
- Random unknown route returns 404; no catch-all 200 defect.

Dependencies: truthful tool output and landing intent → reliable claims and sources → optional discovery-file repair → measure GSC/analytics and platform citations. If readability/metadata improvements fail to change citations, evaluate query demand, competing evidence and actual engine coverage rather than adding machine-readable files indiscriminately.

Primary guidance checked during this audit: [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features), which says ordinary SEO remains relevant and no special AI text files/schema are required. Vendor-specific protocol facts come from the plugin's fact pack last verified 2026-09-23; no fresh standards-conformance claim is made here.
