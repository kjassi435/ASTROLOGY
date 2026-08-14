"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { Button, Input, Textarea, Label, Card, Badge, Modal } from "./ui";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "url" | "checkbox" | "select" | "list" | "json";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
};

type Column = { key: string; label: string };

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
    },
    onError: (e) => toast.error(String(e)),
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

  function openAdd() {
    setEditing(blank());
    setOpen(true);
  }

  function openEdit(item: Record<string, unknown>) {
    const copy: Record<string, unknown> = { ...item };
    for (const f of fields) {
      if (f.type === "checkbox") copy[f.name] = Number(item[f.name] ?? 0);
      else if (f.type === "list" && Array.isArray(item[f.name])) copy[f.name] = (item[f.name] as unknown[]).join(", ");
      else if (f.type === "json" && typeof item[f.name] === "string") {
        try {
          copy[f.name] = JSON.stringify(JSON.parse(item[f.name] as string), null, 2);
        } catch {
          copy[f.name] = item[f.name];
        }
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
        payload[f.name] = String(val ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (f.type === "json") {
        if (val) {
          try {
            payload[f.name] = JSON.parse(String(val));
          } catch {
            toast.error(`${f.label} is not valid JSON`);
            return;
          }
        } else payload[f.name] = null;
      }
    }
    save.mutate(payload);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        <Button onClick={openAdd}>{addLabel}</Button>
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading…</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-semibold">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data ?? []).map((item) => (
                <tr key={String(item.id)} className="hover:bg-slate-50/60">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-slate-700">
                      {typeof item[c.key] === "object" ? JSON.stringify(item[c.key]) : String(item[c.key] ?? "—")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(item)} className="text-blue-600 hover:underline mr-3">
                      Edit
                    </button>
                    <button
                      onClick={() => remove.mutate(Number(item.id))}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {(data ?? []).length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-slate-400">
                    No items yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Card>

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
                    <select
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                      value={String(editing[f.name] ?? "")}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    >
                      <option value="">—</option>
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <label className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        checked={Number(editing[f.name]) === 1}
                        onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked ? 1 : 0 })}
                      />
                      <span className="text-sm text-slate-600">Enabled</span>
                    </label>
                  ) : (
                    <Input
                      type={f.type === "number" ? "number" : f.type === "url" ? "url" : "text"}
                      value={String(editing[f.name] ?? "")}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={save.isPending}>
                {save.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
