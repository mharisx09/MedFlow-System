import Link from 'next/link';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { serviceIcons } from '@/components/icons';
import { services, siteUrl } from '@/config/site';

export const metadata = {
  title: 'Our Services | Med Flow System',
  description:
    'Explore Med Flow System services: medical billing, coding, denial management, eligibility verification, credentialing, prior authorization, and more.',
  alternates: { canonical: `${siteUrl}/services` },
};

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-base font-bold uppercase tracking-widest text-teal">Services</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-ink sm:text-5xl">
              Full revenue cycle support for your practice
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-ink/75">
              From eligibility checks to final payment, we cover every step of the billing
              process. Use one service or hand us the entire cycle.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.slug] ?? FileCheck2;
              return (
                <Reveal key={service.slug} delay={(i % 3) * 80}>
                  <article className="flex h-full flex-col rounded-2xl border border-mist bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                    <span className="w-fit rounded-xl bg-teal/10 p-3 text-teal">
                      <Icon size={26} />
                    </span>
                    <h2 className="mt-5 text-xl font-bold text-ink">{service.title}</h2>
                    <p className="mt-2 flex-1 text-base text-ink/70">{service.short}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-5 inline-flex items-center gap-1 text-base font-bold text-teal hover:text-teal-dark"
                    >
                      Learn more <ArrowRight size={18} />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-14 text-center">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Not sure where to start?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-ink/70">
              Get a free billing audit and we will show you exactly where your revenue can
              improve.
            </p>
            <div className="mt-6">
              <Link
                href="/contact?type=audit"
                className="inline-block rounded-lg bg-teal px-8 py-4 text-base font-bold text-white transition-colors hover:bg-teal-dark"
              >
                Get a Free Audit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
