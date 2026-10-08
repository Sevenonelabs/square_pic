"""Verify the Discord guide, discovery links, and real editor exports."""
import argparse
import json
from pathlib import Path
import runpy
import struct
from xml.etree import ElementTree as ET
from playwright.sync_api import sync_playwright, expect

SAMPLE_PNG = runpy.run_path(str(Path(__file__).with_name('verify-gsc-improvements.py')))['sample_png']
GUIDE = '/guides/discord-image-sizes-2026'
TITLE = 'Discord Server Banner Size & Invite Splash'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base', default='http://127.0.0.1:4174')
    parser.add_argument('--output', default='docs/gsc-2026-10-07')
    args = parser.parse_args()
    out = Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    checks, errors, vendor_errors, exports = [], [], [], []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 900}, accept_downloads=True)
        page = context.new_page()

        def record(error):
            stack = error.stack or str(error)
            frames = [s.strip() for s in stack.splitlines() if s.strip().startswith('at ')]
            if frames and all('https://startupbar.co/assets/' in s for s in frames):
                vendor_errors.append(stack)
            else:
                errors.append(stack)

        page.on('pageerror', record)

        def visit(path):
            response = page.goto(args.base + path)
            assert response.status == 200, (path, response.status)
            expect(page.locator('h1')).to_have_count(1)

        for path in [GUIDE, '/resize/discord']:
            visit(path)
            expect(page.locator('link[rel=canonical]')).to_have_attribute('href', 'https://www.squarepic.io' + path)
            expect(page).to_have_title(TITLE + ' | SquarePic' if path == GUIDE else 'Discord Banner & Invite Splash Image Resizer | SquarePic')
            schemas = [json.loads(s) for s in page.locator('script[type="application/ld+json"]').all_text_contents()]
            faq = next(s for s in schemas if s['@type'] == 'FAQPage')
            for q in faq['mainEntity']:
                section = page.get_by_role('heading', name=q['name'], exact=True).last.locator('..')
                assert section.locator('p').inner_text() == q['acceptedAnswer']['text'], q['name']
            if path == GUIDE:
                article = next(s for s in schemas if s['@type'] == 'BlogPosting')
                assert article['headline'] == TITLE and article['dateModified'] == '2026-10-07'
                expect(page.locator('article a[href="/resize/discord"]')).to_be_visible()
                for href in page.locator('nav[aria-label="In this Discord guide"] a').evaluate_all('(xs) => xs.map(x => x.getAttribute("href"))'):
                    assert page.locator(href).count() == 1, href
                expect(page.locator('article table')).to_contain_text('680 × 240 minimum')
            page.screenshot(path=str(out / ('discord-guide-desktop.png' if path == GUIDE else 'discord-resizer-desktop.png')), full_page=True)
            for width in [390, 320]:
                page.set_viewport_size({'width': width, 'height': 844})
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (path, width)
                if path == GUIDE:
                    page.get_by_role('link', name='Splash not showing?', exact=True).click()
                    expect(page.locator('#splash-not-showing')).to_be_in_viewport()
            page.screenshot(path=str(out / ('discord-guide-mobile.png' if path == GUIDE else 'discord-resizer-mobile.png')), full_page=True)
            page.set_viewport_size({'width': 1280, 'height': 900})
        checks.append('Guide and preset page return 200 with descriptive titles, self-canonicals, matching visible FAQ answers, working anchors, and no page overflow at 320/390 px.')

        visit('/guides?category=discord')
        expect(page.get_by_role('link', name=TITLE, exact=False)).to_be_visible()
        visit('/guides/social-media-image-sizes-2026')
        expect(page.locator('#discord')).to_contain_text('1920x1080')
        expect(page.locator('#discord a[href="' + GUIDE + '"]')).to_be_visible()
        visit('/resize/discord')
        expect(page.get_by_role('link', name='Discord banner and missing-splash guide')).to_be_visible()
        for feed in ['/feed.xml', '/guides/discord/feed.xml']:
            response = context.request.get(args.base + feed)
            assert response.status == 200
            root = ET.fromstring(response.text())
            items = root.findall('.//item')
            assert any(i.findtext('title') == TITLE and i.findtext('link') == 'https://www.squarepic.io' + GUIDE for i in items), feed
        checks.append('Discord guide is discoverable from the guide category, cheat sheet, preset page, and both RSS feeds; cheat sheet splash dimensions match the editor preset.')

        visit('/')
        page.locator('input[type="file"]').first.set_input_files({'name': 'landscape.png', 'mimeType': 'image/png', 'buffer': SAMPLE_PNG()})
        expect(page.locator('canvas').first).to_be_visible()
        page.get_by_role('button', name='Solid', exact=True).click()
        page.locator('input[type="range"]').first.focus()
        page.locator('input[type="range"]').first.press('Home')
        page.get_by_role('button', name='Discord', exact=True).click()
        page.get_by_role('button', name='PNG', exact=True).click()
        for label, dimensions in [('Server Banner', (960, 540)), ('Server Splash', (1920, 1080))]:
            page.get_by_role('button', name=label, exact=False).click()
            page.get_by_role('button', name='Download & Share', exact=True).click()
            expect(page.get_by_role('button', name='Download PNG', exact=True)).to_be_visible()
            with page.expect_download() as result:
                page.get_by_role('button', name='Download PNG', exact=True).click()
            downloaded = result.value
            assert downloaded.failure() is None
            data = Path(downloaded.path()).read_bytes()
            assert data[:8] == b'\x89PNG\r\n\x1a\n'
            actual = struct.unpack('>II', data[16:24])
            assert actual == dimensions, (label, actual)
            exports.append({'preset': label, 'format': 'PNG', 'width': actual[0], 'height': actual[1]})
            expect(page.get_by_role('button', name='Download PNG', exact=True)).to_be_hidden()
        checks.append('A real editor upload exports a 960 × 540 server banner and 1920 × 1080 splash PNG; both files were checked from their PNG headers.')
        assert not errors, errors
        checks.append('No SquarePic page errors occurred; confirmed StartupBar iframe errors are recorded separately.')
        browser.close()
    report = {'ok': True, 'base': args.base, 'checks': checks, 'exports': exports, 'pageErrors': errors, 'externalWidgetErrors': vendor_errors}
    (out / 'discord-browser-verification.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    main()
