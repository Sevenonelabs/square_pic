"""Reproduce the Discord baseline and wider opportunity screen from saved GSC responses."""
import json
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path("docs/gsc-2026-10-07")
GUIDE = "/guides/discord-image-sizes-2026"
QUERIES = ["discord server banner size", "discord server splash image not showing on invite link",
           "discord server icon size", "discord banner size"]


def combine(name):
    response = json.loads((ROOT / "data" / name).read_text(encoding="utf-8-sig"))
    if not response.get("ok"):
        raise ValueError(response.get("error"))
    rows = response["data"].get("rows", [])
    if len(rows) >= 10000:
        raise ValueError(f"{name}: fetch more rows before reporting")
    grouped = defaultdict(lambda: {"clicks": 0, "impressions": 0, "weightedPosition": 0})
    for row in rows:
        key = (urlsplit(row["keys"][0]).path or "/", *row["keys"][1:])
        g = grouped[key]
        g["clicks"] += row["clicks"]
        g["impressions"] += row["impressions"]
        g["weightedPosition"] += row["position"] * row["impressions"]
    for g in grouped.values():
        g["ctr"] = g["clicks"] / g["impressions"]
        g["position"] = g.pop("weightedPosition") / g["impressions"]
    return grouped


def main():
    current = combine("page-queries-discord-refresh-current.json")
    previous = combine("discord-queries-previous.json")
    support = combine("discord-queries-90d.json")
    pages = combine("discord-pages-current.json")
    old_pages = combine("discord-pages-previous.json")
    selected = sorted([(k, g) for k, g in current.items()
                       if g["impressions"] >= 25 and 3 <= g["position"] <= 20 and g["ctr"] < .02],
                      key=lambda item: item[1]["impressions"], reverse=True)
    baseline = {
        "collected": "2026-10-07", "property": "sc-domain:squarepic.io", "searchType": "web",
        "current": {"start": "2026-09-07", "end": "2026-10-04"},
        "previous": {"start": "2026-08-10", "end": "2026-09-06"},
        "support": {"start": "2026-07-07", "end": "2026-10-04"},
        "queryMapping": [{"query": q, "owner": GUIDE, "current": current.get((GUIDE, q)),
                          "previous": previous.get((GUIDE, q)), "support90d": support.get((GUIDE, q))}
                         for q in QUERIES],
        "pages": [{"path": path, "current": pages.get((path,)), "previous": old_pages.get((path,))}
                  for path in [GUIDE, "/resize/discord"]],
        "screen": {"minimumImpressions": 25, "maximumCtr": .02, "positionRange": [3, 20]},
        "screenedOpportunities": [{"page": k[0], "query": k[1], **g} for k, g in selected],
        "deployment": "pending",
    }
    (ROOT / "discord-keyword-baseline.json").write_text(
        json.dumps(baseline, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("Wrote discord-keyword-baseline.json")
    for item in baseline["queryMapping"]:
        print(item["query"], item["current"])


if __name__ == "__main__":
    main()
