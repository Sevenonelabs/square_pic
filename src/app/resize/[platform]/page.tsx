import { ResizeTool } from "../resize-tool";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import presets from "@/data/social-presets.json";
import { PLATFORM_ICONS } from "@/data/social-icons";
import { pageMetadata } from "@/lib/seo";
import { PLATFORM_SEO } from "@/data/platform-seo";
import { SITE_URL } from "@/lib/constants";
import { BreadcrumbSchema, WebAppSchema, FAQPageSchema } from "@/components/schema-scripts";

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
  "instagram-portrait": "A taller 4:5 preset. Check the feed and grid previews separately.",
  "instagram-square": "The classic Instagram format. Works well for all content types.",
  "instagram-stories": "Keep text away from account controls, captions, and stickers. Check the current Story or Reel preview.",
  "facebook-cover": "Displays differently on mobile (640x360) vs desktop (851x315). Keep text centered.",
  "facebook-profile": "Use a recognizable headshot or brand logo. The 320x320 crop is circular on profiles.",
  "facebook-landscape": "Shared link previews use 1200x630. Optimize your Open Graph images at this size.",
  "youtube-thumbnail": "Use high contrast and bold text. YouTube heavily weights thumbnail click-through when recommending videos.",
  "youtube-channelArt": "Safe area for text is the central 1546x423 region.",
  "youtube-profile": "Profile photos display at 800x800 but should look good at small sizes.",
  "pinterest-pinStandard": "Tall 2:3 pins perform best. Pinterest is a visual discovery engine.",
  "pinterest-profile": "Profile images appear in search results. Make them instantly recognizable.",
  "linkedin-cover": "Use the 1512 × 256 company Page cover preset. Keep key content central and check the mobile preview.",
  "linkedin-profile": "Keep the face or logo centered and leave room for a circular preview.",
  "linkedin-square": "A 1:1 post preset. Check that small text remains legible in the feed preview.",
  "reddit-banner": "Extremely wide at 31:1 aspect ratio. Most of the width is cropped on mobile.",
  "twitch-panel": "A 320-pixel-wide working canvas for an information panel. The 160-pixel height is our preset, not a required height.",
  "twitch-banner": "Profile banner artwork at the top of the channel page. Check how the header scales at different window widths.",
  "twitch-offlineBanner": "A separate still image for the video player when the channel is offline. This 1920 × 1080 canvas is a working preset.",
  "twitter-cover": "Desktop shows full 1500x500. Mobile crops vertically.",
  "twitter-profile": "The profile photo is circular. Keep your subject centered in the square frame.",
  "twitter-landscape": "Images in tweets display at 1600x900. Horizontal images perform better than vertical on X.",
  "tiktok-profile": "TikTok profile photos are circular. Use a clear headshot or brand icon.",
  "tiktok-portrait": "Vertical 9:16 video covers drive the most engagement on TikTok.",
  "whatsapp-profile": "WhatsApp profile pictures appear very small on chat lists. Use high contrast.",
  "snapchat-profile": "Snapchat Bitmoji or profile photos display as circular icons.",
  "telegram-profile": "Telegram profile photos show at 128x128 in chat lists. Keep it simple.",
  "discord-serverIcon": "Server icons display as circular images. Use a memorable symbol or letter.",
  "discord-serverBanner": "The channel-list banner uses 16:9 and normally requires Boost Level 2. Animated banners require Level 3.",
  "discord-serverSplash": "The invite background uses 1920 × 1080 JPG or PNG at Boost Level 1. Upload it separately from the channel-list banner.",
};

