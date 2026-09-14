import client from "./db";
import { initDB } from "./db-schema";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const DEFAULT_PW = process.env.ADMIN_PASSWORD || "arvinastro2026";

function rows(sql: string, params: unknown[] = []): Promise<Record<string, unknown>[]> {
  return client.execute({ sql, args: params as never[] }).then((r) => (r.rows as Record<string, unknown>[]) ?? []);
}
function run(sql: string, params: unknown[] = []) {
  return client.execute({ sql, args: params as never[] });
}

export function hashPassword(pw: string): string {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${key}`;
}

export function verifyPassword(pw: string, stored: string): boolean {
  try {
    const [salt, key] = stored.split(":");
    if (!salt || !key) return false;
    const derived = scryptSync(pw, salt, 64);
    return timingSafeEqual(derived, Buffer.from(key, "hex"));
  } catch {
    return false;
  }
}

export async function ensureAdminUser() {
  await initDB().catch(() => {});
  try {
    const r = await rows("SELECT id FROM admin_users LIMIT 1");
    if (r.length === 0) {
      await run("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)", ["admin", hashPassword(DEFAULT_PW)]);
    }
  } catch {
    /* ignore */
  }
}

export async function verifyAdminLogin(password: string): Promise<boolean> {
  await ensureAdminUser();
  try {
    const r = await rows("SELECT password_hash FROM admin_users ORDER BY id LIMIT 1");
    if (!r.length) return false;
    return verifyPassword(password, String(r[0].password_hash ?? ""));
  } catch {
    return false;
  }
}

export async function updateAdminPassword(newPassword: string): Promise<void> {
  await ensureAdminUser();
  const hash = hashPassword(newPassword);
  const r = await rows("SELECT id FROM admin_users ORDER BY id LIMIT 1");
  if (r.length) await run("UPDATE admin_users SET password_hash=? WHERE id=?", [hash, Number(r[0].id)]);
  else await run("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)", ["admin", hash]);
}

export function googleAuthEnabled(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export async function exchangeGoogleCode(code: string, redirectUri: string): Promise<string | null> {
  const body = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!tokenRes.ok) return null;
  const token = await tokenRes.json();
  const infoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
  if (!infoRes.ok) return null;
  const info = await infoRes.json();
  const allowed = process.env.GOOGLE_ALLOWED_EMAIL;
  if (allowed && info.email !== allowed) return null;
  return info.email ?? null;
}
