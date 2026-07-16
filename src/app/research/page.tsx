import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, JsonLd } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Research - Image Compression Benchmarks & Studies",
  description: "Original research on image compression performance. Compare JPEG, PNG, WebP, and AVIF across quality levels, file sizes, and visual fidelity.",
  openGraph: { title: "Research - Image Compression Benchmarks | SquarePic" },
  alternates: { canonical: "https://squarepic.io/research" },
};

const SITE = "https://squarepic.io";

export default function ResearchPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: SITE }, { name: "Research", url: `${SITE}/research` }]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "SquarePic Research",
        description: "Original research on image compression performance across formats and quality levels.",
        url: `${SITE}/research`,
        about: { "@type": "Thing", name: "Image Compression Research" },
      }} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
        <h1 className="text-[2rem] font-extrabold tracking-tight mb-2">Research</h1>
        <p className="text-[0.9rem] text-[#8d9aaa] mb-8 leading-relaxed">
          Original data, benchmarks, and analysis on image compression, format comparison, and web performance.
        </p>
        <Link
          href="/research/image-compression-benchmarks"
          className="group block bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
        >
          <h2 className="text-[1.05rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors">
            Image Compression Benchmarks 2026
          </h2>
          <p className="text-[0.82rem] text-[#8d9aaa] leading-relaxed m-0">
            Comprehensive benchmark comparing JPEG, PNG, WebP, and AVIF across 8 quality levels. File sizes, compression ratios, and loading time estimates.
          </p>
        </Link>
      </div>
    </>
  );
}

