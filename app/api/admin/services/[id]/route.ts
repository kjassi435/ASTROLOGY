import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getServices, saveService, deleteService, type ServiceInput } from "@/lib/cms";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const { id } = await params;
  const body = (await req.json()) as ServiceInput;
  const resultId = await saveService(body, Number(id));
  return NextResponse.json({ id: resultId });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const { id } = await params;
  await deleteService(Number(id));
  return NextResponse.json({ success: true });
}
