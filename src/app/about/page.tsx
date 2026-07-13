import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "About - Free Online Square Image Editor",
  description: "Learn about SquarePic, the privacy-first online image editor. Make any photo square for Instagram and social media. No uploads, no watermarks.",
  openGraph: { title: "About - Free Online Square Image Editor | SquarePic" },
  alternates: { canonical: "https://squarepic.io/about" },
};

const SITE = "https://squarepic.io";

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "About", url: `${SITE}/about` }]} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
      <h1 className="text-center text-[2rem] font-extrabold tracking-tight mb-6">About SquarePic</h1>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">?</span>
          What Is SquarePic?
        </h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic is a simple, fast, and free image formatting tool built for creators, marketers, and everyday users. If you need to make an image square online, this tool handles it instantly.
        </p>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          Most photos are taken in standard rectangular formats (portrait or landscape). When you upload them to social media, you are often forced to crop them. SquarePic acts as a professional Instagram square photo tool, adding blur backgrounds or solid fills so you can create perfect square images without cropping.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">?</span>
          Privacy-First Image Editor
        </h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          We believe your photos should remain private. SquarePic is a local image processing tool. Images are never stored on servers or uploaded to the cloud - all processing happens locally in your browser using HTML5 Canvas, ensuring maximum privacy, speed, and security.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">?</span>
          Core Features
        </h2>
        <ul className="text-[0.95rem] text-[#8d9aaa] leading-relaxed pl-6 mb-4 space-y-2">
          <li><strong className="text-[#e6edf5]">Make any image square instantly:</strong> Works with all standard formats to convert images to square.</li>
          <li><strong className="text-[#e6edf5]">No awkward cropping:</strong> A no crop square photo tool that keeps your entire photo visible.</li>
          <li><strong className="text-[#e6edf5]">Full tool access for free:</strong> Everything is unlocked immediately.</li>
          <li><strong className="text-[#e6edf5]">Multiple styles:</strong> Use our blur background image tool or add solid color fills.</li>
          <li><strong className="text-[#e6edf5]">Fast export:</strong> Download your square profile picture or post immediately.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">?</span>
          100% Free to Use
        </h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic is a reliable online image editor free of charge. It is a no watermark image editor that requires no signup, no account, and no payment. Upload your image, adjust the style, and export your final square image. It is that simple.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[var(--accent)] mb-2 pb-1.5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
          <span className="bg-[var(--accent)] text-black text-[0.55rem] font-extrabold w-4 h-4 inline-flex items-center justify-center rounded-sm shrink-0">*</span>
          Open Source
        </h2>
        <p className="text-[0.95rem] text-[#8d9aaa] leading-relaxed mb-4">
          SquarePic is open source software built by <strong className="text-[#e6edf5]">SevenOneLabs</strong>. The source code is available on <a href="https://github.com/Sevenonelabs/square_pic" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline">GitHub</a>. Contributions, issues, and feature requests are welcome. You can also reach us at <a href="mailto:support@squarepic.io" className="text-[var(--accent)] no-underline hover:underline">support@squarepic.io</a>.
        </p>
      </section>
    </div>
    </>
  );
}

