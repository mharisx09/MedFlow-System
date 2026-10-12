import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Building2,
  Headset,
  FileCheck2,
  Users,
  BadgeDollarSign,
  Stethoscope,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { siteConfig, services, specialties, softwareList, defaultFaqs, placeholderStats } from '@/config/site';
import { prisma } from '@/lib/prisma';
import { serviceIcons, specialtyIcons } from '@/components/icons';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import FaqAccordion from '@/components/FaqAccordion';
import LeadForm from '@/components/LeadForm';
import Testimonials from '@/components/Testimonials';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Medical Billing Services & Revenue Cycle Management for US Healthcare Providers',
  description:
    'Med Flow System provides medical billing, coding, denial management, and full revenue cycle support for US healthcare providers. Free billing audit available.',
};

const tickerItems = [
  'Medical Billing',
  'Denial Management',
  'AR Follow-Up',
  'Eligibility Verification',
  'Medical Coding',
  'Provider Credentialing',
  'Prior Authorization',
  'Payment Posting',
];

const trustItems = [
  { icon: ShieldCheck, title: 'HIPAA-compliant processes', text: 'Your data is handled with care at every step.' },
  { icon: Building2, title: 'US-based practices served', text: 'Built around how American practices actually work.' },
  { icon: Headset, title: '24/7 support', text: 'Reach a real person whenever you need help.' },
];

const benefits = [
  {
    icon: FileCheck2,
    title: 'Cleaner claims, fewer denials',
    text: 'Accurate coding and scrubbed claims before submission mean fewer rejections and faster payments.',
  },
  {
    icon: Users,
    title: 'A dedicated team behind you',
    text: 'Work with specialists who know your specialty and treat your revenue like their own.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Clear, honest pricing',
    text: 'Straightforward pricing with no hidden fees and no surprise line items.',
  },
  {
    icon: Stethoscope,
    title: 'Built for your specialty',
    text: 'Workflows tuned to your field — from primary care to dental to behavioral health.',
  },
  {
    icon: BarChart3,
    title: 'Reporting you can understand',
    text: 'Plain-language reports on collections, denials, and AR so you always know where you stand.',
  },
];

const steps = [
  {
    title: 'Onboard',
    text: 'We learn your practice, systems, and payers, then set up a clean handoff for your billing.',
  },
  {
    title: 'Verify & Bill',
    text: 'We verify eligibility, code accurately, and submit clean claims on time.',
  },
  {
    title: 'Follow Up',
    text: 'We chase every unpaid claim, work denials, and keep your AR aging down.',
  },
  {
    title: 'Report',
    text: 'You get clear monthly reports showing exactly what was collected and why.',
  },
];

