"""Check sharing, clipboard, errors and focus without contacting share apps."""
import json,sys
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright,expect
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:3000'
OUT=Path('squarepic.io-audit/release')/(sys.argv[2] if len(sys.argv)>2 else 'editor-actions')
OUT.mkdir(parents=True,exist_ok=True)
rows=[]
with sync_playwright() as p:
 for engine in ['chromium','firefox','webkit']:
  opts={'headless':True}
  if engine=='chromium':opts['executable_path']='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe'
  browser=getattr(p,engine).launch(**opts)
  context=browser.new_context(viewport={'width':390,'height':844},accept_downloads=True)
  context.route('**/google-analytics.com/**',lambda route:route.abort())
  context.route('**/googletagmanager.com/**',lambda route:route.abort())
  page=context.new_page();page.goto(BASE+'/',wait_until='networkidle')
  page.locator('input[type=file]').first.set_input_files(str(Path('public/examples/portrait-source.webp').resolve()))
  page.get_by_role('button',name='WebP',exact=True).click()
  page.evaluate('''() => {
   window.shares=[];window.clipboardTypes=[];
   Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>true});
   Object.defineProperty(navigator,'share',{configurable:true,value:async payload=>{
    const f=payload.files[0];shares.push({name:f.name,type:f.type,size:f.size,active:navigator.userActivation.isActive});
    window.sharedData=await f.arrayBuffer();
   }});
   Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write:async items=>{
    clipboardTypes.push(items[0].types);window.copiedData=await (await items[0].getType('image/png')).arrayBuffer();
   }}});
  }''')
  page.get_by_role('button',name='Download & Share',exact=True).click()
  page.get_by_role('button',name='Share image',exact=True).click()
  expect(page.get_by_role('dialog')).to_have_count(0)
  shared=page.evaluate('shares')
  assert shared[0]['type']=='image/webp' and shared[0]['active'],shared
  data=bytes(page.evaluate('Array.from(new Uint8Array(sharedData))'))
  dest=OUT/f'{engine}-shared.webp';dest.write_bytes(data)
  with Image.open(dest) as image:assert image.size==(1350,1350)
  page.get_by_role('button',name='Download & Share',exact=True).click()
  page.get_by_role('button',name='Copy Image',exact=True).click()
  expect(page.get_by_role('status').filter(has_text='Image copied')).to_be_visible()
  assert page.evaluate('clipboardTypes')==[['image/png']]
  dest=OUT/f'{engine}-clipboard.png';dest.write_bytes(bytes(page.evaluate('Array.from(new Uint8Array(copiedData))')))
  with Image.open(dest) as image:assert image.size==(1350,1350) and image.format=='PNG'
  page.evaluate("Object.defineProperty(navigator,'share',{configurable:true,value:async()=>{throw new DOMException('Cancelled','AbortError')}})")
  page.get_by_role('button',name='Share image',exact=True).click()
  expect(page.get_by_role('dialog')).to_be_visible()
  expect(page.get_by_role('dialog').get_by_role('alert')).to_have_count(0)
  page.evaluate("Object.defineProperty(navigator,'share',{configurable:true,value:async()=>{throw new DOMException('Blocked','NotAllowedError')}})")
  page.get_by_role('button',name='Share image',exact=True).click()
  expect(page.get_by_role('dialog').get_by_role('alert')).to_contain_text('Sharing failed')
  page.evaluate("Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>false})")
  page.get_by_role('button',name='Share image',exact=True).click()
  expect(page.get_by_role('dialog').get_by_role('alert')).to_contain_text('cannot share image files')
  with page.expect_download() as pending:page.get_by_role('button',name='Download WEBP',exact=True).click()
  pending.value.save_as(str(OUT/f'{engine}-fallback.webp'))
  expect(page.get_by_role('button',name='Download & Share',exact=True)).to_be_focused()
  page.get_by_role('button',name='New Image',exact=True).click()
  page.locator('input[type=file]').first.set_input_files({'name':'notes.txt','mimeType':'text/plain','buffer':b'notes'})
  expect(page.locator('.editor-error')).to_contain_text('Choose an image file')
  page.locator('input[type=file]').first.set_input_files({'name':'big.png','mimeType':'image/png','buffer':b'0'*(20*1024*1024+1)})
  expect(page.locator('.editor-error')).to_contain_text('exceeds 20 MB')
  page.locator('input[type=file]').first.set_input_files(str(Path('public/examples/portrait-source.webp').resolve()))
  expect(page.locator('.editor-error')).to_have_count(0)
  page.evaluate('() => { window.actualToBlob=HTMLCanvasElement.prototype.toBlob;HTMLCanvasElement.prototype.toBlob=function(callback){callback(null)}; }')
  page.get_by_role('button',name='Download & Share',exact=True).click()
  expect(page.locator('.editor-error')).to_contain_text('Image preview failed')
  expect(page.get_by_role('button',name='Download & Share',exact=True)).to_be_enabled()
  page.evaluate('() => { HTMLCanvasElement.prototype.toBlob=actualToBlob; }')
  page.get_by_role('button',name='Download & Share',exact=True).click()
  expect(page.get_by_role('dialog')).to_be_visible()
  rows.append({'engine':engine,'shared':shared,'clipboard':['image/png'],'tests':['native-file-full-size','native-user-activation','clipboard-png','cancel-share','failed-share','unsupported-share-download','invalid-type','oversized-file','export-failure-retry','focus-restored']})
  print(engine,'all editor actions passed',flush=True)
  context.close();browser.close()
(OUT/'results.json').write_text(json.dumps(rows,indent=2),encoding='utf-8')
