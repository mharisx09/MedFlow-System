import { prisma } from '@/lib/prisma';
import { requireAdmin } from '../../_lib/guard';

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  try {
    await requireAdmin();
  } catch (res) {
    if (res instanceof Response) return res;
    throw res;
  }

  const searchParams = new URL(req.url).searchParams;
  const search = searchParams.get('search')?.trim() ?? '';
  const type = searchParams.get('type') ?? 'all';
  const status = searchParams.get('status') ?? 'all';

  const leads = await prisma.lead.findMany({
    where: {
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
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });

  const header = ['id', 'type', 'name', 'email', 'phone', 'practiceName', 'specialty', 'message', 'status', 'createdAt'];
  const lines = [header.join(',')];
  for (const lead of leads) {
    lines.push(
      [
        escapeCsv(lead.id),
        escapeCsv(lead.type),
        escapeCsv(lead.name),
        escapeCsv(lead.email),
        escapeCsv(lead.phone),
        escapeCsv(lead.practiceName),
        escapeCsv(lead.specialty),
        escapeCsv(lead.message),
        escapeCsv(lead.status),
        escapeCsv(lead.createdAt.toISOString()),
      ].join(',')
    );
  }

  const csv = lines.join('\r\n');
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="medflow-leads.csv"',
    },
  });
}
