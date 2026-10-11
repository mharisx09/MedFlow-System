import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '../_lib/guard';

const FaqSchema = z.object({
  question: z.string().min(4).max(500),
  answer: z.string().min(4),
  sortOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export async function GET() {
  try {
    await requireAdmin();
  } catch (res) {
    if (res instanceof Response) return res;
    throw res;
  }

  const faqs = await prisma.faq.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json({ faqs });
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch (res) {
    if (res instanceof Response) return res;
    throw res;
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = FaqSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form fields.' }, { status: 400 });
  }

  const faq = await prisma.faq.create({ data: parsed.data });
  return NextResponse.json({ ok: true, faq });
}
