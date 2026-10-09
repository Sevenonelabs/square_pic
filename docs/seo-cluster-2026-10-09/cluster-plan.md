# SquarePic cluster audit and fixes

October 9, 2026. Local production build verified. Changes are not deployed.

## Changes implemented

- Rebuilt related-guide links using the shared guide registry. Added the three photo tutorials previously absent from the related-guide system.
- Added contextual hub links for Instagram feed and Reels guides, and linked both yearly hubs to the evergreen Reels guide.
- Connected both yearly reference hubs to the three photo preparation tutorials.
- Added ItemList markup for the eight visible social-media spokes per hub.
- Removed six unavailable GIF and AVIF conversion routes from the sitemap and added noindex, follow. The pages remain accessible and the eight supported conversions remain indexable.
- Added the three photo tutorials to llms.txt.

## Evidence and limits

The existing Search Console export covers September 9 to October 6, with a supporting July 9 to October 6 window. It is saved evidence from an earlier run, not a new authenticated collection. The direct square-size cluster had 266 impressions and one click; the photo-enlargement cluster had 26 impressions and zero clicks. These are query impressions, not market search volume.

Forty keyword variants are allocated to fourteen existing URLs. Six independent Web searches sampled ten returned URLs each. Their overlap matrix is saved with the sampled URLs. This is a partial boundary check, not a controlled Google top-ten SERP clustering study. Other allocations are provisional intent judgments. No PAA questions or keyword volumes are invented.

The maker and square-size samples share four URLs. Instagram sizing and resizer samples share one URL. This supports keeping related topics connected while retaining distinct tools and instructional pages. It does not establish a need to merge existing pages.

## Existing social guide architecture

| Group | Primary topic | Existing URL |
| --- | --- | --- |
| Instagram feed and vertical artwork | instagram image sizes | /guides/instagram-feed-sizes-2026 |
| Instagram feed and vertical artwork | instagram story size | /guides/instagram-reels-stories-guide |
| Profiles, banners and channel artwork | linkedin image sizes | /guides/linkedin-image-sizes-2026 |
| Profiles, banners and channel artwork | youtube banner size | /guides/youtube-banner-thumbnail-sizes-2026 |
| Profiles, banners and channel artwork | discord banner size | /guides/discord-image-sizes-2026 |
| Feeds, Pins and carousel artwork | facebook image sizes | /guides/facebook-image-sizes-2026 |
| Feeds, Pins and carousel artwork | pinterest pin size | /guides/pinterest-image-sizes-2026 |
| Feeds, Pins and carousel artwork | tiktok image size | /guides/tiktok-image-sizes-2026 |

2027 mirrors follow the same link architecture. The Reels guide is shared across editions. Photo preparation tutorials support both hubs.

## Remaining work

1. Refresh older Facebook, Pinterest and TikTok 2026 prose. Some sections contradict the newer source-checked reference data or make unsupported performance claims. See content-refresh-brief.md.
2. Validate the remaining keyword boundaries with controlled organic results before producing more articles or merging pages.
3. Compare Search Console landing URLs by query after deployment. Year-specific overlap is a risk to assess, not proven cannibalization.
4. Investigate guide demand for the six platforms with tools but no dedicated guide: X / Twitter, Snapchat, WhatsApp, Twitch, Reddit and Telegram. Tool availability alone is not evidence for another article.

## Validation

- Production build and TypeScript check passed.
- ESLint passed for all changed TypeScript files.
- Rendered cluster checks passed for 20 guides, both hub ItemLists, six excluded converters and eight supported converters.
- General SEO validation passed for 54 indexable pages, two XML sitemaps, 22 preview images and 46 llms.txt links.

See cluster-scorecard.md for before/after counts and cluster-map.html for the interactive architecture.
