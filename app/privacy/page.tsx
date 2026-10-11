import Reveal from '@/components/Reveal';
import { siteConfig, siteUrl } from '@/config/site';

export const metadata = {
  title: 'Privacy Policy | Med Flow System',
  description: 'Read the Med Flow System privacy policy — how we collect, use, and protect your information.',
  alternates: { canonical: `${siteUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="text-base font-bold uppercase tracking-widest text-teal">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-base text-ink/60">Last updated: October 2026</p>
        </Reveal>

        <Reveal delay={80} className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-ink">Information we collect</h2>
            <p className="mt-2 text-base leading-relaxed text-ink/75">
              When you use the contact, consultation, or audit request forms on this site, we
              collect the details you provide: your name, email address, phone number, practice
              name, specialty, and any message you write. We do not ask for, and you should not
              send, patient information through this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">How we use your information</h2>
            <p className="mt-2 text-base leading-relaxed text-ink/75">
              We use the information you share to respond to your inquiry, schedule consultations
              or audits, and follow up about our services. We do not sell your information, and
              we do not share it with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">Cookies and analytics</h2>
            <p className="mt-2 text-base leading-relaxed text-ink/75">
              This site may use basic cookies and analytics tools to understand how visitors use
              the site and to keep it running smoothly. These tools collect general, non-identifying
              information such as pages visited and device type.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">Data protection</h2>
            <p className="mt-2 text-base leading-relaxed text-ink/75">
              We take reasonable steps to protect the information you share with us from loss,
              misuse, or unauthorized access. Form submissions are transmitted securely and are
              accessible only to our team members who need them to respond to your request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">Your choices</h2>
            <p className="mt-2 text-base leading-relaxed text-ink/75">
              You may ask us at any time to update or delete the information you submitted through
              this site. To do so, contact us at{' '}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-teal hover:text-teal-dark">
                {siteConfig.email}
              </a>{' '}
              or call{' '}
              <a href={siteConfig.phoneHref} className="font-semibold text-teal hover:text-teal-dark">
                {siteConfig.phone}
              </a>
              .
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
