import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '../../_lib/guard';

const PostPatchSchema = z
  .object({
    title: z.string().min(2).max(200),
    slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/),
    excerpt: z.string().max(500).optional().or(z.literal('')),
    content: z.string().min(10),
    published: z.boolean(),
  })
  .partial();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const parsed = PostPatchSchema.safeParse(body);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: 'Please check the form fields.' }, { status: 400 });
  }

  const { excerpt, ...rest } = parsed.data;
  const data = {
    ...rest,
    ...(excerpt !== undefined ? { excerpt: excerpt || null } : {}),
  };

  await prisma.post.update({ where: { id: params.id }, data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();
  } catch (res) {
    if (res instanceof Response) return res;
    throw res;
  }

  await prisma.post.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
