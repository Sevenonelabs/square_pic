"""Record the exact local release inputs, including reviewed uncommitted work."""
import hashlib, json, subprocess, sys
from datetime import datetime, timezone
from pathlib import Path

root=Path.cwd()
files=[]
for directory in ["src","public","scripts"]:
 files.extend(p for p in (root/directory).rglob("*") if p.is_file() and "__pycache__" not in p.parts)
files.extend(root/name for name in ["package.json","package-lock.json","pnpm-lock.yaml","next.config.ts","tsconfig.json","postcss.config.mjs","eslint.config.mjs",".vercelignore"] if (root/name).exists())
hashes={p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(set(files))}
payload=json.dumps(hashes,sort_keys=True).encode()
result={"captured_at_utc":datetime.now(timezone.utc).isoformat(),"base_commit":subprocess.check_output(["git","rev-parse","HEAD"],text=True).strip(),"working_tree":subprocess.check_output(["git","status","--short"],text=True).splitlines(),"source_manifest_sha256":hashlib.sha256(payload).hexdigest(),"files":hashes}
out=root/(sys.argv[1] if len(sys.argv)>1 else "squarepic.io-audit/release/source-manifest.json")
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(result,indent=2),encoding="utf8")
print("Release source:",result["source_manifest_sha256"],"base:",result["base_commit"],"files:",len(hashes))