const PLATFORM_BEST_PRACTICES: Record<string, { formats: string; tips: string; whyMatters: string; stats: string }> = {
  twitch: {
    formats: "Export JPEG for photographs or PNG for text and graphic edges. SquarePic exports still images; it does not produce an animated banner.",
    tips: "Choose Profile Picture, Profile Banner, Panel or Video Player Banner in the editor. Upload the result to the matching Twitch setting and review it at the displayed size.",
    whyMatters: "The profile banner sits on the channel page, while the offline image belongs to the video player. A panel uses a much narrower canvas, so prepare its text separately.",
    stats: "Our panel preset is 320 × 160. Twitch's official help agrees on 320-pixel width but gives conflicting height and file-size limits. Check the current upload screen for those limits.",
  },
  discord: {
    formats: "Export a static invite background as JPG or PNG. SquarePic creates still images; animated GIF banners and APNG stickers need another workflow.",
    tips: "Select Discord under Social Size in the editor. Use Server Banner for 960 × 540 or Server Splash for 1920 × 1080, then check the matching Discord upload preview.",
    whyMatters: "The channel-list banner and invite background share a 16:9 ratio but have different dimensions and settings. Resizing cannot unlock a server perk or change which preview displays it.",
    stats: "Server banners normally start at Boost Level 2; invite backgrounds at Level 1. The 512 × 512 icon and avatar dimensions here are working presets.",
  },
  instagram: {
    formats: "Export photographs as JPEG or artwork with sharp text as PNG. Check the destination's accepted formats before choosing WebP. This tool exports still images, not Reel videos.",
    tips: "Choose a square, portrait, landscape, or vertical editor preset. Keep important text away from interface controls and preview the image in Instagram before publishing.",
    whyMatters: "A square canvas, a vertical Story, and a grid thumbnail show different parts of a composition. Fit with background to preserve the photo, or deliberately crop to fill the frame.",
    stats: "The square preset is 1080 × 1080 at 1:1. Stories/Reels artwork uses 1080 × 1920 at 9:16. These presets prepare images; preview behavior depends on the placement.",
  },
  facebook: {
    formats: "JPEG is preferred for photos. PNG works well for graphics with text and logos. Facebook recommends sRGB color space for accurate color reproduction.",
    tips: "Upload images at 72 DPI at minimum. Avoid JPEG artifacts by saving at quality 85% or higher. Facebook compresses images after upload, so start with a clean source file.",
    whyMatters: "Facebook's algorithm favors images that load quickly and display correctly on all devices. An incorrectly sized cover photo can appear stretched or cropped, damaging your brand's professional appearance.",
    stats: "Facebook applies its own compression to photos after upload. A clean, correctly sized source image prevents avoidable quality loss on feed posts and cover photos.",
  },
  twitter: {
    formats: "JPEG and PNG both work well. Twitter recommends JPEG for photos and PNG for graphics with text. GIFs are supported for animated content.",
    tips: "Twitter's card previews use 1200x600 for summary cards. Use 1600x900 for in-feed images. Profile photos display at 400x400 but the visible area is circular - keep your subject centered.",
    whyMatters: "X (Twitter) uses lazy image loading, so incorrect dimensions can cause layout shifts. The platform also generates multiple thumbnails, so starting with the right size ensures quality across all display contexts.",
    stats: "X generates multiple previews from every upload and loads images lazily. Correct dimensions keep page layouts stable and image quality consistent across previews.",
  },
  linkedin: {
    formats: "JPEG is a practical choice for photographs; PNG preserves sharp text and logos. Check LinkedIn's upload requirements for your selected placement before choosing another export format.",
    tips: "Use the 1200 × 627 landscape or 1200 × 1200 square preset for the intended post shape. Review text at feed-preview size, then check desktop and mobile crops.",
    whyMatters: "Profile photos, company Page covers, personal banners, and post images use different shapes. Matching the correct placement prevents an unexpected crop or stretched picture.",
    stats: "1200 × 627 is approximately 1.91:1. The company Page cover preset is 1512 × 256, and the profile-photo preset is square at 400 × 400.",
  },
  tiktok: {
    formats: "JPEG and PNG both work for profile and cover images. TikTok recommends JPEG for photos to keep file sizes small.",
    tips: "TikTok is full-screen vertical. Profile images are small (200x200) and circular. Cover images for videos should be 1080x1920 at minimum.",
    whyMatters: "TikTok's algorithm processes thumbnail images to determine visual quality. Blurry or incorrectly sized cover images reduce click-through rates on your content.",
    stats: "TikTok shows profile images as small circles and evaluates cover images as it surfaces content. Sharp, correctly sized vertical 9:16 covers perform best.",
  },
  youtube: {
    formats: "JPEG, PNG, and GIF are all supported. YouTube recommends JPEG for thumbnails and PNG for channel art with text.",
    tips: "Thumbnails are the most important visual asset on YouTube. Use 1280x720 with bold, readable text. Channel art displays differently on TV (2560x423), desktop (1546x423), and mobile (1546x423).",
    whyMatters: "YouTube's algorithm heavily weights thumbnail click-through rate when recommending videos. A properly sized, high-contrast thumbnail can dramatically increase views.",
    stats: "YouTube relies on thumbnails when deciding which videos to recommend. A bold, correctly sized 1280x720 thumbnail is the most effective way to earn clicks.",
  },
  pinterest: {
    formats: "JPEG is the standard. PNG works for infographics with text. WebP is supported but JPEG is preferred for compatibility.",
    tips: "Tall vertical pins (1000x1500, 2:3 aspect) perform best on Pinterest. Horizontal pins receive less engagement. Use readable text overlays and bright, distinct colors.",
    whyMatters: "Pinterest is a visual discovery engine, not a social network. Your pin dimensions directly affect how much screen space it occupies in the feed, influencing click-through and save rates.",
    stats: "Pinterest is a visual discovery feed. Tall 2:3 pins occupy more screen space and are shared more often than square or horizontal pins.",
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
  const copy = PLATFORM_SEO[key];
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: `/resize/${platform}`,
    image: "/og/og-social-media-image-sizes.png",
  });
}

