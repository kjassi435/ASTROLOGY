"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface PageData {
  [key: string]: string;
}

interface PageConfig {
  slug: string;
  title: string;
  fields: string[];
}

export default function AdminPageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [data, setData] = useState<PageData>({});
  const [pageConfig, setPageConfig] = useState<PageConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const pagesRes = await fetch("/api/admin/pages");
        if (!pagesRes.ok) {
          router.push("/admin");
          return;
        }
        const pagesData = await pagesRes.json();
        const config = pagesData.pages?.find((p: PageConfig) => p.slug === slug);
        if (!config) {
          router.push("/admin");
          return;
        }
        setPageConfig(config);

        const contentRes = await fetch(`/api/admin/content?slug=${slug}`);
        if (contentRes.ok) {
          const content = await contentRes.json();
          setData(content);
        }
      } catch {
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, router]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, data }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload(field: string, file: File) {
    setUploading(field);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const result = await res.json();
        setData((prev) => ({ ...prev, [field]: result.url }));
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(null);
    }
  }

  function getFieldLabel(field: string): string {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase());
  }

  function isImageField(field: string): boolean {
    return field.toLowerCase().includes("image") || field.toLowerCase().includes("photo") || field.toLowerCase().includes("avatar");
  }

  function isLongField(field: string): boolean {
    return field.toLowerCase().includes("text") || field.toLowerCase().includes("bio") || field.toLowerCase().includes("description") || field.toLowerCase().includes("subtitle");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => router.push("/admin")} className="text-sm text-primary hover:underline mb-2 block">
              {"\u2190"} Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-foreground">Edit: {pageConfig?.title || slug}</h1>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        <div className="space-y-6">
          {pageConfig?.fields.map((field) => (
            <div key={field} className="bg-card border border-muted rounded-xl p-6">
              <label className="block text-sm font-medium text-foreground mb-2">{getFieldLabel(field)}</label>
              {isImageField(field) ? (
                <div className="space-y-3">
                  {data[field] && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={data[field]} alt={field} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={data[field] || ""}
                      onChange={(e) => setData((prev) => ({ ...prev, [field]: e.target.value }))}
                      className="form-control flex-1"
                      placeholder="Image URL"
                    />
                    <label className="btn btn-outline btn-sm cursor-pointer">
                      {uploading === field ? "Uploading..." : "Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(field, file);
                        }}
                        disabled={uploading === field}
                      />
                    </label>
                  </div>
                </div>
              ) : isLongField(field) ? (
                <textarea
                  value={data[field] || ""}
                  onChange={(e) => setData((prev) => ({ ...prev, [field]: e.target.value }))}
                  className="form-control min-h-[120px] resize-y"
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  value={data[field] || ""}
                  onChange={(e) => setData((prev) => ({ ...prev, [field]: e.target.value }))}
                  className="form-control"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button onClick={() => router.push("/admin")} className="btn btn-outline">
            {"\u2190"} Back
          </button>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary">
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
