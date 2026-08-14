"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card } from "./ui";

export function Enquiries() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const res = await fetch("/api/admin/enquiries", { cache: "no-store" });
      const json = await res.json();
      return json.items as Record<string, unknown>[];
    },
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["enquiries"] });
    },
    onError: (e) => toast.error(String(e)),
  });

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-slate-800">Enquiries</h2>
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading…</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data ?? []).map((e) => (
                <tr key={String(e.id)} className="hover:bg-slate-50/60 align-top">
                  <td className="px-4 py-3 font-medium text-slate-800">{String(e.name)}</td>
                  <td className="px-4 py-3 text-slate-600">{String(e.phone ?? "—")}</td>
                  <td className="px-4 py-3 text-slate-600">{String(e.email ?? "—")}</td>
                  <td className="px-4 py-3 text-slate-600">{String(e.service ?? "—")}</td>
                  <td className="px-4 py-3 max-w-xs text-slate-600">{String(e.message ?? "—")}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove.mutate(Number(e.id))} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {(data ?? []).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    No enquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
