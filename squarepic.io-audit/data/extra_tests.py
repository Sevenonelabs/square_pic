import json, struct
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
CHROME='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe'
out={}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=CHROME,headless=True)
 c=b.new_context(viewport={'width':1366,'height':900},accept_downloads=True);page=c.new_page()
 page.goto('https://www.squarepic.io/image-size-calculator',wait_until='networkidle')
 for dims in [('600','400'),('1080','1080'),('0','400')]:
  page.locator('input[type=number]').nth(0).fill(dims[0]);page.locator('input[type=number]').nth(1).fill(dims[1]);page.wait_for_timeout(300)
  out['calculator-'+ '-'.join(dims)]=page.locator('body').inner_text()[:4000]
  page.screenshot(path=str(ROOT/('screenshots/calculator-'+'-'.join(dims)+'.png')))
 page.goto('https://www.squarepic.io/resize/instagram',wait_until='networkidle')
 out['instagram-input-count']=page.locator('input[type=file]').count()
 out['instagram-links']=page.locator('a').evaluate_all('(els)=>els.map(e=>({text:e.innerText,href:e.href}))')
 # Check the main tool CTA and whether a platform or preset survives navigation.
 links=page.get_by_role('link',name='Open Square Image Maker',exact=False)
 if links.count()==0: links=page.locator('a[href="/"]').filter(has_text='')
 # Record links; follow a clearly named editor link only.
 for a in out['instagram-links']:
  if 'Square' in a['text'] and a['href'].rstrip('/')=='https://www.squarepic.io':
   page.goto(a['href'],wait_until='networkidle');out['instagram-cta-followed']=a;out['instagram-destination']=page.url;break
 mobile=b.new_context(viewport={'width':375,'height':812},is_mobile=True,has_touch=True,accept_downloads=True);mp=mobile.new_page()
 out['mobile-layout']=[]
 for path in ['/','/converter','/compressor','/cropper','/upscaler']:
  mp.goto('https://www.squarepic.io'+path,wait_until='networkidle');mp.wait_for_timeout(400)
  r=mp.evaluate('''()=>({clientWidth:document.documentElement.clientWidth,innerWidth,screenWidth:screen.width,scrollWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>376 && getComputedStyle(e).position!='fixed').map(e=>({tag:e.tagName,text:e.innerText?.slice(0,80),class:e.className,right:e.getBoundingClientRect().right})).slice(0,15)})''');r['path']=path;out['mobile-layout'].append(r)
 mp.goto('https://www.squarepic.io/cropper',wait_until='networkidle');mp.locator('input[type=file]').set_input_files(str(ROOT/'data/test-transparent.png'));mp.wait_for_timeout(500);mp.get_by_role('button',name='PNG',exact=True).click()
 with mp.expect_download() as di: mp.get_by_role('button',name='Export Crop',exact=True).click()
 di.value.save_as(str(ROOT/'data/crop-mobile.png'));im=Image.open(ROOT/'data/crop-mobile.png');out['crop-mobile-dimensions']=list(im.size)
 mp.screenshot(path=str(ROOT/'screenshots/cropper-mobile-uploaded.png'),full_page=True)
 # Home platform options are the actual editor preset controls.
 page.goto('https://www.squarepic.io',wait_until='networkidle');page.locator('input[type=file]').set_input_files(str(ROOT/'data/test-transparent.png'));page.get_by_role('button',name='Instagram',exact=True).click();page.wait_for_timeout(200)
 out['home-instagram-options']=page.locator('button').all_text_contents()
 page.screenshot(path=str(ROOT/'screenshots/home-instagram-presets.png'))
 b.close()
f=ROOT/'data/convert-tiff-test-transparent.tiff'
raw=f.read_bytes();out['tiff-header']={'bytes':len(raw),'magic':raw[:24].hex(),'ifd_offset':struct.unpack('<I',raw[4:8])[0],'entry_count':struct.unpack('<H',raw[8:10])[0],'first_12_byte_entry':struct.unpack('<HHII',raw[10:22])}
try:
 gif=Image.open(ROOT/'data/convert-gif-test-transparent.gif');out['gif-alpha']=gif.convert('RGBA').getchannel('A').getextrema();out['gif-info']=gif.info
except Exception as e: out['gif-decode-error']=str(e)
(ROOT/'data/extra-results.json').write_text(json.dumps(out,indent=2,default=str),encoding='utf8')
print(json.dumps(out,indent=2,default=str))
