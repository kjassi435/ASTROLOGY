"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { Button, Input, Textarea, Label, Card, Modal } from "./ui";
import { IconSearch, IconTrash, IconPencil, IconPlus, IconX } from "@/components/Icons";
import { RichTextEditor } from "./RichTextEditor";

type Post = {
  id?: number;
  slug: string;
  title: string;
  category?: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  image?: string;
  body?: string;
  status?: string;
  author?: string;
  tags?: string;
};

const EMPTY_POST: Post = {
  slug: "",
  title: "",
  category: "",
  excerpt: "",
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  readTime: "5 min read",
  image: "",
  body: "",
  status: "published",
  author: "Arvindrun Vnjay",
  tags: "",
};

export function PostsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/admin/posts", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      return (json.items ?? []) as Post[];
    },
  });

  const save = useMutation({
    mutationFn: async (form: Record<string, unknown>) => {
      const { id, ...payload } = form;
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/admin/posts/${id}` : "/api/admin/posts";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
    },
    onSuccess: () => {
      toast.success("Post saved");
      qc.invalidateQueries({ queryKey: ["posts"] });
      setOpen(false);
      setEditing(null);
    },
    onError: (e) => toast.error(String(e)),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      toast.success("Post deleted");
      qc.invalidateQueries({ queryKey: ["posts"] });
      setDeleteConfirm(null);
    },
    onError: (e) => toast.error(String(e)),
  });

  const items = (posts ?? []).filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      (p.category ?? "").toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditing({ ...EMPTY_POST });
    setOpen(true);
  }

  function openEdit(post: Post) {
    setEditing({ ...post });
    setOpen(true);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    save.mutate(editing as unknown as Record<string, unknown>);
  }

  function autoSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Blog Posts</h2>
          <p className="text-sm text-slate-500 mt-1">{items.length} post{items.length !== 1 ? "s" : ""}</p>
        </div>
        <Button onClick={openAdd} className="shadow-lg shadow-blue-500/25">
          <IconPlus size={16} /> Add Post
        </Button>
      </div>

      {items.length > 3 && (
        <div className="mb-4 relative">
          <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <IconX size={14} />
            </button>
          )}
        </div>
      )}

      <Card className="overflow-hidden shadow-lg shadow-slate-200/50">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-slate-400">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">Title</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Author</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((post) => (
                  <tr key={post.id} className="group transition hover:bg-blue-50/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {post.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={post.image} alt="" className="h-12 w-16 rounded-lg object-cover border border-slate-200 shrink-0" />
                        ) : (
                          <div className="h-12 w-16 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 text-xs">No img</div>
                        )}
                        <div className="min-w-0">
                          <div className="font-medium text-slate-800 truncate max-w-[280px]">{post.title}</div>
                          <div className="text-xs text-slate-400 truncate max-w-[280px]">/{post.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">{post.category || "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{post.author || "—"}</td>
                    <td className="px-4 py-3">
                      {(post.status ?? "published") === "published" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{post.date || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(post)} className="rounded-lg p-2 text-slate-400 hover:bg-blue-100 hover:text-blue-600 transition" title="Edit">
                          <IconPencil size={15} />
                        </button>
                        <button onClick={() => setDeleteConfirm(post.id ?? null)} className="rounded-lg p-2 text-slate-400 hover:bg-red-100 hover:text-red-600 transition" title="Delete">
                          <IconTrash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">{search ? "No results" : "No posts yet"}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {deleteConfirm && (
        <Modal open onClose={() => setDeleteConfirm(null)} title="Confirm Delete">
          <p className="text-sm text-slate-600 mb-6">Are you sure you want to delete this post? This cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => remove.mutate(deleteConfirm)} disabled={remove.isPending}>
              {remove.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </Modal>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing?.id ? "Edit Post" : "New Post"} wide>
        {editing && (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label>Title *</Label>
                <Input value={editing.title} onChange={(e) => {
                  const title = e.target.value;
                  setEditing({ ...editing, title, slug: editing.slug || autoSlug(title) });
                }} placeholder="Post title" required />
              </div>
              <div>
                <Label>Page URL (automatic)</Label>
                <div className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                  /blog/{editing.slug || autoSlug(editing.title) || "…"}
                </div>
              </div>
              <div>
                <Label>Category</Label>
                <Input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="Astrology Research" />
              </div>
              <div className="sm:col-span-2">
                <Label>Excerpt</Label>
                <Textarea rows={2} value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} placeholder="Short description" />
              </div>
              <div className="sm:col-span-2">
                <Label>Content *</Label>
                <RichTextEditor value={editing.body ?? ""} onChange={(html) => setEditing({ ...editing, body: html })} />
              </div>
              <div>
                <Label>Featured Image URL</Label>
                <Input type="url" value={editing.image ?? ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://..." />
                {editing.image ? (
                  <div className="mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editing.image} alt="Preview" className="h-20 w-32 rounded-lg object-cover border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                ) : null}
              </div>
              <div>
                <Label>Tags (comma separated)</Label>
                <Input value={editing.tags ?? ""} onChange={(e) => setEditing({ ...editing, tags: e.target.value })} placeholder="Astrology, Vedic, Research" />
              </div>
              <div>
                <Label>Author</Label>
                <Input value={editing.author ?? ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} placeholder="Arvindrun Vnjay" />
              </div>
              <div>
                <Label>Date</Label>
                <Input value={editing.date ?? ""} onChange={(e) => setEditing({ ...editing, date: e.target.value })} placeholder="April 4, 2026" />
              </div>
              <div>
                <Label>Read Time</Label>
                <Input value={editing.readTime ?? ""} onChange={(e) => setEditing({ ...editing, readTime: e.target.value })} placeholder="5 min read" />
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(editing.status ?? "published") === "published"}
                    onChange={(e) => setEditing({ ...editing, status: e.target.checked ? "published" : "draft" })}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Published</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={save.isPending} className="bg-emerald-600 hover:bg-emerald-700">
                {save.isPending ? "Saving..." : editing.id ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
