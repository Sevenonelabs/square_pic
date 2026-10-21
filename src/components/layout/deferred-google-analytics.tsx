"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// The event queue is initialized in the root layout. Keep the analytics library
// out of initial rendering and the visitor's first action, including uploads.
export function DeferredGoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idle: number | undefined;
    const events = ["pointerdown", "keydown", "scroll"] as const;
    const detach = () => events.forEach((event) => window.removeEventListener(event, activate));
    function activate() {
      detach();
      timer = setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idle = window.requestIdleCallback(() => setEnabled(true), { timeout: 3000 });
        } else {
          setEnabled(true);
        }
      }, 1500);
    }
    events.forEach((event) => window.addEventListener(event, activate, { passive: true }));
    return () => {
      detach();
      clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
    };
  }, []);

  return enabled ? <Script src="https://www.googletagmanager.com/gtag/js?id=G-9TTBK0ZDM5" strategy="afterInteractive" /> : null;
}
