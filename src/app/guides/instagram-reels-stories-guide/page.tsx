import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, ArticleSchema, FAQPageSchema } from "@/components/schema-scripts";
import { ShareButtons } from "@/components/guides/share-buttons";
import { RelatedGuides } from "@/components/guides/related-guides";

export const metadata: Metadata = {
  title: "Instagram Reels & Stories Guide 2026: Dimensions, Format & Tips",
  description: "Complete guide to Instagram Reels and Stories dimensions for 2026. Sizes, text safe zones, format recommendations, and proven engagement strategies.",
  openGraph: { title: "Instagram Reels & Stories Guide 2026: Dimensions, Format & Tips | SquarePic", description: "Complete guide to Instagram Reels and Stories dimensions for 2026 with safe zones, format tips, and engagement strategies.", type: "article", publishedTime: "2026-07-19", images: [{ url: "/squareframe_preview.png", width: 1200, height: 630 }] },
  alternates: { canonical: "https://www.squarepic.io/guides/instagram-reels-stories-guide" },
  twitter: { card: "summary_large_image", title: "Instagram Reels & Stories Guide 2026: Dimensions, Format & Tips | SquarePic", description: "Complete guide to Instagram Reels and Stories dimensions for 2026." },
};

const SITE = "https://www.squarepic.io";

const FAQ_QUESTIONS = [
  { question: "What is the best size for Instagram Reels?", answer: "1080 x 1920 pixels at 9:16 aspect ratio. This full-screen vertical format fills the mobile display and matches the native Reels player dimensions." },
  { question: "What size should Instagram Stories be?", answer: "1080 x 1920 pixels at 9:16 aspect ratio. Stories share the same dimensions as Reels but have different text safe zones and UI overlays." },
  { question: "How long can Instagram Reels be?", answer: "Up to 90 seconds. However, the highest-performing Reels are 7 to 15 seconds. Completion rate drops sharply after 15 seconds." },
  { question: "Where should I place text in Reels and Stories?", answer: "Keep text in the center 60% of the frame. The top 12-14% is covered by UI elements like the handle and music note. The bottom 20% is covered by the caption bar and action buttons." },
  { question: "Can I use the same image for Stories and Reels?", answer: "Yes. Both use 1080 x 1920 (9:16), so the same image works for both formats. However, Stories have more UI overlays, so the safe zone is narrower." },
  { question: "What file format should I use for Reels?", answer: "MP4 with H.264 compression. Maximum file size is 650 MB. Export at 30 fps for standard content or 60 fps for motion-heavy footage." },
];

