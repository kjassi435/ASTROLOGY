"use client";

import { useQuery } from "@tanstack/react-query";
import { Sparkles, GraduationCap, BookOpen, Package, Newspaper, Star, MessageSquare, ArrowRight } from "lucide-react";

type TabId = "overview" | "services" | "courses" | "books" | "products" | "posts" | "testimonials" | "enquiries" | "sitecontent";

const CARDS = [
  { key: "services", label: "Services", icon: Sparkles, color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-600", tab: "services" as TabId },
  { key: "courses", label: "Courses", icon: GraduationCap, color: "from-green-500 to-emerald-600", bg: "bg-green-50", text: "text-green-600", tab: "courses" as TabId },
  { key: "books", label: "Books", icon: BookOpen, color: "from-purple-500 to-violet-600", bg: "bg-purple-50", text: "text-purple-600", tab: "books" as TabId },
  { key: "products", label: "Products", icon: Package, color: "from-pink-500 to-rose-600", bg: "bg-pink-50", text: "text-pink-600", tab: "products" as TabId },
  { key: "posts", label: "Blog Posts", icon: Newspaper, color: "from-cyan-500 to-blue-600", bg: "bg-cyan-50", text: "text-cyan-600", tab: "posts" as TabId },
  { key: "testimonials", label: "Testimonials", icon: Star, color: "from-yellow-500 to-amber-600", bg: "bg-yellow-50", text: "text-yellow-600", tab: "testimonials" as TabId },
  { key: "enquiries", label: "Enquiries", icon: MessageSquare, color: "from-teal-500 to-cyan-600", bg: "bg-teal-50", text: "text-teal-600", tab: "enquiries" as TabId },
];

export function Overview({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      if (!res.ok) return null;
      const d = await res.json();
      return d.stats as Record<string, number>;
    },
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => { const r = await fetch("/api/admin/services", { cache: "no-store" }); return r.ok ? (await r.json()).items : []; },
  });

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Welcome back</h2>
        <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your website.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {CARDS.map((c) => {
          const Icon = c.icon;
          const count = stats?.[c.key] ?? 0;
          return (
            <button key={c.key} onClick={() => onNavigate(c.tab)}
              className="group rounded-2xl bg-white p-5 shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-lg`}>
                  <Icon size={22} />
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-slate-500 transition mt-1" />
              </div>
              <div className="text-3xl font-bold text-slate-800">{count}</div>
              <div className="text-sm text-slate-500">{c.label}</div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Services</h3>
          {services?.length ? (
            <div className="space-y-3">
              {services.slice(0, 5).map((s: Record<string, unknown>) => (
                <div key={String(s.id)} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                    {s.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={String(s.image)} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400"><Sparkles size={16} /></div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm text-slate-800 truncate">{String(s.name)}</div>
                    <div className="text-xs text-slate-500 truncate">{String(s.tagline ?? "")}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No services yet.</p>
          )}
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
          <p className="text-sm text-white/80 mb-4">Manage your website content from here.</p>
          <div className="space-y-2">
            {[
              { label: "Add a new service", tab: "services" },
              { label: "Add a new course", tab: "courses" },
              { label: "Edit homepage content", tab: "sitecontent" },
              { label: "Manage blog posts", tab: "posts" },
            ].map((a) => (
              <button key={a.tab} onClick={() => onNavigate(a.tab)}
                className="flex w-full items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium hover:bg-white/25 transition"
              >
                <ArrowRight size={14} /> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
