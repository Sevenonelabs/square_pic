/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS Node verification script. */
// Run against a production server. Playwright must be available via NODE_PATH.
// NODE_PATH=<bundled node_modules> node scripts/verify-guide-editions.cjs http://localhost:4187
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:4187';
const origin = 'https://www.squarepic.io';
const reference = require('../src/data/social-image-reference.json');
const editions2027 = require('../src/data/guide-editions-2027.json');
const slugs = ['social-media-image-sizes', ...reference.platforms.filter(p => p.guide).map(p => p.guide)];
const out = 'tmp/pdfs';

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
    await context.route(/google-analytics|googletagmanager|startupbar/, route => route.abort());
    const page = await context.newPage();
    const internalLinks = new Set();
    const sitemap = await (await context.request.get(`${base}/sitemap.xml`)).text();
    const imageSitemap = await (await context.request.get(`${base}/sitemap-images`)).text();
    const feed = await (await context.request.get(`${base}/feed.xml`)).text();
    for (const year of [2026, 2027]) {
      for (const slug of slugs) {
        const path = `/guides/${slug}-${year}`;
        const response = await page.goto(`${base}${path}`);
        assert.equal(response.status(), 200, path);
        await page.locator('h1').waitFor({ state: 'visible' });
        assert.equal(await page.locator('h1').count(), 1, path);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${origin}${path}`, path);
        if (year === 2027) {
          assert.equal(await page.title(), `${editions2027[slug].title} | SquarePic`, path);
          assert.match(await page.locator('h1').innerText(), /2027/, path);
          assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'), `${origin}${editions2027[slug].image}`, path);
          assert.equal(await page.locator('meta[property="article:modified_time"]').getAttribute('content'), reference.updated, path);
          assert.ok(imageSitemap.includes(`${origin}${editions2027[slug].image}`), path);
        }
        const editions = page.getByRole('navigation', { name: 'Choose guide year' });
        assert.equal(await editions.locator('a').count(), 2, path);
        assert.equal(await editions.locator('[aria-current="page"]').getAttribute('href'), path, path);
        const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(elements => elements.map(el => JSON.parse(el.textContent)));
        const article = schemas.find(schema => ['Article', 'BlogPosting'].includes(schema['@type']));
        assert.ok(article, path);
        assert.equal(article.url, `${origin}${path}`);
        assert.ok(article.datePublished.slice(0, 10) <= reference.updated, path);
        assert.ok(article.dateModified.slice(0, 10) <= reference.updated, path);
        assert.ok(sitemap.includes(`${origin}${path}`), path);
        assert.ok(feed.includes(`${origin}${path}`), path);
        for (const href of await page.locator('article a[href]').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
          if (href.startsWith('/') && !href.startsWith('//')) internalLinks.add(href);
          if (href.startsWith('#')) assert.equal(await page.locator(`[id="${href.slice(1)}"]`).count(), 1, `${path}: missing anchor ${href}`);
        }
      }
      await page.goto(`${base}/guides/social-media-image-sizes-${year}`);
      await page.locator('h1').waitFor({ state: 'visible' });
      for (const platform of reference.platforms) {
        const section = page.locator(`section#${platform.id}`);
        assert.equal(await section.locator('tbody tr').count(), platform.rows.length);
        for (const source of platform.sources) assert.equal(await section.locator(`a[href="${source.url}"]`).count(), 1);
      }
      const link = page.getByRole('link', { name: `Download ${year} cheat sheet (PDF)`, exact: true });
      const [download] = await Promise.all([page.waitForEvent('download'), link.click()]);
      assert.equal(download.suggestedFilename(), `squarepic-social-media-image-sizes-${year}-cheat-sheet.pdf`);
      await download.saveAs(`${out}/download-${year}.pdf`);
      assert.deepEqual(fs.readFileSync(`${out}/download-${year}.pdf`), fs.readFileSync(`public/downloads/${download.suggestedFilename()}`));
      const pdf = await context.request.get(`${base}/downloads/${download.suggestedFilename()}`);
      assert.equal(pdf.status(), 200);
      assert.match(pdf.headers()['content-type'], /application\/pdf/);
      const legacy = await context.request.get(`${base}/downloads/social-media-image-sizes-${year}-cheat-sheet.pdf`);
      assert.equal(legacy.status(), 200);
      assert.deepEqual(await legacy.body(), await pdf.body(), 'Previously shared download URLs must serve the new branded PDF');
    }
    for (const year of [2026, 2027]) {
      await page.goto(`${base}/guides?year=${year}&category=linkedin`);
      await page.locator('h1').waitFor({ state: 'visible' });
      assert.equal(await page.locator(`a[href="/guides/linkedin-image-sizes-${year}"]`).count(), 1);
      assert.equal(await page.locator(`a[href="/guides/linkedin-image-sizes-${year === 2027 ? 2026 : 2027}"]`).count(), 0);
      await page.getByRole('navigation', { name: 'Guide editions', exact: true }).getByRole('link', { name: `${year === 2027 ? 2026 : 2027} guides` }).click();
      await page.waitForURL(`**/guides?year=${year === 2027 ? 2026 : 2027}&category=linkedin`);
      await page.getByRole('navigation', { name: 'Guide categories', exact: true }).getByRole('link', { name: 'Instagram', exact: true }).click();
      await page.waitForURL(`**/guides?year=${year === 2027 ? 2026 : 2027}&category=instagram`);
    }
    await page.goto(`${base}/guides`);
    await page.locator('h1').waitFor({ state: 'visible' });
    assert.equal(await page.locator('nav[aria-label="Guide editions"] [aria-current="page"]').innerText(), '2027 guides');
    await page.screenshot({ path: `${out}/guides-desktop.png` });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const path of ['/guides', '/guides/social-media-image-sizes-2027', '/guides/facebook-image-sizes-2027']) {
        await page.goto(`${base}${path}`);
        await page.locator('h1').waitFor({ state: 'visible' });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${path} overflows at ${width}`);
        await page.screenshot({ path: `${out}/${path.split('/').pop()}-${width}.png` });
      }
    }
    for (const href of internalLinks) {
      const response = await context.request.get(`${base}${href.split('#')[0]}`);
      assert.equal(response.status(), 200, `Broken internal link: ${href}`);
    }
    console.log(`Passed: 16 edition routes, titles, canonicals, article dates, preview images, sitemaps, RSS editions, source tables, both PDF downloads, year/category navigation, ${internalLinks.size} internal links and mobile/desktop layouts.`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
