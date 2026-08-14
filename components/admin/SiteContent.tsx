"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card } from "@/components/admin/ui";

type FieldDef = { key: string; label: string; textarea?: boolean };
type PageDef = { slug: string; title: string; fields: FieldDef[]; values: Record<string, string> };

async function fetchPages(): Promise<PageDef[]> {
  const res = await fetch("/api/admin/pages", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load");
  const data = await res.json();
  return data.items as PageDef[];
}

export default function SiteContent() {
  const qc = useQueryClient();
  const { data, isLoading, isError } = useQuery({ queryKey: ["pages"], queryFn: fetchPages });

  const [active, setActive] = useState<string>("home");
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const pages = data ?? [];
  const current = pages.find((p) => p.slug === active);

  useEffect(() => {
    if (current) setDraft({ ...current.values });
    setSaved(false);
  }, [current]);

  const mutation = useMutation({
    mutationFn: async (payload: { slug: string; fields: Record<string, string> }) => {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      return res.json();
    },
    onSuccess: () => {
      setSaved(true);
      qc.invalidateQueries({ queryKey: ["pages"] });
    },
  });

  if (isLoading) return <div className="text-sm text-slate-500">Loading site content…</div>;
  if (isError) return <div className="text-sm text-red-500">Failed to load site content.</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Site Content</h2>
        <Button
          variant="success"
          disabled={saving || mutation.isPending}
          onClick={() => {
            setSaving(true);
            mutation.mutate(
              { slug: active, fields: draft },
              { onSettled: () => setSaving(false) }
            );
          }}
        >
          {saving || mutation.isPending ? "Saving…" : "Save Changes"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {pages.map((p) => (
          <button
            key={p.slug}
            onClick={() => setActive(p.slug)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              active === p.slug
                ? "bg-indigo-600 text-white shadow-[0_4px_0_0_#4338ca]"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {saved && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2">
          Saved successfully.
        </div>
      )}

      <Card>
        {current && current.fields.length > 0 ? (
          <div className="space-y-5">
            {current.fields.map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {f.label}
                </label>
                {f.textarea ? (
                  <textarea
                    value={draft[f.key] ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                ) : (
                  <input
                    value={draft[f.key] ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-500">No editable fields defined for this page.</div>
        )}
      </Card>
    </div>
  );
}
