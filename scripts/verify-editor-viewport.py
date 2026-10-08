"""Loaded editor viewport, real-photo output and browser-engine regressions.
Run: python scripts/verify-editor-viewport.py BASE LABEL [--photos]
Requires the installed Playwright browser engines and Pillow.
"""
import json, sys
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3000'
OUT = Path('squarepic.io-audit/release') / (sys.argv[2] if len(sys.argv) > 2 else 'editor-local')
OUT.mkdir(parents=True, exist_ok=True)
PHOTO = Path('public/examples/portrait-source.webp').resolve()
ROWS = []
MEASURE = '''() => {
 const box = e => { const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,bottom:r.bottom,right:r.right}; };
 return { canvas:box(document.querySelector('canvas')), preview:box(document.querySelector('.editor-canvas-container')),
  export:box([...document.querySelectorAll('button')].find(b=>b.textContent==='Download & Share')),
  buffer:{width:document.querySelector('canvas').width,height:document.querySelector('canvas').height},dpr:devicePixelRatio,
  settings:box(document.querySelector('.editor-settings')), header:box(document.querySelector('header')), height:innerHeight,width:innerWidth,
  docWidth:document.documentElement.scrollWidth,settingsScroll:document.querySelector('.editor-settings').scrollHeight,
  settingsHeight:document.querySelector('.editor-settings').clientHeight };
}'''

def fit(page, name):
    expect(page.locator('canvas')).to_be_visible()
    page.wait_for_timeout(400) # Let ResizeObserver and StartupBar settle before measuring.
    m = page.evaluate(MEASURE)
    c, p, e = m['canvas'], m['preview'], m['export']
    assert c['w'] > 0 and c['h'] > 0, (name, m)
    assert c['y'] >= 0 and c['bottom'] <= m['height']+1, (name, m)
    assert c['x'] >= p['x']-1 and c['right'] <= p['right']+1, (name, m)
    assert p['y'] >= m['header']['bottom']-1, (name,m)
    assert m['settings']['y'] >= m['header']['bottom']-1, (name,m)
    assert c['y'] >= p['y']-1 and c['bottom'] <= p['bottom']+1, (name, m)
    assert e['y'] >= 0 and e['bottom'] <= m['height']+1, (name, m)
    assert m['docWidth'] <= m['width'], (name, m) # WebKit reserves space for its scrollbar.
    assert abs(m['buffer']['width'] - c['w']*min(m['dpr'],2)) <= 1, (name,m)
    assert abs(m['buffer']['height'] - c['h']*min(m['dpr'],2)) <= 1, (name,m)
    ROWS.append({'test': name, **m})
    (OUT/'results.json').write_text(json.dumps(ROWS,indent=2),encoding='utf-8')
    print(name, 'canvas',round(c['w']),round(c['h']),'export bottom',round(e['bottom']),flush=True)

