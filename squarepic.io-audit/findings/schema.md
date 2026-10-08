# Structured data audit — production, 8 October 2026

Evidence: all 50 crawl records in `data/crawl.json` include parsed JSON-LD and raw HTML paths. The records include one homepage redirect alias. Counts below exclude that alias where relevant. This is source-level semantic/schema review; a Google Rich Results Test session was not run. No local file is treated as deployed evidence.

## Detection

| Top-level type | Canonical page occurrences |
|---|---:|
| Organization | 49 |
| BreadcrumbList | 48 |
| WebApplication | 32 |
| HowTo | 31 |
| FAQPage | 23 |
| BlogPosting | 9 |
| Person | 2 |
| WebSite, SoftwareApplication, CollectionPage, AboutPage, ProfilePage | One each |

All extracted JSON-LD blocks parse successfully and have @context / @type. Primary types, prices, URLs and dates are present in initial HTML. No AggregateRating or Review markup was found. Do not repeat historical claims of fabricated ratings without fresh evidence; there are no such ratings in this crawl.

Editorial schema score suggestion: **70/100**. Rubric: syntactic validity 20/20; type-to-visible-page agreement 12/25; coherent authorship/entities 8/20; page/breadcrumb coverage 20/20; supported feature/maintenance clarity 10/15. This is a manual audit rubric, not a Google validation score. Missing fabricated reviews are never a quality penalty; rich-result eligibility is simply reported separately.

## High: landing-page type and functionality do not agree

All 13 `/resize/*` pages use `WebApplication` although the page itself is a dimensions guide with a CTA to the homepage rather than an embedded editor. Example: [Discord](https://www.squarepic.io/resize/discord) is described in its own schema as a complete size guide, then typed WebApplication. Conversion detail pages similarly link elsewhere for conversion. Schema should describe what is on the URL. Decide the tool-intent implementation first: embed/configure the actual working tool, or use WebPage/Article semantics appropriate to informational content. Do not merely swap a type to chase a rich result. Validation: a user can accomplish the action represented on that exact URL; schema mirrors visible content and passes type validation.

## Medium: SevenOneLabs is both a person and a lab

[Author profile](https://www.squarepic.io/author/sevenonelabs) says SevenOneLabs is a team/software development lab. It emits standalone `Person` with jobTitle `Software Development Lab`, while its `ProfilePage.mainEntity` correctly says `Organization`. All nine BlogPosting author entities use Person named SevenOneLabs. Use a consistent Organization author with a stable `@id`, or publish named human authors and identify them truthfully. This unblocks coherent authorship rather than promising a ranking lift. Validation: one consistent entity type/id across profile and every guide.

## Medium: software rich-result eligibility is incomplete, without being an indexing failure

Homepage SoftwareApplication and 32 WebApplication instances have name and free Offer price but no aggregateRating or review. Google's current software-app rich-result documentation requires a genuine rating or review in addition to name and price. These are valid descriptive schema entities but do not satisfy that particular rich-result requirement. Preserve truthful markup; only add ratings/reviews if real, visible, verifiable user evidence exists. Do not fabricate a number to silence a validator. Validation: Rich Results Test after a legitimate review system exists, with no promise that a rich result will display.

## Low/info: deprecated HowTo and FAQ markup

- 31 HowTo blocks remain. Google removed HowTo rich results in September 2023; this is schema maintenance, not a critical defect or known penalty. Preserve useful visible instructions. Stop creating HowTo markup for Google rich-result objectives; removing obsolete blocks is optional cleanup during template work.
- 23 FAQPage blocks remain. Treat as informational markup, with no promised Google FAQ rich result and no proven AI-citation benefit. Do not remove helpful visible FAQs. Some landing FAQs promise selecting presets/custom dimensions; review these alongside actual tool behavior and correct claims at source.

## Positive findings

All nine guides include BlogPosting headline, description, datePublished/dateModified, image, author URL and publisher. Breadcrumb structure is widely present. Organization logo and all 14 OG/article image URLs were fetched successfully, with image MIME types. Refer to `images.md` for details.

Prioritize truthful functionality and entity semantics before optional markup additions. Validate a representative page from each template and the live output after deploy. Monitor GSC enhancement errors where supported, not a count of schema blocks.

Primary sources: [Google software-app requirements](https://developers.google.com/search/docs/appearance/structured-data/software-app), [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [Google HowTo retirement](https://developers.google.com/search/blog/2023/08/howto-faq-changes).