export default async function PlatformPage({ params }: Props) {
  const { platform } = await params;
  const key = SLUG_MAP[platform];
  if (!key || !presets[key as keyof typeof presets]) notFound();

  const p = presets[key as keyof typeof presets];
  const types = Object.entries(p.types);

  const siteUrl = SITE_URL;
  const pageUrl = `${siteUrl}/resize/${platform}`;

  const faqQuestions = [
    {
      question: `What is the standard image size for ${p.label}?`,
      answer: `${p.label} supports multiple image formats. The most common sizes are ${Object.values(p.types).slice(0, 3).map((t: PresetType) => `${t.w}x${t.h} pixels`).join(", ")}. Use SquarePic to resize your photos to any of these exact dimensions.`,
    },
    {
      question: `How do I resize images for ${p.label} without cropping?`,
      answer: `Use SquarePic's free image resizer. Upload your photo, select the ${p.label} preset that matches your needs, and choose Dynamic Blur or Solid Background mode to fill any empty space without cropping your original image.`,
    },
    {
      question: `Is ${p.label} image resizing free?`,
      answer: "Yes. SquarePic is completely free with no signup required. All image processing happens locally in your browser using HTML5 Canvas. Your photos are never uploaded to any server.",
    },
    {
      question: `What is the best image format for ${p.label}?`,
      answer: key === "discord" ? "Use JPG or PNG for a Discord invite background. JPEG is useful for photos; PNG preserves sharp text and edges. SquarePic exports still images, so animated banners need a separate workflow." : `For ${p.label}, JPEG is best for photos with smooth gradients, PNG is ideal for graphics with text or sharp edges, and WebP offers excellent quality at smaller file sizes. SquarePic supports all three formats for export.`,
    },
    {
      question: `Can I create a ${p.label} profile picture with SquarePic?`,
      answer: `Yes. Upload your photo to SquarePic and use our free editor to make it perfectly square. Choose the ${p.label} preset size and export a high-quality profile picture in seconds.`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: `${p.label} Image Sizes`, url: pageUrl }]} />
      <WebAppSchema name={`SquarePic - ${p.label} Image Sizes`} url={pageUrl} description={`Resize still images with ${p.label} presets, preview and download on this page.`} dateModified={["instagram", "linkedin", "discord", "twitch"].includes(key) ? "2026-10-08" : "2026-07-13"} />
      <FAQPageSchema questions={faqQuestions} />
      <div className="max-w-[920px] w-full mx-auto px-5 py-6">
      <div className="text-center mb-8 p-8 bg-gradient-to-br from-[rgba(6,182,212,0.04)] to-[rgba(139,92,246,0.04)] border border-[rgba(6,182,212,0.08)] rounded-lg">
        <h1 className="text-[1.5rem] font-extrabold tracking-tight mb-2 flex items-center justify-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[var(--accent)]">
            <path d={PLATFORM_ICONS[key] || "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"} />
          </svg>
          {PLATFORM_SEO[key].h1}
        </h1>
        <p className="text-base text-[#8d9aaa] max-w-[600px] mx-auto leading-relaxed">{PLATFORM_SEO[key].description}</p>
        <div className="flex justify-center gap-2 flex-wrap mt-5">
          {types.map(([k, t]: [string, PresetType]) => (
            <span key={k} className="text-[0.875rem] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded-sm bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.15)] text-[var(--accent)]">
              {t.w}x{t.h}
            </span>
          ))}
        </div>
      </div>

      <div id="resizer"><ResizeTool key={key} platform={key} /></div>

      {key === "discord" && (
        <section className="mb-8 text-[0.9rem] text-[#8d9aaa] leading-relaxed">
          <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Choose a server banner or invite background</h2>
          <p>Use the Server Banner preset for a 960 × 540 channel-list image. Server Splash creates a 1920 × 1080 invite background.
            Both are 16:9. Use the <a href="#resizer" className="text-[var(--accent)] hover:underline">Discord editor above</a> to choose the matching preset.</p>
          <p className="mt-3">Fit with Solid or Blur at 100% zoom to retain the full photo, or use Crop to fill the frame.
            Export invite artwork as JPG or PNG. The server&apos;s Boost access and upload placement determine where it appears.</p>
          <p className="mt-3">Read the <Link href="/guides/discord-image-sizes-2026" className="text-[var(--accent)] hover:underline">Discord banner and missing-splash guide</Link> for current requirements and preview checks.</p>
        </section>
      )}

      {(key === "instagram" || key === "linkedin") && (
        <section className="mb-8 text-[0.9rem] text-[#8d9aaa] leading-relaxed">
          <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">{key === "linkedin" ? "What aspect ratio is 1200 × 627?" : "How to make a full photo fit an Instagram square"}</h2>
          {key === "linkedin" ? <>
            <p>A 1200 × 627 image is approximately 1.914:1, a landscape shape. Its exact reduced ratio is 400:209.
              LinkedIn&apos;s <a href="https://www.linkedin.com/help/linkedin/answer/a563309/image-specifications-for-your-linkedin-pages-and-career-pages" className="text-[var(--accent)] hover:underline">Pages image specifications</a> list this size for updates with a custom image.
              A 1200 × 628 image is a similar shape but has one extra row of pixels; use 1200 × 627 when matching this preset.</p>
            <p className="mt-3">For a square post, choose 1200 × 1200. The 1512 × 256 cover preset here is for a company Page, not a personal profile banner.
              See the <Link href="/guides/linkedin-image-sizes-2026" className="text-[var(--accent)] hover:underline">LinkedIn banner, profile, and post guide</Link> to distinguish the placements.</p>
          </> : <>
            <p>Choose the 1080 × 1080 square preset and use Blur or Solid to add background around a portrait or landscape photo.
              Keep Zoom at 100% so the full picture fits. Crop fills the frame by trimming the edges instead.</p>
            <p className="mt-3">Other editor presets include 1080 × 1350 portrait, 1080 × 566 landscape, and 1080 × 1920 Stories/Reels artwork.
              A square file and a profile-grid preview can have different visible areas. Review the destination&apos;s preview before posting.</p>
          </>}
          <p className="mt-3">Use the <a href="#resizer" className="text-[var(--accent)] hover:underline">{p.label} editor above</a> to select the preset, preview the fit or crop, and download.
            {key === "linkedin" && " Official Pages guidance checked October 8, 2026. The 1200 × 627 recommendation applies to Page posts with a URL and custom image."}</p>
          <p className="mt-3">Need to keep every edge? Follow our <Link href="/guides/make-image-square-without-cropping" className="text-[var(--accent)] hover:underline">guide to fitting a full photo in a square</Link>.
            For dimensions in another ratio, use the <Link href="/image-size-calculator" className="text-[var(--accent)] hover:underline">aspect ratio calculator</Link>.</p>
        </section>
      )}

      {key === "twitch" && (
        <section className="mb-8 text-[0.9rem] text-[#8d9aaa] leading-relaxed">
          <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-3">Choose the Twitch asset before resizing</h2>
          <p>The Profile Picture preset is a 300 × 300 working square. The Profile Banner preset is 1200 × 480,
            which Twitch recommends for the channel header. Video Player Banner uses our 1920 × 1080 working canvas
            for the image shown while the channel is offline. These are separate uploads.</p>
          <p className="mt-3">Panel uses a 320 × 160 canvas for information below the stream. The width is 320 pixels;
            160 is a practical preset height. Keep text readable at that width. Fit with Blur or Solid to retain the
            whole source, or use Crop to trim its edges.</p>
          <p className="mt-3">Official references reviewed October 8, 2026:
            {" "}<a href="https://help.twitch.tv/s/article/channel-page-setup?language=en_US" className="text-[var(--accent)] hover:underline">Twitch channel setup</a> and
            {" "}<a href="https://help.twitch.tv/s/article/how-to-edit-info-panels?language=en_US" className="text-[var(--accent)] hover:underline">panel editing</a>.
            Indexed versions disagree on panel height and byte limits, so confirm those in the current upload screen.</p>
        </section>
      )}

      <div className="flex items-center gap-2 mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[var(--accent)]">
          <path d={PLATFORM_ICONS[key] || "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"} />
        </svg>
        <h2 className="text-[1rem] font-extrabold text-[#e6edf5]">All {p.label} Image Sizes</h2>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {types.map(([typeKey, type]: [string, PresetType]) => {
          const header = key === "twitch" ? type.label : TYPE_HEADERS[typeKey] || type.label;
          const tip = TIPS[`${key}-${typeKey}`];
          return (
            <div
              key={typeKey}
              className="flex items-start gap-4 p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.12)]"
            >
              {tip && <div className="w-[3px] shrink-0 self-stretch bg-[var(--accent)] opacity-40 rounded-full" />}
              <div className="flex-1 min-w-0">
                <h3 className="text-[0.875rem] font-bold text-[#e6edf5] mb-0.5">
                  {header}: <span style={{ color: "var(--accent)" }}>{type.w} x {type.h} px</span>
                </h3>
                <p className="text-base text-[#8d9aaa] leading-relaxed">Aspect ratio: {type.aspect}</p>
                {tip && <p className="text-base text-[#8d9aaa] mt-1.5 leading-relaxed">{tip}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <h2 className="text-[1rem] font-extrabold text-[#e6edf5]">Frequently Asked Questions</h2>
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
            {faqQuestions[3].answer}
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
        <h2 className="text-[1rem] font-extrabold text-[#e6edf5]">Best Practices for {p.label} Images</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-2">Recommended Formats</h3>
          <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
            {(PLATFORM_BEST_PRACTICES[key] || DEFAULT_PRACTICES).formats}
          </p>
        </div>
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-2">Quick Facts</h3>
          <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
            {(PLATFORM_BEST_PRACTICES[key] || DEFAULT_PRACTICES).stats}
          </p>
        </div>
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-2">Upload Tips</h3>
          <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
            {(PLATFORM_BEST_PRACTICES[key] || DEFAULT_PRACTICES).tips}
          </p>
        </div>
        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
          <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-2">Why Dimensions Matter</h3>
          <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
            {(PLATFORM_BEST_PRACTICES[key] || DEFAULT_PRACTICES).whyMatters}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <h2 className="text-[1rem] font-extrabold text-[#e6edf5]">Related Resources</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {key === "discord" && <Link href="/guides/discord-image-sizes-2026" className="block border border-white/10 rounded-xl p-4 text-[var(--accent)] hover:underline">
          Discord server banner dimensions and invite splash troubleshooting
        </Link>}
        {(key === "instagram" || key === "linkedin") && (
          <Link href={key === "instagram" ? "/guides/instagram-reels-stories-guide" : "/guides/linkedin-image-sizes-2026"}
            className="block border border-white/10 rounded-xl p-4 text-[var(--accent)] hover:underline">
            {key === "instagram" ? "Reels vs Stories: dimensions and text placement" : "LinkedIn banners, profiles, and posts: detailed guide"}
          </Link>
        )}
        {key === "instagram" && <Link href="/guides/instagram-feed-sizes-2026" className="block border border-white/10 rounded-xl p-4 text-[var(--accent)] hover:underline">
          Instagram feed, portrait and profile image sizes
        </Link>}
        <Link href="/guides/social-media-image-sizes-2026" className="group bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5">
          <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors">
            {p.label} Image Sizes - Complete Guide
          </h3>
          <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
            See all {p.label} dimensions alongside every other platform in our 2026 social media image sizes cheat sheet.
          </p>
        </Link>
        <Link href="/image-size-calculator" className="group bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5">
          <h3 className="text-[0.875rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors">
            Image Size Calculator
          </h3>
          <p className="text-base text-[#8d9aaa] leading-relaxed m-0">
            Calculate aspect ratios, megapixels, and proportional resize dimensions from width and height.
          </p>
        </Link>
      </div>

      <div className="text-center py-4">
        <a href="#resizer" className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]">
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
