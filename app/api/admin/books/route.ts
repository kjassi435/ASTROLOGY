import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getBooks, saveBook, deleteBook, type BookInput } from "@/lib/cms";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  return NextResponse.json({ items: await getBooks() });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const body = (await req.json()) as BookInput;
  if (!body.title) return NextResponse.json({ error: "title required" }, { status: 400 });
  await saveBook(body);
  return NextResponse.json({ success: true });
}
