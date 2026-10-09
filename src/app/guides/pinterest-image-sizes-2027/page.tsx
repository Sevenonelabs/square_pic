import { PlatformPlanningGuide, platformPlanningMetadata } from "@/components/guides/platform-planning-guide";

export const metadata = platformPlanningMetadata("pinterest");

export default function Page() {
  return <PlatformPlanningGuide id="pinterest" />;
}
