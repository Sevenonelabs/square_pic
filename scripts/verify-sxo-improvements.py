"""Verify SXO output promises against downloaded files and mobile editor behavior.

Run: python scripts/verify-sxo-improvements.py http://localhost:3010 [label]
Uses the existing Playwright/Pillow tooling; does not send production analytics.
"""
import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3010"
OUT = Path("squarepic.io-audit/sxo/verification")
if len(sys.argv) > 2:
    OUT = OUT / sys.argv[2]
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = OUT / "test-logo.png"
logo = Image.new("RGBA", (400, 200), (0, 0, 0, 0))
draw = ImageDraw.Draw(logo)
draw.rectangle((0, 50, 79, 149), fill=(255, 0, 0, 255))
draw.rectangle((320, 50, 399, 149), fill=(0, 0, 255, 255))
logo.save(SOURCE)
rows = []


def download(page, fmt, name):
    page.get_by_role("button", name="Download & Share", exact=True).click()
    expect(page.get_by_role("dialog")).to_be_visible()
    with page.expect_download() as pending:
        page.get_by_role("button", name=f"Download {fmt}", exact=True).click()
    dest = OUT / name
    pending.value.save_as(str(dest))
    return Image.open(dest)


def viewport_check(page):
    page.wait_for_timeout(400)  # ResizeObserver and header settle after load.
    metrics = page.evaluate("""() => {
      const box = s => { const r=document.querySelector(s).getBoundingClientRect(); return {top:r.top,bottom:r.bottom,width:r.width,height:r.height}; };
      return {width:innerWidth,height:innerHeight,docWidth:document.documentElement.scrollWidth,
        preview:box('canvas'),export:box('.editor-export'),
        styles:[...document.querySelectorAll('.editor-settings button')].slice(0,4).map(b=>b.getBoundingClientRect().height)};
    }""")
    assert metrics["docWidth"] <= metrics["width"], metrics
    assert 0 <= metrics["preview"]["top"] < metrics["preview"]["bottom"] <= metrics["height"], metrics
    assert metrics["export"]["bottom"] <= metrics["height"], metrics
    if metrics["width"] < 768:
        assert all(height >= 44 for height in metrics["styles"]), metrics
    return metrics


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path="C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
    for width, height in [(1366, 900), (390, 844), (320, 568)]:
        context = browser.new_context(viewport={"width": width, "height": height}, accept_downloads=True)
        context.route("**/google-analytics.com/**", lambda route: route.abort())
        context.route("**/googletagmanager.com/**", lambda route: route.abort())
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(BASE, wait_until="networkidle")
        page.evaluate("() => { window.events=[]; window.gtag=(...args)=>events.push(args); }")
        # One compact comparison immediately follows the editor, before tool cards.
        expect(page.locator('.image-editor-workspace + section')).to_contain_text("Keep the whole photo")
        initial = page.evaluate("""() => ({docWidth:document.documentElement.scrollWidth,width:innerWidth,
          uploadBottom:document.querySelector('label[for="dz-upload"]').getBoundingClientRect().bottom,
          exportBottom:document.querySelector('.editor-export').getBoundingClientRect().bottom})""")
        assert initial['docWidth'] <= width, initial
        if height >= 700:
            assert initial['uploadBottom'] <= height and initial['exportBottom'] <= height, initial
        page.screenshot(path=str(OUT / f"initial-{width}.png"))
        page.locator('input[type="file"]').first.set_input_files(str(SOURCE.resolve()))
        page.get_by_role("button", name="Transparent", exact=True).click()
        expect(page.get_by_role("button", name="PNG", exact=True)).to_have_attribute("aria-pressed", "true")
        expect(page.get_by_role("button", name="JPEG", exact=True)).to_be_disabled()
        expect(page.locator("canvas")).to_have_class(re.compile("transparency-grid"))
        edge = page.get_by_label("Custom square edge in pixels", exact=True)
        edge.fill("800")
        page.get_by_role("button", name="Apply", exact=True).click()
        expect(page.locator('.editor-export [role="status"]')).to_contain_text("800 x 800")
        transparent_metrics = viewport_check(page)
        with download(page, "PNG", f"transparent-{width}.png") as image:
            assert image.size == (800, 800) and image.format == "PNG"
            rgba = image.convert("RGBA")
            assert rgba.getpixel((400, 20))[3] == 0  # Square padding stays empty.
            assert rgba.getpixel((400, 400))[3] == 0  # Source transparency stays empty.
            assert rgba.getpixel((100, 400)) == (255, 0, 0, 255)  # Both edge subjects survive.
            assert rgba.getpixel((700, 400)) == (0, 0, 255, 255)
        for invalid in ["5000", "0", "-1", "1.5"]:
            edge.fill(invalid)
            expect(edge).to_have_attribute("aria-invalid", "true")
            expect(page.get_by_role("button", name="Apply", exact=True)).to_be_disabled()
            expect(page.locator('.editor-export [role="status"]')).to_contain_text("800 x 800")
            expect(page.locator("#square-edge-help")).to_contain_text("1 to 4096")
        edge.fill("800")
        # Selecting a color restores an opaque background and other formats.
        page.get_by_role("button", name="Solid", exact=True).click()
        page.get_by_label("Background color", exact=True).fill("#00ff00")
        page.get_by_role("button", name="PNG", exact=True).click()
        with download(page, "PNG", f"solid-{width}.png") as image:
            assert image.convert("RGBA").getpixel((400, 20)) == (0, 255, 0, 255)
            assert image.convert("RGBA").getpixel((400, 400)) == (0, 255, 0, 255)
        for preset in [1080, 1200]:
            page.get_by_role("button", name=f"{preset} × {preset}", exact=True).click()
            with download(page, "PNG", f"preset-{preset}-{width}.png") as image:
                assert image.size == (preset, preset)
        page.get_by_role("button", name="Crop", exact=True).click()
        page.get_by_role("button", name="WebP", exact=True).click()
        with download(page, "WEBP", f"crop-{width}.webp") as image:
            assert image.format == "WEBP" and image.size == (1200, 1200)
        # Platform presets still support other shapes.
        page.get_by_role("button", name="Instagram", exact=True).click()
        page.get_by_role("button", name="Stories/Reels", exact=False).click()
        page.get_by_role("button", name="JPEG", exact=True).click()
        with download(page, "JPEG", f"story-{width}.jpg") as image:
            assert image.size == (1080, 1920) and image.format == "JPEG"
        # Original dimensions larger than the limit display the actual capped output.
        large = OUT / "large-source.png"
        Image.new("RGB", (5000, 1000), "red").save(large)
        page.get_by_role("button", name="New Image", exact=True).click()
        page.locator('input[type="file"]').first.set_input_files(str(large.resolve()))
        page.get_by_role("button", name="Original size", exact=True).click()
        expect(page.locator('.editor-export [role="status"]')).to_contain_text("4096 x 4096")
        expect(page.locator('.editor-export')).to_contain_text("4096 px limit")
        if width == 1366:
            page.get_by_role("button", name="PNG", exact=True).click()
            with download(page, "PNG", "large-capped.png") as image:
                assert image.size == (4096, 4096)
        # Check event dimensions without sending events to an analytics service.
        events = page.evaluate("events")
        downloads = [event[2] for event in events if event[1] == "tool_download"]
        assert any(event.get("editor_mode") == "transparent" for event in downloads), events
        assert all(event["device_layout"] == ("mobile" if width < 768 else "desktop") for event in downloads)
        assert all(set(event) <= {"tool_name", "device_layout", "editor_mode", "output_format", "input_source"} for _, _, event in events)
        page.get_by_role("button", name="New Image", exact=True).click()
        page.get_by_role("button", name="Try sample image", exact=True).click()
        expect(page.locator("canvas")).to_be_visible()
        assert any(event[2].get("input_source") == "sample" for event in page.evaluate("events"))
        page.screenshot(path=str(OUT / f"editor-{width}.png"))
        assert not errors, errors
        rows.append({"viewport": [width, height], "initial": initial, "transparent": transparent_metrics, "downloads": downloads, "page_errors": errors})
        print(f"PASS: {width}x{height} transparent PNG, custom size, invalid input, solid color, presets, crop, story, limit, sample, analytics", flush=True)
        context.close()
    browser.close()
(OUT / "results.json").write_text(json.dumps(rows, indent=2), encoding="utf-8")
