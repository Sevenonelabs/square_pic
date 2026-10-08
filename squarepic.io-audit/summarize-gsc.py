"""Build reproducible page and query tables from the saved GSC responses."""
from collections import defaultdict
import csv
import json
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data/gsc"

def read(name):
    r = json.loads((DATA / f"{name}.json").read_text(encoding="utf-8-sig"))
    if not r.get("ok"):
        raise ValueError(f"Unsuccessful response: {name}")
    return r["data"]

def group(name):
    out = defaultdict(lambda: {"clicks": 0, "impressions": 0, "weighted_position": 0})
    for row in read(name).get("rows", []):
        key = (urlsplit(row["keys"][0]).path.rstrip("/") or "/", *row["keys"][1:])
        g = out[key]
        g["clicks"] += row["clicks"]
        g["impressions"] += row["impressions"]
        g["weighted_position"] += row["position"] * row["impressions"]
    for g in out.values():
        g["ctr"] = g["clicks"] / g["impressions"] if g["impressions"] else 0
        g["position"] = g.pop("weighted_position") / g["impressions"] if g["impressions"] else 0
    return out

def family(path):
    if path == "/": return "Square maker"
    if path.startswith("/resize/"): return "Platform resizers"
    if path.startswith("/converter"): return "Converters"
    if path.startswith("/guides"): return "Guides"
    if path.startswith("/blog"): return "Legacy blog"
    if path in ["/upscaler", "/image-size-calculator", "/compressor", "/cropper"]: return "Other tools"
    return "Information/other"

def csv_file(name, records):
    if not records: return
    with (ROOT / name).open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(records[0]))
        w.writeheader()
        w.writerows(records)

current, previous, support = [group("page-" + x) for x in ["current", "previous", "90d"]]
queries, prior_queries, queries90 = [group("page-query-" + x) for x in ["current", "previous", "90d"]]
totals = {x: read("totals-" + x)["rows"][0] for x in ["current", "previous", "90d"]}
pages = []
for (path,), metrics in sorted(current.items(), key=lambda pair: pair[1]["clicks"], reverse=True):
    p = previous.get((path,), {})
    pages.append({"path": path, "family": family(path), **metrics,
                  "previous_clicks": p.get("clicks", 0), "previous_impressions": p.get("impressions", 0),
                  "support_90d_impressions": support.get((path,), {}).get("impressions", 0)})
opportunities = []
for (path, query), metrics in sorted(queries.items(), key=lambda pair: pair[1]["impressions"], reverse=True):
    if metrics["impressions"] >= 20 and 3 <= metrics["position"] <= 20:
        opportunities.append({"path": path, "query": query, **metrics,
                              "previous_impressions": prior_queries.get((path, query), {}).get("impressions", 0),
                              "support_90d_impressions": queries90.get((path, query), {}).get("impressions", 0)})
by_family = defaultdict(lambda: {"clicks": 0, "impressions": 0})
for p in pages:
    by_family[p["family"]]["clicks"] += p["clicks"]
    by_family[p["family"]]["impressions"] += p["impressions"]
query_map = {}
for p in pages:
    path = p["path"]
    matches = [(q, m) for (u, q), m in queries.items() if u == path]
    query_map[path] = [{"query": q, **m,
                        "support_90d_impressions": queries90.get((path, q), {}).get("impressions", 0)}
                       for q, m in sorted(matches, key=lambda x: x[1]["impressions"], reverse=True)[:12]]
inspections = []
for file in DATA.glob("inspect-*.json"):
    r = json.loads(file.read_text(encoding="utf-8-sig"))
    if not r.get("ok"):
        inspections.append({"file": file.name, "error": r.get("error")})
        continue
    data = r["data"]
    inspections.append({"url": data.get("url"), "verdict": data.get("verdict"),
                        **data.get("indexStatus", {})})
result = {}
result.update({"collected": "2026-10-08", "property": "sc-domain:squarepic.io",
               "periods": json.loads((DATA / "manifest.json").read_text())["periods"],
               "totals": totals, "pages": pages, "families": dict(by_family),
               "query_opportunities": opportunities, "top_queries_by_page": query_map,
               "device": read("device-current").get("rows", []),
               "countries": read("country-current").get("rows", [])[:15],
               "dates_returned": len(read("date-current").get("rows", [])),
               "inspections": inspections,
               "method_notes": ["Totals use a separate dimensionless byProperty request.",
                 "Page/query groups combine host variants by URL path; raw variants retained.",
                 "Page totals and property totals have different aggregation rules.",
                 "Query rows omit anonymized terms and API may return only top rows.",
                 "Opportunity filters are a review screen, not a predicted traffic uplift.",
                 "Stored URL inspections are not a fresh live indexing test.",
                 "No post-release performance gain is claimed."]})
(DATA / "summary.json").write_text(json.dumps(result, indent=2), encoding="utf-8")
csv_file("page-performance.csv", pages)
csv_file("query-opportunities.csv", opportunities)
print(json.dumps({"totals": totals, "top_pages": pages[:12], "opportunities": opportunities[:15],
                  "devices": result["device"], "dates_returned": result["dates_returned"],
                  "inspections": inspections}, indent=2))
