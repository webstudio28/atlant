import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import AdminShell from "@/components/admin/AdminShell";
import SettingsEditor from "./SettingsEditor";

export const metadata = {
  title: "Settings – Atlant Admin",
};

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    redirect("/admin/login");
  }

  const settings = await db.select().from(siteSettings);

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-['Sofia_Sans_Condensed',sans-serif] text-[32px] font-[800] text-[#1a1e21] tracking-[0.02em]">
            Настройки на сайта
          </h1>
          <p className="text-[16px] text-[#52595D]">Контакти, телефони и общи настройки на сайта.</p>
        </div>
        <SettingsEditor settings={settings} />
      </div>
    </AdminShell>
  );
}
