import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema, JsonLd } from "@/components/schema-scripts";

export const metadata: Metadata = {
  title: "Blog - Image Editing Tips & Tutorials",
  description: "Image editing tutorials, social media size guides, privacy tips, and web performance insights from the SquarePic team.",
  openGraph: { title: "Blog - Image Editing Tips & Tutorials | SquarePic" },
  alternates: { canonical: "https://www.squarepic.io/blog" },
};

const SITE = "https://www.squarepic.io";

const CATEGORIES = [
  { name: "Social Media Sizes", slug: "social-media-sizes", count: 1 },
  { name: "Image Formats", slug: "image-formats", count: 0 },
  { name: "Privacy", slug: "privacy", count: 1 },
  { name: "How-To", slug: "how-to", count: 1 },
];

const POSTS = [
  {
    href: "/blog/how-to-square-image-for-any-platform",
    title: "How to Square an Image for Any Social Media Platform",
    desc: "Step-by-step guide to making perfect square images for Instagram, LinkedIn, Facebook, and more. No cropping needed.",
    category: "How-To",
    date: "July 13, 2026",
    readTime: "5 min",
  },
  {
    href: "/blog/privacy-first-image-editing",
    title: "Privacy-First Image Editing: Why Your Photos Should Stay on Your Device",
    desc: "Most image editors upload your photos to their servers. Learn why client-side processing is the only way to guarantee your images remain private.",
    category: "Privacy",
    date: "July 13, 2026",
    readTime: "4 min",
  },
];

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: SITE },
        { name: "Blog", url: `${SITE}/blog` },
      ]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "SquarePic Blog",
        description: "Image editing tutorials, social media size guides, and tips from the SquarePic team.",
        url: `${SITE}/blog`,
        about: { "@type": "Thing", name: "Image Editing" },
      }} />
      <div className="max-w-[920px] w-full mx-auto px-4 py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-[2rem] font-extrabold tracking-tight mb-2">Blog</h1>
            <p className="text-[0.9rem] text-[#8d9aaa] leading-relaxed">
              Tutorials, guides, and insights for better images.
            </p>
          </div>
          <a
            href="/blog/rss.xml"
            className="text-[0.65rem] font-bold tracking-[0.08em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2.5 py-1 rounded-sm no-underline hover:bg-[var(--accent)]/15 transition-colors"
          >
            RSS Feed
          </a>
        </div>

        <div className="flex gap-8 max-md:flex-col">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-5">
              {POSTS.map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="group block bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[var(--accent)] bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-2 py-0.5 rounded-sm">
                      {post.category}
                    </span>
                    <span className="text-[0.6rem] text-[#576675] font-medium">{post.date}</span>
                    <span className="text-[0.6rem] text-[#576675] font-medium">· {post.readTime}</span>
                  </div>
                  <h2 className="text-[1.05rem] font-extrabold text-[#e6edf5] mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[0.82rem] text-[#8d9aaa] leading-relaxed m-0">{post.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="w-[220px] shrink-0 max-md:w-full">
            <div className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#576675] mb-3">Categories</h3>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <span
                    key={cat.slug}
                    className="flex items-center justify-between text-[0.78rem] text-[#8d9aaa] py-1 px-2 rounded-sm hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[0.6rem] text-[#576675] font-bold bg-[rgba(255,255,255,0.04)] px-1.5 py-0.5 rounded-sm">{cat.count}</span>
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

