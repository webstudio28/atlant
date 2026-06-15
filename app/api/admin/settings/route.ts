import { auth } from "@/lib/auth";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return null;
  }
  return session;
}

export async function PUT(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json() as { settings: Array<{ id: number; key: string; value: string }> };
  for (const s of body.settings) {
    await db
      .update(siteSettings)
      .set({ value: s.value })
      .where(eq(siteSettings.id, s.id));
  }
  return NextResponse.json({ ok: true });
}
