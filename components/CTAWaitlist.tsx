const WAITLIST_URL = "https://example.com/waitlist";

export default function CTAWaitlist() {
  return (
    <aside className="card-dark mt-5 p-5 sm:mt-6 sm:p-6">
      <h2 className="text-[17px] font-semibold text-white sm:text-[19px]">
        Want a full training plan built around this pace?
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-white/55">
        Join the waitlist for personalized workouts, weekly mileage, and race-day
        strategy tailored to your goal time.
      </p>
      <a
        href={WAITLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-brand focus-ring-dark mt-5 px-6 py-3.5 text-[15px] sm:text-[16px]"
      >
        Join the waitlist
      </a>
    </aside>
  );
}
