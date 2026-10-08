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

// Fixed tool/format labels only. Never include image names, URLs or pixel content.
export function trackToolEvent(action: "upload_accepted" | "processing_success" | "processing_error" | "download", tool: "square" | "resizer" | "converter" | "compressor" | "cropper" | "upscaler" | "calculator", format?: string, context?: { mode: "blur" | "solid" | "transparent" | "crop"; source?: "upload" | "sample" }) {
  if (typeof window === "undefined") return;
  const win = window as GtagWindow;
  try { win.gtag?.("event", `tool_${action}`, {
    tool_name: tool,
    device_layout: window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop",
    ...(format ? { output_format: format } : {}),
    ...(context ? { editor_mode: context.mode, ...(context.source ? { input_source: context.source } : {}) } : {}),
  }); } catch { }
}
