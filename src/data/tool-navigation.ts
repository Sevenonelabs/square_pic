import presets from "@/data/social-presets.json";

export const RESIZE_LINKS = Object.entries(presets).map(([key, platform]) => ({
  key,
  label: platform.label,
  href: `/resize/${key === "twitter" ? "x-twitter" : key}`,
}));

export const CONVERT_LINKS = [
  { href: "/converter/png-to-jpg", label: "PNG to JPG" },
  { href: "/converter/jpg-to-png", label: "JPG to PNG" },
  { href: "/converter/png-to-webp", label: "PNG to WebP" },
  { href: "/converter/jpg-to-webp", label: "JPG to WebP" },
  { href: "/converter/webp-to-png", label: "WebP to PNG" },
  { href: "/converter/webp-to-jpg", label: "WebP to JPG" },
  { href: "/converter/png-to-ico", label: "PNG to ICO" },
  { href: "/converter/jpg-to-ico", label: "JPG to ICO" },
];
