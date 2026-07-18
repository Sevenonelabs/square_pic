const SITE_URL = process.env.SITE_URL || "https://www.squarepic.io";

interface Guide {
  path: string;
  title: string;
  description: string;
  date: string;
}

const GUIDES: Guide[] = [
  {
    path: "/guides/social-media-image-sizes-2026",
    title: "Social Media Image Sizes 2026: Complete Cheat Sheet",
    description: "The definitive guide to 2026 social media image sizes. Updated dimensions for Instagram, Facebook, X/Twitter, LinkedIn, TikTok, YouTube, Pinterest, and more.",
    date: "2026-07-19",
  },
  {
    path: "/guides/instagram-feed-sizes-2026",
    title: "Instagram Image Sizes 2026: Feed, Carousel & Profile",
    description: "Complete guide to Instagram feed post dimensions, carousel specs, profile picture sizes, and ad formats.",
    date: "2026-07-19",
  },
  {
    path: "/guides/instagram-reels-stories-guide",
    title: "Instagram Reels & Stories Guide 2026: Dimensions, Format & Tips",
    description: "Complete guide to Instagram Reels and Stories dimensions with safe zones, format tips, and engagement strategies.",
    date: "2026-07-19",
  },
  {
    path: "/guides/linkedin-image-sizes-2026",
    title: "LinkedIn Image Sizes 2026: Banner, Profile & Post Dimensions",
    description: "Complete guide to LinkedIn image dimensions for 2026. Profile pictures, banner/cover photos, post sizes, carousel specs, and company page image requirements.",
    date: "2026-07-19",
  },
  {
    path: "/guides/youtube-banner-thumbnail-sizes-2026",
    title: "YouTube Banner & Thumbnail Sizes 2026: Channel Art, Profile & Video",
    description: "Complete guide to YouTube image dimensions for 2026. Channel art/banner sizes, video thumbnail specs, profile picture requirements, and design best practices.",
    date: "2026-07-19",
  },
  {
    path: "/guides/tiktok-image-sizes-2026",
    title: "TikTok Image Sizes 2026: Profile, Video & Story Dimensions",
    description: "Complete guide to TikTok image dimensions for 2026. Profile picture size, video aspect ratios, story specs, ad formats, and best practices for maximum engagement.",
    date: "2026-07-19",
  },
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  instagram: ["instagram"],
  linkedin: ["linkedin"],
  youtube: ["youtube"],
  tiktok: ["tiktok"],
};

function matchesCategory(guide: Guide, category: string): boolean {
  const keywords = CATEGORY_KEYWORDS[category];
  if (!keywords) return true;
  const lowerPath = guide.path.toLowerCase();
  return keywords.some((k) => lowerPath.includes(k));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const filtered = GUIDES.filter((g) => matchesCategory(g, category));

  const items = filtered.map(
    (g) => `    <item>
      <title><![CDATA[${g.title}]]></title>
      <description><![CDATA[${g.description}]]></description>
      <link>${SITE_URL}${g.path}</link>
      <guid isPermaLink="true">${SITE_URL}${g.path}</guid>
      <pubDate>${new Date(g.date).toUTCString()}</pubDate>
    </item>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SquarePic Guides: ${categoryLabel}</title>
    <description>${categoryLabel} image editing guides and tutorials from SquarePic.</description>
    <link>${SITE_URL}/guides?category=${category}</link>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/guides/${category}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
