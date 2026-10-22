import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";
import bcrypt from "bcryptjs";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "medflow_admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 8 * 3600,
    path: "/",
  },
};

export interface AdminSession {
  adminEmail?: string;
}

export async function getAdminSession() {
  return getIronSession<AdminSession>(await cookies(), sessionOptions);
}

/**
 * Verify admin credentials against env-configured email + bcrypt hash.
 * Returns false for any mismatch or misconfiguration — never throws.
 */
export async function verifyAdminCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  try {
    const expectedEmail = process.env.ADMIN_EMAIL;
    const expectedHash = process.env.ADMIN_PASSWORD_HASH || "";

    if (!expectedEmail || !expectedHash) return false;
    if (email.trim().toLowerCase() !== expectedEmail.trim().toLowerCase()) {
      return false;
    }
    return await bcrypt.compare(password, expectedHash);
  } catch {
    return false;
  }
}
