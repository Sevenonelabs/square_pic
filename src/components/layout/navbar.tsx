"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme, THEMES } from "@/lib/theme-store";
import { RESIZE_LINKS, CONVERT_LINKS } from "@/data/tool-navigation";
import { PlatformIcon } from "@/components/platform-icon";

const TOOLS = [
  { href: "/", label: "Square Image" },
  { href: "/upscaler", label: "HD Image Upscaler" },
  { href: "/compressor", label: "Image Compressor" },
  { href: "/cropper", label: "Image Cropper" },
  { href: "/image-size-calculator", label: "Image Size Calculator" },
];
const MENUS = {
  Resize: { title: "Resize Images for Every Platform", links: RESIZE_LINKS },
  Convert: { title: "Convert Between Image Formats", links: CONVERT_LINKS },
  Tools: { title: "More Free Image Tools", links: TOOLS },
};
type MenuName = keyof typeof MENUS;
const navStyle = "inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-[0.9375rem] font-semibold text-[#abb8c7] hover:text-[#e6edf5] hover:bg-white/5 transition-colors";

export function Navbar() {
  const { current, apply } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuName | "mobile" | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Partial<Record<MenuName | "mobile", HTMLButtonElement | null>>>({});

  useEffect(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="2" y="2" width="28" height="28" rx="4" fill="black" stroke="${current.accent}" stroke-width="4"/></svg>`;
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }, [current.accent]);

  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(null);
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        triggerRefs.current[open]?.focus();
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [open]);

  const close = () => setOpen(null);
  const palette = <div className="flex items-center gap-1" role="group" aria-label="Accent color">
    {Object.entries(THEMES).map(([name, color]) => <button key={name} type="button"
      onClick={() => apply(color.accent, color.glow)} aria-label={`${name} theme`}
      aria-pressed={current.accent === color.accent} title={`${name.charAt(0).toUpperCase() + name.slice(1)} theme`}
      className="flex size-11 items-center justify-center rounded-md hover:bg-white/10 aria-pressed:bg-white/10"
    ><span className="size-[18px] rounded-sm" style={{ background: color.accent, boxShadow: current.accent === color.accent ? "0 0 0 2px #e6edf5" : "none" }} /></button>)}
  </div>;

  return <header ref={headerRef} className="fixed top-[36px] left-3 right-3 z-50 flex h-16 items-center justify-between gap-2 rounded-lg border border-white/10 bg-[rgba(5,5,7,0.94)] px-4 shadow-lg backdrop-blur-2xl max-md:top-[30px] max-md:left-2 max-md:right-2 max-md:px-3">
    <Link href="/" onClick={close} className="flex min-h-11 shrink-0 items-center gap-2 no-underline" aria-label="SquarePic home">
      <span className="size-6 rounded-sm border-[3px] border-[var(--accent)]" />
      <span className="text-lg font-extrabold tracking-tight text-[#e6edf5]">SquarePic</span>
    </Link>
    <nav aria-label="Main navigation" className="flex items-center max-lg:hidden">
      <Link href="/" onClick={close} className={navStyle} aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
      {(Object.keys(MENUS) as MenuName[]).map((name) => <div key={name}>
        <button type="button" ref={(element) => { triggerRefs.current[name] = element; }} className={navStyle}
          aria-expanded={open === name} aria-controls={`nav-${name.toLowerCase()}`} onClick={() => setOpen(open === name ? null : name)}>
          {name}<svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={open === name ? "rotate-180" : ""}><path d="m6 9 6 6 6-6" /></svg>
        </button>
        {open === name && <div id={`nav-${name.toLowerCase()}`} className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-white/10 bg-[#0d1117] p-6 shadow-2xl">
          <p className="mb-4 text-lg font-bold text-[#e6edf5]">{MENUS[name].title}</p>
          <div className="grid grid-cols-4 gap-2">
            {MENUS[name].links.map((link) => <Link key={link.href} href={link.href} onClick={close} className={`${navStyle} border border-white/10`}>
              {"key" in link && <PlatformIcon platform={link.key as string} />}{link.label}
            </Link>)}
          </div>
          {name === "Convert" && <Link href="/converter" onClick={close} className={`${navStyle} mt-3 text-[var(--accent)]`}>Open image converter →</Link>}
        </div>}
      </div>)}
      <Link href="/guides" onClick={close} className={navStyle} aria-current={pathname.startsWith("/guides") ? "page" : undefined}>Guides</Link>
    </nav>
    <div className="flex items-center gap-2 max-lg:hidden">
      {palette}
      <Link href="/image-size-calculator" onClick={close} className="inline-flex min-h-11 items-center whitespace-nowrap rounded-md bg-[var(--accent)] px-3 text-sm font-bold text-black hover:brightness-110 max-xl:hidden">Image Size Calculator</Link>
    </div>
    <button type="button" ref={(element) => { triggerRefs.current.mobile = element; }} onClick={() => setOpen(open === "mobile" ? null : "mobile")}
      className="hidden min-h-11 items-center gap-2 rounded-md border border-white/10 px-3 text-base font-semibold max-lg:flex"
      aria-label={open === "mobile" ? "Close navigation" : "Open navigation"} aria-expanded={open === "mobile"} aria-controls="mobile-navigation">
      Menu <span aria-hidden="true">{open === "mobile" ? "×" : "☰"}</span>
    </button>
    {open === "mobile" && <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute top-full left-0 right-0 mt-2 max-h-[calc(100dvh-120px)] overflow-y-auto rounded-lg border border-white/10 bg-[#0d1117] p-4 shadow-2xl lg:hidden">
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        <Link href="/" onClick={close} className={navStyle}>Home</Link>
        <Link href="/guides" onClick={close} className={navStyle}>Guides</Link>
        <Link href="/converter" onClick={close} className={navStyle}>Image Converter</Link>
      </div>
      {(Object.keys(MENUS) as MenuName[]).map((name) => <details key={name} className="border-b border-white/10 py-2">
        <summary className={`${navStyle} cursor-pointer`}>{name}<span className="ml-auto" aria-hidden="true">+</span></summary>
        <p className="px-3 py-2 text-sm text-[#abb8c7]">{MENUS[name].title}</p>
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-1">
          {MENUS[name].links.map((link) => <Link key={link.href} href={link.href} onClick={close} className={navStyle}>{"key" in link && <PlatformIcon platform={link.key as string} />}{link.label}</Link>)}
        </div>
      </details>)}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4"><span className="text-sm text-[#abb8c7]">Accent color</span>{palette}</div>
    </nav>}
  </header>;
}
