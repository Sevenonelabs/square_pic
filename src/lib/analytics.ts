type GtagWindow = Window & typeof globalThis & { gtag?: (...args: unknown[]) => void };

export function trackEvent(action: string, label?: string, value?: number) {
  if (typeof window === "undefined") return;
  const win = window as GtagWindow;
  if (!win.gtag) return;
  try {
    win.gtag("event", action, {
      event_category: "tool",
      event_label: label,
      value: value,
    });
  } catch { }
}
