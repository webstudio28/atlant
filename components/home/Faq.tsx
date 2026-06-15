"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface FaqItem {
  id: number;
  questionBg: string;
  questionEn: string;
  answerBg: string;
  answerEn: string;
  displayOrder: number;
}

export default function Faq({
  items,
  locale,
}: {
  items: FaqItem[];
  locale: string;
}) {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<number | null>(null);
  const isBg = locale === "bg";

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="bg-white py-24 relative">
      <div className="max-w-[1280px] mx-auto px-8 relative">
        {/* Section header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[700] tracking-[0.18em] uppercase text-[#F26A21] mb-3">
            {t("label")}
          </div>
          <h2 className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(32px,4vw,44px)] font-[800] text-[#52595D] tracking-[0.02em]">
            {t("title")}
          </h2>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-3 max-w-[900px]">
          {items.map((item) => {
            const question = isBg ? item.questionBg : item.questionEn;
            const answer = isBg ? item.answerBg : item.answerEn;
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border-l border-r border-b border-[rgba(82,89,93,0.16)] border-t-transparent shadow-[0_2px_14px_rgba(0,0,0,0.06)] transition-shadow ${
                  isOpen ? "shadow-[0_8px_28px_rgba(0,0,0,0.1)]" : ""
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-none border-none cursor-pointer"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="font-['Sofia_Sans',sans-serif] text-[17px] font-[600] text-[#52595D] leading-[1.45]">
                    {question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-[rgba(242,106,33,0.1)] flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#F26A21" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                  style={{ maxHeight: isOpen ? "400px" : "0px" }}
                >
                  <div className="px-6 pb-5 pt-0">
                    <div className="h-px w-full bg-[rgba(82,89,93,0.1)] mb-4" />
                    <p className="text-[16px] text-[#52595D] leading-[1.65] m-0">
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
