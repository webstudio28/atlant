"use client";

import { useState } from "react";
import type { ServiceTopic } from "@/lib/pages/topic-types";
import { SectionLabel, SectionTitle } from "./PageSections";

function TopicIntro({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="m-0 mb-6 text-[17px] leading-[1.7] text-[#52595D]/90">{text}</p>;
}

function TopicFooter({ lines }: { lines?: string[] }) {
  if (!lines?.length) return null;
  return (
    <div className="mt-6 flex flex-col gap-3 border-t border-[rgba(82,89,93,0.12)] pt-6">
      {lines.map((line, i) => (
        <p key={i} className="m-0 text-[16px] leading-[1.65] text-[#52595D]/85">
          {line}
        </p>
      ))}
    </div>
  );
}

function PointGrid({ points }: { points: ServiceTopic["points"] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {points.map((point) => (
        <div key={point.title} className="rounded-lg border border-[rgba(82,89,93,0.1)] bg-white p-4">
          <h4 className="m-0 mb-2 font-['Sofia_Sans_Condensed',sans-serif] text-[17px] font-[800] tracking-[0.03em] text-[#F26A21] uppercase">
            {point.title}
          </h4>
          <p className="m-0 text-[15px] leading-[1.6] text-[#52595D]">{point.text}</p>
        </div>
      ))}
    </div>
  );
}

function TopicBody({ topic }: { topic: ServiceTopic }) {
  return (
    <>
      <TopicIntro text={topic.intro} />
      {topic.points.length > 0 && <PointGrid points={topic.points} />}
      <TopicFooter lines={topic.footer} />
    </>
  );
}

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F26A21"
      strokeWidth="2.5"
      className={`shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

function TopicAccordionItem({
  topic,
  isOpen,
  onToggle,
}: {
  topic: ServiceTopic;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[rgba(82,89,93,0.12)] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <button
        type="button"
        className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F26A21] font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[800] text-white transition-transform duration-300 ease-out">
          +
        </span>
        <span className="flex-1 font-['Sofia_Sans_Condensed',sans-serif] text-[18px] font-[800] leading-[1.2] tracking-[0.02em] text-[#52595D] uppercase sm:text-[20px]">
          {topic.title}
        </span>
        <Chevron open={isOpen} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`border-t border-[rgba(82,89,93,0.1)] bg-[#FAFAF8] px-5 py-6 transition-opacity duration-500 ease-out motion-reduce:transition-none sm:px-6 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <TopicBody topic={topic} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceTopicsSection({
  label,
  heading,
  topics,
}: {
  label?: string;
  heading: string;
  topics: ServiceTopic[];
}) {
  const [open, setOpen] = useState(-1);

  return (
    <section className="bg-[#F4F4F2] py-20">
      <div className="section-wrap">
        <div className="mb-12">
          {label && <SectionLabel>{label}</SectionLabel>}
          <SectionTitle>{heading}</SectionTitle>
        </div>

        <div className="flex flex-col gap-4">
          {topics.map((topic, i) => (
            <TopicAccordionItem
              key={topic.title}
              topic={topic}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use ServiceTopicsSection */
export const TransportTopicsSection = ServiceTopicsSection;
