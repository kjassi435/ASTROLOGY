"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { Button, Input, Textarea, Label, Card, Modal } from "./ui";
import { IconSearch, IconTrash, IconPencil, IconPlus, IconImage, IconX } from "@/components/Icons";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "url" | "checkbox" | "select" | "list" | "json";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
};

type Column = { key: string; label: string };

function ImagePreview({ src, className = "" }: { src?: string; className?: string }) {
  if (!src) return <div className={`flex items-center justify-center rounded-lg bg-slate-100 text-slate-400 ${className}`}><IconImage size={20} /></div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className={`rounded-lg object-cover ${className}`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />;
}

export function ResourceManager({
  resource,
  title,
  columns,
  fields,
  addLabel = "Add",
}: {
  resource: string;
  title: string;
  columns: Column[];
  fields: FieldDef[];
  addLabel?: string;
}) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: [resource],
    queryFn: async () => {
      const res = await fetch(`/api/admin/${resource}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      return json.items as Record<string, unknown>[];
    },
  });

  const save = useMutation({
    mutationFn: async (form: Record<string, unknown>) => {
      const { id, ...payload } = form;
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/admin/${resource}/${id}` : `/api/admin/${resource}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: [resource] });
      setOpen(false);
    },
    onError: (e) => toast.error(String(e)),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: [resource] });
      setDeleteConfirm(null);
    },
    onError: (e) => toast.error(String(e)),
  });

  const items = data ?? [];
  const filtered = items.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return Object.values(item).some((v) => v != null && String(v).toLowerCase().includes(q));
  });

  function blank() {
    const init: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.type === "checkbox") init[f.name] = 0;
      else if (f.type === "number") init[f.name] = "";
      else init[f.name] = "";
    }
    return init;
  }

  function openAdd() { setEditing(blank()); setOpen(true); }

  function openEdit(item: Record<string, unknown>) {
    const copy: Record<string, unknown> = { ...item };
    for (const f of fields) {
      if (f.type === "checkbox") copy[f.name] = Number(item[f.name] ?? 0);
      else if (f.type === "list" && Array.isArray(item[f.name])) copy[f.name] = (item[f.name] as unknown[]).join(", ");
      else if (f.type === "json" && typeof item[f.name] === "string") {
        try { copy[f.name] = JSON.stringify(JSON.parse(item[f.name] as string), null, 2); } catch { copy[f.name] = item[f.name]; }
      }
    }
    setEditing(copy);
    setOpen(true);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const payload: Record<string, unknown> = { ...editing };
    for (const f of fields) {
      const val = payload[f.name];
      if (f.type === "checkbox") payload[f.name] = val ? 1 : 0;
      else if (f.type === "number") payload[f.name] = val === "" || val == null ? null : Number(val);
      else if (f.type === "list") {
        payload[f.name] = String(val ?? "").split(",").map((s) => s.trim()).filter(Boolean);
      } else if (f.type === "json") {
        if (val) {
          try { payload[f.name] = JSON.parse(String(val)); } catch { toast.error(`${f.label} is not valid JSON`); return; }
        } else payload[f.name] = null;
      }
    }
    save.mutate(payload);
  }

  const imageField = fields.find((f) => f.name === "image" && (f.type === "url" || f.type === "text"));

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <p className="text-sm text-slate-500 mt-1">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        </div>
        <Button onClick={openAdd} className="shadow-lg shadow-blue-500/25">
          <IconPlus size={16} /> {addLabel}
        </Button>
      </div>

      {items.length > 3 && (
        <div className="mb-4 relative">
          <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <IconX size={14} />
            </button>
          )}
        </div>
      )}

      <Card className="overflow-hidden shadow-lg shadow-slate-200/50">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-slate-400">Loading…</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  {imageField && <th className="w-16 px-4 py-3.5">Image</th>}
                  {columns.map((c) => (
                    <th key={c.key} className="px-4 py-3.5">{c.label}</th>
                  ))}
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={String(item.id)} className="group transition hover:bg-blue-50/40">
                    {imageField && (
                      <td className="px-4 py-3">
                        <ImagePreview src={String(item.image ?? "")} className="h-12 w-12 rounded-lg" />
                      </td>
                    )}
                    {columns.map((c) => (
                      <td key={c.key} className="px-4 py-3 font-medium text-slate-700">
                        {c.key === "type" ? (
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item[c.key] === "live" ? "bg-green-100 text-green-700" :
                            item[c.key] === "free" ? "bg-purple-100 text-purple-700" :
                            "bg-blue-100 text-blue-700"
                          }`}>{String(item[c.key] ?? "—")}</span>
                        ) : typeof item[c.key] === "object" ? JSON.stringify(item[c.key]) : String(item[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(item)} className="rounded-lg p-2 text-slate-400 hover:bg-blue-100 hover:text-blue-600 transition" title="Edit">
                          <IconPencil size={15} />
                        </button>
                        <button onClick={() => setDeleteConfirm(Number(item.id))} className="rounded-lg p-2 text-slate-400 hover:bg-red-100 hover:text-red-600 transition" title="Delete">
                          <IconTrash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={columns.length + (imageField ? 2 : 1)} className="px-4 py-12 text-center text-slate-400">{search ? "No results" : "No items yet"}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {deleteConfirm && (
        <Modal open onClose={() => setDeleteConfirm(null)} title="Confirm Delete">
          <p className="text-sm text-slate-600 mb-6">Are you sure you want to delete this item? This cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => remove.mutate(deleteConfirm)} disabled={remove.isPending}>
              {remove.isPending ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </Modal>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing?.id ? `Edit ${title}` : `New ${title}`}>
        {editing && (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.type === "textarea" || f.type === "json" ? "sm:col-span-2" : ""}>
                  <Label>{f.label}</Label>
                  {f.type === "textarea" ? (
                    <Textarea rows={4} value={String(editing[f.name] ?? "")} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })} placeholder={f.placeholder} />
                  ) : f.type === "json" ? (
                    <Textarea rows={8} className="font-mono text-xs" value={String(editing[f.name] ?? "")} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })} placeholder={f.placeholder} />
                  ) : f.type === "select" ? (
                    <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" value={String(editing[f.name] ?? "")} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}>
                      <option value="">—</option>
                      {f.options?.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <label className="flex items-center gap-2 pt-2">
                      <input type="checkbox" checked={Number(editing[f.name]) === 1} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked ? 1 : 0 })} className="h-4 w-4 rounded border-slate-300" />
                      <span className="text-sm text-slate-600">Enabled</span>
                    </label>
                  ) : (
                    <>
                      <Input
                        type={f.type === "number" ? "number" : f.type === "url" ? "url" : "text"}
                        value={String(editing[f.name] ?? "")}
                        onChange={(e) => {
                          setEditing({ ...editing, [f.name]: e.target.value });
                          if (f.name === "image") setPreviewUrl({ ...previewUrl, [f.name]: e.target.value });
                        }}
                        placeholder={f.placeholder}
                      />
                      {f.name === "image" && (
                        <div className="mt-2">
                          {previewUrl[f.name] ? (
                            <div className="relative inline-block">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={previewUrl[f.name]} alt="Preview" className="h-24 w-24 rounded-lg object-cover border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                              <button type="button" onClick={() => setPreviewUrl({ ...previewUrl, [f.name]: "" })} className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">×</button>
                            </div>
                          ) : String(editing[f.name]) ? (
                            <div className="relative inline-block">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={String(editing[f.name])} alt="Preview" className="h-24 w-24 rounded-lg object-cover border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={save.isPending}>{save.isPending ? "Saving…" : "Save"}</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
