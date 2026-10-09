# Social image guides and PDF cheat sheets

Completed October 9, 2026. Changes are implemented and verified in the local checkout. They have not been deployed.

## Editions and discovery

The eight existing year-specific guides now have separate 2026 and 2027 routes: the social media cheat sheet, Instagram feed, LinkedIn, YouTube, Facebook, TikTok, Pinterest and Discord. Existing 2026 URLs remain available. Each pair has edition navigation and its own canonical URL. The year-neutral photo tutorials and Reels/Stories guide retain their existing URLs.

The guide directory defaults to 2027 and offers a 2026 switch. Year selection persists through category navigation. Main discovery links favor 2027. Related guides, RSS, both sitemaps and llms.txt include the new editions. New preview cards show the 2027 planning label rather than reusing images labeled 2026.

The 2027 guides describe planning from documentation available October 9, 2026. Publication and modification dates use the actual 2026 dates, not a future date.

## Downloads and source review

- `/downloads/squarepic-social-media-image-sizes-2026-cheat-sheet.pdf`
- `/downloads/squarepic-social-media-image-sizes-2027-cheat-sheet.pdf`

Each PDF has six A4 pages: four pages of reference tables and diagrams, followed by two pages of placement notes and sources. The redesign uses the actual SquarePic logo, black and lime branding, embedded Segoe UI fonts where available, larger dimension text and measured spacing. It includes a YouTube banner safe-area diagram and common aspect-ratio diagrams. Every page has a visible, clickable squarepic.io header and the full edition guide URL in its footer. PDF filenames, title, author and creator metadata identify SquarePic. Both editions retain the October 9, 2026 update date and all clickable official source links. Downloads do not require a sign-up. Original unbranded public URLs serve identical copies for existing bookmarks.

The web reference and both PDFs use `src/data/social-image-reference.json`. Every row distinguishes recommendations, minimums, requirements, ad specifications and editorial working canvases. Organic-post sizes are not inferred from an ad specification.

Important findings from official documentation:

- YouTube's custom-thumbnail article currently recommends 3840 x 2160 for video thumbnails. The guide also separates its 2048 x 1152 minimum banner upload and safe area from the 2560 x 1440 recommendation.
- LinkedIn's current company Page cover recommendation is 1512 x 256; personal covers use 1584 x 396.
- Reddit's community banner minimums are 1072 x 128 for desktop and 1080 x 128 for mobile.
- TikTok Carousel ad specifications and Snapchat Single Image or Video Ad specifications are labeled for their exact ad placements.
- WhatsApp's suggested profile minimum differs from the editor's working export. Telegram's generated profile-photo variants are not presented as upload requirements.
- Instagram Help could not be read and Facebook Help redirected to sign-in during review. Their unconfirmed rows remain explicitly labeled as working canvases. The source links and access restrictions are visible on the pages and in the PDFs.

Full platform source URLs are in the reference JSON and PDFs. The LinkedIn and Discord supplementary references were also rechecked during final review.

## Validation

- Production build and TypeScript passed.
- Before committing, an isolated copy of the staged files also passed a production build with webpack and TypeScript. This excludes unrelated editor and site changes in the working tree.
- ESLint passed for the changed guide, metadata and sitemap files. `git diff --check` passed.
- Existing SEO validator passed across 60 sitemap URLs, both XML sitemaps, 22 preview images and 43 llms.txt links.
- Browser verification passed for all 16 edition routes: titles, single headings, canonicals, actual article dates, edition navigation, preview images, RSS and sitemap discovery.
- Both browser download clicks produced the expected filename and bytes, with `application/pdf` responses.
- All 51 internal guide links resolved successfully. Year and category switches were exercised by clicking through the directory.
- Mobile and desktop checks at 390 and 1440 pixels found no document-width overflow. Screenshots and all PDF pages were visually inspected.
- Both PDFs have six pages, all listed dimensions and source URLs, and 18 distinct clickable URLs each. Automated checks require SquarePic branding, a clickable homepage URL and the full guide URL on every page, plus branded metadata. Browser verification checks the new branded download filenames and compatibility copies.

## Regeneration and verification

PDFs require ReportLab and pypdf:

```powershell
python scripts/build-social-cheat-sheets.py
```

The generator saves final PDFs under `output/pdf` and copies them to `public/downloads` for serving. It checks page count, extracted text, per-page branding, metadata and clickable links before copying. On Windows it embeds the installed Segoe UI regular and bold fonts; other systems use Helvetica. The actual logo comes from `public/images/logo-256.png`.

Git attributes preserve PDF bytes and use LF line endings for `public/llms.txt`. The staged PDF bytes were compared with the generated files and parsed successfully before committing.

Preview generation and browser verification require Playwright. Set `NODE_PATH` to an installation containing Playwright, then run:

```powershell
node scripts/build-guide-previews.cjs
npm run build
npm run start -- --port 4187
node scripts/verify-guide-editions.cjs http://localhost:4187
python scripts/validate-seo.py --base http://localhost:4187
```

The browser checks block analytics and third-party scripts. They do not send messages, publish the site or change external accounts.
