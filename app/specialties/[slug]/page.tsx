import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { specialtyIcons } from '@/components/icons';
import { specialtyPages, blogPosts, siteUrl } from '@/config/site';
import { Stethoscope } from 'lucide-react';

export function generateStaticParams() {
  return specialtyPages.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = specialtyPages.find((s) => s.slug === params.slug);
  if (!page) return { title: 'Specialty | Med Flow System' };
  return {
    title: `${page.title} | Med Flow System`,
    description: page.metaDescription,
    alternates: { canonical: `${siteUrl}/specialties/${params.slug}` },
  };
}

export default function SpecialtyDetailPage({ params }: { params: { slug: string } }) {
  const page = specialtyPages.find((s) => s.slug === params.slug);
  if (!page) notFound();

  const Icon = specialtyIcons[page.name] ?? Stethoscope;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    provider: {
      '@type': 'Organization',
      name: 'Med Flow System',
      url: siteUrl,
      telephone: '+1-213-890-6560',
    },
    areaServed: 'US',
    description: page.metaDescription,
    url: `${siteUrl}/specialties/${page.slug}`,
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
            <nav aria-label="Breadcrumb" className="text-base text-ink/60">
              <Link href="/specialties" className="font-semibold text-teal hover:text-teal-dark">
                Specialties
              </Link>
              <span className="mx-2">/</span>
              <span>{page.name}</span>
            </nav>
            <div className="mt-6 flex items-center gap-4">
              <span className="rounded-xl bg-teal/10 p-4 text-teal">
                <Icon size={32} />
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold text-ink sm:text-5xl">
              {page.title}
            </h1>
            <div className="mt-5 max-w-3xl space-y-4">
              {page.intro.map((p, i) => (
                <p key={i} className="text-lg text-ink/75">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact?type=audit"
                className="rounded-lg bg-teal px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-teal-dark"
              >
                Get a Free Billing Audit
              </Link>
              <Link
                href="/contact?type=consultation"
                className="rounded-lg border-2 border-teal px-7 py-3 text-base font-bold text-teal transition-colors hover:bg-teal hover:text-white"
              >
                Book a Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Billing challenges in {page.name.toLowerCase()}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {page.painPoints.map((pp) => (
                <div
                  key={pp.title}
                  className="rounded-2xl border border-mist bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle size={20} className="shrink-0 text-amber-600" />
                    <h3 className="text-lg font-bold text-ink">{pp.title}</h3>
                  </div>
                  <p className="mt-2 text-base text-ink/70">{pp.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              How we handle it
            </h2>
            <ul className="mt-6 space-y-3">
              {page.howWeHelp.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-teal" />
                  <span className="text-base text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-14">
            <div className="grid gap-4 sm:grid-cols-3">
              {page.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-mist p-6 text-center"
                >
                  <p className="text-3xl font-extrabold text-teal">{stat.value}</p>
                  <p className="mt-1 text-sm text-ink/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Related reading</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {blogPosts
                .filter((post) => !post.draft)
                .slice(0, 4)
                .map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rounded-xl border border-white bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-base font-bold text-ink hover:text-teal">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink/60">{post.excerpt.slice(0, 100)}...</p>
                  </Link>
                ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Billing holding your {page.name.toLowerCase()} practice back?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
              Get a free billing audit. We will review your denial rate, AR days,
              and collections, and show you exactly where revenue is leaking.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=audit"
                className="rounded-lg bg-teal px-8 py-4 text-base font-bold text-white transition-colors hover:bg-teal-dark"
              >
                Get a Free Audit
              </Link>
              <Link
                href="/contact?type=consultation"
                className="rounded-lg border-2 border-white px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-white hover:text-navy"
              >
                Book a Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
