"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { PRIORITY_PARTNER_COUNT } from "@/lib/pages/partner-references";
import { useHorizontalDragScroll } from "@/lib/hooks/useHorizontalDragScroll";

type PartnerItem = {
  name: string;
  logo?: string;
  document: string;
};

function PartnerLogoMark({ name, logo }: { name: string; logo?: string }) {
  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo} alt="" className="max-h-9 max-w-[110px] object-contain sm:max-h-6 sm:max-w-[92px]" />
    );
  }

  return (
    <span className="px-1 text-center font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[800] leading-tight tracking-[0.04em] uppercase text-[#52595D] sm:text-[11px]">
      {name}
    </span>
  );
}

export function PartnersSection({
  heading,
  items,
  viewLabel,
  expandLabel,
  collapseLabel,
}: {
  heading: string;
  items: PartnerItem[];
  viewLabel: string;
  expandLabel: string;
  collapseLabel: string;
}) {
  const [activeDocument, setActiveDocument] = useState<{ src: string; alt: string } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const { ref: mobileScrollRef, isDragging, consumeDragClick } = useHorizontalDragScroll<HTMLDivElement>();

  const close = useCallback(() => setActiveDocument(null), []);
  const hasMore = items.length > PRIORITY_PARTNER_COUNT;

  const openDocument = useCallback(
    (document: { src: string; alt: string }) => {
      if (consumeDragClick()) return;
      setActiveDocument(document);
    },
    [consumeDragClick],
  );

  useEffect(() => {
    if (!activeDocument) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeDocument, close]);

  if (!items.length) return null;

  return (
    <>
      <section className="border-y border-[rgba(82,89,93,0.08)] bg-white py-14">
        <div className="section-wrap">
          <p className="m-0 mb-8 text-center font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(20px,2.5vw,26px)] font-[700] tracking-[0.04em] text-[#52595D]">
            {heading}
          </p>

          <div
            ref={mobileScrollRef}
            className={`no-scrollbar -mx-4 overflow-x-auto overscroll-x-contain px-4 sm:mx-auto sm:max-w-[1180px] sm:overflow-visible sm:px-0 max-sm:cursor-grab max-sm:active:cursor-grabbing${isDragging ? " max-sm:cursor-grabbing" : ""}`}
          >
            <div
              className={`flex w-max gap-3 pb-1 sm:grid sm:w-full sm:gap-5 sm:pb-0 lg:gap-6 ${
                expanded
                  ? "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                  : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
              }`}
            >
              {items.map((item, index) => (
                <article
                  key={item.name}
                  className={`flex w-[min(68vw,190px)] shrink-0 flex-col items-center gap-2.5 rounded-lg border border-[rgba(82,89,93,0.08)] bg-[#FAFAF9] px-3 py-4 sm:w-auto sm:shrink sm:gap-2 sm:px-2.5 sm:py-2.5 ${
                    !expanded && hasMore && index >= PRIORITY_PARTNER_COUNT ? "sm:hidden" : ""
                  }`}
                >
                  <div className="flex h-10 w-full items-center justify-center px-1 sm:min-h-[28px] sm:h-auto">
                    <PartnerLogoMark name={item.name} logo={item.logo} />
                  </div>

                  {item.logo && (
                    <h3 className="m-0 min-h-[2.4em] text-center font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[800] leading-tight tracking-[0.05em] uppercase text-[#52595D] sm:min-h-0 sm:text-[11px] sm:leading-snug">
                      {item.name}
                    </h3>
                  )}

                  <button
                    type="button"
                    onClick={() => openDocument({ src: item.document, alt: item.name })}
                    className="group relative w-full overflow-hidden rounded-md border border-[rgba(82,89,93,0.12)] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26A21]"
                    aria-label={`${viewLabel}: ${item.name}`}
                  >
                    <div className="relative aspect-[3/4] w-full sm:aspect-auto sm:h-[96px]">
                      <Image
                        src={item.document}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 68vw, 140px"
                        className="object-cover object-top grayscale sm:contrast-[1.05]"
                      />
                      <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[rgba(42,47,51,0.55)] via-transparent to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="rounded bg-white/95 px-2 py-0.5 font-['Sofia_Sans_Condensed',sans-serif] text-[10px] font-[700] tracking-[0.08em] uppercase text-[#52595D]">
                          {viewLabel}
                        </span>
                      </span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>

          {hasMore && (
            <div className="mt-8 hidden justify-center sm:flex">
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(82,89,93,0.14)] bg-[#FAFAF9] px-5 py-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.08em] uppercase text-[#52595D] transition-colors hover:border-[#F26A21]/35 hover:text-[#F26A21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26A21]"
                aria-expanded={expanded}
              >
                {expanded ? collapseLabel : expandLabel}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                  strokeWidth={2.25}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {activeDocument && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(20,22,24,0.92)] p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeDocument.alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            ×
          </button>

          <div className="relative max-h-full max-w-full" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeDocument.src}
              alt={activeDocument.alt}
              className="max-h-[calc(100vh-4rem)] max-w-[min(100vw-2rem,1100px)] rounded-lg object-contain shadow-[0_12px_48px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      )}
    </>
  );
}
