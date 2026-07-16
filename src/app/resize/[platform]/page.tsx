import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import presets from "@/data/social-presets.json";
import { PLATFORM_ICONS } from "@/data/social-icons";

type Props = { params: Promise<{ platform: string }> };

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

type PresetType = { w: number; h: number; aspect: string; label: string };

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

const TIPS: Record<string, string> = {
  "instagram-profile": "Centering the subject in the square crop matters more than background detail.",
  "instagram-landscape": "Great for showing wide scenes like landscapes, cityscapes, and group shots.",
  "instagram-portrait": "The most engaging format for Instagram feed. Takes up more vertical screen space.",
  "instagram-square": "The classic Instagram format. Works well for all content types.",
  "instagram-stories": "Leave 250px top and bottom clear of critical content for the safe zone.",
  "facebook-cover": "Displays differently on mobile (640x360) vs desktop (851x315). Keep text centered.",
  "facebook-profile": "Use a recognizable headshot or brand logo. The 320x320 crop is circular on profiles.",
  "facebook-landscape": "Shared link previews use 1200x630. Optimize your Open Graph images at this size.",
  "youtube-thumbnail": "Use high contrast and bold text. Thumbnail click-through rate is the #1 ranking factor.",
  "youtube-channelArt": "Safe area for text is the central 1546x423 region.",
  "youtube-profile": "Profile photos display at 800x800 but should look good at small sizes.",
  "pinterest-pinStandard": "Tall 2:3 pins perform best. Pinterest is a visual discovery engine.",
  "pinterest-profile": "Profile images appear in search results. Make them instantly recognizable.",
  "linkedin-cover": "The banner is very short at 191px. Keep your message concise and centered.",
  "linkedin-profile": "Professional headshots perform best. LinkedIn reports profiles with photos get 14x more views.",
  "linkedin-square": "Square posts get higher engagement on LinkedIn than landscape links.",
  "reddit-banner": "Extremely wide at 31:1 aspect ratio. Most of the width is cropped on mobile.",
  "twitch-panel": "Small informational boxes below the stream. Use consistent branding across all panels.",
  "twitch-banner": "Offline banners should include your streaming schedule and social links.",
  "twitter-cover": "Desktop shows full 1500x500. Mobile crops vertically.",
  "twitter-profile": "The profile photo is circular. Keep your subject centered in the square frame.",
  "twitter-landscape": "Images in tweets display at 1600x900. Horizontal images perform better than vertical on X.",
  "tiktok-profile": "TikTok profile photos are circular. Use a clear headshot or brand icon.",
  "tiktok-portrait": "Vertical 9:16 video covers drive the most engagement on TikTok.",
  "whatsapp-profile": "WhatsApp profile pictures appear very small on chat lists. Use high contrast.",
  "snapchat-profile": "Snapchat Bitmoji or profile photos display as circular icons.",
  "telegram-profile": "Telegram profile photos show at 128x128 in chat lists. Keep it simple.",
  "discord-serverIcon": "Server icons display as circular images. Use a memorable symbol or letter.",
  "discord-serverBanner": "Server banners show on the community page. Use landscape-friendly designs.",
};

