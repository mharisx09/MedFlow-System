import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '../_lib/guard';

const LEAD_STATUSES = ['New', 'Contacted', 'Closed'] as const;

function buildWhere(searchParams: URLSearchParams) {
  const search = searchParams.get('search')?.trim() ?? '';
  const type = searchParams.get('type') ?? 'all';
  const status = searchParams.get('status') ?? 'all';

  return {
    AND: [
      search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              { email: { contains: search, mode: 'insensitive' as const } },
              { practiceName: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {},
      type && type !== 'all' ? { type } : {},
      status && status !== 'all' ? { status } : {},
    ],
  };
}

export async function GET(req: Request) {
  try {
    await requireAdmin();
  } catch (res) {
    if (res instanceof Response) return res;
    throw res;
  }

  const where = buildWhere(new URL(req.url).searchParams);
  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 200,
  });

  return NextResponse.json({ leads });
}

export async function PATCH(req: Request) {
  try {
    await requireAdmin();
  } catch (res) {
    if (res instanceof Response) return res;
    throw res;
  }

  let body: { id?: unknown; status?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { id, status } = body;
  if (typeof id !== 'string' || id.trim() === '') {
    return NextResponse.json({ error: 'Lead id is required.' }, { status: 400 });
  }
  if (typeof status !== 'string' || !LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
    return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
  }

  await prisma.lead.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ ok: true });
}
