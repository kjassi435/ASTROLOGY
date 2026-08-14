import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getServices, saveService, deleteService, type ServiceInput } from "@/lib/cms";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  return NextResponse.json({ items: await getServices() });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const body = (await req.json()) as ServiceInput;
  if (!body.slug || !body.name) return NextResponse.json({ error: "slug and name required" }, { status: 400 });
  const id = await saveService(body);
  return NextResponse.json({ id });
}
