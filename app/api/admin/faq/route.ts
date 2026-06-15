import { auth } from "@/lib/auth";
import { db } from "@/db";
import { faqItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return null;
  }
  return session;
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const [created] = await db
    .insert(faqItems)
    .values({
      questionBg: body.questionBg,
      questionEn: body.questionEn,
      answerBg: body.answerBg,
      answerEn: body.answerEn,
      displayOrder: body.displayOrder ?? 0,
    })
    .returning();
  return NextResponse.json(created);
}

export async function PUT(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const [updated] = await db
    .update(faqItems)
    .set({
      questionBg: body.questionBg,
      questionEn: body.questionEn,
      answerBg: body.answerBg,
      answerEn: body.answerEn,
      displayOrder: body.displayOrder,
    })
    .where(eq(faqItems.id, body.id))
    .returning();
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") ?? "0");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await db.delete(faqItems).where(eq(faqItems.id, id));
  return NextResponse.json({ ok: true });
}
