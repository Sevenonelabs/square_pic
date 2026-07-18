"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, THEMES } from "@/lib/theme-store";

const TOOLS = [
  { href: "/", label: "Square Image" },
  { href: "/upscaler", label: "HD Image Upscaler" },
  { href: "/converter", label: "Converter" },
  { href: "/compressor", label: "Compressor" },
  { href: "/cropper", label: "Cropper" },
];

export function Navbar() {
  const { current, apply, pickRandom } = useTheme();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { pickRandom(); }, [pickRandom]);

  useEffect(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="5" y="5" width="22" height="22" rx="4" stroke="${encodeURIComponent(current.accent)}" stroke-width="3"/></svg>`;
    const href = `data:image/svg+xml,${svg}`;
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [current.accent]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 left-1/2 -translate-x-1/2 w-auto min-w-[380px] max-w-[calc(100vw-24px)] h-11 bg-[rgba(5,5,7,0.82)] backdrop-blur-[28px] saturate-[1.6] border border-[rgba(255,255,255,0.06)] rounded-lg px-2 z-50 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.4)] max-lg:min-w-0 max-lg:w-[calc(100%-16px)] max-lg:px-1.5 max-lg:h-10 max-md:top-1.5 max-md:h-9"
    >
      <div className="flex items-center gap-3 max-md:gap-1.5">
        <Link href="/" className="flex items-center gap-1.5 no-underline">
          <div className="w-[18px] h-[18px] rounded-sm shrink-0 transition-colors duration-300" style={{ border: "2px solid " + current.accent }} />
          <span className="text-[0.82rem] font-extrabold tracking-tight whitespace-nowrap text-[#e6edf5] max-lg:text-[0.7rem] max-md:text-[0.65rem]">SquarePic</span>
        </Link>

        <nav className="flex items-center gap-0.5 max-md:hidden">
          <Link href="/" className="text-[0.7rem] font-semibold text-[#8d9aaa] px-2 py-1 rounded-sm no-underline hover:text-[#e6edf5] hover:bg-[rgba(255,255,255,0.03)] transition-all">
            Home
          </Link>

          <div ref={toolsRef} className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1 text-[0.7rem] font-semibold text-[#8d9aaa] px-2 py-1 rounded-sm no-underline hover:text-[#e6edf5] hover:bg-[rgba(255,255,255,0.03)] transition-all cursor-pointer bg-transparent border-none"
            >
              Tools
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 mt-1 w-44 bg-[rgba(10,10,14,0.95)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.06)] rounded-lg p-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                >
                  {TOOLS.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setToolsOpen(false)}
                      className="block text-[0.72rem] font-semibold text-[#8d9aaa] px-3 py-1.5 rounded-sm no-underline hover:text-[#e6edf5] hover:bg-[rgba(255,255,255,0.04)] transition-all"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/guides" className="text-[0.7rem] font-semibold text-[#8d9aaa] px-2 py-1 rounded-sm no-underline hover:text-[#e6edf5] hover:bg-[rgba(255,255,255,0.03)] transition-all">
            Guides
          </Link>

        </nav>
      </div>

      <div className="flex items-center h-11 gap-2 flex-1 justify-end max-lg:h-10 max-md:h-9">
        <div className="flex items-center gap-1.5 max-md:hidden">
          {["100% Free", "No Watermarks", "Privacy-First"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 text-[0.6rem] font-bold tracking-wider text-[#576675] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 border border-[rgba(255,255,255,0.06)] rounded-sm whitespace-nowrap"
            >
              {label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-sm max-md:gap-0.5 max-md:px-1">
          <span className="text-[0.55rem] tracking-[0.1em] uppercase text-[#576675] mr-0.5 font-semibold max-lg:hidden">Theme</span>
          {Object.entries(THEMES).map(([name, color]) => (
            <button
              key={name}
              onClick={() => apply(color.accent, color.glow)}
              className="w-[14px] h-[14px] rounded-full cursor-pointer shrink-0 transition-all duration-300 hover:scale-130 focus-visible:scale-130 max-md:w-[12px] max-md:h-[12px]"
              style={{
                background: color.accent,
                border: current.accent === color.accent
                  ? "2px solid rgba(255,255,255,0.85)"
                  : "2px solid transparent",
                boxShadow: current.accent === color.accent
                  ? "0 0 0 1px rgba(255,255,255,0.15), 0 0 12px rgba(255,255,255,0.08)"
                  : "none",
                transform: current.accent === color.accent ? "scale(1.18)" : "none",
              }}
              aria-label={`${name} theme`}
              title={name.charAt(0).toUpperCase() + name.slice(1)}
            />
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="hidden max-md:flex items-center justify-center w-11 h-11 bg-transparent border border-[rgba(255,255,255,0.06)] rounded-sm cursor-pointer text-[#8d9aaa] hover:text-[#e6edf5] transition-all"
          aria-label="Menu"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden max-md:block absolute top-full left-2 right-2 mt-1 bg-[rgba(10,10,14,0.95)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.06)] rounded-lg p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <Link href="/" onClick={() => setMobileOpen(false)} className="block text-[0.78rem] font-semibold text-[#8d9aaa] px-3 py-2 rounded-sm no-underline hover:text-[#e6edf5] hover:bg-[rgba(255,255,255,0.04)] transition-all">Home</Link>
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} onClick={() => setMobileOpen(false)} className="block text-[0.78rem] font-semibold text-[#8d9aaa] px-3 py-2 rounded-sm no-underline hover:text-[#e6edf5] hover:bg-[rgba(255,255,255,0.04)] transition-all">{tool.label}</Link>
            ))}
            <Link href="/guides" onClick={() => setMobileOpen(false)} className="block text-[0.78rem] font-semibold text-[#8d9aaa] px-3 py-2 rounded-sm no-underline hover:text-[#e6edf5] hover:bg-[rgba(255,255,255,0.04)] transition-all">Guides</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
