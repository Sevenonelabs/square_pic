"""Verify intent-to-editor journeys and actual exports against a local build.

python scripts/verify-keyword-intent.py http://localhost:3100
Requires the same Pillow, Playwright and Chromium as verify-tools.py.
Analytics and the referral widget are blocked for this controlled local run.
"""
import io
import json
import os
import sys
from pathlib import Path
from urllib.parse import urlsplit

from PIL import Image
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"
OUT = Path("squarepic.io-audit/keyword-intent/verification")
OUT.mkdir(parents=True, exist_ok=True)
checks, exports, errors = [], [], []
fixtures = {}
for fmt, extension in [("PNG", "png"), ("JPEG", "jpg"), ("WEBP", "webp")]:
    image = Image.open("public/examples/square-source.png")
    if fmt == "JPEG":
        image = image.convert("RGB")
    buffer = io.BytesIO()
    image.save(buffer, format=fmt)
    fixtures[extension] = {"name": f"artwork.{extension}", "mimeType": f"image/{'jpeg' if extension == 'jpg' else extension}", "buffer": buffer.getvalue()}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path=os.getenv(
        "CHROME_PATH", "C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe"))
    context = browser.new_context(viewport={"width": 1366, "height": 900}, accept_downloads=True)
    local_host = urlsplit(BASE).hostname
    context.route("**/*", lambda route: route.continue_() if urlsplit(route.request.url).hostname == local_host else route.abort())
    page = context.new_page()
    page.on("pageerror", lambda error: errors.append(str(error)))

    def visit(path):
        response = page.goto(BASE + path, wait_until="load")
        assert response.status == 200, (path, response.status)
        # Next's route announcer mounts on the client. Server-rendered file
        # inputs can accept a file before React has attached their handlers.
        page.locator("#__next-route-announcer__").wait_for(state="attached")

    def export(name, action, fmt, size):
        with page.expect_download() as download:
            action()
        dest = OUT / (name + "-" + download.value.suggested_filename)
        download.value.save_as(str(dest))
        with Image.open(dest) as result:
            result.load()
            assert result.format == fmt and result.size == size, (name, result.format, result.size)
            exports.append({"test": name, "format": result.format, "dimensions": list(result.size)})

    # Click the exact match, ratio match and platform-browser results. A valid
    # query string alone would not prove the destination exported the right size.
    journeys = [
        ("exact", 1200, 627, "/resize/linkedin?preset=landscape#resizer", (1200, 627)),
        ("ratio", 720, 1280, "/resize/instagram?preset=stories#resizer", (1080, 1920)),
        ("browse", 600, 400, "/resize/twitch?preset=panel#resizer", (320, 160)),
    ]
    for kind, width, height, target, size in journeys:
        visit("/image-size-calculator")
        page.get_by_label("Width (px)", exact=True).fill(str(width))
        page.get_by_label("Height (px)", exact=True).fill(str(height))
        if kind == "browse":
            page.get_by_role("button", name="Twitch", exact=True).click()
        page.locator(f'a[href="{target}"]').first.click()
        expect(page).to_have_url(BASE + target)
        page.locator('input[type="file"]').first.set_input_files(fixtures["png"])
        page.get_by_role("button", name="Download & Share", exact=True).click()
        export("calculator-" + kind, lambda: page.get_by_role("button", name="Download PNG", exact=True).click(), "PNG", size)
        # The bottom CTA scrolls to the same editor without losing the photo.
        page.get_by_role("link", name="Resize Your", exact=False).last.click()
        expect(page).to_have_url(BASE + target)
        expect(page.locator("canvas").first).to_be_visible()
    checks.append("Calculator exact, ratio and browse links select presets and export the intended dimensions; bottom CTAs retain the loaded image.")

    # Links from guides open the requested workflow, including the personal
    # LinkedIn cover and the separate Discord invite background.
    for guide, target, size in [
        ("instagram-reels-stories-guide", "/resize/instagram?preset=stories#resizer", (1080, 1920)),
        ("discord-image-sizes-2026", "/resize/discord?preset=serverSplash#resizer", (1920, 1080)),
        ("linkedin-image-sizes-2026", "/resize/linkedin?preset=personalCover#resizer", (1584, 396)),
        ("instagram-feed-sizes-2026", "/resize/instagram?preset=portrait#resizer", (1080, 1350)),
    ]:
        visit("/guides/" + guide)
        page.locator(f'a[href="{target}"]').first.click()
        page.locator('input[type="file"]').first.set_input_files(fixtures["png"])
        page.get_by_role("button", name="Download & Share", exact=True).click()
        export(guide, lambda: page.get_by_role("button", name="Download PNG", exact=True).click(), "PNG", size)
    checks.append("Four guide links retain the placement through an actual image download.")

    # The same dimensions occur on different platforms. Their shared size must
    # not make a LinkedIn profile appear as an X profile in the selected label.
    visit("/resize/linkedin?preset=profile#resizer")
    page.locator('input[type="file"]').first.set_input_files(fixtures["png"])
    expect(page.get_by_text("LinkedIn - Profile Picture", exact=True)).to_be_visible()
    expect(page.get_by_role("button", name="LinkedIn", exact=True)).to_have_attribute("aria-pressed", "true")
    checks.append("A shared square dimension retains the selected LinkedIn platform label.")

    # Every advertised converter pair must produce its named format.
    pairs = ["png-to-jpg", "jpg-to-png", "png-to-webp", "jpg-to-webp", "webp-to-png", "webp-to-jpg", "png-to-ico", "jpg-to-ico"]
    for pair in pairs:
        source, target = pair.split("-to-")
        visit("/converter/" + pair)
        page.locator('input[type="file"]').first.set_input_files(fixtures[source])
        page.get_by_role("button", name="Convert All", exact=True).click()
        fmt = {"jpg": "JPEG", "png": "PNG", "webp": "WEBP", "ico": "ICO"}[target]
        export(pair, lambda: page.get_by_role("button", name="Download", exact=True).click(), fmt, (256, 171) if target == "ico" else (600, 400))
        section = page.get_by_role("heading", name="Other conversions", exact=False).locator("..")
        assert all(link.get_attribute("href").split("/")[-1] in pairs for link in section.get_by_role("link").all())
    for pair in ["png-to-avif", "jpg-to-avif", "webp-to-avif", "png-to-gif", "jpg-to-gif", "webp-to-gif"]:
        visit("/converter/" + pair)
        expect(page.get_by_role("heading", level=1)).to_contain_text("unavailable")
        expect(page.locator('input[type="file"]')).to_have_count(0)
    checks.append("All eight supported converter pairs decode in the named format; six unsupported pairs disclose unavailability.")

    # The assets on the upscaler page are the original output files, including
    # their alpha channels. Next Image's resized previews alone cannot prove it.
    visit("/upscaler")
    for filename, size in [("square-source", (600, 400)), ("upscale-2x", (1200, 800)), ("upscale-4x", (2400, 1600))]:
        response = context.request.get(BASE + f"/examples/{filename}.png")
        assert response.status == 200 and response.headers["content-type"].startswith("image/png")
        with Image.open(io.BytesIO(response.body())) as image:
            image.load()
            assert image.format == "PNG" and image.size == size
            assert image.getchannel("A").getextrema() == (0, 255)
    for route in ["/upscaler", "/cropper"]:
        visit(route)
        page.locator('input[type="file"]').first.set_input_files({"name": "invalid.txt", "mimeType": "text/plain", "buffer": b"not an image"})
        expect(page.locator('p[role="alert"]')).to_contain_text("Choose an image file")
    checks.append("Upscaler example files have correct PNG dimensions and transparency; cropper and upscaler report unsupported inputs.")

    routes = ["/", "/upscaler", "/image-size-calculator", "/cropper", "/resize/instagram", "/resize/linkedin", "/resize/discord", "/resize/twitch",
              "/guides/make-image-square-without-cropping", "/guides/instagram-feed-sizes-2026", "/guides/instagram-reels-stories-guide", "/guides/linkedin-image-sizes-2026", "/guides/discord-image-sizes-2026"]
    for width in [320, 390, 1366]:
        page.set_viewport_size({"width": width, "height": 900})
        for route in routes:
            visit(route)
            assert page.locator("h1").count() == 1, route
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (route, width)
            canonical = page.locator('link[rel="canonical"]').get_attribute("href")
            assert canonical == "https://www.squarepic.io" + (route if route != "/" else ""), (route, canonical)
            for text in page.locator('script[type="application/ld+json"]').all_text_contents():
                json.loads(text)
            if route in ["/upscaler", "/resize/twitch", "/image-size-calculator"] and width in [390, 1366]:
                # Full-page screenshots do not trigger below-fold lazy images.
                # Scroll them into view and decode them before capturing.
                for picture in page.locator("img").all():
                    picture.scroll_into_view_if_needed()
                    picture.evaluate("image => image.decode()")
                page.evaluate("async () => { await document.fonts.ready; await Promise.all(document.getAnimations().filter(a => Number.isFinite(a.effect.getComputedTiming().endTime)).map(a => a.finished.catch(() => {}))); }")
                page.evaluate("window.scrollTo(0, 0)")
                page.screenshot(path=str(OUT / f"{route.strip('/')}-{width}.png"), full_page=True)
    checks.append("Thirteen priority pages have one H1, canonical metadata, parseable JSON-LD and no overflow at 320, 390 and 1366 pixels.")
    assert not errors, errors
    context.close()
    browser.close()

report = {"ok": True, "base": BASE, "checks": checks, "exports": exports, "page_errors": errors,
          "limitations": ["Local Chromium checks with analytics and referral traffic blocked.", "No production deployment, platform recrawl or organic-outcome measurement in this run."]}
(OUT / "results.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps(report, indent=2))
