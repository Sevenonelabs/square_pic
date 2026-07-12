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
];

export function ToolLinks({ current }: { current?: string }) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 pb-16 w-full max-md:px-3">
      <div className="text-center mb-6">
        <h2 className="text-[clamp(1.1rem,2vw,1.5rem)] font-black tracking-[-1px] text-[#e6edf5]">
          More Free Photo Tools
        </h2>
        <p className="text-[0.75rem] text-[#8d9aaa] font-medium mt-0.5">
          Crop, convert, compress &amp; resize — all in your browser.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1">
        {TOOLS.map((tool) => {
          const isCurrent = current === tool.href;
          return (
            <a
              key={tool.href}
              href={tool.href}
              className={`group flex items-center gap-3 rounded-lg px-4 py-3 no-underline transition-all duration-300 ${
                isCurrent
                  ? "bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.15)] cursor-default"
                  : "bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.10)] hover:-translate-y-0.5"
              }`}
            >
              <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-sm border transition-colors ${
                isCurrent
                  ? "bg-[rgba(6,182,212,0.12)] border-[rgba(6,182,212,0.20)]"
                  : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.06)] group-hover:border-[var(--accent)]"
              }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tool.icon} />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className={`text-[0.78rem] font-extrabold m-0 truncate transition-colors ${
                  isCurrent ? "text-[var(--accent)]" : "text-[#e6edf5] group-hover:text-[var(--accent)]"
                }`}>
                  {tool.label}
                </h3>
                <p className="text-[0.65rem] text-[#8d9aaa] m-0 truncate leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
