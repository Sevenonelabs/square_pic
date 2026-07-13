import type { Metadata } from "next";
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
  "youtube-thumbnail": "Use high contrast and bold text. Thumbnail click-through rate is the #1 ranking factor.",
  "youtube-channelArt": "Safe area for text is the central 1546x423 region.",
  "pinterest-pinStandard": "Tall 2:3 pins perform best. Pinterest is a visual discovery engine.",
  "linkedin-cover": "The banner is very short at 191px. Keep your message concise and centered.",
  "reddit-banner": "Extremely wide at 31:1 aspect ratio. Most of the width is cropped on mobile.",
  "twitch-panel": "Small informational boxes below the stream. Use consistent branding across all panels.",
  "twitter-cover": "Desktop shows full 1500x500. Mobile crops vertically.",
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
  const dims = Object.values(p.types).map((t: any) => `${t.w}\u00D7${t.h}`);
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

  const siteUrl = process.env.SITE_URL || "https://squarepic-next.vercel.app";
  const pageUrl = `${siteUrl}/resize/${platform}`;
  const pageTitle = `${p.label} Image Sizes - Complete Dimension Guide`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the standard image size for ${p.label}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${p.label} supports multiple image formats. The most common sizes are ${Object.values(p.types).slice(0, 3).map((t: any) => `${t.w}x${t.h} pixels`).join(", ")}. Use SquarePic to resize your photos to any of these exact dimensions.`,
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
          {types.map(([k, t]: any) => (
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
        {types.map(([typeKey, type]: any) => {
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
            {p.label} supports multiple image formats. The most common sizes are {Object.values(p.types).slice(0, 3).map((t: any) => `${t.w}x${t.h} pixels`).join(", ")}. Use SquarePic to resize your photos to any of these exact dimensions.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="text-[var(--accent)] mb-1 text-[1rem] font-bold">How do I resize images for {p.label} without cropping?</h3>
          <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">
            Use SquarePic's free image resizer. Upload your photo, select the {p.label} preset that matches your needs, and choose Dynamic Blur or Solid Background mode to fill any empty space without cropping your original image.
          </p>
        </div>
        <div className="faq-item">
          <h3 className="text-[var(--accent)] mb-1 text-[1rem] font-bold">Is {p.label} image resizing free?</h3>
          <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">
            Yes. SquarePic is completely free with no signup required. All image processing happens locally in your browser using HTML5 Canvas. Your photos are never uploaded to any server.
          </p>
        </div>
      </div>

      <div className="text-center py-4">
        <a href="/" className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]">
          Resize Your {p.label} Image Free
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-sm bg-black/15 transition-transform duration-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>
    </div>
    </>
  );
}
