import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { verifyAdminLogin, updateAdminPassword } from "@/lib/admin-db";

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await req.json();
  const current = String(body.currentPassword ?? "");
  const next = String(body.newPassword ?? "");
  if (!(await verifyAdminLogin(current))) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
  }
  if (next.length < 6) {
    return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
  }
  await updateAdminPassword(next);
  return NextResponse.json({ ok: true, message: "Password updated successfully." });
}
