import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, saveCourse } from "@/lib/cms";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  const resultId = await saveCourse((await req.json()), idNum);
  return NextResponse.json({ id: resultId });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const raw = (await params).id;
  const idNum = Number(raw);
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  await (await import("@/lib/cms")).deleteCourse(idNum);
  return NextResponse.json({ success: true });
}
