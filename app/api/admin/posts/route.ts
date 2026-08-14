import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin-auth";
import { ensureDb, getPosts, savePost, deletePost, type PostInput } from "@/lib/cms";

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  return NextResponse.json({ items: await getPosts() });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return unauthorized();
  await ensureDb();
  const body = (await req.json()) as PostInput;
  if (!body.slug || !body.title) return NextResponse.json({ error: "slug and title required" }, { status: 400 });
  const id = await savePost(body);
  return NextResponse.json({ id });
}
