import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, FileCheck2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { serviceIcons } from '@/components/icons';
import { services } from '@/config/site';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Service | Med Flow System' };
  return {
    title: `${service.title} | Med Flow System`,
    description: service.short,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.slug] ?? FileCheck2;

  return (
    <main>
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-base text-ink/60">
              <Link href="/services" className="font-semibold text-teal hover:text-teal-dark">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span>{service.title}</span>
            </nav>
            <div className="mt-6 flex items-center gap-4">
              <span className="rounded-xl bg-teal/10 p-4 text-teal">
                <Icon size={32} />
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold text-ink sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-ink/75">{service.short}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Overview</h2>
            <div className="mt-5 space-y-4">
              {service.description.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed text-ink/75">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Key benefits</h2>
            <ul className="mt-5 space-y-3">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-teal" />
                  <span className="text-base text-ink/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Our process</h2>
            <ol className="mt-5 space-y-5">
              {service.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-lg font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                    <p className="mt-1 text-base text-ink/70">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Want help with {service.title.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
              Talk to our team about how this service fits your practice — or start with a
              free billing audit.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=consultation"
                className="rounded-lg bg-teal px-8 py-4 text-base font-bold text-white transition-colors hover:bg-teal-dark"
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/contact?type=audit"
                className="rounded-lg border-2 border-white px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-white hover:text-navy"
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
