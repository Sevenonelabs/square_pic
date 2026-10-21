"""Check audit fixes against production HTML and real browser interactions.

Run: python scripts/verify-report-fixes.py http://localhost:4173
Uses the existing Playwright installation. Does not send emails or analytics.
"""
import json
import re
import sys
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen

from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
OUT = Path("squarepic.io-audit/report-fixes")
OUT.mkdir(parents=True, exist_ok=True)


class PageHTML(HTMLParser):
    def __init__(self):
        super().__init__()
        self.headings, self.inline, self.stylesheets = [], [], []
        self.links, self.anchor = defaultdict(set), None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "style" in attrs:
            self.inline.append({"tag": tag, "style": attrs["style"]})
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.stylesheets.append(attrs.get("href"))
        if re.fullmatch("h[1-6]", tag):
            self.headings.append(int(tag[1]))
        if tag == "a":
            self.anchor = [attrs.get("href", ""), ""]

    def handle_data(self, data):
        if self.anchor is not None:
            self.anchor[1] += data

    def handle_endtag(self, tag):
        if tag == "a" and self.anchor is not None:
            self.links[self.anchor[1].strip().lower()].add(self.anchor[0])
            self.anchor = None


html_checks, browsers = [], []
for route in ["/", "/support", "/about", "/privacy", "/terms", "/faq", "/author/sevenonelabs", "/resize/instagram"]:
    html = urlopen(BASE + route, timeout=30).read().decode()
    parsed = PageHTML()
    parsed.feed(html)
    assert "support@squarepic.io" not in html, route
    assert not re.search(r'href=["\']mailto:', html), route
    assert not parsed.stylesheets, (route, parsed.stylesheets)
    assert parsed.headings.count(1) == 1, (route, parsed.headings)
    assert all(b <= a + 1 for a, b in zip(parsed.headings, parsed.headings[1:])), (route, parsed.headings)
    if route == "/":
        assert not parsed.inline, parsed.inline
        assert not {text: urls for text, urls in parsed.links.items() if len(urls) > 1}, parsed.links
        assert all(any(host in url for urls in parsed.links.values() for url in urls)
                   for host in ["twitter.com/intent", "facebook.com/sharer", "linkedin.com/sharing", "wa.me/"])
    html_checks.append({"route": route, "headings": parsed.headings, "inline_styles": len(parsed.inline), "email_exposed": False})

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path="C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe", headless=True)
    for width, height in [(320, 568), (390, 844), (768, 1024), (1024, 768), (1366, 768)]:
        context = browser.new_context(viewport={"width": width, "height": height}, accept_downloads=True)
        for host in ["**googletagmanager.com/**", "**google-analytics.com/**", "**startupbar.co/**", "**/_vercel/**"]:
            context.route(host, lambda route: route.abort())
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(BASE, wait_until="networkidle")
        expect(page.get_by_role("heading", level=1)).to_be_visible()
        expect(page.get_by_role("link", name="Share on Facebook", exact=True)).to_be_visible()
        assert page.locator('script[src*="startupbar.co"]').count() == 0
        assert page.locator('script[src*="googletagmanager.com"]').count() == 0
        assert not page.evaluate("performance.getEntriesByType('resource').some(r=>/\\.(woff2?|ttf)(?:\\?|$)/.test(r.name))")
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), width
        assert page.locator("main [style]").count() == 0
        page.screenshot(path=str(OUT / f"initial-{width}.png"))
        page.keyboard.press("Tab")
        expect(page.get_by_role("link", name="Skip to image tools and content")).to_be_focused()
        page.keyboard.press("Enter")
        expect(page.locator("#main-content")).to_be_focused()
        if width < 1024:
            page.get_by_role("button", name="Open navigation menu").click()
            expect(page.get_by_role("navigation", name="Mobile navigation")).to_be_visible()
            page.keyboard.press("Escape")
            expect(page.get_by_role("button", name="Open navigation menu")).to_be_focused()
            expect(page.get_by_role("navigation", name="Mobile navigation")).to_have_count(0)
        else:
            page.get_by_role("button", name="cyan theme").click()
            assert page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()") == "#06b6d4"
            assert not page.locator("html").get_attribute("style")
        page.get_by_role("button", name="Upload Your Image", exact=True).focus()
        with page.expect_file_chooser() as chooser:
            page.keyboard.press("Enter")
        chooser.value.set_files(str(Path("public/examples/square-source.png").resolve()))
        expect(page.locator("canvas")).to_be_visible()
        page.screenshot(path=str(OUT / f"editor-{width}.png"))
        page.get_by_role("button", name="Solid", exact=True).click()
        swatch = page.get_by_role("button", name="Background #F02328", exact=True)
        swatch.click()
        expect(swatch).to_have_attribute("aria-pressed", "true")
        assert swatch.evaluate("e=>getComputedStyle(e).backgroundColor") == "rgb(240, 35, 40)"
        page.get_by_role("button", name="Download & Share", exact=True).click()
        expect(page.get_by_role("dialog")).to_be_visible()
        with page.expect_download() as download:
            page.get_by_role("button", name="Download PNG", exact=True).click()
        assert download.value.suggested_filename.endswith(".png")
        assert Path(download.value.path()).read_bytes().startswith(b"\x89PNG\r\n\x1a\n")
        page.evaluate("Object.defineProperty(navigator, 'share', {configurable:true, value:async payload=>{window.sharedPage=payload}})")
        page.get_by_role("button", name="More sharing options", exact=True).click()
        expect(page.get_by_role("status").filter(has_text="Page shared.")).to_be_visible()
        assert page.evaluate("window.sharedPage.url") == "https://www.squarepic.io/"
        page.evaluate("Object.defineProperty(navigator, 'clipboard', {configurable:true, value:{writeText:async text=>{window.copiedText=text}}})")
        page.get_by_role("button", name="Copy page link", exact=True).click()
        expect(page.get_by_role("status").filter(has_text="Page link copied.")).to_be_visible()
        assert page.evaluate("window.copiedText") == "https://www.squarepic.io/"
        page.evaluate("Object.defineProperty(navigator, 'clipboard', {configurable:true, value:{writeText:async()=>{throw Error('denied')}}})")
        page.get_by_role("button", name="Copy page link", exact=True).click()
        expect(page.get_by_role("textbox", name="Page link to copy")).to_have_value("https://www.squarepic.io/")
        page.screenshot(path=str(OUT / f"homepage-{width}.png"), full_page=False)
        assert not errors, errors
        browsers.append({"viewport": [width, height], "upload_keyboard": "passed", "download": "passed", "clipboard_success_and_failure": "passed", "horizontal_overflow": False})
        context.close()

    # Analytics stays queued until interaction, including browsers without idle callbacks.
    for idle_supported in [True, False]:
        context = browser.new_context()
        if not idle_supported:
            context.add_init_script("delete window.requestIdleCallback; delete window.cancelIdleCallback;")
        analytics = []
        def analytics_script(route):
            analytics.append(route.request.url)
            route.fulfill(status=200, content_type="application/javascript", body="window.analyticsRequested=true;")
        context.route("**googletagmanager.com/gtag/js?*", analytics_script)
        page = context.new_page()
        page.goto(BASE, wait_until="networkidle")
        page.wait_for_timeout(2000)
        assert not analytics
        page.evaluate("gtag('event','tool_download',{tool_name:'square',output_format:'png'})")
        assert page.evaluate("dataLayer.some(e=>e[0]==='event' && e[1]==='tool_download')")
        assert page.evaluate("dataLayer.some(e=>e[0]==='config' && e[2].allow_google_signals===false && e[2].allow_ad_personalization_signals===false)")
        page.keyboard.press("Tab")
        page.wait_for_timeout(300)
        assert not analytics  # The first action gets time to finish.
        page.wait_for_function("window.analyticsRequested===true")
        page.keyboard.press("Tab")
        assert len(analytics) == 1
        context.close()

    # Optional recommendations load only after interaction; failures restore spacing.
    for success in [True, False]:
        context = browser.new_context()
        requests = []
        context.route("**googletagmanager.com/**", lambda route: route.abort())
        context.route("**google-analytics.com/**", lambda route: route.abort())
        def widget(route):
            requests.append(route.request.url)
            if success:
                route.fulfill(status=200, content_type="application/javascript", body="window.widgetRequested=true;")
            else:
                route.abort()
        context.route("**startupbar.co/widget/loader.js", widget)
        page = context.new_page()
        page.goto(BASE, wait_until="networkidle")
        assert not requests
        assert page.locator('html').get_attribute('data-startupbar') is None
        page.get_by_role("button", name="Show startup recommendations", exact=True).click()
        if success:
            page.wait_for_function("window.widgetRequested===true")
            expect(page.locator('html')).to_have_attribute('data-startupbar', 'enabled')
            expect(page.get_by_role("status").filter(has_text="Startup recommendations enabled")).to_be_visible()
        else:
            expect(page.get_by_role("status").filter(has_text="Recommendations could not load.")).to_be_visible()
            assert page.locator('html').get_attribute('data-startupbar') is None
        assert len(requests) == 1
        context.close()

    context = browser.new_context()
    for host in ["**googletagmanager.com/**", "**google-analytics.com/**", "**startupbar.co/**", "**/_vercel/**"]:
        context.route(host, lambda route: route.abort())
    page = context.new_page()
    for source, target in [("/", "/"), ("/free-image-compressor", "/compressor"),
                           ("/blog/how-to-square-image-for-any-platform", "/guides/make-image-square-without-cropping"),
                           ("/instagram-post-resizer", "/resize/instagram?preset=square")]:
        response = context.request.get(BASE + source, headers={"Host": "squarepic.io"}, max_redirects=0)
        assert response.status in [301, 308], (source, response.status)
        assert response.headers["location"].rstrip("/") == ("https://www.squarepic.io" + target).rstrip("/"), response.headers
    page.goto(BASE + "/support#contact-form", wait_until="networkidle")
    page.get_by_role("button", name="Open email draft").click()
    assert not page.get_by_label("Subject", exact=True).evaluate("e=>e.validity.valid")
    page.get_by_label("Subject", exact=True).fill("   ")
    page.get_by_label("Message", exact=True).fill("   ")
    page.get_by_role("button", name="Open email draft").click()
    expect(page.get_by_role("status")).to_contain_text("Enter a subject and a message")
    # Observe the draft navigation in headless Chromium. No email is sent.
    drafts = []
    session = context.new_cdp_session(page)
    session.send("Page.enable")
    session.on("Page.frameRequestedNavigation", lambda event: drafts.append(event.get("url", "")))
    page.get_by_label("Subject", exact=True).fill("Crop & blur question")
    page.get_by_label("Message", exact=True).fill("A question with & and + characters.")
    page.get_by_role("button", name="Open email draft").click()
    expect(page.get_by_role("status")).to_contain_text("Review and send it in your email app")
    assert drafts and "subject=Crop%20%26%20blur%20question" in drafts[-1], drafts
    page.screenshot(path=str(OUT / "support-contact.png"))
    context.close()
    browser.close()

(OUT / "functional-checks.json").write_text(json.dumps({"html": html_checks, "browser": browsers, "analytics": "deferred until interaction; event queue and idle fallback checked", "recommendations": "on demand only; load and failure checked", "contact_form": "validated; email draft URL encoded"}, indent=2), encoding="utf-8")
print(f"Report fixes passed: {len(html_checks)} HTML pages, {len(browsers)} viewports, contact form validation and draft URL.")
