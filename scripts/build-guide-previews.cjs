// Render fresh 2027 social-preview cards. Requires Playwright via NODE_PATH.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const editions = require('../src/data/guide-editions-2027.json');
const root = path.resolve(__dirname, '..');
const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    for (const edition of Object.values(editions)) {
      await page.setContent(`<!doctype html><html><head><style>
        *{box-sizing:border-box}body{margin:0;background:#0b111b;color:#edf3fa;font-family:Arial,sans-serif}
        main{width:1200px;height:630px;padding:58px 72px;position:relative;overflow:hidden}
        header{display:flex;align-items:center;gap:15px;font-size:28px;font-weight:700}
        .logo{width:32px;height:32px;border:4px solid #b6ef00}.edition{margin-left:auto;color:#b6ef00;font-size:18px}
        h1{font-size:62px;line-height:1.08;letter-spacing:-2px;max-width:950px;margin:92px 0 24px}
        p{font-size:25px;line-height:1.4;color:#abb8c7;margin:0;max-width:900px}
        footer{position:absolute;left:72px;bottom:48px;color:#abb8c7;font-size:19px}
        .rule{position:absolute;width:230px;height:7px;background:#b6ef00;bottom:0;left:72px}
      </style></head><body><main><header><div class="logo"></div>SquarePic<span class="edition">2027 PLANNING GUIDE</span></header>
      <h1>${escape(edition.title.replace(' 2027', ''))}</h1><p>Dimensions, crop guidance and official source links.<br>Based on documentation checked October 9, 2026.</p>
      <footer>squarepic.io/guides</footer><div class="rule"></div></main></body></html>`);
      const target = path.join(root, 'public', edition.image);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      await page.screenshot({ path: target });
      console.log(path.relative(root, target));
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
