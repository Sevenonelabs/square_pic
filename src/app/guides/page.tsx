import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, JsonLd } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Guides - Image Editing Tutorials & Tips",
  description: "Learn how to resize, crop, compress, and convert images for any platform. Step-by-step guides for social media image optimization.",
  openGraph: { title: "Guides - Image Editing Tutorials & Tips | SquarePic" },
  alternates: { canonical: "https://squarepic.io/guides" },
};

const SITE = "https://squarepic.io";

const GUIDES = [
  {
    href: "/guides/social-media-image-sizes-2026",
    title: "Social Media Image Sizes 2026: Complete Cheat Sheet",
    desc: "The definitive guide to image dimensions for every major social media platform. Updated for 2026 with the latest recommended sizes.",
    category: "Social Media",
    readTime: "15 min",
  },
];

export default function GuidesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Guides", url: `${SITE}/guides` },
      ]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "SquarePic Guides & Tutorials",
        description: "Learn how to resize, crop, compress, and convert images for any platform.",
        url: `${SITE}/guides`,
        about: { "@type": "Thing", name: "Image Editing Guides" },
      }} />
      <div className="max-w-[800px] w-full mx-auto px-4 py-8">
        <h1 className="text-center text-[2rem] font-extrabold tracking-tight mb-2">Guides & Tutorials</h1>
        <p className="text-center text-[0.9rem] text-[#8d9aaa] max-w-[500px] mx-auto mb-10 leading-relaxed">
          Learn how to optimize images for every platform. Step-by-step tutorials, dimension guides, and best practices for social media, e-commerce, and web use.
        </p>

        <div className="flex flex-col gap-4 mb-10">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group block bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">
                    {g.category}
                  </span>
                  <h2 className="text-[1.1rem] font-extrabold text-[#e6edf5] mt-2 mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                    {g.title}
                  </h2>
                  <p className="text-[0.82rem] text-[#8d9aaa] leading-relaxed m-0">{g.desc}</p>
                </div>
                <span className="text-[0.65rem] text-[#576675] font-semibold shrink-0 pt-1">{g.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {GUIDES.length === 0 && (
          <p className="text-center text-[0.85rem] text-[#576675]">No guides yet. Check back soon.</p>
        )}
      </div>
    </>
  );
}

