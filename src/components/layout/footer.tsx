const NAV = [
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] mt-auto px-6 py-8 max-md:px-4">
      <div className="max-w-[1100px] mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-6 max-md:grid-cols-1 max-md:text-center max-md:gap-5">
        <div className="flex flex-col gap-1 text-left max-md:items-center max-md:text-center">
          <span className="text-sm font-extrabold text-[#e6edf5] tracking-tight">SquarePic</span>
          <p className="text-[0.8rem] text-[#576675] m-0 leading-relaxed max-w-xs max-md:max-w-none">
            Free online square image maker and photo editor. Fast, private, and watermark-free.
          </p>
        </div>

        <nav className="flex justify-center gap-6 max-md:gap-4">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#8d9aaa] no-underline transition-colors hover:text-[var(--accent)] max-md:text-[0.65rem]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex justify-end max-md:justify-center">
          <div className="inline-flex items-center gap-1.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-3 py-1.5 rounded-md text-[0.75rem] font-semibold text-[var(--accent)]">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Secure Local Processing
          </div>
        </div>
      </div>

      <p className="text-center text-[0.8rem] text-[#576675] tracking-[0.02em] mt-6 pt-4 border-t border-[rgba(255,255,255,0.04)] max-md:text-[0.65rem]">
        &copy; 2026 SquarePic - Free online square image maker.
        <a href="https://github.com/Sevenonelabs/square_pic" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] no-underline hover:underline ml-1">Open source</a>
      </p>
    </footer>
  );
}
