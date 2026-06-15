"use client";

import Image from "next/image";
import { useState } from "react";

interface ServiceItem {
  id: number;
  serviceId: number;
  labelBg: string;
  labelEn: string;
  displayOrder: number;
}

interface Service {
  id: number;
  slug: string;
  titleBg: string;
  titleEn: string;
  descriptionBg: string;
  descriptionEn: string;
  imagePath: string;
  displayOrder: number;
  items: ServiceItem[];
}

export default function ServicesEditor({ services: initialServices }: { services: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});
  const [saving, setSaving] = useState(false);

  const inputClass = "w-full p-3 text-[15px] rounded-xl border-[1.5px] bg-[#F4F4F2] text-[#1a1e21] focus:outline-none focus:border-[rgba(242,106,33,0.55)] focus:bg-white transition-all resize-y";

  const openEdit = (s: Service) => {
    setForm({ ...s });
    setEditingId(s.id);
  };

  const closeEdit = () => {
    setEditingId(null);
    setForm({});
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        setServices((prev) => prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s)));
        closeEdit();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div key={service.id} className="bg-white rounded-2xl border border-[rgba(82,89,93,0.1)] overflow-hidden">
          {editingId === service.id ? (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Заглавие (БГ)</label>
                  <input type="text" className={inputClass} value={form.titleBg ?? ""} onChange={(e) => setForm((p) => ({ ...p, titleBg: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Заглавие (EN)</label>
                  <input type="text" className={inputClass} value={form.titleEn ?? ""} onChange={(e) => setForm((p) => ({ ...p, titleEn: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Описание (БГ)</label>
                  <textarea rows={3} className={inputClass} value={form.descriptionBg ?? ""} onChange={(e) => setForm((p) => ({ ...p, descriptionBg: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Описание (EN)</label>
                  <textarea rows={3} className={inputClass} value={form.descriptionEn ?? ""} onChange={(e) => setForm((p) => ({ ...p, descriptionEn: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Път до изображение</label>
                <input type="text" className={inputClass} value={form.imagePath ?? ""} onChange={(e) => setForm((p) => ({ ...p, imagePath: e.target.value }))} />
              </div>
              <div className="flex gap-3">
                <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-[#F26A21] text-white text-[14px] font-[700] rounded-xl cursor-pointer hover:bg-[#d45a18] disabled:opacity-60">
                  {saving ? "Запазване…" : "Запази"}
                </button>
                <button onClick={closeEdit} className="px-5 py-2.5 bg-[rgba(82,89,93,0.1)] text-[#52595D] text-[14px] font-[600] rounded-xl cursor-pointer">
                  Отказ
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4 p-5">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4F4F2]">
                <Image src={service.imagePath} alt={service.titleEn} width={80} height={80} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-['Sofia_Sans_Condensed',sans-serif] text-[18px] font-[800] text-[#1a1e21] tracking-[0.04em] uppercase leading-[1.2]">
                  {service.titleEn}
                </div>
                <div className="text-[14px] text-[#52595D] mt-0.5 mb-2">{service.titleBg}</div>
                <p className="text-[14px] text-[rgba(82,89,93,0.7)] line-clamp-1">{service.descriptionEn}</p>
                {service.items.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {service.items.slice(0, 3).map((item) => (
                      <span key={item.id} className="text-[12px] px-2 py-0.5 rounded-full bg-[rgba(242,106,33,0.1)] text-[#F26A21] font-[600]">
                        {item.labelEn}
                      </span>
                    ))}
                    {service.items.length > 3 && (
                      <span className="text-[12px] px-2 py-0.5 rounded-full bg-[rgba(82,89,93,0.08)] text-[#52595D]">+{service.items.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => openEdit(service)}
                className="p-2 rounded-lg bg-[rgba(82,89,93,0.08)] text-[#52595D] cursor-pointer transition-all hover:bg-[rgba(242,106,33,0.1)] hover:text-[#F26A21] flex-shrink-0"
                title="Редактирай"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
