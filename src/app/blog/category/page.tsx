import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, JsonLd } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Blog Categories",
  description: "Browse SquarePic blog posts by category: social media sizes, image formats, privacy, and how-to guides.",
  alternates: { canonical: "https://squarepic.io/blog/category" },
};

const SITE = "https://squarepic.io";

const CATEGORIES = [
  { slug: "how-to", name: "How-To", desc: "Step-by-step tutorials for resizing, cropping, compressing, and converting images.", count: 1 },
  { slug: "privacy", name: "Privacy", desc: "Privacy-first image editing, client-side processing, and data protection best practices.", count: 1 },
  { slug: "social-media-sizes", name: "Social Media Sizes", desc: "Complete dimension guides for every social media platform.", count: 0 },
  { slug: "image-formats", name: "Image Formats", desc: "JPEG vs PNG vs WebP vs AVIF -- when to use each format and how to convert between them.", count: 0 },
];

export default function BlogCategoryPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Blog", url: `${SITE}/blog` },
        { name: "Categories", url: `${SITE}/blog/category` },
      ]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Blog Categories",
        description: "Browse SquarePic blog posts by category.",
        url: `${SITE}/blog/category`,
      }} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
        <h1 className="text-[2rem] font-extrabold tracking-tight mb-2">Blog Categories</h1>
        <p className="text-[0.9rem] text-[#8d9aaa] mb-8 leading-relaxed">Browse posts by topic.</p>
        <div className="flex flex-col gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className="group bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[1rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors">{cat.name}</h2>
                  <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">{cat.desc}</p>
                </div>
                <span className="text-[0.6rem] font-bold text-[#576675] bg-[rgba(255,255,255,0.04)] px-2 py-0.5 rounded-sm shrink-0 ml-3">{cat.count} post{cat.count !== 1 ? "s" : ""}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