const PLATFORM_BEST_PRACTICES: Record<string, { formats: string; tips: string; whyMatters: string; stats: string }> = {
  instagram: {
    formats: "JPEG is the standard for Instagram uploads. PNG preserves quality for graphics with text. WebP is supported but not recommended for maximum compatibility.",
    tips: "Post consistently at 1080x1080 or 1080x1350 for feed posts. Use 1080x1920 for Stories and Reels. Avoid compressed artifacts by uploading the highest quality version within Instagram's 20 MB limit.",
    whyMatters: "Instagram crops images in feed to square thumbnails by default. Using the correct dimensions ensures your full image appears without unexpected cropping. Portrait 4:5 posts take up 40% more vertical screen space than squares, increasing visibility.",
    stats: "Posts with proper dimensions get 30% more engagement. Portrait images (4:5) outperform landscape by 20% on feed.",
  },
  facebook: {
    formats: "JPEG is preferred for photos. PNG works well for graphics with text and logos. Facebook recommends sRGB color space for accurate color reproduction.",
    tips: "Upload images at 72 DPI at minimum. Avoid JPEG artifacts by saving at quality 85% or higher. Facebook compresses images to 100 KB or less, so start with a clean source file.",
    whyMatters: "Facebook's algorithm favors images that load quickly and display correctly on all devices. An incorrectly sized cover photo can appear stretched or cropped, damaging your brand's professional appearance.",
    stats: "Posts with images get 2.3x more engagement. Properly sized cover images improve brand recall by 40%.",
  },
  twitter: {
    formats: "JPEG and PNG both work well. Twitter recommends JPEG for photos and PNG for graphics with text. GIFs are supported for animated content.",
    tips: "Twitter's card previews use 1200x600 for summary cards. Use 1600x900 for in-feed images. Profile photos display at 400x400 but the visible area is circular - keep your subject centered.",
    whyMatters: "X (Twitter) uses lazy image loading, so incorrect dimensions can cause layout shifts. The platform also generates multiple thumbnails, so starting with the right size ensures quality across all display contexts.",
    stats: "Tweets with images receive 150% more retweets. The optimal image-to-text ratio on X is 1:1.",
  },
  linkedin: {
    formats: "JPEG is preferred for photos. PNG is best for infographics and text-heavy images. LinkedIn supports GIF only in sponsored content.",
    tips: "LinkedIn's feed is desktop-heavy during business hours and mobile-heavy in evenings. Use 1200x1200 for square posts and 1200x627 for link previews. Keep cover photo text within the safe zone.",
    whyMatters: "LinkedIn displays images at a fixed width of 552px on desktop. An image wider than 1200px is still displayed at 552px, making text unreadable. Proper sizing ensures your content is legible without clicking to expand.",
    stats: "Posts with images get 98% more comments. LinkedIn members with profile photos receive 14x more profile views.",
  },
  tiktok: {
    formats: "JPEG and PNG both work for profile and cover images. TikTok recommends JPEG for photos to keep file sizes small.",
    tips: "TikTok is full-screen vertical. Profile images are small (200x200) and circular. Cover images for videos should be 1080x1920 at minimum.",
    whyMatters: "TikTok's algorithm processes thumbnail images to determine visual quality. Blurry or incorrectly sized cover images reduce click-through rates on your content.",
    stats: "TikTok has over 1 billion monthly active users. Vertical 9:16 content has 3x higher completion rate than landscape.",
  },
  youtube: {
    formats: "JPEG, PNG, and GIF are all supported. YouTube recommends JPEG for thumbnails and PNG for channel art with text.",
    tips: "Thumbnails are the most important visual asset on YouTube. Use 1280x720 with bold, readable text. Channel art displays differently on TV (2560x423), desktop (1546x423), and mobile (1546x423).",
    whyMatters: "YouTube's algorithm heavily weights thumbnail click-through rate when recommending videos. A properly sized, high-contrast thumbnail can increase views by 200-500%.",
    stats: "90% of top-performing YouTube videos use custom thumbnails. Channels with optimized thumbnails see 2x more CTR.",
  },
  pinterest: {
    formats: "JPEG is the standard. PNG works for infographics with text. WebP is supported but JPEG is preferred for compatibility.",
    tips: "Tall vertical pins (1000x1500, 2:3 aspect) perform best on Pinterest. Horizontal pins receive 2x less engagement. Use readable text overlays and bright, distinct colors.",
    whyMatters: "Pinterest is a visual discovery engine, not a social network. Your pin dimensions directly affect how much screen space it occupies in the feed, influencing click-through and save rates.",
    stats: "Tall pins (2:3 ratio) get 60% more repins than square pins. Pinterest drives 33% of US referral traffic for retail.",
  },
};

const DEFAULT_PRACTICES = {
  formats: "JPEG is the universal standard for photos. PNG is best for graphics with transparency. WebP offers smaller file sizes with good quality.",
  tips: "Upload images at the recommended dimensions for the best display quality. Use SquarePic to resize your photos to exact dimensions without cropping important content.",
  whyMatters: "Using the correct image dimensions ensures your content displays properly across all devices. Incorrectly sized images can appear stretched, cropped, or pixelated - damaging your professional appearance and reducing engagement.",
  stats: "Properly sized images load faster and improve user experience. Incorrect image dimensions are one of the most common social media branding mistakes.",
};

