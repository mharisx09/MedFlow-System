import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export async function POST() {
  const session = await getAdminSession();
  await session.destroy();
  return NextResponse.json({ ok: true });
}
