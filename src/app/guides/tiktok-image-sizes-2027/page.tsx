import { PlatformPlanningGuide, platformPlanningMetadata } from "@/components/guides/platform-planning-guide";

export const metadata = platformPlanningMetadata("tiktok");

export default function Page() {
  return <PlatformPlanningGuide id="tiktok" />;
}
