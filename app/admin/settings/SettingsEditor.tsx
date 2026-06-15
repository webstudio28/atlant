"use client";

import { useState } from "react";

interface Setting {
  id: number;
  key: string;
  value: string;
  label: string;
  groupName: string;
}

export default function SettingsEditor({ settings }: { settings: Setting[] }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map((s) => [s.key, s.value]))
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const groups = Array.from(new Set(settings.map((s) => s.groupName)));

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = settings.map((s) => ({ ...s, value: values[s.key] ?? s.value }));
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: updates }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-[680px] space-y-6">
      {groups.map((group) => (
        <div key={group} className="bg-white rounded-2xl border border-[rgba(82,89,93,0.1)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(82,89,93,0.08)] bg-[#F4F4F2]">
            <h2 className="font-['Sofia_Sans_Condensed',sans-serif] text-[16px] font-[800] tracking-[0.1em] uppercase text-[#52595D]">
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {settings.filter((s) => s.groupName === group).map((setting) => (
              <div key={setting.key}>
                <label
                  htmlFor={`setting-${setting.key}`}
                  className="block text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D] mb-1.5"
                >
                  {setting.label}
                </label>
                <input
                  id={`setting-${setting.key}`}
                  type="text"
                  value={values[setting.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [setting.key]: e.target.value }))}
                  className="w-full p-3 text-[15px] rounded-xl border-[1.5px] bg-[#F4F4F2] text-[#1a1e21] focus:outline-none focus:border-[rgba(242,106,33,0.55)] focus:bg-white transition-all"
                  style={{ borderColor: "rgba(82,89,93,0.16)" }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] text-[16px] font-[700] tracking-[0.08em] uppercase rounded-xl border-2 border-[#F26A21] cursor-pointer transition-all hover:bg-[#d45a18] disabled:opacity-60"
        >
          {saving ? "Запазване…" : "Запази настройките"}
        </button>
        {saved && (
          <span className="text-[15px] font-[600] text-green-600 flex items-center gap-1.5">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Запазено!
          </span>
        )}
      </div>
    </div>
  );
}
