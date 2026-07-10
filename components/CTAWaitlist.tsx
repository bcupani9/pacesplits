"use client";

import { FormEvent, useState } from "react";
import { BRAND_NAME } from "@/lib/brand";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgqnloa";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CTAWaitlistProps {
  id?: string;
  className?: string;
}

export default function CTAWaitlist({ id, className = "" }: CTAWaitlistProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <aside
      id={id}
      className={`card-dark card-accent-top overflow-hidden p-5 sm:p-6 ${className}`}
      style={
        { "--distance-gradient": "var(--brand-gradient)" } as React.CSSProperties
      }
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#6b9fff]">
        Coming soon
      </p>
      <h2 className="mt-2 text-[17px] font-semibold text-white sm:text-[19px]">
        Get the {BRAND_NAME} app
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-white/55">
        These free calculators give you the splits. The {BRAND_NAME} app turns
        your goal pace into a full training plan — workouts, weekly mileage, and
        race-day strategy built around your target time.
      </p>

      {isSubmitted ? (
        <p className="mt-5 text-[15px] leading-relaxed text-white/75">
          You&apos;re on the list — we&apos;ll email you when the {BRAND_NAME}{" "}
          app launches.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5" noValidate>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError(null);
              }}
              placeholder="you@example.com"
              required
              disabled={isSubmitting}
              autoComplete="email"
              className="focus-ring-dark w-full rounded-xl border border-[var(--border-dark)] bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-white/35 transition-colors duration-150 disabled:opacity-60 sm:flex-1"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-brand focus-ring-dark shrink-0 px-6 py-3 text-[15px] disabled:cursor-not-allowed disabled:opacity-70 sm:text-[16px]"
            >
              {isSubmitting ? "Joining..." : "Join the app waitlist"}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-[13px] text-[#ff8f74]" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
    </aside>
  );
}
