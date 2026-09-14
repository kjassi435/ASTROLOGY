import { unstable_noStore as noStore } from "next/cache";
import client from "./db";
import { slugify } from "./utils";
import { initDB } from "./db-schema";
import type { Service } from "./services";
import type { Course } from "./courses";
import type { Book } from "./books";
import type { Product } from "./products";
import type { BlogPost } from "./blog";
import type { Testimonial } from "./testimonials";
import { SERVICES } from "./services";
import { COURSES, RECORDED_COURSES, FREE_COURSES, LIVE_COURSES } from "./courses";
import { BOOKS } from "./books";
import { PRODUCTS } from "./products";
import { POSTS } from "./blog";
import { TESTIMONIALS } from "./testimonials";
import { SITE_DEFAULTS } from "./site-content";

export type Row = Record<string, unknown>;

let dbReady: Promise<void> | null = null;
export function ensureDb() {
  if (!dbReady) {
    dbReady = (async () => {
      await initDB();
    })();
  }
  return dbReady;
}


function j<T>(v: unknown, fallback: T): T {
  if (v == null) return fallback;
  if (typeof v !== "string") return v as T;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

async function rows(sql: string, params: unknown[] = []): Promise<Row[]> {
  const res = await client.execute({ sql, args: params as never[] });
  return res.rows as Row[];
}

// Convert pasted Google Drive share links into direct image URLs so they render.
export function normalizeImageUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  const s = url.trim();
  const m = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m) return `https://lh3.googleusercontent.com/d/${m[1]}`;
  return s;
}

async function run(sql: string, params: unknown[] = []): Promise<{ lastInsertRowid: number | bigint }> {
  const res = await client.execute({ sql, args: params as never[] });
  return { lastInsertRowid: (res.lastInsertRowid as number | bigint) ?? 0 };
}

/* ----------------------------- SLUGS (auto) ----------------------------- */
// Slugs are ALWAYS resolved server-side from the name/title, so the admin
// never has to type one. This permanently prevents broken links caused by
// hand-typed slugs (spaces, capitals, duplicates like the old
// "Visiting Card-designing " slug which 404'd on the live site).
const SLUG_TABLES = new Set(["services", "courses", "posts"]);

function cleanSlug(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return slugify(raw.trim());
}

async function uniqueSlug(table: string, base: string, excludeId?: number): Promise<string> {
  if (!SLUG_TABLES.has(table)) throw new Error("bad table");
  const stem = base || "item";
  let slug = stem;
  let n = 2;
  for (;;) {
    const r = await rows(`SELECT id FROM ${table} WHERE slug=?`, [slug]);
    if (!r.length || (excludeId != null && r.length === 1 && Number((r[0] as Row).id) === excludeId)) return slug;
    slug = `${stem}-${n++}`;
  }
}

async function existingSlug(table: string, id: number): Promise<string> {
  if (!SLUG_TABLES.has(table)) throw new Error("bad table");
  const r = await rows(`SELECT slug FROM ${table} WHERE id=?`, [id]);
  return r.length ? String((r[0] as Row).slug ?? "") : "";
}

// Resolve the slug to persist. On update the stored slug is kept (normalized);
// on create it is generated from name/title with a numeric suffix on clash.
// Never returns "".
async function resolveSlug(
  table: "services" | "courses" | "posts",
  input: { slug?: unknown; name?: unknown; title?: unknown },
  id?: number
): Promise<string> {
  const wanted = cleanSlug(input.slug);
  const source = String(input.name ?? input.title ?? "").trim();
  if (id) {
    const current = await existingSlug(table, id);
    if (!wanted) return current || (await uniqueSlug(table, slugify(source) || "item"));
    if (wanted === current) return current;
    return uniqueSlug(table, wanted, id);
  }
  return uniqueSlug(table, wanted || slugify(source) || "item");
}

/* ----------------------------- SERVICES ----------------------------- */
export type ServiceInput = {
  slug?: string;
  name: string;
  tagline?: string;
  icon?: string;
  heroImage?: string;
  introHeading?: string;
  featured?: number;
  popular?: number;
  description?: string;
  long_description?: string;
  includes?: string[];
  tiers?: unknown[];
  booking_notes?: string;
};

export async function getServices(): Promise<Service[]> {
  noStore();
  const base = SERVICES;
  try {
    const r = await rows("SELECT * FROM services ORDER BY id");
    if (r.length) {
      const dbBySlug = new Map<string, Service>(r.map((row) => [String(row.slug), mapService(row)]));
      const seen = new Set<string>();
      const merged: Service[] = [];
      for (const s of base) {
        seen.add(s.slug);
        const db = dbBySlug.get(s.slug);
        if (!db) {
          // No DB row (e.g. never edited in admin) — still list the code
          // default so items never silently disappear from the site.
          merged.push(s);
          continue;
        }
        const out: Record<string, unknown> = { ...(s as unknown as Record<string, unknown>) };
        for (const [k, v] of Object.entries(db as unknown as Record<string, unknown>)) {
          if (v == null || v === "" || (Array.isArray(v) && v.length === 0)) continue;
          out[k] = v;
        }
        merged.push(out as unknown as Service);
      }
      for (const [slug, svc] of dbBySlug) {
        if (!seen.has(slug)) merged.push(svc);
      }
      return merged;
    }
  } catch {
    /* table missing -> fallback */
  }
  return base;
}

