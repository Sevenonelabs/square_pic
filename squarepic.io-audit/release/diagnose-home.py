import json, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright
rows=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path="C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe",headless=True)
 for run in range(3):
  c=b.new_context(viewport={"width":390,"height":900})
  c.add_init_script("""window.shifts=[];new PerformanceObserver(l=>l.getEntries().filter(e=>!e.hadRecentInput).forEach(e=>shifts.push({value:e.value,time:e.startTime,padding:getComputedStyle(document.body).paddingTop,source:e.sources.map(s=>({tag:s.node?.tagName,cls:s.node?.className,text:s.node?.textContent?.slice(0,70),previous:s.previousRect,current:s.currentRect}))}))).observe({type:'layout-shift',buffered:true})""")
  if "--delay-js" in sys.argv:
   def slow_chunk(route):
    time.sleep(.15);route.continue_()
   c.route("**/_next/static/chunks/*.js",slow_chunk)
  page=c.new_page();page.goto(sys.argv[1] if len(sys.argv)>1 else "https://www.squarepic.io",wait_until="networkidle");page.wait_for_timeout(1500)
  rows.append({"run":run,"shifts":page.evaluate("shifts"),"font":page.evaluate("getComputedStyle(document.body).fontFamily"),"padding":page.evaluate("getComputedStyle(document.body).paddingTop")})
  c.close()
 b.close()
Path("squarepic.io-audit/release/home-shift-diagnostics"+("-delayed" if "--delay-js" in sys.argv else "")+".json").write_text(json.dumps(rows,indent=2))
print(json.dumps(rows,indent=2))
