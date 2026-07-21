import Link from "next/link";
import Wordmark from "@/components/Wordmark";

const navLinks = [
  { href: "/calculators", label: "Calculators" },
  { href: "/about", label: "About" },
];

export default function FloatingNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <nav
        aria-label="Main navigation"
        className="nav-floating pointer-events-auto mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-2.5 sm:px-5 sm:py-3"
      >
        <Wordmark className="shrink-0" />

        <ul className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="focus-ring-dark rounded-full px-3 py-1.5 text-[13px] font-medium text-[#1e1a16]/70 transition-colors duration-150 ease-in-out hover:bg-[#1e1a16]/8 hover:text-[#1e1a16] sm:px-4 sm:text-[14px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
