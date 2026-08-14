import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getProducts, saveProduct, deleteProduct, type ProductInput } from "@/lib/cms";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  return NextResponse.json({ items: await getProducts() });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const body = (await req.json()) as ProductInput;
  if (!body.title) return NextResponse.json({ error: "title required" }, { status: 400 });
  await saveProduct(body);
  return NextResponse.json({ success: true });
}
