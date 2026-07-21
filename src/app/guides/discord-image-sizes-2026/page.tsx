import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema, FAQPageSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";

export const metadata: Metadata = {
  title: "Discord Image Sizes 2026: Server Icon, Banner & Emoji Guide",
  description: "Complete guide to Discord image dimensions for 2026. Server icons, banners, splash screens, emoji sizes, profile pictures, and best practices for your community.",
  openGraph: { title: "Discord Image Sizes 2026: Server Icon, Banner & Emoji Guide | SquarePic", description: "Complete guide to Discord image dimensions for 2026. Server icons, banners, splash screens, emoji sizes, profile pictures, and best practices.", type: "article", publishedTime: "2026-07-19", images: [{ url: "/squareframe_preview.png", width: 1200, height: 630 }] },
  alternates: { canonical: "https://www.squarepic.io/guides/discord-image-sizes-2026" },
  twitter: { card: "summary_large_image", title: "Discord Image Sizes 2026: Server Icon, Banner & Emoji Guide | SquarePic", description: "Complete guide to Discord image dimensions for 2026 with best practices." },
};

const SITE = "https://www.squarepic.io";

const FAQ_QUESTIONS = [
  { question: "What is the best size for a Discord server icon?", answer: "512 x 512 pixels (1:1) is the recommended size for Discord server icons. Upload a square PNG or JPEG with your subject centered — Discord displays the icon in a circular crop, so anything near the corners will be hidden. Larger images look sharper after compression." },
  { question: "What size should a Discord server banner be?", answer: "960 x 540 pixels (16:9) is the correct size for Discord server banners. Banners appear at the top of the channel list and require a Boost level 1 or higher to display. Use a horizontally composed image with the focal point centered for best results." },
  { question: "What are the emoji size limits on Discord?", answer: "Discord emojis must be at most 256 x 256 pixels and 256 KB. Static emojis work best at 128 x 128 for crisp display on all devices. Animated emojis should use the same dimensions but keep file size in check — large GIFs may fail to upload." },
  { question: "What is the maximum file size for Discord uploads?", answer: "All Discord users can upload files up to 10 MB. Nitro Basic subscribers get 25 MB, and Nitro subscribers get 100 MB. For server banners and splash images, keep the file under 100 KB to minimize load times on mobile." },
  { question: "What image format does Discord support?", answer: "Discord supports JPEG, PNG, GIF, and WebP for most image types. PNG is best for server icons and emojis with transparency. JPEG is fine for banners and splash screens where transparency is not required. For animated server icons (Nitro), use GIF." },
  { question: "Can I use a GIF as my Discord profile picture?", answer: "Yes, but only with a Nitro subscription. Animated avatars must be GIF format at 512 x 512 pixels (1:1) and under 10 MB. For the best quality, use a short looping animation rather than a long clip — Discord lowers the framerate on lengthy GIFs." },
];