function mapService(r: Row): Service {
  const longHtml = r.long_description ? String(r.long_description) : undefined;
  return {
    id: Number(r.id),
    slug: String(r.slug),
    name: String(r.name),
    tagline: r.tagline ? String(r.tagline) : undefined,
    icon: r.icon ? String(r.icon) : undefined,
    heroImage: r.hero_image ? String(r.hero_image) : undefined,
    featured: Number(r.featured ?? 0),
    popular: Number(r.popular ?? 0),
    description: r.description ? String(r.description) : undefined,
    introHeading: r.intro_heading ? String(r.intro_heading) : undefined,
    longDescription: [],
    longDescriptionHtml: longHtml,
    includes: j(r.includes, [] as string[]),
    tiers: j(r.tiers, [] as unknown[]),
    bookingNotes: r.booking_notes ? [String(r.booking_notes)] : [],
  } as unknown as Service;
}

export async function saveService(input: ServiceInput, id?: number): Promise<number> {
  const slug = await resolveSlug("services", input, id);
  if (id) {
    await run(
      `UPDATE services SET slug=?, name=?, tagline=?, icon=?, hero_image=?, intro_heading=?, featured=?, popular=?, description=?, long_description=?, includes=?, tiers=?, booking_notes=? WHERE id=?`,
      [slug, input.name, input.tagline ?? null, input.icon ?? null, normalizeImageUrl(input.heroImage) ?? null, input.introHeading ?? null, input.featured ?? 0, input.popular ?? 0, input.description ?? null, input.long_description ?? null, JSON.stringify(input.includes ?? []), JSON.stringify(input.tiers ?? []), input.booking_notes ?? null, id]
    );
    return id;
  } else {
    const res = await run(
      `INSERT INTO services (slug, name, tagline, icon, hero_image, intro_heading, featured, popular, description, long_description, includes, tiers, booking_notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [slug, input.name, input.tagline ?? null, input.icon ?? null, normalizeImageUrl(input.heroImage) ?? null, input.introHeading ?? null, input.featured ?? 0, input.popular ?? 0, input.description ?? null, input.long_description ?? null, JSON.stringify(input.includes ?? []), JSON.stringify(input.tiers ?? []), input.booking_notes ?? null]
    );
    return Number(res.lastInsertRowid);
  }
}

export async function deleteService(id: number) {
  await run("DELETE FROM services WHERE id=?", [id]);
}

/* ----------------------------- COURSES ----------------------------- */
export type CourseInput = {
  slug?: string;
  title: string;
  type: "live" | "recorded" | "free";
  category?: string;
  teacher?: string;
  tagline?: string;
  description?: string;
  price?: number;
  original_price?: number;
  buy_url?: string;
  youtube_url?: string;
  badge?: string;
  image?: string;
  features?: string[];
  syllabus?: string[];
  duration?: string;
  about?: string;
  whyJoin?: string[];
  why_join?: string[];
  perks?: string[];
  startsFrom?: string;
  starts_from?: string;
  priceNote?: string;
  price_note?: string;
  payUrl?: string;
  pay_url?: string;
  bullets?: string[];
  learnLink?: string;
  learn_link?: string;
  beginnerNote?: string;
  beginner_note?: string;
  language?: string;
  price_suffix?: string;
  live_session_title?: string;
  live_session_body?: string;
};

export async function getCourses(): Promise<Course[]> {
  noStore();
  const base = [...LIVE_COURSES, ...RECORDED_COURSES, ...FREE_COURSES];
  try {
    const r = await rows("SELECT * FROM courses ORDER BY id");
    if (r.length) {
      const dbBySlug = new Map<string, Course>(r.map((row) => [String(row.slug), mapCourse(row)]));
      const seen = new Set<string>();
      const merged: Course[] = [];
      for (const c of base) {
        seen.add(c.slug);
        const db = dbBySlug.get(c.slug);
        if (!db) {
          // No DB row — still list the code default so courses never
          // silently disappear from listing pages.
          merged.push(c);
          continue;
        }
        const out: Record<string, unknown> = { ...(c as unknown as Record<string, unknown>) };
        for (const [k, v] of Object.entries(db as unknown as Record<string, unknown>)) {
          if (v == null || v === "" || (Array.isArray(v) && v.length === 0)) continue;
          out[k] = v;
        }
        merged.push(out as unknown as Course);
      }
      for (const [slug, course] of dbBySlug) {
        if (!seen.has(slug)) merged.push(course);
      }
      return merged;
    }
  } catch {
    /* fallback */
  }
  return base;
}

function mapCourse(r: Row): Course {
  const features = j(r.features, [] as unknown[]);
  const syllabus = j(r.syllabus, [] as unknown[]);
  const whyJoin = j(r.why_join, [] as unknown[]);
  const perks = j(r.perks, [] as unknown[]);
  const bullets = j(r.bullets, [] as unknown[]);
  return {
    id: Number(r.id),
    slug: String(r.slug),
    title: String(r.title),
    type: (r.type as Course["type"]) ?? "recorded",
    category: r.category ? String(r.category) : undefined,
    teacher: r.teacher ? String(r.teacher) : undefined,
    tagline: r.tagline ? String(r.tagline) : undefined,
    description: r.description ? String(r.description) : undefined,
    price: r.price != null ? Number(r.price) : undefined,
    originalPrice: r.original_price != null ? Number(r.original_price) : undefined,
    buyUrl: r.buy_url ? String(r.buy_url) : undefined,
    youtubeUrl: r.youtube_url ? String(r.youtube_url) : undefined,
    badge: r.badge ? String(r.badge) : undefined,
    image: r.image ? String(r.image) : undefined,
    features: Array.isArray(features) ? features : [],
    syllabus: Array.isArray(syllabus) ? syllabus : [],
    duration: r.duration ? String(r.duration) : undefined,
    about: r.about ? String(r.about) : undefined,
    whyJoin: Array.isArray(whyJoin) ? whyJoin : [],
    perks: Array.isArray(perks) ? perks : [],
    startsFrom: r.starts_from ? String(r.starts_from) : undefined,
    priceNote: r.price_note ? String(r.price_note) : undefined,
    payUrl: r.pay_url ? String(r.pay_url) : undefined,
    bullets: Array.isArray(bullets) ? bullets : [],
    learnLink: r.learn_link ? String(r.learn_link) : undefined,
    beginnerNote: r.beginner_note ? String(r.beginner_note) : undefined,
    language: r.language ? String(r.language) : undefined,
    priceSuffix: r.price_suffix ? String(r.price_suffix) : undefined,
    liveSessionTitle: r.live_session_title ? String(r.live_session_title) : undefined,
    liveSessionBody: r.live_session_body ? String(r.live_session_body) : undefined,
  } as unknown as Course;
}

export async function saveCourse(input: CourseInput, id?: number): Promise<number> {
  const slug = await resolveSlug("courses", input, id);
  const whyJoin = (input as unknown as Record<string, unknown>).whyJoin ?? (input as unknown as Record<string, unknown>).why_join;
  const startsFrom = (input as unknown as Record<string, unknown>).startsFrom ?? (input as unknown as Record<string, unknown>).starts_from;
  const priceNote = (input as unknown as Record<string, unknown>).priceNote ?? (input as unknown as Record<string, unknown>).price_note;
  const payUrl = (input as unknown as Record<string, unknown>).payUrl ?? (input as unknown as Record<string, unknown>).pay_url;
  const learnLink = (input as unknown as Record<string, unknown>).learnLink ?? (input as unknown as Record<string, unknown>).learn_link;
  const beginnerNote = (input as unknown as Record<string, unknown>).beginnerNote ?? (input as unknown as Record<string, unknown>).beginner_note;
  if (id) {
    await run(
      `UPDATE courses SET slug=?, title=?, type=?, category=?, teacher=?, tagline=?, description=?, price=?, original_price=?, buy_url=?, youtube_url=?, badge=?, image=?, features=?, syllabus=?, duration=?, about=?, why_join=?, perks=?, starts_from=?, price_note=?, pay_url=?, bullets=?, learn_link=?, beginner_note=?, price_suffix=?, language=?, live_session_title=?, live_session_body=? WHERE id=?`,
      [slug, input.title, input.type, input.category ?? null, input.teacher ?? "Arvindrun Vnjay", input.tagline ?? null, input.description ?? null, input.price ?? null, input.original_price ?? null, input.buy_url ?? null, input.youtube_url ?? null, input.badge ?? null, normalizeImageUrl(input.image) ?? null, JSON.stringify(input.features ?? []), JSON.stringify(input.syllabus ?? []), input.duration ?? null, input.about ?? null, JSON.stringify((whyJoin as unknown[]) ?? []), JSON.stringify(input.perks ?? []), (startsFrom as string) ?? null, (priceNote as string) ?? null, (payUrl as string) ?? null, JSON.stringify(input.bullets ?? []), (learnLink as string) ?? null, (beginnerNote as string) ?? null, input.price_suffix ?? null, input.language ?? null, input.live_session_title ?? null, input.live_session_body ?? null, id]
    );
    return id;
  } else {
    const res = await run(
      `INSERT INTO courses (slug, title, type, category, teacher, tagline, description, price, original_price, buy_url, youtube_url, badge, image, features, syllabus, duration, about, why_join, perks, starts_from, price_note, pay_url, bullets, learn_link, beginner_note, price_suffix, language, live_session_title, live_session_body) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [slug, input.title, input.type, input.category ?? null, input.teacher ?? "Arvindrun Vnjay", input.tagline ?? null, input.description ?? null, input.price ?? null, input.original_price ?? null, input.buy_url ?? null, input.youtube_url ?? null, input.badge ?? null, normalizeImageUrl(input.image) ?? null, JSON.stringify(input.features ?? []), JSON.stringify(input.syllabus ?? []), input.duration ?? null, input.about ?? null, JSON.stringify((whyJoin as unknown[]) ?? []), JSON.stringify(input.perks ?? []), (startsFrom as string) ?? null, (priceNote as string) ?? null, (payUrl as string) ?? null, JSON.stringify(input.bullets ?? []), (learnLink as string) ?? null, (beginnerNote as string) ?? null, input.price_suffix ?? null, input.language ?? null, input.live_session_title ?? null, input.live_session_body ?? null]
    );
    return Number(res.lastInsertRowid);
  }
}

