'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Faq = {
  question: string;
  answer: string;
};

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-mist bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              aria-controls={`faq-panel-${index}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-base font-bold text-ink">{faq.question}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-teal transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              id={`faq-panel-${index}`}
              className={`grid transition-all duration-300 ease-in-out ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-base leading-relaxed text-ink/80">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
