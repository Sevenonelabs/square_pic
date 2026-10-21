import concurrent.futures
import json
import subprocess
import sys
from pathlib import Path
from bs4 import BeautifulSoup

DATA=Path(__file__).resolve().parent/'data'
RUNTIME='C:/Users/shiva/plugins/claude-seo/scripts/runtime.py'
URLS=[
 'https://square-image.org/',
 'https://squareimage.dev/',
 'https://square-image.org/make-image-square-without-cropping',
 'https://www.easycropimage.com/square-image',
 'https://www.image-color-changer.com/square-image',
 'https://circlecropimage.pro/square-image',
 'https://fileverter.com/tools/image/square-image-generator',
 'https://www.makesquareimage.com/',
 'https://xatools.net/en/square-image/',
]
def collect(entry):
 i,url=entry
 html=DATA/f'competitor-{i+1}.html'
 run=subprocess.run([sys.executable,RUNTIME,'run','render_page.py',url,'--mode','auto','--json','--max-text','1500','--output',str(html)],capture_output=True,text=True,encoding='utf-8',timeout=75)
 (DATA/f'competitor-{i+1}.json').write_text(run.stdout,encoding='utf-8')
 result={'sample_order':i+1,'url':url,'returncode':run.returncode}
 try:
  rendered=json.loads(run.stdout)
  result.update(status=rendered.get('status_code'),mode=rendered.get('mode_used'),error=rendered.get('error'))
  if html.exists():
   soup=BeautifulSoup(html.read_text(encoding='utf-8'),'html.parser')
   types=[]
   def walk(v):
    if isinstance(v,dict):
     if '@type' in v: types.extend(v['@type'] if isinstance(v['@type'],list) else [v['@type']])
     for child in v.values():walk(child)
    elif isinstance(v,list):
     for child in v:walk(child)
   for script in soup.select('script[type="application/ld+json"]'):
    try:walk(json.loads(script.get_text()))
    except ValueError:pass
   result.update(title=soup.title.get_text(' ',strip=True) if soup.title else None,h1=[e.get_text(' ',strip=True) for e in soup.select('h1')],h2=[e.get_text(' ',strip=True) for e in soup.select('h2')],file_inputs=len(soup.select('input[type=file]')),schema_types=sorted(set(types)),images=len(soup.select('main img')))
   for el in soup.select('script,style,nav,header,footer,noscript'):el.decompose()
   text=soup.get_text(' ',strip=True)
   result.update(visible_words_estimate=len(text.split()),text_excerpt=text[:2200])
 except Exception as exc:result['collection_error']=str(exc)
 return result
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
 results=list(pool.map(collect,enumerate(URLS)))
(DATA/'competitor-summary.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
for result in results:print(json.dumps({k:v for k,v in result.items() if k!='text_excerpt'}))
