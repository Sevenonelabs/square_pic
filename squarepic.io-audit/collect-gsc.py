"""Collect read-only Search Console evidence without changing site configuration."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import json
import subprocess

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data" / "gsc"
DATA.mkdir(parents=True, exist_ok=True)
CLI = str(Path.home() / "AppData/Roaming/npm/gsc.cmd")
PROPERTY = "sc-domain:squarepic.io"
PERIODS = {"current": ("2026-09-08", "2026-10-05"),
           "previous": ("2026-08-11", "2026-09-07"),
           "90d": ("2026-07-08", "2026-10-05")}

def collect(task):
    name, args = task
    result = subprocess.run([CLI, *args, "--site", PROPERTY, "--format", "json"],
                            capture_output=True, text=True, encoding="utf-8", timeout=180)
    try:
        parsed = json.loads(result.stdout.lstrip("\ufeff"))
    except (ValueError, TypeError):
        parsed = {"ok": False, "exitCode": result.returncode,
                  "error": "CLI did not return JSON; raw output withheld to protect credentials"}
    (DATA / f"{name}.json").write_text(json.dumps(parsed, indent=2), encoding="utf-8")
    return {"file": name, "ok": parsed.get("ok"),
            "rows": len(parsed.get("data", {}).get("rows", [])) if isinstance(parsed.get("data"), dict) else None}

tasks = [("sitemaps", ["sitemaps", "list"])]
for name, (start, end) in PERIODS.items():
    base = ["analytics", "query", "--start", start, "--end", end, "--type", "web", "--limit", "25000"]
    for dims in (["totals", "page", "page,query", "date", "device", "country"] if name == "current"
                 else ["totals", "page", "page,query"]):
        tasks.append((f"{dims.replace(',', '-')}-{name}", base + ([] if dims == "totals" else ["--dimension", dims])))
inspect_paths = {"home": "/", "upscaler": "/upscaler", "calculator": "/image-size-calculator",
                 "compressor": "/compressor", "converter": "/converter/png-to-avif",
                 "cropper": "/cropper", "instagram": "/resize/instagram", "linkedin": "/resize/linkedin",
                 "discord": "/guides/discord-image-sizes-2026", "reels": "/guides/instagram-reels-stories-guide",
                 "square-guide": "/guides/make-image-square-without-cropping"}
for name, path in inspect_paths.items():
    tasks.append(("inspect-" + name, ["inspect", "https://www.squarepic.io" + path]))

manifest = {"collected_local_date": "2026-10-08", "report_timezone": "Asia/Calcutta", "property": PROPERTY,
            "search_type": "web", "periods": PERIODS, "row_cap": 25000,
            "data_state": "API default final; no request for preliminary data", "results": []}
with ThreadPoolExecutor(max_workers=3) as pool:
    for future in as_completed([pool.submit(collect, task) for task in tasks]):
        result = future.result()
        manifest["results"].append(result)
        (DATA / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
        print(json.dumps(result), flush=True)
