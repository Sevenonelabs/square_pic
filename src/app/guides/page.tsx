import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, JsonLd } from "@/components/schema-scripts";
import { SITE_URL as SITE } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  "title": "Social Media Image Size Guides & Photo Tutorials",
  "description": "Browse social media image sizes and photo editing tutorials. Compare post, profile and banner dimensions, or learn to make a photo square without cropping.",
  "path": "/guides",
  "image": "/og/og-social-media-image-sizes.png"
});

const ALL_CATEGORIES = ["All", "Photo Editing", "Social Media", "Instagram", "Facebook", "LinkedIn", "YouTube", "TikTok", "Pinterest", "Discord"] as const;

const GUIDES = [
  {
    href: "/guides/make-image-square-without-cropping",
    title: "How to Make an Image Square Without Cropping",
    desc: "Learn how to make an image square without cropping. Follow photo examples, compare blur and solid padding, calculate borders and choose PNG, JPG or WebP export.",
    category: "Photo Editing",
    readTime: "6 min",
  },
  {
    href: "/guides/social-media-image-sizes-2026",
    title: "Social Media Image Sizes 2026: Cheat Sheet",
    desc: "Compare social media image sizes for 2026 across 13 platforms. Find post, profile, banner and Story dimensions, aspect ratios and links to free image resizers.",
    category: "Social Media",
    readTime: "15 min",
  },
  {
    href: "/guides/instagram-feed-sizes-2026",
    title: "Instagram Post Sizes 2026: Feed, Carousel & Profile",
    desc: "Compare Instagram feed, carousel and profile sizes with square, portrait and landscape canvases. See fit-versus-crop examples and check placement previews.",
    category: "Instagram",
    readTime: "10 min",
  },
  {
    href: "/guides/instagram-reels-stories-guide",
    title: "Instagram Reels & Stories Dimensions and Safe Zones",
    desc: "Compare Instagram Reels and Stories dimensions, 9:16 format and safe-zone checks. Plan 1080x1920 artwork, review cover crops and keep text clear of controls.",
    category: "Instagram",
    readTime: "6 min",
  },
  {
    href: "/guides/linkedin-image-sizes-2026",
    title: "LinkedIn Image Sizes 2026: Posts, Banners & Profiles",
    desc: "Find LinkedIn post, profile and banner image sizes. Compare personal covers and company Pages, check aspect ratios and follow official image specifications.",
    category: "LinkedIn",
    readTime: "8 min",
  },
  {
    href: "/guides/youtube-banner-thumbnail-sizes-2026",
    title: "YouTube Banner & Thumbnail Sizes: Channel Art",
    desc: "Compare YouTube channel art, banner and thumbnail sizes for 2026. Find image dimensions, aspect ratios, profile sizes and guidance for device previews.",
    category: "YouTube",
    readTime: "9 min",
  },
  {
    href: "/guides/tiktok-image-sizes-2026",
    title: "TikTok Image Sizes: Posts, Profiles & Covers",
    desc: "Compare TikTok image dimensions for photo posts, profiles and video-cover artwork. Find aspect ratios, vertical canvases and export tips for each placement.",
    category: "TikTok",
    readTime: "8 min",
  },
  {
    href: "/guides/facebook-image-sizes-2026",
    title: "Facebook Image Sizes 2026: Covers, Posts & Profiles",
    desc: "Compare Facebook cover photo, post and profile picture dimensions. Find image aspect ratios, mobile crop guidance and export tips for different placements.",
    category: "Facebook",
    readTime: "9 min",
  },
  {
    href: "/guides/pinterest-image-sizes-2026",
    title: "Pinterest Image Sizes 2026: Pins & Board Covers",
    desc: "Compare Pinterest pin dimensions, 2:3 aspect ratios, board covers and profile pictures. Find working image sizes and export tips for static Pinterest artwork.",
    category: "Pinterest",
    readTime: "8 min",
  },
  {
    href: "/guides/discord-image-sizes-2026",
    title: "Discord Server Banner Size & Invite Splash",
    desc: "Find Discord server banner size, invite splash dimensions and server icon presets. Check Boost access and troubleshoot an image missing from your invite link.",
    category: "Discord",
    readTime: "6 min",
  },
];

function getCategoryLabel(slug: string): string {
  const map: Record<string, string> = {
    instagram: "Instagram", linkedin: "LinkedIn", youtube: "YouTube", tiktok: "TikTok",
    facebook: "Facebook", pinterest: "Pinterest", discord: "Discord",
    "social-media": "Social Media", "photo-editing": "Photo Editing",
  };
  return map[slug] || slug;
}

function categorySlug(cat: string): string {
  return cat.toLowerCase().replaceAll(" ", "-");
}

export default async function GuidesPage(props: { searchParams?: Promise<{ category?: string }> }) {
  const searchParams = await (props.searchParams ?? Promise.resolve({} as { category?: string }));
  const activeCategory = searchParams?.category
    ? getCategoryLabel(searchParams.category)
    : "All";

  const filtered = activeCategory === "All"
    ? GUIDES
    : GUIDES.filter((g) => g.category === activeCategory);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
      ]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "SquarePic Guides & Tutorials",
        description: "Learn how to resize, crop, compress, and convert images for every platform.",
        url: `${SITE}/guides`,
        about: { "@type": "Thing", name: "Image Editing Guides" },
      }} />
      <div className="max-w-[800px] w-full mx-auto px-4 py-8">
        <h1 className="text-center text-[2rem] font-extrabold tracking-tight mb-2">Social Media Image Size Guides & Photo Tutorials</h1>
        <p className="text-center text-[0.9rem] text-[#8d9aaa] max-w-[500px] mx-auto mb-8 leading-relaxed">
          Step-by-step tutorials, dimension guides, and how-to articles for optimizing images on every platform.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {ALL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const slug = cat === "All" ? "" : categorySlug(cat);
            return (
              <Link
                key={cat}
                href={slug ? `/guides?category=${encodeURIComponent(slug)}` : "/guides"}
                className={`text-[0.7rem] font-bold tracking-[0.08em] px-3 py-1.5 rounded-md no-underline transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--accent)] text-black"
                    : "text-[#8d9aaa] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:text-[#e6edf5] hover:border-[rgba(255,255,255,0.12)]"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 mb-10">
          {filtered.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group block bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">
                    {g.category}
                  </span>
                  <h2 className="text-[1.1rem] font-extrabold text-[#e6edf5] mt-2 mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                    {g.title}
                  </h2>
                  <p className="text-[0.82rem] text-[#8d9aaa] leading-relaxed m-0">{g.desc}</p>
                </div>
                <span className="text-[0.65rem] text-[#576675] font-semibold shrink-0 pt-1">{g.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[0.85rem] text-[#576675]">
            No guides in this category yet.{" "}
            <Link href="/guides" className="text-[var(--accent)] no-underline hover:underline">View all guides</Link>.
          </p>
        )}

        <div className="text-center">
          <p className="text-[0.78rem] text-[#576675]">
            Have a suggestion for a new guide?{" "}
            <Link href="/support" className="text-[var(--accent)] no-underline hover:underline">Let us know</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