export default function DiscordImageSizesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: "Discord Image Sizes 2026", url: `${SITE}/guides/discord-image-sizes-2026` },
      ]} />
      <ArticleSchema
        type="BlogPosting"
        title="Discord Image Sizes 2026: Server Icon, Banner & Emoji Guide"
        description="Complete guide to Discord image dimensions for 2026. Server icons, banners, splash screens, emoji sizes, profile pictures, and best practices for your community."
        url={`${SITE}/guides/discord-image-sizes-2026`}
        imageUrl={`${SITE}/squareframe_preview.png`}
        datePublished="2026-07-19"
        dateModified="2026-07-19"
        authorName="SevenOneLabs"
        authorUrl="https://github.com/Sevenonelabs"
      />
      <FAQPageSchema questions={FAQ_QUESTIONS} />
      <article className="max-w-[680px] w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">
            Discord
          </span>
          <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">Discord Image Sizes 2026: Server Icon, Banner & Emoji Guide</h1>
          <p className="text-[0.78rem] text-[#576675]">Published July 19, 2026 · Updated July 19, 2026 · 8 min read · by <a href="https://github.com/Sevenonelabs" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">SevenOneLabs</a></p>
          <ShareButtons path="/guides/discord-image-sizes-2026" title="Discord Image Sizes 2026: Server Icon, Banner & Emoji Guide" />
        </div>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          Discord has grown from a gaming chat app into a full-featured community platform where visual branding matters. Every image you upload — from the server icon to custom emojis — has specific size requirements that affect how your community looks on desktop and mobile. This guide covers every Discord image format with exact pixel dimensions, aspect ratios, and best practices updated for 2026.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Discord Image Sizes at a Glance</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Image Type</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Dimensions</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Aspect Ratio</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Server Icon</td>
                <td className="text-[#8d9aaa] py-2 px-3">512 x 512</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Community identity in the sidebar</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Server Banner</td>
                <td className="text-[#8d9aaa] py-2 px-3">960 x 540</td>
                <td className="text-[#8d9aaa] py-2 px-3">16:9</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Channel list header (Boost level 1+)</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Server Splash</td>
                <td className="text-[#8d9aaa] py-2 px-3">960 x 540</td>
                <td className="text-[#8d9aaa] py-2 px-3">16:9</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Invite background (Boost level 1+)</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Profile Picture</td>
                <td className="text-[#8d9aaa] py-2 px-3">512 x 512</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Avatar across the platform</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Custom Emoji</td>
                <td className="text-[#8d9aaa] py-2 px-3">128 x 128 (max 256 x 256)</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Server-wide reaction emotes</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Custom Sticker</td>
                <td className="text-[#8d9aaa] py-2 px-3">320 x 320 (max 512 x 512)</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Expressive server reactions</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Guild Template</td>
                <td className="text-[#8d9aaa] py-2 px-3">1920 x 1080</td>
                <td className="text-[#8d9aaa] py-2 px-3">16:9</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Server template previews</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Server Icon</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Your server icon is the most visible image on Discord — it appears in the server list, at the top of the channel sidebar, and in every invite link. Discord displays server icons in a circular crop within a rounded square container, and different sizes across desktop and mobile make centering your subject critical.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload at <strong className="text-[#e6edf5]">512 x 512 pixels</strong> for the sharpest rendering across all devices.</li>
          <li>Keep the subject within the central 60% of the frame — the circular crop hides edges.</li>
          <li>Avoid thin lines and small text — they become illegible at 32 px in the channel list.</li>
          <li>PNG with transparency is the best format for icons with irregular shapes.</li>
          <li>Nitro server owners can upload <strong className="text-[#e6edf5]">animated GIF</strong> icons at the same 512 x 512 size.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Server Banner</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Server banners require at least Boost level 1 and appear as a decorative header at the top of the channel list. The banner displays at different aspect ratios depending on the device — 960 x 540 is the recommended upload size to cover all scenarios.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Use <strong className="text-[#e6edf5]">960 x 540 (16:9)</strong> for the correct desktop display.</li>
          <li>Keep the focal point centered and avoid critical content near the top and bottom edges — Discord crops the banner height on mobile.</li>
          <li>JPEG at 80-90% quality gives a good balance of file size and visual fidelity.</li>
          <li>Keep file size under 100 KB to avoid slow loading on mobile connections.</li>
          <li>Dark banners work better for most themes since Discord defaults to a dark interface.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Server Splash Screen</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          The server splash image appears as the background when someone views your server invite or community page. Like the banner, it requires Boost level 1 or higher. The splash is a wide-format image that should represent your server&apos;s theme without relying on text overlay (Discord superimposes the server name and invite details on top).
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Use the same <strong className="text-[#e6edf5]">960 x 540 (16:9)</strong> dimensions as the server banner.</li>
          <li>Choose a background that works as a wallpaper — avoid sharp foreground elements that clash with Discord&apos;s invite overlay.</li>
          <li>PNG is best if your splash uses solid colors and clean lines; JPEG works for photographic backgrounds.</li>
          <li>The splash appears behind Discord&apos;s invite card UI, so keep the center area clear of important detail.</li>
          <li>Test your splash on mobile — Discord crops it differently on phones than on desktop.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">User Profile Picture</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Your user avatar appears next to every message, in the member list, and in DMs. The recommended upload size is 512 x 512 pixels, and Discord stores it as a square but displays it as a circle throughout the interface. Like server icons, centering your subject is essential to avoid clipping in the circular crop.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload at <strong className="text-[#e6edf5]">512 x 512 pixels</strong> for crisp display at all sizes.</li>
          <li>Center your subject within the frame — Discord crops the corners into a circle.</li>
          <li>Avoid text in avatars — it becomes unreadable at 24 px in the message area.</li>
          <li>Nitro subscribers can use <strong className="text-[#e6edf5]">animated GIF</strong> avatars at the same size.</li>
          <li>PNG preserves transparency; JPEG is acceptable for photographic avatars.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Emoji and Sticker Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Custom emojis and stickers are a core part of Discord culture. Every server can upload custom emojis, and boosted servers get additional slots. Stickers were introduced in 2021 and follow different rules than emojis:
        </p>
        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Custom Emojis</h3>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Maximum resolution: <strong className="text-[#e6edf5]">256 x 256 pixels</strong>; optimal resolution: 128 x 128.</li>
          <li>Maximum file size: <strong className="text-[#e6edf5]">256 KB</strong> per emoji.</li>
          <li>Static emojis: PNG format with transparent background.</li>
          <li>Animated emojis: GIF format at up to 256 x 256.</li>
          <li>Server Boost level determines emoji slots: 50 (level 1), 150 (level 2), 250 (level 3); each animated emoji counts as two slots.</li>
        </ul>
        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Custom Stickers</h3>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Recommended size: <strong className="text-[#e6edf5]">320 x 320 pixels</strong>; maximum: 512 x 512 pixels.</li>
          <li>Maximum file size: <strong className="text-[#e6edf5]">500 KB</strong> per sticker.</li>
          <li>Format: PNG with transparency (Lottie animated stickers are not yet supported).</li>
          <li>Stickers appear larger than emojis in the picker (apprximately 160 px on desktop).</li>
          <li>Each Boost level adds 15 custom sticker slots.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Discord Banner and Avatar Best Practices</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Beyond basic dimensions, following these best practices ensures your Discord server looks professional across every device:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Stay under file size limits.</strong> Discord enforces strict size limits per image type. Server icons must be under 10 MB but aim for under 500 KB for fast loading. Banners and splashes should stay under 100 KB.</li>
          <li><strong className="text-[#e6edf5]">Design for dark mode first.</strong> The majority of Discord users run the app in dark theme. Light-colored images with bright backgrounds can look harsh against the dark UI. Dark backgrounds with bright accents are the safest choice.</li>
          <li><strong className="text-[#e6edf5]">Test on mobile.</strong> Discord&apos;s mobile interface crops images differently. Server banners are significantly shorter on iOS and Android. Always check how your images look on a phone screen.</li>
          <li><strong className="text-[#e6edf5]">Use consistent branding.</strong> Your server icon, banner, and splash should share a consistent color palette and visual style. Discord displays these three elements together on the invite page — inconsistency looks unprofessional.</li>
          <li><strong className="text-[#e6edf5]">Optimize for compression.</strong> Discord recompresses all uploaded images. Exporting at 85-90% JPEG quality minimizes artifacts while keeping file size well under limits. Oversized files trigger more aggressive compression.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Common Discord Image Mistakes</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Off-center subjects in circular crops.</strong> Both server icons and profile pictures are displayed as circles. Text, logos, or faces near the edges get partially or fully cropped out. Keep everything in the central 60%.</li>
          <li><strong className="text-[#e6edf5]">Uploading square banners.</strong> Server banners are 16:9 landscape format. Uploading a square or portrait image forces Discord to add letterboxing or crop aggressively, ruining the visual effect.</li>
          <li><strong className="text-[#e6edf5]">Emoji files exceeding 256 KB.</strong> Discord silently rejects emoji uploads over 256 KB. Reduce the number of frames in animated emojis or use fewer colors to stay under the limit.</li>
          <li><strong className="text-[#e6edf5]">Ignoring Nitro restrictions.</strong> Animated avatars, animated server icons, and higher upload limits all require a Nitro subscription. Designing a server identity around features you do not have access to leads to disappointment.</li>
          <li><strong className="text-[#e6edf5]">Using JPEG for transparent images.</strong> Server icons and emojis with transparent backgrounds must use PNG. JPEG does not support transparency and will fill the background with white, breaking the visual in dark mode.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How Discord Handles Image Display Across Devices</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Discord displays images differently depending on the platform and screen size. Understanding these differences helps you design images that look great everywhere:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Desktop sidebar.</strong> Server icons display at 48 x 48 pixels. Text and fine details below the 48 px threshold become invisible.</li>
          <li><strong className="text-[#e6edf5]">Mobile.</strong> Server icons shrink further to 32 x 32 on most phones. The circular crop is also tighter relative to the image area on mobile.</li>
          <li><strong className="text-[#e6edf5]">Retina displays.</strong> Discord is a cross-platform Electron app that runs at various pixel densities. Uploading at the recommended resolution ensures crisp rendering on 2x and 3x retina screens.</li>
          <li><strong className="text-[#e6edf5]">Server banner crop.</strong> On desktop, the banner displays at apprximately 340 x 120 px in the channel sidebar header. On mobile, it is cropped to a much shorter strip. The top center of your banner is the only guaranteed visible area across all devices.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Quick Reference Card</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Use Case</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Dimensions</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Format</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Server icon</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">512 x 512</td>
                <td className="text-[#8d9aaa] py-2 pl-3">PNG / JPEG / GIF (animated)</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Server banner</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">960 x 540</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Server splash</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">960 x 540</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Profile picture</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">512 x 512</td>
                <td className="text-[#8d9aaa] py-2 pl-3">PNG / JPEG / GIF (Nitro)</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Custom emoji</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">128 x 128 (max 256)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">PNG / GIF</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Custom sticker</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">320 x 320 (max 512)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Guild template</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1920 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How SquarePic Helps with Discord Images</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          SquarePic lets you resize, crop, and convert images to any Discord format directly in your browser. No uploads, no signup, no watermarks. Use the <Link href="/resize" className="text-[var(--accent)] no-underline hover:underline">image resizer</Link> to select your target format — server icon, banner, or profile picture — and download a perfectly sized image in seconds. All processing happens client-side; your images never leave your device.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-6">
          {FAQ_QUESTIONS.map((q, i) => (
            <div key={i}>
              <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">{q.question}</h3>
              <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">{q.answer}</p>
            </div>
          ))}
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Key Takeaways</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Discord uses three main image categories: server assets (icon at 512 x 512, banner and splash at 960 x 540), user profile pictures (512 x 512, circular crop), and custom expressions (emojis up to 256 x 256, stickers up to 512 x 512). Always center subjects in square crops, use PNG for transparency, stay under Discord&apos;s file size limits, and design with dark mode in mind. For a full list of social media image specs, check the <Link href="/social-media-image-sizes" className="text-[var(--accent)] no-underline hover:underline">social media image sizes guide</Link>.
        </p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed m-0">
            <strong className="text-[#e6edf5]">Need to resize images for Discord?</strong>{" "}
            Use <Link href="/resize" className="text-[var(--accent)] no-underline hover:underline">SquarePic&apos;s image resizer</Link> — select your target format and download perfectly sized images in seconds. No signup required.
          </p>
        </div>

        <RelatedGuides current="discord-image-sizes-2026" />

        <div className="text-center py-6 border-t border-[rgba(255,255,255,0.06)]">
          <Link
            href="/resize"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px var(--accent-glow)]"
          >
            Resize Images for Discord Free
          </Link>
        </div>
      </article>
    </>
  );
}
