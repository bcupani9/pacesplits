import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import FloatingNav from "@/components/FloatingNav";
import { BRAND_NAME } from "@/lib/brand";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacesplits-app.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND_NAME} — Running Pace Calculators`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Free running pace calculators with mile-by-mile splits for 5K, 10K, half marathon, and marathon goal times. Join the PaceSplits app waitlist for personalized training plans.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} — Running Pace Calculators`,
    description:
      "Free running pace calculators with mile-by-mile splits for every race distance and goal time. Join the PaceSplits app waitlist for personalized training plans.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} — Running Pace Calculators`,
    description:
      "Free running pace calculators with mile-by-mile splits for every race distance and goal time. Join the PaceSplits app waitlist for personalized training plans.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <div className="site-atmospheric fixed inset-0 -z-20" aria-hidden="true" />
        <div className="site-grain fixed inset-0 -z-10" aria-hidden="true" />

        <FloatingNav />
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>

          <footer className="relative border-t border-white/10">
            <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
              <p className="text-[13px] text-white/50">
                The {BRAND_NAME} app — training plans built around your race pace
                — is coming soon.{" "}
                <a
                  href="/#waitlist"
                  className="focus-ring-dark text-[#6b9fff] transition-colors duration-150 hover:text-[#8bb3ff]"
                >
                  Join the waitlist
                </a>
              </p>
              <p className="mt-2 text-[13px] text-white/40">
                © {new Date().getFullYear()} {BRAND_NAME}
              </p>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
