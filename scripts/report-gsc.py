"""Generate a reproducible page/query baseline from saved GSC CLI responses."""
import argparse
from collections import defaultdict
import json
from pathlib import Path
from urllib.parse import urlsplit

PRIORITIES = {
    "/": "Clarify fit versus crop; answer square-photo questions; link to a worked-example guide.",
    "/upscaler": "Describe the actual non-AI smoothing and sharpening; cover PNG, transparency, and enlargement limits.",
    "/image-size-calculator": "Add working ratio, megapixel, proportional-resize, and same-ratio calculations.",
    "/guides/instagram-reels-stories-guide": "Answer same-size questions first; distinguish artwork from video; replace unsupported fixed limits and safe-zone claims.",
    "/resize/linkedin": "Explain 1200 × 627 and its approximate 1.91:1 ratio; distinguish company covers; link to relevant tools and guide.",
    "/resize/instagram": "Explain no-crop square framing and distinct vertical presets; link to the square and Reels guides.",
}


def rows(path):
    response = json.loads(path.read_text(encoding="utf-8-sig"))
    if not response.get("ok"):
        raise ValueError(f"{path}: {response.get('error')}")
    return response["data"].get("rows", [])


def combine(data):
    grouped = defaultdict(lambda: {"clicks": 0, "impressions": 0, "weightedPosition": 0})
    for row in data:
        key = (urlsplit(row["keys"][0]).path or "/", *row["keys"][1:])
        metrics = grouped[key]
        metrics["clicks"] += row["clicks"]
        metrics["impressions"] += row["impressions"]
        metrics["weightedPosition"] += row["position"] * row["impressions"]
    for metrics in grouped.values():
        metrics["ctr"] = metrics["clicks"] / metrics["impressions"] if metrics["impressions"] else 0
        metrics["position"] = metrics.pop("weightedPosition") / metrics["impressions"] if metrics["impressions"] else 0
    return grouped


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--directory", type=Path, default=Path("docs/gsc-2026-10-07"))
    args = parser.parse_args()
    data = args.directory / "data"
    current = combine(rows(data / "pages-current.json"))
    previous = combine(rows(data / "pages-previous.json"))
    queries = combine(rows(data / "page-queries-current.json"))
    queries90 = combine(rows(data / "page-queries-90d.json"))
    totals = rows(data / "totals-current.json")[0]
    old_totals = rows(data / "totals-previous.json")[0]
    lines = [
        "# SquarePic Search Console baseline and improvements",
        "", "Collected October 7, 2026. Property: `sc-domain:squarepic.io`. Search type: web.",
        "", "Current period: September 7–October 4, 2026. Previous period: August 10–September 6, 2026. Both contain 28 days. The supporting 90-day period is July 7–October 4. Search Console dates follow its reporting timezone; the collection date follows Asia/Calcutta. Ending three days before collection avoids the freshest partial data, but Google can still revise reported values.",
        "", "## Site performance", "",
        "| Metric | Previous 28 days | Current 28 days | Change |", "| --- | ---: | ---: | ---: |",
        f"| Clicks | {old_totals['clicks']:,} | {totals['clicks']:,} | {(totals['clicks']/old_totals['clicks']-1)*100:.1f}% |",
        f"| Impressions | {old_totals['impressions']:,} | {totals['impressions']:,} | {(totals['impressions']/old_totals['impressions']-1)*100:.1f}% |",
        f"| CTR | {old_totals['ctr']*100:.2f}% | {totals['ctr']*100:.2f}% | {(totals['ctr']-old_totals['ctr'])*100:+.2f} percentage points |",
        f"| Average position | {old_totals['position']:.2f} | {totals['position']:.2f} | {totals['position']-old_totals['position']:+.2f} |",
        "", "These are pre-release observations, not results of the edits in this report. A lower average position number is better, but a changing query mix can change that average without every individual query improving. These figures do not establish a cause for the increase.",
        "", "Site totals come from dimensionless API queries. Page rows sum to 463 clicks in the current window and 290 in the previous window, versus property totals of 462 and 289. Page-level and property-level aggregation can differ. Query rows omit anonymized traffic and must not be treated as site-wide totals.",
        "", "## Best-performing pages selected for improvement", "",
        "Apex and www versions are combined by URL path for this table. Raw URL variants remain in the saved responses. CTR is clicks divided by impressions; combined average position is weighted by impressions.",
        "", "| Page | Clicks, current / previous | Impressions | CTR | Average position |", "| --- | ---: | ---: | ---: | ---: |",
    ]
    for path in PRIORITIES:
        r = current[(path,)]
        old = previous.get((path,), {"clicks": 0})
        lines.append(f"| `{path}` | {r['clicks']} / {old['clicks']} | {r['impressions']:,} | {r['ctr']*100:.2f}% | {r['position']:.2f} |")
    lines += ["", "The upscaler has no page impressions in the previous window; its current emergence is not enough evidence to claim a long-running trend. The Instagram and LinkedIn pages have only four and five clicks. Their query opportunities are useful leads, with small samples.", "", "## Queries that shaped the changes", ""]
    for path, action in PRIORITIES.items():
        lines += [f"### `{path}`", "", action, "", "| Query | Clicks | Impressions | CTR | Position | 90-day impressions |", "| --- | ---: | ---: | ---: | ---: | ---: |"]
        matches = sorted(((key, r) for key, r in queries.items() if key[0] == path), key=lambda item: item[1]["impressions"], reverse=True)[:6]
        for key, r in matches:
            query = key[1].replace("|", "\\|")
            support = queries90.get(key, {"impressions": 0})["impressions"]
            lines.append(f"| {query} | {r['clicks']} | {r['impressions']} | {r['ctr']*100:.2f}% | {r['position']:.2f} | {support} |")
    lines += [
        "", "## Topical coverage implemented", "",
        "The homepage remains the tool for making a square photo. A new guide at `/guides/make-image-square-without-cropping` serves the instructional intent: choosing padding or crop, working through 1200 × 800 to 1080 × 1080, calculating background space, choosing export formats, and checking destination previews. It links back to the tool and to the calculator, cropper, upscaler, compressor, and Reels guide.",
        "", "The calculator and Instagram/LinkedIn pages link into that guide. The guides index exposes a Photo Editing category; the guide registry, feeds, related-guide links, and sitemap include the new page. The old `/blog/how-to-square-image-for-any-platform` URL, which received three clicks and 104 impressions in the current window, redirects permanently to the new tutorial. No query-variant square-maker pages were added.",
        "", "The upscaler copy now matches its Canvas smoothing and local sharpening implementation. It does not promise a specific bicubic algorithm, GPU acceleration, missing-detail recovery, or pixel-art suitability. The Reels guide answers the shared 9:16-canvas question and removes unsupported duration, file-size, engagement, and fixed-safe-zone claims. FAQ structured data matches visible answers. No FAQ rich-result uplift is claimed.",
        "", "## Indexing baseline", "", "| Existing priority page | Verdict | Google-selected canonical | Last crawl, UTC |", "| --- | --- | --- | --- |",
    ]
    for name in ["home", "upscaler", "calculator", "reels", "linkedin", "instagram"]:
        item = json.loads((data / f"inspect-{name}.json").read_text(encoding="utf-8-sig"))["data"]
        index = item["indexStatus"]
        lines.append(f"| `{urlsplit(item['url']).path or '/'}` | {item['verdict']} | {index.get('googleCanonical','Unavailable')} | {index.get('lastCrawlTime','Unavailable')} |")
    lines += [
        "", "These inspections describe Google's stored version of the live pages, not the local edits. The new tutorial has not been released and has no claimed indexing result. Sitemap submitted counts are not indexed-page counts.",
        "", "## Next priorities", "",
        "1. Release the verified changes from the active Next.js repository, alongside the existing SEO fixes on `codex/seo-action-plan`. The legacy Vite checkout must not replace production.",
        "2. After release, verify the new guide, redirect, sitemap, and metadata on the public site. Check URL Inspection again after Google recrawls. Manually request indexing through Search Console if needed; the CLI login is read-only.",
        "3. Compare 28 complete days after release and recrawl with this baseline. Track page clicks, impressions, CTR, and the same query groups. Report branded and non-branded queries separately where possible; `square pic` may have mixed intent. Do not set a generic CTR target across different positions and query types.",
        "4. Improve the Discord guide next if its queries persist: `discord server banner size` has 26 current impressions at position 6.81, and `discord server splash image not showing on invite link` has 13 at position 2.69. Verify current Discord requirements before adding troubleshooting advice.",
        "5. Review Twitch panels once there is a larger sample. `resize image for twitch panel` has five current impressions at position 6.60. Avoid a new standalone panel page until demand and actual tool support justify it.",
        "6. Build further tutorials only from recurring gaps and real workflows: square export quality, selecting ratios, and resizing versus compressing. Inspect overlap first, and improve an existing page when it already serves the intent. Competitor volumes and difficulty were not collected; these are GSC-backed leads, not a market-wide keyword forecast.",
        "", "## Validation and reproduction", "",
        "Production build and TypeScript compilation passed. ESLint passed on changed TypeScript files. The existing SEO checker validates 50 sitemap pages, two XML sitemaps, 14 preview images, and 35 llms links. Its head parser was corrected to exclude accessible SVG diagram titles from HTML title-length calculations; a regression check passed.",
        "", "```powershell", "npm run build", "npm run check:seo -- --start-server --output docs/gsc-2026-10-07/seo-validation.json", "npm run start -- --port 4173", "# In another terminal, with Python Playwright available:", "python scripts/verify-gsc-improvements.py", "python scripts/report-gsc.py", "```",
        "", "Saved API responses are in `data/`; browser results and screenshots are alongside this report. Each page/query response is below the requested 10,000-row cap. The command requires quotes around combined dimensions in PowerShell, for example `--dimension 'page,query'`.",
        "", "## Sources", "",
        "The strategy follows Google's advice to make content useful, give pages descriptive titles, and connect related pages with crawlable links: [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [title links](https://developers.google.com/search/docs/appearance/title-link), and [internal links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).",
        "", "The platform and implementation references used in the changed pages are [LinkedIn Pages image specifications](https://www.linkedin.com/help/linkedin/answer/a563309/image-specifications-for-your-linkedin-pages-and-career-pages), [Meta Reels ad guidance and safe-zone checker](https://www.facebook.com/business/ads/facebook-instagram-reels-ads), and [Canvas image smoothing](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality). Some Instagram help pages returned HTTP 429 and Meta specification pages required login. No current hard duration, file-size, or universal safe-zone limit is claimed from those inaccessible pages.",
        "", "Release status: source improvements verified locally. This work has not been deployed, and no resulting ranking or traffic gain has yet been measured.",
    ]
    browser_result = args.directory / "browser-verification.json"
    if browser_result.exists():
        verification = json.loads(browser_result.read_text(encoding="utf-8"))
        lines += ["", "### Browser checks", ""] + ["- " + check for check in verification["checks"]]
        if verification.get("externalWidgetErrors"):
            lines += ["", verification["limitation"], "Stack traces point exclusively to `https://startupbar.co/assets/` scripts and are retained in `browser-verification.json`. This external issue remains unresolved."]
    if (args.directory / "DISCORD.md").exists():
        lines += ["", "## Discord continuation", "",
                  "The Discord priority above has now been implemented locally. See [the Discord keyword mapping, verified specifications, and measurement baseline](DISCORD.md) for refreshed authenticated GSC data and separate validation evidence. The original snapshots and earlier source improvements are preserved. Deployment remains pending."]
    (args.directory / "REPORT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {args.directory / 'REPORT.md'}")


if __name__ == "__main__":
    main()
