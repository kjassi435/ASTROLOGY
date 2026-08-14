"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card } from "@/components/admin/ui";
import { SITE_PAGES, type SitePage } from "@/lib/site-content";

type PageData = { slug: string; title: string; fields: SitePage["fields"]; values: Record<string, string> };

async function fetchPages(): Promise<PageData[]> {
  const res = await fetch("/api/admin/pages", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load");
  const data = await res.json();
  return data.items as PageData[];
}

export default function SiteContent() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["pages"], queryFn: fetchPages });
  const [active, setActive] = useState("global");
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  const pages = data ?? [];
  const current = pages.find((p) => p.slug === active);

  useEffect(() => {
    if (current) setDraft({ ...current.values });
    setSaved(false);
    setPreviewUrls({});
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
    onSuccess: () => { setSaved(true); qc.invalidateQueries({ queryKey: ["pages"] }); },
  });

  if (isLoading) return <div className="text-sm text-slate-500">Loading…</div>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Site Content</h2>
        <p className="text-sm text-slate-500 mt-1">Edit any text on your website. Changes appear instantly.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
        {SITE_PAGES.map((p) => (
          <button key={p.slug} onClick={() => setActive(p.slug)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              active === p.slug
                ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            <span>{p.icon}</span>
            <span className="truncate">{p.title}</span>
          </button>
        ))}
      </div>

      {saved && (
        <div className="mb-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 flex items-center gap-2">
          <span className="text-green-500">✓</span> Saved successfully. Changes are live on the website.
        </div>
      )}

      <Card className="p-6">
        {current ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{SITE_PAGES.find(p => p.slug === active)?.icon} {current.title}</h3>
                <p className="text-sm text-slate-500">{current.fields.length} field{current.fields.length !== 1 ? "s" : ""}</p>
              </div>
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
                className="shadow-lg shadow-emerald-500/25"
              >
                {saving || mutation.isPending ? "Saving…" : "Save Changes"}
              </Button>
            </div>

            <div className="space-y-5">
              {current.fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{f.label}</label>
                  {f.textarea ? (
                    <textarea
                      value={draft[f.key] ?? ""}
                      onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  ) : (
                    <>
                      <input
                        value={draft[f.key] ?? ""}
                        onChange={(e) => {
                          setDraft((d) => ({ ...d, [f.key]: e.target.value }));
                          if (f.key.toLowerCase().includes("url") || f.key.toLowerCase().includes("logo")) {
                            setPreviewUrls((p) => ({ ...p, [f.key]: e.target.value }));
                          }
                        }}
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                      />
                      {(f.key.toLowerCase().includes("url") || f.key.toLowerCase().includes("logo")) && draft[f.key] && (
                        <div className="mt-2">
                          {previewUrls[f.key] ? (
                            <div className="relative inline-block">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={previewUrls[f.key]} alt="Preview" className="h-16 w-16 rounded-lg object-cover border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                              <button type="button" onClick={() => setPreviewUrls((p) => { const n = { ...p }; delete n[f.key]; return n; })} className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">×</button>
                            </div>
                          ) : draft[f.key] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={draft[f.key]} alt="Preview" className="h-16 w-16 rounded-lg object-cover border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          ) : null}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-sm text-slate-500">Select a page to edit.</div>
        )}
      </Card>
    </div>
  );
}
