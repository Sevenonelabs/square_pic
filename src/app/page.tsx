"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ToolAsHeroLayout } from "@/components/layout/tool-as-hero-layout";
import { ToolLinks } from "@/components/layout/tool-links";
import { SquareOutputExample } from "@/components/guides/square-output-example";
import { JsonLd } from "@/components/schema-scripts";
import type { EditorState } from "@/lib/editor-renderer";

const DEFAULTS = {
  blur: 20, padding: 10, scale: 100, radius: 0, color: "#F0F5FA",
};

const COLOR_SWATCHES = [
  "#1E2328", "#787D82", "#F0F5FA", "#F0CDB4", "#B49B5A", "#F02328",
  "#F07D28", "#F0F528", "#1EF528", "#50C3FA", "#1E23FA", "#8C23FA",
  "#F055C8", "#782328", "#B4B928", "#1E2382",
];

export default function Home() {
  const [state, setState] = useState<EditorState>({
    image: null,
    mode: "blur",
    blurAmount: DEFAULTS.blur,
    paddingPercent: DEFAULTS.padding,
    imageScale: DEFAULTS.scale,
    cornerRadius: DEFAULTS.radius,
    backgroundColor: DEFAULTS.color,
    targetWidth: 0,
    targetHeight: 0,
  });

  const update = useCallback((partial: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "SquarePic",
        url: "https://www.squarepic.io",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "SquarePic",
        url: "https://www.squarepic.io",
        description: "Free online image editing toolkit. Square image maker, image resizer, compressor, converter, and cropper. Privacy-first, no uploads.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        dateModified: "2026-10-08",
      }} />
      <ToolAsHeroLayout
        state={state}
        onStateChange={update}
        headline="Make an Image Square Without Cropping"
        highlightWord="Without Cropping"
        microcopy="Fit your photo into a square with a blurred, solid or transparent background. Keep the whole image at 100% zoom, or choose a centered Crop to fill the frame. Choose 1080, 1200 or a custom square size. No account needed."
        colorSwatches={COLOR_SWATCHES}
      />

      <section aria-labelledby="fit-crop-comparison" className="w-full min-w-0 max-w-[900px] mx-auto px-4 mt-6">
        <h2 id="fit-crop-comparison" className="text-lg font-extrabold text-[#e6edf5]">Keep the whole photo or crop the edges</h2>
        <SquareOutputExample compact kind="portrait" />
      </section>

      <ToolLinks />

      <section className="w-full min-w-0 max-w-[900px] mx-auto px-4 pb-16">
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5] mb-3">
            Make Any Photo Square in Seconds
          </h2>
          <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed">
            A square image has equal width and height, such as 1080 × 1080 pixels, with a 1:1 aspect ratio.
            To turn a portrait or landscape photo into a square without cutting off the subject,
            select Blur, Solid or Transparent and keep Zoom at 100%. These modes fit the photo inside a square canvas.
            Crop fills the square by trimming the edges. Use the preview to choose which result suits your photo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { step: "1", title: "Upload Your Image", desc: "Select any image from your device. SquarePic supports JPEG, PNG, WebP, and more. Files up to 20 MB." },
            { step: "2", title: "Choose Your Style", desc: "Blur, Solid and Transparent fit the whole image at 100% zoom. Crop fills the square with a centered crop. Choose a square size and check the preview." },
            { step: "3", title: "Download & Share", desc: "Export your square image as PNG, JPEG, or WebP. Ready to upload to Instagram, LinkedIn, Facebook, or any platform." },
          ].map((c) => (
            <div key={c.step} className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 text-center">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-[var(--accent)]/10 text-[var(--accent)] text-[0.85rem] font-extrabold mb-3">{c.step}</span>
              <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">{c.title}</h3>
              <p className="text-[0.78rem] text-[#8d9aaa] leading-relaxed m-0">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Ways to make a square image</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Blur:</strong> Uses a blurred copy of your photo to fill the background around the fitted image.</li>
              <li><strong className="text-[#e6edf5]">Solid Fill:</strong> Adds a solid color background. Choose from preset colors or pick any custom color. Best for product photos and clean branding.</li>
              <li><strong className="text-[#e6edf5]">Transparent:</strong> Adds transparent padding for logos and artwork. The checkerboard shows empty space and is not part of the exported PNG.</li>
              <li><strong className="text-[#e6edf5]">Crop:</strong> Fills the square with a centered crop. Check the preview because subjects near an edge can be cut off.</li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Best Uses for Square Images</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li><strong className="text-[#e6edf5]">Instagram feed posts:</strong> Use the 1080 × 1080 square preset. Review Instagram&apos;s separate grid preview before publishing.</li>
              <li><strong className="text-[#e6edf5]">Profile pictures:</strong> Keep faces and logos near the center so they also fit a circular avatar preview.</li>
              <li><strong className="text-[#e6edf5]">LinkedIn & Facebook posts:</strong> Use a square canvas for consistent framing, and check the destination&apos;s preview before publishing.</li>
              <li><strong className="text-[#e6edf5]">Product photos:</strong> Use the same square canvas and padding across a catalog for consistent image framing.</li>
              <li><strong className="text-[#e6edf5]">Website thumbnails & favicons:</strong> Square thumbnails create tidy grid layouts, and favicons and app icons must be perfectly square.</li>
              <li><strong className="text-[#e6edf5]">Quote graphics & branded content:</strong> One square format keeps your entire feed or grid looking cohesive.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mb-10">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Square Photos and Other Image Shapes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.78rem] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left font-bold text-[#e6edf5] py-2 pr-3">Editor preset</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Width × height</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 px-3">Aspect ratio</th>
                  <th className="text-left font-bold text-[#e6edf5] py-2 pl-3">Shape</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plat: "Instagram square post", prof: "1080 × 1080", post: "1:1", fmt: "Square" },
                  { plat: "LinkedIn square post", prof: "1200 × 1200", post: "1:1", fmt: "Square" },
                  { plat: "Instagram portrait post", prof: "1080 × 1350", post: "4:5", fmt: "Portrait" },
                  { plat: "Stories / Reels", prof: "1080 × 1920", post: "9:16", fmt: "Vertical" },
                  { plat: "YouTube thumbnail", prof: "1280 × 720", post: "16:9", fmt: "Landscape" },
                ].map((r) => (
                  <tr key={r.plat} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="font-semibold text-[#e6edf5] py-2.5 pr-3">{r.plat}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.prof}</td>
                    <td className="text-[#8d9aaa] py-2.5 px-3">{r.post}</td>
                    <td className="text-[#8d9aaa] py-2.5 pl-3">{r.fmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Why Make Images Square?</h3>
            <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
              A 1:1 canvas is useful for avatars, square posts, and product grids.
              A portrait or landscape photo can fit inside it with added background, keeping its proportions.
              Other placements use different shapes, so choose a platform preset when you need a banner or vertical Story.
              <Link href="/image-size-calculator" className="text-[var(--accent)] hover:underline"> Calculate your image&apos;s aspect ratio</Link> before changing its dimensions.
            </p>
          </div>
          <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
            <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Square Image Best Practices</h3>
            <ul className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0 pl-4 space-y-1">
              <li>Center your main subject — square cropping removes edges, not the middle.</li>
              <li>Use high resolution source images (at least 1080x1080) for sharp results.</li>
              <li>Match the blur background color to your brand palette for consistent social media aesthetics.</li>
              <li>Add padding to prevent important content from touching the edges.</li>
              <li>Preview your square image at actual size before posting to check readability.</li>
              <li>Use the same square format across all profile pictures for brand consistency.</li>
              <li>Check how your square image reads at thumbnail size — most posts are first seen small in a feed.</li>
              <li>SquarePic also resizes, crops, compresses, and converts images — use the platform presets to prep any photo in seconds.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mt-6">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-2">Private & Secure — No Uploads</h3>
          <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">
            SquarePic processes every image locally in your browser using HTML5 Canvas. Your photos never leave your device.
            Image files stay on your device. Website analytics and the referral widget make network requests; see the <Link href="/privacy" className="text-[var(--accent)] hover:underline">privacy policy</Link> for details.
          </p>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6">
          <SquareOutputExample kind="product" />
          <h2 className="text-[1.2rem] font-extrabold text-[#e6edf5] mb-4">Questions about making a photo square</h2>
          <div className="space-y-4 text-[0.85rem] text-[#8d9aaa] leading-relaxed">
            <div><h3 className="font-bold text-[#e6edf5]">How do I make a picture square without cropping?</h3><p>Select Blur, Solid or Transparent, leave Zoom at 100%, and choose a square size. Padding fills the empty space around your photo. Increasing Zoom can move its edges outside the canvas.</p></div>
            <div><h3 className="font-bold text-[#e6edf5]">Will a square photo look stretched?</h3><p>SquarePic preserves the original proportions. Padding adds space; cropping removes edges. Neither method needs to stretch the photo to make its width and height equal.</p></div>
            <div><h3 className="font-bold text-[#e6edf5]">Should I export PNG or JPEG?</h3><p>Use JPEG for photos when file size matters. Use PNG for text, logos, and lossless output. A lossless export does not recover detail missing from the source image.</p></div>
            <div><h3 className="font-bold text-[#e6edf5]">How do I make a square logo with a transparent background?</h3><p>Choose Transparent. SquarePic fits your logo inside the square and selects PNG to preserve transparent padding and any transparency in the source. It does not remove a background already present in the source image.</p></div>
            <div><h3 className="font-bold text-[#e6edf5]">What size will my square image be?</h3><p>Choose 1080 × 1080, 1200 × 1200 or enter a custom square edge from 1 to 4096 pixels and select Apply. Original size uses the source&apos;s longest side, up to 4096 pixels. Larger canvases are reduced proportionally with a limit notice. The editor shows the actual export dimensions. Animated inputs become one still frame, and source metadata is not copied.</p></div>
          </div>
          <p className="text-[0.85rem] text-[#8d9aaa] mt-5">See the worked examples in our <Link href="/guides/make-image-square-without-cropping" className="text-[var(--accent)] hover:underline">guide to making an image square without cropping</Link>.</p>
        </div>

        <p className="text-[0.7rem] text-[#576675] text-center mt-8">Last updated: October 8, 2026</p>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mt-8">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Resize Images for Every Platform</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/resize/instagram", label: "Instagram" },
              { href: "/resize/facebook", label: "Facebook" },
              { href: "/resize/x-twitter", label: "X (Twitter)" },
              { href: "/resize/linkedin", label: "LinkedIn" },
              { href: "/resize/tiktok", label: "TikTok" },
              { href: "/resize/youtube", label: "YouTube" },
              { href: "/resize/pinterest", label: "Pinterest" },
              { href: "/resize/snapchat", label: "Snapchat" },
              { href: "/resize/whatsapp", label: "WhatsApp" },
              { href: "/resize/twitch", label: "Twitch" },
              { href: "/resize/reddit", label: "Reddit" },
              { href: "/resize/telegram", label: "Telegram" },
              { href: "/resize/discord", label: "Discord" },
            ].map((platform) => (
              <Link
                key={platform.href}
                href={platform.href}
                className="text-[0.68rem] font-semibold text-[#8d9aaa] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] px-3 py-1.5 rounded-sm no-underline hover:text-[var(--accent)] hover:border-[var(--accent)]/20 transition-all"
              >
                {platform.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 mt-4">
          <h3 className="text-[0.85rem] font-extrabold text-[#e6edf5] mb-4">Convert Between Image Formats</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/converter/png-to-jpg", label: "PNG to JPG" },
              { href: "/converter/jpg-to-png", label: "JPG to PNG" },
              { href: "/converter/png-to-webp", label: "PNG to WebP" },
              { href: "/converter/jpg-to-webp", label: "JPG to WebP" },
              { href: "/converter/webp-to-png", label: "WebP to PNG" },
              { href: "/converter/webp-to-jpg", label: "WebP to JPG" },
            ].map((format) => (
              <Link
                key={format.href}
                href={format.href}
                className="text-[0.68rem] font-semibold text-[#8d9aaa] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] px-3 py-1.5 rounded-sm no-underline hover:text-[var(--accent)] hover:border-[var(--accent)]/20 transition-all"
              >
                {format.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-[0.75rem] text-[#8d9aaa] text-center">
            Learn more: <Link href="/guides/social-media-image-sizes-2026" className="text-[var(--accent)] no-underline hover:underline">Social Media Image Sizes 2026</Link> · <Link href="/resize/instagram" className="text-[var(--accent)] no-underline hover:underline">Instagram Square Image Maker</Link> · <Link href="/resize/whatsapp" className="text-[var(--accent)] no-underline hover:underline">WhatsApp Image Resizer</Link> · <Link href="/resize/linkedin" className="text-[var(--accent)] no-underline hover:underline">LinkedIn Image Resizer</Link> · <Link href="/guides/instagram-reels-stories-guide" className="text-[var(--accent)] no-underline hover:underline">Reels & Stories Guide</Link>
          </p>
        </div>
      </section>
    </>
  );
}

