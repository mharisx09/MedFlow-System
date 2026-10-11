import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendLeadNotifications } from '@/lib/email';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const LeadSchema = z.object({
  type: z.enum(['contact', 'consultation', 'audit']),
  name: z.string().min(2).max(100),
  email: z.string().email().max(160),
  phone: z.string().max(30).optional().or(z.literal('')),
  practiceName: z.string().max(160).optional().or(z.literal('')),
  specialty: z.string().max(100).optional().or(z.literal('')),
  message: z.string().max(5000).optional().or(z.literal('')),
  website: z.string().max(100).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.' },
      { status: 400 }
    );
  }

  const { website, type, name, email, phone, practiceName, specialty, message } = parsed.data;

  const ip = getClientIp(req);
  if (!rateLimit(ip, 5, 60_000)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429 }
    );
  }

  // Honeypot: silently drop spam submissions
  if (website && website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const lead = await prisma.lead.create({
    data: {
      type,
      name,
      email,
      phone: phone || null,
      practiceName: practiceName || null,
      specialty: specialty || null,
      message: message || null,
      status: 'New',
      ip,
    },
  });

  try {
    await sendLeadNotifications({
      type,
      name,
      email,
      phone: lead.phone ?? undefined,
      practiceName: lead.practiceName ?? undefined,
      specialty: lead.specialty ?? undefined,
      message: lead.message ?? undefined,
    });
  } catch {
    // Email failures must never fail the lead capture request
  }

  return NextResponse.json({ ok: true });
}
