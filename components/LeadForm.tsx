'use client';

import { useState, type FormEvent } from 'react';

type LeadFormProps = {
  type: 'contact' | 'consultation' | 'audit';
  compact?: boolean;
};

type Errors = Partial<Record<'name' | 'email' | 'phone', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30';

export default function LeadForm({ type, compact = false }: LeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [practiceName, setPracticeName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!EMAIL_RE.test(email.trim())) next.email = 'Please enter a valid email address.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          practiceName: practiceName.trim(),
          specialty: specialty.trim(),
          message: message.trim(),
          website: '',
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6" role="status">
        <h3 className="text-lg font-bold text-green-800">Thank you — we received your request.</h3>
        <p className="mt-2 text-base text-green-800">
          Someone from our team will reach out to you shortly. We look forward to talking through
          how Med Flow System can support your practice.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <p className="text-sm text-ink/60">Please do not share patient information here.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-base font-semibold text-ink">
            Full name *
          </label>
          <input
            id="lead-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Jane Smith"
            autoComplete="name"
          />
          {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="lead-email" className="mb-1.5 block text-base font-semibold text-ink">
            Email *
          </label>
          <input
            id="lead-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="jane@example.com"
            autoComplete="email"
          />
          {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-phone" className="mb-1.5 block text-base font-semibold text-ink">
            Phone
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="(555) 123-4567"
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="lead-practice" className="mb-1.5 block text-base font-semibold text-ink">
            Practice name
          </label>
          <input
            id="lead-practice"
            type="text"
            value={practiceName}
            onChange={(e) => setPracticeName(e.target.value)}
            className={inputClass}
            placeholder="Your practice"
            autoComplete="organization"
          />
        </div>
      </div>

      {!compact && (
        <>
          <div>
            <label htmlFor="lead-specialty" className="mb-1.5 block text-base font-semibold text-ink">
              Specialty
            </label>
            <input
              id="lead-specialty"
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className={inputClass}
              placeholder="e.g. Primary Care, Dental, Mental Health"
            />
          </div>
          <div>
            <label htmlFor="lead-message" className="mb-1.5 block text-base font-semibold text-ink">
              Message
            </label>
            <textarea
              id="lead-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} min-h-32 resize-y`}
              placeholder="Tell us about your practice and what you'd like help with."
            />
          </div>
        </>
      )}

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      />

      {status === 'error' && (
        <p className="text-base font-medium text-red-600" role="alert">
          Something went wrong sending your request. Please try again or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-lg bg-teal px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'loading' ? 'Sending…' : 'Submit Request'}
      </button>
    </form>
  );
}
