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
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#2F6FED] to-[#7C3AED] shadow-[0_2px_8px_rgba(47,111,237,0.35)] transition-transform duration-150 group-hover:scale-105"
        aria-hidden="true"
      >
        <span className="flex flex-col items-center gap-[3px]">
          <span className="h-[2px] w-3 rounded-full bg-white/90" />
          <span className="h-[2px] w-4 rounded-full bg-white" />
          <span className="h-[2px] w-3 rounded-full bg-white/90" />
        </span>
      </span>
      <span className="inline-flex items-baseline tracking-tight">
        <span className="text-[15px] font-semibold text-white sm:text-[16px]">
          Pace
        </span>
        <span className="bg-gradient-to-r from-[#6B9FFF] to-[#A78BFA] bg-clip-text text-[15px] font-bold text-transparent sm:text-[16px]">
          Splits
        </span>
      </span>
    </Link>
  );
}
