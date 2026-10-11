'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '@/config/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Med Flow System home">
          <Image
            src="/images/logo.png"
            alt="Med Flow System logo"
            width={200}
            height={200}
            className="h-16 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-ink transition-colors hover:text-teal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact?type=consultation"
            className="inline-block rounded-lg bg-teal px-6 py-3 text-base font-bold text-white transition-colors hover:bg-teal-dark"
          >
            Book a Free Consultation
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-ink lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-mist bg-white px-4 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-mist"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact?type=consultation"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block rounded-lg bg-teal px-6 py-3 text-center text-base font-bold text-white hover:bg-teal-dark"
          >
            Book a Free Consultation
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="mt-2 block rounded-lg border border-teal px-6 py-3 text-center text-base font-bold text-teal"
          >
            Call {siteConfig.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
