"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { pickLocale } from "@/lib/i18n/locale-text";
import { ABOUT_US_GALLERY_PHOTOS } from "@/lib/pages/about-us-gallery";

const PRESETS = {
  "about-us": ABOUT_US_GALLERY_PHOTOS,
} as const;

function clampIndex(index: number, length: number) {
  if (length === 0) return 0;
  return ((index % length) + length) % length;
}

export function PhotoGallerySection({
  preset,
  heading,
  locale,
}: {
  preset: keyof typeof PRESETS;
  heading?: string;
  locale: string;
}) {
  const images = PRESETS[preset];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const skipInitialThumbnailScroll = useRef(true);

  const labels = pickLocale(locale, {
    bg: {
      altBase: "Работа на Атлант",
      close: "Затвори",
      prev: "Предишна снимка",
      next: "Следваща снимка",
      view: "Виж на цял екран",
    },
    en: {
      altBase: "Atlant at work",
      close: "Close",
      prev: "Previous photo",
      next: "Next photo",
      view: "View fullscreen",
    },
    ru: {
      altBase: "Работа Atlant",
      close: "Закрыть",
      prev: "Предыдущее фото",
      next: "Следующее фото",
      view: "На весь экран",
    },
  });

  const altBase = labels.altBase;
  const closeLabel = labels.close;
  const prevLabel = labels.prev;
  const nextLabel = labels.next;
  const viewLabel = labels.view;

  const goTo = useCallback(
    (index: number) => {
      if (!images.length) return;
      setActiveIndex(clampIndex(index, images.length));
    },
    [images.length],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const openLightbox = useCallback(() => setLightboxOpen(true), []);

  useEffect(() => {
    const strip = thumbnailStripRef.current;
    const thumb = thumbnailRefs.current[activeIndex];
    if (!strip || !thumb) return;

    if (skipInitialThumbnailScroll.current) {
      skipInitialThumbnailScroll.current = false;
      return;
    }

    const targetScroll = thumb.offsetLeft - strip.clientWidth / 2 + thumb.offsetWidth / 2;
    strip.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [activeIndex]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeLightbox, goNext, goPrev, lightboxOpen]);

  if (!images.length) return null;

  const activeSrc = images[activeIndex];

  return (
    <>
      <section className="border-t border-[rgba(82,89,93,0.08)] bg-[#F4F4F2] py-14 md:py-16">
        <div className="section-wrap">
          {heading && (
            <p className="m-0 mb-8 text-center font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(18px,2.2vw,22px)] font-[700] tracking-[0.06em] uppercase text-[#52595D]/80">
              {heading}
            </p>
          )}

          <div className="mx-auto max-w-[980px]">
            <div className="relative">
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(82,89,93,0.12)] bg-white/95 text-[#52595D] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all hover:border-[#F26A21]/40 hover:text-[#F26A21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26A21] max-sm:left-3 max-sm:translate-x-0"
                aria-label={prevLabel}
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
              </button>

              <button
                type="button"
                onClick={openLightbox}
                className="group relative block w-full overflow-hidden rounded-2xl border border-[rgba(82,89,93,0.1)] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26A21]"
                aria-label={`${viewLabel}: ${altBase} ${activeIndex + 1}`}
              >
                <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                  {images.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`${altBase} ${i + 1}`}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 768px) 100vw, 980px"
                      className={`object-cover transition-all duration-300 ease-out ${
                        i === activeIndex
                          ? "scale-100 opacity-100"
                          : "pointer-events-none absolute inset-0 scale-[1.02] opacity-0"
                      } group-hover:scale-[1.02]`}
                    />
                  ))}

                  <span className="absolute inset-0 bg-gradient-to-t from-[rgba(26,30,33,0.45)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-1.5 font-['Sofia_Sans_Condensed',sans-serif] text-[12px] font-[700] tracking-[0.08em] uppercase text-[#52595D] opacity-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {viewLabel}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-0 top-1/2 z-10 flex h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(82,89,93,0.12)] bg-white/95 text-[#52595D] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all hover:border-[#F26A21]/40 hover:text-[#F26A21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26A21] max-sm:right-3 max-sm:translate-x-0"
                aria-label={nextLabel}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 px-1">
              <p className="m-0 font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.1em] uppercase text-[#52595D]/70">
                {activeIndex + 1} / {images.length}
              </p>

              <div className="hidden gap-1.5 sm:flex">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-6 bg-[#F26A21]" : "w-1.5 bg-[#52595D]/25 hover:bg-[#52595D]/45"
                    }`}
                    aria-label={`${altBase} ${i + 1}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>
            </div>

            <div
              ref={thumbnailStripRef}
              className="no-scrollbar mt-4 flex gap-2.5 overflow-x-auto overscroll-x-contain pb-1"
            >
              {images.map((src, i) => (
                <button
                  key={src}
                  ref={(node) => {
                    thumbnailRefs.current[i] = node;
                  }}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`relative h-[68px] w-[92px] shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26A21] sm:h-[76px] sm:w-[104px] ${
                    i === activeIndex
                      ? "border-[#F26A21] shadow-[0_4px_16px_rgba(242,106,33,0.25)]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`${altBase} ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                >
                  <Image src={src} alt="" fill sizes="104px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(14,16,18,0.94)] p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${altBase} ${activeIndex + 1}`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={closeLabel}
          >
            <X className="h-5 w-5" strokeWidth={2.25} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
            aria-label={prevLabel}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.25} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
            aria-label={nextLabel}
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2.25} />
          </button>

          <div
            className="relative flex max-h-full max-w-full flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeSrc}
              alt={`${altBase} ${activeIndex + 1}`}
              className="max-h-[calc(100vh-6rem)] max-w-[min(100vw-2rem,1200px)] rounded-xl object-contain shadow-[0_16px_64px_rgba(0,0,0,0.45)]"
            />

            <p className="m-0 font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.12em] uppercase text-white/70">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
