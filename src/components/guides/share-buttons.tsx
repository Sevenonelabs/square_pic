"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/constants";

export function ShareButtons({ path, title }: { path: string; title: string }) {
  const url = `${SITE_URL}${path}`;
  const [message, setMessage] = useState("");
  const encodedUrl = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const links = [
    { label: "X", href: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${text}%20${encodedUrl}` },
  ];
  const control = "inline-flex min-h-11 items-center justify-center rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-[#abb8c7] hover:text-[var(--accent)] hover:border-[var(--accent)]/40";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Page link copied.");
    } catch {
      setMessage("Copy this page link from the field below.");
    }
  }

  async function share() {
    if (typeof navigator.share !== "function") {
      setMessage("Choose a social link or copy the page link.");
      return;
    }
    try {
      await navigator.share({ title, url });
      setMessage("Page shared.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("Sharing is unavailable. Choose a social link or copy the page link.");
    }
  }

  return (
    <div aria-label="Share this page" className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-[#abb8c7]">Share this page</span>
      {links.map(({ label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={control}>
          Share on {label}
        </a>
      ))}
      <button type="button" onClick={copyLink} className={control}>Copy page link</button>
      <button type="button" onClick={share} className={control}>More sharing options</button>
      <span role="status" className="basis-full min-h-6 text-sm text-[#abb8c7]">{message}</span>
      {message.startsWith("Copy this") && <input aria-label="Page link to copy" value={url} readOnly onFocus={(event) => event.currentTarget.select()} className="basis-full min-h-11 rounded-md border border-white/10 bg-black/20 px-3 text-base" />}
    </div>
  );
}
