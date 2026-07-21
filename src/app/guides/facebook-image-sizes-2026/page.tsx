import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema, FAQPageSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";

export const metadata: Metadata = {
  title: "Facebook Image Sizes 2026: Cover Photo, Profile & Post Dimensions",
  description: "Complete guide to Facebook image dimensions for 2026. Cover photos, profile pictures, feed posts, event images, and ad sizes with best practices.",
  openGraph: { title: "Facebook Image Sizes 2026: Cover Photo, Profile & Post Dimensions | SquarePic", description: "Complete guide to Facebook image dimensions for 2026. Cover photos, profile pictures, feed posts, event images, and ad sizes with best practices.", type: "article", publishedTime: "2026-07-19", images: [{ url: "/squareframe_preview.png", width: 1200, height: 630 }] },
  alternates: { canonical: "https://www.squarepic.io/guides/facebook-image-sizes-2026" },
  twitter: { card: "summary_large_image", title: "Facebook Image Sizes 2026: Cover Photo, Profile & Post Dimensions | SquarePic", description: "Complete guide to Facebook image dimensions for 2026 with best practices." },
};

const SITE = "https://www.squarepic.io";

const FAQ_QUESTIONS = [
  { question: "What size should a Facebook cover photo be?", answer: "Facebook cover photos display at 851 x 315 pixels on desktop and 640 x 360 on mobile. Upload a file at least 851 x 315 for sharp rendering. The 2.7:1 aspect ratio means your cover spans nearly three times as wide as it is tall, so compose with horizontal space in mind." },
  { question: "What is the best image size for Facebook feed posts?", answer: "1200 x 630 pixels (1.91:1) is the optimal size for shared link posts and general feed content. For image-only posts, Facebook supports square (1080 x 1080), portrait (1080 x 1350), and landscape (1080 x 566). Landscape 1.91:1 takes up the most horizontal space and performs best for link previews." },
  { question: "What size should a Facebook profile picture be?", answer: "Upload a 320 x 320 pixel square image at minimum. Facebook displays it as a circle on profiles and as a small thumbnail in comments and news feed. Keep your subject centered within the frame and avoid text — it becomes unreadable at thumbnail size." },
  { question: "What are the dimensions for Facebook event images?", answer: "Facebook event cover images should be 1920 x 1080 pixels (16:9). This is the recommended size for both desktop and mobile displays. The image appears as the header for your event page and in event invitations, so make sure it is eye-catching at full width." },
  { question: "What size should Facebook ad images be?", answer: "Facebook feed ads work best at 1080 x 1080 pixels (1:1) for single images and 1200 x 628 pixels (1.91:1) for link ads. Story ads use 1080 x 1920 (9:16). Facebook recommends keeping ad copy to less than 20% of the image area for optimal delivery." },
  { question: "Does Facebook compress uploaded images?", answer: "Yes. Facebook compresses all uploaded images to JPEG format and resizes them to fit platform standards. Starting with a properly sized image at 80-90% JPEG quality minimizes visible artifacts. Facebook recommends using sRGB color space and keeping file sizes under 8 MB for optimal results." },
];

