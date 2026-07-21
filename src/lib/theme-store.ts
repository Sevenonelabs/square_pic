"use client";

import { create } from "zustand";

export interface ThemeColor {
  accent: string;
  glow: string;
}

export const THEMES: Record<string, ThemeColor> = {
  neon: { accent: "#00e5ff", glow: "rgba(0,229,255,0.35)" },
  lime: { accent: "#84cc16", glow: "rgba(132,204,22,0.3)" },
  emerald: { accent: "#10b981", glow: "rgba(16,185,129,0.3)" },
  cyan: { accent: "#06b6d4", glow: "rgba(6,182,212,0.3)" },
  violet: { accent: "#8b5cf6", glow: "rgba(139,92,246,0.3)" },
  rose: { accent: "#f43f5e", glow: "rgba(244,63,94,0.3)" },
  amber: { accent: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
};

const THEME_KEYS = Object.keys(THEMES);

function getRandomTheme(): { name: string; color: ThemeColor } {
  const key = THEME_KEYS[Math.floor(Math.random() * THEME_KEYS.length)];
  return { name: key, color: THEMES[key] };
}

function applyToDocument(accent: string, glow: string) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-glow", glow);
}

let animFrameId: number | null = null;

function stopAnimation() {
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
}

function startHueAnimation(set: (s: Partial<ThemeState>) => void) {
  if (typeof window === "undefined") return;
  let hue = 0;
  const tick = () => {
    hue = (hue + 1 / 6) % 360;
    const accent = `hsl(${hue}, 100%, 55%)`;
    const glow = `hsla(${hue}, 100%, 55%, 0.35)`;
    applyToDocument(accent, glow);
    set({ current: { accent, glow } });
    animFrameId = requestAnimationFrame(tick);
  };
  animFrameId = requestAnimationFrame(tick);
}

interface ThemeState {
  current: ThemeColor;
  apply: (accent: string, glow: string) => void;
  pickRandom: () => void;
}

export const useTheme = create<ThemeState>((set) => ({
  current: THEMES.lime,
  apply: (accent, glow) => {
    stopAnimation();
    applyToDocument(accent, glow);
    set({ current: { accent, glow } });
  },
  pickRandom: () => {
    const { name, color } = getRandomTheme();
    stopAnimation();
    if (name === "neon") {
      startHueAnimation(set);
    } else {
      applyToDocument(color.accent, color.glow);
    }
    set({ current: color });
  },
}));

export function applyNeon(accent: string, glow: string) {
  const state = useTheme.getState();
  if (state.current.accent === accent && state.current.glow === glow) return;
  stopAnimation();
  startHueAnimation(useTheme.setState);
}
