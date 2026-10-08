"""Production smoke checks; saves status and event names without client identifiers."""
import io, json, re, sys
from PIL import Image
from pathlib import Path
from urllib.parse import urlsplit, parse_qs
from playwright.sync_api import sync_playwright, expect

BASE=sys.argv[1] if len(sys.argv)>1 else "https://www.squarepic.io"
OUT=Path("squarepic.io-audit/release")/(sys.argv[2] if len(sys.argv)>2 else "production-final")
OUT.mkdir(parents=True,exist_ok=True)
rows=[];responses=[];failures=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path="C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe",headless=True)
 c=b.new_context(accept_downloads=True)
 c.add_init_script("window.cspViolations=[];addEventListener('securitypolicyviolation',e=>cspViolations.push({directive:e.effectiveDirective,blocked:e.blockedURI.split('?')[0]}))")
 page=c.new_page()
 def observe(response):
  u=urlsplit(response.url)
  if any(s in u.netloc for s in ["google","startupbar"]) or u.path.startswith("/_vercel") or re.match(r"/[0-9a-f]{16}/",u.path):
   params=parse_qs(u.query)
   events=list(params.get("en",[]))
   for line in (response.request.post_data or "").splitlines():events.extend(parse_qs(line).get("en",[]))
   responses.append({"host":u.netloc,"path":u.path,"method":response.request.method,"status":response.status,"events":events})
 page.on("response",observe)
 page.on("requestfailed",lambda r:failures.append({"host":urlsplit(r.url).netloc,"path":urlsplit(r.url).path,"failure":r.failure}))
 for source,destination in [
  ("/blog/how-to-square-image-for-any-platform","/guides/make-image-square-without-cropping"),
  ("/converter/png-to-jpeg","/converter/png-to-jpg"),
 ]:
  response=c.request.get(BASE+source,max_redirects=0)
  assert response.status in [301,308],(source,response.status)
  assert response.headers["location"].endswith(destination)
  rows.append({"url":source,"status":response.status,"location":response.headers["location"]})
 for route in ["/guides/make-image-square-without-cropping","/cropper","/about","/author/sevenonelabs"]:
  response=page.goto(BASE+route,wait_until="networkidle");assert response.status==200
  assert page.locator('link[rel="canonical"]').get_attribute("href")==BASE+route
  assert not page.locator('meta[name="robots"][content*="noindex"]').count()
  assert not page.locator('script[type="application/ld+json"]').evaluate_all("els=>els.some(e=>e.textContent.includes('\"@type\":\"Person\"'))")
  rows.append({"url":route,"status":response.status,"canonical":BASE+route})
 for file in ["source","fit","crop"]:
  response=c.request.get(BASE+f"/examples/square-{file}.png")
  assert response.status==200 and response.body().startswith(b"\x89PNG\r\n\x1a\n")
 for kind,dimensions in [("portrait",(900,1350)),("product",(900,600))]:
  for variant in ["source","fit","crop"]:
   response=c.request.get(BASE+f"/examples/{kind}-{variant}.webp")
   assert response.status==200 and response.body()[8:12]==b"WEBP"
   assert response.headers["content-type"].startswith("image/webp")
   with Image.open(io.BytesIO(response.body())) as image:
    image.load();assert image.size==(dimensions if variant=="source" else (max(dimensions),max(dimensions)))
 page.goto(BASE,wait_until="networkidle")
 assert page.get_by_text("Portrait photo",exact=True).count()==1
 assert page.get_by_text("Product photo",exact=True).count()==1
 page.goto(BASE,wait_until="networkidle")
 page.locator('input[type=file]').first.set_input_files("public/examples/square-source.png")
 page.get_by_role("button",name="Download & Share",exact=True).click()
 with page.expect_download():page.get_by_role("button",name="Download PNG",exact=True).click()
 # GA4 batches tool events; wait for collection before closing the page.
 page.wait_for_timeout(12000)
 violations=page.evaluate("cspViolations")
 (OUT/"smoke.json").write_text(json.dumps({"urls":rows,"responses":responses,"failed_requests":failures,"csp_violations":violations},indent=2),encoding="utf8")
 ga=[r for r in responses if "google" in r["host"] and r["path"].endswith("collect")]
 assert ga and all(r["status"] in [200,204] for r in ga),ga
 names={name for r in ga for name in r["events"]}
 assert {"tool_upload_accepted","tool_processing_success","tool_download"}<=names,names
 sdk_scripts=page.locator('script[data-sdkn]').evaluate_all("els=>els.map(e=>({path:new URL(e.src).pathname,sdk:e.dataset.sdkn}))")
 analytics_script=next(s for s in sdk_scripts if s["sdk"].startswith("@vercel/analytics"))
 assert any(r["path"]==analytics_script["path"] and r["status"]==200 for r in responses),analytics_script
 (OUT/"vercel-sdk.json").write_text(json.dumps(sdk_scripts,indent=2))
 assert any("startupbar" in r["host"] and r["status"]==200 for r in responses),responses
 assert not violations,violations
 c.close();b.close()
(OUT/"smoke.json").write_text(json.dumps({"urls":rows,"responses":responses,"failed_requests":failures,"csp_violations":violations},indent=2),encoding="utf8")
print("Production redirects, canonical/indexing controls, examples, analytics collection and referral widget passed")
