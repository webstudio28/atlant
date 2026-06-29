import { config } from "dotenv";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { getDbCredentials } from "./config";
import { faqItems, services, serviceItems, siteSettings, users } from "./schema";
import data from "./seed-data.json";

config({ path: ".env.local" });

const pool = mysql.createPool(getDbCredentials());
const db = drizzle(pool);

async function seed() {
  console.log("Seeding database...");

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@atlant.bg";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await db
    .insert(users)
    .values({ email: adminEmail, passwordHash, name: "Admin", role: "admin" })
    .onDuplicateKeyUpdate({
      set: {
        passwordHash,
        name: "Admin",
        role: "admin",
      },
    });

  for (const s of data.services) {
    await db.insert(services).values(s).onDuplicateKeyUpdate({ set: { slug: sql`slug` } });
  }

  const allServices = await db.select().from(services);
  const serviceMap = Object.fromEntries(allServices.map((s) => [s.slug, s.id]));

  await db.delete(serviceItems);

  for (const [slug, items] of Object.entries(data.serviceItems)) {
    const serviceId = serviceMap[slug];
    if (!serviceId) continue;
    for (const item of items) {
      await db.insert(serviceItems).values({
        serviceId,
        labelBg: item.bg,
        labelEn: item.en,
        displayOrder: item.order,
      });
    }
  }

  await db.delete(faqItems);

  for (const faq of data.faqs) {
    await db.insert(faqItems).values(faq);
  }

  await db.delete(siteSettings);

  for (const s of data.settings) {
    await db.insert(siteSettings).values(s);
  }

  console.log("Database seeded successfully.");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
