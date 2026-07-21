import { type MetadataRoute } from "next";

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
  {
    path: "/guides/facebook-image-sizes-2026",
    title: "Facebook Image Sizes 2026: Cover Photo, Profile & Post Dimensions",
    description: "Complete guide to Facebook image dimensions for 2026. Cover photos, profile pictures, feed posts, event images, and ad sizes with best practices.",
    date: "2026-07-19",
  },
  {
    path: "/guides/pinterest-image-sizes-2026",
    title: "Pinterest Image Sizes 2026: Pin Dimensions & Board Cover Guide",
    description: "Complete guide to Pinterest image dimensions for 2026. Standard pins, video pins, board covers, and profile picture sizes with best practices for maximum engagement.",
    date: "2026-07-19",
  },
  {
    path: "/guides/discord-image-sizes-2026",
    title: "Discord Image Sizes 2026: Server Icon, Banner & Emoji Guide",
    description: "Complete guide to Discord image dimensions for 2026. Server icons, banners, splash screens, emoji sizes, profile pictures, and best practices for your community.",
    date: "2026-07-19",
  },
];

export function GET(): Response {
  const items = GUIDES.map(
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
    <title>SquarePic Guides & Tutorials</title>
    <description>Step-by-step image editing guides, social media size cheat sheets, and how-to tutorials for resizing, cropping, converting, and optimizing images.</description>
    <link>${SITE_URL}/guides</link>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/images/logo-icon.svg</url>
      <title>SquarePic Guides & Tutorials</title>
      <link>${SITE_URL}/guides</link>
    </image>
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
