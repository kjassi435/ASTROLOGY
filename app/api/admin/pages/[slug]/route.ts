import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, saveSiteContent } from "@/lib/cms";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const { slug } = await params;
  const { getSiteContent } = await import("@/lib/cms");
  return NextResponse.json({ fields: await getSiteContent(slug) });
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const { slug } = await params;
  const body = (await req.json()) as { fields: Record<string, string> };
  await saveSiteContent(slug, body.fields ?? {});
  return NextResponse.json({ success: true });
}
