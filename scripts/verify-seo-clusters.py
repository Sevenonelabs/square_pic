"""Check rendered article links, hub coverage and converter indexability."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import urlopen
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.article = False
        self.related = False
        self.links = set()
        self.contextual_links = set()
        self.robots = []
        self.schemas = []
        self.schema = None
        self.h1_count = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "article":
            self.article = True
        if tag == "section" and attrs.get("aria-label") == "Related guides":
            self.related = True
        if tag == "h1":
            self.h1_count += 1
        if tag == "meta" and attrs.get("name") == "robots":
            self.robots.append(attrs.get("content", ""))
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.schema = ""
        if tag == "a" and self.article:
            href = attrs.get("href", "")
            parts = urlsplit(href)
            if href.startswith("/") and not parts.netloc:
                self.links.add(parts.path)
                if not self.related:
                    self.contextual_links.add(parts.path)

    def handle_endtag(self, tag):
        if tag == "article":
            self.article = False
        if tag == "section":
            self.related = False
        if tag == "script" and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None

    def handle_data(self, data):
        if self.schema is not None:
            self.schema += data


def verify(base, output):
    def fetch(path):
        with urlopen(base.rstrip("/") + path, timeout=60) as response:
            assert response.status == 200, (path, response.status)
            assert urlsplit(response.url).path == path, (path, response.url)
            return response.read().decode()

    sitemap = ET.fromstring(fetch("/sitemap.xml"))
    paths = {urlsplit(node.text).path or "/" for node in sitemap.findall(".//{*}loc")}
    guide_paths = sorted(path for path in paths if path.startswith("/guides/"))
    assert len(guide_paths) >= 20, "Guide coverage unexpectedly decreased"

    def parse(path):
        page = Page()
        page.feed(fetch(path))
        assert page.h1_count == 1, (path, page.h1_count)
        return path, page

    with ThreadPoolExecutor(max_workers=4) as pool:
        pages = dict(pool.map(parse, guide_paths))
    graph = {path: sorted(page.links) for path, page in pages.items()}
    incoming = {path: sorted(source for source, links in graph.items() if source != path and path in links) for path in pages}
    for path, links in graph.items():
        assert len(incoming[path]) >= 3, (path, "Fewer than 3 article sources", incoming[path])
        page_links = {link for link in links if not Path(link).suffix}
        assert page_links.issubset(paths), (path, "Links outside sitemap", page_links - paths)

    platform_slugs = ["instagram-feed-sizes", "linkedin-image-sizes", "youtube-banner-thumbnail-sizes", "tiktok-image-sizes", "facebook-image-sizes", "pinterest-image-sizes", "discord-image-sizes"]
    hub_checks = []
    for year in (2026, 2027):
        hub = f"/guides/social-media-image-sizes-{year}"
        spokes = {f"/guides/{slug}-{year}" for slug in platform_slugs} | {"/guides/instagram-reels-stories-guide"}
        for spoke in spokes:
            assert spoke in pages[hub].contextual_links, (hub, "Missing spoke link", spoke)
            assert hub in pages[spoke].contextual_links, (spoke, "Missing contextual hub link", hub)
        lists = [schema for schema in pages[hub].schemas if schema.get("@type") == "ItemList"]
        assert len(lists) == 1, (hub, "Missing or duplicate ItemList")
        listed = {urlsplit(item["url"]).path for item in lists[0]["itemListElement"]}
        assert listed == spokes, (hub, "ItemList does not match spokes", listed ^ spokes)
        hub_checks.append({"hub": hub, "spokes": len(spokes), "bidirectional_contextual_links": len(spokes) * 2})

    excluded = [f"/converter/{source}-to-{target}" for source in ("png", "jpg", "webp") for target in ("gif", "avif")]
    for path in excluded:
        assert path not in paths, (path, "Unavailable conversion in sitemap")
        _, page = parse(path)
        robots = ",".join(page.robots)
        assert "noindex" in robots and "nofollow" not in robots, (path, robots)
    supported = sorted(path for path in paths if path.startswith("/converter/"))
    assert len(supported) == 8, supported
    for path in supported:
        _, page = parse(path)
        assert "noindex" not in ",".join(page.robots), (path, page.robots)

    result = {"base": base, "guides_checked": len(pages), "guide_links": sum(sum(link in pages and link != path for link in links) for path, links in graph.items()), "minimum_incoming_articles": min(map(len, incoming.values())), "hubs": hub_checks, "excluded_converters": excluded, "supported_converters_checked": len(supported), "graph": graph, "incoming_articles": incoming}
    Path(output).write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: value for key, value in result.items() if key not in ("graph", "incoming_articles")}, indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", default="http://localhost:4180")
    parser.add_argument("--output", default="docs/seo-cluster-2026-10-09/cluster-verification.json")
    args = parser.parse_args()
    verify(args.base, args.output)
