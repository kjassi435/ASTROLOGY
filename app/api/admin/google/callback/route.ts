import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { issueAdminSession, sessionCookieOptions } from "@/lib/admin-auth";
import { googleAuthEnabled, exchangeGoogleCode } from "@/lib/admin-db";

export async function GET(req: Request) {
  if (!googleAuthEnabled()) {
    return NextResponse.json({ error: "Google login not configured" }, { status: 404 });
  }
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }
  const email = await exchangeGoogleCode(code, `${url.origin}/api/admin/google/callback`);
  if (!email) {
    return NextResponse.json({ error: "Google authentication failed" }, { status: 401 });
  }
  const cookieStore = await cookies();
  cookieStore.set("admin-token", issueAdminSession(), sessionCookieOptions());
  return NextResponse.redirect(`${url.origin}/admin`);
}
