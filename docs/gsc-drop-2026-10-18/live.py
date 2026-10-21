import requests,re,json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
urls=['https://squarepic.io/','https://www.squarepic.io/','https://www.squarepic.io/robots.txt','https://www.squarepic.io/sitemap.xml','https://www.squarepic.io/upscaler','https://www.squarepic.io/guides/instagram-reels-stories-guide']
def check(u):
 r=requests.get(u,timeout=40)
 return dict(url=u,status=r.status_code,final=r.url,robots=r.headers.get('X-Robots-Tag'),canonical=re.findall(r'canonical[^>]+',r.text)[:1],metaRobots=re.findall(r'<meta[^>]+name="robots"[^>]*>',r.text),sample=r.text if u.endswith('robots.txt') else None)
data=list(ThreadPoolExecutor(max_workers=4).map(check,urls))
Path(__file__).with_name('live.json').write_text(json.dumps(data,indent=2))
print(json.dumps(data,indent=2))
