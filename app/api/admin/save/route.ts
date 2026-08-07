import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token");

  if (!token || token.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, data } = await req.json();

  if (!slug || !data) {
    return NextResponse.json({ error: "Missing slug or data" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "content", `${slug}.json`);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json({ success: true });
}
