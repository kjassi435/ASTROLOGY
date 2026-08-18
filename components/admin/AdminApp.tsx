"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  LayoutDashboard, Sparkles, GraduationCap, BookOpen, Package,
  Newspaper, MessageSquare, Star, FileText, LogOut, ExternalLink,
  Database, Settings, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button, Input, Card } from "./ui";
import { ResourceManager, type FieldDef } from "./ResourceManager";
import { Overview } from "./Overview";
import { Enquiries } from "./Enquiries";
import SiteContent from "./SiteContent";

const SERVICE_FIELDS: FieldDef[] = [
  { name: "slug", label: "Slug", required: true, placeholder: "kundli-analysis" },
  { name: "name", label: "Name", required: true },
  { name: "tagline", label: "Tagline" },
  { name: "icon", label: "Icon" },
  { name: "featured", label: "Featured", type: "checkbox" },
  { name: "popular", label: "Popular", type: "checkbox" },
  { name: "description", label: "Short Description", type: "textarea" },
  { name: "long_description", label: "Long Description", type: "textarea" },
  { name: "includes", label: "Includes (comma separated)", type: "list" },
  { name: "tiers", label: "Pricing Tiers (JSON array)", type: "json", placeholder: '[{"name":"Basic","price":1100}]' },
  { name: "booking_notes", label: "Booking Notes", type: "textarea" },
];

const COURSE_FIELDS: FieldDef[] = [
  { name: "slug", label: "Slug", required: true },
  { name: "title", label: "Title", required: true },
  { name: "type", label: "Type", type: "select", options: [{ value: "live", label: "Live" }, { value: "recorded", label: "Recorded" }, { value: "free", label: "Free" }] },
  { name: "category", label: "Category" },
  { name: "teacher", label: "Teacher" },
  { name: "tagline", label: "Tagline" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "price", label: "Price (₹)", type: "number" },
  { name: "original_price", label: "Original Price (₹)", type: "number" },
  { name: "buy_url", label: "Buy URL", type: "url" },
  { name: "youtube_url", label: "YouTube URL", type: "url" },
  { name: "badge", label: "Badge" },
  { name: "image", label: "Image URL", type: "url" },
  { name: "features", label: "Features (comma separated)", type: "list" },
  { name: "syllabus", label: "Syllabus (comma separated)", type: "list" },
  { name: "duration", label: "Duration" },
];

const BOOK_FIELDS: FieldDef[] = [
  { name: "title", label: "Title", required: true },
  { name: "note", label: "Note", type: "textarea" },
  { name: "image", label: "Image URL", type: "url" },
  { name: "buy_url", label: "Buy URL", type: "url" },
];

const PRODUCT_FIELDS: FieldDef[] = [
  { name: "title", label: "Title", required: true },
  { name: "note", label: "Note", type: "textarea" },
  { name: "image", label: "Image URL", type: "url" },
  { name: "buy_url", label: "Buy URL", type: "url" },
];

const POST_FIELDS: FieldDef[] = [
  { name: "slug", label: "Slug", required: true },
  { name: "title", label: "Title", required: true },
  { name: "category", label: "Category" },
  { name: "excerpt", label: "Excerpt", type: "textarea" },
  { name: "date", label: "Date" },
  { name: "read_time", label: "Read Time", placeholder: "5 min read" },
  { name: "image", label: "Image URL", type: "url" },
  { name: "content", label: "Content (HTML/Markdown)", type: "textarea" },
];

const TESTIMONIAL_FIELDS: FieldDef[] = [
  { name: "name", label: "Name", required: true },
  { name: "initials", label: "Initials" },
  { name: "text", label: "Text", type: "textarea" },
  { name: "source", label: "Source" },
  { name: "badge", label: "Badge" },
];

type TabId = "overview" | "services" | "courses" | "books" | "products" | "posts" | "testimonials" | "enquiries" | "sitecontent" | "settings";

const NAV: { id: TabId; label: string; icon: React.ComponentType<{ size?: number }>; color?: string }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard, color: "from-blue-500 to-indigo-600" },
  { id: "services", label: "Services", icon: Sparkles, color: "from-amber-500 to-orange-600" },
  { id: "courses", label: "Courses", icon: GraduationCap, color: "from-green-500 to-emerald-600" },
  { id: "books", label: "Books", icon: BookOpen, color: "from-purple-500 to-violet-600" },
  { id: "products", label: "Vastu Products", icon: Package, color: "from-pink-500 to-rose-600" },
  { id: "posts", label: "Blog", icon: Newspaper, color: "from-cyan-500 to-blue-600" },
  { id: "testimonials", label: "Testimonials", icon: Star, color: "from-yellow-500 to-amber-600" },
  { id: "enquiries", label: "Enquiries", icon: MessageSquare, color: "from-teal-500 to-cyan-600" },
  { id: "sitecontent", label: "Site Content", icon: FileText, color: "from-indigo-500 to-purple-600" },
  { id: "settings", label: "Settings", icon: Settings, color: "from-slate-500 to-gray-600" },
];

