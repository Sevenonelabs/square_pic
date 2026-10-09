import json, csv
from pathlib import Path
root=Path('docs/gsc-opportunities-2026-10-09')
rows=json.loads((root/'data/queries-current.json').read_text())['data']['rows']
rows=[r for r in rows if r['clicks']>=0 and r['impressions']>0]
old=json.loads((root/'data/queries-90d.json').read_text())['data']['rows']
prior={r['keys'][0]:r for r in old}
mapfile=Path('docs/gsc-keywords-2026-10-08/page-keyword-map.json')
existing=json.loads(mapfile.read_text())
(root/'target-map-before.json').write_text(json.dumps(existing,indent=2),encoding='utf-8')
targets={q.strip().lower() for p in existing for q in p['target_keyword'].split(';')}
page_rows=json.loads((root/'data/page-query-current.json').read_text())['data']['rows']
clusters={
 'square-size': ['square size','square image size','square photo size','square picture size','square pixel size','square size in pixels','square aspect ratio','square ratio size','square size photo'],
 'photo-enlargement': ['where to enlarge photos','where can i enlarge a photo','enlarge image without losing quality','how to enlarge a photo','how to enlarge an image','how to enlarge image','how do i enlarge a photo','how do you enlarge a photo','how to enlarge an image without losing quality','how to enlarge image without losing quality','upscale image for printing'],
}
selected={q:cluster for cluster,qs in clusters.items() for q in qs}
ambiguous={'square size': 'Could mean physical squares or other sizing tasks; inspect query intent before treating as photo demand.',
 'where to enlarge photos': 'Could mean a local physical print service.',
 'where can i enlarge a photo': 'Could mean a local physical print service.'}
def intent_confidence(query):
 return 'ambiguous' if query in ambiguous else 'direct-match' if query in selected else 'not-reviewed'
fields=['query','clicks','impressions','ctr','position','impressions_90d','explicit_target_in_previous_map','selected_cluster','intent_confidence']
with (root/'queries-with-impressions.csv').open('w',encoding='utf-8',newline='') as f:
 w=csv.DictWriter(f,fieldnames=fields);w.writeheader()
 for r in sorted(rows,key=lambda r:r['impressions'],reverse=True):
  q=r['keys'][0]
  w.writerow({'query':q,**{k:r[k] for k in ['clicks','impressions','ctr','position']},'impressions_90d':prior.get(q,{}).get('impressions',0),'explicit_target_in_previous_map':q.lower() in targets,'selected_cluster':selected.get(q,''),'intent_confidence':intent_confidence(q)})
queue=[]
for cluster,qs in clusters.items():
 rr=[r for r in rows if r['keys'][0] in qs]
 direct=[r for r in rr if r['keys'][0] not in ambiguous]
 uncertain=[r for r in rr if r['keys'][0] in ambiguous]
 queue.append({'cluster':cluster,'queries':[{'query':r['keys'][0],**{k:r[k] for k in ['clicks','impressions','position']},'impressions_90d':prior.get(r['keys'][0],{}).get('impressions',0),'intent_confidence':intent_confidence(r['keys'][0]),'intent_note':ambiguous.get(r['keys'][0],''),'existing_urls':sorted({p['keys'][0] for p in page_rows if p['keys'][1]==r['keys'][0]})} for r in sorted(rr,key=lambda r:r['impressions'],reverse=True)],'clicks':sum(r['clicks'] for r in rr),'impressions':sum(r['impressions'] for r in rr),'direct_match':{'clicks':sum(r['clicks'] for r in direct),'impressions':sum(r['impressions'] for r in direct)},'ambiguous':{'clicks':sum(r['clicks'] for r in uncertain),'impressions':sum(r['impressions'] for r in uncertain)}})
(root/'selected-opportunities.json').write_text(json.dumps(queue,indent=2),encoding='utf-8')
summary={'collected_date':'2026-10-09','collection_timezone':'Asia/Calcutta','property':'sc-domain:squarepic.io','search_type':'web','current_period':['2026-09-09','2026-10-06'],'supporting_period':['2026-07-09','2026-10-06'],'predicate':'clicks >= 0 and impressions > 0','query_rows':len(rows),'zero_click_query_rows':sum(r['clicks']==0 for r in rows),'row_cap':25000,'property_totals':json.loads((root/'data/totals-current.json').read_text())['data']['rows'][0],'caveat':'Query data omits anonymized queries and returns top rows. Query-only metrics are used for opportunity counts; page/query rows only identify landing URLs. No volume or keyword difficulty estimates.'}
(root/'manifest.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))
print(json.dumps([{k:v for k,v in c.items() if k!='queries'} for c in queue],indent=2))
