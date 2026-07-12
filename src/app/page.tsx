"use client";

import { useState, useCallback } from "react";
import { ToolAsHeroLayout } from "@/components/layout/tool-as-hero-layout";
import { ToolLinks } from "@/components/layout/tool-links";
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
        "@type": "Organization",
        name: "SquarePic",
        alternateName: "Square Pic - Square Image Tool",
        url: "https://squarepic-next.vercel.app",
        description: "Free online square image maker and social media photo resizer. No uploads, no signup.",
        logo: "https://squarepic-next.vercel.app/images/logo.png",
        sameAs: ["https://github.com/Sevenonelabs/square_pic"],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "SquarePic - Free Square Image Maker",
        url: "https://squarepic-next.vercel.app",
        description: "Make any photo perfectly square for Instagram and social media. Free online image resizer with blur backgrounds, solid fills, and smart crop.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }} />
      <ToolAsHeroLayout
        state={state}
        onStateChange={update}
        headline="Make Any Image Perfectly Square Online with SquarePic – Social Media Resizer"
        highlightWord="Perfectly Square"
        badge="100% Free · No Signup · Privacy-First"
        colorSwatches={COLOR_SWATCHES}
      />

      <ToolLinks />
    </>
  );
}
