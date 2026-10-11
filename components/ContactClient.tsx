'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import { siteConfig } from '@/config/site';

type LeadType = 'contact' | 'consultation' | 'audit';

function ContactForm() {
  const params = useSearchParams();
  const raw = params.get('type');
  const type: LeadType = raw === 'consultation' || raw === 'audit' ? raw : 'contact';

  const heading =
    type === 'consultation'
      ? 'Book your free consultation'
      : type === 'audit'
        ? 'Request your free billing audit'
        : 'Send us a message';

  return (
    <div className="grid gap-12 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{heading}</h2>
        <p className="mt-3 text-base text-ink/70">
          Fill out the form and a member of our team will get back to you. We keep every
          conversation confidential.
        </p>
        <div className="mt-8 rounded-2xl border border-mist bg-white p-6 shadow-sm sm:p-8">
          <LeadForm type={type} />
        </div>
      </div>

      <aside className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">Contact information</h2>
        <ul className="mt-4 space-y-4 text-base text-ink">
          <li>
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-3 font-semibold text-navy hover:text-teal"
            >
              <span className="rounded-lg bg-mist p-2.5 text-teal">
                <Phone size={20} />
              </span>
              {siteConfig.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 font-semibold text-navy hover:text-teal"
            >
              <span className="rounded-lg bg-mist p-2.5 text-teal">
                <Mail size={20} />
              </span>
              {siteConfig.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <span className="rounded-lg bg-mist p-2.5 text-teal">
              <MapPin size={20} />
            </span>
            <span className="font-semibold">{siteConfig.address}</span>
          </li>
        </ul>

        <div className="mt-8 overflow-hidden rounded-2xl border border-mist shadow-sm">
          <iframe
            title="Map of Pittsburgh, PA"
            src="https://maps.google.com/maps?q=Pittsburgh,%20PA&t=&z=11&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            className="h-72 w-full border-0"
          />
        </div>
      </aside>
    </div>
  );
}

export default function ContactClient() {
  return (
    <Suspense fallback={<div className="text-base text-ink/60">Loading…</div>}>
      <ContactForm />
    </Suspense>
  );
}