export async function deleteCourse(id: number) {
  await run("DELETE FROM courses WHERE id=?", [id]);
}

/* ----------------------------- BOOKS ----------------------------- */
export type BookInput = { title: string; note?: string; image?: string; buy_url?: string };

export async function getBooks(): Promise<Book[]> {
  noStore();
  try {
    const r = await rows("SELECT * FROM books ORDER BY id");
    if (r.length)
      return r.map((x) => ({
        id: Number(x.id),
        title: String(x.title),
        note: x.note ? String(x.note) : undefined,
        image: x.image ? String(x.image) : undefined,
        buyUrl: x.buy_url ? String(x.buy_url) : undefined,
      })) as unknown as Book[];
  } catch {
    /* fallback */
  }
  return BOOKS;
}

export async function saveBook(input: BookInput, id?: number): Promise<number> {
  if (id) {
    await run("UPDATE books SET title=?, note=?, image=?, buy_url=? WHERE id=?", [input.title, input.note ?? null, normalizeImageUrl(input.image) ?? null, input.buy_url ?? null, id]);
    return id;
  } else {
    const res = await run("INSERT INTO books (title, note, image, buy_url) VALUES (?,?,?,?)", [input.title, input.note ?? null, normalizeImageUrl(input.image) ?? null, input.buy_url ?? null]);
    return Number(res.lastInsertRowid);
  }
}

