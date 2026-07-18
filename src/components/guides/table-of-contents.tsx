"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
  level: number;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 mb-8" aria-label="Table of contents">
      <h2 className="text-[0.75rem] font-extrabold text-[#576675] tracking-wider uppercase mb-2">On this page</h2>
      <ul className="list-none p-0 m-0 space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-[0.78rem] no-underline transition-colors py-0.5 ${
                item.level === 2
                  ? "pl-0 font-semibold"
                  : "pl-3 font-normal"
              } ${
                activeId === item.id
                  ? "text-[var(--accent)]"
                  : "text-[#8d9aaa] hover:text-[#e6edf5]"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
