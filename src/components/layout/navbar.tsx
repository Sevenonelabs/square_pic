"use client";

import { useTheme, THEMES } from "@/lib/theme-store";

export function Navbar() {
  const { current, apply } = useTheme();

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 w-auto min-w-[380px] max-w-[calc(100vw-24px)] h-11 bg-[rgba(5,5,7,0.82)] backdrop-blur-[28px] saturate-[1.6] border border-[rgba(255,255,255,0.06)] rounded-lg px-1.5 z-50 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.4)] max-lg:min-w-0 max-lg:w-[calc(100%-16px)] max-lg:px-1 max-lg:h-10 max-md:top-1.5 max-md:h-9">
      <a href="/" className="text-[0.82rem] font-extrabold tracking-tight whitespace-nowrap text-[#e6edf5] no-underline max-lg:text-[0.7rem] max-md:text-[0.65rem]">
        SquarePic
      </a>

      <div className="flex items-center h-11 gap-2 flex-1 justify-end max-lg:h-10 max-md:h-9">
        <div className="flex items-center gap-1.5 max-lg:hidden">
          <span className="badge-item">100% Free</span>
          <span className="badge-item">No Watermarks</span>
          <span className="badge-item">Privacy-First</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-sm max-md:gap-0.5 max-md:px-1">
          <span className="text-[0.58rem] tracking-[0.1em] uppercase text-[#576675] mr-0.5 max-lg:hidden">Theme</span>
          {Object.entries(THEMES).map(([name, color]) => (
            <button
              key={name}
              onClick={() => apply(color.accent, color.glow)}
              className="w-3.5 h-3.5 rounded-full border-2 border-transparent cursor-pointer shrink-0 transition-all duration-300 hover:scale-130 max-md:w-2.5 max-md:h-2.5"
              style={{
                background: color.accent,
                borderColor: current.accent === color.accent ? "rgba(255,255,255,0.85)" : "transparent",
                boxShadow: current.accent === color.accent ? "0 0 0 1px rgba(255,255,255,0.15), 0 0 10px rgba(255,255,255,0.1)" : "none",
                transform: current.accent === color.accent ? "scale(1.15)" : "none",
              }}
              aria-label={`${name} theme`}
              title={name}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
