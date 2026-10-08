"use client";

import { useCallback, useEffect, useRef } from "react";

// Keep decoded image URLs alive for previews, and ignore replaced uploads.
export function useImageLoader() {
  const activeUrl = useRef<string | null>(null);
  const pending = useRef<{ image: HTMLImageElement; url: string | null } | null>(null);

  const cancelPending = useCallback(() => {
    const job = pending.current;
    pending.current = null;
    if (job) {
      job.image.onload = null;
      job.image.onerror = null;
      if (job.url) URL.revokeObjectURL(job.url);
    }
  }, []);

  const clearImage = useCallback(() => {
    cancelPending();
    if (activeUrl.current) URL.revokeObjectURL(activeUrl.current);
    activeUrl.current = null;
  }, [cancelPending]);

  useEffect(() => clearImage, [clearImage]);

  const loadImage = useCallback((source: File | string, onLoad: (image: HTMLImageElement) => void, onError: () => void) => {
    cancelPending();
    const url = typeof source === "string" ? null : URL.createObjectURL(source);
    const image = new Image();
    const job = { image, url };
    pending.current = job;
    image.onload = () => {
      if (pending.current !== job) return;
      pending.current = null;
      image.onload = null;
      image.onerror = null;
      if (activeUrl.current) URL.revokeObjectURL(activeUrl.current);
      activeUrl.current = url;
      onLoad(image);
    };
    image.onerror = () => {
      if (pending.current !== job) return;
      cancelPending();
      onError();
    };
    image.src = url ?? source as string;
  }, [cancelPending]);

  return { loadImage, clearImage };
}
