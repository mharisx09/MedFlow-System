import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { specialtyIcons } from '@/components/icons';
import { specialties } from '@/config/site';

export const metadata = {
  title: 'Specialties We Support | Med Flow System',
  description:
    'Med Flow System provides medical billing and revenue cycle services for primary care, dental, mental health, cardiology, orthopedics, urgent care, and more.',
};

export default function SpecialtiesPage() {
  return (
    <main>
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-base font-bold uppercase tracking-widest text-teal">
              Specialties
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-ink sm:text-5xl">
              Billing expertise for your specialty
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-ink/75">
              Every specialty bills differently — different codes, different payer rules,
              different denial patterns. Our team understands those differences and builds
              workflows around them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((specialty, i) => {
              const Icon = specialtyIcons[specialty.name] ?? Stethoscope;
              return (
                <Reveal key={specialty.name} delay={(i % 4) * 70}>
                  <article className="h-full rounded-2xl border border-mist bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                    <span className="w-fit rounded-xl bg-teal/10 p-3 text-teal">
                      <Icon size={26} />
                    </span>
                    <h2 className="mt-4 text-xl font-bold text-ink">{specialty.name}</h2>
                    <p className="mt-2 text-base text-ink/70">{specialty.blurb}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12">
            <div className="rounded-2xl bg-mist p-8 text-center">
              <h2 className="text-2xl font-extrabold text-ink">
                Don&apos;t see your specialty?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base text-ink/70">
                We work with practices across many fields of care. If your specialty is not
                listed here, reach out — chances are we can support you, and we will be
                upfront if we can&apos;t.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-block rounded-lg bg-navy px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-navy-dark"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Get billing that fits your specialty
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
              Start with a free consultation and see how our team supports practices like yours.
            </p>
            <div className="mt-8">
              <Link
                href="/contact?type=consultation"
                className="inline-block rounded-lg bg-teal px-8 py-4 text-base font-bold text-white transition-colors hover:bg-teal-dark"
              >
                Book a Free Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
