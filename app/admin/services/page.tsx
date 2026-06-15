import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { services, serviceItems } from "@/db/schema";
import { asc } from "drizzle-orm";
import AdminShell from "@/components/admin/AdminShell";
import ServicesEditor from "./ServicesEditor";

export const metadata = {
  title: "Services – Atlant Admin",
};

export default async function ServicesAdminPage() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    redirect("/admin/login");
  }

  const allServices = await db.select().from(services).orderBy(asc(services.displayOrder));
  const allItems = await db.select().from(serviceItems).orderBy(asc(serviceItems.displayOrder));

  const servicesWithItems = allServices.map((s) => ({
    ...s,
    items: allItems.filter((i) => i.serviceId === s.id),
  }));

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-['Sofia_Sans_Condensed',sans-serif] text-[32px] font-[800] text-[#1a1e21] tracking-[0.02em]">
            Управление на услуги
          </h1>
          <p className="text-[16px] text-[#52595D]">{allServices.length} услуги</p>
        </div>
        <ServicesEditor services={servicesWithItems} />
      </div>
    </AdminShell>
  );
}
