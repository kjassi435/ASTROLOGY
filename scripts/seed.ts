import "dotenv/config";
import { createClient } from "@libsql/client";
import { SERVICES } from "../lib/services";
import { COURSES } from "../lib/courses";
import { BOOKS } from "../lib/books";
import { PRODUCTS } from "../lib/products";
import { POSTS } from "../lib/blog";
import { TESTIMONIALS } from "../lib/testimonials";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function seed() {
  console.log("Dropping old tables...");
  await client.executeMultiple(`
    DROP TABLE IF EXISTS services;
    DROP TABLE IF EXISTS courses;
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS testimonials;
    DROP TABLE IF EXISTS contact_submissions;
    DROP TABLE IF EXISTS admin_users;
  `);

  console.log("Creating tables...");
  await client.executeMultiple(`
    CREATE TABLE services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      tagline TEXT,
      icon TEXT,
      featured INTEGER DEFAULT 0,
      popular INTEGER DEFAULT 0,
      description TEXT,
      long_description TEXT,
      includes TEXT,
      tiers TEXT,
      booking_notes TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      category TEXT,
      teacher TEXT DEFAULT 'Arvindrun Vnjay',
      tagline TEXT,
      description TEXT,
      price INTEGER,
      original_price INTEGER,
      buy_url TEXT,
      youtube_url TEXT,
      badge TEXT,
      image TEXT,
      features TEXT,
      syllabus TEXT,
      duration TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      note TEXT,
      image TEXT,
      buy_url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      note TEXT,
      image TEXT,
      buy_url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT,
      excerpt TEXT,
      date TEXT,
      read_time TEXT,
      image TEXT,
      content TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      initials TEXT,
      text TEXT,
      source TEXT,
      badge TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      service TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed services
  console.log(`Seeding ${SERVICES.length} services...`);
  for (const s of SERVICES) {
    await client.execute({
      sql: `INSERT INTO services (slug, name, tagline, icon, featured, popular, description, long_description, includes, tiers, booking_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        s.slug,
        s.name,
        s.tagline,
        s.icon,
        s.featured ? 1 : 0,
        s.popular ? 1 : 0,
        s.description,
        JSON.stringify(s.longDescription),
        JSON.stringify(s.includes),
        JSON.stringify(s.tiers),
        JSON.stringify(s.bookingNotes),
      ],
    });
  }

  // Seed courses
  console.log(`Seeding ${COURSES.length} courses...`);
  for (const c of COURSES) {
    await client.execute({
      sql: `INSERT INTO courses (slug, title, type, category, teacher, tagline, description, price, original_price, buy_url, youtube_url, badge, image, features, syllabus, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        c.slug,
        c.title,
        c.type,
        c.category || null,
        c.teacher,
        c.tagline,
        c.description,
        c.price || null,
        c.originalPrice || null,
        c.buyUrl || null,
        c.youtubeUrl || null,
        c.badge || null,
        c.image,
        JSON.stringify(c.features),
        JSON.stringify(c.syllabus || []),
        c.duration || null,
      ],
    });
  }

  // Seed books
  console.log(`Seeding ${BOOKS.length} books...`);
  for (const b of BOOKS) {
    await client.execute({
      sql: `INSERT INTO books (title, note, image, buy_url) VALUES (?, ?, ?, ?)`,
      args: [b.title, b.note || null, b.image, b.buyUrl],
    });
  }

  // Seed products
  console.log(`Seeding ${PRODUCTS.length} products...`);
  for (const p of PRODUCTS) {
    await client.execute({
      sql: `INSERT INTO products (title, note, image, buy_url) VALUES (?, ?, ?, ?)`,
      args: [p.title, p.note || null, p.image, p.buyUrl],
    });
  }

  // Seed posts
  console.log(`Seeding ${POSTS.length} posts...`);
  for (const p of POSTS) {
    await client.execute({
      sql: `INSERT INTO posts (slug, title, category, excerpt, date, read_time, image, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.slug,
        p.title,
        p.category,
        p.excerpt,
        p.date,
        p.readTime,
        p.image,
        JSON.stringify(p.content),
      ],
    });
  }

  // Seed testimonials
  console.log(`Seeding ${TESTIMONIALS.length} testimonials...`);
  for (const t of TESTIMONIALS) {
    await client.execute({
      sql: `INSERT INTO testimonials (name, initials, text, source, badge) VALUES (?, ?, ?, ?, ?)`,
      args: [t.name, t.initials, t.text, t.source, t.badge],
    });
  }

  console.log("Seed complete!");
}

seed().catch(console.error);
