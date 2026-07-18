import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema, FAQPageSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";
import { TableOfContents } from "@/components/guides/table-of-contents";
import presets from "@/data/social-presets.json";

export const metadata: Metadata = {
  title: "Social Media Image Sizes 2026: Complete Cheat Sheet",
  description: "The definitive guide to 2026 social media image sizes. Updated dimensions for Instagram, Facebook, X/Twitter, LinkedIn, TikTok, YouTube, Pinterest, and more.",
  openGraph: { title: "Social Media Image Sizes 2026: Complete Cheat Sheet | SquarePic", description: "The definitive guide to 2026 social media image sizes. Updated dimensions for every major platform.", type: "article", publishedTime: "2026-07-19", images: [{ url: "/squareframe_preview.png", width: 1200, height: 630 }] },
  alternates: { canonical: "https://www.squarepic.io/guides/social-media-image-sizes-2026" },
  twitter: { card: "summary_large_image", title: "Social Media Image Sizes 2026: Complete Cheat Sheet | SquarePic", description: "The definitive guide to 2026 social media image sizes." },
};

const SITE = "https://www.squarepic.io";

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

const PLATFORM_SLUG: Record<string, string> = {
  instagram: "instagram",
  facebook: "facebook",
  twitter: "x-twitter",
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

const FAQ_QUESTIONS = [
  { question: "What is the most common social media image size?", answer: "1080 x 1080 pixels (1:1 square) is the most universally supported size. Instagram, Facebook, LinkedIn, and X/Twitter all display square images natively without cropping or padding." },
  { question: "What aspect ratio is best for social media?", answer: "1:1 (square) is the safest choice across all platforms. For feed posts, 4:5 portrait (1080 x 1350) performs best on Instagram and Facebook. For videos, 9:16 vertical (1080 x 1920) works on TikTok, Instagram Reels, and YouTube Shorts." },
  { question: "Do social media platforms compress images?", answer: "Yes. Every platform compresses uploaded images to reduce file size and improve loading speed. Starting with properly sized images at 90% JPEG quality minimizes visible compression artifacts." },
  { question: "What file format should I use for social media images?", answer: "JPEG for photographs and complex images. PNG for graphics with text, logos, or transparency needs. WebP offers smaller file sizes but is not universally supported across all platforms." },
  { question: "How do I resize images for multiple social media platforms?", answer: "Start with the largest required size, then scale down. Use an image resizer that lets you select platform presets — this ensures each output matches the exact dimension requirements without manual calculations." },
  { question: "What is the best resolution for social media images?", answer: "Upload at the platform's maximum supported resolution. Higher resolution images appear sharper after the platform's compression pipeline. For most platforms, 1080px on the longest side is sufficient." },
];

export default function SocialMediaImageSizesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: "Social Media Image Sizes 2026", url: `${SITE}/guides/social-media-image-sizes-2026` },
      ]} />
      <ArticleSchema
        type="BlogPosting"
        title="Social Media Image Sizes 2026: Complete Cheat Sheet"
        description="The definitive guide to 2026 social media image sizes. Updated dimensions for Instagram, Facebook, X/Twitter, LinkedIn, TikTok, YouTube, Pinterest, and more."
        url={`${SITE}/guides/social-media-image-sizes-2026`}
        imageUrl={`${SITE}/squareframe_preview.png`}
        datePublished="2026-07-19"
        dateModified="2026-07-19"
        authorName="SevenOneLabs"
        authorUrl="https://github.com/Sevenonelabs"
      />
      <FAQPageSchema questions={FAQ_QUESTIONS} />
      <article className="max-w-[800px] w-full mx-auto px-4 py-8">
        <h1 className="text-[2rem] font-extrabold tracking-tight mb-1">
          Social Media Image Sizes 2026: Complete Cheat Sheet
        </h1>
        <p className="text-[0.78rem] text-[#576675] mb-6">Published July 19, 2026 · Updated July 19, 2026 · 15 min read · by <a href="https://github.com/Sevenonelabs" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">SevenOneLabs</a></p>
        <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed mb-8">
          Using the correct image dimensions is one of the easiest ways to make your social media profiles
          look professional. Every platform has specific requirements, and getting them wrong means your
          images will appear stretched, cropped, or pixelated. This guide covers the exact image sizes for
          every major social media platform in 2026.
        </p>
        <ShareButtons path="/guides/social-media-image-sizes-2026" title="Social Media Image Sizes 2026: Complete Cheat Sheet" />

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
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                Back to top
              </a>
            </section>
          );
        })}

        <TableOfContents items={[
          { id: "best-practices", label: "Best Practices", level: 2 },
          { id: "why-correct-sizes-matter", label: "Why Correct Sizes Matter", level: 2 },
          { id: "common-mistakes", label: "Common Mistakes", level: 2 },
          { id: "how-squarepic-helps", label: "How SquarePic Helps", level: 2 },
          { id: "faq", label: "Frequently Asked Questions", level: 2 },
          { id: "key-takeaways", label: "Key Takeaways", level: 2 },
        ]} />

        <section id="best-practices" className="mb-10">
          <h2 className="text-[1.3rem] font-extrabold text-[#e6edf5] mb-3">Best Practices for All Platforms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Use the Right Format", desc: "JPEG for photos, PNG for graphics with text, WebP for modern web performance. Most platforms accept all three." },
              { title: "Stay Within File Size Limits", desc: "Most platforms cap uploads at 20-30 MB. Compress your images before uploading to avoid errors." },
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

        <section id="why-correct-sizes-matter" className="mb-10">
          <h2 className="text-[1.3rem] font-extrabold text-[#e6edf5] mb-3">Why Correct Image Sizes Matter</h2>
          <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-3">
            Social media platforms process your images through multiple display layers — feed, search results,
            shared links, and notifications. Each context uses a different crop or size. When you upload an
            image at the wrong dimensions, the platform has to guess how to display it, often leading to:
          </p>
          <ul className="text-[0.85rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
            <li><strong className="text-[#e6edf5]">Unexpected cropping:</strong> Instagram crops profile pictures to circles and feed thumbnails to squares. If your subject is off-center, it gets cropped out.</li>
            <li><strong className="text-[#e6edf5]">Pixelation:</strong> Uploading a small image and letting the platform upscale it results in blurry, unprofessional-looking content.</li>
            <li><strong className="text-[#e6edf5]">Slow loading:</strong> Uploading an overly large image forces the platform to generate multiple thumbnails, slowing down your post visibility.</li>
            <li><strong className="text-[#e6edf5]">Distorted layouts:</strong> Cover photos and banners display differently on mobile vs desktop. Using the wrong aspect ratio creates awkward letterboxing.</li>
          </ul>
        </section>

        <section id="common-mistakes" className="mb-10">
          <h2 className="text-[1.3rem] font-extrabold text-[#e6edf5] mb-3">Common Social Media Image Mistakes</h2>
          <ul className="text-[0.85rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
            <li><strong className="text-[#e6edf5]">Using one size for all platforms.</strong> Each platform has unique dimension requirements. A square Instagram post looks different on LinkedIn or X/Twitter. Resize for each platform individually.</li>
            <li><strong className="text-[#e6edf5]">Ignoring aspect ratio differences.</strong> Profile pictures are often cropped to circles (Instagram, TikTok, X/Twitter) while cover photos use wide panoramic ratios. Designing for the wrong shape wastes effort.</li>
            <li><strong className="text-[#e6edf5]">Uploading low-resolution images.</strong> Platforms downscale large images but rarely upscale well. Starting below the recommended minimum resolution guarantees pixelation.</li>
            <li><strong className="text-[#e6edf5]">Forgetting mobile crops.</strong> Desktop banners and cover photos look different on mobile. Always check how your image appears on a phone screen before publishing.</li>
            <li><strong className="text-[#e6edf5]">Not checking file size limits.</strong> Platform uploaders silently fail on oversized files. Your post or profile update may appear broken without any error message.</li>
          </ul>
        </section>

        <section id="how-squarepic-helps" className="mb-10">
          <h2 className="text-[1.3rem] font-extrabold text-[#e6edf5] mb-3">How SquarePic Helps</h2>
          <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-3">
            SquarePic makes it easy to resize your images to the exact dimensions each platform requires.
            Use the platform-specific resizer tools — <Link href="/resize/instagram" className="text-[var(--accent)] no-underline hover:underline">Instagram</Link>,{" "}
            <Link href="/resize/facebook" className="text-[var(--accent)] no-underline hover:underline">Facebook</Link>,{" "}
            <Link href="/resize/linkedin" className="text-[var(--accent)] no-underline hover:underline">LinkedIn</Link>,{" "}
            <Link href="/resize/youtube" className="text-[var(--accent)] no-underline hover:underline">YouTube</Link>,{" "}
            <Link href="/resize/tiktok" className="text-[var(--accent)] no-underline hover:underline">TikTok</Link>,{" "}
            and more — to select your target format and download a perfectly sized image in seconds.
            All processing happens locally in your browser. Your images never leave your device.
          </p>
        </section>

        <section id="faq" className="mb-10">
          <h2 className="text-[1.3rem] font-extrabold text-[#e6edf5] mb-3">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_QUESTIONS.map((q, i) => (
              <div key={i}>
                <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-1">{q.question}</h3>
                <p className="text-[0.82rem] text-[#8d9aaa] leading-relaxed m-0">{q.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="key-takeaways" className="mb-10">
          <h2 className="text-[1.3rem] font-extrabold text-[#e6edf5] mb-3">Key Takeaways</h2>
          <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed mb-3">
            Every social media platform has distinct image dimension requirements. Square (1080 x 1080) is the most universally supported format. Always check the specific requirements for each platform and image type before exporting your final design. Compress images to stay under file size limits while maintaining visual quality. For detailed guides on each platform, explore the individual platform pages linked above.
          </p>
        </section>

        <RelatedGuides current="social-media-image-sizes-2026" />

        <section className="text-center py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px var(--accent-glow)]"
          >
            Resize Your Image Free
          </Link>
        </section>
      </article>
    </>
  );
}
