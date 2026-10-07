# SquarePic production

Production is this Next.js application on Vercel at https://www.squarepic.io.
The sibling `Phase_3 - Copy` Vite/Hostinger application is a legacy checkout.
Its FTP workflow is manual only and must not serve the production domain.
Apache `.htaccess` changes do not apply to Vercel.

`src/lib/constants.ts` supplies the application origin. If `SITE_URL` is set
in Vercel, use `https://www.squarepic.io` without a trailing slash. Vercel's
domain configuration should redirect apex and HTTP traffic to that origin.
Next also redirects apex requests for all paths to the www host.

## Release checks

```sh
npm ci
npx tsc --noEmit
npm run build
npm run check:seo -- --start-server --output seo-validation.json
```

The SEO checker requires Python 3. It validates both declared XML sitemaps,
every main-sitemap page, canonical URLs, title and description lengths,
social images and their dimensions, JSON-LD, and llms.txt links. The GitHub
SEO workflow runs it on pull requests and pushes to main. Configure the
`validate` check as required in branch protection if release gating is needed.

After a Vercel release, run:

```sh
npm run check:seo -- --base https://www.squarepic.io --output seo-validation.json
```

Check HTTP, apex, and www redirects for the home page and a nested page.
Open the site in a browser and confirm GA4 collection requests succeed with
no CSP violations. Vercel Analytics and Speed Insights endpoints return 404
under `next start`; verify those integrations on Vercel.

The CSP lives in `next.config.ts`. The Next application has no competing
HTML meta policy. Existing inline allowances are preserved for Next's
hydration and analytics setup. Google country domains must be listed
individually if another locale requires them. See
[Google's CSP guide](https://developers.google.com/tag-platform/security/guides/csp).

The image sitemap emits supported image-location tags only and XML-escapes
URLs. Titles and captions were removed according to
[Google's image sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).

## Search monitoring

Use the verified `sc-domain:squarepic.io` property, or its verified www URL
prefix property. Never use the local Google helper's default property,
which belongs to another website. Reauthenticate Google OAuth before
collecting data if token refresh fails.

Compare finalized 28-day periods before and after release. Record clicks,
impressions, CTR, and weighted average position for `/resize/`, converter
pairs, tools, guides, and information pages. Keep a separate dimensionless
query for site totals; query rows omit some anonymized traffic.

Group queries by intent, including making an image square, platform sizes,
format conversion, compression, cropping, and upscaling. Check a consistent
URL sample from each family with URL Inspection for indexing, Google-selected
canonicals, and last crawl dates. Sitemap submitted counts are not indexed
URL counts.

Re-audit immediately after release and compare search performance after
enough finalized data has accumulated. Review mobile and desktop CrUX LCP,
INP, and CLS separately from Lighthouse lab results. llms.txt is a navigation
aid for AI tools; do not treat it as a Google ranking requirement.