export default async function HomePage() {
  let faqs = defaultFaqs;
  try {
    const dbFaqs = await prisma.faq.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (dbFaqs.length > 0) {
      faqs = dbFaqs.map((f) => ({ question: f.question, answer: f.answer }));
    }
  } catch {
    faqs = defaultFaqs;
  }

  /** Structured FAQ data — lets Google show our Q&As directly in search results. */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-mist">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="animate-blob absolute -left-24 -top-24 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
          <div
            className="animate-blob absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-navy/15 blur-3xl"
            style={{ animationDelay: '3s' }}
          />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <>
            <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
              Medical billing that keeps your revenue flowing
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/75">
              Med Flow System handles your billing, coding, and insurance follow-up end to end —
              so your practice gets paid faster and you get back to patient care.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#audit"
                className="rounded-lg bg-teal px-7 py-3.5 text-base font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-teal-dark hover:shadow-lg"
              >
                Get a Free Audit
              </Link>
              <Link
                href="#services"
                className="rounded-lg border-2 border-navy px-7 py-3 text-base font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-navy hover:text-white"
              >
                Our Services
              </Link>
            </div>
          </>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/hero.webp"
                alt="Healthcare team working together"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="animate-float absolute left-4 top-4 flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur">
                <ShieldCheck size={18} className="text-teal" />
                <span className="text-sm font-bold text-ink">HIPAA-compliant workflows</span>
              </div>
              <div className="animate-float-slow absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur">
                <BarChart3 size={18} className="text-teal" />
                <span className="text-sm font-bold text-ink">Denials worked daily</span>
              </div>
            </div>
        </div>
      </section>

      {/* Services ticker */}
      <div className="overflow-hidden bg-navy py-4" aria-hidden="true">
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center">
                {tickerItems.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="flex items-center text-sm font-bold uppercase tracking-[0.2em] text-white/90"
                  >
                    <span className="px-6">{item}</span>
                    <span className="inline-block h-2 w-2 rotate-45 bg-teal" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <section className="border-b border-mist bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {trustItems.map((item) => (
            <Reveal key={item.title} className="flex items-start gap-4">
              <span className="rounded-xl bg-mist p-3 text-teal">
                <item.icon size={26} />
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink">{item.title}</h2>
                <p className="mt-1 text-base text-ink/70">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="text-center">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Our services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
              Full revenue cycle support — pick one service or hand us the whole process.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, i) => {
              const Icon = serviceIcons[service.slug] ?? FileCheck2;
              return (
                <Reveal key={service.slug} delay={i * 80}>
                  <article className="flex h-full flex-col rounded-2xl border border-mist bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft">
                    <span className="w-fit rounded-xl bg-teal/10 p-3 text-teal">
                      <Icon size={26} />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-ink">{service.title}</h3>
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
          <Reveal className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-block rounded-lg bg-navy px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-navy-dark"
            >
              View all services
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {placeholderStats.map((stat) => (
              <Counter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/60">
            Sample metrics — replace with your real numbers.
          </p>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <Reveal variant="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/doctors.webp"
                alt="Physicians reviewing patient care together"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
                Why choose Med Flow System
              </h2>
              <p className="mt-4 text-lg text-ink/70">
                We take the billing burden off your plate so your staff can focus on patients,
                not paperwork.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-6">
              {benefits.map((benefit, i) => (
                <Reveal key={benefit.title} delay={i * 70}>
                  <li className="flex items-start gap-4">
                    <span className="rounded-xl bg-white p-3 text-teal shadow-sm">
                      <benefit.icon size={24} />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{benefit.title}</h3>
                      <p className="mt-1 text-base text-ink/70">{benefit.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="text-center">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">How it works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
              A simple four-step process that starts paying off from day one.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-mist bg-mist/60 p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal text-xl font-extrabold text-white">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-base text-ink/70">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties preview */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="text-center">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Specialties we support
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
              Billing expertise tuned to the way your specialty works.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {specialties.map((specialty, i) => {
              const Icon = specialtyIcons[specialty.name] ?? Stethoscope;
              return (
                <Reveal key={specialty.name} delay={i * 50}>
                  <Link
                    href="/specialties"
                    className="flex h-full flex-col items-center gap-3 rounded-2xl border border-mist bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                  >
                    <span className="rounded-xl bg-teal/10 p-3 text-teal">
                      <Icon size={24} />
                    </span>
                    <span className="text-base font-bold text-ink">{specialty.name}</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Software */}
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Software we work with</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
              We adapt to your EHR and practice management system — no painful migrations required.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
              {softwareList.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-base font-semibold text-ink"
                >
                  {name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Audit */}
      <section id="audit" className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/dashboard.webp"
                alt="Billing performance dashboard"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Get a free billing audit</h2>
            <p className="mt-4 text-lg text-ink/70">
              Not sure where your revenue is leaking? We will review your recent claims, denials,
              and AR — free, with no obligation — and show you exactly what could improve.
            </p>
            <div className="mt-8 rounded-2xl border border-mist bg-mist/60 p-6 sm:p-8">
              <LeadForm type="audit" compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="text-center">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-8">
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Testimonials />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to fix your revenue cycle?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
              Talk to our team today — or call us at{' '}
              <a href={siteConfig.phoneHref} className="font-bold text-white underline">
                {siteConfig.phone}
              </a>
              .
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
