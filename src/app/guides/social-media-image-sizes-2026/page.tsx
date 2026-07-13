import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, HowToSchema } from "@/components/schema-scripts";
import presets from "@/data/social-presets.json";

export const metadata: Metadata = {
  title: "Social Media Image Sizes 2026: Complete Cheat Sheet",
  description: "The ultimate guide to 2026 social media image sizes. Updated dimensions for Instagram, Facebook, X/Twitter, LinkedIn, TikTok, YouTube, Pinterest, and more.",
  openGraph: { title: "Social Media Image Sizes 2026: Complete Cheat Sheet | SquarePic" },
  alternates: { canonical: "https://squarepic.io/guides/social-media-image-sizes-2026" },
};

const SITE = "https://squarepic.io";

const SLUG_MAP: Record<string, string> = {
  instagram: "instagram",
  facebook: "facebook",
  "x-twitter": "twitter",
  linkedin: "linkedin",
  tiktok: "tiktok",
  youtube: "youtube",
  pinterest: "pinterest",
  snapchat: "snapchat",
  whatsapp: "whatsapp",
  twitch: "twitch",
  reddit: "reddit",
  telegram: "telegram",
  discord: "discord",
};

const TYPE_HEADERS: Record<string, string> = {
  profile: "Profile Picture",
  landscape: "Landscape Post",
  portrait: "Portrait Post",
  square: "Square Post",
  stories: "Stories",
  cover: "Cover Photo",
  thumbnail: "Video Thumbnail",
  channelArt: "Channel Art",
  pinStandard: "Standard Pin",
  pinSquare: "Square Pin",
  boardCover: "Board Cover",
  story: "Story/Snap",
  geofilter: "Geofilter",
  ad: "Ad",
  status: "Status Image",
  businessCover: "Business Cover",
  banner: "Banner",
  panel: "Panel",
  offlineBanner: "Offline Banner",
  postImage: "Post Image",
  channelCover: "Channel Cover",
  serverIcon: "Server Icon",
  serverBanner: "Server Banner",
  serverSplash: "Server Splash",
};

const PLATFORM_ORDER = [
  "instagram", "facebook", "twitter", "linkedin", "tiktok", "youtube",
  "pinterest", "snapchat", "whatsapp", "twitch", "reddit", "telegram", "discord",
];

