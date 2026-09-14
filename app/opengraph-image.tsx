import { readFile } from "fs/promises";
import path from "path";
import { BRAND } from "@/lib/site";

export const alt = `${BRAND.name} — Sahi Disha, Sahi Gyan`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const buf = await readFile(path.join(process.cwd(), "public/og-image.png"));
  return new Response(buf, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400, immutable" },
  });
}
