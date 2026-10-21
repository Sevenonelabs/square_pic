import json
from pathlib import Path
from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright

DATA=Path(__file__).resolve().parent/'data'
Image.new('RGB',(5000,1000),'#008000').save(DATA/'large-source.png')
logo=Image.new('RGBA',(600,400),(0,0,0,0))
ImageDraw.Draw(logo).rectangle((100,100,500,300),fill=(0,128,0,255))
logo.save(DATA/'transparent-source.png')
out={}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe',headless=True)
 page=b.new_page(viewport={'width':390,'height':844},accept_downloads=True)
 page.goto('https://www.squarepic.io/',wait_until='domcontentloaded')
 page.get_by_role('button',name='Download & Share',exact=True).wait_for()
 page.wait_for_timeout(2000)
 page.locator('input[type=file]').first.set_input_files(str(DATA/'large-source.png'))
 page.wait_for_function("() => ![...document.querySelectorAll('button')].find(e => e.textContent.trim()==='Download & Share').disabled")
 out['large_output_text']=page.locator('.editor-controls').inner_text()
 def download(label,filename):
  page.get_by_role('button',name='Download & Share',exact=True).click()
  dialog=page.locator('dialog[open]')
  with page.expect_download() as waiting:dialog.get_by_role('button',name=label,exact=True).click()
  dest=DATA/filename
  waiting.value.save_as(str(dest))
  with Image.open(dest) as im:
   return {'format':im.format,'width':im.width,'height':im.height,'mode':im.mode,'alpha_extrema':im.getchannel('A').getextrema() if 'A' in im.getbands() else None}
 out['large_download']=download('Download PNG','large-square.png')
 page.get_by_role('button',name='Instagram',exact=True).first.click()
 out['instagram_options']=[e.inner_text() for e in page.locator('.editor-controls button').all()]
 (DATA/'options-probe.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
 page.locator('.editor-controls button').filter(has_text='1080x1080').click()
 out['preset_text']=page.locator('.editor-controls').inner_text()
 out['preset_download']=download('Download PNG','instagram-square.png')
 page.get_by_role('button',name='New Image',exact=True).click()
 page.locator('input[type=file]').first.set_input_files(str(DATA/'transparent-source.png'))
 page.wait_for_function("() => ![...document.querySelectorAll('button')].find(e => e.textContent.trim()==='Download & Share').disabled")
 page.get_by_role('button',name='Clear',exact=True).click()
 page.get_by_role('button',name='Solid',exact=True).click()
 out['transparent_solid_download']=download('Download PNG','transparent-solid.png')
 examples=page.locator('main img')
 out['examples']=[]
 for e in examples.all():
  e.scroll_into_view_if_needed()
  try:page.wait_for_function('(e) => e.complete && e.naturalWidth > 0',arg=e.element_handle(),timeout=15000)
  except Exception:pass
  out['examples'].append(e.evaluate('(e) => ({alt:e.alt,loaded:e.complete&&e.naturalWidth>0})'))
 b.close()
(DATA/'options-probe.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
print(json.dumps(out,indent=2))
