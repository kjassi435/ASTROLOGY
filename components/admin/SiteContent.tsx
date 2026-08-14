"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Card, Button, Input, Textarea, Label } from "./ui";

type Page = { slug: string; title: string; fields: Record<string, string> };

export function SiteContent() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const res = await fetch("/api/admin/pages", { cache: "no-store" });
      const json = await res.json();
      return json.items as Page[];
    },
  });

  const [active, setActive] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});

  const current = data?.find((p) => p.slug === active) ?? data?.[0];

  useEffect(() => {
    if (current) setDraft(current.fields ?? {});
  }, [current?.slug]);

  const save = useMutation({
    mutationFn: async (fields: Record<string, string>) => {
      const res = await fetch(`/api/admin/pages/${current!.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      });
      if (!res.ok) throw new Error("Save failed");
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["pages"] });
    },
    onError: (e) => toast.error(String(e)),
  });

  if (isLoading) return <div className="p-8 text-sm text-slate-400">Loading…</div>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-slate-800">Site Content</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
        <Card className="p-2">
          {(data ?? []).map((p) => (
            <button
              key={p.slug}
              onClick={() => setActive(p.slug)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                current?.slug === p.slug ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {p.title}
            </button>
          ))}
        </Card>

        <Card className="p-6">
          {current ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                save.mutate(draft);
              }}
              className="space-y-4"
            >
              <div className="text-sm font-semibold text-slate-700">{current.title}</div>
              {Object.keys(draft).length > 0 ? (
                Object.keys(draft).map((k) => (
                  <div key={k}>
                    <Label>{k}</Label>
                    {String(draft[k]).length > 60 ? (
                      <Textarea
                        rows={3}
                        value={draft[k]}
                        onChange={(e) => setDraft((d) => ({ ...d, [k]: e.target.value }))}
                      />
                    ) : (
                      <Input value={draft[k]} onChange={(e) => setDraft((d) => ({ ...d, [k]: e.target.value }))} />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">No editable fields defined for this page.</p>
              )}
              <div className="flex justify-end">
                <Button type="submit" disabled={save.isPending}>
                  {save.isPending ? "Saving…" : "Save"}
                </Button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-slate-400">Select a page.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
