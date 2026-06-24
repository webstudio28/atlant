import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { services, faqItems, siteSettings, inquiries } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { ADMIN_FEATURES } from "@/lib/admin/features";

async function getStats() {
  const [serviceCount, faqCount, settingCount, inquiryCount, newInquiryCount] = await Promise.all([
    ADMIN_FEATURES.services ? db.select({ count: count() }).from(services) : Promise.resolve([{ count: 0 }]),
    ADMIN_FEATURES.faq ? db.select({ count: count() }).from(faqItems) : Promise.resolve([{ count: 0 }]),
    db.select({ count: count() }).from(siteSettings),
    db.select({ count: count() }).from(inquiries),
    db.select({ count: count() }).from(inquiries).where(eq(inquiries.status, "new")),
  ]);
  return {
    services: serviceCount[0]?.count ?? 0,
    faqs: faqCount[0]?.count ?? 0,
    settings: settingCount[0]?.count ?? 0,
    inquiries: inquiryCount[0]?.count ?? 0,
    newInquiries: newInquiryCount[0]?.count ?? 0,
  };
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    redirect("/admin/login");
  }

  const stats = await getStats();

  const cards = [
    { label: stats.newInquiries > 0 ? `Запитвания · ${stats.newInquiries} нови` : "Запитвания", value: stats.inquiries, href: "/admin/inquiries", color: stats.newInquiries > 0 ? "#F26A21" : "#52595D", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ) },
    ...(ADMIN_FEATURES.services
      ? [{ label: "Услуги", value: stats.services, href: "/admin/services", color: "#3a4044", icon: (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        ) }]
      : []),
    ...(ADMIN_FEATURES.faq
      ? [{ label: "ЧЗВ въпроси", value: stats.faqs, href: "/admin/faq", color: "#52595D", icon: (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        ) }]
      : []),
    { label: "Настройки", value: stats.settings, href: "/admin/settings", color: "#3a4044", icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ) },
  ];

  return (
    <AdminShell>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-['Sofia_Sans_Condensed',sans-serif] text-[32px] font-[800] text-[#1a1e21] tracking-[0.02em]">
            Табло
          </h1>
          <p className="text-[16px] text-[#52595D]">
            Добре дошли, {session.user.name || session.user.email}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {cards.map(({ label, value, href, color, icon }) => (
            <Link
              key={label}
              href={href}
              className="bg-white rounded-2xl border border-[rgba(82,89,93,0.1)] p-6 no-underline flex items-center gap-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                style={{ background: color }}
              >
                {icon}
              </div>
              <div>
                <div className="font-['Sofia_Sans_Condensed',sans-serif] text-[28px] font-[800] text-[#1a1e21] leading-none">
                  {value}
                </div>
                <div className="text-[14px] text-[#52595D] mt-0.5">{label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-[rgba(82,89,93,0.1)] p-6">
          <h2 className="font-['Sofia_Sans_Condensed',sans-serif] text-[20px] font-[800] text-[#1a1e21] tracking-[0.04em] uppercase mb-4">
            Бързи действия
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: "/admin/inquiries", label: "Виж запитванията" },
              ...(ADMIN_FEATURES.services
                ? [{ href: "/admin/services", label: "Управление на услуги" }]
                : []),
              ...(ADMIN_FEATURES.faq
                ? [{ href: "/admin/faq", label: "Управление на ЧЗВ" }]
                : []),
              { href: "/admin/settings", label: "Редактиране на настройки" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-[rgba(242,106,33,0.25)] text-[#F26A21] font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[700] tracking-[0.06em] uppercase no-underline transition-all hover:bg-[rgba(242,106,33,0.07)] hover:border-[rgba(242,106,33,0.5)]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