export async function deleteBook(id: number) {
  await run("DELETE FROM books WHERE id=?", [id]);
}

/* ----------------------------- PRODUCTS ----------------------------- */
export type ProductInput = { title: string; note?: string; image?: string; buy_url?: string };

export async function getProducts(): Promise<Product[]> {
  noStore();
  try {
    const r = await rows("SELECT * FROM products ORDER BY id");
    if (r.length)
      return r.map((x) => ({
        id: Number(x.id),
        title: String(x.title),
        note: x.note ? String(x.note) : undefined,
        image: x.image ? String(x.image) : undefined,
        buyUrl: x.buy_url ? String(x.buy_url) : undefined,
      })) as unknown as Product[];
  } catch {
    /* fallback */
  }
  return PRODUCTS;
}

export async function saveProduct(input: ProductInput, id?: number): Promise<number> {
  if (id) {
    await run("UPDATE products SET title=?, note=?, image=?, buy_url=? WHERE id=?", [input.title, input.note ?? null, normalizeImageUrl(input.image) ?? null, input.buy_url ?? null, id]);
    return id;
  } else {
    const res = await run("INSERT INTO products (title, note, image, buy_url) VALUES (?,?,?,?)", [input.title, input.note ?? null, normalizeImageUrl(input.image) ?? null, input.buy_url ?? null]);
    return Number(res.lastInsertRowid);
  }
}

export async function deleteProduct(id: number) {
  await run("DELETE FROM products WHERE id=?", [id]);
}

/* ----------------------------- POSTS ----------------------------- */
export type PostInput = {
  slug?: string;
  title: string;
  category?: string;
  excerpt?: string;
  date?: string;
  read_time?: string;
  image?: string;
  content?: string;
  body?: string;
  status?: string;
  author?: string;
  tags?: string;
};

function parseContent(
  raw: unknown,
): Array<{ heading?: string; paragraphs: string[]; list?: string[] }> | undefined {
  if (!raw) return undefined;
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try { return JSON.parse(raw); } catch { return undefined; }
  }
  return undefined;
}

