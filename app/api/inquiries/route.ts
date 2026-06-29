import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.names || !body.phone || !body.serviceSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const insertId = await db
      .insert(inquiries)
      .values({
        serviceSlug: body.serviceSlug,
        serviceTitleBg: body.serviceTitleBg ?? "",
        serviceTitleEn: body.serviceTitleEn ?? "",
        names: body.names,
        phone: body.phone,
        city: body.city ?? "",
        desiredDate: body.desiredDate ?? "",
        message: body.message ?? "",
        status: "new",
      })
      .$returningId();

    // TODO: send email via Resend when API key is added
    // await sendInquiryEmail(created);

    return NextResponse.json({ ok: true, id: Number(insertId) });
  } catch (err) {
    console.error("[inquiries] POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
