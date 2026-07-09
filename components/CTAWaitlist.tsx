const WAITLIST_URL = "https://example.com/waitlist";

export default function CTAWaitlist() {
  return (
    <aside className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
        Want a full training plan built around this pace?
      </h2>
      <p className="mt-2 text-sm text-gray-600 sm:text-base">
        Join the waitlist for personalized workouts, weekly mileage, and race-day
        strategy tailored to your goal time.
      </p>
      <a
        href={WAITLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        Join the waitlist
      </a>
    </aside>
  );
}
