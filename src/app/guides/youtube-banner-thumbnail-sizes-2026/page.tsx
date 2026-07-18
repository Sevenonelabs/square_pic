import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";

export const metadata: Metadata = {
  title: "YouTube Banner & Thumbnail Sizes 2026: Channel Art, Profile & Video",
  description: "Complete guide to YouTube image dimensions for 2026. Channel art/banner sizes, video thumbnail specs, profile picture requirements, and design best practices.",
  openGraph: { title: "YouTube Banner & Thumbnail Sizes 2026: Channel Art, Profile & Video | SquarePic", description: "Complete guide to YouTube image dimensions for 2026. Channel art, thumbnails, profile pictures, and design best practices.", type: "article", publishedTime: "2026-07-19", images: [{ url: "/squareframe_preview.png", width: 1200, height: 630 }] },
  alternates: { canonical: "https://www.squarepic.io/guides/youtube-banner-thumbnail-sizes-2026" },
  twitter: { card: "summary_large_image", title: "YouTube Banner & Thumbnail Sizes 2026: Channel Art, Profile & Video | SquarePic", description: "Complete guide to YouTube image dimensions for 2026." },
};

const SITE = "https://www.squarepic.io";

export default function YouTubeBannerThumbnailSizesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: "YouTube Banner & Thumbnail Sizes 2026", url: `${SITE}/guides/youtube-banner-thumbnail-sizes-2026` },
      ]} />
      <ArticleSchema
        type="BlogPosting"
        title="YouTube Banner & Thumbnail Sizes 2026: Channel Art, Profile & Video"
        description="Complete guide to YouTube image dimensions for 2026. Channel art/banner sizes, video thumbnail specs, profile picture requirements, and design best practices."
        url={`${SITE}/guides/youtube-banner-thumbnail-sizes-2026`}
        imageUrl={`${SITE}/squareframe_preview.png`}
        datePublished="2026-07-19"
        dateModified="2026-07-19"
        authorName="SevenOneLabs"
        authorUrl="https://github.com/Sevenonelabs"
      />
      <article className="max-w-[680px] w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">
            YouTube
          </span>
          <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">YouTube Banner & Thumbnail Sizes 2026: Channel Art, Profile & Video</h1>
          <p className="text-[0.78rem] text-[#576675]">Published July 19, 2026 · Updated July 19, 2026 · 9 min read · by <a href="https://github.com/Sevenonelabs" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">SevenOneLabs</a></p>
          <ShareButtons path="/guides/youtube-banner-thumbnail-sizes-2026" title="YouTube Banner & Thumbnail Sizes 2026: Channel Art, Profile & Video" />
        </div>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          YouTube is the second-largest search engine after Google, and visual consistency across your channel directly affects subscriber growth. Thumbnails drive click-through rates. Channel art builds brand recognition. Profile pictures establish trust. Each element requires specific dimensions, and getting them wrong means your content looks unprofessional before anyone watches a second of video. This guide covers every YouTube image format with exact specs updated for 2026.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">YouTube Image Sizes at a Glance</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Image Type</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Dimensions</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Aspect Ratio</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Format</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Channel Art (full)</td>
                <td className="text-[#8d9aaa] py-2 px-3">2560 x 1440</td>
                <td className="text-[#8d9aaa] py-2 px-3">16:9</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Banner (TV display)</td>
                <td className="text-[#8d9aaa] py-2 px-3">2560 x 1440</td>
                <td className="text-[#8d9aaa] py-2 px-3">16:9</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Banner (desktop)</td>
                <td className="text-[#8d9aaa] py-2 px-3">1546 x 423</td>
                <td className="text-[#8d9aaa] py-2 px-3">3.65:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">—</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Banner (mobile)</td>
                <td className="text-[#8d9aaa] py-2 px-3">1546 x 423</td>
                <td className="text-[#8d9aaa] py-2 px-3">3.65:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">—</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Banner (tablet)</td>
                <td className="text-[#8d9aaa] py-2 px-3">1855 x 423</td>
                <td className="text-[#8d9aaa] py-2 px-3">4.38:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">—</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Video Thumbnail</td>
                <td className="text-[#8d9aaa] py-2 px-3">1280 x 720</td>
                <td className="text-[#8d9aaa] py-2 px-3">16:9</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG / GIF</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Profile Picture</td>
                <td className="text-[#8d9aaa] py-2 px-3">800 x 800</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Watermark</td>
                <td className="text-[#8d9aaa] py-2 px-3">150 x 150</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">PNG</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">YouTube Channel Art (Banner) Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          YouTube channel art is the most complex image size on the platform because it must display across TV, desktop, tablet, and mobile — each with a different visible area. The full canvas is 2560 x 1440 pixels, but no device shows the entire image without cropping.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          The safe zone where critical content (logos, taglines, faces) will always be visible is 1546 x 423 pixels, centered horizontally. This area appears consistently across desktop and mobile. The full 2560 width is only visible on TV screens. The outer edges beyond the safe zone are best used for background patterns, gradients, or extended scenery — never for text or logos.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Device</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Visible Area</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">TV</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">2560 x 1440 (full)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Entire image visible</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Desktop</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1546 x 423 (center)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Top and bottom cropped, sides truncated</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Tablet</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1855 x 423 (center)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Wider desktop crop</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Mobile</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1546 x 423 (center)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Same as desktop safe zone</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Design your channel art at 2560 x 1440. Place all critical elements — channel name, tagline, logo, upload schedule — within the center 1546 x 423 safe zone. Use the outer areas for background visuals only. The file size limit is 6 MB. JPEG works best for photo-based banners; PNG for designs with text or logos.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">YouTube Video Thumbnails</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Video thumbnails are the single most important visual element on YouTube. A compelling thumbnail can increase click-through rate by 30-50% compared to auto-generated frames. The standard thumbnail size is 1280 x 720 pixels at 16:9 aspect ratio, with a maximum file size of 2 MB.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          YouTube displays thumbnails at various sizes — 196 x 110 in search results, 320 x 180 in the suggestion sidebar, and up to 1280 x 720 in embedded players. Design at full resolution so thumbnails remain sharp at every display size. Supported formats include JPEG, PNG, BMP, and GIF. PNG preserves sharp text overlays; JPEG gives smaller file sizes for photographic thumbnails.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Thumbnail Design Rules</h3>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Use <strong className="text-[#e6edf5]">bold, readable text</strong> — most thumbnails are viewed at under 200px wide. Sans-serif fonts at 36px+ work best.</li>
          <li>Include a <strong className="text-[#e6edf5]">human face</strong> close to the camera. Thumbnails with faces get 2x more clicks than those without.</li>
          <li>Use <strong className="text-[#e6edf5]">high contrast</strong> between text and background. Dark overlays behind light text ensure readability at small sizes.</li>
          <li>Keep the <strong className="text-[#e6edf5]">subject centered</strong>. YouTube crops thumbnails to 4:3 in the comment preview panel and 1:1 in some playlist views.</li>
          <li>Stick to a <strong className="text-[#e6edf5]">consistent color palette</strong> across your channel. Recognizable thumbnails build brand loyalty and improve subscriber recall.</li>
          <li>Avoid <strong className="text-[#e6edf5]">misleading imagery</strong> — YouTube&apos;s algorithm penalizes clickbait thumbnails that do not match video content.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">YouTube Profile Picture</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Your YouTube profile picture (sometimes called an avatar) appears next to every video, comment, and search result. It displays at 800 x 800 pixels maximum and is cropped to a circle. The minimum upload size is 98 x 98 pixels, but always upload the largest available version — 800 x 800 ensures sharp display at every size. YouTube displays your profile picture at 80 x 80 on the channel page, 48 x 48 in comments, and 24 x 24 in notifications.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload at <strong className="text-[#e6edf5]">800 x 800 pixels minimum</strong> (1:1 square).</li>
          <li>Center the subject within the frame — YouTube crops to a circle.</li>
          <li>Use a simple background for recognizability at small sizes.</li>
          <li>PNG preserves logo detail; JPEG is fine for headshots.</li>
          <li>Change your profile picture when your branding updates — it builds recognition.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">YouTube Video Watermark</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          YouTube lets you add a custom watermark to all your videos. The watermark appears as a small overlay in the bottom-right corner of your video player. The recommended size is 150 x 150 pixels at 1:1 aspect ratio. Upload a PNG with a transparent background for the cleanest result. The watermark should be simple — your channel logo or icon — since it displays at roughly 50 x 50 pixels during playback.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">YouTube Shorts Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          YouTube Shorts are vertical videos up to 60 seconds long displayed in a dedicated feed. Shorts use a 9:16 aspect ratio at 1080 x 1920 pixels. The cover image for Shorts is automatically selected from the video frame — you cannot upload a custom thumbnail for Shorts the way you can for standard videos. This makes the first frame of your Short critical. Design your video so the opening frame is visually compelling, with centered subjects and readable text overlays.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Best Practices for YouTube Channel Branding</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Match your channel art to your video thumbnails.</strong> Consistent colors and fonts across your banner, profile picture, and thumbnails create a recognizable brand. Top YouTubers use the same 2-3 accent colors everywhere.</li>
          <li><strong className="text-[#e6edf5]">Update channel art seasonally.</strong> YouTube rewards active channels in search results. A banner update signals freshness. Update your channel art every 3-4 months with current content themes.</li>
          <li><strong className="text-[#e6edf5]">Test thumbnails at small sizes.</strong> Before publishing, resize your thumbnail to 196 x 110 pixels. If text is unreadable or the subject is unclear, redesign. Most browsing happens on mobile where thumbnails are tiny.</li>
          <li><strong className="text-[#e6edf5]">Use transparent watermarks.</strong> A semi-transparent PNG watermark in the corner adds professional polish without distracting from content. Set opacity to 30-50% for a subtle brand presence.</li>
          <li><strong className="text-[#e6edf5]">Keep file sizes under platform limits.</strong> Channel art maxes out at 6 MB. Thumbnails at 2 MB. Profile pictures at 8 MB. Oversized files cause upload failures.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Common YouTube Image Mistakes</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Channel art text in the crop zones.</strong> The most frequent error. Text placed outside the 1546 x 423 safe zone is cut off on desktop and invisible on mobile. Design within the safe zone first, then extend to 2560 x 1440.</li>
          <li><strong className="text-[#e6edf5]">Thumbnail text too small.</strong> Text that looks good at 1280 x 720 is illegible at 196 x 110. Use bold sans-serif fonts at 36px minimum for main text, 24px minimum for supporting text.</li>
          <li><strong className="text-[#e6edf5]">Low-contrast thumbnails.</strong> Thumbnails that blend into YouTube&apos;s interface or look washed out get skipped. Use high contrast and vibrant colors to stand out in the suggestion sidebar.</li>
          <li><strong className="text-[#e6edf5]">Profile picture not centered.</strong> YouTube crops profile pictures to circles. Faces or logos near the edges get cut off. Keep everything within the central 70% of the frame.</li>
          <li><strong className="text-[#e6edf5]">Using auto-generated thumbnails.</strong> YouTube auto-selects three frames from your video, but they are rarely the most clickable. Custom thumbnails consistently outperform auto-generated ones by a wide margin.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How SquarePic Helps with YouTube Images</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          SquarePic lets you resize, crop, and convert images to every YouTube format directly in your browser. Use the <Link href="/resize/youtube" className="text-[var(--accent)] no-underline hover:underline">YouTube image resizer</Link> to select your target — channel art, thumbnail, profile picture, or watermark — and download a perfectly sized image in seconds. No signup, no uploads, no watermarks. All processing happens client-side.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">What size is YouTube channel art?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">The full channel art canvas is 2560 x 1440 pixels. The safe zone visible on all devices is the center 1546 x 423 pixels. Design at full resolution but keep critical content in the center safe zone.</p>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">What size should a YouTube thumbnail be?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">1280 x 720 pixels at 16:9 aspect ratio. Maximum file size is 2 MB. Use JPEG for photos, PNG for graphics with text. Keep text bold and readable at thumbnail size.</p>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">What is the best YouTube profile picture size?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">800 x 800 pixels at 1:1 aspect ratio. YouTube displays it as a circle, so center your subject. Minimum upload is 98 x 98, but always use the largest available resolution.</p>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">Can I use any image format for YouTube thumbnails?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">YouTube supports JPEG, PNG, BMP, GIF, and WebP for thumbnails. JPEG offers the best balance of quality and file size for photographic thumbnails. PNG preserves sharp text overlays.</p>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">How do I make a YouTube banner that fits all devices?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">Design at 2560 x 1440 pixels. Place all important content in the center 1546 x 423 safe zone. Use the outer 507 pixels on each side and the top/bottom areas for background visuals only.</p>
          </div>
          <div>
            <h3 className="text-[0.95rem] font-extrabold text-[#e6edf5] mb-1">Do YouTube Shorts use different image sizes?</h3>
            <p className="text-[0.85rem] text-[#8d9aaa] leading-relaxed m-0">Shorts are 1080 x 1920 pixels at 9:16 aspect ratio. Unlike standard videos, you cannot upload a custom thumbnail for Shorts — YouTube auto-selects the cover frame from your video.</p>
          </div>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Key Takeaways</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          YouTube image dimensions revolve around three core sizes: 2560 x 1440 for channel art (with a 1546 x 423 safe zone), 1280 x 720 for thumbnails, and 800 x 800 for profile pictures. Thumbnails have the highest impact on channel growth — invest in custom designs with bold text, human faces, and high contrast. For a complete reference across all platforms, see the <Link href="/guides/social-media-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">social media image sizes cheat sheet</Link>.
        </p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed m-0">
            <strong className="text-[#e6edf5]">Need to resize images for YouTube?</strong>{" "}
            Use <Link href="/resize/youtube" className="text-[var(--accent)] no-underline hover:underline">SquarePic&apos;s YouTube image resizer</Link> — select your target format and download perfectly sized images in seconds. No signup required.
          </p>
        </div>

        <RelatedGuides current="youtube-banner-thumbnail-sizes-2026" />

        <div className="text-center py-6 border-t border-[rgba(255,255,255,0.06)]">
          <Link
            href="/resize/youtube"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px_var(--accent-glow)]"
          >
            Resize Images for YouTube Free
          </Link>
        </div>
      </article>
    </>
  );
}
