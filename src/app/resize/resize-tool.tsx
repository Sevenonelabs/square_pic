"use client";

import { useState, useCallback, useEffect } from "react";
import { ToolAsHeroLayout } from "@/components/layout/tool-as-hero-layout";
import PRESETS from "@/data/social-presets.json";
import type { EditorState } from "@/lib/editor-renderer";

const DEFAULTS = {
  blur: 20, padding: 10, scale: 100, radius: 0, color: "#F0F5FA",
};

const COLOR_SWATCHES = [
  "#1E2328", "#787D82", "#F0F5FA", "#F0CDB4", "#B49B5A", "#F02328",
  "#F07D28", "#F0F528", "#1EF528", "#50C3FA", "#1E23FA", "#8C23FA",
  "#F055C8", "#782328", "#B4B928", "#1E2382",
];

export function ResizeTool({ platform }: { platform: string }) {
  const presets = PRESETS as Record<string, { label: string; types: Record<string, { w: number; h: number }> }>;
  const config = presets[platform];
  const defaultPreset = Object.keys(config.types)[0];
  const first = config.types[defaultPreset];
  const [state, setState] = useState<EditorState>({
    image: null,
    mode: "blur",
    blurAmount: DEFAULTS.blur,
    paddingPercent: DEFAULTS.padding,
    imageScale: DEFAULTS.scale,
    cornerRadius: DEFAULTS.radius,
    backgroundColor: DEFAULTS.color,
    targetWidth: first.w,
    targetHeight: first.h,
  });

  const update = useCallback((partial: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...partial }));
    if (partial.targetWidth !== undefined) {
      const preset = Object.entries(config.types).find(([, t]) => t.w === partial.targetWidth && t.h === partial.targetHeight)?.[0];
      const url = new URL(window.location.href);
      if (preset) url.searchParams.set("preset", preset);
      else url.searchParams.delete("preset");
      window.history.pushState(null, "", url);
    }
  }, [config.types]);

  useEffect(() => {
    const sync = () => {
      const key = new URLSearchParams(window.location.search).get("preset") || defaultPreset;
      const preset = config.types[key] || first;
      setState((prev) => ({ ...prev, targetWidth: preset.w, targetHeight: preset.h }));
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [config.types, defaultPreset, first]);

  return (
    <ToolAsHeroLayout
      state={state}
      onStateChange={update}
      headline={`${config.label} image resizer`}
      initialPlatform={platform}
      showHeading={false}
      highlightWord="Social Media Resizer"
      badge="100% Free · No Signup · Privacy-First"
      colorSwatches={COLOR_SWATCHES}
    />
  );
}
