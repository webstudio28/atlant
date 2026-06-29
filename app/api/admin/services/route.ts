import { auth } from "@/lib/auth";
import { db } from "@/db";
import { services } from "@/db/schema";
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
  const body = await req.json();
  await db
    .update(services)
    .set({
      titleBg: body.titleBg,
      titleEn: body.titleEn,
      descriptionBg: body.descriptionBg,
      descriptionEn: body.descriptionEn,
      imagePath: body.imagePath,
      displayOrder: body.displayOrder,
    })
    .where(eq(services.id, body.id));
  const [updated] = await db
    .select()
    .from(services)
    .where(eq(services.id, body.id));
  return NextResponse.json(updated);
}
