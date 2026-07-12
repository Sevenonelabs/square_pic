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

const THEME_KEYS = Object.keys(THEMES);

function getRandomTheme(): ThemeColor {
  const key = THEME_KEYS[Math.floor(Math.random() * THEME_KEYS.length)];
  return THEMES[key];
}

function applyToDocument(accent: string, glow: string) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-glow", glow);
}

interface ThemeState {
  current: ThemeColor;
  apply: (accent: string, glow: string) => void;
  pickRandom: () => void;
}

export const useTheme = create<ThemeState>((set) => ({
  current: THEMES.violet,
  apply: (accent, glow) => {
    applyToDocument(accent, glow);
    set({ current: { accent, glow } });
  },
  pickRandom: () => {
    const t = getRandomTheme();
    applyToDocument(t.accent, t.glow);
    set({ current: t });
  },
}));
