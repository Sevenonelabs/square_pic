import json
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
CHROME='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe'
out=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=CHROME,headless=True)
 c=b.new_context(viewport={'width':1366,'height':900},accept_downloads=True)
 page=c.new_page()
 for path in ['/','/converter','/compressor','/cropper','/upscaler']:
  page.goto('https://www.squarepic.io'+path,wait_until='networkidle')
  page.locator('input[type=file]').first.set_input_files(str(ROOT/'data/test-transparent.png'))
  page.wait_for_timeout(1000)
  slug=path.strip('/') or 'home'
  page.screenshot(path=str(ROOT/f'screenshots/{slug}-uploaded.png'),full_page=False)
  info=page.evaluate('''()=>({text:document.body.innerText,buttons:[...document.querySelectorAll('button')].map(e=>({text:e.innerText,title:e.title,aria:e.getAttribute('aria-label'),disabled:e.disabled})),inputs:[...document.querySelectorAll('input,select')].map(e=>({tag:e.tagName,type:e.type,id:e.id,value:e.value,placeholder:e.placeholder,options:e.options?[...e.options].map(o=>({value:o.value,text:o.text})):null}))})''')
  info['path']=path;out.append(info)
  (ROOT/'data/tool-ui.json').write_text(json.dumps(out,indent=2),encoding='utf8')
  print(path,json.dumps(info,ensure_ascii=True),flush=True)
 b.close()
