import { Suspense } from 'react';
import ContactClient from '@/components/ContactClient';
import Reveal from '@/components/Reveal';
import { siteUrl } from '@/config/site';

export const metadata = {
  title: 'Contact Us | Med Flow System',
  description:
    'Get in touch with Med Flow System — book a free consultation, request a billing audit, or send us a message about your practice.',
  alternates: { canonical: `${siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-base font-bold uppercase tracking-widest text-teal">Contact</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-ink sm:text-5xl">
              Let&apos;s talk about your revenue cycle
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-ink/75">
              Reach out for a free consultation, a free billing audit, or just to ask a
              question. We respond to every message.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Suspense fallback={<div className="text-base text-ink/60">Loading…</div>}>
          <ContactClient />
        </Suspense>
      </section>
    </main>
  );
}
