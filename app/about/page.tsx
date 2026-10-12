import Link from 'next/link';
import Image from 'next/image';
import { Target, Eye, HeartHandshake, PhoneCall } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { siteConfig, siteUrl } from '@/config/site';

export const metadata = {
  title: 'About Us | Med Flow System',
  description:
    'Learn about Med Flow System — our mission, vision, and values as a medical billing and revenue cycle partner for US healthcare providers.',
  alternates: { canonical: `${siteUrl}/about` },
};

const values = [
  {
    icon: Target,
    title: 'Accuracy',
    text: 'Every claim coded carefully and checked twice. Small errors cost practices real money — we make sure they do not happen on our watch.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    text: 'You see everything we do: clear reports, open communication, and honest answers whenever you ask.',
  },
  {
    icon: HeartHandshake,
    title: 'Reliability',
    text: 'Consistent follow-up, dependable timelines, and a team that keeps its promises.',
  },
  {
    icon: PhoneCall,
    title: 'Professional support',
    text: 'Real specialists on your account who understand your specialty and respond when it matters.',
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-base font-bold uppercase tracking-widest text-teal">About us</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-ink sm:text-5xl">
              A billing partner built for healthcare providers
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-ink/75">
              Med Flow System exists for one reason: to keep the money flowing behind the care.
              We handle the claims, the coding, the denials, and the follow-up — so practices
              can stay focused on patients instead of paperwork.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20">
          <Reveal>
            <div className="h-full rounded-2xl border border-mist bg-mist/60 p-8">
              <h2 className="text-2xl font-extrabold text-ink">Our mission</h2>
              <p className="mt-3 text-base leading-relaxed text-ink/75">
                To give every healthcare provider — from solo practices to growing clinics — a
                billing operation that is accurate, transparent, and dependable. When billing
                runs smoothly, practices get paid faster, staff spend less time on admin, and
                patients get better care.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-mist bg-mist/60 p-8">
              <h2 className="text-2xl font-extrabold text-ink">Our vision</h2>
              <p className="mt-3 text-base leading-relaxed text-ink/75">
                A future where no practice loses revenue to preventable billing problems. We
                want to be the team providers trust with their revenue cycle — the partner
                they recommend to colleagues because we simply get it done right.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <Reveal className="text-center">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Our values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
              The principles behind every claim we submit and every call we make.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-mist bg-white p-7 shadow-sm">
                  <span className="w-fit rounded-xl bg-teal/10 p-3 text-teal">
                    <value.icon size={26} />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-ink">{value.title}</h3>
                  <p className="mt-2 text-base text-ink/70">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              A team approach to your revenue cycle
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              Billing touches everything in a practice — scheduling, documentation, coding,
              payer contracts. That is why we work as an extension of your team, not a black
              box. We coordinate with your front desk and providers, flag documentation gaps
              early, and keep everyone in the loop with regular updates.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              You always know who is handling your account and what is happening with your
              claims. No runarounds, no jargon — just steady, professional work on your
              revenue cycle.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-4">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/consult.webp"
                  alt="Team consulting on billing strategy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/care.webp"
                  alt="Care team focused on patients"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Based in {siteConfig.city}
            </h2>
            <p className="mt-4 text-lg text-ink/70">
              We are a US-based company serving healthcare practices across the country. Our
              team understands American payers, billing rules, and the day-to-day realities
              of running a practice.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Let&apos;s talk about your practice
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
              Find out what Med Flow System can do for your revenue cycle — starting with a
              free consultation.
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