function contentToHtml(
  content: Array<{ heading?: string; paragraphs: string[]; list?: string[] }>,
): string {
  return content
    .map((block) => {
      const parts: string[] = [];
      if (block.heading) parts.push(`<h2>${block.heading}</h2>`);
      if (block.paragraphs?.length) parts.push(block.paragraphs.map((p) => `<p>${p}</p>`).join(""));
      if (block.list?.length) parts.push(`<ul>${block.list.map((item) => `<li>${item}</li>`).join("")}</ul>`);
      return parts.join("");
    })
    .join("");
}

export async function getPosts(): Promise<BlogPost[]> {
  noStore();
  let dbRows: any[] = [];
  try {
    dbRows = await rows("SELECT * FROM posts ORDER BY id");
  } catch {
    dbRows = [];
  }
  if (!dbRows.length) return POSTS;
  const dbBySlug = new Map<string, any>();
  for (const x of dbRows) {
    dbBySlug.set(String(x.slug), {
      id: Number(x.id),
      slug: String(x.slug),
      title: String(x.title),
      category: x.category ? String(x.category) : undefined,
      excerpt: x.excerpt ? String(x.excerpt) : undefined,
      date: x.date ? String(x.date) : undefined,
      readTime: x.read_time ? String(x.read_time) : undefined,
      image: x.image ? String(x.image) : undefined,
      content: x.content ? String(x.content) : undefined,
      body: x.body ? String(x.body) : undefined,
      status: x.status ? String(x.status) : "published",
      author: x.author ? String(x.author) : "Arvindrun Vnjay",
      tags: x.tags ? String(x.tags) : undefined,
    });
  }
  const merged: BlogPost[] = [];
  const seen = new Set<string>();
  for (const p of POSTS) {
    seen.add(p.slug);
    const d = dbBySlug.get(p.slug);
    if (d) {
      merged.push({
        ...p,
        title: d.title ?? p.title,
        category: d.category ?? p.category,
        excerpt: d.excerpt ?? p.excerpt,
        date: d.date ?? p.date,
        readTime: d.readTime ?? p.readTime,
        image: d.image ?? p.image,
        body: d.body ?? p.body ?? (p.content ? contentToHtml(p.content) : undefined),
        status: d.status ?? p.status,
      });
    } else {
      merged.push(p);
    }
  }
  for (const d of dbBySlug.values()) {
    if (!seen.has(d.slug)) {
      const parsed = parseContent(d.content);
      if (!d.body && parsed) d.body = contentToHtml(parsed);
      merged.push(d as unknown as BlogPost);
    }
  }
  return merged;
}