export default function FacebookImageSizesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: "Facebook Image Sizes 2026", url: `${SITE}/guides/facebook-image-sizes-2026` },
      ]} />
      <ArticleSchema
        type="BlogPosting"
        title="Facebook Image Sizes 2026: Cover Photo, Profile & Post Dimensions"
        description="Complete guide to Facebook image dimensions for 2026. Cover photos, profile pictures, feed posts, event images, and ad sizes with best practices."
        url={`${SITE}/guides/facebook-image-sizes-2026`}
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
            Facebook
          </span>
          <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">Facebook Image Sizes 2026: Cover Photo, Profile & Post Dimensions</h1>
          <p className="text-[0.78rem] text-[#576675]">Published July 19, 2026 · Updated July 19, 2026 · 10 min read · by <a href="https://github.com/Sevenonelabs" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">SevenOneLabs</a></p>
          <ShareButtons path="/guides/facebook-image-sizes-2026" title="Facebook Image Sizes 2026: Cover Photo, Profile & Post Dimensions" />
        </div>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          Facebook serves billions of images every day across feed posts, profiles, events, groups, and ads. Using the correct image dimensions ensures your content displays as intended — no awkward cropping, low-resolution blow-ups, or cut-off text. This guide covers every Facebook image format with exact pixel dimensions, aspect ratios, and best practices updated for 2026.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Facebook Image Sizes at a Glance</h2>
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
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Cover Photo</td>
                <td className="text-[#8d9aaa] py-2 px-3">851 x 315</td>
                <td className="text-[#8d9aaa] py-2 px-3">2.7:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Profile page header</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Profile Picture</td>
                <td className="text-[#8d9aaa] py-2 px-3">320 x 320</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Avatar across the platform</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Shared Link Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">1200 x 630</td>
                <td className="text-[#8d9aaa] py-2 px-3">1.91:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Link previews, articles</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Square Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1080</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Image-only posts, quotes</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Portrait Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1350</td>
                <td className="text-[#8d9aaa] py-2 px-3">4:5</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Mobile-optimized content</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Landscape Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 566</td>
                <td className="text-[#8d9aaa] py-2 px-3">1.91:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Wide scenes, group photos</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Event Cover</td>
                <td className="text-[#8d9aaa] py-2 px-3">1920 x 1080</td>
                <td className="text-[#8d9aaa] py-2 px-3">16:9</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Event page header</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Story</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 px-3">9:16</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Full-screen mobile content</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Facebook Cover Photo Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Your cover photo is the most prominent visual on your Facebook profile. It spans 851 x 315 pixels on desktop and 640 x 360 pixels on mobile. Facebook uses responsive cropping, so the visible area shifts depending on the viewer&apos;s device. Design your cover with the central area as the focal point — the left edge is partially hidden by your profile picture on desktop, and the right edge may crop on smaller screens.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload at least <strong className="text-[#e6edf5]">851 x 315 pixels</strong> — larger files at the same aspect ratio look sharper after compression.</li>
          <li>Keep important text and logos within the <strong className="text-[#e6edf5]">center-safe zone (roughly 60% of the width)</strong> to avoid desktop profile picture overlay and mobile cropping.</li>
          <li>Avoid wide text or critical details near the extreme left and right edges — they may be cropped on mobile or obscured by the profile picture on desktop.</li>
          <li>Use a high-quality JPEG at 80-90% quality for photos; PNG works for graphics with text overlays.</li>
          <li>Update your cover photo regularly — Facebook&apos;s algorithm favors profiles with recent activity, and fresh covers signal an active presence.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Profile Picture</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Your Facebook profile picture appears as a circle at 170 x 170 pixels on desktop profiles and as small as 32 x 32 in comments and notifications. Facebook recommends uploading a 320 x 320 pixel square image. The circular crop means anything near the corners will be invisible — keep your subject centered within the inner 60% of the frame for maximum visibility at all display sizes.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload at <strong className="text-[#e6edf5]">320 x 320 pixels minimum</strong> — higher resolution survives Facebook&apos;s compression pipeline better.</li>
          <li>Keep the main subject in the <strong className="text-[#e6edf5]">central circle area</strong> — faces, logos, and key details near the edges will be cropped.</li>
          <li>Avoid text in profile pictures — it becomes illegible at thumbnail sizes in comments and notifications.</li>
          <li>Use a simple, high-contrast background for better recognizability. Busy scenes get lost when scaled down.</li>
          <li>PNG format preserves sharp edges for logos and text-based branding; high-quality JPEG is fine for photos.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Feed Post Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Facebook supports multiple aspect ratios for feed posts, and your choice affects how much space your content occupies in the news feed. Posts with larger visual presence tend to hold attention longer, which signals relevance to Facebook&apos;s ranking algorithm:
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Shared Link (1.91:1) — 1200 x 630</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Link posts use a 1.91:1 aspect ratio with a recommended resolution of 1200 x 630 pixels. This is the most common Facebook post format — every time you share a URL, Facebook pulls the Open Graph image and displays it in this size. The wide format works well for text-heavy previews because the image and link description share horizontal space. Always ensure your website has proper OG tags so Facebook displays the right image and description.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Square (1:1) — 1080 x 1080</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Square images are the most versatile format for Facebook. They display consistently across desktop and mobile without cropping, and they integrate seamlessly when cross-posting from Instagram. Square works well for product shots, inspirational quotes, and any image where the composition is naturally centered. Note that cross-posted Instagram square images display correctly on Facebook without manual adjustment.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Portrait (4:5) — 1080 x 1350</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Portrait images at 4:5 take up more vertical space in the mobile feed, making them harder to scroll past. This format has gained popularity as Facebook&apos;s mobile audience has grown. Use portrait for fashion, food, before-and-after shots, and any content where vertical composition adds visual impact. Facebook crops portrait images to a maximum display height on desktop, so the top portion of your image is most visible.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Landscape (1.91:1) — 1080 x 566</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Landscape images fill the full width of the Facebook feed on both desktop and mobile. Use this format for wide-angle photography, group shots, and scenes where the horizontal composition is essential. The trade-off is that landscape images occupy less vertical space than square or portrait, potentially reducing dwell time on your post.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Facebook Event Cover Images</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Facebook event covers display at 1920 x 1080 pixels (16:9) across desktop and mobile. This is the recommended size for both the event page header and event invitations shared in the feed. The wide cinematic ratio gives you plenty of horizontal space for event branding, dates, and visual storytelling. Keep key information like the event title and date centered — the top and bottom edges may be cropped differently depending on the viewer&apos;s device.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload at <strong className="text-[#e6edf5]">1920 x 1080 pixels</strong> for the sharpest display across all devices.</li>
          <li>Place important details like dates and titles in the <strong className="text-[#e6edf5]">center-safe area</strong> — avoid the extreme top and bottom 15%.</li>
          <li>Use high-contrast text overlays for readability — event images compete with busy interface elements.</li>
          <li>JPEG format at 80-90% quality offers the best balance of file size and visual quality for event photos.</li>
          <li>Test how your image looks on mobile before publishing — the crop differs from desktop significantly.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Facebook Ad Specs</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Facebook ads follow the same general dimension rules as organic content but have stricter resolution requirements and additional best practices. Using the recommended sizes ensures your ads pass Facebook&apos;s review system and display without unexpected cropping:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Ad Format</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Recommended Size</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Ratio</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Feed Single Image</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">1:1</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Feed Link Ad</td>
                <td className="text-[#8d9aaa] py-2 px-3">1200 x 628</td>
                <td className="text-[#8d9aaa] py-2 pl-3">1.91:1</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Carousel</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">1:1</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Story Ad</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 pl-3">9:16</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Right Column</td>
                <td className="text-[#8d9aaa] py-2 px-3">1200 x 628</td>
                <td className="text-[#8d9aaa] py-2 pl-3">1.91:1</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Marketplace</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">1:1</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Image Quality Best Practices</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Facebook automatically compresses and converts every uploaded image, but you can maintain quality by following these guidelines:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Keep file sizes under 8 MB.</strong> Facebook&apos;s compression is less aggressive on files that are already reasonably sized. Oversized files trigger more aggressive recompression that introduces visible artifacts.</li>
          <li><strong className="text-[#e6edf5]">Export at 80-90% JPEG quality.</strong> 100% quality images are unnecessarily large — Facebook recompresses them anyway. 85% quality gives excellent results after passing through Facebook&apos;s compression pipeline.</li>
          <li><strong className="text-[#e6edf5]">Use sRGB color profile.</strong> Facebook strips embedded color profiles and displays in sRGB. Images designed in Adobe RGB or Display P3 will appear washed out after upload. Always proof in sRGB.</li>
          <li><strong className="text-[#e6edf5]">Avoid heavy JPEG artifacts.</strong> Starting with a clean image yields better results. Facebook&apos;s compression adds a second round of artifacts on top of existing ones, compounding quality loss.</li>
          <li><strong className="text-[#e6edf5]">Text in images should be large enough.</strong> Facebook scales images down in the feed. Small text that is readable in the original file becomes illegible after scaling and compression.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Common Facebook Image Mistakes</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Text or logos near cover photo edges.</strong> Facebook&apos;s profile picture overlay covers the bottom-left portion of your cover photo on desktop, and mobile crops vary. Anything important outside the center-safe zone risks being hidden.</li>
          <li><strong className="text-[#e6edf5]">Using the wrong aspect ratio for link posts.</strong> Link previews always use 1.91:1 (1200 x 630). Other ratios are cropped, and vertical images lose significant context when forced into the wide format.</li>
          <li><strong className="text-[#e6edf5]">Overly compressed images.</strong> Saving at 60% or lower JPEG quality adds artifacts that Facebook&apos;s own compression amplifies. The result looks noticeably worse than a properly compressed starting image at 85%.</li>
          <li><strong className="text-[#e6edf5]">Ignoring mobile-first design.</strong> Over 98% of Facebook users access the platform via mobile. An image that looks perfect on a 27-inch monitor may appear cramped or cropped on a phone screen.</li>
          <li><strong className="text-[#e6edf5]">Small text in images.</strong> Text that is readable in the full-size image becomes microscopic after Facebook&apos;s feed scaling. Aim for text that is legible when the image is viewed at 25% of its original dimensions.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How Facebook Displays Images Across Devices</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Facebook is accessed across an extremely wide range of devices, from 4-inch phones to 32-inch monitors. Understanding how your images render on different screens helps you design for the best possible presentation:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Desktop feed.</strong> The Facebook feed is roughly 680px wide on desktop. Landscape images fill this width. Portrait images are capped at a maximum height, so the top portion is most visible before users click to expand.</li>
          <li><strong className="text-[#e6edf5]">Mobile feed.</strong> Mobile screens show a single column feed where portrait images take up the most vertical space and landscape images appear short. Over 98% of Facebook users are mobile, so design for the mobile crop first.</li>
          <li><strong className="text-[#e6edf5]">Messenger previews.</strong> Images shared in Messenger appear as small thumbnails. Open them full-screen for the full view. Profile pictures in Messenger display as tiny 32 x 32 circles — another reason to keep compositions simple and central.</li>
          <li><strong className="text-[#e6edf5]">Group covers.</strong> Facebook group cover images display at roughly 1640 x 624 pixels on desktop and crop differently on mobile. Similar safe-zone rules apply — keep critical content in the center.</li>
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
                <td className="text-[#8d9aaa] py-2 pr-3">Cover photo</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">851 x 315</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Profile picture</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">320 x 320</td>
                <td className="text-[#8d9aaa] py-2 pl-3">PNG (logos) / JPEG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Shared link post</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1200 x 630</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Square post</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1080 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Portrait post</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1080 x 1350</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Landscape post</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1080 x 566</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Event cover</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1920 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Feed ad</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1080 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Story ad</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How SquarePic Helps with Facebook Images</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          SquarePic lets you resize, crop, and convert images to any Facebook format directly in your browser. No uploads, no signup, no watermarks. Use the <Link href="/resize/facebook" className="text-[var(--accent)] no-underline hover:underline">Facebook image resizer</Link> to select your target format — cover photo, profile picture, or feed post — and download a perfectly sized image in seconds. All processing happens client-side; your images never leave your device.
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
          Facebook uses distinct image sizes for different placements: cover photos at 851 x 315, profile pictures at 320 x 320, shared link posts at 1200 x 630, and standard feed images at 1080 x 1080. Design with mobile-first safe zones in mind, export at 80-90% JPEG quality in sRGB, and keep text large enough to survive Facebook&apos;s scaling and compression. For a complete reference across all social media platforms, see the <Link href="/guides/social-media-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">social media image sizes cheat sheet</Link>.
        </p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed m-0">
            <strong className="text-[#e6edf5]">Need to resize images for Facebook?</strong>{" "}
            Use <Link href="/resize/facebook" className="text-[var(--accent)] no-underline hover:underline">SquarePic&apos;s Facebook image resizer</Link> — select your target format and download perfectly sized images in seconds. No signup required.
          </p>
        </div>

        <RelatedGuides current="facebook-image-sizes-2026" />

        <div className="text-center py-6 border-t border-[rgba(255,255,255,0.06)]">
          <Link
            href="/resize/facebook"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px var(--accent-glow)]"
          >
            Resize Images for Facebook Free
          </Link>
        </div>
      </article>
    </>
  );
}
