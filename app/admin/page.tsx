"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [pages, setPages] = useState<Array<{ slug: string; title: string }>>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/check").then((r) => {
      if (r.ok) {
        setAuthenticated(true);
        loadPages();
      }
    }).catch(() => {});
  }, []);

  async function loadPages() {
    try {
      const res = await fetch("/api/admin/pages");
      if (res.ok) {
        const data = await res.json();
        setPages(data.pages || []);
      }
    } catch {}
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
        loadPages();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="bg-card rounded-2xl shadow-lg border border-muted p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground mt-2">Arvin Astro Content Manager</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={loading} className="btn btn-primary btn-full">
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Content Manager</h1>
            <p className="text-sm text-muted-foreground mt-1">Select a page to edit</p>
          </div>
          <button
            onClick={() => {
              document.cookie = "admin-token=; path=/; max-age=0";
              setAuthenticated(false);
            }}
            className="btn btn-outline btn-sm"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((page) => (
            <button
              key={page.slug}
              onClick={() => router.push(`/admin/${page.slug}`)}
              className="bg-card border border-muted rounded-xl p-6 text-left hover:border-primary hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold text-foreground group-hover:text-primary transition">{page.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">/{page.slug}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
