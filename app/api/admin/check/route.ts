import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  // Clear with matching path so Secure/prod cookies are actually removed.
  cookieStore.set("admin-token", "", { path: "/", maxAge: 0 });
  return NextResponse.json({ authenticated: false });
}

