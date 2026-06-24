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
    <section id="faq">
      <div className="section-wrap">
        <div className="faq-header section-intro">
          <div className="section-label">{t("label")}</div>
          <h2>{t("title")}</h2>
        </div>

        <div className="faq-list">
          {items.map((item) => {
            const question = isBg ? item.questionBg : item.questionEn;
            const answer = isBg ? item.answerBg : item.answerEn;
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className={`faq-item${isOpen ? " open" : ""}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{question}</span>
                  <svg
                    className="faq-chevron"
                    width="20"
                    height="20"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>

                <div
                  className="faq-answer-panel"
                  style={{ maxHeight: isOpen ? "400px" : "0px" }}
                >
                  <p className="faq-answer">{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
