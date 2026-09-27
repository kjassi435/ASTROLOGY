import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, savePost, deletePost } from "@/lib/cms";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  const payload = (await req.json()) as { image?: unknown };
  if (typeof payload.image === "string" && payload.image.startsWith("data:") && payload.image.length > 500 * 1024)
    return NextResponse.json({ error: "Image too large (max 500KB). Compress or use a smaller file." }, { status: 400 });
  const resultId = await savePost(payload as never, idNum);
  return NextResponse.json({ id: resultId });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const raw = (await params).id;
  const idNum = Number(raw);
  if (!Number.isFinite(idNum)) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  await deletePost(idNum);
  return NextResponse.json({ success: true });
}
