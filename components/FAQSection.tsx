"use client";

import { useState } from "react";
import type { FAQItem } from "@/lib/faq";

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  className?: string;
  headingClassName?: string;
}

export default function FAQSection({
  items,
  title = "Frequently asked questions",
  className = "mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6 sm:pb-20",
  headingClassName = "text-[28px] font-semibold leading-tight tracking-tight text-[var(--cp-ink)] sm:text-[34px]",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="faq-heading" className={className}>
      <h2 id="faq-heading" className={headingClassName}>
        {title}
      </h2>

      <div className="card-dark mt-6 overflow-hidden">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className={
                index < items.length - 1
                  ? "border-b border-[var(--border-dark)]"
                  : undefined
              }
            >
              <h3>
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() =>
                    setOpenIndex((current) =>
                      current === index ? null : index
                    )
                  }
                  className="focus-ring-dark flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-[var(--cp-ink)]/[0.03] sm:px-6"
                >
                  <span
                    className="text-[15px] font-semibold sm:text-[16px]"
                    style={{ color: "var(--cp-ink)" }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="faq-icon shrink-0"
                    style={{ color: "var(--cp-graphite)" }}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                aria-hidden={!isOpen}
                data-open={isOpen}
                className="accordion-panel"
              >
                <div>
                  <p
                    className="px-5 pb-4 text-[15px] leading-relaxed sm:px-6"
                    style={{ color: "var(--cp-graphite)" }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
