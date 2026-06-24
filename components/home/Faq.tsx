"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface FaqItem {
  id: number;
  questionBg: string;
  questionEn: string;
  answerBg: string;
  answerEn: string;
  displayOrder: number;
}

function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(isOpen);

  useEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    if (isOpen) {
      panel.style.height = "0px";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.style.height = `${inner.scrollHeight}px`;
        });
      });
    } else if (wasOpen.current) {
      panel.style.height = `${inner.scrollHeight}px`;
      requestAnimationFrame(() => {
        panel.style.height = "0px";
      });
    }

    wasOpen.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== "height" || event.target !== panel) return;
      panel.style.height = isOpen ? "auto" : "0px";
    };

    panel.addEventListener("transitionend", onTransitionEnd);
    return () => panel.removeEventListener("transitionend", onTransitionEnd);
  }, [isOpen]);

  return (
    <div className={`faq-item${isOpen ? " open" : ""}`}>
      <button
        type="button"
        className="faq-question"
        onClick={onToggle}
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div ref={panelRef} className="faq-answer-panel">
        <div ref={innerRef} className="faq-answer-inner">
          <p className="faq-answer">{answer}</p>
        </div>
      </div>
    </div>
  );
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
          {items.map((item) => (
            <FaqAccordionItem
              key={item.id}
              question={isBg ? item.questionBg : item.questionEn}
              answer={isBg ? item.answerBg : item.answerEn}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
