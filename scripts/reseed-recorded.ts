import "dotenv/config";
import { createClient } from "@libsql/client";
import { COURSES } from "../lib/courses";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function run() {
  // Ensure new column exists (safe additive migration)
  try {
    await client.execute("ALTER TABLE courses ADD COLUMN price_suffix TEXT");
  } catch {
    /* column already exists */
  }

  // Remove existing recorded + live rows so the original content becomes the source of truth
  await client.execute("DELETE FROM courses WHERE type = 'recorded' OR type = 'live'");

  let n = 0;
  for (const c of COURSES.filter((x) => x.type === "recorded" || x.type === "live")) {
    await client.execute({
      sql: `INSERT INTO courses (slug, title, type, category, teacher, tagline, description, price, original_price, buy_url, youtube_url, badge, image, features, syllabus, duration, about, why_join, perks, starts_from, price_note, pay_url, bullets, learn_link, beginner_note, price_suffix, language) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        c.slug,
        c.title,
        c.type,
        c.category ?? null,
        c.teacher ?? "Arvindrun Vnjay",
        c.tagline ?? null,
        c.description ?? null,
        c.price ?? null,
        c.originalPrice ?? null,
        c.buyUrl ?? null,
        c.youtubeUrl ?? null,
        c.badge ?? null,
        c.image ?? null,
        JSON.stringify(c.features ?? []),
        JSON.stringify(c.syllabus ?? []),
        c.duration ?? null,
        c.about ?? null,
        JSON.stringify(c.whyJoin ?? []),
        JSON.stringify(c.perks ?? []),
        c.startsFrom ?? null,
        c.priceNote ?? null,
        c.payUrl ?? null,
        JSON.stringify(c.bullets ?? []),
        c.learnLink ?? null,
        c.beginnerNote ?? null,
        c.priceSuffix ?? null,
        c.language ?? null,
      ] as (string | number | null)[],
    });
    n++;
  }
  console.log(`Reseeded ${n} recorded + live courses into the database.`);
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
