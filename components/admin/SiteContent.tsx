"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card } from "@/components/admin/ui";
import { ImageInput } from "@/components/admin/ImageInput";
import { SITE_PAGES, type SitePage } from "@/lib/site-content";

type PageData = { slug: string; title: string; fields: SitePage["fields"]; values: Record<string, string> };

type CourseOption = { slug: string; title: string; type: string };

async function fetchPages(): Promise<PageData[]> {
  const res = await fetch("/api/admin/pages", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load");
  const data = await res.json();
  return data.items as PageData[];
}

function parseJsonList(v?: string): string[] {
  if (!v) return [];
  try {
    const a = JSON.parse(v);
    if (Array.isArray(a)) return a.map(String);
  } catch {
    /* not json */
  }
  return [];
}

function listToLines(v?: string): string {
  if (!v) return "";
  try {
    const a = JSON.parse(v);
    if (Array.isArray(a)) return a.map(String).join("\n");
  } catch {
    /* not json */
  }
  return v;
}

function linesToList(v?: string): string {
  const lines = (v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return JSON.stringify(lines);
}

const TYPE_ORDER: Record<string, number> = { live: 0, recorded: 1, free: 2 };
const TYPE_LABEL: Record<string, string> = { live: "Live Courses", recorded: "Recorded Courses", free: "Free Courses" };

function CourseMultiSelect({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const { data } = useQuery({
    queryKey: ["courses-select"],
    queryFn: async () => {
      const res = await fetch("/api/admin/courses", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      return (json.items as CourseOption[]).filter((c) => c.type && c.slug);
    },
  });
  const selected = new Set(parseJsonList(value));
  const courses = (data ?? []).sort(
    (a, b) => (TYPE_ORDER[a.type] ?? 9) - (TYPE_ORDER[b.type] ?? 9) || a.title.localeCompare(b.title)
  );

  function toggle(slug: string) {
    const next = new Set(selected);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    onChange(JSON.stringify([...next]));
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      {!data ? (
        <div className="text-sm text-slate-400">Loading courses…</div>
      ) : (
        <>
          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
            <span>
              {selected.size} selected — courses come from your Recorded / Free / Live database
            </span>
            {selected.size > 0 && (
              <button type="button" onClick={() => onChange("[]")} className="font-semibold text-red-500 hover:underline">
                Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 max-h-72 overflow-y-auto">
            {Object.keys(TYPE_LABEL).map((type) => {
              const group = courses.filter((c) => c.type === type);
              if (!group.length) return null;
              return (
                <div key={type} className="col-span-full">
                  <div className="mt-2 mb-1 text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">{TYPE_LABEL[type]}</div>
                  {group.map((c) => {
                    const on = selected.has(c.slug);
                    return (
                      <label
                        key={c.slug}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                          on ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <input type="checkbox" checked={on} onChange={() => toggle(c.slug)} className="h-4 w-4 rounded border-slate-300 accent-blue-600" />
                        <span className="truncate">{c.title}</span>
                      </label>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function SiteContent({ defaultSlug }: { defaultSlug?: string }) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["pages"], queryFn: fetchPages });
  const [active, setActive] = useState(defaultSlug ?? "global");
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
    onSuccess: () => { setSaved(true); qc.invalidateQueries({ queryKey: ["pages"] }); },
  });

  if (isLoading) return <div className="text-sm text-slate-500">Loading…</div>;

  function save() {
    const payload: Record<string, string> = { ...draft };
    if (current) {
      for (const f of current.fields) {
        if (f.type === "list") payload[f.key] = linesToList(listToLines(draft[f.key]));
      }
    }
    setSaving(true);
    mutation.mutate({ slug: active, fields: payload }, { onSettled: () => setSaving(false) });
  }

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
                onClick={save}
                className="shadow-lg shadow-emerald-500/25"
              >
                {saving || mutation.isPending ? "Saving…" : "Save Changes"}
              </Button>
            </div>

            <div className="space-y-5">
              {current.fields.map((f) => {
                const isTextarea = f.type === "textarea";
                const isJson = f.type === "json";
                const isList = f.type === "list";
                const isImage = f.type === "image";
                const isCourses = f.type === "courses";
                return (
                  <div key={f.key}>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{f.label}</label>
                    {isImage ? (
                      <ImageInput value={draft[f.key] ?? ""} onChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))} label={f.label} />
                    ) : isCourses ? (
                      <CourseMultiSelect value={draft[f.key] ?? ""} onChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))} />
                    ) : isTextarea || isJson || isList ? (
                      <textarea
                        value={isList ? listToLines(draft[f.key]) : (draft[f.key] ?? "")}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                        rows={isJson ? 8 : isList ? 5 : 3}
                        className={
                          isJson
                            ? "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                            : "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                        }
                      />
                    ) : (
                      <input
                        value={draft[f.key] ?? ""}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    )}
                    {f.hint ? <p className="mt-1 text-xs text-slate-400">{f.hint}</p> : null}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-sm text-slate-500">Select a page to edit.</div>
        )}
      </Card>
    </div>
  );
}