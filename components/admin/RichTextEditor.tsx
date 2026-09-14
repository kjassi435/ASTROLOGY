"use client";

import { useEffect, useRef, useState } from "react";

type Props = { value?: string; onChange: (html: string) => void };

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
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  if (scale >= 1 && file.size < 400 * 1024) return dataUrl;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const type = file.type === "image/png" ? "image/png" : "image/jpeg";
  return canvas.toDataURL(type, type === "image/png" ? undefined : 0.82);
}

export function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== (value ?? "")) el.innerHTML = value ?? "";
  }, [value]);

  function emit() {
    onChange(ref.current?.innerHTML ?? "");
  }

  function cmd(command: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  }

  function insertTable() {
    const rows = window.prompt("Number of rows?", "3");
    const cols = window.prompt("Number of columns?", "3");
    if (!rows || !cols) return;
    let html = '<table style="border-collapse:collapse;width:100%;margin:12px 0"><tbody>';
    for (let r = 0; r < Number(rows); r++) {
      html += "<tr>";
      for (let c = 0; c < Number(cols); c++) {
        html += `<td style="border:1px solid #d1d5db;padding:8px 12px">Cell</td>`;
      }
      html += "</tr>";
    }
    html += "</tbody></table><p></p>";
    cmd("insertHTML", html);
  }

  const ToolbarBtn = ({ label, title, handler }: { label: string; title: string; handler: () => void }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); handler(); }}
      className="h-8 min-w-[2rem] rounded px-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-lg border border-slate-300 bg-white overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 p-1.5">
        <ToolbarBtn label="B" title="Bold" handler={() => cmd("bold")} />
        <ToolbarBtn label="I" title="Italic" handler={() => cmd("italic")} />
        <ToolbarBtn label="U" title="Underline" handler={() => cmd("underline")} />
        <ToolbarBtn label="S" title="Strikethrough" handler={() => cmd("strikeThrough")} />
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <ToolbarBtn label="H2" title="Heading 2" handler={() => cmd("formatBlock", "<h2>")} />
        <ToolbarBtn label="H3" title="Heading 3" handler={() => cmd("formatBlock", "<h3>")} />
        <ToolbarBtn label="P" title="Paragraph" handler={() => cmd("formatBlock", "<p>")} />
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <ToolbarBtn label="&#8226;" title="Bullet list" handler={() => cmd("insertUnorderedList")} />
        <ToolbarBtn label="1." title="Numbered list" handler={() => cmd("insertOrderedList")} />
        <ToolbarBtn label="&#10077;" title="Quote" handler={() => cmd("formatBlock", "<blockquote>")} />
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <ToolbarBtn label="Table" title="Insert table" handler={insertTable} />
        <ToolbarBtn label="Link" title="Insert link" handler={() => { const u = window.prompt("URL:"); if (u) cmd("createLink", u); }} />
        <ToolbarBtn label="Img" title="Insert image (URL or upload)" handler={() => fileRef.current?.click()} />
        <ToolbarBtn label="Upload" title="Upload image file" handler={() => fileRef.current?.click()} />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (!f) return;
            if (!f.type.startsWith("image/")) { alert("Please choose an image file."); return; }
            try {
              setUploading(true);
              const url = await fileToDataUrl(f);
              cmd("insertImage", url);
            } catch {
              alert("Could not read that image. Try a JPEG/PNG file.");
            } finally {
              setUploading(false);
            }
          }}
        />
        {uploading ? <span className="px-2 text-xs font-semibold text-blue-600">Uploading…</span> : null}
        <span className="mx-1 h-5 w-px bg-slate-300" />
        <ToolbarBtn label="HR" title="Horizontal rule" handler={() => cmd("insertHorizontalRule")} />
        <ToolbarBtn label="Undo" title="Undo" handler={() => cmd("undo")} />
        <ToolbarBtn label="Redo" title="Redo" handler={() => cmd("redo")} />
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        className="min-h-[300px] max-h-[60vh] overflow-y-auto p-4 text-sm leading-relaxed outline-none
          prose prose-sm max-w-none
          prose-headings:font-bold prose-headings:text-slate-800
          prose-p:mb-3 prose-p:text-slate-700
          prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-3
          prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-3
          prose-li:mb-1 prose-li:text-slate-700
          prose-blockquote:border-l-4 prose-blockquote:border-slate-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-500 prose-blockquote:my-4
          prose-a:text-blue-600 prose-a:underline
          prose-img:rounded-lg prose-img:my-4
          [&_table]:border-collapse [&_table]:w-full [&_table]:my-4
          [&_td]:border [&_td]:border-slate-300 [&_td]:px-3 [&_td]:py-2
          [&_th]:border [&_th]:border-slate-300 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-slate-50 [&_th]:font-semibold
          focus:bg-blue-50/20"
      />
    </div>
  );
}
