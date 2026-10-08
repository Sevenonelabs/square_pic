import json
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe',headless=True)
 out=[]
 for mobile in [True,False]:
  page=b.new_page(viewport={'width':375,'height':812} if mobile else {'width':1920,'height':1080},is_mobile=mobile,has_touch=mobile)
  for path in ['/','/converter']:
   page.goto('https://www.squarepic.io'+path,wait_until='domcontentloaded');page.wait_for_timeout(2500)
   r=page.evaluate('''()=>({innerWidth,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,visualViewport:{width:visualViewport.width,scale:visualViewport.scale},h1:[...document.querySelectorAll('h1')].map(e=>{const c=getComputedStyle(e);return {text:e.innerText,font:c.font,fontSize:c.fontSize,letterSpacing:c.letterSpacing,lineHeight:c.lineHeight,fontWeight:c.fontWeight,rect:{x:e.getBoundingClientRect().x,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}}}),overflow:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>376).map(e=>({tag:e.tagName,text:e.innerText?.slice(0,70),class:e.className,right:e.getBoundingClientRect().right})).slice(-15)})''');r.update(path=path,mobile=mobile);out.append(r)
 b.close()
(ROOT/'data/typography-layout.json').write_text(json.dumps(out,indent=2),encoding='utf8');print(json.dumps(out,indent=2))
