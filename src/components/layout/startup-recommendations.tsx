"use client";

import { useState } from "react";
import Script from "next/script";

export function StartupRecommendations() {
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);

  function enable() {
    // Reserve the widget's space before its script can insert the bar.
    document.documentElement.dataset.startupbar = "enabled";
    setEnabled(true);
  }

  return (
    <div className="mt-4 text-center text-sm text-[#8d9aaa]">
      {!enabled && <button type="button" onClick={enable} className="min-h-11 px-3 underline underline-offset-4 hover:text-[var(--accent)]">Show startup recommendations</button>}
      {enabled && <>
        <Script src="https://startupbar.co/widget/loader.js" data-startup-id="1a065196-b7e8-4bec-9e25-1af9492b9cc0" strategy="afterInteractive" onError={() => {
          delete document.documentElement.dataset.startupbar;
          setFailed(true);
        }} />
        <p role="status">{failed ? "Recommendations could not load." : "Startup recommendations enabled for this visit."}</p>
        <a href="https://startupbar.co" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">Visit StartupBar</a>
      </>}
    </div>
  );
}
