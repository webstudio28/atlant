import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { getDbCredentials } from "./config";
import * as schema from "./schema";

const pool = mysql.createPool({
  ...getDbCredentials(),
  waitForConnections: true,
  connectionLimit: 10,
});

export const db = drizzle(pool, { schema, mode: "default" });
