import client from "./db";

export async function initDB() {
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS services (
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

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('live','recorded','free')),
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

    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      note TEXT,
      image TEXT,
      buy_url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      note TEXT,
      image TEXT,
      buy_url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS posts (
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

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      initials TEXT,
      text TEXT,
      source TEXT,
      badge TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      service TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

      CREATE TABLE IF NOT EXISTS site_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        fields TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );
  `);

  // Safe additive migrations (ignore if column already exists).
  const alters = [
    "ALTER TABLE services ADD COLUMN hero_image TEXT",
    "ALTER TABLE services ADD COLUMN intro_heading TEXT",
    "ALTER TABLE courses ADD COLUMN about TEXT",
    "ALTER TABLE courses ADD COLUMN why_join TEXT",
    "ALTER TABLE courses ADD COLUMN perks TEXT",
    "ALTER TABLE courses ADD COLUMN starts_from TEXT",
    "ALTER TABLE courses ADD COLUMN price_note TEXT",
    "ALTER TABLE courses ADD COLUMN pay_url TEXT",
    "ALTER TABLE courses ADD COLUMN bullets TEXT",
    "ALTER TABLE courses ADD COLUMN learn_link TEXT",
    "ALTER TABLE courses ADD COLUMN beginner_note TEXT",
    "ALTER TABLE courses ADD COLUMN language TEXT",
    "ALTER TABLE courses ADD COLUMN price_suffix TEXT",
    "ALTER TABLE courses ADD COLUMN live_session_title TEXT",
    "ALTER TABLE courses ADD COLUMN live_session_body TEXT",
    "ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'published'",
    "ALTER TABLE posts ADD COLUMN body TEXT",
    "ALTER TABLE posts ADD COLUMN author TEXT DEFAULT 'Arvindrun Vnjay'",
    "ALTER TABLE posts ADD COLUMN tags TEXT",
  ];
  for (const sql of alters) {
    try {
      await client.execute(sql);
    } catch {
      /* column likely already exists */
    }
  }
}
