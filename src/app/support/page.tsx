import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/schema-scripts";
import { SITE_URL as SITE } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  "title": "SquarePic Help & Support",
  "description": "Get help with SquarePic image tools, supported formats, downloads, and browser issues. Find troubleshooting tips or contact support.",
  "path": "/support"
});

export default function SupportPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Support", url: `${SITE}/support` }]} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
      <h1 className="text-center text-[2rem] font-extrabold tracking-tight mb-8">Support</h1>

      <section className="mb-6">
        <h2 className="text-[0.875rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">How to Use SquarePic</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          1. Click &ldquo;Upload Your Image&rdquo; or drag and drop a photo into the editor.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          2. Choose Blur, Solid or Transparent to keep the whole image at 100% zoom. Crop uses a centered crop and trims edges.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          3. Choose 1080 × 1080, 1200 × 1200 or a custom square edge from 1 to 4096 pixels. Adjust padding and check the preview. Higher zoom can trim edges.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          4. Select &ldquo;Download &amp; Share&rdquo; to preview and save PNG, JPEG or WebP. Transparent mode selects PNG to preserve empty padding.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.875rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">Common Issues</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">My image won&apos;t upload:</strong> Ensure your file is under 20 MB and is a supported image format (JPEG, PNG, WebP, GIF, BMP, or TIFF). If you are using Safari, make sure you allow image file access when prompted.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">The export looks blurry:</strong> Start with the original image and avoid enlarging it beyond its source dimensions. Use PNG for text or graphics with sharp edges. A lossless export does not restore missing detail.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">The compressor made my image larger:</strong> Some image formats like PNG are already well-compressed. Try using JPEG or WebP format for photos. The target size mode works best when you set a realistic size target based on the original file dimensions.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">The cropper zoom is not working:</strong> Use the scroll wheel or pinch gesture on touch devices to zoom. You can also use the zoom slider in the controls panel. Drag to pan around the image when zoomed in.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          <strong className="text-[#e6edf5]">The tool is not working:</strong> SquarePic requires a modern browser with HTML5 Canvas support. Try Chrome, Firefox, Safari, or Edge. Ensure JavaScript is enabled and no browser extensions are blocking script execution.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.875rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">Browser Compatibility</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic works on any modern browser that supports HTML5 Canvas and JavaScript. This includes the latest versions of Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge on both desktop and mobile operating systems. Internet Explorer and very old browser versions are not supported. If you are experiencing issues, please ensure your browser is updated to the latest version for the best experience and performance.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.875rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">Tools Overview</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">Square Image Editor:</strong> Fit a photo with Blur, Solid or Transparent padding, or choose a centered Crop. Set an exact square size up to 4096 pixels per side. Check actual output dimensions before downloading.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">Image Compressor:</strong> Reduce file sizes with either a quality slider or target size mode. The binary search algorithm finds the optimal compression level. Batch compress multiple files and download them individually or as a ZIP archive.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">Image Converter:</strong> Export JPEG, PNG, WebP or ICO with per-file format and quality settings. AVIF, BMP, GIF and TIFF output are currently unavailable. Animated inputs produce a still frame.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          <strong className="text-[#e6edf5]">Image Cropper:</strong> Crop images interactively with 8 drag handles. Lock aspect ratio to common social media formats including 1:1, 4:5, 16:9, and 9:16. Zoom and pan for precise positioning.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.875rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">Contact Us</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          If you need further assistance, please visit our <Link href="/faq" className="text-[var(--accent)] no-underline hover:underline">FAQ page</Link> for common questions, or check our <Link href="/privacy" className="text-[var(--accent)] no-underline hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-[var(--accent)] no-underline hover:underline">Terms of Service</Link>.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">
          You can also email us directly at <a href="mailto:support@squarepic.io" className="text-[var(--accent)] no-underline hover:underline">support@squarepic.io</a>.
        </p>
      </section>
    </div>
    </>
  );
}

