export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How accurate are these pace calculators?",
    answer:
      "Each calculator divides your goal finish time evenly across every mile, so the math is exact for an even-pace race plan. If you run the listed pace at each mile marker, you will hit your goal time. Real courses add hills, weather, and crowds, so use these splits as a strong baseline — not a promise of how the day will feel.",
  },
  {
    question: "What's the difference between even pacing and negative splits?",
    answer:
      "Even pacing means holding the same mile pace from start to finish. Negative splits mean starting a little slower and finishing faster while still landing on the same total time — a strategy many runners use on hilly or hot courses. On any calculator page you can switch between even pace and negative split to see how your per-mile targets change.",
  },
  {
    question: "How do I use these splits on race day?",
    answer:
      "Glance at your watch or a course clock at each mile marker and compare your cumulative time to the split table. If you are ahead of schedule, ease back before you pay for it later; if you are behind, decide early whether to push or adjust your goal. Write a few key splits on your arm band or save them on your phone before the gun goes off.",
  },
  {
    question: "Are these calculators free to use?",
    answer:
      "Yes. Every calculator is free with no signup or account required. Pick a distance and goal time, get your pace and mile-by-mile splits instantly, and come back as often as you need while training or planning race day.",
  },
  {
    question: "What is the PaceSplits app?",
    answer:
      "The PaceSplits app is the next step beyond these free calculators. It will build a personalized training plan around your goal pace — workouts, weekly mileage, and race-day strategy tailored to your target time. Join the app waitlist on the homepage or any calculator page to get early access when it launches.",
  },
];
