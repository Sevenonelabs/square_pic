import json, os, time
from pathlib import Path
from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
CHROME='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe'
ROOT.joinpath('screenshots').mkdir(exist_ok=True)
im=Image.new('RGBA',(600,400),(0,0,0,0))
d=ImageDraw.Draw(im); d.rectangle((100,70,500,330), fill=(255,0,0,255)); d.text((120,90),'SquarePic audit 600 x 400',fill=(255,255,255,255))
im.save(ROOT/'data/test-transparent.png')
im.convert('RGB').save(ROOT/'data/test-photo.jpg',quality=95)
paths=['/','/converter','/compressor','/cropper','/upscaler','/image-size-calculator','/resize/instagram','/converter/png-to-avif']
out=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=CHROME,headless=True)
 for mobile in [False, True]:
  ctx=b.new_context(viewport={'width':375,'height':812} if mobile else {'width':1920,'height':1080},is_mobile=mobile,has_touch=mobile,accept_downloads=True)
  page=ctx.new_page()
  for path in paths:
   errs=[]; failed=[]
   page.on('console',lambda msg: errs.append(msg.text) if msg.type=='error' else None)
   page.on('pageerror',lambda e: errs.append(str(e)))
   page.on('requestfailed',lambda r: failed.append({'url':r.url,'failure':r.failure}))
   page.goto('https://www.squarepic.io'+path,wait_until='networkidle',timeout=45000)
   page.wait_for_timeout(1200)
   slug=path.strip('/').replace('/','-') or 'home'; device='mobile' if mobile else 'desktop'
   page.screenshot(path=str(ROOT/f'screenshots/{slug}-{device}.png'),full_page=False)
   info=page.evaluate('''() => ({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyText:document.body.innerText,buttons:[...document.querySelectorAll('button')].map(e=>({text:e.innerText,aria:e.getAttribute('aria-label'),disabled:e.disabled,rect:{x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}})),inputs:[...document.querySelectorAll('input,select')].map(e=>({tag:e.tagName,type:e.type,id:e.id,placeholder:e.placeholder,value:e.value,options:e.options?[...e.options].map(o=>({value:o.value,text:o.text})):null})),images:[...document.images].map(e=>({src:e.src,complete:e.complete,naturalWidth:e.naturalWidth})),navigation:performance.getEntriesByType('navigation').map(n=>({ttfb:n.responseStart-n.requestStart,dom:n.domContentLoadedEventEnd,load:n.loadEventEnd})),resources:performance.getEntriesByType('resource').map(e=>({name:e.name,bytes:e.transferSize,duration:e.duration,kind:e.initiatorType}))})''')
   info.update(path=path,device=device,errors=errs,failed=failed)
   out.append(info)
   (ROOT/'data/browser-inspect.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
   print(device,path,'buttons',[x['text'] for x in info['buttons']],flush=True)
  ctx.close()
 b.close()
