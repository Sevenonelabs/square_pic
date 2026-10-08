import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, JsonLd } from "@/components/schema-scripts";
import { SITE_URL as SITE } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  "title": "SevenOneLabs: The Team Behind SquarePic",
  "description": "Meet SevenOneLabs, the team behind SquarePic. Read about the developers and browse their image editing and social media size guides.",
  "path": "/author/sevenonelabs"
});

const AUTHORED_GUIDES = [
  { href: "/guides/social-media-image-sizes-2026", title: "Social Media Image Sizes 2026: Cheat Sheet", desc: "Compare social media image sizes for 2026 across 13 platforms. Find post, profile, banner and Story dimensions, aspect ratios and links to free image resizers." },
  { href: "/guides/instagram-feed-sizes-2026", title: "Instagram Post Sizes 2026: Feed, Carousel & Profile", desc: "Compare Instagram feed, carousel and profile sizes with square, portrait and landscape canvases. See fit-versus-crop examples and check placement previews." },
  { href: "/guides/instagram-reels-stories-guide", title: "Instagram Reels & Stories Dimensions and Safe Zones", desc: "Compare Instagram Reels and Stories dimensions, 9:16 format and safe-zone checks. Plan 1080x1920 artwork, review cover crops and keep text clear of controls." },
  { href: "/guides/facebook-image-sizes-2026", title: "Facebook Image Sizes 2026: Covers, Posts & Profiles", desc: "Compare Facebook cover photo, post and profile picture dimensions. Find image aspect ratios, mobile crop guidance and export tips for different placements." },
  { href: "/guides/linkedin-image-sizes-2026", title: "LinkedIn Image Sizes 2026: Posts, Banners & Profiles", desc: "Find LinkedIn post, profile and banner image sizes. Compare personal covers and company Pages, check aspect ratios and follow official image specifications." },
  { href: "/guides/youtube-banner-thumbnail-sizes-2026", title: "YouTube Banner & Thumbnail Sizes: Channel Art", desc: "Compare YouTube channel art, banner and thumbnail sizes for 2026. Find image dimensions, aspect ratios, profile sizes and guidance for device previews." },
  { href: "/guides/tiktok-image-sizes-2026", title: "TikTok Image Sizes: Posts, Profiles & Covers", desc: "Compare TikTok image dimensions for photo posts, profiles and video-cover artwork. Find aspect ratios, vertical canvases and export tips for each placement." },
  { href: "/guides/pinterest-image-sizes-2026", title: "Pinterest Image Sizes 2026: Pins & Board Covers", desc: "Compare Pinterest pin dimensions, 2:3 aspect ratios, board covers and profile pictures. Find working image sizes and export tips for static Pinterest artwork." },
  { href: "/guides/discord-image-sizes-2026", title: "Discord Server Banner Size & Invite Splash", desc: "Find Discord server banner size, invite splash dimensions and server icon presets. Check Boost access and troubleshoot an image missing from your invite link." },
];

export default function AuthorPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Author", url: `${SITE}/author/sevenonelabs` },
        { name: "SevenOneLabs", url: `${SITE}/author/sevenonelabs` },
      ]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: "SevenOneLabs",
        description: "The software development lab behind SquarePic.",
        url: `${SITE}/author/sevenonelabs`,
        mainEntity: {
          "@type": "Organization",
          "@id": `${SITE}/author/sevenonelabs#organization`,
          name: "SevenOneLabs",
          url: `${SITE}/author/sevenonelabs`,
          sameAs: ["https://github.com/Sevenonelabs"],
        },
      }} />
      <article className="max-w-[680px] w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">
            AUTHOR
          </span>
          <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">SevenOneLabs</h1>
          <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed m-0">
            Software development lab building privacy-first web applications and browser-based image processing tools.
          </p>
        </div>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          SevenOneLabs is the team behind SquarePic. We specialize in web performance optimization, computer graphics,
          and user interface design. Every image tool processes photos in the browser without uploading them.
          The site uses analytics and a referral widget; see the <Link href="/privacy" className="text-[var(--accent)] hover:underline">privacy policy</Link>. Our team writes the image editing guides on SquarePic to help creators, marketers, and
          developers prepare images correctly for every platform.
        </p>

        <section className="mb-8">
          <h2 className="text-[1.1rem] font-extrabold text-[#e6edf5] mb-4">Guides by SevenOneLabs</h2>
          <div className="flex flex-col gap-4">
            {AUTHORED_GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group block bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
              >
                <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors">{g.title}</h3>
                <p className="text-[0.75rem] text-[#8d9aaa] leading-relaxed m-0">{g.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Open Source</h3>
          <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">
            SquarePic is open source. View the code, report issues, or contribute on{" "}
            <a href="https://github.com/Sevenonelabs/square_pic" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">GitHub</a>.{" "}
            Questions or feedback? Email{" "}
            <a href="mailto:support@squarepic.io" className="text-[var(--accent)] no-underline hover:underline">support@squarepic.io</a>.
          </p>
        </div>
      </article>
    </>
  );
}
