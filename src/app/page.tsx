"use client";

import { useState, useCallback } from "react";
import { ToolAsHeroLayout } from "@/components/layout/tool-as-hero-layout";
import { JsonLd } from "@/components/schema-scripts";
import type { EditorState } from "@/lib/editor-renderer";

const DEFAULTS = {
  blur: 20, padding: 10, scale: 100, radius: 0, color: "#F0F5FA",
};

const COLOR_SWATCHES = [
  "#1E2328", "#787D82", "#F0F5FA", "#F0CDB4", "#B49B5A", "#F02328",
  "#F07D28", "#F0F528", "#1EF528", "#50C3FA", "#1E23FA", "#8C23FA",
  "#F055C8", "#782328", "#B4B928", "#1E2382",
];

export default function Home() {
  const [state, setState] = useState<EditorState>({
    image: null,
    mode: "blur",
    blurAmount: DEFAULTS.blur,
    paddingPercent: DEFAULTS.padding,
    imageScale: DEFAULTS.scale,
    cornerRadius: DEFAULTS.radius,
    backgroundColor: DEFAULTS.color,
    targetWidth: 0,
    targetHeight: 0,
  });

  const update = useCallback((partial: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "SquarePic",
        url: "https://www.squarepic.io",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.squarepic.io/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "SquarePic",
        alternateName: "Square Pic - Square Image Tool",
        url: "https://www.squarepic.io",
        description: "Free online square image maker and social media photo resizer. No uploads, no signup.",
        logo: "https://www.squarepic.io/images/logo.png",
        sameAs: ["https://github.com/Sevenonelabs/square_pic"],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "SquarePic",
        url: "https://www.squarepic.io",
        description: "Free online image editing toolkit. Square image maker, image resizer, compressor, converter, and cropper. Privacy-first, no uploads.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        dateModified: "2026-07-13",
      }} />
      <ToolAsHeroLayout
        state={state}
        onStateChange={update}
        headline={"Square Pic - Social Media Resizer"}
        highlightWord="Perfectly Square"
        badge="100% Free · No Signup · Privacy-First"
        colorSwatches={COLOR_SWATCHES}
      />

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "SquarePic - Free Square Image Maker",
        url: "https://www.squarepic.io",
        description: "Free online square image maker with blur backgrounds, solid fills, and smart crop. Privacy-first, no uploads, no signup.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        dateModified: "2026-07-13",
      }} />
    </>
  );
}