with sync_playwright() as p:
    engines = [next(a.split('=',1)[1] for a in sys.argv if a.startswith('--engine='))] if any(a.startswith('--engine=') for a in sys.argv) else ['chromium','firefox','webkit']
    for engine in engines:
        opts = {'headless':True}
        if engine == 'chromium':opts['executable_path']='C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe'
        browser = getattr(p,engine).launch(**opts)
        for w,h,touch in [(2878,1614,False),(1366,768,False),(1024,600,False),(375,667,True),(390,844,True),(320,568,True),(844,390,True)]:
            context=browser.new_context(viewport={'width':w,'height':h},has_touch=touch,device_scale_factor=2 if touch else 1,accept_downloads=True)
            # Development regressions do not become production analytics traffic.
            context.route('**/google-analytics.com/**',lambda route:route.abort())
            context.route('**/googletagmanager.com/**',lambda route:route.abort())
            page=context.new_page()
            page.goto(BASE+'/',wait_until='networkidle')
            page.locator('input[type=file]').first.set_input_files(str(PHOTO))
            fit(page,f'{engine}-{w}x{h}-square')
            (page.get_by_role('button',name='Instagram',exact=True).tap() if touch else page.get_by_role('button',name='Instagram',exact=True).click())
            preset=page.get_by_role('button',name='Stories/Reels',exact=False)
            (preset.tap() if touch else preset.click())
            fit(page,f'{engine}-{w}x{h}-portrait')
            page.get_by_label('Zoom',exact=True).fill('200')
            fit(page,f'{engine}-{w}x{h}-zoom')
            if w in [1366,375]:
                page.get_by_label('Zoom',exact=True).fill('100')
                fit(page,f'{engine}-{w}x{h}-return-to-fit')
                page.screenshot(path=str(OUT/f'{engine}-{w}-portrait.png'))
                page.get_by_role('button',name='Download & Share',exact=True).click()
                expect(page.get_by_role('dialog')).to_be_visible()
                expect(page.get_by_role('button',name='Share image',exact=True)).to_be_visible()
                with page.expect_download() as pending:
                    page.get_by_role('button',name='Download PNG',exact=True).click()
                dest=OUT/f'{engine}-{w}-portrait-export.png';pending.value.save_as(str(dest))
                with Image.open(dest) as image:assert image.size==(1080,1920),(engine,image.size)
                page.get_by_role('button',name='Download & Share',exact=True).click()
                page.get_by_role('button',name='Close export',exact=True).press('Escape')
                expect(page.get_by_role('dialog')).to_have_count(0)
                expect(page.get_by_role('button',name='Download & Share',exact=True)).to_be_focused()
            page.set_viewport_size({'width':h,'height':w})
            fit(page,f'{engine}-{w}x{h}-rotated')
            context.close()

        context=browser.new_context(viewport={'width':375,'height':667},accept_downloads=True)
        context.route('**/google-analytics.com/**',lambda route:route.abort())
        context.route('**/googletagmanager.com/**',lambda route:route.abort())
        page=context.new_page();page.goto(BASE+'/resize/instagram',wait_until='networkidle')
        page.locator('input[type=file]').first.set_input_files(str(PHOTO))
        fit(page,f'{engine}-embedded-platform-editor')
        # Invalid input stays inline and permits recovery, with no blocking dialog.
        page.get_by_role('button',name='New Image',exact=True).click()
        page.locator('input[type=file]').first.set_input_files({'name':'bad.png','mimeType':'image/png','buffer':b'not an image'})
        expect(page.locator('.editor-error[role="alert"]')).to_contain_text('could not be opened')
        page.locator('input[type=file]').first.set_input_files(str(PHOTO))
        expect(page.locator('.editor-error[role="alert"]')).to_have_count(0)
        fit(page,f'{engine}-invalid-file-recovery')
        context.close()

        if '--photos' in sys.argv and engine=='chromium':
            context=browser.new_context(viewport={'width':1366,'height':900},accept_downloads=True)
            context.route('**/google-analytics.com/**',lambda route:route.abort())
            context.route('**/googletagmanager.com/**',lambda route:route.abort())
            page=context.new_page()
            for kind,background in [('product-sneaker','#f5f1ed'),('portrait','#e8edf0')]:
                page.goto(BASE+'/',wait_until='networkidle')
                page.locator('input[type=file]').first.set_input_files(str(Path(f'public/examples/{kind}-source.webp').resolve()))
                page.get_by_label('Padding',exact=True).fill('0')
                page.get_by_role('button',name='Solid',exact=True).click()
                page.get_by_label('Background color',exact=True).fill(background)
                page.get_by_role('button',name='WebP',exact=True).click()
                for mode in ['fit','crop']:
                    if mode=='crop':page.get_by_role('button',name='Crop',exact=True).click()
                    page.get_by_role('button',name='Download & Share',exact=True).click()
                    with page.expect_download() as pending:page.get_by_role('button',name='Download WEBP',exact=True).click()
                    dest=Path(f'public/examples/{kind}-{mode}.webp');pending.value.save_as(str(dest))
                    with Image.open(dest) as image:assert image.width==image.height
                    print('Generated actual SquarePic example',dest,flush=True)
            context.close()
        browser.close()

(OUT/'results.json').write_text(json.dumps(ROWS,indent=2),encoding='utf-8')
print(f'PASS: {len(ROWS)} loaded-editor measurements across {", ".join(engines)}',flush=True)
