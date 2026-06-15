"use client";

import { useState } from "react";

interface FaqItem {
  id: number;
  questionBg: string;
  questionEn: string;
  answerBg: string;
  answerEn: string;
  displayOrder: number;
}

export default function FaqEditor({ items: initialItems }: { items: FaqItem[] }) {
  const [items, setItems] = useState<FaqItem[]>(initialItems);
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<FaqItem>>({});

  const openEdit = (item: FaqItem) => {
    setForm({ ...item });
    setEditingId(item.id);
  };

  const openNew = () => {
    setForm({ questionBg: "", questionEn: "", answerBg: "", answerEn: "", displayOrder: items.length + 1 });
    setEditingId("new");
  };

  const closeEdit = () => {
    setEditingId(null);
    setForm({});
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const method = editingId === "new" ? "POST" : "PUT";
      const res = await fetch("/api/admin/faq", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        if (editingId === "new") {
          setItems((prev) => [...prev, updated]);
        } else {
          setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
        }
        closeEdit();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Изтриване на този въпрос?")) return;
    const res = await fetch(`/api/admin/faq?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const inputClass = "w-full p-3 text-[15px] rounded-xl border-[1.5px] bg-[#F4F4F2] focus:outline-none focus:border-[rgba(242,106,33,0.55)] focus:bg-white transition-all resize-y";

  return (
    <div className="space-y-4">
      {/* Add button */}
      <button
        onClick={openNew}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[700] tracking-[0.08em] uppercase rounded-xl border-2 border-[#F26A21] cursor-pointer transition-all hover:bg-[#d45a18]"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Добави въпрос
      </button>

      {/* FAQ list */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[rgba(82,89,93,0.1)] p-5"
          >
            {editingId === item.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Въпрос (БГ)</label>
                    <textarea rows={2} className={inputClass} value={form.questionBg ?? ""} onChange={(e) => setForm((p) => ({ ...p, questionBg: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Въпрос (EN)</label>
                    <textarea rows={2} className={inputClass} value={form.questionEn ?? ""} onChange={(e) => setForm((p) => ({ ...p, questionEn: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Отговор (БГ)</label>
                    <textarea rows={4} className={inputClass} value={form.answerBg ?? ""} onChange={(e) => setForm((p) => ({ ...p, answerBg: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Отговор (EN)</label>
                    <textarea rows={4} className={inputClass} value={form.answerEn ?? ""} onChange={(e) => setForm((p) => ({ ...p, answerEn: e.target.value }))} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-5 py-2.5 bg-[#F26A21] text-white text-[14px] font-[700] rounded-xl cursor-pointer transition-all hover:bg-[#d45a18] disabled:opacity-60"
                  >
                    {saving ? "Запазване…" : "Запази"}
                  </button>
                  <button
                    onClick={closeEdit}
                    className="px-5 py-2.5 bg-[rgba(82,89,93,0.1)] text-[#52595D] text-[14px] font-[600] rounded-xl cursor-pointer transition-all hover:bg-[rgba(82,89,93,0.18)]"
                  >
                    Отказ
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-[700] tracking-[0.1em] uppercase text-[#F26A21]">#{item.displayOrder}</span>
                  </div>
                  <p className="text-[16px] font-[600] text-[#1a1e21] leading-[1.4] mb-0.5 truncate">{item.questionBg}</p>
                  <p className="text-[14px] text-[#52595D] truncate">{item.questionEn}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 rounded-lg bg-[rgba(82,89,93,0.08)] text-[#52595D] cursor-pointer transition-all hover:bg-[rgba(242,106,33,0.1)] hover:text-[#F26A21]"
                    title="Редактирай"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-[rgba(82,89,93,0.08)] text-[#52595D] cursor-pointer transition-all hover:bg-[rgba(220,38,38,0.1)] hover:text-[#dc2626]"
                    title="Изтрий"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* New item form */}
        {editingId === "new" && (
          <div className="bg-white rounded-2xl border-2 border-[rgba(242,106,33,0.35)] p-5">
            <h3 className="font-['Sofia_Sans_Condensed',sans-serif] text-[18px] font-[800] text-[#F26A21] tracking-[0.04em] uppercase mb-4">Нов въпрос</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Въпрос (БГ)</label>
                  <textarea rows={2} className={inputClass} value={form.questionBg ?? ""} onChange={(e) => setForm((p) => ({ ...p, questionBg: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Въпрос (EN)</label>
                  <textarea rows={2} className={inputClass} value={form.questionEn ?? ""} onChange={(e) => setForm((p) => ({ ...p, questionEn: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Отговор (БГ)</label>
                  <textarea rows={4} className={inputClass} value={form.answerBg ?? ""} onChange={(e) => setForm((p) => ({ ...p, answerBg: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5">Отговор (EN)</label>
                  <textarea rows={4} className={inputClass} value={form.answerEn ?? ""} onChange={(e) => setForm((p) => ({ ...p, answerEn: e.target.value }))} />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2.5 bg-[#F26A21] text-white text-[14px] font-[700] rounded-xl cursor-pointer transition-all hover:bg-[#d45a18] disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Add"}
                </button>
                <button onClick={closeEdit} className="px-5 py-2.5 bg-[rgba(82,89,93,0.1)] text-[#52595D] text-[14px] font-[600] rounded-xl cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
