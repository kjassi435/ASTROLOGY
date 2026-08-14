"use client";

import { useQuery } from "@tanstack/react-query";
import { Card } from "./ui";

const TILES: { key: string; label: string }[] = [
  { key: "services", label: "Services" },
  { key: "courses", label: "Courses" },
  { key: "books", label: "Books" },
  { key: "products", label: "Vastu Products" },
  { key: "posts", label: "Blog Posts" },
  { key: "testimonials", label: "Testimonials" },
  { key: "enquiries", label: "Enquiries" },
];

export function Overview({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      const json = await res.json();
      return json.stats as Record<string, number>;
    },
  });

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-slate-800">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {TILES.map((t) => (
          <Card
            key={t.key}
            onClick={() => onNavigate(t.key)}
            className="cursor-pointer p-5 transition hover:shadow-md hover:border-blue-300"
          >
            <div className="text-3xl font-bold text-slate-900">{data?.[t.key] ?? "—"}</div>
            <div className="mt-1 text-sm text-slate-500">{t.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
