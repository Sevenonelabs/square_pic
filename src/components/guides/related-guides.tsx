import Link from "next/link";

interface GuideLink {
  href: string;
  title: string;
  desc: string;
}

const ALL_GUIDES: Record<string, GuideLink> = {
  "social-media-image-sizes-2026": {
    href: "/guides/social-media-image-sizes-2026",
    title: "Social Media Image Sizes 2026: Complete Cheat Sheet",
    desc: "Image dimensions for every major social media platform.",
  },
  "instagram-feed-sizes-2026": {
    href: "/guides/instagram-feed-sizes-2026",
    title: "Instagram Image Sizes 2026: Feed, Carousel & Profile",
    desc: "Feed post dimensions, carousel specs, and profile picture sizes.",
  },
  "instagram-reels-stories-guide": {
    href: "/guides/instagram-reels-stories-guide",
    title: "Instagram Reels & Stories Guide 2026",
    desc: "Dimensions, safe zones, and engagement strategies.",
  },
  "linkedin-image-sizes-2026": {
    href: "/guides/linkedin-image-sizes-2026",
    title: "LinkedIn Image Sizes 2026: Banner, Profile & Post",
    desc: "Profile pictures, cover photos, and company page specs.",
  },
  "youtube-banner-thumbnail-sizes-2026": {
    href: "/guides/youtube-banner-thumbnail-sizes-2026",
    title: "YouTube Banner & Thumbnail Sizes 2026",
    desc: "Channel art, video thumbnails, and profile pictures.",
  },
  "tiktok-image-sizes-2026": {
    href: "/guides/tiktok-image-sizes-2026",
    title: "TikTok Image Sizes 2026: Profile, Video & Story",
    desc: "Video dimensions, ad specs, and best practices.",
  },
};

const CATEGORY_MAP: Record<string, string[]> = {
  "social-media-image-sizes-2026": ["linkedin-image-sizes-2026", "instagram-feed-sizes-2026"],
  "instagram-feed-sizes-2026": ["instagram-reels-stories-guide", "social-media-image-sizes-2026"],
  "instagram-reels-stories-guide": ["instagram-feed-sizes-2026", "tiktok-image-sizes-2026"],
  "linkedin-image-sizes-2026": ["youtube-banner-thumbnail-sizes-2026", "social-media-image-sizes-2026"],
  "youtube-banner-thumbnail-sizes-2026": ["tiktok-image-sizes-2026", "linkedin-image-sizes-2026"],
  "tiktok-image-sizes-2026": ["instagram-reels-stories-guide", "youtube-banner-thumbnail-sizes-2026"],
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
