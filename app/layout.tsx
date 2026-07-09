import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacesplits.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PaceSplits — Running Pace Calculators",
    template: "%s | PaceSplits",
  },
  description:
    "Free running pace calculators with mile-by-mile splits for 5K, 10K, half marathon, and marathon goal times.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "PaceSplits",
    title: "PaceSplits — Running Pace Calculators",
    description:
      "Free running pace calculators with mile-by-mile splits for every race distance and goal time.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaceSplits — Running Pace Calculators",
    description:
      "Free running pace calculators with mile-by-mile splits for every race distance and goal time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight text-gray-900 hover:text-emerald-700"
              >
                PaceSplits
              </Link>
              <nav className="text-sm text-gray-600">
                <Link href="/" className="hover:text-gray-900">
                  All calculators
                </Link>
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
            {children}
          </main>

          <footer className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} PaceSplits. Free running pace
                calculators for every goal time.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
