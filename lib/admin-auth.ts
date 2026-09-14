import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

const COOKIE = "admin-token";
const TTL_SECONDS = 60 * 60 * 24; // 24h

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "arvin-astro-dev-secret";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

// Signed session token: "<expiryMs>.<nonce>.<hmac>". Random per login,
// tamper-proof, and expires — unlike the old fixed "authenticated" string.
export function issueAdminSession(): string {
  const payload = `${Date.now() + TTL_SECONDS * 1000}.${randomUUID()}`;
  return `${payload}.${sign(payload)}`;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: TTL_SECONDS,
    path: "/",
  };
}

export async function requireAdmin(): Promise<boolean> {
  const c = await cookies();
  const raw = c.get(COOKIE)?.value;
  if (!raw) return false;
  const [exp, nonce, sig] = raw.split(".");
  if (!exp || !nonce || !sig) return false;
  if (!Number.isFinite(Number(exp)) || Number(exp) < Date.now()) return false;
  const expected = sign(`${exp}.${nonce}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
