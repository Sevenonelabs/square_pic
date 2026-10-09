const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, imports = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { exports, require: (name) => {
    assert.ok(name in imports, `Unexpected dependency ${name}`);
    return imports[name];
  }});
  return exports;
}
const renderer = load('src/lib/editor-renderer.ts');
const { squarePlan, printPlan } = load('src/lib/image-planning.ts', { './editor-renderer': renderer });
let checks = 0;
function check(name, verify) { verify(); checks++; process.stdout.write(`PASS ${name}\n`); }
check('landscape fit and centered crop retain correct geometry', () => {
  const p = squarePlan(1200, 800, 1080);
  assert.equal(p.fitWidth, 1080); assert.equal(p.fitHeight, 720);
  assert.equal(p.verticalPadding, 180); assert.equal(p.horizontalPadding, 0);
  assert.equal(p.cropEdge, 800); assert.equal(p.cropLeftRight, 200);
  assert.equal(p.fitScale, 0.9); assert.equal(p.cropScale, 1.35);
});
check('portrait reverses padding and crop directions', () => {
  const p = squarePlan(800, 1200, 1080);
  assert.equal(p.horizontalPadding, 180); assert.equal(p.verticalPadding, 0);
  assert.equal(p.cropTopBottom, 200); assert.equal(p.cropLeftRight, 0);
});
check('square source requires neither padding nor crop', () => {
  const p = squarePlan(800, 800, 800);
  assert.equal(p.fitScale, 1); assert.equal(p.cropScale, 1);
  assert.equal(p.horizontalPadding + p.verticalPadding + p.cropLeftRight + p.cropTopBottom, 0);
});
check('square planner rejects invalid values and exporter overflow', () => {
  for (const w of [0, -1, 1.5, NaN, Infinity, 100001]) assert.equal(squarePlan(w, 800, 1080), null);
  assert.equal(squarePlan(1200, 800, 4097), null);
  assert.ok(squarePlan(1200, 800, renderer.MAX_EXPORT_EDGE));
});
check('print fill accounts for ratio mismatch and limiting source axis', () => {
  const p = printPlan(1200, 800, 10, 8, 300);
  assert.equal(p.targetWidth, 3000); assert.equal(p.targetHeight, 2400);
  assert.equal(p.sourcePpi, 100); assert.equal(p.scale, 3);
  assert.equal(p.needsCrop, true); assert.equal(p.multiplier, 3);
});
check('adequate source does not recommend upscaling', () => {
  const p = printPlan(3000, 2400, 10, 8, 300);
  assert.equal(p.status, 'source-sufficient'); assert.equal(p.multiplier, null);
  assert.equal(p.needsCrop, false);
});
check('fractional print inches round pixel targets', () => {
  const p = printPlan(1200, 800, 3.335, 2.225, 300);
  assert.equal(p.targetWidth, 1001); assert.equal(p.targetHeight, 668);
});
check('pixel and edge output limits reject full-source recommendations', () => {
  assert.equal(printPlan(4000, 3000, 20, 16, 300).status, 'unsupported');
  assert.equal(printPlan(9000, 500, 60, 3.33, 300).status, 'unsupported');
  assert.equal(printPlan(100, 100, 10, 10, 300).status, 'unsupported');
});
check('40 million pixels is an inclusive output boundary', () => {
  const p = printPlan(4000, 2500, 20, 12.5, 300);
  assert.equal(p.multiplier, 2); assert.equal(p.status, 'supported');
});
check('invalid print entries do not produce a recommendation', () => {
  for (const values of [[0,800,10,8,300],[1200,800,0,8,300],[1200,800,10,101,300],[1200,800,10,8,0],[1200,800,10,8,1.5],[1200,800,Infinity,8,300]]) assert.equal(printPlan(...values), null);
});
fs.writeFileSync('docs/gsc-opportunities-2026-10-09/planner-math-verification.json', JSON.stringify({ checks, passed: true }, null, 2));
