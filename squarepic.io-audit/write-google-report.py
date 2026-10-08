"""Write the audit's Google evidence chapter from fresh, saved API responses."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
S = json.loads((ROOT / "data/gsc/summary.json").read_text(encoding="utf-8"))
cur, old = S["totals"]["current"], S["totals"]["previous"]
lines = ["# Search Console audit", "", "Collected 8 October 2026, Asia/Calcutta. Property `sc-domain:squarepic.io`, verified owner access through the existing read-only GSC CLI. No property settings or sitemap submissions were changed.",
         "", "Current window: 8 September to 5 October 2026. Comparison: 11 August to 7 September 2026. Supporting window: 8 July to 5 October 2026. Both comparisons contain 28 days, and all 28 current date rows were returned. Search Console dates use Pacific Time. Requests use the API's default final data state and end three days before collection.",
         "", "| Metric | Previous 28 days | Current 28 days | Change |", "| --- | ---: | ---: | ---: |",
         f"| Clicks | {old['clicks']:,} | {cur['clicks']:,} | {(cur['clicks']/old['clicks']-1)*100:+.1f}% |",
         f"| Impressions | {old['impressions']:,} | {cur['impressions']:,} | {(cur['impressions']/old['impressions']-1)*100:+.1f}% |",
         f"| CTR | {old['ctr']*100:.2f}% | {cur['ctr']*100:.2f}% | {(cur['ctr']-old['ctr'])*100:+.2f} percentage points |",
         f"| Average position | {old['position']:.2f} | {cur['position']:.2f} | {cur['position']-old['position']:+.2f} |",
         "", "Traffic increased before any changes made in this audit. This is not a measured result of local pending edits, and a changing query mix affects average position. No cause is assigned to the increase.",
         "", "## Pages to protect and improve", "", "Apex and www performance rows are combined by path. Combined position is weighted by impressions. Raw URL variants remain in the evidence files.",
         "", "| Page | Current clicks | Previous clicks | Impressions | CTR | Avg position |", "| --- | ---: | ---: | ---: | ---: | ---: |"]
for p in S["pages"][:12]:
    lines.append(f"| `{p['path']}` | {p['clicks']} | {p['previous_clicks']} | {p['impressions']:,} | {p['ctr']*100:.2f}% | {p['position']:.2f} |")
lines += ["", "The homepage contributes 382 clicks, about 83% of property clicks. This makes it the first growth priority. The upscaler has no previous-window impressions and all 90-day impressions fall inside the current window, so its 28 clicks indicate recent emergence rather than an established trend. Converters contribute only two observed page clicks; fix export quality before trying to scale those pages.",
          "", "## Query evidence by priority page", "", "These are observed searches, not a search-volume estimate. CTR must be interpreted alongside position, geography, device and query intent. Literal `-ai` queries are retained as reported; interpreting them as demand for non-AI tools is a hypothesis, not proof of the searcher's intent."]
for path in ["/", "/upscaler", "/image-size-calculator", "/guides/instagram-reels-stories-guide", "/resize/linkedin", "/resize/instagram", "/guides/discord-image-sizes-2026", "/resize/twitch"]:
    lines += ["", f"### `{path}`", "", "| Query | Clicks | Impressions | CTR | Position | 90-day impressions |", "| --- | ---: | ---: | ---: | ---: | ---: |"]
    for q in S["top_queries_by_page"].get(path, [])[:8]:
        term = q["query"].replace("|", "\\|")
        lines.append(f"| {term} | {q['clicks']} | {q['impressions']} | {q['ctr']*100:.2f}% | {q['position']:.2f} | {q['support_90d_impressions']} |")
lines += ["", "## Device and country", "", "| Device | Clicks | Impressions | CTR | Position |", "| --- | ---: | ---: | ---: | ---: |"]
for d in S["device"]:
    lines.append(f"| {d['keys'][0]} | {d['clicks']} | {d['impressions']:,} | {d['ctr']*100:.2f}% | {d['position']:.2f} |")
lines += ["", "Mobile contributes 319 of 461 clicks, 69.2%. Prioritize phone usability and speed. Desktop's lower CTR is not automatically a snippet failure because position and query mix differ.",
          "", "Top markets by clicks include India 122, United States 53, Egypt 29 and United Kingdom 25. Do not infer a need for translated pages or new geographic pages from this small sample alone.",
          "", "## Stored indexing status", "", "| Inspected URL path | Verdict | Coverage | Last crawl UTC |", "| --- | --- | --- | --- |"]
for item in S["inspections"]:
    path = item.get("url", "").replace("https://www.squarepic.io", "") or "/"
    lines.append(f"| `{path}` | {item.get('verdict', 'Unavailable')} | {item.get('coverageState', 'Unavailable')} | {item.get('lastCrawlTime', 'Unavailable')} |")
lines += ["", "Nine of eleven sampled URLs are indexed, with www canonicals matching the intended URLs. `/cropper` is discovered but currently not indexed. That is not proof of a technical block or a penalty. Improve the page/tool experience, verify links, then inspect again after recrawl. The new square tutorial is unknown to Google and is not part of the live sitemap; it exists in pending local changes. Its status is expected until release.",
          "", "The main sitemap has 49 submitted URLs, zero errors and zero warnings, last downloaded 5 October 2026. The API's old `indexed` field must not be read as an indexed-page count. The 11 inspections do not establish coverage across all 49 URLs.",
          "", "## Data limits and reproduction", "", "Site totals come from a separate dimensionless `byProperty` query. Current page rows sum to 462 clicks versus 461 property clicks because aggregation differs. Query rows omit anonymized terms, and the API can return top rows rather than every row even below the requested cap. Current/previous/support page-query responses returned 1,238/1,250/2,412 rows, all below the 25,000 cap. These are useful query samples, not a complete keyword inventory.",
          "", "`square pic` can represent both a brand and a generic phrase. Do not label it wholly branded or non-branded. Keep unambiguous navigational terms, ambiguous square-pic terms and descriptive tool queries separate in future comparisons.",
          "", "The GSC CLI is authenticated. The SEO helper's separate OAuth configuration and its missing PSI/CrUX API key are different capabilities. GA4 property credentials, conversion counts, field INP, competitor difficulty, controlled Google SERP overlap and a full backlink profile were not available. Common Crawl did not find this domain in its January-March 2026 graph, which does not prove zero backlinks.",
          "", "```powershell", "python squarepic.io-audit/collect-gsc.py", "python squarepic.io-audit/summarize-gsc.py", "python squarepic.io-audit/write-google-report.py", "```",
          "", "The collector uses fixed dates to reproduce this snapshot. For a future comparison, edit the explicitly named periods to use complete post-release dates. Keep the original evidence intact.",
          "", "Source: [Google Search Analytics API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query). Evidence: [GSC summary](../data/gsc/summary.json), [collection manifest](../data/gsc/manifest.json), [page CSV](../page-performance.csv), [query CSV](../query-opportunities.csv).",
          "", "After release, first verify public output and Google's selected canonicals. Then compare the same page/query cohorts over 28 complete post-release days, noting device/country/query mix. A broad CTR target or ranking guarantee is not justified by these data."]
(ROOT / "findings/google.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
print("Wrote findings/google.md")
