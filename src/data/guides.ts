export interface Guide {
  path: string;
  title: string;
  description: string;
  date: string;
}

export const GUIDES: Guide[] = [
  {
    path: "/guides/make-image-square-without-cropping",
    title: "How to Make an Image Square Without Cropping",
    description: "Learn how to make an image square without cropping. Follow photo examples, compare blur and solid padding, calculate borders and choose PNG, JPG or WebP export.",
    date: "2026-10-07",
  },
  {
    path: "/guides/social-media-image-sizes-2026",
    title: "Social Media Image Sizes 2026: Cheat Sheet",
    description: "Compare social media image sizes for 2026 across 13 platforms. Find post, profile, banner and Story dimensions, aspect ratios and links to free image resizers.",
    date: "2026-07-19",
  },
  {
    path: "/guides/instagram-feed-sizes-2026",
    title: "Instagram Post Sizes 2026: Feed, Carousel & Profile",
    description: "Compare Instagram feed, carousel and profile sizes with square, portrait and landscape canvases. See fit-versus-crop examples and check placement previews.",
    date: "2026-07-19",
  },
  {
    path: "/guides/instagram-reels-stories-guide",
    title: "Instagram Reels & Stories Dimensions and Safe Zones",
    description: "Compare Instagram Reels and Stories dimensions, 9:16 format and safe-zone checks. Plan 1080x1920 artwork, review cover crops and keep text clear of controls.",
    date: "2026-10-07",
  },
  {
    path: "/guides/linkedin-image-sizes-2026",
    title: "LinkedIn Image Sizes 2026: Posts, Banners & Profiles",
    description: "Find LinkedIn post, profile and banner image sizes. Compare personal covers and company Pages, check aspect ratios and follow official image specifications.",
    date: "2026-07-19",
  },
  {
    path: "/guides/youtube-banner-thumbnail-sizes-2026",
    title: "YouTube Banner & Thumbnail Sizes: Channel Art",
    description: "Compare YouTube channel art, banner and thumbnail sizes for 2026. Find image dimensions, aspect ratios, profile sizes and guidance for device previews.",
    date: "2026-07-19",
  },
  {
    path: "/guides/tiktok-image-sizes-2026",
    title: "TikTok Image Sizes: Posts, Profiles & Covers",
    description: "Compare TikTok image dimensions for photo posts, profiles and video-cover artwork. Find aspect ratios, vertical canvases and export tips for each placement.",
    date: "2026-07-19",
  },
  {
    path: "/guides/facebook-image-sizes-2026",
    title: "Facebook Image Sizes 2026: Covers, Posts & Profiles",
    description: "Compare Facebook cover photo, post and profile picture dimensions. Find image aspect ratios, mobile crop guidance and export tips for different placements.",
    date: "2026-07-19",
  },
  {
    path: "/guides/pinterest-image-sizes-2026",
    title: "Pinterest Image Sizes 2026: Pins & Board Covers",
    description: "Compare Pinterest pin dimensions, 2:3 aspect ratios, board covers and profile pictures. Find working image sizes and export tips for static Pinterest artwork.",
    date: "2026-07-19",
  },
  {
    path: "/guides/discord-image-sizes-2026",
    title: "Discord Server Banner Size & Invite Splash",
    description: "Find Discord server banner size, invite splash dimensions and server icon presets. Check Boost access and troubleshoot an image missing from your invite link.",
    date: "2026-10-07",
  },
];

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "photo-editing": ["make-image-square"],
  instagram: ["instagram"],
  linkedin: ["linkedin"],
  youtube: ["youtube"],
  tiktok: ["tiktok"],
  facebook: ["facebook"],
  pinterest: ["pinterest"],
  discord: ["discord"],
  "social-media": ["social-media"],
};

export function guidesForCategory(category: string): Guide[] {
  const keywords = CATEGORY_KEYWORDS[category.toLowerCase()];
  if (!keywords) return [];
  return GUIDES.filter((g) => keywords.some((k) => g.path.toLowerCase().includes(k)));
}
