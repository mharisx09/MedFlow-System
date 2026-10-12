'use client';

import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/config/site';
import Reveal from '@/components/Reveal';

export default function Testimonials() {
  return (
    <div>
      <Reveal className="text-center">
        <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
          Trusted by practices like yours
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
          Real partnerships, real results, here&apos;s what practice owners and managers
          say about working with us.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.initials} delay={i * 100}>
            <figure className="group relative flex h-full flex-col rounded-2xl border border-mist bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft">
              <Quote size={28} className="text-teal/30 transition-colors group-hover:text-teal/60" />
              <div className="mt-3 flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-mist pt-5">
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-teal text-sm font-extrabold text-white"
                >
                  {t.initials}
                </span>
                <span>
                  <span className="block text-base font-bold text-ink">{t.name}</span>
                  <span className="block text-sm text-ink/60">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
