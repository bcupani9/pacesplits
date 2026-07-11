import type { Metadata } from "next";
import DistanceHub, { hubMetadata } from "@/components/DistanceHub";

export const metadata: Metadata = hubMetadata("marathon");

export default function MarathonPaceCalculatorPage() {
  return <DistanceHub distanceId="marathon" />;
}
