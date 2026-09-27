"use client";

import { useRef } from "react";
import { IconImage, IconX, IconUpload } from "@/components/Icons";

// Convert Google Drive share links to direct image URLs (client-side for preview).
function normalizeImageUrl(url: string): string {
  const s = url.trim();
  const m = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m) return `https://lh3.googleusercontent.com/d/${m[1]}`;
  return s;
}

// Client-side image resize -> data URL so uploads persist in the DB (no server storage needed).
// Hard cap ~350KB: oversized uploads once bloated listing pages to 40MB+.
async function fileToDataUrl(file: File, maxDim = 1200): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Read failed"));
    reader.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Invalid image"));
    el.src = dataUrl;
  });
  const encode = (dim: number, quality: number): string | null => {
    const scale = Math.min(1, dim / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.width * scale));
    canvas.height = Math.max(1, Math.round(img.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", quality);
  };
  if (file.size < 350 * 1024 && Math.max(img.width, img.height) <= maxDim) {
    if (dataUrl.length < 450 * 1024) return dataUrl;
  }
  let out = encode(maxDim, 0.8) ?? dataUrl;
  if (out.length > 450 * 1024) out = encode(800, 0.72) ?? out;
  if (out.length > 500 * 1024) throw new Error("Image too large after compression");
  return out;
}

export function ImageInput({
  value,
  onChange,
  label,
  aspect,
}: {
  value?: string;
  onChange: (v: string) => void;
  label?: string;
  aspect?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(f?: File | null) {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    try {
      onChange(await fileToDataUrl(f));
    } catch {
      alert("Could not read that image. Try a JPEG/PNG file.");
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(normalizeImageUrl(e.target.value))}
          placeholder={label ? `Paste ${label} URL or upload below` : "Paste image URL"}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-md shadow-blue-500/25 hover:opacity-90 transition"
        >
          <IconUpload size={15} /> Upload
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      {value ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className={`rounded-lg border border-slate-200 object-cover ${aspect ?? "h-24 w-24"}`}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            title="Clear"
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600 transition"
          >
            <IconX size={12} />
          </button>
        </div>
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
          <IconImage size={20} />
        </div>
      )}
    </div>
  );
}