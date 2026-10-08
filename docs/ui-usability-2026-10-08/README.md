# Media and usability improvements

Implemented October 8, 2026.

- Removed the RGB theme and its continuous hue animation. Six solid accent colors remain.
- Increased tiny labels to at least 14px, supporting page copy to 16px, and guide body copy to 16px on phones and 17px on desktop. Enlarged navigation, settings panels and editor controls.
- Put all 13 platform resizers and eight format conversion links at the start of More Free Image Tools, directly after the home editor.
- Added Resize and Convert navigation menus on desktop and mobile, with Escape handling and visible keyboard focus.
- Improved the guides catalog, category filters, guide titles, reading layout and tables. All ten articles have collapsible contents and a link back to all guides.
- Added shared social logos beside platform names and guide titles. Corrected Instagram, Reddit and Snapchat glyphs.
- Fixed footer wrapping, upload-heading clipping, width limits and export access on short screens.

## Validation

- Production build, TypeScript and ESLint passed.
- 95 responsive route checks passed across widths of 320, 390, 768, 1024 and 1440px. No page-level horizontal overflow or browser runtime errors.
- All ten guide contents menus point to existing headings. Desktop and mobile Resize/Convert menus have all expected destinations. Theme selection and Escape dismissal passed.
- Sample upload and PNG download passed. The downloaded square image is 1350 × 1350px.
- Loaded-editor checks passed at 320 × 900, 390 × 844, 667 × 375, 1280 × 500 and 1440 × 900. Export controls remain inside the editor and the export dialog opens at every size.
- Existing crawl checks passed for 50 pages, two XML sitemaps, 14 preview images and 35 llms links.

Run the browser checks against a running app with `python docs/ui-usability-2026-10-08-check.py http://localhost:3004`.

Screenshots, layout-results.json, short-screen-results.json and the sample export are saved beside this report.
