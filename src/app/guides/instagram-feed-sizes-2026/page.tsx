import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema, FAQPageSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";

export const metadata: Metadata = {
  title: "Instagram Image Sizes 2026: Feed, Carousel & Profile",
  description: "Complete guide to Instagram image dimensions for 2026. Feed posts, carousel, profile pictures, and ads sizes with best practices for maximum engagement.",
  openGraph: { title: "Instagram Image Sizes 2026: Feed, Carousel & Profile | SquarePic", description: "Complete guide to Instagram image dimensions for 2026. Feed posts, carousel, profile pictures, and ads sizes with best practices.", type: "article", publishedTime: "2026-07-19", images: [{ url: "/squareframe_preview.png", width: 1200, height: 630 }] },
  alternates: { canonical: "https://www.squarepic.io/guides/instagram-feed-sizes-2026" },
  twitter: { card: "summary_large_image", title: "Instagram Image Sizes 2026: Feed, Carousel & Profile | SquarePic", description: "Complete guide to Instagram image dimensions for 2026 with best practices." },
};

const SITE = "https://www.squarepic.io";

const FAQ_QUESTIONS = [
  { question: "What is the best size for Instagram feed posts?", answer: "1080 x 1350 pixels (4:5 portrait) is the best size for Instagram feed posts. It takes up 40% more vertical space than square, keeping users on your content longer and signaling higher quality to the algorithm." },
  { question: "What size should Instagram profile pictures be?", answer: "Upload a 320 x 320 pixel square image at minimum. Instagram displays it as a circle, so keep your subject centered within the frame. Larger files look sharper after compression." },
  { question: "Can I mix square and portrait images in a carousel?", answer: "No. All images in a carousel must use the same aspect ratio. Instagram crops everything to match the first image&apos;s ratio. Use 1080 x 1350 (4:5) for consistent visibility." },
  { question: "What is the maximum file size for Instagram photos?", answer: "20 MB for photos and 650 MB for videos. Compress larger files before uploading to avoid failed uploads and aggressive platform compression." },
  { question: "Does Instagram compress uploaded images?", answer: "Yes. Instagram applies its own compression to all uploaded images. Starting with a properly sized image at 90% JPEG quality minimizes visible artifacts." },
  { question: "What file format should I use for Instagram?", answer: "JPEG for photos, PNG for graphics with text or logos. Instagram strips embedded color profiles, so design in sRGB to avoid color shifts." },
];

