"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Sparkles,
  GraduationCap,
  BookOpen,
  Package,
  Newspaper,
  MessageSquare,
  Star,
  FileText,
  LogOut,
  ExternalLink,
  Database,
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

type TabId = "overview" | "services" | "courses" | "books" | "products" | "posts" | "testimonials" | "enquiries" | "sitecontent";

const NAV: { id: TabId; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "services", label: "Services", icon: Sparkles },
  { id: "courses", label: "Courses", icon: GraduationCap },
  { id: "books", label: "Books", icon: BookOpen },
  { id: "products", label: "Vastu Products", icon: Package },
  { id: "posts", label: "Blog", icon: Newspaper },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "enquiries", label: "Enquiries", icon: MessageSquare },
  { id: "sitecontent", label: "Site Content", icon: FileText },
];

export default function AdminApp() {
  const qc = useQueryClient();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<TabId>("overview");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
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
    if (res.ok) {
      setAuthed(true);
      toast.success("Welcome back");
    } else {
      toast.error("Invalid password");
    }
  }

  function logout() {
    fetch("/api/admin/check", { method: "DELETE" }).finally(() => {
      setAuthed(false);
      qc.clear();
    });
  }

  if (authed === null) {
    return <div className="flex min-h-screen items-center justify-center text-slate-400">Loading…</div>;
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <Card className="w-full max-w-sm p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
            <p className="mt-1 text-sm text-slate-500">Arvin Astro Content Manager</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" autoFocus />
            </div>
            <Button type="submit" className="w-full" disabled={logging}>
              {logging ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-64 shrink-0 flex-col bg-slate-900 text-slate-200 lg:flex">
        <div className="flex items-center gap-2 px-6 py-5 text-lg font-bold text-white">
          <Sparkles size={20} className="text-blue-400" /> Arvin Astro
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  tab === n.id ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon size={18} /> {n.label}
              </button>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-slate-800 p-3">
          <button onClick={seed} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800">
            <Database size={18} /> Seed Database
          </button>
          <a href="/" target="_blank" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800">
            <ExternalLink size={18} /> View Site
          </a>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            {NAV.find((n) => n.id === tab)?.label}
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <select value={tab} onChange={(e) => setTab(e.target.value as TabId)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              {NAV.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
          </div>
        </header>

        <main className="p-6">
          {tab === "overview" && <Overview onNavigate={(t) => setTab(t as TabId)} />}
          {tab === "services" && (
            <ResourceManager resource="services" title="Services" columns={[{ key: "name", label: "Name" }, { key: "tagline", label: "Tagline" }]} fields={SERVICE_FIELDS} addLabel="Add Service" />
          )}
          {tab === "courses" && (
            <ResourceManager
              resource="courses"
              title="Courses"
              columns={[{ key: "title", label: "Title" }, { key: "type", label: "Type" }, { key: "price", label: "Price" }]}
              fields={COURSE_FIELDS}
              addLabel="Add Course"
            />
          )}
          {tab === "books" && <ResourceManager resource="books" title="Books" columns={[{ key: "title", label: "Title" }]} fields={BOOK_FIELDS} addLabel="Add Book" />}
          {tab === "products" && <ResourceManager resource="products" title="Vastu Products" columns={[{ key: "title", label: "Title" }]} fields={PRODUCT_FIELDS} addLabel="Add Product" />}
          {tab === "posts" && (
            <ResourceManager resource="posts" title="Blog Posts" columns={[{ key: "title", label: "Title" }, { key: "category", label: "Category" }]} fields={POST_FIELDS} addLabel="Add Post" />
          )}
          {tab === "testimonials" && <ResourceManager resource="testimonials" title="Testimonials" columns={[{ key: "name", label: "Name" }, { key: "source", label: "Source" }]} fields={TESTIMONIAL_FIELDS} addLabel="Add Testimonial" />}
          {tab === "enquiries" && <Enquiries />}
          {tab === "sitecontent" && <SiteContent />}
        </main>
      </div>
    </div>
  );
}
