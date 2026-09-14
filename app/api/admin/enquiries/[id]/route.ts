import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, deleteEnquiry } from "@/lib/cms";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const raw = (await params).id;
  const idNum = Number(raw);
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  await deleteEnquiry(idNum);
  return NextResponse.json({ success: true });
}
