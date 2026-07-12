export function trackEvent(action: string, label?: string, value?: number) {
  if (typeof window === "undefined" || !(window as any).gtag) return;
  try {
    (window as any).gtag("event", action, {
      event_category: "tool",
      event_label: label,
      value: value,
    });
  } catch { }
}
