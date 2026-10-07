"""Validate the built app's crawl metadata and sitemap XML using Python's stdlib."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import struct
import subprocess
import time
from urllib.parse import urljoin, urlsplit
from urllib.request import urlopen
import xml.etree.ElementTree as ET

NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9",
      "image": "http://www.google.com/schemas/sitemap-image/1.1"}
ORIGIN = "https://www.squarepic.io"


class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta, self.canonicals, self.title = {}, [], ""
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "meta":
            key = attrs.get("name") or attrs.get("property")
            if key:
                self.meta.setdefault(key, []).append(attrs.get("content", ""))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href", ""))

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def has_howto(value):
    if isinstance(value, dict):
        types = value.get("@type", [])
        if "HowTo" in ([types] if isinstance(types, str) else types):
            return True
        return any(has_howto(v) for v in value.values())
    return isinstance(value, list) and any(has_howto(v) for v in value)


def validate(base, output=None):
    def fetch(path):
        with urlopen(urljoin(base, path), timeout=30) as response:
            assert response.status == 200, f"{path}: HTTP {response.status}"
            expected = urljoin(base, path)
            assert response.url == expected, f"{path}: redirects to {response.url}"
            return response.read(), response.headers

    robots, _ = fetch("/robots.txt")
    declared = re.findall(r"^Sitemap:\s*(\S+)", robots.decode(), re.M)
    assert set(declared) == {ORIGIN + "/sitemap.xml", ORIGIN + "/sitemap-images"}, declared
    roots = []
    for url in declared:
        assert urlsplit(url).netloc == urlsplit(ORIGIN).netloc, url
        body, headers = fetch(urlsplit(url).path)
        assert "xml" in headers.get("Content-Type", ""), url
        root = ET.fromstring(body)  # Fails on bare ampersands, malformed tags, or invalid entities.
        assert root.tag == "{" + NS["sm"] + "}urlset", url
        roots.append(root)
    sitemap = roots[declared.index(ORIGIN + "/sitemap.xml")]
    urls = [node.text for node in sitemap.findall("sm:url/sm:loc", NS)]
    assert urls and len(urls) == len(set(urls)), "Empty or duplicate sitemap URLs"

    def page(url):
        assert url == ORIGIN or url.startswith(ORIGIN + "/"), url
        path = urlsplit(url).path or "/"
        body, headers = fetch(path)
        html = body.decode()
        head = Head()
        head.feed(html)
        assert head.canonicals == [url], f"{path}: canonicals {head.canonicals}"
        assert 0 < len(head.title) <= 60, f"{path}: title {len(head.title)} chars"
        description = head.meta.get("description", [])
        assert len(description) == 1 and 0 < len(description[0]) <= 160, f"{path}: description {description}"
        assert "noindex" not in ",".join(head.meta.get("robots", [])), path
        for key in ("og:title", "twitter:title"):
            assert head.meta.get(key) == [head.title], f"{path}: {key} differs from title"
        for key in ("og:description", "twitter:description"):
            assert head.meta.get(key) == description, f"{path}: {key} differs from description"
        assert head.meta.get("og:url") == [url], f"{path}: og:url"
        assert head.meta.get("og:image:alt") and head.meta.get("twitter:image:alt"), f"{path}: missing image alt"
        images = head.meta.get("og:image", [])
        assert len(images) == 1 and head.meta.get("twitter:image") == images, f"{path}: missing/mismatched images"
        assert images[0].startswith(ORIGIN + "/"), f"{path}: image host"
        for data in re.findall(r'<script\b[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S):
            assert not has_howto(json.loads(data)), f"{path}: HowTo JSON-LD"
        assert "Content-Security-Policy" in headers, f"{path}: missing CSP"
        return {"path": path, "title": head.title, "description": description[0],
                "image": images[0], "width": head.meta.get("og:image:width"),
                "height": head.meta.get("og:image:height")}

    with ThreadPoolExecutor(max_workers=6) as pool:
        pages = list(pool.map(page, urls))
    sizes = {}
    for url in sorted({p["image"] for p in pages}):
        body, headers = fetch(urlsplit(url).path)
        assert headers.get("Content-Type", "").startswith("image/"), url
        assert body[:8] == b"\x89PNG\r\n\x1a\n", url
        sizes[url] = struct.unpack(">II", body[16:24])
    for p in pages:
        w, h = sizes[p["image"]]
        assert p["width"] == [str(w)] and p["height"] == [str(h)], f"{p['path']}: image dimensions"
    image_sitemap = roots[declared.index(ORIGIN + "/sitemap-images")]
    for entry in image_sitemap.findall("sm:url", NS):
        assert entry.findtext("sm:loc", namespaces=NS) in urls, "Image sitemap page missing from sitemap"
        images = entry.findall("image:image/image:loc", NS)
        assert images, "Image sitemap entry without image"
        for image in images:
            assert image.text.startswith(ORIGIN + "/"), image.text
            fetch(urlsplit(image.text).path)
        for deprecated in ("title", "caption", "geo_location", "license"):
            assert entry.find(f"image:image/image:{deprecated}", NS) is None, deprecated
    llms, _ = fetch("/llms.txt")
    llms = llms.decode("utf-8-sig")
    assert llms.startswith("# SquarePic\n") and re.search(r"^> .+", llms, re.M), "llms summary"
    links = re.findall(r"\[[^]]+\]\((https://[^)]+)\)", llms)
    assert links and {u.rstrip("/") for u in links}.issubset(set(urls)), "llms links outside sitemap"
    result = {"base": base, "pages_checked": len(pages), "sitemaps_valid": len(roots),
              "preview_images_checked": len(sizes), "llms_links_checked": len(links), "pages": pages}
    if output:
        Path(output).write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(f"SEO checks passed: {len(pages)} pages, {len(roots)} valid XML sitemaps, {len(sizes)} preview images, {len(links)} llms links.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", default="http://localhost:4173")
    parser.add_argument("--output")
    parser.add_argument("--start-server", action="store_true")
    args = parser.parse_args()
    server = None
    log = None
    try:
        if args.start_server:
            assert urlsplit(args.base).hostname in ("localhost", "127.0.0.1"), "Use a local base with --start-server"
            log = open("seo-server.log", "w", encoding="utf-8")
            server = subprocess.Popen(["node", "node_modules/next/dist/bin/next", "start", "--port", str(urlsplit(args.base).port or 4173)], stdout=log, stderr=log)
            deadline = time.monotonic() + 45
            while True:
                if server.poll() is not None:
                    raise RuntimeError("Next server exited; see seo-server.log")
                try:
                    with urlopen(args.base, timeout=2):
                        break
                except OSError:
                    if time.monotonic() >= deadline:
                        raise RuntimeError("Next server did not start; see seo-server.log")
                    time.sleep(0.25)
        validate(args.base, args.output)
    finally:
        if server:
            server.terminate()
            try:
                server.wait(timeout=10)
            except subprocess.TimeoutExpired:
                server.kill()
                server.wait()
        if log:
            log.close()