export async function savePost(input: PostInput, id?: number): Promise<number> {
  const slug = await resolveSlug("posts", input, id);
  if (id) {
    await run("UPDATE posts SET slug=?, title=?, category=?, excerpt=?, date=?, read_time=?, image=?, content=?, body=?, status=?, author=?, tags=? WHERE id=?", [slug, input.title, input.category ?? null, input.excerpt ?? null, input.date ?? null, input.read_time ?? null, normalizeImageUrl(input.image) ?? null, input.content ?? null, input.body && input.body.trim() ? input.body : null, input.status ?? "published", input.author ?? "Arvindrun Vnjay", input.tags ?? null, id]);
    return id;
  } else {
    const res = await run("INSERT INTO posts (slug, title, category, excerpt, date, read_time, image, content, body, status, author, tags) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [slug, input.title, input.category ?? null, input.excerpt ?? null, input.date ?? null, input.read_time ?? null, normalizeImageUrl(input.image) ?? null, input.content ?? null, input.body && input.body.trim() ? input.body : null, input.status ?? "published", input.author ?? "Arvindrun Vnjay", input.tags ?? null]);
    return Number(res.lastInsertRowid);
  }
}

export async function deletePost(id: number) {
  await run("DELETE FROM posts WHERE id=?", [id]);
}

/* ----------------------------- TESTIMONIALS ----------------------------- */
export type TestimonialInput = { name: string; initials?: string; text?: string; source?: string; badge?: string };

export async function getTestimonials(): Promise<Testimonial[]> {
  noStore();
  try {
    const r = await rows("SELECT * FROM testimonials ORDER BY id");
    if (r.length)
      return r.map((x) => ({
        id: Number(x.id),
        name: String(x.name),
        initials: x.initials ? String(x.initials) : undefined,
        text: x.text ? String(x.text) : undefined,
        source: x.source ? String(x.source) : undefined,
        badge: x.badge ? String(x.badge) : undefined,
      })) as unknown as Testimonial[];
  } catch {
    /* fallback */
  }
  return TESTIMONIALS;
}

export async function saveTestimonial(input: TestimonialInput, id?: number): Promise<number> {
  if (id) {
    await run("UPDATE testimonials SET name=?, initials=?, text=?, source=?, badge=? WHERE id=?", [input.name, input.initials ?? null, input.text ?? null, input.source ?? null, input.badge ?? null, id]);
    return id;
  } else {
    const res = await run("INSERT INTO testimonials (name, initials, text, source, badge) VALUES (?,?,?,?,?)", [input.name, input.initials ?? null, input.text ?? null, input.source ?? null, input.badge ?? null]);
    return Number(res.lastInsertRowid);
  }
}

export async function deleteTestimonial(id: number) {
  await run("DELETE FROM testimonials WHERE id=?", [id]);
}

/* ----------------------------- ENQUIRIES ----------------------------- */
export type EnquiryInput = { name: string; phone?: string; email?: string; service?: string; message?: string; created_at?: string };

export async function getEnquiries(): Promise<EnquiryInput[]> {
  try {
    const r = await rows("SELECT * FROM contact_submissions ORDER BY id DESC");
    return r.map((x) => ({ name: String(x.name), phone: x.phone ? String(x.phone) : undefined, email: x.email ? String(x.email) : undefined, service: x.service ? String(x.service) : undefined, message: x.message ? String(x.message) : undefined, created_at: x.created_at ? String(x.created_at) : undefined }));
  } catch {
    return [];
  }
}

export async function deleteEnquiry(id: number) {
  await run("DELETE FROM contact_submissions WHERE id=?", [id]);
}

export async function saveEnquiry(input: { name: string; phone?: string; email?: string; service?: string; message?: string }) {
  const name = String(input.name ?? "").trim().slice(0, 200);
  if (!name) throw new Error("name required");
  await run("INSERT INTO contact_submissions (name, phone, email, service, message) VALUES (?,?,?,?,?)", [
    name,
    String(input.phone ?? "").slice(0, 50) || null,
    String(input.email ?? "").slice(0, 200) || null,
    String(input.service ?? "").slice(0, 200) || null,
    String(input.message ?? "").slice(0, 2000) || null,
  ]);
}

/* ----------------------------- SITE CONTENT ----------------------------- */
export async function getSiteContent(slug: string): Promise<Record<string, string>> {
  noStore();
  try {
    const r = await rows("SELECT fields FROM site_content WHERE slug=?", [slug]);
    if (r.length) {
      const db = j(r[0].fields, {} as Record<string, string>);
      return { ...(SITE_DEFAULTS[slug] ?? {}), ...db };
    }
  } catch {
    /* fallback */
  }
  return SITE_DEFAULTS[slug] ?? {};
}

export async function saveSiteContent(slug: string, fields: Record<string, string>) {
  const existing = await rows("SELECT id FROM site_content WHERE slug=?", [slug]);
  if (existing.length) {
    await run("UPDATE site_content SET fields=? WHERE slug=?", [JSON.stringify(fields), slug]);
  } else {
    await run("INSERT INTO site_content (slug, fields) VALUES (?,?)", [slug, JSON.stringify(fields)]);
  }
}

// Merge stored site_content over hardcoded defaults so the site renders even before any edit.
export async function getPageContent(slug: string): Promise<Record<string, string>> {
  const db = await getSiteContent(slug);
  const base = SITE_DEFAULTS[slug] ?? {};
  return { ...base, ...db };
}

// Parse a stored field that may be JSON array or newline-separated text.
export function pageList(v?: string | null): string[] {
  if (!v) return [];
  try {
    const a = JSON.parse(v);
    if (Array.isArray(a)) return a.map(String);
  } catch {
    /* not JSON */
  }
  return v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function pageJson<T>(v?: string | null, fb: T = {} as T): T {
  if (!v) return fb;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fb;
  }
}

// Extract a YouTube video id from a URL or bare id.
export function youtubeId(url?: string): string | undefined {
  if (!url) return undefined;
  const u = url.trim();
  // Accept every common YouTube link form and ignore any query params (si=, t=, etc.):
  // youtu.be/ID · youtu.be/shorts/ID · youtube.com/shorts/ID · watch?v=ID · /embed/ID · /live/ID · /v/ID
  const m =
    u.match(/youtu\.be\/(?:shorts\/|embed\/|live\/|v\/)?([A-Za-z0-9_-]{11})(?:[?&#/]|$)/) ||
    u.match(/youtube\.com\/(?:shorts\/|embed\/|live\/|v\/|watch\?(?:[^#]*&)?v=)([A-Za-z0-9_-]{11})(?:[?&#/]|$)/);
  return m ? m[1] : undefined;
}

// Forgiving slug match: exact first, then normalized (case/space/punctuation
// insensitive) so an old or hand-typed URL still resolves when the item
// exists instead of throwing a 404.
export function matchSlug<T extends { slug: string }>(items: T[], slug: string): T | undefined {
  const raw = String(slug ?? "");
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    /* keep raw */
  }
  const direct = items.find((i) => i.slug === raw) ?? items.find((i) => i.slug === decoded);
  if (direct) return direct;
  const want = slugify(decoded);
  if (!want) return undefined;
  return items.find((i) => slugify(i.slug) === want);
}

/* ----------------------------- ADMIN PRE-FILL ----------------------------- */
// Return items with form-friendly snake_case keys, merging DB rows over static
// defaults so the admin edit forms are pre-filled with the live frontend data.

function snakeService(s: Service): Row {
  return {
    id: (s as unknown as { id?: number }).id ?? undefined,
    slug: s.slug,
    name: s.name,
    tagline: s.tagline ?? "",
    icon: s.icon ?? "",
    heroImage: s.heroImage ?? "",
    introHeading: s.introHeading ?? "",
    featured: s.featured ? 1 : 0,
    popular: s.popular ? 1 : 0,
    description: s.description ?? "",
    long_description: s.longDescriptionHtml ?? (s.longDescription ?? []).join("\n\n"),
    includes: s.includes ?? [],
    tiers: s.tiers ?? [],
    booking_notes: (s.bookingNotes ?? []).join("\n"),
  };
}

function dbServiceSnake(r: Row): Row {
  return {
    id: Number(r.id),
    slug: String(r.slug),
    name: String(r.name),
    tagline: r.tagline ?? "",
    icon: r.icon ?? "",
    heroImage: r.hero_image ?? "",
    introHeading: r.intro_heading ?? "",
    featured: Number(r.featured ?? 0),
    popular: Number(r.popular ?? 0),
    description: r.description ?? "",
    long_description: r.long_description ?? "",
    includes: j(r.includes, [] as unknown[]),
    tiers: j(r.tiers, [] as unknown[]),
    booking_notes: r.booking_notes ?? "",
  };
}

function snakeCourse(c: Course): Row {
  return {
    id: (c as unknown as { id?: number }).id ?? undefined,
    slug: c.slug,
    title: c.title,
    type: c.type,
    category: c.category ?? "",
    teacher: c.teacher ?? "",
    tagline: c.tagline ?? "",
    description: c.description ?? "",
    price: c.price ?? "",
    original_price: c.originalPrice ?? "",
    buy_url: c.buyUrl ?? "",
    youtube_url: c.youtubeUrl ?? "",
    badge: c.badge ?? "",
    image: c.image ?? "",
    features: c.features ?? [],
    syllabus: c.syllabus ?? [],
    duration: c.duration ?? "",
    about: c.about ?? "",
    why_join: c.whyJoin ?? [],
    perks: c.perks ?? [],
    starts_from: c.startsFrom ?? "",
    price_note: c.priceNote ?? "",
    pay_url: c.payUrl ?? "",
    bullets: c.bullets ?? [],
    learn_link: c.learnLink ?? "",
    beginner_note: c.beginnerNote ?? "",
    language: c.language ?? "",
    price_suffix: c.priceSuffix ?? "",
    live_session_title: c.liveSessionTitle ?? "",
    live_session_body: c.liveSessionBody ?? "",
  };
}

function dbCourseSnake(r: Row): Row {
  return {
    id: Number(r.id),
    slug: String(r.slug),
    title: String(r.title),
    type: String(r.type),
    category: r.category ?? "",
    teacher: r.teacher ?? "",
    tagline: r.tagline ?? "",
    description: r.description ?? "",
    price: r.price ?? "",
    original_price: r.original_price ?? "",
    buy_url: r.buy_url ?? "",
    youtube_url: r.youtube_url ?? "",
    badge: r.badge ?? "",
    image: r.image ?? "",
    features: j(r.features, [] as unknown[]),
    syllabus: j(r.syllabus, [] as unknown[]),
    duration: r.duration ?? "",
    about: r.about ?? "",
    why_join: j(r.why_join, [] as unknown[]),
    perks: j(r.perks, [] as unknown[]),
    starts_from: r.starts_from ?? "",
    price_note: r.price_note ?? "",
    pay_url: r.pay_url ?? "",
    bullets: j(r.bullets, [] as unknown[]),
    learn_link: r.learn_link ?? "",
    beginner_note: r.beginner_note ?? "",
    language: r.language ?? "",
    price_suffix: r.price_suffix ?? "",
    live_session_title: r.live_session_title ?? "",
    live_session_body: r.live_session_body ?? "",
  };
}

function mergeOverBase(base: Row, db: Row | undefined): Row {
  if (!db) return base;
  const out: Row = { ...base };
  for (const [k, v] of Object.entries(db)) {
    if (v == null || v === "" || (Array.isArray(v) && v.length === 0)) continue;
    out[k] = v;
  }
  return out;
}

export async function getAdminServices(): Promise<Row[]> {
  noStore();
  const base = SERVICES.map(snakeService);
  try {
    const r = await rows("SELECT * FROM services ORDER BY id");
    if (r.length) {
      const dbBySlug = new Map<string, Row>(r.map((row) => [String(row.slug), dbServiceSnake(row)]));
      const seen = new Set<string>();
      const merged: Row[] = [];
      for (const s of base) {
        const slug = String(s.slug);
        seen.add(slug);
        const db = dbBySlug.get(slug);
        if (!db) {
          merged.push(s);
          continue;
        }
        merged.push(mergeOverBase(s, db));
      }
      for (const [slug, row] of dbBySlug) {
        if (!seen.has(slug)) merged.push(row);
      }
      return merged;
    }
  } catch {
    /* fallback */
  }
  return base;
}

export async function getAdminCourses(): Promise<Row[]> {
  noStore();
  const base = [...LIVE_COURSES, ...RECORDED_COURSES, ...FREE_COURSES].map(snakeCourse);
  try {
    const r = await rows("SELECT * FROM courses ORDER BY id");
    if (r.length) {
      const dbBySlug = new Map<string, Row>(r.map((row) => [String(row.slug), dbCourseSnake(row)]));
      const seen = new Set<string>();
      const merged: Row[] = [];
      for (const c of base) {
        const slug = String(c.slug);
        seen.add(slug);
        const db = dbBySlug.get(slug);
        if (!db) {
          merged.push(c);
          continue;
        }
        merged.push(mergeOverBase(c, db));
      }
      for (const [slug, row] of dbBySlug) {
        if (!seen.has(slug)) merged.push(row);
      }
      return merged;
    }
  } catch {
    /* fallback */
  }
  return base;
}

export async function getAdminBooks(): Promise<Row[]> {
  noStore();
  const base = BOOKS.map((b) => ({ id: (b as unknown as { id?: number }).id ?? undefined, title: b.title, note: b.note ?? "", image: b.image ?? "", buy_url: b.buyUrl ?? "" }));
  try {
    const r = await rows("SELECT * FROM books ORDER BY id");
    if (r.length) {
      const dbByTitle = new Map<string, Row>(r.map((row) => [String(row.title), row]));
      const seen = new Set<string>();
      const merged: Row[] = [];
      for (const b of base) {
        const title = String(b.title);
        seen.add(title);
        const db = dbByTitle.get(title);
        if (!db) continue;
        merged.push(mergeOverBase(b, db));
      }
      for (const [title, row] of dbByTitle) {
        if (!seen.has(title)) merged.push(row);
      }
      return merged;
    }
  } catch {
    /* fallback */
  }
  return base;
}

export async function getAdminProducts(): Promise<Row[]> {
  noStore();
  const base = PRODUCTS.map((p) => ({ id: (p as unknown as { id?: number }).id ?? undefined, title: p.title, note: p.note ?? "", image: p.image ?? "", buy_url: p.buyUrl ?? "" }));
  try {
    const r = await rows("SELECT * FROM products ORDER BY id");
    if (r.length) {
      const dbByTitle = new Map<string, Row>(r.map((row) => [String(row.title), row]));
      const seen = new Set<string>();
      const merged: Row[] = [];
      for (const p of base) {
        const title = String(p.title);
        seen.add(title);
        const db = dbByTitle.get(title);
        if (!db) continue;
        merged.push(mergeOverBase(p, db));
      }
      for (const [title, row] of dbByTitle) {
        if (!seen.has(title)) merged.push(row);
      }
      return merged;
    }
  } catch {
    /* fallback */
  }
  return base;
}

/* ----------------------------- SEED ----------------------------- */
export async function seedIfEmpty(): Promise<{ seeded: boolean; counts: Record<string, number> }> {
  const counts: Record<string, number> = {};
  const check = async (table: string) => {
    try {
      const r = await rows(`SELECT COUNT(*) as c FROM ${table}`);
      return Number(r[0]?.c ?? 0);
    } catch {
      return 0;
    }
  };

  if ((await check("services")) === 0) {
    for (const s of SERVICES) await saveService(s as unknown as ServiceInput);
  }
  if ((await check("courses")) === 0) {
    for (const c of [...LIVE_COURSES, ...RECORDED_COURSES, ...FREE_COURSES]) await saveCourse(c as unknown as CourseInput);
  }
  if ((await check("books")) === 0) {
    for (const b of BOOKS) await saveBook(b as unknown as BookInput);
  }
  if ((await check("products")) === 0) {
    for (const p of PRODUCTS) await saveProduct(p as unknown as ProductInput);
  }
  if ((await check("posts")) === 0) {
    for (const p of POSTS) await savePost(p as unknown as PostInput);
  }
  if ((await check("testimonials")) === 0) {
    for (const t of TESTIMONIALS) await saveTestimonial(t as unknown as TestimonialInput);
  }

  counts.services = await check("services");
  counts.courses = await check("courses");
  counts.books = await check("books");
  counts.products = await check("products");
  counts.posts = await check("posts");
  counts.testimonials = await check("testimonials");
  return { seeded: true, counts };
}
