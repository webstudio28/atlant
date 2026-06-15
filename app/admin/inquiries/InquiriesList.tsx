"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Inquiry {
  id: number;
  serviceSlug: string;
  serviceTitleBg: string;
  serviceTitleEn: string;
  names: string;
  phone: string;
  city: string;
  desiredDate: string;
  message: string;
  status: "new" | "read" | "archived";
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  new: "Ново",
  read: "Прочетено",
  archived: "Архивирано",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-[#F26A21] text-white",
  read: "bg-[rgba(82,89,93,0.12)] text-[#52595D]",
  archived: "bg-[rgba(82,89,93,0.06)] text-[rgba(82,89,93,0.5)]",
};

function formatDate(dt: string) {
  try {
    return new Date(dt + "Z").toLocaleString("bg-BG", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return dt;
  }
}

export default function InquiriesList({ items: initialItems }: { items: Inquiry[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Inquiry[]>(initialItems);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "archived">("all");

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  const updateStatus = async (id: number, status: Inquiry["status"]) => {
    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Изтриване на запитването?")) return;
    const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (expanded === id) setExpanded(null);
    }
  };

  const handleExpand = (item: Inquiry) => {
    setExpanded((prev) => (prev === item.id ? null : item.id));
    // Auto-mark as read when opened
    if (item.status === "new") {
      updateStatus(item.id, "read");
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "new", "read", "archived"] as const).map((f) => {
          const count = f === "all" ? items.length : items.filter((i) => i.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-[14px] font-[600] border-2 transition-all cursor-pointer ${
                filter === f
                  ? "border-[#F26A21] bg-[rgba(242,106,33,0.07)] text-[#F26A21]"
                  : "border-[rgba(82,89,93,0.15)] text-[#52595D] hover:border-[rgba(242,106,33,0.3)]"
              }`}
            >
              {f === "all" ? "Всички" : STATUS_LABELS[f]}
              <span className="ml-1.5 text-[12px] opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[rgba(82,89,93,0.1)] p-12 text-center text-[#52595D] text-[16px]">
          Няма запитвания
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all ${
                item.status === "new"
                  ? "border-[rgba(242,106,33,0.4)] shadow-[0_2px_16px_rgba(242,106,33,0.1)]"
                  : "border-[rgba(82,89,93,0.1)]"
              }`}
            >
              {/* Header row — click to expand */}
              <button
                className="w-full flex items-start gap-4 p-5 text-left cursor-pointer bg-none border-none"
                onClick={() => handleExpand(item)}
              >
                {/* Status dot */}
                <span
                  className={`mt-1 flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-[700] ${STATUS_COLORS[item.status]}`}
                >
                  {STATUS_LABELS[item.status]}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-['Sofia_Sans_Condensed',sans-serif] text-[18px] font-[800] text-[#1a1e21] leading-tight">
                      {item.names}
                    </span>
                    <span className="text-[14px] text-[#52595D]">{item.phone}</span>
                    {item.city && (
                      <span className="text-[14px] text-[rgba(82,89,93,0.6)]">· {item.city}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[13px] font-[600] text-[#F26A21]">{item.serviceTitleBg}</span>
                    {item.desiredDate && (
                      <span className="text-[13px] text-[rgba(82,89,93,0.6)]">· {item.desiredDate}</span>
                    )}
                  </div>
                </div>

                {/* Date + chevron */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[13px] text-[rgba(82,89,93,0.55)] hidden sm:block">
                    {formatDate(item.createdAt)}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#52595D] transition-transform duration-200 ${expanded === item.id ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>

              {/* Expanded details */}
              {expanded === item.id && (
                <div className="border-t border-[rgba(82,89,93,0.1)] px-5 pb-5 pt-4 space-y-4">
                  {/* Detail grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <DetailCell label="Имена" value={item.names} />
                    <DetailCell label="Телефон" value={item.phone} isPhone />
                    <DetailCell label="Град" value={item.city || "—"} />
                    <DetailCell label="Желана дата" value={item.desiredDate || "—"} />
                    <DetailCell label="Услуга (БГ)" value={item.serviceTitleBg} />
                    <DetailCell label="Услуга (EN)" value={item.serviceTitleEn} />
                    <DetailCell label="Получено" value={formatDate(item.createdAt)} />
                    <DetailCell label="Статус" value={STATUS_LABELS[item.status]} />
                  </div>

                  {item.message && (
                    <div>
                      <div className="text-[12px] font-[700] tracking-[0.1em] uppercase text-[rgba(82,89,93,0.5)] mb-1">
                        Съобщение
                      </div>
                      <p className="text-[15px] text-[#1a1e21] leading-[1.6] bg-[#F4F4F2] rounded-xl px-4 py-3">
                        {item.message}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap pt-1">
                    {item.status !== "new" && (
                      <ActionBtn onClick={() => updateStatus(item.id, "new")} color="orange">
                        Маркирай като ново
                      </ActionBtn>
                    )}
                    {item.status !== "read" && (
                      <ActionBtn onClick={() => updateStatus(item.id, "read")} color="grey">
                        Маркирай като прочетено
                      </ActionBtn>
                    )}
                    {item.status !== "archived" && (
                      <ActionBtn onClick={() => updateStatus(item.id, "archived")} color="grey">
                        Архивирай
                      </ActionBtn>
                    )}
                    <a
                      href={`tel:${item.phone}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-[rgba(34,197,94,0.4)] text-[14px] font-[600] text-[#16a34a] no-underline transition-all hover:bg-[rgba(34,197,94,0.07)]"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Обади се
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-[rgba(220,38,38,0.25)] text-[14px] font-[600] text-[#dc2626] cursor-pointer transition-all hover:bg-[rgba(220,38,38,0.06)] bg-none"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Изтрий
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DetailCell({ label, value, isPhone }: { label: string; value: string; isPhone?: boolean }) {
  return (
    <div>
      <div className="text-[12px] font-[700] tracking-[0.1em] uppercase text-[rgba(82,89,93,0.5)] mb-0.5">
        {label}
      </div>
      {isPhone ? (
        <a href={`tel:${value}`} className="text-[15px] font-[500] text-[#F26A21] no-underline">
          {value}
        </a>
      ) : (
        <div className="text-[15px] font-[500] text-[#1a1e21]">{value}</div>
      )}
    </div>
  );
}

function ActionBtn({
  onClick, color, children,
}: {
  onClick: () => void;
  color: "orange" | "grey";
  children: React.ReactNode;
}) {
  const cls = color === "orange"
    ? "border-[rgba(242,106,33,0.4)] text-[#F26A21] hover:bg-[rgba(242,106,33,0.07)]"
    : "border-[rgba(82,89,93,0.25)] text-[#52595D] hover:bg-[rgba(82,89,93,0.06)]";
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border-2 text-[14px] font-[600] cursor-pointer transition-all bg-none ${cls}`}
    >
      {children}
    </button>
  );
}