export default function SocialMediaImageSizesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: "Social Media Image Sizes 2026", url: `${SITE}/guides/social-media-image-sizes-2026` },
      ]} />
      <HowToSchema steps={[
        { name: "Choose your platform", text: "Select the social media platform you are creating content for. Each platform has unique dimension requirements." },
        { name: "Find your image type", text: "Identify whether you need a profile picture, feed post, cover photo, or story dimension." },
        { name: "Resize with SquarePic", text: "Use our free online tool to resize your image to the exact dimensions required. No uploads needed." },
        { name: "Upload and publish", text: "Download your resized image and upload it to your platform. Your image will display perfectly without cropping." },
      ]} />

      <article className="max-w-[800px] w-full mx-auto px-4 py-8">
        <h1 className="text-[2rem] font-extrabold tracking-tight mb-3">
          Social Media Image Sizes 2026: Complete Cheat Sheet
        </h1>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-8">
          Using the correct image dimensions is one of the easiest ways to make your social media profiles
          look professional. Every platform has specific requirements, and getting them wrong means your
          images will appear stretched, cropped, or pixelated. This guide covers the exact image sizes for
          every major social media platform in 2026.
        </p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-8">
          <h2 className="text-[1.1rem] font-extrabold text-[#e6edf5] mb-3">Quick Navigation</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {PLATFORM_ORDER.map((key) => {
              const p = presets[key as keyof typeof presets] as { label: string } | undefined;
              if (!p) return null;
              return (
                <Link
                  key={key}
                  href={`#${key}`}
                  className="text-[0.75rem] font-semibold text-[#8d9aaa] no-underline hover:text-[var(--accent)] transition-colors py-1 px-2 rounded-sm hover:bg-[rgba(255,255,255,0.03)]"
                >
                  {p.label}
                </Link>
              );
            })}
          </div>
        </div>

        {PLATFORM_ORDER.map((key) => {
          const p = presets[key as keyof typeof presets] as {
            label: string; description: string;
            types: Record<string, { label: string; w: number; h: number; aspect: string }>;
          } | undefined;
          if (!p) return null;
          const types = Object.entries(p.types);
          const slug = Object.entries(SLUG_MAP).find(([, v]) => v === key)?.[0] || key;

          return (
            <section key={key} id={key} className="mb-10 scroll-mt-20">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-[1.3rem] font-extrabold text-[#e6edf5] m-0">{p.label}</h2>
                <Link
                  href={`/resize/${slug}`}
                  className="text-[0.6rem] font-bold tracking-[0.08em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm no-underline hover:bg-[var(--accent)]/15 transition-colors"
                >
                  Full Guide →
                </Link>
              </div>
              <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-4">{p.description}</p>

              <div className="overflow-x-auto mb-3">
                <table className="w-full text-[0.78rem] border-collapse">
                  <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.06)]">
                      <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Image Type</th>
                      <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Dimensions</th>
                      <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Aspect Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {types.map(([tk, t]) => (
                      <tr key={tk} className="border-b border-[rgba(255,255,255,0.03)]">
                        <td className="text-[#e6edf5] font-semibold py-2 pr-3">{TYPE_HEADERS[tk] || t.label}</td>
                        <td className="text-[#8d9aaa] py-2 px-3">{t.w}x{t.h}</td>
                        <td className="text-[#8d9aaa] py-2 pl-3">{t.aspect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <a href="#top" className="text-[0.55rem] font-semibold text-[#576675] no-underline hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                Back to top
              </a>
            </section>
          );
        })}

        <section className="mb-10">
          <h2 className="text-[1.3rem] font-extrabold text-[#e6edf5] mb-3">Quick Tips for All Platforms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Use the Right Format", desc: "JPEG for photos, PNG for graphics with text, WebP for modern web performance. Most platforms accept all three." },
              { title: "Stay Within File Size Limits", desc: "Most platforms cap uploads at 20–30 MB. Compress your images before uploading to avoid errors." },
              { title: "Check Safe Zones", desc: "Profile pictures and cover photos often have circular crops or safe zones. Keep key content centered." },
              { title: "Optimize for Mobile First", desc: "Over 80% of social media browsing happens on mobile. Test your images on a phone screen before posting." },
              { title: "Be Consistent", desc: "Use the same profile picture size and style across all platforms for brand recognition." },
              { title: "Maintain Image Quality", desc: "Upload the highest resolution version that meets platform limits. Platforms compress images, so start clean." },
            ].map((t) => (
              <div key={t.title} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">{t.title}</h3>
                <p className="text-[0.78rem] text-[#8d9aaa] leading-relaxed m-0">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-[1.3rem] font-extrabold text-[#e6edf5] mb-3">Why Correct Image Sizes Matter</h2>
          <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-3">
            Social media platforms process your images through multiple display layers -- feed, search results,
            shared links, and notifications. Each context uses a different crop or size. When you upload an
            image at the wrong dimensions, the platform has to guess how to display it, often leading to:
          </p>
          <ul className="text-[0.85rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
            <li><strong className="text-[#e6edf5]">Unexpected cropping:</strong> Instagram crop profile pictures to circles and feed thumbnails to squares. If your subject is off-center, it gets cropped out.</li>
            <li><strong className="text-[#e6edf5]">Pixelation:</strong> Uploading a small image and letting the platform upscale it results in blurry, unprofessional-looking content.</li>
            <li><strong className="text-[#e6edf5]">Slow loading:</strong> Uploading an overly large image forces the platform to generate multiple thumbnails, slowing down your post visibility.</li>
            <li><strong className="text-[#e6edf5]">Distorted layouts:</strong> Cover photos and banners display differently on mobile vs desktop. Using the wrong aspect ratio creates awkward letterboxing.</li>
          </ul>
          <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed">
            SquarePic makes it easy to resize your images to the exact dimensions each platform requires.
            All processing happens locally in your browser -- your images never leave your device.
          </p>
        </section>

        <section className="text-center py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]"
          >
            Resize Your Image Free
          </Link>
        </section>
      </article>
    </>
  );
}

