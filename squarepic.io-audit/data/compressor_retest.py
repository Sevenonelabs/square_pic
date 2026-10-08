import json
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
out={}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe',headless=True)
 page=b.new_page(viewport={'width':1366,'height':900},accept_downloads=True)
 page.goto('https://www.squarepic.io/compressor',wait_until='domcontentloaded');page.wait_for_timeout(1600)
 page.locator('input[type=file]').set_input_files(str(ROOT/'data/test-transparent.png'))
 page.get_by_role('button',name='Compress All',exact=True).click();page.wait_for_timeout(500)
 out['before']=page.locator('body').inner_text()[:1000]
 page.get_by_role('button',name='WEBP',exact=True).click();page.get_by_role('button',name='Compress All',exact=True).click();page.wait_for_timeout(300)
 out['after']=page.locator('body').inner_text()[:1000]
 with page.expect_download() as di:page.get_by_role('button',name='Download',exact=True).click()
 dl=di.value;dl.save_as(str(ROOT/'data/compressor-settings-changed.bin'));im=Image.open(ROOT/'data/compressor-settings-changed.bin');out['after-format']={'filename':dl.suggested_filename,'decoded':im.format,'size':list(im.size)}
 page.screenshot(path=str(ROOT/'screenshots/compressor-webp-after-recompress.png'))
 b.close()
(ROOT/'data/compressor-retest.json').write_text(json.dumps(out,indent=2),encoding='utf8');print(json.dumps(out,indent=2))
