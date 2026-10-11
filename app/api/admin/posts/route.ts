import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '../_lib/guard';

const PostSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(500).optional().or(z.literal('')),
  content: z.string().min(10),
  published: z.boolean(),
});

export async function GET() {
  try {
    await requireAdmin();
  } catch (res) {
    if (res instanceof Response) return res;
    throw res;
  }

  const posts = await prisma.post.findMany({ orderBy: { updatedAt: 'desc' } });
  return NextResponse.json({ posts });
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

  const parsed = PostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form fields.' }, { status: 400 });
  }

  const { excerpt, ...rest } = parsed.data;
  const post = await prisma.post.create({
    data: { ...rest, excerpt: excerpt || null },
  });

  return NextResponse.json({ ok: true, post });
}
