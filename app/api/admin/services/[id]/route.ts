import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getServices, saveService, deleteService, type ServiceInput } from "@/lib/cms";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  const body = (await req.json()) as ServiceInput;
  const resultId = await saveService(body, idNum);
  return NextResponse.json({ id: resultId });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  await deleteService(idNum);
  return NextResponse.json({ success: true });
}
