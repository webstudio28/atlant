import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { faqItems } from "@/db/schema";
import { asc } from "drizzle-orm";
import AdminShell from "@/components/admin/AdminShell";
import FaqEditor from "./FaqEditor";

export const metadata = {
  title: "FAQ – Atlant Admin",
};

export default async function FaqAdminPage() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    redirect("/admin/login");
  }

  const items = await db.select().from(faqItems).orderBy(asc(faqItems.displayOrder));

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-['Sofia_Sans_Condensed',sans-serif] text-[32px] font-[800] text-[#1a1e21] tracking-[0.02em]">
          Управление на ЧЗВ
          </h1>
          <p className="text-[16px] text-[#52595D]">{items.length} въпроса</p>
          </div>
        </div>
        <FaqEditor items={items} />
      </div>
    </AdminShell>
  );
}
