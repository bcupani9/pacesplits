import type { Metadata } from "next";
import DistanceHub, { hubMetadata } from "@/components/DistanceHub";

export const metadata: Metadata = hubMetadata("half-marathon");

export default function HalfMarathonPaceCalculatorPage() {
  return <DistanceHub distanceId="half-marathon" />;
}
