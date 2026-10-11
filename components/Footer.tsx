import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig, navLinks, services } from '@/config/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="inline-block rounded-lg bg-white p-2">
            <Image
              src="/images/logo.png"
              alt="Med Flow System logo"
              width={200}
              height={200}
              className="h-14 w-auto"
            />
          </div>
          <p className="mt-4 text-base text-white/90">{siteConfig.tagline}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Med Flow System on LinkedIn"
              className="rounded-lg bg-white/10 p-2.5 text-white transition-colors hover:bg-teal"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              aria-label="Med Flow System on Facebook"
              className="rounded-lg bg-white/10 p-2.5 text-white transition-colors hover:bg-teal"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              aria-label="Med Flow System on Instagram"
              className="rounded-lg bg-white/10 p-2.5 text-white transition-colors hover:bg-teal"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <nav aria-label="Quick links">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-base text-white/90 hover:text-teal-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h3 className="text-lg font-bold">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-base text-white/90 hover:text-teal-light"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-lg font-bold">Contact</h3>
          <ul className="mt-4 space-y-3 text-base text-white/90">
            <li>
              <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-teal-light">
                <Phone size={18} className="shrink-0" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-teal-light">
                <Mail size={18} className="shrink-0" />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} className="shrink-0" />
              {siteConfig.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-white/80 sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-teal-light">
              Privacy Policy
            </Link>
            <Link href="/hipaa-notice" className="hover:text-teal-light">
              HIPAA Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
