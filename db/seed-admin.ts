import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { getDbCredentials } from "./config";
import { users } from "./schema";

config({ path: ".env.local" });

const DEFAULT_LOCAL_ADMIN = "admin@atlant.bg";

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD before running db:seed:admin.");
    process.exit(1);
  }

  const pool = mysql.createPool(getDbCredentials());
  const db = drizzle(pool);

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

  if (adminEmail !== DEFAULT_LOCAL_ADMIN) {
    await db.delete(users).where(eq(users.email, DEFAULT_LOCAL_ADMIN));
    console.log(`Removed default local admin (${DEFAULT_LOCAL_ADMIN}).`);
  }

  console.log(`Admin user ready: ${adminEmail}`);
  await pool.end();
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
