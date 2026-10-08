"""Regressions for tool bugs found on 2026-10-08.

Run with next dev/start: python scripts/verify-tool-bugs.py http://localhost:3110
Requires the same Pillow/Playwright dependencies as verify-tools.py.
"""
import io
import os
import re
import sys
import zipfile
from pathlib import Path

from PIL import Image
from playwright.sync_api import expect, sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3110"
OUT = Path("squarepic.io-audit/release/tool-bugs") / os.getenv("BROWSER_ENGINE", "chromium")
OUT.mkdir(parents=True, exist_ok=True)
Image.new("RGBA", (600, 400), (0, 0, 0, 0)).save(OUT / "transparent.png")
Image.new("RGB", (80, 60), "red").save(OUT / "red.png")
Image.new("RGB", (120, 90), "blue").save(OUT / "blue.png")

with sync_playwright() as p:
    engine = os.getenv("BROWSER_ENGINE", "chromium")
    options = {"headless": True}
    if engine == "chromium":
        options["executable_path"] = os.getenv("CHROME_PATH", "C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
    browser = getattr(p, engine).launch(**options)
    context = browser.new_context(viewport={"width": 1366, "height": 900}, accept_downloads=True)
    context.route("**/google-analytics.com/**", lambda route: route.abort())
    context.route("**/googletagmanager.com/**", lambda route: route.abort())
    # The external widget's iframe runs its own app and can emit page errors.
    context.route("**/startupbar.co/**", lambda route: route.abort())
    context.add_init_script("""window.sourceUrls = new Set();
      const createUrl = URL.createObjectURL.bind(URL);
      const revokeUrl = URL.revokeObjectURL.bind(URL);
      URL.createObjectURL = blob => {
        const url = createUrl(blob);
        if (blob instanceof File) sourceUrls.add(url);
        return url;
      };
      URL.revokeObjectURL = url => { sourceUrls.delete(url); revokeUrl(url); };
    """)
    page = context.new_page()
    errors = []
    prefetch_errors = []
    def record_error(error):
        message = str(error)
        # WebKit reports canceled Next.js background prefetches as network
        # access-control errors. Retain them separately from JS exceptions.
        if engine == "webkit" and "?_rsc=" in message and message.endswith("due to access control checks."):
            prefetch_errors.append(message)
        else:
            errors.append(message)
    page.on("pageerror", record_error)

    def nav(route):
        # Finish link prefetches before replacing the document. WebKit reports
        # canceled RSC requests as access-control errors during navigation.
        page.wait_for_load_state("networkidle")
        page.goto(BASE + route, wait_until="networkidle")

    def upload(name="red.png"):
        page.locator("input[type=file]").first.set_input_files(str(OUT / name))

    def download(button, name):
        with page.expect_download() as pending:
            button.click()
        path = OUT / name
        pending.value.save_as(str(path))
        return path

    # A preview creates a separate image element, so the URL must stay valid.
    nav("/upscaler")
    upload()
    expect(page.get_by_alt_text("Original", exact=True)).to_be_visible()
    page.wait_for_function("document.querySelector('img[alt=Original]').naturalWidth === 80")
    page.get_by_role("button", name="Upscale Image", exact=True).click()
    expect(page.get_by_role("button", name="Download 2x", exact=True)).to_be_visible()
    page.wait_for_function("[...document.querySelectorAll('img[alt=Original],img[alt=Upscaled]')].every(i=>i.complete && i.naturalWidth>0)")
    page.get_by_role("button", name="Upload New Image", exact=True).click()
    assert page.evaluate("sourceUrls.size") == 0
    upload()
    expect(page.get_by_role("button", name="Upscale Image", exact=True)).to_be_visible()
    page.evaluate("HTMLCanvasElement.prototype.toDataURL = () => 'data:,'")
    page.get_by_role("button", name="Upscale Image", exact=True).click()
    expect(page.locator("p[role=alert]")).to_contain_text("preview failed")
    expect(page.get_by_role("button", name="Download 2x", exact=True)).to_have_count(0)
    print("PASS upscaler original/compare previews and failed-preview cleanup", flush=True)

    # Repeated selections must fire change, including after clearing the list.
    for route, clear in [("/converter", "Clear All"), ("/compressor", "Clear All Files")]:
        nav(route)
        upload()
        expect(page.get_by_alt_text("red.png", exact=True)).to_have_count(1)
        assert page.locator("input[type=file]").input_value() == ""
        upload()
        expect(page.get_by_alt_text("red.png", exact=True)).to_have_count(2)
        page.get_by_role("button", name=clear, exact=True).click()
        assert page.evaluate("sourceUrls.size") == 0
        upload()
        expect(page.get_by_alt_text("red.png", exact=True)).to_have_count(1)
        page.locator("input[type=file]").set_input_files({"name": "notes.txt", "mimeType": "text/plain", "buffer": b"notes"})
        expect(page.get_by_text("Choose image files", exact=False)).to_be_visible()
    print("PASS batch same-file uploads and rejected-file feedback", flush=True)

    nav("/compressor")
    page.locator("input[type=file]").set_input_files([
        {"name": "photo.png", "mimeType": "image/png", "buffer": (OUT / "red.png").read_bytes()},
        {"name": "photo.png", "mimeType": "image/png", "buffer": (OUT / "blue.png").read_bytes()},
    ])
    page.get_by_role("button", name="Compress All", exact=True).click()
    expect(page.get_by_role("button", name="Download", exact=True).last).to_be_enabled()
    expect(page.get_by_text(re.compile(r"^\+\d+%$")).first).to_be_visible()
    archive = download(page.get_by_role("button", name="Download ZIP", exact=True), "duplicates.zip")
    with zipfile.ZipFile(archive) as zip_file:
        assert len(zip_file.namelist()) == 2, zip_file.namelist()
        sizes = [Image.open(io.BytesIO(zip_file.read(name))).size for name in zip_file.namelist()]
        assert sizes == [(80, 60), (120, 90)], sizes
    print("PASS duplicate filenames retain both images in ZIP", flush=True)

    # Pause encoding to exercise settings changes and removal mid-job.
    for route, start in [("/converter", "Convert All"), ("/compressor", "Compress All")]:
        nav(route)
        upload()
        page.evaluate("""() => {
          window.actualToBlob = HTMLCanvasElement.prototype.toBlob;
          window.pendingEncodes = [];
          HTMLCanvasElement.prototype.toBlob = function(...args) {
            pendingEncodes.push(() => actualToBlob.apply(this, args));
          };
        }""")
        page.get_by_role("button", name=start, exact=True).click()
        page.wait_for_function("pendingEncodes.length > 0")
        if route == "/compressor":
            page.get_by_role("button", name="WEBP", exact=True).click()
        else:
            page.get_by_role("button", name="Clear All", exact=True).click()
        page.evaluate("""() => {
          HTMLCanvasElement.prototype.toBlob = actualToBlob;
          pendingEncodes.forEach(f => f());
        }""")
        if route == "/compressor":
            expect(page.get_by_role("button", name=start, exact=True)).to_be_enabled()
            expect(page.get_by_role("button", name="Download", exact=True)).to_be_disabled()
            page.get_by_role("button", name=start, exact=True).click()
            expect(page.get_by_role("button", name="Download", exact=True)).to_be_enabled()
            exported = download(page.get_by_role("button", name="Download", exact=True), "changed.webp")
            assert Image.open(exported).format == "WEBP"
        else:
            expect(page.get_by_role("button", name="Download", exact=True)).to_have_count(0)
            upload()
            expect(page.get_by_role("button", name=start, exact=True)).to_be_enabled()
    print("PASS settings changes and clear during encoding discard stale results", flush=True)

    nav("/cropper")
    upload()
    expect(page.get_by_label("Crop zoom")).to_have_value("100")
    page.locator("canvas").hover()
    page.mouse.wheel(0, -100)
    expect(page.get_by_label("Crop zoom")).to_have_value("120")
    page.get_by_label("Crop zoom").fill("1000")
    expect(page.get_by_text("1000%", exact=True)).to_be_visible()
    print("PASS cropper wheel zoom and consistent zoom limits", flush=True)

    for route in ["/", "/resize/instagram"]:
        nav(route)
        upload("transparent.png")
        page.get_by_role("button", name="Crop", exact=True).click()
        page.get_by_role("button", name="JPEG", exact=True).click()
        page.get_by_role("button", name="Download & Share", exact=True).click()
        path = download(page.get_by_role("button", name="Download JPEG", exact=True), "white-" + ("square" if route == "/" else "resizer") + ".jpg")
        with Image.open(path) as image:
            assert image.getpixel((image.width // 2, image.height // 2)) == (255, 255, 255)
    print("PASS square and resizer JPEG transparency exports white", flush=True)

    # Delay decoding so the second selected file can finish before the first.
    for route in ["/", "/cropper", "/upscaler"]:
        nav(route)
        page.evaluate("""() => {
          window.NativeImage = window.Image;
          window.imageRequests = [];
          window.Image = function() {
            const image = new NativeImage();
            const src = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
            Object.defineProperty(image, 'src', {
              get() { return src.get.call(image); },
              set(value) { imageRequests.push(() => new Promise(resolve => {
                image.addEventListener('load', () => resolve(), {once:true});
                image.addEventListener('error', () => resolve(), {once:true});
                src.set.call(image, value);
              })); }
            });
            return image;
          };
        }""")
        upload("red.png")
        upload("blue.png")
        page.wait_for_function("imageRequests.length === 2")
        page.evaluate("imageRequests[1]()")
        if route == "/":
            expect(page.locator(".image-editor-workspace")).to_have_attribute("data-loaded", "true")
            expected_text = "120 x 120"
        elif route == "/upscaler":
            expect(page.get_by_alt_text("Original", exact=True)).to_be_visible()
            expected_text = "120 × 90"
        else:
            expect(page.get_by_text("Export size:")).to_contain_text("72 x 72")
            expected_text = "72 x 72"
        page.evaluate("async () => { await imageRequests[0](); window.Image = NativeImage; }")
        expect(page.get_by_text(expected_text, exact=False).first).to_be_visible()
    print("PASS rapid replacement keeps the newest image in square/cropper/upscaler", flush=True)

    nav("/resize/instagram")
    upload()
    page.get_by_role("button", name="Facebook", exact=True).click()
    page.get_by_role("button", name="Cover Photo 851x315", exact=True).click()
    custom_url = page.url
    assert "width=851" in custom_url and "height=315" in custom_url, custom_url
    page.get_by_role("button", name="Clear", exact=True).click()
    page.go_back()
    expect(page.get_by_role("button", name="Download & Share", exact=True)).to_contain_text("Download")
    expect(page.get_by_text("Output: 851 x 315", exact=False)).to_be_visible()
    page.reload(wait_until="networkidle")
    upload()
    page.get_by_role("button", name="Download & Share", exact=True).click()
    exported = download(page.get_by_role("button", name="Download PNG", exact=True), "custom.png")
    assert Image.open(exported).size == (851, 315)
    print("PASS custom resizer dimensions survive history and reload", flush=True)
    nav("/converter")
    upload()
    assert page.evaluate("sourceUrls.size") == 1
    page.get_by_role("link", name="SquarePic home", exact=True).click()
    expect(page).to_have_url(BASE + "/")
    page.wait_for_function("sourceUrls.size === 0")
    print("PASS source URLs released on reset, clear, and client navigation", flush=True)
    assert not errors, errors
    if prefetch_errors:
        print(f"WebKit reported {len(prefetch_errors)} background RSC network errors; tool actions passed", flush=True)
    context.close()
    browser.close()
print("All tool bug regressions passed", flush=True)
