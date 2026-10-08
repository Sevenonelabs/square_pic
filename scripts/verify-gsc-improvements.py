"""Browser verification of the calculator, content routes, and image workflow."""
import argparse
import json
from pathlib import Path
import struct
import zlib
from playwright.sync_api import sync_playwright, expect


def sample_png():
    def chunk(kind, data):
        return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data))
    row = b"\x00" + b"\xff\x00\x00" * 20 + b"\x00\x00\xff" * 80 + b"\x00\xff\x00" * 20
    return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", 120, 80, 8, 2, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(row * 80)) + chunk(b"IEND", b""))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", default="http://127.0.0.1:4173")
    parser.add_argument("--output", default="docs/gsc-2026-10-07")
    args = parser.parse_args()
    out = Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    results, errors, widget_errors = [], [], []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 900}, accept_downloads=True)
        page = context.new_page()
        def record_error(error):
            stack = error.stack or str(error)
            # Playwright pageerror includes cross-origin child-frame errors.
            # Retain confirmed vendor failures separately; fail on all others.
            frames = [line.strip() for line in stack.splitlines() if line.strip().startswith("at ")]
            if frames and all("https://startupbar.co/assets/" in line for line in frames):
                widget_errors.append(stack)
            else:
                errors.append(stack)
        page.on("pageerror", record_error)

        def visit(path):
            response = page.goto(args.base + path)
            page.wait_for_load_state("networkidle")
            assert response.status == 200, (path, response.status)
            assert page.locator("h1").count() == 1, path

        visit("/image-size-calculator")
        for w, h, target, ratio, size in [
            (1920, 1080, 1280, "16:9", "1280 × 720"),
            (600, 400, 1080, "3:2", "1080 × 720"),
            (1200, 627, 1080, "400:209", "1080 × 564"),
            (1080, 1920, 720, "9:16", "720 × 1280"),
        ]:
            page.get_by_label("Width (px)", exact=True).fill(str(w))
            page.get_by_label("Height (px)", exact=True).fill(str(h))
            page.get_by_label("New width (px), keeping the same proportions").fill(str(target))
            expect(page.locator('[aria-live="polite"]').first).to_contain_text(ratio)
            expect(page.get_by_text("Resize dimensions:")).to_contain_text(size)
        results.append("Aspect ratios and proportional sizes passed for landscape, portrait, and rounding cases.")
        for invalid in ["0", "-2", "1.5", "10001"]:
            page.get_by_label("Width (px)", exact=True).fill(invalid)
            expect(page.get_by_role("status")).to_contain_text("Enter whole pixel dimensions")
            expect(page.locator("#target-width")).to_have_count(0)
        page.get_by_label("Width (px)", exact=True).fill("1")
        page.get_by_label("Height (px)", exact=True).fill("10000")
        page.get_by_label("New width (px), keeping the same proportions").fill("10000")
        expect(page.get_by_text("Choose a width that keeps both output dimensions")).to_be_visible()
        results.append("Zero, negative, decimal, excessive input, and excessive output dimensions are rejected.")
        page.get_by_label("Width (px)", exact=True).fill("1920")
        page.get_by_label("Height (px)", exact=True).fill("1080")
        page.get_by_label("New width (px), keeping the same proportions").fill("1280")
        expect(page.get_by_role("heading", name="Presets with the same aspect ratio")).to_be_visible()
        page.screenshot(path=str(out / "calculator-desktop.png"), full_page=True)
        page.set_viewport_size({"width": 390, "height": 844})
        page.screenshot(path=str(out / "calculator-mobile.png"), full_page=True)
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), "Calculator mobile overflow"
        results.append("Calculator keyboard labels, matching ratios, and mobile layout passed.")

        for path in ["/guides/make-image-square-without-cropping", "/guides/instagram-reels-stories-guide", "/resize/instagram", "/resize/linkedin", "/upscaler"]:
            visit(path)
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (path, "mobile overflow")
            assert page.locator('link[rel="canonical"]').get_attribute("href") == "https://www.squarepic.io" + path
            for text in page.locator('script[type="application/ld+json"]').all_text_contents():
                json.loads(text)
            if path == "/guides/make-image-square-without-cropping":
                expect(page.get_by_role("img", name="Fitting a landscape photo versus cropping it to a square")).to_be_visible()
                page.screenshot(path=str(out / "square-guide-mobile.png"), full_page=True)
            if path == "/guides/instagram-reels-stories-guide":
                schema = [json.loads(s) for s in page.locator('script[type="application/ld+json"]').all_text_contents()]
                faq = next(s for s in schema if s.get("@type") == "FAQPage")
                for q in faq["mainEntity"]:
                    expect(page.get_by_role("heading", name=q["name"], exact=True).last).to_be_visible()
        visit("/guides?category=photo-editing")
        expect(page.get_by_role("link", name="Make an Image Square Without Cropping: A Photo Guide", exact=False)).to_be_visible()
        response = context.request.get(args.base + "/blog/how-to-square-image-for-any-platform", max_redirects=0)
        assert response.status == 308
        assert response.headers["location"].endswith("/guides/make-image-square-without-cropping")
        results.append("New guide discovery, legacy redirect, canonical URLs, visible FAQs, and mobile content layouts passed.")

        page.set_viewport_size({"width": 1280, "height": 900})
        visit("/")
        page.locator('input[type="file"]').first.set_input_files({"name": "landscape.png", "mimeType": "image/png", "buffer": sample_png()})
        expect(page.locator("canvas").first).to_be_visible()
        page.get_by_role("button", name="Solid", exact=True).click()
        page.locator('input[type="range"]').first.focus()
        page.locator('input[type="range"]').first.press("Home")
        expect(page.locator('input[type="range"]').first).to_have_value("0")
        page.wait_for_function("document.querySelector('canvas').getContext('2d').getImageData(1,60,1,1).data[0] > 240")
        colors = page.locator("canvas").first.evaluate("c => {const x=c.getContext('2d'); return {width:c.width,height:c.height,left:[...x.getImageData(1,60,1,1).data],right:[...x.getImageData(118,60,1,1).data]}}")
        assert colors["width"] == colors["height"] == 120, colors
        assert colors["left"][:3] == [255, 0, 0] and colors["right"][:3] == [0, 255, 0], colors
        page.get_by_role("button", name="Crop", exact=True).click()
        page.wait_for_function("document.querySelector('canvas').getContext('2d').getImageData(1,60,1,1).data[2] > 240")
        cropped = page.locator("canvas").first.evaluate("c => [...c.getContext('2d').getImageData(1,60,1,1).data]")
        assert cropped[:3] == [0, 0, 255], cropped
        expect(page.get_by_role("button", name="Download & Share", exact=True)).to_be_enabled()
        results.append("Editor upload and square canvas passed; Solid preserves both scene edges and Crop trims them as documented.")

        visit("/upscaler")
        page.locator('input[type="file"]').first.set_input_files({"name": "landscape.png", "mimeType": "image/png", "buffer": sample_png()})
        expect(page.get_by_role("button", name="Upscale Image", exact=True)).to_be_visible()
        page.get_by_role("button", name="Upscale Image", exact=True).click()
        expect(page.get_by_role("button", name="Download 2x", exact=True)).to_be_visible()
        with page.expect_download() as download_info:
            page.get_by_role("button", name="Download 2x", exact=True).click()
        download = download_info.value
        content = Path(download.path()).read_bytes()
        assert content[:8] == b"\x89PNG\r\n\x1a\n", "Upscaler export is not PNG"
        assert struct.unpack(">II", content[16:24]) == (240, 160)
        results.append("Upscaler upload, 2x processing, and actual 240 × 160 PNG download passed.")
        expect(page.locator('iframe[data-startupbar-frame="1"]')).to_have_count(1)
        assert not errors, errors
        results.append("Repeated page loads passed without SquarePic page errors; StartupBar remained enabled.")
        browser.close()
    report = {"ok": True, "checks": results, "pageErrors": errors,
              "externalWidgetErrors": widget_errors,
              "limitation": "StartupBar's hosted iframe reports its own React hydration errors. Confirmed vendor stack traces are recorded separately; the integration is unchanged." if widget_errors else None}
    (out / "browser-verification.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
