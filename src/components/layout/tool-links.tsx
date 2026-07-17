"use client";

import { motion } from "motion/react";

export const TOOLS = [
  {
    href: "/resize",
    label: "Square Pic - Social Media Resizer",
    desc: "Make images square, add backgrounds",
    icon: "M2 2h20v20H2zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01",
  },
  {
    href: "/converter",
    label: "Image Converter",
    desc: "JPG, PNG, WebP, AVIF",
    icon: "M23 4v6h-6M1 20v-6h6M3.5 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.5 15",
  },
  {
    href: "/compressor",
    label: "Image Compressor",
    desc: "Reduce file size, batch",
    icon: "M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7",
  },
  {
    href: "/cropper",
    label: "Photo Cropper",
    desc: "Free-form & preset ratios",
    icon: "M6.13 1L6 16a2 2 0 0 0 2 2h15M1 6.13L16 6a2 2 0 0 1 2 2v15",
  },
  {
    href: "/upscaler",
    label: "HD Image Upscaler",
    desc: "2x, 3x, 4x magnification",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7",
  },
];

const RESOURCES = [
  { href: "/guides", label: "Guides & Tutorials", desc: "Image editing guides and tips" },
  { href: "/blog", label: "Blog", desc: "Tutorials, tips & insights" },
  { href: "/compare", label: "Comparisons", desc: "SquarePic vs other tools" },
  { href: "/research", label: "Research", desc: "Benchmarks & studies" },
  { href: "/image-size-calculator", label: "Size Calculator", desc: "Find the perfect dimensions" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ToolLinks({ current }: { current?: string }) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 pt-5 pb-10 w-full max-md:px-3">
      <div className="text-center mb-8">
        <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5]">
          More Free Photo Tools
        </h2>
        <p className="text-[0.75rem] text-[#8d9aaa] font-medium mt-1 leading-relaxed">
          Crop, convert, compress & resize - all in your browser.
        </p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {TOOLS.map((tool) => {
          const isCurrent = current === tool.href;
          return (
            <motion.a
              key={tool.href}
              variants={item}
              href={tool.href}
              className={`group flex items-center gap-3 rounded-xl px-4 py-4 no-underline transition-all duration-300 ${
                isCurrent
                  ? "bg-[var(--accent)]/8 border border-[var(--accent)]/15 cursor-default"
                  : "bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
              }`}
            >
              <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg border transition-colors ${
                isCurrent
                  ? "bg-[var(--accent)]/12 border-[var(--accent)]/20"
                  : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.06)] group-hover:border-[var(--accent)]"
              }`}>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tool.icon} />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className={`text-[0.85rem] font-extrabold m-0 truncate transition-colors ${
                  isCurrent ? "text-[var(--accent)]" : "text-[#e6edf5] group-hover:text-[var(--accent)]"
                }`}>
                  {tool.label}
                </h3>
                <p className="text-[0.68rem] text-[#8d9aaa] m-0 truncate leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </motion.a>
          );
        })}
      </motion.div>

      <div className="text-center mt-12 mb-6">
        <h2 className="text-[clamp(1rem,1.8vw,1.3rem)] font-black tracking-[-1px] text-[#e6edf5]">
          Resources & Guides
        </h2>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-5 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {RESOURCES.map((res) => (
          <motion.a
            key={res.href}
            variants={item}
            href={res.href}
            className="group bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl px-4 py-3.5 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
          >
            <h3 className="text-[0.8rem] font-extrabold text-[#e6edf5] m-0 group-hover:text-[var(--accent)] transition-colors">{res.label}</h3>
            <p className="text-[0.65rem] text-[#8d9aaa] m-0 mt-0.5 leading-relaxed">{res.desc}</p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
