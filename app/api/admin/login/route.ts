import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { issueAdminSession, sessionCookieOptions } from "@/lib/admin-auth";
import { verifyAdminLogin } from "@/lib/admin-db";

export async function POST(req: Request) {
  const { password } = await req.json();
  const valid = await verifyAdminLogin(password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const cookieStore = await cookies();
  cookieStore.set("admin-token", issueAdminSession(), sessionCookieOptions());
  return NextResponse.json({ success: true });
}
