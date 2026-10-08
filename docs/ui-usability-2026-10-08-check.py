from pathlib import Path
import json,re,sys
from playwright.sync_api import sync_playwright, expect
base=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:3003'
out=Path('docs/ui-usability-2026-10-08');out.mkdir(parents=True,exist_ok=True)
routes=['/','/converter','/converter/png-to-jpg','/compressor','/cropper','/upscaler','/image-size-calculator','/resize/instagram','/guides']+['/guides/'+p.parent.name for p in Path('src/app/guides').glob('*/page.tsx')]
rows=[];errors=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe',headless=True)
 for width in [320,390,768,1024,1440]:
  c=b.new_context(viewport={'width':width,'height':900},device_scale_factor=1)
  page=c.new_page();page.on('pageerror',lambda error:errors.append(str(error)))
  for route in routes:
   response=page.goto(base+route,wait_until='domcontentloaded');page.locator('h1').first.wait_for();page.wait_for_timeout(550)
   row=page.evaluate('''() => ({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:getComputedStyle(document.querySelector('h1')).fontSize,overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)&&!e.closest('.overflow-x-auto')}).slice(0,8).map(e=>({tag:e.tagName,cls:typeof e.className==='string'?e.className:'svg',text:e.textContent.slice(0,80)}))})''')
   row.update(route=route,status=response.status);rows.append(row)
   assert response.status==200,(route,response.status)
   if row['scrollWidth']>width: print('OVERFLOW',width,route,row['overflow'],flush=True)
   if '/guides/' in route:
    toc=page.get_by_role('navigation',name='Table of contents',exact=True,include_hidden=True)
    assert toc.count()==1,route
    for link in toc.locator('a').all():
     href=link.get_attribute('href');assert page.locator(href).count()>=1,(route,href)
    assert page.locator('article h1 svg').count()==(0 if route.endswith('make-image-square-without-cropping') or route.endswith('social-media-image-sizes-2026') else 1)
   if route in ['/','/guides','/guides/instagram-feed-sizes-2026'] and width in [390,1440]:
    page.screenshot(path=str(out/f"{route.strip('/').replace('/','-') or 'home'}-{width}.png"))
   if route=='/':
    assert page.get_by_role('button',name='neon theme').count()==0
    assert page.locator('#resize-images a').count()==13
    assert page.locator('#convert-images a').count()==8
    assert page.locator('main > section').first.get_attribute('class').startswith('image-editor-workspace')
    if width>=1024:
     for menu,count in [('Resize',13),('Convert',8)]:
      trigger=page.get_by_role('button',name=menu,exact=True);trigger.click()
      panel=page.locator('#nav-'+menu.lower());expect(panel).to_be_visible()
      assert panel.locator('a').count()==count+(1 if menu=='Convert' else 0)
      page.keyboard.press('Escape');expect(panel).not_to_be_visible();expect(trigger).to_be_focused()
     page.get_by_role('button',name='rose theme',exact=True).click();assert page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()")=='#f43f5e'
    else:
     page.get_by_role('button',name='Open navigation',exact=True).click()
     mobile=page.get_by_role('navigation',name='Mobile navigation',exact=True);expect(mobile).to_be_visible()
     mobile.locator('summary').filter(has_text='Resize').click();assert mobile.locator('a[href^="/resize/"]').count()==13
     mobile.locator('summary').filter(has_text='Convert').click();assert mobile.locator('a[href^="/converter/"]').count()==8
     page.keyboard.press('Escape');expect(mobile).not_to_be_visible()
   print(width,route,'ok',flush=True)
  c.close()
 # Real image workflow after the control sizes change.
 page=b.new_page(viewport={'width':1440,'height':900});page.goto(base,wait_until='domcontentloaded')
 page.get_by_role('button',name='Try sample image',exact=True).click()
 expect(page.locator('.image-editor-workspace')).to_have_attribute('data-loaded','true')
 page.wait_for_timeout(700)
 page.screenshot(path=str(out/'editor-loaded-1440.png'))
 print('loaded controls',page.locator('.editor-controls').evaluate('(el)=>({width:el.clientWidth,height:el.clientHeight,scroll:el.scrollHeight})'),flush=True)
 page.locator('.editor-settings').evaluate('(el)=>el.scrollTop=el.scrollHeight')
 page.get_by_role('button',name='Download & Share',exact=True).click()
 expect(page.get_by_role('dialog')).to_be_visible()
 with page.expect_download() as download:
  page.get_by_role('button',name='Download PNG',exact=True).click()
 download.value.save_as(str(out/'sample-square-export.png'))
 page.get_by_role('button',name='Close',exact=True).click() if page.get_by_role('button',name='Close',exact=True).count() else page.keyboard.press('Escape')
 print('Sample PNG export passed',flush=True)
 b.close()
(out/'layout-results.json').write_text(json.dumps({'layouts':rows,'pageErrors':errors},indent=2),encoding='utf-8')
assert not errors, errors
assert all(row['scrollWidth']<=row['width'] for row in rows), 'Horizontal overflow found'
print('PASS',len(rows),'responsive pages; all menus, guide anchors and sample loading passed',flush=True)
