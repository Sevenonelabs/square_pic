import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Contact Support - Free Image Editor Help",
  description: "Need help with SquarePic? Contact support for assistance with resizing images, editing photos, and making square pictures online.",
  openGraph: { title: "Contact Support - Free Image Editor Help | SquarePic" },
  alternates: { canonical: "https://www.squarepic.io/support" },
};

const SITE = "https://www.squarepic.io";

export default function SupportPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Support", url: `${SITE}/support` }]} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
      <h1 className="text-center text-[2rem] font-extrabold tracking-tight mb-8">Support</h1>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">How to Use SquarePic</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          1. Click &ldquo;Upload Your Image&rdquo; or drag and drop a photo into the editor.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          2. Choose your editing mode: Dynamic Blur, Solid Background, or Smart Crop.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          3. Adjust settings like blur intensity, padding, zoom, and edge radius.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          4. Click &ldquo;Export Perfect Square&rdquo; and download your image in PNG, JPEG, or WebP format.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">Common Issues</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">My image won&apos;t upload:</strong> Ensure your file is under 20 MB and is a supported image format (JPEG, PNG, WebP, GIF, BMP, or TIFF). If you are using Safari, make sure you allow image file access when prompted.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">The export looks blurry:</strong> Increase the quality slider in the export panel to 90% or higher. For text-heavy images or graphics with sharp edges, use PNG format instead of JPEG. WebP offers a good balance between quality and file size.
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
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">Browser Compatibility</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic works on any modern browser that supports HTML5 Canvas and JavaScript. This includes the latest versions of Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge on both desktop and mobile operating systems. Internet Explorer and very old browser versions are not supported. If you are experiencing issues, please ensure your browser is updated to the latest version for the best experience and performance.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">Tools Overview</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">Square Image Editor:</strong> Upload any photo and convert it to a perfect square. Choose from Dynamic Blur, Solid Background, or Smart Crop modes. Adjust padding, zoom, and edge radius for fine control over the final result.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">Image Compressor:</strong> Reduce file sizes with either a quality slider or target size mode. The binary search algorithm finds the optimal compression level. Batch compress multiple files and download them individually or as a ZIP archive.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          <strong className="text-[#e6edf5]">Image Converter:</strong> Convert images between 8 different formats including JPEG, PNG, WebP, BMP, GIF, ICO, AVIF, and TIFF. Set per-file format and quality settings.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          <strong className="text-[#e6edf5]">Photo Cropper:</strong> Crop images interactively with 8 drag handles. Lock aspect ratio to common social media formats including 1:1, 4:5, 16:9, and 9:16. Zoom and pan for precise positioning.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)]">Contact Us</h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-2">
          If you need further assistance, please visit our <a href="/faq" className="text-[var(--accent)] no-underline hover:underline">FAQ page</a> for common questions, or check our <a href="/privacy" className="text-[var(--accent)] no-underline hover:underline">Privacy Policy</a> and <a href="/terms" className="text-[var(--accent)] no-underline hover:underline">Terms of Service</a>.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed">
          You can also email us directly at <a href="mailto:support@squarepic.io" className="text-[var(--accent)] no-underline hover:underline">support@squarepic.io</a>.
        </p>
      </section>
    </div>
    </>
  );
}

