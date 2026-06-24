"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HOME_LOGO_STRIP, homeLogoStripLabel } from "@/lib/home-logo-strip";

export function PartnerLogoStripMarquee({ heading, locale }: { heading: string; locale: string }) {
  const logos = [...HOME_LOGO_STRIP, ...HOME_LOGO_STRIP];
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const applyOffset = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;

    const loopWidth = track.scrollWidth / 2;
    if (loopWidth <= 0) return;

    let offset = next;
    while (offset <= -loopWidth) offset += loopWidth;
    while (offset > 0) offset -= loopWidth;

    offsetRef.current = offset;
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      dragRef.current = { active: true, startX: event.clientX, startOffset: offsetRef.current };
      pausedRef.current = true;
      setIsDragging(true);
      viewport.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current.active) return;
      const delta = event.clientX - dragRef.current.startX;
      applyOffset(dragRef.current.startOffset + delta);
    };

    const endDrag = (event: PointerEvent) => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      pausedRef.current = false;
      setIsDragging(false);
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
    };
  }, [applyOffset]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const SPEED_PX_PER_SEC = 14;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const track = trackRef.current;
      if (track && !pausedRef.current) {
        const loopWidth = track.scrollWidth / 2;
        if (loopWidth > 0) {
          const dt = Math.min((now - lastTime) / 1000, 0.05);
          applyOffset(offsetRef.current - SPEED_PX_PER_SEC * dt);
        }
      }
      lastTime = now;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [applyOffset]);

  return (
    <section className="partner-logo-strip" aria-label={heading}>
      <div className="section-wrap">
        <p className="partner-logo-strip-heading">{heading}</p>
      </div>
      <div
        ref={viewportRef}
        className={`partner-logo-strip-viewport${isDragging ? " is-dragging" : ""}`}
      >
        <div ref={trackRef} className="partner-logo-strip-track">
          {logos.map((item, index) => (
            <div key={`${item.id}-${index}`} className="partner-logo-strip-item">
              {item.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.logo} alt="" className="partner-logo-strip-logo" draggable={false} />
              ) : (
                <span className="partner-logo-strip-text">{homeLogoStripLabel(item, locale)}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
