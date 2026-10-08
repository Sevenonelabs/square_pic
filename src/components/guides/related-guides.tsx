import Link from "next/link";

interface GuideLink {
  href: string;
  title: string;
  desc: string;
}

const ALL_GUIDES: Record<string, GuideLink> = {
  "make-image-square-without-cropping": {
    href: "/guides/make-image-square-without-cropping",
    title: "How to Make an Image Square Without Cropping",
    desc: "Learn how to make an image square without cropping. Follow photo examples, compare blur and solid padding, calculate borders and choose PNG, JPG or WebP export.",
  },
  "social-media-image-sizes-2026": {
    href: "/guides/social-media-image-sizes-2026",
    title: "Social Media Image Sizes 2026: Cheat Sheet",
    desc: "Compare social media image sizes for 2026 across 13 platforms. Find post, profile, banner and Story dimensions, aspect ratios and links to free image resizers.",
  },
  "instagram-feed-sizes-2026": {
    href: "/guides/instagram-feed-sizes-2026",
    title: "Instagram Post Sizes 2026: Feed, Carousel & Profile",
    desc: "Compare Instagram feed, carousel and profile sizes with square, portrait and landscape canvases. See fit-versus-crop examples and check placement previews.",
  },
  "instagram-reels-stories-guide": {
    href: "/guides/instagram-reels-stories-guide",
    title: "Instagram Reels & Stories Dimensions and Safe Zones",
    desc: "Compare Instagram Reels and Stories dimensions, 9:16 format and safe-zone checks. Plan 1080x1920 artwork, review cover crops and keep text clear of controls.",
  },
  "linkedin-image-sizes-2026": {
    href: "/guides/linkedin-image-sizes-2026",
    title: "LinkedIn Image Sizes 2026: Posts, Banners & Profiles",
    desc: "Find LinkedIn post, profile and banner image sizes. Compare personal covers and company Pages, check aspect ratios and follow official image specifications.",
  },
  "youtube-banner-thumbnail-sizes-2026": {
    href: "/guides/youtube-banner-thumbnail-sizes-2026",
    title: "YouTube Banner & Thumbnail Sizes: Channel Art",
    desc: "Compare YouTube channel art, banner and thumbnail sizes for 2026. Find image dimensions, aspect ratios, profile sizes and guidance for device previews.",
  },
  "tiktok-image-sizes-2026": {
    href: "/guides/tiktok-image-sizes-2026",
    title: "TikTok Image Sizes: Posts, Profiles & Covers",
    desc: "Compare TikTok image dimensions for photo posts, profiles and video-cover artwork. Find aspect ratios, vertical canvases and export tips for each placement.",
  },
  "facebook-image-sizes-2026": {
    href: "/guides/facebook-image-sizes-2026",
    title: "Facebook Image Sizes 2026: Covers, Posts & Profiles",
    desc: "Compare Facebook cover photo, post and profile picture dimensions. Find image aspect ratios, mobile crop guidance and export tips for different placements.",
  },
  "pinterest-image-sizes-2026": {
    href: "/guides/pinterest-image-sizes-2026",
    title: "Pinterest Image Sizes 2026: Pins & Board Covers",
    desc: "Compare Pinterest pin dimensions, 2:3 aspect ratios, board covers and profile pictures. Find working image sizes and export tips for static Pinterest artwork.",
  },
  "discord-image-sizes-2026": {
    href: "/guides/discord-image-sizes-2026",
    title: "Discord Server Banner Size & Invite Splash",
    desc: "Find Discord server banner size, invite splash dimensions and server icon presets. Check Boost access and troubleshoot an image missing from your invite link.",
  },
};

const CATEGORY_MAP: Record<string, string[]> = {
  "social-media-image-sizes-2026": ["linkedin-image-sizes-2026", "instagram-feed-sizes-2026", "discord-image-sizes-2026"],
  "instagram-feed-sizes-2026": ["instagram-reels-stories-guide", "make-image-square-without-cropping"],
  "instagram-reels-stories-guide": ["instagram-feed-sizes-2026", "tiktok-image-sizes-2026"],
  "linkedin-image-sizes-2026": ["youtube-banner-thumbnail-sizes-2026", "social-media-image-sizes-2026"],
  "youtube-banner-thumbnail-sizes-2026": ["tiktok-image-sizes-2026", "linkedin-image-sizes-2026"],
  "tiktok-image-sizes-2026": ["instagram-reels-stories-guide", "youtube-banner-thumbnail-sizes-2026"],
  "facebook-image-sizes-2026": ["social-media-image-sizes-2026", "instagram-feed-sizes-2026"],
  "pinterest-image-sizes-2026": ["social-media-image-sizes-2026", "instagram-feed-sizes-2026"],
  "discord-image-sizes-2026": ["social-media-image-sizes-2026", "youtube-banner-thumbnail-sizes-2026"],
};

export function RelatedGuides({ current }: { current: string }) {
  const related = CATEGORY_MAP[current] ?? [];

  return (
    <section className="border-t border-[rgba(255,255,255,0.06)] pt-8 mt-8">
      <h2 className="text-[1.1rem] font-extrabold text-[#e6edf5] mb-4">Related Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((key) => {
          const g = ALL_GUIDES[key];
          if (!g) return null;
          return (
            <Link
              key={key}
              href={g.href}
              className="group bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
            >
              <h3 className="text-[0.82rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors">{g.title}</h3>
              <p className="text-[0.72rem] text-[#8d9aaa] leading-relaxed m-0">{g.desc}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
