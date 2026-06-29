import { NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";

export async function GET() {
  if (process.env.NODE_ENV === "production" && process.env.DEBUG_DB !== "true") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  try {
    const rows = await db.select().from(services).limit(1);

    return NextResponse.json({
      ok: true,
      env: {
        DB_HOST: process.env.DB_HOST ?? null,
        DB_PORT: process.env.DB_PORT ?? null,
        DB_USER: process.env.DB_USER ?? null,
        DB_NAME: process.env.DB_NAME ?? null,
        hasPassword: Boolean(process.env.DB_PASSWORD),
      },
      serviceCountVisible: rows.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        env: {
          DB_HOST: process.env.DB_HOST ?? null,
          DB_PORT: process.env.DB_PORT ?? null,
          DB_USER: process.env.DB_USER ?? null,
          DB_NAME: process.env.DB_NAME ?? null,
          hasPassword: Boolean(process.env.DB_PASSWORD),
        },
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
