import json,datetime
from pathlib import Path
p=Path(__file__).resolve().parent
def load(n): return json.loads((p/(n+'.json')).read_text(encoding='utf-8-sig'))['data'].get('rows',[])
rows=load('trend-date')
print('LATEST',rows[-12:])
d=datetime.date(2026,7,3)
while d<datetime.date(2026,10,16):
 e=d+datetime.timedelta(days=6)
 rr=[r for r in rows if str(d)<=r['keys'][0]<=str(e)]
 print(str(d),sum(r['clicks'] for r in rr),sum(r['impressions'] for r in rr),round(sum(r['position']*r['impressions'] for r in rr)/max(1,sum(r['impressions'] for r in rr)),2))
 d+=datetime.timedelta(days=7)
a={r['keys'][0]:r for r in load('recent-query')}
b={r['keys'][0]:r for r in load('priorweek-query')}
print('QUERY LOSSES',[(k,b.get(k),a.get(k)) for k in sorted(a.keys()|b.keys(),key=lambda k:a.get(k,{}).get('clicks',0)-b.get(k,{}).get('clicks',0))[:12]])
print('COUNTRY',load('priorweek-country')[:8])
print('DEVICE',load('priorweek-device'))
