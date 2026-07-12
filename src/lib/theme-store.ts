"use client";

import { create } from "zustand";

export interface ThemeColor {
  accent: string;
  glow: string;
}

export const THEMES: Record<string, ThemeColor> = {
  lime: { accent: "#84cc16", glow: "rgba(132,204,22,0.3)" },
  emerald: { accent: "#10b981", glow: "rgba(16,185,129,0.3)" },
  cyan: { accent: "#06b6d4", glow: "rgba(6,182,212,0.3)" },
  violet: { accent: "#8b5cf6", glow: "rgba(139,92,246,0.3)" },
  rose: { accent: "#f43f5e", glow: "rgba(244,63,94,0.3)" },
  amber: { accent: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
};

interface ThemeState {
  current: ThemeColor;
  apply: (accent: string, glow: string) => void;
}

function getRandomTheme(): ThemeColor {
  if (typeof window === "undefined") return THEMES.cyan;
  const keys = Object.keys(THEMES);
  const key = keys[Math.floor(Math.random() * keys.length)];
  return THEMES[key];
}

function applyToDocument(accent: string, glow: string) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-glow", glow);
}

export const useTheme = create<ThemeState>((set) => {
  const initial = getRandomTheme();
  applyToDocument(initial.accent, initial.glow);

  return {
    current: initial,
    apply: (accent, glow) => {
      applyToDocument(accent, glow);
      set({ current: { accent, glow } });
    },
  };
});
