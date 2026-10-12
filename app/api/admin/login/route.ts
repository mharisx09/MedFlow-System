import { NextResponse } from 'next/server';
import { getAdminSession, verifyAdminCredentials } from '@/lib/auth';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  // Slow down brute-force password guessing: 10 tries per minute per IP.
  const ip = getClientIp(req);
  if (!rateLimit(`admin-login:${ip}`, 10, 60_000)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again shortly.' },
      { status: 429 }
    );
  }

  const valid = await verifyAdminCredentials(email, password);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const session = await getAdminSession();
  session.adminEmail = email;
  await session.save();

  return NextResponse.json({ ok: true });
}
