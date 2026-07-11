import type { Metadata } from "next";
import DistanceHub, { hubMetadata } from "@/components/DistanceHub";

export const metadata: Metadata = hubMetadata("5k");

export default function FiveKPaceCalculatorPage() {
  return <DistanceHub distanceId="5k" />;
}
