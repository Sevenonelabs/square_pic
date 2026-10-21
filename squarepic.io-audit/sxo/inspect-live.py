import json
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
DATA = ROOT / 'data'
CHROME = 'C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe'
im = Image.new('RGB', (600, 400), '#ffffff')
draw = ImageDraw.Draw(im)
draw.rectangle((0, 0, 35, 399), fill='#f00000')
draw.rectangle((564, 0, 599, 399), fill='#0000f0')
draw.rectangle((100, 80, 500, 320), fill='#008000')
draw.text((200, 160), 'SXO 600 x 400', fill='white')
im.save(DATA / 'test-source.png')

def snapshot(page):
    return page.evaluate('''() => {
      const rect = e => { const r=e.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; };
      return {title:document.title,width:innerWidth,height:innerHeight,scrollY:scrollY,scrollWidth:document.documentElement.scrollWidth,
      text:document.body.innerText, h1:[...document.querySelectorAll('h1')].map(e=>({text:e.innerText,rect:rect(e)})),
      buttons:[...document.querySelectorAll('button')].filter(e=>e.getClientRects().length).map(e=>({text:e.innerText,aria:e.getAttribute('aria-label'),pressed:e.getAttribute('aria-pressed'),disabled:e.disabled,rect:rect(e)})),
      inputs:[...document.querySelectorAll('input,select')].map(e=>({tag:e.tagName,type:e.type,aria:e.getAttribute('aria-label'),value:e.value,rect:rect(e)})),
      examples:[...document.querySelectorAll('main img')].map(e=>({alt:e.alt,rect:rect(e),loaded:e.complete&&e.naturalWidth>0}))};
    }''')

out = {'observed_utc': datetime.now(timezone.utc).isoformat(), 'url':'https://www.squarepic.io/', 'devices':[], 'downloads':[]}
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME, headless=True)
    for device, width, height in [('desktop',1366,900),('mobile',390,844)]:
        ctx = browser.new_context(viewport={'width':width,'height':height}, is_mobile=device=='mobile', has_touch=device=='mobile', accept_downloads=True)
        page=ctx.new_page()
        errors=[]
        page.on('pageerror',lambda error:errors.append(str(error)))
        page.goto(out['url'],wait_until='domcontentloaded',timeout=45000)
        page.get_by_role('button',name='Download & Share',exact=True).wait_for(timeout=30000)
        page.wait_for_timeout(1800)
        page.screenshot(path=str(DATA/f'{device}-initial.png'))
        before=snapshot(page)
        page.locator('input[type=file]').first.set_input_files(str(DATA/'test-source.png'))
        page.get_by_role('button',name='Download & Share',exact=True).wait_for(state='visible')
        page.wait_for_function("() => ![...document.querySelectorAll('button')].find(e => e.textContent.trim()==='Download & Share').disabled")
        page.wait_for_timeout(500)
        page.screenshot(path=str(DATA/f'{device}-loaded.png'))
        loaded=snapshot(page)
        requests=[]
        page.on('request',lambda request: requests.append({'url':request.url.split('?')[0],'method':request.method,'resource':request.resource_type,'has_body':request.post_data_buffer is not None}))
        scenarios=[('Blur','PNG'),('Solid','JPG'),('Crop','WEBP')] if device=='desktop' else [('Blur','PNG')]
        for mode,fmt in scenarios:
            page.get_by_role('button',name=mode,exact=True).click()
            page.get_by_role('button',name={'PNG':'PNG','JPG':'JPEG','WEBP':'WebP'}[fmt],exact=True).click()
            page.get_by_role('button',name='Download & Share',exact=True).click()
            dialog=page.locator('dialog[open]')
            dialog.wait_for()
            label={'PNG':'Download PNG','JPG':'Download JPEG','WEBP':'Download WEBP'}[fmt]
            with page.expect_download(timeout=20000) as pending:
                dialog.get_by_role('button',name=label,exact=True).click()
            download=pending.value
            dest=DATA/f'{device}-{mode.lower()}.{dict(PNG="png",JPG="jpg",WEBP="webp")[fmt]}'
            download.save_as(str(dest))
            with Image.open(dest) as check:
                out['downloads'].append({'device':device,'mode':mode,'requested':fmt,'filename':download.suggested_filename,'format':check.format,'width':check.width,'height':check.height,'bytes':dest.stat().st_size})
        out['devices'].append({'device':device,'before':before,'loaded':loaded,'errors':errors,'requests_during_edit_export':requests})
        ctx.close()
        (DATA/'live-browser.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
        print(device,'checked',flush=True)
    browser.close()
print(json.dumps(out['downloads'],indent=2))
