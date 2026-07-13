import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/schema-scripts";

type Props = { params: Promise<{ slug: string }> };

const SITE = "https://squarepic.io";

const CATEGORIES: Record<string, { name: string; desc: string }> = {
  "how-to": { name: "How-To", desc: "Step-by-step tutorials and guides." },
  "privacy": { name: "Privacy", desc: "Privacy-first image editing and data protection." },
  "social-media-sizes": { name: "Social Media Sizes", desc: "Image dimension guides for every platform." },
  "image-formats": { name: "Image Formats", desc: "Format comparisons and conversion guides." },
};

const POSTS: Record<string, { href: string; title: string; desc: string; date: string; readTime: string }[]> = {
  "how-to": [
    { href: "/blog/how-to-square-image-for-any-platform", title: "How to Square an Image for Any Social Media Platform", desc: "Step-by-step guide to making perfect square images. Three methods: blur background, solid fill, and smart crop.", date: "July 13, 2026", readTime: "5 min" },
  ],
  "privacy": [
    { href: "/blog/privacy-first-image-editing", title: "Privacy-First Image Editing: Why Your Photos Should Stay on Your Device", desc: "Most image editors upload your photos to their servers. Learn why client-side processing is the only way to guarantee your images remain private.", date: "July 13, 2026", readTime: "4 min" },
  ],
  "social-media-sizes": [],
  "image-formats": [],
};

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) return {};
  return {
    title: `${cat.name} - SquarePic Blog`,
    description: cat.desc,
    alternates: { canonical: `${SITE}/blog/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) notFound();

  const posts = POSTS[slug] || [];

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Blog", url: `${SITE}/blog` },
        { name: "Categories", url: `${SITE}/blog/category` },
        { name: cat.name, url: `${SITE}/blog/category/${slug}` },
      ]} />
      <div className="max-w-[680px] w-full mx-auto px-4 py-8">
        <Link href="/blog/category" className="text-[0.7rem] font-semibold text-[#576675] no-underline hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1 mb-4">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All Categories
        </Link>
        <h1 className="text-[2rem] font-extrabold tracking-tight mb-2">{cat.name}</h1>
        <p className="text-[0.9rem] text-[#8d9aaa] mb-8 leading-relaxed">{cat.desc}</p>

        {posts.length === 0 ? (
          <p className="text-[0.85rem] text-[#576675]">No posts in this category yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[0.6rem] text-[#576675] font-medium">{post.date}</span>
                  <span className="text-[0.6rem] text-[#576675] font-medium">· {post.readTime}</span>
                </div>
                <h2 className="text-[1rem] font-extrabold text-[#e6edf5] mb-1 group-hover:text-[var(--accent)] transition-colors">{post.title}</h2>
                <p className="text-[0.8rem] text-[#8d9aaa] leading-relaxed m-0">{post.desc}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
