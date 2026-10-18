import Link from 'next/link';
import { CheckCircle2, FileSearch, ClipboardList, BarChart3 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import LeadForm from '@/components/LeadForm';
import { siteUrl } from '@/config/site';

export const metadata = {
  title: 'Free Medical Billing Audit | Med Flow System',
  description:
    'Get a free billing audit for your practice. We review your denials, AR aging, and coding to show you exactly where revenue is leaking, with no obligation.',
  alternates: { canonical: `${siteUrl}/free-audit` },
};

const checks = [
  {
    title: 'Denial analysis',
    text: 'We look at your recent denials by reason code, so you see which ones are preventable and how much they cost you.',
  },
  {
    title: 'AR aging review',
    text: 'We check how long claims sit unpaid and flag the buckets where follow-up would recover the most money fastest.',
  },
  {
    title: 'Coding spot-check',
    text: 'A sample of your recent claims is checked for undercoding and missed charges, like unbilled modifiers or visit levels.',
  },
  {
    title: 'Eligibility process',
    text: 'We review how eligibility is verified before visits, because bad eligibility data is one of the top causes of denials.',
  },
  {
    title: 'Credentialing status',
    text: 'We confirm your providers are properly enrolled with your payers, so claims are not denied for credentialing gaps.',
  },
  {
    title: 'Payer patterns',
    text: 'We compare your denial rates against what we see across similar practices, so you know what is normal and what is not.',
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: '1. Request the audit',
    text: 'Fill out the short form below. It takes about a minute, and we will never ask for patient information you are not comfortable sharing.',
  },
  {
    icon: FileSearch,
    title: '2. We review your numbers',
    text: 'We look at a sample of your recent claims, your AR report, and your denial patterns. Most audits are done within a few business days.',
  },
  {
    icon: BarChart3,
    title: '3. You get the report',
    text: 'You get a plain-English report: where revenue is leaking, what to fix first, and what it is worth. Yours to keep, whatever you decide.',
  },
];

const faqs = [
  {
    q: 'Is the audit really free?',
    a: 'Yes. There is no charge and no obligation. It is how we show practices what we can do before anyone signs anything.',
  },
  {
    q: 'Do you need access to our systems?',
    a: 'Only the reports you choose to share, like an AR aging report or a denial summary. We work with whatever you can export, and we never need patient charts.',
  },
  {
    q: 'What happens after the audit?',
    a: 'You get the report and decide. If you want us to fix what we found, we can talk about working together. If not, the findings are yours to use however you like.',
  },
];

export default function FreeAuditPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Free Medical Billing Audit',
    provider: {
      '@type': 'Organization',
      name: 'Med Flow System',
      url: siteUrl,
      telephone: '+1-213-890-6560',
    },
    areaServed: 'US',
    description: metadata.description,
    url: `${siteUrl}/free-audit`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-base font-bold uppercase tracking-wide text-teal">
              Free, no obligation
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-ink sm:text-5xl">
              Find out exactly where your practice is losing revenue
            </h1>
            <div className="mt-5 max-w-3xl space-y-4">
              <p className="text-lg text-ink/75">
                Most practices lose 10 to 20 percent of their revenue to denials, slow follow-up,
                and coding mistakes they never see. Our free billing audit shows you where yours is
                going, in plain English, with real numbers from your own claims.
              </p>
              <p className="text-lg text-ink/75">
                No sales pitch, no software to install, no long contract. Just a clear report you can
                act on, whether you hire us or not.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#audit-form"
                className="rounded-lg bg-teal px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-teal-dark"
              >
                Request your free audit
              </Link>
              <a
                href="tel:+12138906560"
                className="rounded-lg border-2 border-teal px-7 py-3.5 text-base font-bold text-teal transition-colors hover:bg-teal/10"
              >
                Call (213) 890-6560
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">What the audit checks</h2>
            <p className="mt-3 max-w-3xl text-lg text-ink/75">
              Six areas where small practices most often leave money on the table.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {checks.map((c) => (
              <Reveal key={c.title}>
                <div className="h-full rounded-xl border border-ink/10 bg-mist p-6">
                  <CheckCircle2 size={28} className="text-teal" />
                  <h3 className="mt-4 text-xl font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-base text-ink/75">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">How it works</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <Reveal key={s.title}>
                <div className="h-full rounded-xl bg-white p-6 shadow-sm">
                  <s.icon size={28} className="text-teal" />
                  <h3 className="mt-4 text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-base text-ink/75">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="audit-form" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-3xl font-extrabold text-ink">Request your free audit</h2>
              <p className="mt-3 text-lg text-ink/75">
                Tell us a little about your practice. We will reach out within one business day to
                collect the reports we need, usually just an AR aging report and a recent denial
                summary.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Free, with no obligation and no sales pressure',
                  'Report delivered within a few business days',
                  'Your data stays private and is never shared',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-base text-ink/75">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-teal" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base text-ink/60">
                Prefer email? Write to{' '}
                <a href="mailto:info@medflowsystem.co" className="font-semibold text-teal">
                  info@medflowsystem.co
                </a>
              </p>
            </Reveal>
            <Reveal>
              <div className="rounded-xl border border-ink/10 bg-mist p-6 sm:p-8">
                <LeadForm type="audit" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Common questions</h2>
          </Reveal>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-ink">{f.q}</h3>
                  <p className="mt-2 text-base text-ink/75">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-center text-base text-ink/60">
              More questions? See our{' '}
              <Link href="/faq" className="font-semibold text-teal hover:text-teal-dark">
                FAQ page
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
