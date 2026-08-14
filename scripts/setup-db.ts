import { initDB } from "../lib/db-schema";
import { seedIfEmpty } from "../lib/cms";

(async () => {
  console.log("Initializing DB schema…");
  await initDB();
  console.log("Seeding from current content…");
  const result = await seedIfEmpty();
  console.log("Done:", JSON.stringify(result, null, 2));
  process.exit(0);
})().catch((e) => {
  console.error("DB setup failed:", e);
  process.exit(1);
});
