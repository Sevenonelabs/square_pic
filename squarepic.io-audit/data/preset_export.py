import json
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe',headless=True)
 page=b.new_page(viewport={'width':1366,'height':900},accept_downloads=True)
 page.goto('https://www.squarepic.io/',wait_until='domcontentloaded');page.wait_for_timeout(1400)
 page.locator('input[type=file]').set_input_files(str(R/'data/test-transparent.png'))
 page.get_by_role('button',name='Instagram',exact=True).click();page.get_by_role('button',name='Stories/Reels',exact=False).click()
 page.get_by_role('button',name='Download & Share',exact=True).click()
 with page.expect_download() as di:page.get_by_role('button',name='Download PNG',exact=True).click()
 di.value.save_as(str(R/'data/instagram-stories.png'));im=Image.open(R/'data/instagram-stories.png');im.load()
 out={'platform':'Instagram','preset':'Stories/Reels','expected':[1080,1920],'actual':list(im.size),'format':im.format,'filename':di.value.suggested_filename}
 page.screenshot(path=str(R/'screenshots/instagram-stories-export.png'))
 # Browser decoding of converter-generated GIF.
 page.goto('https://www.squarepic.io/',wait_until='domcontentloaded');page.wait_for_timeout(1200)
 page.locator('input[type=file]').set_input_files(str(R/'data/convert-gif-test-transparent.gif'));page.wait_for_timeout(700)
 out['gif-browser-editor']=page.locator('body').inner_text()[:600]
 b.close()
(R/'data/preset-export.json').write_text(json.dumps(out,indent=2),encoding='utf8');print(json.dumps(out))
