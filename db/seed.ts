import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import bcrypt from "bcryptjs";
import { faqItems, services, serviceItems, siteSettings, users } from "./schema";
import data from "./seed-data.json";

const client = createClient({ url: process.env.DATABASE_URL ?? "file:atlant.db" });
const db = drizzle(client);

async function seed() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("admin123", 12);
  await db.insert(users).values({ email: "admin@atlant.bg", passwordHash, name: "Admin", role: "admin" }).onConflictDoNothing();

  for (const s of data.services) {
    await db.insert(services).values(s).onConflictDoNothing();
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

  for (const faq of data.faqs) {
    await db.insert(faqItems).values(faq).onConflictDoNothing();
  }

  for (const s of data.settings) {
    await db.insert(siteSettings).values(s).onConflictDoNothing();
  }

  console.log("Database seeded successfully.");
  await client.close();
}

seed().catch((err) => { console.error(err); process.exit(1); });
