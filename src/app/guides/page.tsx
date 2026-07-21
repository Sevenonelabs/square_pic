import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, JsonLd } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Image Editing Guides & Tutorials - Social Media Size Cheat Sheets",
  description: "Step-by-step image editing guides, social media size cheat sheets, and how-to tutorials for resizing, cropping, converting, and optimizing images.",
  openGraph: { title: "Guides - Image Editing Tutorials & Tips | SquarePic" },
  twitter: { card: "summary_large_image", title: "Guides - Image Editing Tutorials & Tips | SquarePic", description: "Step-by-step image editing guides, social media size cheat sheets, and how-to tutorials for resizing, cropping, converting, and optimizing images." },
  alternates: { canonical: "https://www.squarepic.io/guides" },
};

const SITE = "https://www.squarepic.io";

const ALL_CATEGORIES = ["All", "Social Media", "Instagram", "Facebook", "LinkedIn", "YouTube", "TikTok", "Pinterest", "Discord"] as const;

const GUIDES = [
  {
    href: "/guides/social-media-image-sizes-2026",
    title: "Social Media Image Sizes 2026: Complete Cheat Sheet",
    desc: "The definitive guide to image dimensions for every major social media platform. Updated for 2026 with the latest recommended sizes.",
    category: "Social Media",
    readTime: "15 min",
  },
  {
    href: "/guides/instagram-feed-sizes-2026",
    title: "Instagram Image Sizes 2026: Feed, Carousel & Profile",
    desc: "Complete guide to Instagram feed post dimensions, carousel specs, profile picture sizes, and ad formats. Includes engagement best practices and a quick reference table.",
    category: "Instagram",
    readTime: "10 min",
  },
  {
    href: "/guides/instagram-reels-stories-guide",
    title: "Instagram Reels & Stories Guide 2026: Dimensions, Format & Tips",
    desc: "Everything you need to know about Reels and Stories dimensions, text safe zones, format recommendations, and proven strategies for higher engagement.",
    category: "Instagram",
    readTime: "9 min",
  },
  {
    href: "/guides/linkedin-image-sizes-2026",
    title: "LinkedIn Image Sizes 2026: Banner, Profile & Post Dimensions",
    desc: "Complete guide to LinkedIn image dimensions for 2026. Profile pictures, banner/cover photos, post sizes, carousel specs, and company page image requirements.",
    category: "LinkedIn",
    readTime: "8 min",
  },
  {
    href: "/guides/youtube-banner-thumbnail-sizes-2026",
    title: "YouTube Banner & Thumbnail Sizes 2026: Channel Art, Profile & Video",
    desc: "Complete guide to YouTube image dimensions for 2026. Channel art/banner sizes, video thumbnail specs, profile picture requirements, and design best practices.",
    category: "YouTube",
    readTime: "9 min",
  },
  {
    href: "/guides/tiktok-image-sizes-2026",
    title: "TikTok Image Sizes 2026: Profile, Video & Story Dimensions",
    desc: "Complete guide to TikTok image dimensions for 2026. Profile picture size, video aspect ratios, story specs, ad formats, and best practices for maximum engagement.",
    category: "TikTok",
    readTime: "8 min",
  },
  {
    href: "/guides/facebook-image-sizes-2026",
    title: "Facebook Image Sizes 2026: Cover Photo, Profile & Post Dimensions",
    desc: "Complete guide to Facebook image dimensions for 2026. Cover photos, profile pictures, feed posts, event images, and ad sizes with best practices.",
    category: "Facebook",
    readTime: "9 min",
  },
  {
    href: "/guides/pinterest-image-sizes-2026",
    title: "Pinterest Image Sizes 2026: Pin Dimensions & Board Cover Guide",
    desc: "Complete guide to Pinterest image dimensions for 2026. Standard pins, video pins, board covers, and profile picture sizes with best practices.",
    category: "Pinterest",
    readTime: "8 min",
  },
  {
    href: "/guides/discord-image-sizes-2026",
    title: "Discord Image Sizes 2026: Server Icon, Banner & Emoji Guide",
    desc: "Complete guide to Discord image dimensions for 2026. Server icons, banners, splash screens, emoji sizes, and profile pictures.",
    category: "Discord",
    readTime: "8 min",
  },
];

function getCategoryLabel(slug: string): string {
  const map: Record<string, string> = {
    instagram: "Instagram", linkedin: "LinkedIn", youtube: "YouTube", tiktok: "TikTok",
    facebook: "Facebook", pinterest: "Pinterest", discord: "Discord",
  };
  return map[slug] || slug;
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
        <h1 className="text-center text-[2rem] font-extrabold tracking-tight mb-2">Guides & Tutorials</h1>
        <p className="text-center text-[0.9rem] text-[#8d9aaa] max-w-[500px] mx-auto mb-8 leading-relaxed">
          Step-by-step tutorials, dimension guides, and how-to articles for optimizing images on every platform.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {ALL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const slug = cat === "All" ? "" : cat.toLowerCase();
            return (
              <Link
                key={cat}
                href={slug ? `/guides?category=${slug}` : "/guides"}
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
