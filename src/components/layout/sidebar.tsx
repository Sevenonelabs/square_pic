"use client";

import { usePathname } from "next/navigation";
import { useUI } from "@/lib/ui-store";

const LINKS = [
  { href: "/edit", label: "Square Image Tool", icon: "M3 3h18v18H3z" },
  { href: "/converter", label: "Image Converter", icon: "M23 4v6h-6M1 20v-6h6M3.5 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.5 15" },
  { href: "/compressor", label: "Image Compressor", icon: "M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" },
  { href: "/resize", label: "Social Media Resizer", icon: "M2 2h20v20H2zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" },
  { href: "/cropper", label: "Photo Cropper", icon: "M6.13 1L6 16a2 2 0 0 0 2 2h15M1 6.13L16 6a2 2 0 0 1 2 2v15" },
];

export function Sidebar() {
  const { sidebarOpen, closeSidebar } = useUI();
  const pathname = usePathname();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 w-[280px] h-dvh z-[45] bg-[rgba(5,5,7,0.92)] backdrop-blur-[28px] saturate-[1.5] border-r border-[rgba(255,255,255,0.06)] p-5 flex flex-col gap-3 overflow-y-auto shadow-[10px_0_40px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-[280px]'}`}
      >
        <div className="flex flex-col gap-1.5 mb-3">
          <span className="badge-item-sidebar">Free</span>
          <span className="badge-item-sidebar">No Watermarks</span>
          <span className="badge-item-sidebar">Privacy-First</span>
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-md p-3">
          <h3 className="text-[0.62rem] tracking-[0.12em] uppercase font-bold text-[#576675] mb-2.5">Core Tools</h3>
          <nav className="flex flex-col gap-0.5">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeSidebar}
                  className={`flex items-center gap-2.5 px-2.5 py-2.5 text-sm font-semibold rounded-sm transition-all duration-300 border border-transparent no-underline ${
                    isActive
                      ? "bg-[rgba(6,182,212,0.10)] text-[#06b6d4] border-[rgba(6,182,212,0.15)]"
                      : "text-[#8d9aaa] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#e6edf5] hover:border-[rgba(255,255,255,0.06)] hover:translate-x-1"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                    <path d={link.icon} />
                  </svg>
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
