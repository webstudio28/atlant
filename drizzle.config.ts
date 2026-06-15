import type { Config } from "drizzle-kit";

/**
 * Local dev: SQLite via libsql (file:./atlant.db)
 * Production: MySQL on cPanel — change dialect + dbCredentials below,
 *   or set DRIZZLE_DIALECT=mysql in your environment.
 */
const isProd = process.env.DRIZZLE_DIALECT === "mysql";

const config: Config = isProd
  ? {
      dialect: "mysql",
      schema: "./db/schema.ts",
      out: "./db/migrations",
      dbCredentials: {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT ?? 3306),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
      },
    }
  : {
      dialect: "sqlite",
      schema: "./db/schema.ts",
      out: "./db/migrations",
      dbCredentials: {
        url: process.env.DATABASE_URL ?? "file:atlant.db",
      },
    };

export default config;
