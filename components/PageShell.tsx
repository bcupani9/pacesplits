interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageShell({
  children,
  className = "",
}: PageShellProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-3xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 ${className}`}
    >
      {children}
    </div>
  );
}
