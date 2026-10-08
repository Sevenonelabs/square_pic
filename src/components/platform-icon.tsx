import { PLATFORM_ICONS } from "@/data/social-icons";

export function PlatformIcon({ platform, className = "" }: { platform: string; className?: string }) {
  const key = platform.toLowerCase() === "x-twitter" ? "twitter" : platform.toLowerCase();
  const path = PLATFORM_ICONS[key];
  if (!path) return null;
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className={`inline-block size-[1.2em] shrink-0 align-[-0.15em] ${className}`}><path d={path} /></svg>;
}

export function PlatformTitle({ title }: { title: string }) {
  const key = Object.keys(PLATFORM_ICONS).find((platform) => new RegExp(`\\b${platform}\\b`, "i").test(title));
  return <>{key && <><PlatformIcon platform={key} />{" "}</>}{title}</>;
}
