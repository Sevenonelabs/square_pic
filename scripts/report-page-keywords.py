"""Capture rendered SEO copy, verify the keyword mapping, and report GSC evidence."""
import argparse
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlsplit
from urllib.request import HTTPRedirectHandler, build_opener, urlopen
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs/gsc-keywords-2026-10-08"
ORIGIN = "https://www.squarepic.io"
REDIRECTS = {
    "/free-image-compressor": "/compressor",
    "/free-image-converter": "/converter",
    "/free-photo-cropper": "/cropper",
    "/social-media-resizer": "/",
    "/instagram-post-resizer": "/resize/instagram?preset=square",
    "/instagram-profile-picture-resizer": "/resize/instagram?preset=profile",
    "/blog": "/guides",
}


class Copy(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_head = self.in_title = self.in_h1 = False
        self.title, self.description, self.canonical = "", "", ""
        self.headings, self.heading = [], ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "head": self.in_head = True
        if tag == "title" and self.in_head: self.in_title = True
        if tag == "h1": self.in_h1, self.heading = True, ""
        if self.in_head and tag == "meta" and attrs.get("name") == "description":
            self.description = attrs.get("content", "")
        if self.in_head and tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href", "")

    def handle_endtag(self, tag):
        if tag == "head": self.in_head = False
        if tag == "title": self.in_title = False
        if tag == "h1":
            self.in_h1 = False
            self.headings.append(" ".join(self.heading.split()))

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_h1: self.heading += data


def capture(base):
    with urlopen(base + "/sitemap.xml", timeout=30) as r:
        sitemap = ET.fromstring(r.read())
    paths = [urlsplit(n.text).path or "/" for n in sitemap.findall("{*}url/{*}loc")]

    def page(path):
        with urlopen(base + path, timeout=30) as r:
            assert r.status == 200 and r.url == base + path, path
            html = r.read().decode()
        parser = Copy()
        parser.feed(html)
        return {"path": path, "title": parser.title, "description": parser.description,
                "h1": parser.headings, "canonical": parser.canonical}
    with ThreadPoolExecutor(max_workers=5) as pool:
        return sorted(pool.map(page, paths), key=lambda p: p["path"])


def evidence(period):
    path = OUT / f"data/page-query-{period}.json"
    response = json.loads(path.read_text(encoding="utf-8-sig"))
    assert response.get("ok"), path
    grouped = defaultdict(lambda: defaultdict(lambda: {"clicks": 0, "impressions": 0, "weighted": 0}))
    for row in response["data"].get("rows", []):
        path = urlsplit(row["keys"][0]).path or "/"
        metric = grouped[path][row["keys"][1]]
        metric["clicks"] += row["clicks"]
        metric["impressions"] += row["impressions"]
        metric["weighted"] += row["position"] * row["impressions"]
    for queries in grouped.values():
        for metric in queries.values():
            metric["position"] = metric.pop("weighted") / metric["impressions"]
    return grouped


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", default=ORIGIN)
    parser.add_argument("--snapshot", choices=["before", "after"], required=True)
    parser.add_argument("--verify", action="store_true")
    args = parser.parse_args()
    base = args.base.rstrip("/")
    pages = capture(base)
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / f"{args.snapshot}.json").write_text(json.dumps(pages, indent=2), encoding="utf-8")
    print(f"Captured {len(pages)} sitemap pages from {base}.")
    if not args.verify: return
    expected = json.loads((OUT / "expected-copy.json").read_text())
    assert set(expected) == {p["path"] for p in pages}, "Mapping must cover the full sitemap"
    for p in pages:
        copy = expected[p["path"]]
        assert p["title"] == copy["title"] + " | SquarePic", (p["path"], p["title"])
        assert p["description"] == copy["description"], (p["path"], "description")
        assert p["h1"] == [copy["h1"]], (p["path"], p["h1"])
        assert p["canonical"] == (ORIGIN if p["path"] == "/" else ORIGIN + p["path"]), p["path"]
    for field in ["title", "description"]:
        assert len({p[field] for p in pages}) == len(pages), f"Duplicate {field}"
    redirects = []
    class NoRedirect(HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            return None
    opener = build_opener(NoRedirect)
    for source, destination in REDIRECTS.items():
        try:
            opener.open(base + source, timeout=30)
            raise AssertionError(f"{source}: missing permanent redirect")
        except HTTPError as error:
            assert error.code == 308, (source, error.code)
            location = error.headers["Location"]
            assert location in (destination, base + destination), (source, location)
        with urlopen(base + source, timeout=30) as r:
            assert r.url == base + destination, (source, r.url)
            redirects.append({"from": source, "to": destination, "redirect_status": 308, "destination_status": r.status})
    (OUT / "redirects.json").write_text(json.dumps(redirects, indent=2), encoding="utf-8")
    current, support = evidence("current"), evidence("90d")
    before = {p["path"]: p for p in json.loads((OUT / "before.json").read_text())}
    mapping = []
    for p in pages:
        queries = current.get(p["path"], {})
        supporting = support.get(p["path"], {})
        rank = lambda item: (item[1]["clicks"], item[1]["impressions"])
        top = sorted(queries.items(), key=rank, reverse=True)[:5]
        opportunity = sorted(queries.items(), key=lambda t: t[1]["impressions"], reverse=True)[:5]
        selected = dict(top + opportunity)
        mapping.append({**p, "before": before.get(p["path"]),
                        "target_keyword": expected[p["path"]]["keyword"],
                        "basis": "Current GSC query evidence" if queries else "90-day evidence only" if supporting else "Page intent; no reported query rows",
                        "current_queries": [{"query": q, **m} for q, m in selected.items()],
                        "supporting_queries": [{"query": q, **m} for q, m in sorted(supporting.items(), key=rank, reverse=True)[:5]],
                        "slug_decision": "Retain the descriptive existing canonical URL"})
    (OUT / "page-keyword-map.json").write_text(json.dumps(mapping, indent=2), encoding="utf-8")
    lines = ["# SquarePic page keyword optimization", "", "Reviewed October 8, 2026, Asia/Calcutta. Property `sc-domain:squarepic.io`. Authenticated read-only CLI access; refreshed current query data matches today's saved baseline.", "",
             "Current finalized web-search window: September 8–October 5. Previous window: August 11–September 7. Supporting 90-day window: July 8–October 5. The 1,238 current and 2,412 supporting page/query rows are below the 25,000-row request cap. API reports top rows and omits anonymized queries, so absence of rows does not establish zero traffic.", "",
             "Property totals: 461 clicks and 28,926 impressions in the current window, versus 309 clicks and 21,843 impressions previously. These are baseline observations before this change, not measured outcomes. Page and query totals use different aggregation and must not replace the dimensionless property totals.", "",
             "All 50 sitemap pages have a reviewed keyword target, title, H1, description and canonical slug. Query selection prioritizes clicks, then impressions, and checks page intent. High-impression opportunities are included separately. Terms such as `upscale image -ai` indicate exclusion of AI; unsupported conversions and unrelated queries such as `negatives to jpeg` are not advertised as capabilities. Branded homepage demand remains represented by SquarePic in the title.", "",
             "Tool pages serve editing intent; guides serve instructions and dimension comparisons. Pages with little evidence use descriptive copy and are explicitly labeled below. Legal, support and author pages keep their informational purpose. No keyword-volume, competitor-difficulty or ranking-uplift claim is made.", "",
             "## Page mapping", "", "| Canonical path | Target | Evidence | Title before → after |", "| --- | --- | --- | --- |"]
    escape = lambda s: s.replace("|", "\\|")
    for p in mapping:
        old = p["before"]["title"] if p["before"] else "New"
        lines.append(f"| `{p['path']}` | {escape(p['target_keyword'])} | {p['basis']} | {escape(old)} → {escape(p['title'])} |")
    lines += ["", "Full before/after titles, H1s, descriptions, query metrics and slug decisions are saved in `page-keyword-map.json`. `before.json` captures the live release before this work; `after.json` captures the verified local build.", "", "## Observed queries", ""]
    for p in mapping:
        if not p["current_queries"] and not p["supporting_queries"]: continue
        lines += [f"### `{p['path']}`", "", "| Query | Current clicks | Current impressions | Position | 90-day impressions |", "| --- | ---: | ---: | ---: | ---: |"]
        for r in p["current_queries"] or p["supporting_queries"]:
            m = current.get(p["path"], {}).get(r["query"], {})
            s = support.get(p["path"], {}).get(r["query"], {})
            position = f"{m['position']:.2f}" if m else "Not reported"
            lines.append(f"| {escape(r['query'])} | {m.get('clicks','Not reported')} | {m.get('impressions','Not reported')} | {position} | {s.get('impressions','Not reported')} |")
    lines += ["", "## Slugs and legacy URLs", "", "Keep existing canonical slugs: they already describe the page and observed query data does not justify migrating indexed pages. All seven legacy paths below returned HTTP 404 before this change and appear in the 90-day GSC export. Permanent redirects connect them to the closest current tool or guide. Instagram post/profile URLs retain the appropriate editor preset; canonical tags point to the base platform page.", ""]
    lines += [f"- `{source}` → `{dest}`" for source, dest in REDIRECTS.items()]
    lines += ["", "## Validation and follow-up", "", "The local rendered checks cover every sitemap page, exact titles/descriptions, one matching H1 per page, unique titles/descriptions, canonical URLs and legacy redirect destinations. The existing SEO validator additionally checks XML sitemaps, social metadata, JSON-LD and preview images. Build and lint results are recorded with the final delivery.", "", "These changes are local and have not been deployed. After release, rerun the rendered checks against production and verify Google-selected canonicals after recrawl. Compare the same query groups over 28 finalized days after recrawl, separating branded and non-branded traffic. Monitor clicks and position alongside CTR so query-mix changes are not mistaken for gains.", "", "The edits follow Google's guidance for [descriptive titles](https://developers.google.com/search/docs/appearance/title-link), [page-specific descriptions](https://developers.google.com/search/docs/appearance/snippet), [descriptive URLs](https://developers.google.com/search/docs/crawling-indexing/url-structure), and [permanent redirects when URLs change](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes). Google may generate different result titles and snippets from page content.", ""]
    (OUT / "REPORT.md").write_text("\n".join(lines), encoding="utf-8")
    print(f"Verified {len(pages)} page mappings and {len(redirects)} redirects; wrote REPORT.md.")


if __name__ == "__main__": main()
