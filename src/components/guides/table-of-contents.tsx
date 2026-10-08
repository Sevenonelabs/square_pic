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
      { rootMargin: "-128px 0px -60% 0px" }
    );

    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <details className="guide-outline bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 mb-8">
      <summary className="min-h-11 cursor-pointer text-lg font-bold text-[#e6edf5]">On this page</summary>
      <nav aria-label="Table of contents">
      <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={`block text-base no-underline transition-colors py-2 ${
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
    </details>
  );
}
