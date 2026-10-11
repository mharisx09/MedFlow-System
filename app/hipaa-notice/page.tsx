import Reveal from '@/components/Reveal';
import { siteConfig, siteUrl } from '@/config/site';

export const metadata = {
  title: 'HIPAA Notice | Med Flow System',
  description:
    'Read the Med Flow System notice on protected health information — we do not collect PHI through this website.',
  alternates: { canonical: `${siteUrl}/hipaa-notice` },
};

export default function HipaaNoticePage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="text-base font-bold uppercase tracking-widest text-teal">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">HIPAA Notice</h1>
          <p className="mt-3 text-base text-ink/60">Last updated: October 2026</p>
        </Reveal>

        <Reveal delay={80} className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-ink">We do not collect patient information here</h2>
            <p className="mt-2 text-base leading-relaxed text-ink/75">
              This website is for general information and business inquiries only. It is not
              designed to receive protected health information (PHI) — such as patient names,
              diagnoses, treatment details, or insurance ID numbers.
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink/75">
              Please do not share patient information through our contact forms, audit requests,
              or any other feature of this site. Every form on this website includes a reminder
              to keep patient details out of your message.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">Our commitment to clients</h2>
            <p className="mt-2 text-base leading-relaxed text-ink/75">
              When we work with a practice as a billing partner, we follow HIPAA-compliant
              processes for handling any patient data involved in claims and billing. Those
              arrangements are governed by separate written agreements, including a Business
              Associate Agreement, with each client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">Questions about privacy</h2>
            <p className="mt-2 text-base leading-relaxed text-ink/75">
              If you have questions about how we handle information — or if you believe you may
              have sent sensitive information through this site by mistake — please contact us
              right away:
            </p>
            <ul className="mt-3 space-y-2 text-base text-ink/75">
              <li>
                Email:{' '}
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-teal hover:text-teal-dark">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                Phone:{' '}
                <a href={siteConfig.phoneHref} className="font-semibold text-teal hover:text-teal-dark">
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
