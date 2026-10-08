import concurrent.futures, collections, datetime, hashlib, html, json, re, time, urllib.request, urllib.error, urllib.parse, urllib.robotparser, xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
BASE='https://www.squarepic.io'
OUT=Path(__file__).parent
UA='SquarePicSEOAudit/1.0'
class Doc(HTMLParser):
 def __init__(self):
  super().__init__(); self.title=[]; self.h1=[]; self.headings=[]; self.text=[]; self.links=[]; self.images=[]; self.metas=[]; self.canonicals=[]; self.hreflang=[]; self.schema=[]; self.scripts=[]; self.tagstack=[]; self.skip=0; self.injson=False; self.jsonbuf=[]; self.currenth=None; self.hbuf=[]; self.intitle=False
 def handle_starttag(self,t,a):
  d=dict(a)
  if t in ('script','style','noscript'): self.skip+=1
  if t=='script':
   if d.get('type')=='application/ld+json': self.injson=True; self.jsonbuf=[]
   if d.get('src'): self.scripts.append(d['src'])
  if t=='title': self.intitle=True
  if re.fullmatch('h[1-6]',t): self.currenth=t; self.hbuf=[]
  if t=='a' and d.get('href'): self.links.append(d['href'])
  if t=='img': self.images.append(d)
  if t=='meta': self.metas.append(d)
  if t=='link' and 'canonical' in d.get('rel','').split(): self.canonicals.append(d.get('href'))
  if t=='link' and d.get('hreflang'): self.hreflang.append(d)
 def handle_endtag(self,t):
  if t=='script' and self.injson:
   try: self.schema.append(json.loads(''.join(self.jsonbuf)))
   except Exception as e: self.schema.append({'parse_error':str(e),'raw':''.join(self.jsonbuf)[:1000]})
   self.injson=False
  if t in ('script','style','noscript'): self.skip=max(0,self.skip-1)
  if t=='title': self.intitle=False
  if t==self.currenth:
   v=' '.join(self.hbuf).strip(); self.headings.append({'tag':t,'text':v})
   if t=='h1': self.h1.append(v)
   self.currenth=None
 def handle_data(self,d):
  if self.injson:self.jsonbuf.append(d)
  if self.intitle:self.title.append(d)
  if self.currenth and not self.skip:self.hbuf.append(d)
  if not self.skip and not self.intitle and d.strip():self.text.append(d.strip())
def norm(u,parent=BASE):
 try:
  p=urllib.parse.urlsplit(urllib.parse.urljoin(parent,u))
  if p.scheme not in ('https','http') or p.hostname not in ('www.squarepic.io','squarepic.io') or p.query:return None
  path=p.path.rstrip('/') or '/'
  if re.search(r'\.(jpg|png|webp|avif|svg|gif|ico|css|js|woff2?|ttf|pdf|xml|txt|zip)$',path,re.I):return None
  return BASE+path
 except:return None
def fetch(u):
 start=time.monotonic(); rec={'url':u,'fetched_at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
 try:
  req=urllib.request.Request(u,headers={'User-Agent':UA,'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'})
  try:r=urllib.request.urlopen(req,timeout=30)
  except urllib.error.HTTPError as e:r=e
  raw=r.read(5*1024*1024); txt=raw.decode('utf-8','replace')
  rec.update(status=r.status,final_url=r.url,headers=dict(r.headers),bytes=len(raw),elapsed_ms=round((time.monotonic()-start)*1000),raw_path='raw/'+hashlib.sha256(u.encode()).hexdigest()[:16]+'.txt')
  (OUT/rec['raw_path']).write_text(txt,encoding='utf-8')
  if 'html' in r.headers.get('Content-Type',''):
   d=Doc(); d.feed(txt); vis=' '.join(d.text)
   rec.update(title=' '.join(d.title).strip(),h1=d.h1,headings=d.headings,description=[m.get('content','') for m in d.metas if m.get('name','').lower()=='description'],robots=[m.get('content','') for m in d.metas if m.get('name','').lower() in ('robots','googlebot')],canonicals=d.canonicals,hreflang=d.hreflang,metas=d.metas,schema=d.schema,images=d.images,scripts=d.scripts,links=d.links,text=vis,words=len(vis.split()),text_sha256=hashlib.sha256(vis.encode()).hexdigest(),viewport=[m.get('content','') for m in d.metas if m.get('name')=='viewport'])
 except Exception as e:rec['error']=str(e)
 time.sleep(max(0,1-(time.monotonic()-start)))
 return rec
def main():
 OUT.joinpath('raw').mkdir(exist_ok=True); OUT.joinpath('data').mkdir(exist_ok=True)
 rob=fetch(BASE+'/robots.txt'); rt=(OUT/rob['raw_path']).read_text(encoding='utf-8'); rp=urllib.robotparser.RobotFileParser();rp.parse(rt.splitlines())
 sitemapurls=re.findall(r'^Sitemap:\s*(\S+)',rt,re.M|re.I)
 sm=[]; seeds=[]; pending=list(sitemapurls); seen_sm=set()
 while pending:
  u=pending.pop(0)
  if u in seen_sm:continue
  seen_sm.add(u);r=fetch(u)
  try:
   root=ET.fromstring((OUT/r['raw_path']).read_text(encoding='utf-8')); r['xml_type']=root.tag; r['entries']=[]
   for entry in root:
    vals={v.tag.split('}')[-1]:v.text for v in entry}; r['entries'].append(vals)
    if root.tag.endswith('sitemapindex') and vals.get('loc'):pending.append(vals['loc'])
    elif vals.get('loc'):seeds.append(vals['loc'])
  except Exception as e:r['xml_error']=str(e)
  sm.append(r)
 queue=collections.deque([BASE+'/']+[norm(u) for u in seeds if norm(u)]);seen=set();pages=[];blocked=[]
 with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
  while queue and len(seen)<500:
   batch=[]
   while queue and len(batch)<5 and len(seen)<500:
    u=queue.popleft()
    if not u or u in seen:continue
    seen.add(u)
    if not rp.can_fetch(UA,u):blocked.append(u);continue
    batch.append(u)
   for r in pool.map(fetch,batch):
    pages.append(r)
    for l in r.get('links',[]):
     u=norm(l,r.get('final_url',r['url']))
     if u and u not in seen:queue.append(u)
   (OUT/'data/crawl.json').write_text(json.dumps({'date':'2026-10-08','base':BASE,'robots':rob,'sitemaps':sm,'sitemap_urls':seeds,'pages':pages,'blocked':blocked,'remaining':list(queue),'complete':not queue},ensure_ascii=False,indent=2),encoding='utf-8')
   print(json.dumps({'crawled':len(pages),'queue':len(queue),'status':dict(collections.Counter(r.get('status','error') for r in pages))}),flush=True)
if __name__=='__main__':main()
