"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { RESIZE_LINKS, CONVERT_LINKS } from "@/data/tool-navigation";
import { PlatformIcon } from "@/components/platform-icon";

export const TOOLS = [
  {
    href: "/converter",
    label: "Image Converter",
    desc: "JPG, PNG, WebP, ICO",
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
    label: "Image Cropper",
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
    <section id="more-image-tools" className="max-w-[1200px] mx-auto px-4 pt-10 pb-10 w-full max-md:px-3" aria-labelledby="more-tools-title">
      <div className="text-center mb-8">
        <h2 id="more-tools-title" className="text-[clamp(1.5rem,3vw,2rem)] font-black tracking-tight text-[#e6edf5]">
          More Free Image Tools
        </h2>
        <p className="text-[0.875rem] text-[#8d9aaa] font-medium mt-1 leading-relaxed">
          Crop, convert, compress & resize - all in your browser.
        </p>
      </div>
      <div className="grid gap-4 mb-6">
        <div id="resize-images" className="border border-white/10 bg-white/[0.025] p-5 md:p-6 rounded-lg">
          <h3 className="text-xl font-extrabold mb-2">Resize Images for Every Platform</h3>
          <p className="text-base text-[#abb8c7] mb-5">Choose a platform, then a size for your post, profile or banner.</p>
          <div className="flex flex-wrap gap-2">
            {RESIZE_LINKS.map((platform) => <Link key={platform.href} href={platform.href} className="inline-flex min-h-12 items-center gap-2.5 rounded-md border border-white/10 bg-white/[0.025] px-4 py-2 text-base font-semibold text-[#c4cfdb] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5">
              <PlatformIcon platform={platform.key} />{platform.label}
            </Link>)}
          </div>
        </div>
        <div id="convert-images" className="border border-white/10 bg-white/[0.025] p-5 md:p-6 rounded-lg">
          <h3 className="text-xl font-extrabold mb-2">Convert Between Image Formats</h3>
          <p className="text-base text-[#abb8c7] mb-5">Switch formats for photos, transparent artwork or website icons.</p>
          <div className="flex flex-wrap gap-2">
            {CONVERT_LINKS.map((format) => <Link key={format.href} href={format.href} className="inline-flex min-h-12 items-center rounded-md border border-white/10 bg-white/[0.025] px-4 py-2 text-base font-semibold text-[#c4cfdb] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5">{format.label}</Link>)}
          </div>
        </div>
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
                <h3 className={`text-base font-extrabold m-0 transition-colors ${
                  isCurrent ? "text-[var(--accent)]" : "text-[#e6edf5] group-hover:text-[var(--accent)]"
                }`}>
                  {tool.label}
                </h3>
                <p className="text-sm text-[#abb8c7] m-0 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </motion.a>
          );
        })}
      </motion.div>

    </section>
  );
}
