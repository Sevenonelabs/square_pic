"""Browser regressions for the October 2026 action plan.
Run against next start or a release: python scripts/verify-tools.py BASE [label]
Requires Pillow and Playwright. Uses the installed Chromium or CHROME_PATH.
"""
import base64, json, os, re, shutil, sys
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw
from playwright.sync_api import sync_playwright, expect
BASE = sys.argv[1] if len(sys.argv)>1 else "http://localhost:3100"
OUT = Path("squarepic.io-audit/release")/(sys.argv[2] if len(sys.argv)>2 else "tools-local")
OUT.mkdir(parents=True,exist_ok=True)
FIXTURE = OUT/"marked.png"
im=Image.new("RGBA",(600,400),(0,0,0,0));d=ImageDraw.Draw(im)
d.rectangle((0,0,39,399),fill=(255,0,0,255));d.rectangle((560,0,599,399),fill=(0,0,255,255));d.rectangle((150,100,449,299),fill=(0,255,0,255));im.save(FIXTURE)
noise=Image.effect_noise((1200,800),100).convert("RGB");noise.save(OUT/"noise.jpg",quality=98)
rows=[]
with sync_playwright() as p:
 engine=os.getenv("BROWSER_ENGINE","chromium")
 options={"headless":True}
 if engine=="chromium":options["executable_path"]=os.getenv("CHROME_PATH","C:/Users/shiva/plugins/claude-seo/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
 b=getattr(p,engine).launch(**options)
 c=b.new_context(viewport={"width":1366,"height":900},accept_downloads=True)
 c.route("**/google-analytics.com/**",lambda route:route.abort())
 c.route("**/googletagmanager.com/**",lambda route:route.abort())
 OBSERVE="""window.auditEvents=[];window.auditBlobs=[];
 window.dataLayer=window.dataLayer||[];const push=window.dataLayer.push.bind(window.dataLayer);
 window.dataLayer.push=function(...args){args.forEach(a=>{if(a&&a[0]==='event'&&a[1].startsWith('tool_'))auditEvents.push(Array.from(a))});return push(...args)};
 const make=URL.createObjectURL.bind(URL);URL.createObjectURL=function(b){auditBlobs.push({type:b.type,size:b.size});return make(b)};"""
 c.add_init_script(OBSERVE)
 page=c.new_page()
 def nav(route,upload=True,fixture=FIXTURE):
  page.goto(BASE+route,wait_until="networkidle")
  page.evaluate("auditEvents=[];auditBlobs=[]")
  if upload: page.locator('input[type=file]').first.set_input_files(str(fixture))
 def record(name,action,fmt=None,size=None,source=None):
  with page.expect_download() as info:action()
  dl=info.value;dest=OUT/(name+"-"+dl.suggested_filename);dl.save_as(str(dest))
  result=Image.open(dest);result.load()
  if fmt: assert result.format==fmt,(name,result.format)
  if size: assert result.size==size,(name,result.size,size)
  # Independent second reader is Chromium's image decoder, including ICO.
  data=base64.b64encode(dest.read_bytes()).decode()
  browser=page.evaluate("""async data=>{const i=new Image();await new Promise((ok,bad)=>{i.onload=ok;i.onerror=bad;i.src='data:application/octet-stream;base64,'+data});return [i.naturalWidth,i.naturalHeight]}""",data)
  assert tuple(browser)==result.size,(name,browser,result.size)
  if source:
   expected=im.crop(source)
   assert result.size==expected.size
   assert ImageChops.difference(result.convert("RGBA"),expected).getbbox() is None,name
  row={"test":name,"format":result.format,"dimensions":list(result.size),"bytes":dest.stat().st_size,"dpr":page.evaluate("devicePixelRatio"),"blob":page.evaluate("auditBlobs.at(-1)"),"events":page.evaluate("auditEvents")}
  if "A" in result.getbands():row["alpha"]=result.getchannel("A").getextrema()
  rows.append(row);print(name,result.format,result.size,flush=True)
  return result,dest
 def event_check(tool,success=1,error=0,downloads=1):
  events=page.evaluate("auditEvents")
  for action,count in [("processing_success",success),("processing_error",error),("download",downloads)]:
   found=[e for e in events if e[1]=="tool_"+action and e[2].get("tool_name")==tool]
   assert len(found)==count,(tool,action,len(found),count,events)
  for e in events:
   assert set(e[2]).issubset({"tool_name","output_format","device_layout","editor_mode","input_source"}),e
   assert "marked" not in json.dumps(e) and "noise.jpg" not in json.dumps(e),e
 for fmt,mime,dim in [("JPEG","JPEG",(600,400)),("PNG","PNG",(600,400)),("WebP","WEBP",(600,400)),("ICO","ICO",(256,171))]:
  nav("/converter")
  page.get_by_role("button",name="WEBP",exact=True).click()
  page.get_by_role("button",name=fmt,exact=True).last.click()
  page.get_by_role("button",name="Convert All",exact=True).click()
  expect(page.get_by_role("button",name="Download",exact=True)).to_be_visible()
  result,_=record("convert-"+fmt,lambda:page.get_by_role("button",name="Download",exact=True).click(),mime,dim)
  if fmt in ["PNG","WebP","ICO"]:assert result.getchannel("A").getextrema()==(0,255)
  if fmt=="JPEG":assert min(result.getpixel((80,50)))>240
  event_check("converter")
 # A result must disappear after changing converter output.
 page.get_by_role("button",name="ICO",exact=True).click();page.get_by_role("button",name="PNG",exact=True).last.click()
 expect(page.get_by_role("button",name="Download",exact=True)).to_have_count(0)
 page.get_by_role("button",name="Convert All",exact=True).click()
 expect(page.get_by_role("button",name="Download",exact=True)).to_be_visible()
 record("converter-change",lambda:page.get_by_role("button",name="Download",exact=True).click(),"PNG",(600,400))
 # Unsupported output buttons are unavailable.
 page.get_by_role("button",name="PNG",exact=True).click()
 for fmt in ["AVIF","BMP","GIF","TIFF"]:expect(page.get_by_role("button",name=fmt,exact=True)).to_be_disabled()
 nav("/converter/png-to-jpg")
 expect(page.get_by_role("button",name="JPEG",exact=True)).to_be_visible()
 page.get_by_role("button",name="Convert All",exact=True).click();expect(page.get_by_role("button",name="Download",exact=True)).to_be_visible()
 record("pair-png-jpg",lambda:page.get_by_role("button",name="Download",exact=True).click(),"JPEG",(600,400))
 nav("/converter/png-to-avif",False)
 expect(page.get_by_role("heading",level=1)).to_contain_text("unavailable")
 assert not page.locator('script[type="application/ld+json"]').evaluate_all("els=>els.some(e=>JSON.parse(e.textContent)['@type']==='WebApplication')")
 # Invalid inputs must produce an error without download.
 nav("/converter",False)
 page.locator('input[type=file]').set_input_files({"name":"broken.png","mimeType":"image/png","buffer":b"not an image"})
 page.get_by_role("button",name="Convert All",exact=True).click();expect(page.locator('span[role="alert"]')).to_be_visible()
 event_check("converter",0,1,0)
 nav("/compressor")
 page.get_by_role("button",name="Compress All",exact=True).click();expect(page.get_by_role("button",name="Download",exact=True)).to_be_enabled()
 record("compress-jpeg",lambda:page.get_by_role("button",name="Download",exact=True).click(),"JPEG",(600,400))
 page.get_by_role("button",name="WEBP",exact=True).click();expect(page.get_by_role("button",name="Download",exact=True)).to_be_disabled()
 page.get_by_role("button",name="Compress All",exact=True).click();expect(page.get_by_role("button",name="Download",exact=True)).to_be_enabled()
 result,_=record("compress-changed-webp",lambda:page.get_by_role("button",name="Download",exact=True).click(),"WEBP",(600,400));assert result.getchannel("A").getextrema()==(0,255)
 page.get_by_label("Compression quality").fill("40");expect(page.get_by_role("button",name="Download",exact=True)).to_be_disabled()
 nav("/compressor",fixture=OUT/"noise.jpg")
 page.get_by_role("button",name="Target Size",exact=True).click();page.get_by_label("Target size",exact=True).fill("10")
 page.get_by_role("button",name="Compress All",exact=True).click();expect(page.get_by_role("button",name="Download",exact=True)).to_be_enabled(timeout=30000)
 result,dest=record("compress-target10",lambda:page.get_by_role("button",name="Download",exact=True).click(),"JPEG");assert dest.stat().st_size<=10240;assert result.width<1200
 assert f"{result.width} x {result.height}" in page.inner_text("body")
 event_check("compressor")
 page.get_by_label("Target size",exact=True).fill("0.001");page.get_by_role("button",name="Compress All",exact=True).click();expect(page.locator('p[role="alert"]')).to_contain_text("too small",timeout=30000)
 expect(page.get_by_role("button",name="Download",exact=True)).to_be_disabled()
 # Source crop dimensions and exact pixels on DPR 1 / 2, desktop / mobile.
 desktop_page=page
 for width,dpr in [(1366,1),(375,2)]:
  crop_context=b.new_context(viewport={"width":width,"height":900},device_scale_factor=dpr,accept_downloads=True)
  crop_context.add_init_script(OBSERVE);page=crop_context.new_page()
  assert page.evaluate("devicePixelRatio")==dpr
  page.set_viewport_size({"width":width,"height":900})
  nav("/cropper");page.get_by_role("button",name="PNG",exact=True).click()
  expect(page.get_by_text("Export size:")).to_contain_text("320 x 320")
  record(f"crop-{width}",lambda:page.get_by_role("button",name="Export Crop",exact=True).click(),"PNG",(320,320),(140,40,460,360))
  event_check("cropper")
  page.get_by_role("button",name="16:9",exact=True).click()
  text=page.get_by_text("Export size:").inner_text();w,h=map(int,re.search(r"(\d+) x (\d+)",text).groups())
  assert abs(w/h-16/9)<.01 and w<=600 and h<=400
  record(f"crop169-{width}",lambda:page.get_by_role("button",name="Export Crop",exact=True).click(),"PNG",(w,h))
  # Same source selection when display size changes.
  page.set_viewport_size({"width":768,"height":900})
  expect(page.get_by_text("Export size:")).to_contain_text(f"{w} x {h}")
  crop_context.close()
 page=desktop_page
 page.set_viewport_size({"width":1366,"height":900})
 for scale in [2,3,4]:
  nav("/upscaler");page.get_by_role("button",name=f"{scale}x",exact=True).click();page.get_by_role("button",name="Upscale Image",exact=True).click()
  expect(page.get_by_role("button",name=f"Download {scale}x",exact=True)).to_be_visible(timeout=30000)
  result,_=record(f"upscale-{scale}",lambda:page.get_by_role("button",name=f"Download {scale}x",exact=True).click(),"PNG",(600*scale,400*scale));assert result.getchannel("A").getextrema()==(0,255)
  event_check("upscaler")
 # Calculator boundaries and example.
 nav("/image-size-calculator",False);page.get_by_label("Width (px)",exact=True).fill("1200");page.get_by_label("Height (px)",exact=True).fill("800")
 expect(page.get_by_text("Aspect ratio:")).to_contain_text("3:2");expect(page.get_by_text("Resolution:")).to_contain_text("0.96")
 expect(page.get_by_text("Resize dimensions:")).to_contain_text("1080 × 720")
 page.get_by_label("Height (px)",exact=True).blur();event_check("calculator",downloads=0)
 page.get_by_label("Height (px)",exact=True).focus();page.get_by_label("Height (px)",exact=True).blur();event_check("calculator",downloads=0)
 page.get_by_label("Width (px)",exact=True).fill("-1");expect(page.get_by_role("status")).to_contain_text("whole pixel")
 page.get_by_label("Width (px)",exact=True).blur();event_check("calculator",1,1,0)
 # Landing presets and browser history.
 for platform in ["linkedin","instagram","discord"]:
  nav("/resize/"+platform)
  assert page.locator("h1").count()==1
  if platform=="linkedin":first,second,dim="Landscape Post","Company Page Cover",(1512,256)
  elif platform=="instagram":first,second,dim="Square Post","Stories/Reels",(1080,1920)
  else:first,second,dim="Server Banner","Server Splash",(1920,1080)
  # Buttons include dimension labels, so match prefixes.
  page.locator("button").filter(has_text=first).first.click();url1=page.url
  page.locator("button").filter(has_text=second).first.click();url2=page.url
  assert url1!=url2
  page.go_back();expect(page).to_have_url(url1)
  page.go_forward();expect(page).to_have_url(url2)
  page.get_by_role("button",name="Download & Share",exact=True).click();expect(page.get_by_role("button",name="Download PNG",exact=True)).to_be_visible()
  record("preset-"+platform,lambda:page.get_by_role("button",name="Download PNG",exact=True).click(),"PNG",dim)
  event_check("resizer")
 # Home exports square dimensions and preserves edge markers in pad modes.
 nav("/");page.get_by_role("button",name="Download & Share",exact=True).click()
 record("square",lambda:page.get_by_role("button",name="Download PNG",exact=True).click(),"PNG",(600,600));event_check("square")
 page.get_by_role("button",name="Solid",exact=True).click()
 page.locator('input[type=range]').first.fill("0")
 page.get_by_role("button",name="Download & Share",exact=True).click()
 fitted,fit_path=record("square-fit",lambda:page.get_by_role("button",name="Download PNG",exact=True).click(),"PNG",(600,600))
 assert fitted.getpixel((20,300))[:3]==(255,0,0) and fitted.getpixel((580,300))[:3]==(0,0,255)
 page.get_by_role("button",name="Crop",exact=True).click()
 page.get_by_role("button",name="Download & Share",exact=True).click()
 cropped,crop_path=record("square-crop",lambda:page.get_by_role("button",name="Download PNG",exact=True).click(),"PNG",(600,600))
 assert cropped.getpixel((20,300))[3]==0 and cropped.getpixel((580,300))[3]==0
 if "--write-examples" in sys.argv:
  examples=Path("public/examples");examples.mkdir(exist_ok=True)
  for source,name in [(FIXTURE,"source"),(fit_path,"fit"),(crop_path,"crop")]:shutil.copyfile(source,examples/f"square-{name}.png")
 # A failed preview clears the busy state and reports one error per attempt.
 nav("/")
 page.evaluate("() => { HTMLCanvasElement.prototype.toBlob=function(cb){cb(null)}; }")
 page.get_by_role("button",name="Download & Share",exact=True).click()
 expect(page.locator(".editor-error[role='alert']")).to_contain_text("Image preview failed")
 expect(page.get_by_role("button",name="Download & Share",exact=True)).to_be_enabled()
 event_check("square",0,1,0)
 nav("/upscaler",False)
 page.locator('input[type=file]').set_input_files({"name":"broken.png","mimeType":"image/png","buffer":b"bad image"})
 expect(page.locator('p[role="alert"]')).to_contain_text("could not be decoded")
 event_check("upscaler",0,1,0)
 c.close();b.close()
(OUT/"results.json").write_text(json.dumps(rows,indent=2),encoding="utf8")
print("All tool regressions passed",flush=True)
