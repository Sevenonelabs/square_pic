import editions from "@/data/guide-editions-2027.json";

export function edition2027ForPath(path: string) {
  const slug = path.replace(/^\/guides\//, "").replace(/-202[67]$/, "");
  return editions[slug as keyof typeof editions];
}
