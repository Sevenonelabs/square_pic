import json,re
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
CHROME='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe'
out=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=CHROME,headless=True)
 c=b.new_context(viewport={'width':1366,'height':900},accept_downloads=True)
 c.add_init_script('''window.auditBlobs=[];const orig=URL.createObjectURL.bind(URL);URL.createObjectURL=function(b){window.auditBlobs.push({type:b.type,size:b.size});return orig(b)}''')
 page=c.new_page()
 def nav(path,upload=True):
  page.goto('https://www.squarepic.io'+path,wait_until='networkidle')
  if upload: page.locator('input[type=file]').first.set_input_files(str(ROOT/'data/test-transparent.png'));page.wait_for_timeout(800)
 def capture(name,action):
  with page.expect_download(timeout=15000) as di: action()
  dl=di.value; dest=ROOT/f'data/{name}-{dl.suggested_filename}';dl.save_as(str(dest))
  im=Image.open(dest);alpha=im.getchannel('A').getextrema() if 'A' in im.getbands() else None
  r={'test':name,'filename':dl.suggested_filename,'magic_hex':dest.read_bytes()[:20].hex(),'format':im.format,'dimensions':list(im.size),'mode':im.mode,'alpha_extrema':alpha,'bytes':dest.stat().st_size,'blobs':page.evaluate('window.auditBlobs')}
  out.append(r); (ROOT/'data/tool-results.json').write_text(json.dumps(out,indent=2),encoding='utf8'); print(json.dumps(r),flush=True)
 nav('/')
 page.get_by_role('button',name='Download & Share',exact=True).click()
 page.wait_for_timeout(500)
 print('HOME MODAL',page.locator('button').all_text_contents(),flush=True)
 capture('square-png',lambda:page.get_by_role('button',name='Download PNG',exact=True).click())
 for fmt in ['AVIF','BMP','WebP','JPEG','GIF','TIFF','ICO']:
  try:
   nav('/converter')
   page.get_by_role('button',name='WEBP',exact=True).click()
   print('DROPDOWN',fmt,page.locator('button').all_text_contents(),flush=True)
   page.get_by_role('button',name=fmt,exact=True).last.click()
   page.get_by_role('button',name='Convert All',exact=True).click()
   page.get_by_role('button',name='Download',exact=True).wait_for()
   page.screenshot(path=str(ROOT/f'screenshots/converter-{fmt.lower()}-done.png'),full_page=False)
   capture('convert-'+fmt.lower(),lambda:page.get_by_role('button',name='Download',exact=True).click())
  except Exception as e:
   out.append({'test':'convert-'+fmt.lower(),'error':str(e)});(ROOT/'data/tool-results.json').write_text(json.dumps(out,indent=2),encoding='utf8');print('ERROR',fmt,str(e),flush=True)
 nav('/compressor')
 page.get_by_role('button',name='Compress All',exact=True).click()
 page.get_by_role('button',name='Download',exact=True).wait_for(state='visible')
 page.wait_for_timeout(500)
 page.screenshot(path=str(ROOT/'screenshots/compressor-result.png'),full_page=False)
 capture('compress-default-jpeg',lambda:page.get_by_role('button',name='Download',exact=True).click())
 nav('/cropper')
 page.get_by_role('button',name='PNG',exact=True).click()
 capture('crop-default-desktop',lambda:page.get_by_role('button',name='Export Crop',exact=True).click())
 page.get_by_role('button',name='16:9',exact=True).click()
 capture('crop-16-9-desktop',lambda:page.get_by_role('button',name='Export Crop',exact=True).click())
 nav('/upscaler')
 page.get_by_role('button',name='Upscale Image',exact=True).click()
 page.get_by_role('button',name='Download 2x',exact=True).wait_for()
 page.get_by_role('button',name='PNG',exact=True).click()
 page.screenshot(path=str(ROOT/'screenshots/upscaler-result.png'),full_page=False)
 capture('upscale-2x-png',lambda:page.get_by_role('button',name='Download 2x',exact=True).click())
 b.close()
