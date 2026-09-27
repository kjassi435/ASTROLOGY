import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { issueAdminSession, sessionCookieOptions } from "@/lib/admin-auth";
import { verifyAdminLogin } from "@/lib/admin-db";

// In-memory brute-force guard: max 10 failed attempts per IP per 10 min.
const attempts = new Map<string, { count: number; resetAt: number }>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const cur = attempts.get(ip);
  if (!cur || now > cur.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  cur.count += 1;
  return cur.count > 10;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  let password = "";
  try {
    password = String((await req.json()).password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const valid = password ? await verifyAdminLogin(password) : false;
  if (!valid) {
    if (throttled(ip)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again in 10 minutes." },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  attempts.delete(ip);
  const cookieStore = await cookies();
  cookieStore.set("admin-token", issueAdminSession(), sessionCookieOptions());
  return NextResponse.json({ success: true });
}
