import type { Metadata } from "next";
import DistanceHub, { hubMetadata } from "@/components/DistanceHub";

export const metadata: Metadata = hubMetadata("10k");

export default function TenKPaceCalculatorPage() {
  return <DistanceHub distanceId="10k" />;
}