export default function AdminApp() {
  const qc = useQueryClient();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<TabId>("overview");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check").then((r) => setAuthed(r.ok)).catch(() => setAuthed(false));
  }, []);

  async function seed() {
    const res = await fetch("/api/admin/seed", { method: "POST" });
    if (res.ok) toast.success("Database seeded from current content");
    else toast.error("Seed failed");
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLogging(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLogging(false);
    if (res.ok) { setAuthed(true); toast.success("Welcome back"); }
    else toast.error("Invalid password");
  }

  function logout() {
    fetch("/api/admin/check", { method: "DELETE" }).finally(() => { setAuthed(false); qc.clear(); });
  }

  if (authed === null) return <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">Loading…</div>;

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0083fe] via-[#006dd4] to-[#059669] p-6">
        <Card className="w-full max-w-sm p-8 bg-white/95 backdrop-blur shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
              <img src="/images/logo.png" alt="Arvin Astro" style={{ width: 160, height: 160, objectFit: "contain" }} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Arvin Astro</h1>
            <p className="mt-1 text-sm text-slate-500">Content Management System</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" autoFocus />
            </div>
            <Button type="submit" className="w-full shadow-lg shadow-blue-500/25" disabled={logging}>
              {logging ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <aside className={`${collapsed ? "w-20" : "w-64"} hidden flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-200 transition-all duration-300 lg:flex`}>
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
            <Sparkles size={18} />
          </div>
          {!collapsed && <span className="text-lg font-bold text-white">Arvin Astro</span>}
        </div>
        <nav className="flex-1 space-y-1 px-3 mt-2">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = tab === n.id;
            return (
              <button key={n.id} onClick={() => setTab(n.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active ? "bg-white/10 text-white shadow-lg shadow-black/10" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
                title={collapsed ? n.label : undefined}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${active ? `bg-gradient-to-br ${n.color} shadow-md` : "bg-slate-700/50"}`}>
                  <Icon size={16} />
                </div>
                {!collapsed && n.label}
              </button>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-slate-700/50 p-3">
          <button onClick={() => setCollapsed(!collapsed)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && "Collapse"}
          </button>
          <button onClick={seed} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
            <Database size={18} /> {!collapsed && "Seed Database"}
          </button>
          <a href="/" target="_blank" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
            <ExternalLink size={18} /> {!collapsed && "View Site"}
          </a>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400">
            <LogOut size={18} /> {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-xl px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{NAV.find((n) => n.id === tab)?.label}</h2>
          </div>
          <div className="flex items-center gap-3">
            <select value={tab} onChange={(e) => setTab(e.target.value as TabId)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm lg:hidden">
              {NAV.map((n) => (<option key={n.id} value={n.id}>{n.label}</option>))}
            </select>
          </div>
        </header>
        <main className="p-6">
          {tab === "overview" && <Overview onNavigate={(t) => setTab(t as TabId)} />}
          {tab === "services" && <ResourceManager resource="services" title="Services" columns={[{ key: "name", label: "Name" }, { key: "tagline", label: "Tagline" }, { key: "slug", label: "Slug" }]} fields={SERVICE_FIELDS} addLabel="Add Service" />}
          {tab === "courses" && <ResourceManager resource="courses" title="Courses" columns={[{ key: "title", label: "Title" }, { key: "type", label: "Type" }, { key: "price", label: "Price" }, { key: "category", label: "Category" }]} fields={COURSE_FIELDS} addLabel="Add Course" />}
          {tab === "books" && <ResourceManager resource="books" title="Books" columns={[{ key: "title", label: "Title" }, { key: "note", label: "Note" }]} fields={BOOK_FIELDS} addLabel="Add Book" />}
          {tab === "products" && <ResourceManager resource="products" title="Vastu Products" columns={[{ key: "title", label: "Title" }, { key: "note", label: "Note" }]} fields={PRODUCT_FIELDS} addLabel="Add Product" />}
          {tab === "posts" && <ResourceManager resource="posts" title="Blog Posts" columns={[{ key: "title", label: "Title" }, { key: "category", label: "Category" }, { key: "date", label: "Date" }]} fields={POST_FIELDS} addLabel="Add Post" />}
          {tab === "testimonials" && <ResourceManager resource="testimonials" title="Testimonials" columns={[{ key: "name", label: "Name" }, { key: "text", label: "Review" }, { key: "source", label: "Source" }]} fields={TESTIMONIAL_FIELDS} addLabel="Add Testimonial" />}
          {tab === "enquiries" && <Enquiries />}
          {tab === "sitecontent" && <SiteContent />}
          {tab === "settings" && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [saving, setSaving] = useState(false);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      if (res.ok) { toast.success("Password changed"); setCurrentPw(""); setNewPw(""); }
      else { const d = await res.json(); toast.error(d.error || "Failed"); }
    } catch { toast.error("Failed"); }
    setSaving(false);
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Settings</h2>
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Change Admin Password</h3>
        <form onSubmit={changePassword} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Current Password</label>
            <Input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="Current password" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">New Password</label>
            <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="New password" />
          </div>
          <Button type="submit" disabled={saving || !currentPw || !newPw}>{saving ? "Saving…" : "Change Password"}</Button>
        </form>
      </Card>
    </div>
  );
}
