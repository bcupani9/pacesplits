import Link from "next/link";
import { BRAND_NAME } from "@/lib/brand";

export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`focus-ring-dark group inline-flex items-center gap-2.5 ${className}`}
      aria-label={BRAND_NAME}
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#e8703d] to-[#c1401f] shadow-[0_2px_8px_rgba(193,64,31,0.35)] transition-transform duration-150 group-hover:scale-105"
        aria-hidden="true"
      >
        <span className="flex flex-col items-center gap-[3px]">
          <span className="h-[2px] w-3 rounded-full bg-[#e6e1d2]/90" />
          <span className="h-[2px] w-4 rounded-full bg-[#e6e1d2]" />
          <span className="h-[2px] w-3 rounded-full bg-[#e6e1d2]/90" />
        </span>
      </span>
      <span className="inline-flex items-baseline tracking-tight">
        <span className="text-[15px] font-semibold text-[#1e1a16] sm:text-[16px]">
          Pace
        </span>
        <span className="text-[15px] font-bold text-[#c1401f] sm:text-[16px]">
          Splits
        </span>
      </span>
    </Link>
  );
}
