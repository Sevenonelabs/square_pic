import { PlatformPlanningGuide, platformPlanningMetadata } from "@/components/guides/platform-planning-guide";

export const metadata = platformPlanningMetadata("facebook");

export default function Page() {
  return <PlatformPlanningGuide id="facebook" />;
}
