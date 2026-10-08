# Sitemap audit — production, 8 October 2026

Evidence: `data/sitemap-discovery.json`, `data/crawl.json`, `data/http-probes.json`, raw source paths in those JSON records. Production evidence is separate from any pending local changes.

## Discovered sitemaps

| URL | HTTP / type | XML result | Coverage |
|---|---|---|---|
| [sitemap.xml](https://www.squarepic.io/sitemap.xml) | 200, application/xml | Valid standard urlset | 49 unique URLs |
| [sitemap-images](https://www.squarepic.io/sitemap-images) | 200, application/xml | Invalid at line 104, column 35 | 14 intended image/page entries visible in source; not a valid parsed sitemap |

Both are declared in [robots.txt](https://www.squarepic.io/robots.txt). Discovery also tested common index/WordPress paths and found no other valid sitemap. Main sitemap is far below 50,000 URLs / 50 MB; no split is necessary.

All 49 main-sitemap URLs are HTTPS, HTTP 200, have self-referencing canonicals, and do not carry noindex. Homepage's empty path and canonical slash normalize to the same URL, not a meaningful duplication. Every canonical page discovered by this crawl is included; the only extra HTML request is `/resize`, which correctly permanently redirects to home and is absent from the sitemap.

## High: image sitemap cannot be parsed

`<image:title>YouTube Banner & Thumbnail Sizes 2026</image:title>` contains an unescaped `&`. Fix with XML-safe serialization (`&amp;`) or remove deprecated `image:title` and `image:caption` fields altogether. Keep supported `image:image` and `image:loc`. Do not describe the endpoint as HTML: it is XML with a syntax error.

Expected validation: fetched production XML parses successfully, all image locations return supported image MIME types and 200, and GSC's image-sitemap error resolves after processing. Leading indicator: parse success and sitemap fetch status. If parse success does not fix processing, inspect GSC's exact error rather than adding more sitemap fields.

## Medium: one sitemap-only page

`/converter/webp-to-avif` is absent from all discovered raw internal anchor destinations. Main sitemap discovery alone does not give it useful contextual internal links. Verify working AVIF export first, then link from `/converter` and relevant conversion pages. Validation: anchor crawl reaches it within two clicks of home.

## Low/info: modification dates and ignored fields

Main sitemap dates are clustered: 33 URLs at 2026-07-13, 11 at 2026-07-19, five at 2026-08-14. This is a review signal, not proof of inaccurate dates. We do not have production change history. Use actual significant content/structured-data/link modification dates and do not refresh dates on every audit/deploy without a corresponding content change. Google ignores `priority` and `changefreq`, which are currently present; removal is optional cleanup.

Primary sources: [Google sitemap construction and lastmod guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Google image sitemap supported tags](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).