export default function InstagramFeedSizesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: "Instagram Feed Sizes 2026", url: `${SITE}/guides/instagram-feed-sizes-2026` },
      ]} />
      <ArticleSchema
        type="BlogPosting"
        title="Instagram Image Sizes 2026: Feed, Carousel & Profile"
        description="Complete guide to Instagram image dimensions for 2026. Feed posts, carousel, profile pictures, and ads sizes with best practices for maximum engagement."
        url={`${SITE}/guides/instagram-feed-sizes-2026`}
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
            Instagram
          </span>
          <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">Instagram Image Sizes 2026: Feed, Carousel & Profile</h1>
          <p className="text-[0.78rem] text-[#576675]">Published July 19, 2026 · Updated July 19, 2026 · 10 min read · by <a href="https://github.com/Sevenonelabs" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">SevenOneLabs</a></p>
          <ShareButtons path="/guides/instagram-feed-sizes-2026" title="Instagram Image Sizes 2026: Feed, Carousel & Profile" />
        </div>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          Instagram is the most image-focused social platform, and using the correct dimensions directly affects how your content performs. Posts that match Instagram&apos;s preferred aspect ratios get more engagement because they display fully in the feed without awkward cropping. This guide covers every Instagram image format with exact pixel dimensions, aspect ratios, and best practices updated for 2026.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Instagram Image Sizes at a Glance</h2>
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
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Square Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1080</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Profile grid consistency, quotes</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Portrait Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1350</td>
                <td className="text-[#8d9aaa] py-2 px-3">4:5</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Maximum feed visibility</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Landscape Post</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 566</td>
                <td className="text-[#8d9aaa] py-2 px-3">1.91:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Wide scenes, group photos</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Carousel</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1350</td>
                <td className="text-[#8d9aaa] py-2 px-3">4:5</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Multi-image content</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Profile Picture</td>
                <td className="text-[#8d9aaa] py-2 px-3">320 x 320</td>
                <td className="text-[#8d9aaa] py-2 px-3">1:1</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Avatar across the platform</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Story / Reel</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 px-3">9:16</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Full-screen vertical content</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Instagram Feed Post Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Your feed is the first thing visitors see on your profile. Instagram supports three aspect ratios for feed posts, and each has different performance characteristics:
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Square (1:1) — 1080 x 1080</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          The classic Instagram format. Square images display consistently across the profile grid, feed, and search results. They take up less vertical space than portrait posts, making them ideal for high-volume posting where you want the grid to look uniform. Use square for quote graphics, product shots with clean backgrounds, and any image where the subject is naturally centered.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Portrait (4:5) — 1080 x 1350</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Portrait is the highest-engagement format for Instagram feed. At 4:5, these images take up 40% more vertical screen space than square posts, making them harder to scroll past. According to Instagram&apos;s algorithm, longer view time signals higher content quality. Use portrait for fashion, food, travel, and lifestyle content where vertical composition adds drama. Most professional Instagrammers use portrait as their primary format.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Landscape (1.91:1) — 1080 x 566</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Landscape images work well for wide scenes, architecture, and group shots but take up the least vertical space in the feed. They are also the format used for link previews when sharing Instagram posts externally. Note that landscape images appear smallest in the feed and may get lower engagement as a result. Reserve landscape for content where the horizontal composition is essential.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Carousel Posts</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Carousels let you share up to 10 images or videos in a single swipeable post. All cards in a carousel must use the same aspect ratio — mixing square and portrait will force Instagram to crop everything to the first image&apos;s ratio. The first image is the most important because it appears in the feed and determines whether users swipe. Carousels consistently outperform single-image posts because each swipe counts as a separate interaction signal for the algorithm.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Use <strong className="text-[#e6edf5]">1080 x 1350 (4:5)</strong> for maximum feed presence.</li>
          <li>Keep the first image visually striking — it is your thumbnail.</li>
          <li>Use a consistent color palette across all slides for a professional look.</li>
          <li>Text-heavy slides work well in positions 2-4; put the hook in slide 1.</li>
          <li>Videos in carousels autoplay on mute — add captions if they contain audio-dependent content.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Profile Picture</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Your profile picture displays at 320 x 320 pixels but appears as a circle in the app. Instagram stores it at 110 x 110 on the profile page and 40 x 40 in comments and notifications. Upload a high-resolution square image and keep your subject centered within the frame — Instagram crops the edges into a circle, so anything near the corners will be invisible.
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li>Upload at <strong className="text-[#e6edf5]">320 x 320 pixels minimum</strong> — larger files look sharper after compression.</li>
          <li>Keep the subject within the central 60% of the frame to account for the circular crop.</li>
          <li>Avoid text in profile pictures — it becomes unreadable at thumbnail size.</li>
          <li>Use a solid background color rather than a busy scene for better recognizability at small sizes.</li>
          <li>PNG format preserves sharp edges for logos; JPEG is fine for photos.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Instagram Ad Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Instagram ads follow the same dimension rules as organic posts but require higher resolution for approved delivery. Instagram&apos;s ad review system flags low-resolution images, so always start with the maximum supported size:
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
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Feed Image</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">1:1</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Feed Video</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">1:1</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Story Image</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1920</td>
                <td className="text-[#8d9aaa] py-2 pl-3">9:16</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[var(--accent)] font-semibold py-2 pr-3">Explore Image</td>
                <td className="text-[#8d9aaa] py-2 px-3">1080 x 1350</td>
                <td className="text-[#8d9aaa] py-2 pl-3">4:5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Image Quality Best Practices</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Instagram compresses every upload, but you can minimize quality loss by following these guidelines:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Stay under 20 MB.</strong> Instagram&apos;s upload limit is 20 MB for photos and 650 MB for videos. Compress larger files before uploading — Instagram&apos;s own compression is more aggressive on oversized files than on properly sized ones.</li>
          <li><strong className="text-[#e6edf5]">Export at 90% JPEG quality.</strong> 100% quality produces files that Instagram recompresses anyway. 90% gives you a smaller starting file with negligible visual difference after Instagram&apos;s compression pipeline.</li>
          <li><strong className="text-[#e6edf5]">Use sRGB color profile.</strong> Instagram strips embedded color profiles and displays in sRGB. Design in sRGB from the start to avoid color shifts between your editing software and the final post.</li>
          <li><strong className="text-[#e6edf5]">Avoid oversharpening.</strong> Instagram applies its own sharpening filter. Uploading an already oversharpened image results in unnatural halos, especially around text and edges.</li>
          <li><strong className="text-[#e6edf5]">Pixel dimensions matter more than DPI.</strong> Instagram ignores DPI/PPI settings. Only pixel dimensions determine display quality. A 1080px-wide image at 72 DPI looks identical to one at 300 DPI on Instagram.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Common Instagram Image Mistakes</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Off-center subjects in profile pictures.</strong> The circular crop hides anything near the corners. Faces and logos at the edge get partially or fully cropped out.</li>
          <li><strong className="text-[#e6edf5]">Mixing aspect ratios in carousels.</strong> Instagram forces all carousel slides to match the first image&apos;s ratio. Inconsistent dimensions lead to unexpected cropping on later slides.</li>
          <li><strong className="text-[#e6edf5]">Oversized files causing quality loss.</strong> Uploading a 50 MB photo triggers more aggressive Instagram compression than a properly sized 5 MB photo at the same resolution. Compress first.</li>
          <li><strong className="text-[#e6edf5]">Using landscape for portrait content.</strong> Instagram shows landscape images small in the feed because they occupy less vertical space. Portrait content in landscape format looks disconnected from the message.</li>
          <li><strong className="text-[#e6edf5]">Ignoring color profile shifts.</strong> Photos designed in Adobe RGB or Display P3 look washed out after Instagram strips the color profile. Design in sRGB for accurate color reproduction.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How the Instagram Algorithm Treats Image Size</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Instagram&apos;s ranking algorithm considers several signal-based factors that your image choice directly influences:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Dwell time.</strong> Portrait (4:5) images take up more screen space, which naturally increases how long users spend looking at your post before scrolling. The algorithm treats longer dwell time as a positive engagement signal.</li>
          <li><strong className="text-[#e6edf5]">Save rate.</strong> Carousel posts get 3x more saves on average than single images because users save them as reference content. Higher save rates improve your post&apos;s reach in the Explore tab.</li>
          <li><strong className="text-[#e6edf5]">Shareability.</strong> Square images are the most shared format on Instagram because they display consistently in DMs and external previews without cropping. Higher share counts signal content value to the algorithm.</li>
          <li><strong className="text-[#e6edf5]">Completion rate (video).</strong> For video content, 9:16 vertical format has the highest completion rate because it fills the mobile screen entirely, reducing the chance users scroll past.</li>
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
                <td className="text-[#8d9aaa] py-2 pr-3">Feed square</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1080 x 1080</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Feed portrait</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1080 x 1350</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG / PNG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Feed landscape</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1080 x 566</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Carousel</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1080 x 1350</td>
                <td className="text-[#8d9aaa] py-2 pl-3">JPEG (consistent ratio)</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Profile picture</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">320 x 320</td>
                <td className="text-[#8d9aaa] py-2 pl-3">PNG (logos) / JPEG</td>
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

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How SquarePic Helps with Instagram Images</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          SquarePic lets you resize, crop, and convert images to any Instagram format directly in your browser. No uploads, no signup, no watermarks. Use the <Link href="/resize/instagram" className="text-[var(--accent)] no-underline hover:underline">Instagram image resizer</Link> to select your target format — feed post, profile picture, or story — and download a perfectly sized image in seconds. All processing happens client-side; your images never leave your device.
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
          Instagram supports three feed formats: square (1080 x 1080), portrait (1080 x 1350), and landscape (1080 x 566). Portrait 4:5 drives the highest engagement. Use consistent aspect ratios in carousels, center subjects for profile pictures, and export at 90% JPEG quality to minimize compression artifacts. For the full Instagram ecosystem including Reels and Stories, see the <Link href="/guides/instagram-reels-stories-guide" className="text-[var(--accent)] no-underline hover:underline">Reels and Stories guide</Link>.
        </p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed m-0">
            <strong className="text-[#e6edf5]">Need to resize images for Instagram?</strong>{" "}
            Use <Link href="/resize/instagram" className="text-[var(--accent)] no-underline hover:underline">SquarePic&apos;s Instagram image resizer</Link> — select your target format and download perfectly sized images in seconds. No signup required.
          </p>
        </div>

        <RelatedGuides current="instagram-feed-sizes-2026" />

        <div className="text-center py-6 border-t border-[rgba(255,255,255,0.06)]">
          <Link
            href="/resize/instagram"
            className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-8 py-3.5 rounded-md text-base font-extrabold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 shadow-[0_4px_20px var(--accent-glow)]"
          >
            Resize Images for Instagram Free
          </Link>
        </div>
      </article>
    </>
  );
}
