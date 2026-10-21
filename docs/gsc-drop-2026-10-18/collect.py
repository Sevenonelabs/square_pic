import json, subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parent
CLI=str(Path.home()/'AppData/Roaming/npm/gsc.cmd')
periods={'current':('2026-09-17','2026-10-14'),'previous':('2026-08-20','2026-09-16'),'recent':('2026-10-08','2026-10-14'),'priorweek':('2026-10-01','2026-10-07'),'trend':('2026-07-01','2026-10-17')}
tasks=[]
for name,(start,end) in periods.items():
 for dim in (['date'] if name=='trend' else ['totals','page','query','device','country']):
  tasks.append((name+'-'+dim,['analytics','query','--start',start,'--end',end,'--type','web','--limit','25000']+([] if dim=='totals' else ['--dimension',dim])))
tasks.append(('sitemaps',['sitemaps','list']))
def run(task):
 name,args=task
 p=subprocess.run([CLI,*args,'--site','sc-domain:squarepic.io','--format','json'],capture_output=True,text=True,encoding='utf-8',timeout=180)
 try: data=json.loads(p.stdout.lstrip('\ufeff'))
 except ValueError: data={'ok':False,'error':'Non-JSON response withheld'}
 (ROOT/(name+'.json')).write_text(json.dumps(data,indent=2),encoding='utf-8')
 print(name,data.get('ok'),flush=True)
with ThreadPoolExecutor(max_workers=4) as pool: list(pool.map(run,tasks))

