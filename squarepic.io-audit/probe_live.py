import collections, concurrent.futures, json, struct, time, urllib.request, urllib.error, urllib.parse
from pathlib import Path
OUT=Path(__file__).parent
D=json.loads((OUT/'data/crawl.json').read_text(encoding='utf-8'))
BASE=D['base']
assets=collections.defaultdict(list)
def walk(o,page):
 if isinstance(o,dict):
  for k,v in o.items():
   if k in ('image','logo'):
    u=v if isinstance(v,str) else v.get('url') if isinstance(v,dict) else None
    if u:assets[u].append(page)
   walk(v,page)
 elif isinstance(o,list):
  for v in o:walk(v,page)
for p in D['pages']:
 for m in p.get('metas',[]):
  if m.get('property')=='og:image':assets[m['content']].append(p['url'])
 walk(p.get('schema',[]),p['url'])
def asset(u):
 start=time.monotonic();o={'url':u,'referenced_by':sorted(set(assets[u]))}
 try:
  try:r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'SquarePicSEOAudit/1.0'}),timeout=25)
  except urllib.error.HTTPError as e:r=e
  b=r.read(2*1024*1024);o.update(status=r.status,final_url=r.url,content_type=r.headers.get('Content-Type'),bytes=len(b),headers=dict(r.headers))
  if b[:8]==b'\x89PNG\r\n\x1a\n':o['width'],o['height']=struct.unpack('>II',b[16:24])
 except Exception as e:o['error']=str(e)
 time.sleep(max(0,1-(time.monotonic()-start)));return o
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex: a=list(ex.map(asset,assets))
(OUT/'data/image-assets.json').write_text(json.dumps(a,ensure_ascii=False,indent=2),encoding='utf-8')
class Redirs(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,req,fp,code,msg,headers,newurl):
  chain.append({'status':code,'from':req.full_url,'to':newurl}); return super().redirect_request(req,fp,code,msg,headers,newurl)
results=[]
for u in ['http://squarepic.io/','http://www.squarepic.io/','https://squarepic.io/','https://www.squarepic.io/resize','https://www.squarepic.io/converter/','https://www.squarepic.io/llms.txt','https://www.squarepic.io/sitemap-images']:
 chain=[];op=urllib.request.build_opener(Redirs());o={'url':u}
 try:
  r=op.open(urllib.request.Request(u,headers={'User-Agent':'SquarePicSEOAudit/1.0'}),timeout=25);o.update(status=r.status,final_url=r.url,redirects=chain,headers=dict(r.headers));b=r.read();
  if '/llms.txt' in u or '/sitemap-images' in u:
   path='raw/'+('llms.txt' if '/llms.txt' in u else 'sitemap-images.html');(OUT/path).write_bytes(b);o['raw_path']=path
 except Exception as e:o.update(error=str(e),redirects=chain)
 results.append(o);time.sleep(1)
(OUT/'data/http-probes.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'assets':a,'probes':results},ensure_ascii=False))