export default function InstagramReelsStoriesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
        { name: "Instagram Reels & Stories Guide", url: `${SITE}/guides/instagram-reels-stories-guide` },
      ]} />
      <ArticleSchema
        type="BlogPosting"
        title="Instagram Reels & Stories Guide 2026: Dimensions, Format & Tips"
        description="Complete guide to Instagram Reels and Stories dimensions for 2026. Sizes, text safe zones, format recommendations, and proven engagement strategies."
        url={`${SITE}/guides/instagram-reels-stories-guide`}
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
          <h1 className="text-[1.8rem] font-extrabold tracking-tight mt-3 mb-2">Instagram Reels & Stories Guide 2026: Dimensions, Format & Tips</h1>
          <p className="text-[0.78rem] text-[#576675]">Published July 19, 2026 · Updated July 19, 2026 · 9 min read · by <a href="https://github.com/Sevenonelabs" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">SevenOneLabs</a></p>
          <ShareButtons path="/guides/instagram-reels-stories-guide" title="Instagram Reels & Stories Guide 2026: Dimensions, Format & Tips" />
        </div>

        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-6">
          Reels and Stories are Instagram&apos;s most engaging content formats, accounting for over 60% of all interactions on the platform. Unlike feed posts, these full-screen vertical formats have specific requirements for dimensions, safe zones, and text placement that directly determine whether users engage or scroll past. This guide covers everything you need to create perfectly formatted Reels and Stories in 2026.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Instagram Reels and Stories at a Glance</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Spec</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Reels</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Stories</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Resolution</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">1080 x 1920</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">1080 x 1920</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Aspect ratio</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">9:16</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">9:16</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Max duration</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">90 seconds</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">60 seconds</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Max file size</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">650 MB</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">30 MB (image)</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">File format</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">MP4 (H.264)</td>
                <td className="text-[var(--accent)] font-semibold py-2 pl-3">JPEG / PNG / MP4</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Lifespan</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Permanent</td>
                <td className="text-[#8d9aaa] py-2 pl-3">24 hours</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Instagram Reels Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Reels are full-screen vertical videos up to 90 seconds long. They appear in the Reels tab, Explore page, and increasingly in the main feed. Getting the dimensions right is critical because Instagram crops or pads incorrectly sized Reels with unappealing borders.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Reels Safe Zones</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Instagram overlays UI elements on top of your Reel — the caption at the bottom, the like/comment/share buttons on the right, and the user handle at the top. To prevent your content from being obscured, keep critical visual elements within these boundaries:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li><strong className="text-[#e6edf5]">Top safe zone:</strong> Leave the top 14% (roughly 270px) clear. Instagram places the account handle, music note, and follow button here.</li>
          <li><strong className="text-[#e6edf5]">Bottom safe zone:</strong> The bottom 20% (roughly 380px) is where the caption, sound credit, and engagement buttons appear. Text placed here will be partially or fully obscured.</li>
          <li><strong className="text-[#e6edf5]">Right edge:</strong> The rightmost 10% (roughly 108px) is reserved for like, comment, share, and profile icon buttons.</li>
          <li><strong className="text-[#e6edf5]">Center area:</strong> The safest area for your main subject is the central 60% of the frame (from 14% from top to 20% from bottom, and 10% from each side).</li>
        </ul>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Reels Cover Image</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          When your Reel appears in the profile grid, it shows a cover image at 9:16 aspect ratio cropped to 1:1 in the grid view. The cover frame is 1080 x 1920 but the visible thumbnail in the grid is 540 x 540. Choose a cover frame that works as a square thumbnail — centered subjects with high contrast perform best in the profile grid.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Instagram Stories Dimensions</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Stories appear at the top of the feed and disappear after 24 hours. Despite the ephemeral nature, Stories drive significant engagement — over 500 million accounts use Stories daily. Like Reels, Stories use vertical 9:16 format, but the safe zones are different because the UI overlay is more extensive.
        </p>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Stories Safe Zones</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Stories have the most UI overlays of any Instagram format. The safe zones are stricter than Reels:
        </p>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-1 mb-4">
          <li><strong className="text-[#e6edf5]">Top safe zone:</strong> Leave the top 12% (230px) clear. The account name, timestamp, and close button occupy this space.</li>
          <li><strong className="text-[#e6edf5]">Bottom safe zone:</strong> The bottom 20% (384px) is covered by the message reply bar, story progress bar, and link sticker area when present.</li>
          <li><strong className="text-[#e6edf5]">Left and right edges:</strong> Unlike Reels, Stories do not have persistent side buttons, but some stickers and interactive elements can appear in these areas.</li>
          <li><strong className="text-[#e6edf5]">Ideal content area:</strong> The safe rectangle is roughly 820 x 1300 pixels centered in the 1080 x 1920 frame (from 230px top to 384px bottom, leaving roughly 130px on each side).</li>
        </ul>

        <h3 className="text-[1rem] font-extrabold text-[#e6edf5] mt-6 mb-2">Story Highlight Covers</h3>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          Story Highlights are permanent collections of past Stories displayed on your profile. Each highlight has a circular cover image. The cover image is pulled from your Story but can be edited separately. Highlight covers display at 162 x 288 pixels in a circular crop with rounded corners. Upload a 1080 x 1920 image and use the center 162 x 288 area for the most important visual content — text and logos should be centered in this crop area.
        </p>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Reels vs Stories: Key Differences</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Factor</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Reels</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Stories</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Lifespan</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Permanent (until deleted)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">24 hours</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Discoverability</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Reels tab, Explore, Feed</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Top of feed, profile rings</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Max length</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">90 seconds</td>
                <td className="text-[#8d9aaa] py-2 pl-3">60 seconds per slide</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Audio</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Required (trending audio recommended)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Optional (music sticker)</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Editing</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Multi-clip, effects, speed, timer</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Stickers, text, drawing, basic filters</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Algorithm boost</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">High (prioritized by algorithm)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Medium (engagement-based)</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Text safe zone</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Top 14%, bottom 20%</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Top 12%, bottom 20%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Best Practices for Reels</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Hook in the first 2 seconds.</strong> Instagram&apos;s algorithm tracks replay rate. If viewers rewatch the first few seconds, the Reel gets pushed to more accounts. Start with a visual hook — a quick transition, a surprising crop, or text overlay that creates curiosity.</li>
          <li><strong className="text-[#e6edf5]">Use trending audio.</strong> Reels using trending audio tracks get significantly higher distribution. Check the Reels audio browse page for trending tracks in your niche before publishing.</li>
          <li><strong className="text-[#e6edf5]">Keep it between 7-15 seconds.</strong> Despite the 90-second limit, the highest-performing Reels are short. Completion rate drops sharply after 15 seconds, and the algorithm prioritizes content with high completion rates.</li>
          <li><strong className="text-[#e6edf5]">Add captions for mute viewing.</strong> Over 70% of Reels are watched on mute. Burn captions directly into the video within the safe zone (center 60% of frame) so they are always visible regardless of device settings.</li>
          <li><strong className="text-[#e6edf5]">Post consistently.</strong> Accounts that post 3-5 Reels per week see 3x more profile visits than those posting less than once a week. Consistency signals reliability to the algorithm.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Best Practices for Stories</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Use interactive stickers.</strong> Polls, questions, quizzes, and emoji sliders directly increase engagement metrics. Stories with interactive stickers get 2x more replies than those without.</li>
          <li><strong className="text-[#e6edf5]">Post 3-5 Stories per day.</strong> Accounts that post multiple Stories per day maintain higher profile visit rates. The first Story gets the most views, with a natural drop-off of 10-20% per subsequent slide.</li>
          <li><strong className="text-[#e6edf5]">Keep text minimal.</strong> Stories with two lines of text or less have higher completion rates. If you need more text, spread it across multiple Story slides.</li>
          <li><strong className="text-[#e6edf5]">Use location stickers.</strong> Stories with location tags get 79% higher engagement than those without. Location stickers also help your Story appear in location-specific Story collections.</li>
          <li><strong className="text-[#e6edf5]">Add links responsibly.</strong> If you have the swipe-up link feature, place the link at the natural pause point of your Story, not at the beginning.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Format Recommendations by Content Type</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[0.85rem] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Content Type</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Best Format</th>
                <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Tutorials and tips</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Reels (30-60s)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Permanent, searchable, high save rate</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Behind-the-scenes</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Stories</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Ephemeral feels authentic, low production bar</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Product launches</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Reels + Stories</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Reels for reach, Stories for urgency</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Announcements</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Stories</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Quick consumption, easy to share</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Educational content</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Reels (carousel style)</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Text overlays + visuals, high save rate</td>
              </tr>
              <tr className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="text-[#8d9aaa] py-2 pr-3">Daily updates</td>
                <td className="text-[var(--accent)] font-semibold py-2 px-3">Stories</td>
                <td className="text-[#8d9aaa] py-2 pl-3">Low pressure, frequent touchpoint</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">Common Reels and Stories Mistakes</h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-5 space-y-2 mb-4">
          <li><strong className="text-[#e6edf5]">Text in the safe zone margins.</strong> Placing captions or calls-to-action in the top 14% or bottom 20% makes them invisible behind Instagram&apos;s UI. Always design within the center 60% safe zone.</li>
          <li><strong className="text-[#e6edf5]">Horizontal or square video.</strong> Instagram pads non-9:16 Reels with background color, shrinking the effective viewing area and making content look amateurish.</li>
          <li><strong className="text-[#e6edf5]">No captions.</strong> Over 70% of Reels are watched on mute. Without burned-in captions, you lose the majority of viewers within the first second.</li>
          <li><strong className="text-[#e6edf5]">Overly long content.</strong> Reels over 15 seconds see completion rates drop by 50% or more. If your content needs more time, split it into a multi-part series.</li>
          <li><strong className="text-[#e6edf5]">Ignoring the first frame.</strong> The first frame of your Story or Reel determines whether users tap to view more. An uninteresting first frame means skipped content regardless of the quality that follows.</li>
        </ul>

        <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mt-8 mb-3">How SquarePic Helps with Stories and Reels</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-3">
          SquarePic lets you resize, crop, and convert images to Instagram&apos;s 9:16 format directly in your browser. Use the <Link href="/resize/instagram" className="text-[var(--accent)] no-underline hover:underline">Instagram image resizer</Link> to select your target format — Stories, Reels cover, or profile picture — and download perfectly sized images in seconds. No signup, no uploads, no watermarks. All processing happens client-side; your images never leave your device.
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
          Reels and Stories share the same 1080 x 1920 (9:16) vertical format but differ in safe zones, lifespan, and discoverability. Keep critical content in the center 60% of the frame to avoid UI overlay clipping. Hook viewers in the first 2 seconds for Reels and the first frame for Stories. For feed post dimensions, see the <Link href="/guides/instagram-feed-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">Instagram feed sizes guide</Link>.
        </p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-6">
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed m-0">
            <strong className="text-[#e6edf5]">Need to resize images for Stories or Reels?</strong>{" "}
            Use <Link href="/resize/instagram" className="text-[var(--accent)] no-underline hover:underline">SquarePic&apos;s Instagram resizer</Link> to crop, pad, or convert your images to the exact 9:16 format. Free, no signup, all in your browser.
          </p>
        </div>

        <RelatedGuides current="instagram-reels-stories-guide" />

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
