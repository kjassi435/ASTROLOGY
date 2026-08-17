import { unstable_noStore as noStore } from "next/cache";
import client from "./db";
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
function normalizeImageUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  const s = url.trim();
  const m = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  return s;
}

async function run(sql: string, params: unknown[] = []): Promise<{ lastInsertRowid: number | bigint }> {
  const res = await client.execute({ sql, args: params as never[] });
  return { lastInsertRowid: (res.lastInsertRowid as number | bigint) ?? 0 };
}

/* ----------------------------- SERVICES ----------------------------- */
export type ServiceInput = {
  slug: string;
  name: string;
  tagline?: string;
  icon?: string;
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
  try {
    const r = await rows("SELECT * FROM services ORDER BY id");
    if (r.length) {
      return r.map(mapService);
    }
  } catch {
    /* table missing -> fallback */
  }
  return SERVICES;
}

function mapService(r: Row): Service {
  return {
    id: Number(r.id),
    slug: String(r.slug),
    name: String(r.name),
    tagline: r.tagline ? String(r.tagline) : undefined,
    icon: r.icon ? String(r.icon) : undefined,
    featured: Number(r.featured ?? 0),
    popular: Number(r.popular ?? 0),
    description: r.description ? String(r.description) : undefined,
    longDescription: r.long_description ? [String(r.long_description)] : [],
    includes: j(r.includes, [] as string[]),
    tiers: j(r.tiers, [] as unknown[]),
    bookingNotes: r.booking_notes ? [String(r.booking_notes)] : [],
  } as unknown as Service;
}

export async function saveService(input: ServiceInput, id?: number): Promise<number> {
  if (id) {
    await run(
      `UPDATE services SET slug=?, name=?, tagline=?, icon=?, featured=?, popular=?, description=?, long_description=?, includes=?, tiers=?, booking_notes=? WHERE id=?`,
      [input.slug, input.name, input.tagline ?? null, input.icon ?? null, input.featured ?? 0, input.popular ?? 0, input.description ?? null, input.long_description ?? null, JSON.stringify(input.includes ?? []), JSON.stringify(input.tiers ?? []), input.booking_notes ?? null, id]
    );
    return id;
  } else {
    const res = await run(
      `INSERT INTO services (slug, name, tagline, icon, featured, popular, description, long_description, includes, tiers, booking_notes) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [input.slug, input.name, input.tagline ?? null, input.icon ?? null, input.featured ?? 0, input.popular ?? 0, input.description ?? null, input.long_description ?? null, JSON.stringify(input.includes ?? []), JSON.stringify(input.tiers ?? []), input.booking_notes ?? null]
    );
    return Number(res.lastInsertRowid);
  }
}

export async function deleteService(id: number) {
  await run("DELETE FROM services WHERE id=?", [id]);
}

/* ----------------------------- COURSES ----------------------------- */
export type CourseInput = {
  slug: string;
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
};

export async function getCourses(): Promise<Course[]> {
  noStore();
  try {
    const r = await rows("SELECT * FROM courses ORDER BY id");
    if (r.length) return r.map(mapCourse);
  } catch {
    /* fallback */
  }
  return [...LIVE_COURSES, ...RECORDED_COURSES, ...FREE_COURSES];
}

function mapCourse(r: Row): Course {
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
    features: j(r.features, [] as string[]),
    syllabus: j(r.syllabus, [] as string[]),
    duration: r.duration ? String(r.duration) : undefined,
  } as unknown as Course;
}

export async function saveCourse(input: CourseInput, id?: number): Promise<number> {
  if (id) {
    await run(
      `UPDATE courses SET slug=?, title=?, type=?, category=?, teacher=?, tagline=?, description=?, price=?, original_price=?, buy_url=?, youtube_url=?, badge=?, image=?, features=?, syllabus=?, duration=? WHERE id=?`,
      [input.slug, input.title, input.type, input.category ?? null, input.teacher ?? "Arvindrun Vnjay", input.tagline ?? null, input.description ?? null, input.price ?? null, input.original_price ?? null, input.buy_url ?? null, input.youtube_url ?? null, input.badge ?? null, normalizeImageUrl(input.image) ?? null, JSON.stringify(input.features ?? []), JSON.stringify(input.syllabus ?? []), input.duration ?? null, id]
    );
    return id;
  } else {
    const res = await run(
      `INSERT INTO courses (slug, title, type, category, teacher, tagline, description, price, original_price, buy_url, youtube_url, badge, image, features, syllabus, duration) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [input.slug, input.title, input.type, input.category ?? null, input.teacher ?? "Arvindrun Vnjay", input.tagline ?? null, input.description ?? null, input.price ?? null, input.original_price ?? null, input.buy_url ?? null, input.youtube_url ?? null, input.badge ?? null, normalizeImageUrl(input.image) ?? null, JSON.stringify(input.features ?? []), JSON.stringify(input.syllabus ?? []), input.duration ?? null]
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
  slug: string;
  title: string;
  category?: string;
  excerpt?: string;
  date?: string;
  read_time?: string;
  image?: string;
  content?: string;
};

export async function getPosts(): Promise<BlogPost[]> {
  noStore();
  try {
    const r = await rows("SELECT * FROM posts ORDER BY id");
    if (r.length)
      return r.map((x) => ({
        id: Number(x.id),
        slug: String(x.slug),
        title: String(x.title),
        category: x.category ? String(x.category) : undefined,
        excerpt: x.excerpt ? String(x.excerpt) : undefined,
        date: x.date ? String(x.date) : undefined,
        readTime: x.read_time ? String(x.read_time) : undefined,
        image: x.image ? String(x.image) : undefined,
        content: x.content ? String(x.content) : undefined,
      })) as unknown as BlogPost[];
  } catch {
    /* fallback */
  }
  return POSTS;
}

export async function savePost(input: PostInput, id?: number): Promise<number> {
  if (id) {
    await run("UPDATE posts SET slug=?, title=?, category=?, excerpt=?, date=?, read_time=?, image=?, content=? WHERE id=?", [input.slug, input.title, input.category ?? null, input.excerpt ?? null, input.date ?? null, input.read_time ?? null, normalizeImageUrl(input.image) ?? null, input.content ?? null, id]);
    return id;
  } else {
    const res = await run("INSERT INTO posts (slug, title, category, excerpt, date, read_time, image, content) VALUES (?,?,?,?,?,?,?,?)", [input.slug, input.title, input.category ?? null, input.excerpt ?? null, input.date ?? null, input.read_time ?? null, normalizeImageUrl(input.image) ?? null, input.content ?? null]);
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

/* ----------------------------- SITE CONTENT ----------------------------- */
export async function getSiteContent(slug: string): Promise<Record<string, string>> {
  try {
    const r = await rows("SELECT fields FROM site_content WHERE slug=?", [slug]);
    if (r.length) return j(r[0].fields, {} as Record<string, string>);
  } catch {
    /* fallback */
  }
  return {};
}

export async function saveSiteContent(slug: string, fields: Record<string, string>) {
  const existing = await rows("SELECT id FROM site_content WHERE slug=?", [slug]);
  if (existing.length) {
    await run("UPDATE site_content SET fields=? WHERE slug=?", [JSON.stringify(fields), slug]);
  } else {
    await run("INSERT INTO site_content (slug, fields) VALUES (?,?)", [slug, JSON.stringify(fields)]);
  }
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
