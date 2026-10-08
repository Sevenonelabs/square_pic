"use client";

import { useCallback, useEffect, useRef } from "react";

export function useObjectUrls() {
  const urls = useRef(new Set<string>());
  const create = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    urls.current.add(url);
    return url;
  }, []);
  const revoke = useCallback((url: string) => {
    if (urls.current.delete(url)) URL.revokeObjectURL(url);
  }, []);
  const clear = useCallback(() => {
    urls.current.forEach((url) => URL.revokeObjectURL(url));
    urls.current.clear();
  }, []);
  const has = useCallback((url: string) => urls.current.has(url), []);
  useEffect(() => clear, [clear]);
  return { create, revoke, clear, has };
}
