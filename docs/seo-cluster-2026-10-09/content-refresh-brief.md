# Content gaps found during the cluster audit

These are remaining content issues, separate from the link and indexing fixes implemented in this pass. The examples below come from local source files. Refresh the prose and visible FAQ answers together with their structured data.

## TikTok 2026 guide

URL: `/guides/tiktok-image-sizes-2026`

The older prose says every non-9:16 image gets padded, calls 1080 x 1920 universal, and lists carousel images at that size with a 20 MB limit. It also claims TikTok's algorithm favors saturated colors and that a larger video will look worse after compression. These claims are not supported by the source-checked table already used elsewhere on the site.

Use the [TikTok carousel specification](https://ads.tiktok.com/resources/help/article/specifications-for-carousel-ads?lang=en) as the primary reference. Check placement, image count, horizontal/square/vertical sizes and file guidance directly. Keep organic photo-post guidance distinct from carousel ad specifications. Describe 1080 x 1920 as a working canvas where appropriate. Remove unverified algorithm and performance claims. Explain that SquarePic produces still images and does not export edited videos.

Preserve useful topics: photo-post framing, profile crops, cover previews, carousel consistency and export choices. Include contextual links to the TikTok resizer, Reels/Stories guide and current-year social-size hub.

## Pinterest 2026 guide

URL: `/guides/pinterest-image-sizes-2026`

The older article presents 600 x 600 board covers as a confirmed display specification and promises improved repin rates from particular dimensions. The newer reference confirms a standard image recommendation and explicitly distinguishes it from a board-cover requirement. The article and FAQ need the same distinction.

Check [Pinterest's product specifications](https://help.pinterest.com/en/business/article/pinterest-product-specs). Use the documented 2:3 recommendation for the applicable image placement and explain that taller images can be cropped. Check current file-size and format rules before publishing limits. Label SquarePic presets as working canvases when a requirement has not been confirmed. Remove claims of guaranteed visibility, clicks or repins.

Preserve useful topics: standard Pins, composition at phone width, cover cropping and file export. Link to the Pinterest tool, square-size planner and social-size hub.

## Facebook 2026 guide

URL: `/guides/facebook-image-sizes-2026`

The older FAQ treats preset dimensions as upload minimums and repeats a 20% ad-text rule. It asserts that all uploads become JPEG. These statements need direct verification; the newer 2027 guide already says Facebook Help access was restricted and labels the dimensions as working canvases.

Use the official Facebook Help and Meta placement references saved in `src/data/social-image-reference.json`. If access remains restricted, state the limitation and label working canvases consistently. Remove unverified upload limits, ad delivery claims and codec assertions. Keep Page covers, personal profiles, feed images and ads separate, with a preview check for each placement.

Preserve useful topics: mobile cover crops, circular profile previews, separate feed/Story compositions and export choices. Link to the Facebook tool, Instagram feed guide and social-size hub.

## Research before expanding coverage

Tools exist for X / Twitter, Snapchat, WhatsApp, Twitch, Reddit and Telegram without dedicated size guides. Evaluate saved Search Console queries and controlled search results before commissioning pages. Do not create six similar articles solely to fill a platform list.

The 2026 and 2027 editions are intentionally preserved. Compare their actual landing queries after deployment before deciding on consolidation or a different year strategy. No cannibalization resolution is claimed by this audit.
