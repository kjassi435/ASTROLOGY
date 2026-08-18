import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await req.json();
  const current = String(body.currentPassword ?? "");
  const next = String(body.newPassword ?? "");
  const currentExpected = "arvinastro2026";
  if (current !== currentExpected) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
  }
  if (next.length < 6) {
    return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
  }
  // Note: In production, update the env var via Vercel dashboard or CLI.
  // For now, we verify the current password and accept the change.
  return NextResponse.json({ ok: true, message: "Password verified. Update ADMIN_PASSWORD in Vercel dashboard to apply." });
}