export async function generateStaticParams() {
  return Object.keys(presets).map((key) => ({
    platform: Object.entries(SLUG_MAP).find(([, v]) => v === key)?.[0] || key,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform } = await params;
  const key = SLUG_MAP[platform];
  if (!key || !presets[key as keyof typeof presets]) return {};
  const p = presets[key as keyof typeof presets];
  const dims = Object.values(p.types).map((t: PresetType) => `${t.w}\u00D7${t.h}`);
  return {
    title: `${p.label} Image Sizes - Complete Dimension Guide`,
    description: `Complete guide to ${p.label} image sizes: ${dims.join(", ")} pixels. Free tool to resize photos to the exact ${p.label} dimensions you need.`,
    openGraph: { title: `${p.label} Image Sizes - Complete Dimension Guide | SquarePic` },
    alternates: { canonical: `/resize/${platform}` },
  };
}

export default async function PlatformPage({ params }: Props) {
  const { platform } = await params;
  const key = SLUG_MAP[platform];
  if (!key || !presets[key as keyof typeof presets]) notFound();

  const p = presets[key as keyof typeof presets];
  const types = Object.entries(p.types);

  const siteUrl = process.env.SITE_URL || "https://squarepic.io";
  const pageUrl = `${siteUrl}/resize/${platform}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the standard image size for ${p.label}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${p.label} supports multiple image formats. The most common sizes are ${Object.values(p.types).slice(0, 3).map((t: PresetType) => `${t.w}x${t.h} pixels`).join(", ")}. Use SquarePic to resize your photos to any of these exact dimensions.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I resize images for ${p.label} without cropping?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Use SquarePic's free image resizer. Upload your photo, select the ${p.label} preset that matches your needs, and choose Dynamic Blur or Solid Background mode to fill any empty space without cropping your original image.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${p.label} image resizing free?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. SquarePic is completely free with no signup required. All image processing happens locally in your browser using HTML5 Canvas.",
        },
      },
      {
        "@type": "Question",
        name: `What is the best image format for ${p.label}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `For ${p.label}, JPEG is best for photos with smooth gradients, PNG is ideal for graphics with text or sharp edges, and WebP offers excellent quality at smaller file sizes. SquarePic supports all three formats for export.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I create a ${p.label} profile picture with SquarePic?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Upload your photo to SquarePic and use our free editor to make it perfectly square. Choose the ${p.label} preset size and export a high-quality profile picture in seconds.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: `${p.label} Image Sizes`, item: pageUrl },
          ],
        }),
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: `SquarePic - ${p.label} Image Sizes`,
          url: pageUrl,
          description: `Complete guide to ${p.label} image sizes with exact pixel dimensions.`,
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          dateModified: "2026-07-13",
        }),
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SquarePic",
          alternateName: "Square Pic Square Image tool",
          url: siteUrl,
          logo: `${siteUrl}/squareframe_preview.png`,
        }),
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `Resize images for ${p.label}`,
          step: [
            { "@type": "HowToStep", position: 1, name: "Upload your photo", text: `Select your image and upload it to SquarePic. Supports JPEG, PNG, WebP, and more.` },
            { "@type": "HowToStep", position: 2, name: "Choose the right dimensions", text: `Select the ${p.label} preset that matches your needs or enter custom dimensions.` },
            { "@type": "HowToStep", position: 3, name: "Adjust the style", text: "Pick Dynamic Blur, Solid Color Fill, or Smart Crop to fill any empty space without cropping." },
            { "@type": "HowToStep", position: 4, name: "Download your resized image", text: `Export your image at the exact ${p.label} dimensions you need. Ready to upload.` },
          ],
        }),
      }} />
      <div className="max-w-[920px] w-full mx-auto px-5 py-6">
      <div className="text-center mb-8 p-8 bg-gradient-to-br from-[rgba(6,182,212,0.04)] to-[rgba(139,92,246,0.04)] border border-[rgba(6,182,212,0.08)] rounded-lg">
        <h1 className="text-[1.5rem] font-extrabold tracking-tight mb-2 flex items-center justify-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[var(--accent)]">
            <path d={PLATFORM_ICONS[key] || "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"} />
          </svg>
          {p.label} Image Sizes: Complete Dimensions Guide
        </h1>
        <p className="text-[0.85rem] text-[#8d9aaa] max-w-[600px] mx-auto leading-relaxed">{p.description}</p>
        <div className="flex justify-center gap-2 flex-wrap mt-5">
          {types.map(([k, t]: [string, PresetType]) => (
            <span key={k} className="text-[0.6rem] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-sm bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.15)] text-[var(--accent)]">
              {t.w}x{t.h}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[var(--accent)]">
          <path d={PLATFORM_ICONS[key] || "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"} />
        </svg>
        <span className="text-[1rem] font-extrabold text-[#e6edf5]">All {p.label} Image Sizes</span>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {types.map(([typeKey, type]: [string, PresetType]) => {
          const header = TYPE_HEADERS[typeKey] || type.label;
          const tip = TIPS[`${key}-${typeKey}`];
          return (
            <div
              key={typeKey}
              className="flex items-start gap-4 p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.12)]"
            >
              {tip && <div className="w-[3px] shrink-0 self-stretch bg-[var(--accent)] opacity-40 rounded-full" />}
              <div className="flex-1 min-w-0">
                <h3 className="text-[0.82rem] font-bold text-[#e6edf5] mb-0.5">
                  {header}: <span style={{ color: "var(--accent)" }}>{type.w} x {type.h} px</span>
                </h3>
                <p className="text-[0.72rem] text-[#8d9aaa] leading-relaxed">Aspect ratio: {type.aspect}</p>
                {tip && <p className="text-[0.7rem] text-[#576675] mt-1.5 leading-relaxed">{tip}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span className="text-[1rem] font-extrabold text-[#e6edf5]">Frequently Asked Questions</span>
      </div>

      <div className="space-y-5 mb-8">
        <div className="faq-item">
          <h3 className="text-[var(--accent)] mb-1 text-[1rem] font-bold">What is the standard image size for {p.label}?</h3>
          <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">
            {p.label} supports multiple image formats. The most common sizes are {Object.values(p.types).slice(0, 3).map((t: PresetType) => `${t.w}x${t.h} pixels`).join(", ")}. Use SquarePic to resize your photos to any of these exact dimensions.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="text-[var(--accent)] mb-1 text-[1rem] font-bold">How do I resize images for {p.label} without cropping?</h3>
          <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">
            Use SquarePic&apos;s free image resizer. Upload your photo, select the {p.label} preset that matches your needs, and choose Dynamic Blur or Solid Background mode to fill any empty space without cropping your original image.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="text-[var(--accent)] mb-1 text-[1rem] font-bold">Is {p.label} image resizing free?</h3>
          <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">
            Yes. SquarePic is completely free with no signup required. All image processing happens locally in your browser using HTML5 Canvas. Your photos are never uploaded to any server.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="text-[var(--accent)] mb-1 text-[1rem] font-bold">What is the best image format for {p.label}?</h3>
          <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">
            For {p.label}, JPEG is best for photos with smooth gradients, PNG is ideal for graphics with text or sharp edges, and WebP offers excellent quality at smaller file sizes. SquarePic supports all three formats for export.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="text-[var(--accent)] mb-1 text-[1rem] font-bold">Can I create a {p.label} profile picture with SquarePic?</h3>
          <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">
            Yes. Upload your photo to SquarePic and use our free editor to make it perfectly square. Choose the {p.label} preset size and export a high-quality profile picture in seconds.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        <span className="text-[1rem] font-extrabold text-[#e6edf5]">Best Practices for {p.label} Images</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Recommended Formats</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            {(PLATFORM_BEST_PRACTICES[key] || DEFAULT_PRACTICES).formats}
          </p>
        </div>
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Platform Stats</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            {(PLATFORM_BEST_PRACTICES[key] || DEFAULT_PRACTICES).stats}
          </p>
        </div>
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Upload Tips</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            {(PLATFORM_BEST_PRACTICES[key] || DEFAULT_PRACTICES).tips}
          </p>
        </div>
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Why Dimensions Matter</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            {(PLATFORM_BEST_PRACTICES[key] || DEFAULT_PRACTICES).whyMatters}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <span className="text-[1rem] font-extrabold text-[#e6edf5]">Related Resources</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        <Link href="/guides/social-media-image-sizes-2026" className="group bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5">
          <h3 className="text-[0.82rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors">
            {p.label} Image Sizes - Complete Guide
          </h3>
          <p className="text-[0.72rem] text-[#8d9aaa] leading-relaxed m-0">
            See all {p.label} dimensions alongside every other platform in our 2026 social media image sizes cheat sheet.
          </p>
        </Link>
        <Link href="/blog/how-to-square-image-for-any-platform" className="group bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5">
          <h3 className="text-[0.82rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors">
            How to Square Images for Social Media
          </h3>
          <p className="text-[0.72rem] text-[#8d9aaa] leading-relaxed m-0">
            Learn three methods to make any image perfectly square: blur background, solid fill, and smart crop.
          </p>
        </Link>
      </div>

      <div className="text-center py-4">
        <Link href="/" className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]">
          Resize Your {p.label} Image Free
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-sm bg-black/15 transition-transform duration-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
    </>
  );
}
