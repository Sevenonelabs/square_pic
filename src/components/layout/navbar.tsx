"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { useTheme, THEMES } from "@/lib/theme-store";

export function Navbar() {
  const { current, apply, pickRandom } = useTheme();

  useEffect(() => { pickRandom(); }, [pickRandom]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 left-1/2 -translate-x-1/2 w-auto min-w-[380px] max-w-[calc(100vw-24px)] h-11 bg-[rgba(5,5,7,0.82)] backdrop-blur-[28px] saturate-[1.6] border border-[rgba(255,255,255,0.06)] rounded-lg px-2 z-50 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.4)] max-lg:min-w-0 max-lg:w-[calc(100%-16px)] max-lg:px-1.5 max-lg:h-10 max-md:top-1.5 max-md:h-9"
    >
      <a href="/" className="flex items-center gap-1.5 no-underline">
        <img src="/images/logo-icon.svg" alt="" width="18" height="18" className="shrink-0" style={{ filter: "brightness(10)" }} />
        <span className="text-[0.82rem] font-extrabold tracking-tight whitespace-nowrap text-[#e6edf5] max-lg:text-[0.7rem] max-md:text-[0.65rem]">SquarePic</span>
      </a>

      <div className="flex items-center h-11 gap-2 flex-1 justify-end max-lg:h-10 max-md:h-9">
        <div className="flex items-center gap-1.5 max-lg:hidden">
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
      </div>
    </motion.header>
  );
}
