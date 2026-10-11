import { getAdminSession } from '@/lib/auth';

/**
 * Returns the authenticated admin's email, or throws a 401 Response.
 *
 * Usage in route handlers:
 *   try {
 *     const email = await requireAdmin();
 *   } catch (res) {
 *     if (res instanceof Response) return res;
 *     throw res;
 *   }
 */
export async function requireAdmin(): Promise<string> {
  const session = await getAdminSession();
  if (!session.adminEmail) {
    throw Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return session.adminEmail;
}
