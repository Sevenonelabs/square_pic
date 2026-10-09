import { SocialMediaGuide, socialGuideMetadata } from "@/components/guides/social-media-guide";

export const metadata = socialGuideMetadata(2027);

export default function Page() {
  return <SocialMediaGuide year={2027} />;
}
