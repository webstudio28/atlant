import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import AdminShell from "@/components/admin/AdminShell";
import InquiriesList from "./InquiriesList";

export const metadata = {
  title: "Запитвания – Atlant Админ",
};

// Revalidate on every visit so new inquiries show up
export const dynamic = "force-dynamic";

export default async function InquiriesAdminPage() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    redirect("/admin/login");
  }

  const items = await db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt));

  const newCount = items.filter((i) => i.status === "new").length;

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-['Sofia_Sans_Condensed',sans-serif] text-[32px] font-[800] text-[#1a1e21] tracking-[0.02em]">
              Запитвания
            </h1>
            <p className="text-[16px] text-[#52595D]">
              {items.length} общо
              {newCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[13px] font-[700] bg-[#F26A21] text-white">
                  {newCount} нови
                </span>
              )}
            </p>
          </div>
        </div>

        <InquiriesList items={items} />
      </div>
    </AdminShell>
  );
}
