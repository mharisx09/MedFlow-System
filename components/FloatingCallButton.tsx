'use client';

import { Phone } from 'lucide-react';

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+12138906560"
      aria-label="Call now"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-lg transition-colors hover:bg-teal-dark md:hidden"
    >
      <Phone size={24} />
    </a>
  );
}
