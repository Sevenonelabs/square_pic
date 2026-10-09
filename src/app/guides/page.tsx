import { PlatformIcon, PlatformTitle } from "@/components/platform-icon";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, JsonLd } from "@/components/schema-scripts";
import { SITE_URL as SITE } from "@/lib/constants";
import { edition2027ForPath } from "@/lib/guide-editions";

export const metadata: Metadata = pageMetadata({
  "title": "Social Media Image Size Guides & Photo Tutorials",
  "description": "Browse social media image sizes and photo editing tutorials. Compare post, profile and banner dimensions, or learn to make a photo square without cropping.",
  "path": "/guides",
  "image": "/og/og-social-media-image-sizes.png"
});

const ALL_CATEGORIES = ["All", "Photo Editing", "Social Media", "Instagram", "Facebook", "LinkedIn", "YouTube", "TikTok", "Pinterest", "Discord"] as const;

const GUIDES = [
  {
    href: "/guides/square-image-size",
    title: "Square Image Size: Pixels, Ratios and Printing",
    desc: "Calculate square padding, crop loss and enlargement for your photo. Compare pixel dimensions and print sizes.",
    category: "Photo Editing",
    readTime: "5 min",
  },
  {
    href: "/guides/how-to-enlarge-a-photo",
    title: "How to Enlarge a Photo for Screens and Printing",
    desc: "Use the print planner to calculate required pixels, source PPI and a supported enlargement. Check quality before exporting.",
    category: "Photo Editing",
    readTime: "5 min",
  },
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

export default async function GuidesPage(props: { searchParams?: Promise<{ category?: string; year?: string }> }) {
  const searchParams = await (props.searchParams ?? Promise.resolve({} as { category?: string; year?: string }));
  const year = searchParams.year === "2026" ? 2026 : 2027;
  const editionGuides = GUIDES.map((guide) => {
    if (year !== 2027 || !guide.href.endsWith("-2026")) return guide;
    const edition = edition2027ForPath(guide.href);
    return { ...guide, href: guide.href.replace(/-2026$/, "-2027"), title: edition.title, desc: edition.description, readTime: edition.readTime };
  });
  const activeCategory = searchParams?.category
    ? getCategoryLabel(searchParams.category)
    : "All";

  const filtered = activeCategory === "All"
    ? editionGuides
    : editionGuides.filter((g) => g.category === activeCategory);

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
      <div className="max-w-[1120px] w-full mx-auto px-4 py-8">
        <h1 className="text-center text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight mb-2">Social Media Image Size Guides & Photo Tutorials</h1>
        <p className="text-center text-[1rem] text-[#8d9aaa] max-w-[680px] mx-auto mb-8 leading-relaxed">
          Plan your 2027 social media images with dimension guides and a free PDF cheat sheet. The 2026 editions and photo tutorials are also available.
        </p>

        <nav aria-label="Guide editions" className="flex justify-center gap-6 mb-6">
          {([2027, 2026] as const).map((edition) => <Link key={edition} href={`/guides?year=${edition}${searchParams.category ? `&category=${encodeURIComponent(searchParams.category)}` : ""}`} aria-current={year === edition ? "page" : undefined} className={`inline-flex min-h-11 items-center font-bold hover:underline ${year === edition ? "text-[var(--accent)]" : "text-[#abb8c7]"}`}>{edition} guides</Link>)}
        </nav>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link href={`/guides/social-media-image-sizes-${year}`} className="border border-[var(--accent)]/25 bg-[var(--accent)]/5 p-5 rounded-lg hover:bg-[var(--accent)]/10">
            <span className="text-sm font-semibold text-[var(--accent)]">Find your image size</span>
            <h2 className="text-xl font-bold mt-1 mb-2">{year} image sizes and free PDF</h2>
            <p className="text-base text-[#abb8c7]">13 platforms, source links and an update date.</p>
          </Link>
          <Link href="/guides/make-image-square-without-cropping" className="border border-white/10 bg-white/[0.025] p-5 rounded-lg hover:bg-white/5">
            <span className="text-sm font-semibold text-[var(--accent)]">Start with a photo</span>
            <h2 className="text-xl font-bold mt-1 mb-2">Make a square without losing the edges</h2>
            <p className="text-base text-[#abb8c7]">Follow visual examples and choose fit or crop.</p>
          </Link>
        </div>
        <nav aria-label="Guide categories" className="flex flex-wrap justify-center gap-2 mb-8">
          {ALL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const slug = cat === "All" ? "" : categorySlug(cat);
            return (
              <Link
                key={cat}
                aria-current={isActive ? "page" : undefined}
                href={slug ? `/guides?year=${year}&category=${encodeURIComponent(slug)}` : `/guides?year=${year}`}
                className={`inline-flex items-center gap-2 min-h-11 text-[1rem] font-semibold px-4 py-2 rounded-md no-underline transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--accent)] text-black"
                    : "text-[#8d9aaa] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:text-[#e6edf5] hover:border-[rgba(255,255,255,0.12)]"
                }`}
              >
                <PlatformIcon platform={cat} />{cat}
              </Link>
            );
          })}
        </nav>

        <p className="text-sm text-[#abb8c7] mb-4">{filtered.length} {filtered.length === 1 ? "guide" : "guides"}{activeCategory !== "All" ? ` for ${activeCategory}` : " to explore"}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {filtered.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group block bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-3">
                <div className="min-w-0">
                  <span className="text-[1rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">
                    {g.category}
                  </span>
                  <h2 className="text-xl font-extrabold text-[#e6edf5] mt-2 mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                    <PlatformTitle title={g.title} />
                  </h2>
                  <p className="text-[1rem] text-[#8d9aaa] leading-relaxed m-0">{g.desc}</p>
                </div>
                <span className="text-sm text-[#abb8c7] font-semibold shrink-0 pt-1">{g.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[1rem] text-[#8d9aaa]">
            No guides in this category yet.{" "}
            <Link href="/guides" className="text-[var(--accent)] no-underline hover:underline">View all guides</Link>.
          </p>
        )}

        <div className="text-center">
          <p className="text-[1rem] text-[#8d9aaa]">
            Have a suggestion for a new guide?{" "}
            <Link href="/support" className="text-[var(--accent)] no-underline hover:underline">Let us know</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
