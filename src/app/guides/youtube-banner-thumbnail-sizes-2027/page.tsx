import { YouTubeGuide, youtubeGuideMetadata } from "@/components/guides/youtube-guide";

export const metadata = youtubeGuideMetadata(2027);

export default function Page() {
  return <YouTubeGuide year={2027} />;
}
