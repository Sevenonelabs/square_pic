import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
base=sys.argv[1] if len(sys.argv)>1 else "https://www.squarepic.io"
label=sys.argv[2] if len(sys.argv)>2 else "before"
out=Path("squarepic.io-audit/release")/label
out.mkdir(parents=True,exist_ok=True)
rows=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path="C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe",headless=True)
 for width in [320,375,390,768,1366]:
  c=b.new_context(viewport={"width":width,"height":900})
  c.add_init_script("window.shifts=[];window.lcp=0;new PerformanceObserver(l=>l.getEntries().filter(e=>!e.hadRecentInput).forEach(e=>shifts.push(e.value))).observe({type:'layout-shift',buffered:true});new PerformanceObserver(l=>l.getEntries().forEach(e=>window.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true})")
  c.tracing.start(screenshots=True,snapshots=True)
  page=c.new_page()
  for route in ["/","/converter","/compressor","/cropper","/upscaler","/image-size-calculator","/resize/linkedin"]:
   page.goto(base+route,wait_until="networkidle")
   page.wait_for_timeout(500)
   slug=route.strip("/").replace("/","-") or "home"
   page.screenshot(path=str(out/f"{slug}-{width}.png"))
   r=page.evaluate("""() => ({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,cls:shifts.reduce((a,b)=>a+b,0),overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)}).slice(0,12).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,60)})),widget:performance.getEntriesByType('resource').filter(e=>e.name.includes('startupbar')).map(e=>({url:e.name,duration:e.duration,bytes:e.transferSize}))})""")
   rows.append({"route":route,"run":0,"lcp_ms":page.evaluate("window.lcp"),**r})
   print(width,route,r["scrollWidth"],r["cls"],flush=True)
  if width in [375,1366] and "--repeat" in sys.argv:
   for run in [1,2]:
    for route in ["/","/converter","/compressor"]:
     page.goto(base+route,wait_until="networkidle");page.wait_for_timeout(500)
     r=page.evaluate("({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,cls:shifts.reduce((a,b)=>a+b,0),lcp_ms:window.lcp})")
     rows.append({"route":route,"run":run,**r})
     print(width,route,"repeat",run,r["scrollWidth"],r["cls"],flush=True)
  c.tracing.stop(path=str(out/f"trace-{width}.zip"));c.close()
 b.close()
(out/"layout.json").write_text(json.dumps(rows,indent=2),encoding="utf8")
