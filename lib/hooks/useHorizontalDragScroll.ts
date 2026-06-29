"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = "button, a, input, select, textarea, [role='button']";

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));
}

export function useHorizontalDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (!mediaQuery.matches) return;
      if (isInteractiveTarget(event.target)) {
        dragState.current.moved = false;
        return;
      }
      dragState.current.active = true;
      dragState.current.moved = false;
      dragState.current.startX = event.clientX;
      dragState.current.scrollLeft = element.scrollLeft;
      setIsDragging(true);
      element.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragState.current.active) return;
      const delta = event.clientX - dragState.current.startX;
      if (Math.abs(delta) > 4) dragState.current.moved = true;
      element.scrollLeft = dragState.current.scrollLeft - delta;
    };

    const endDrag = (event: PointerEvent) => {
      if (!dragState.current.active) return;
      dragState.current.active = false;
      setIsDragging(false);
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId);
      }
    };

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", endDrag);
    element.addEventListener("pointercancel", endDrag);

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", endDrag);
      element.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  const consumeDragClick = useCallback(() => {
    if (!dragState.current.moved) return false;
    dragState.current.moved = false;
    return true;
  }, []);

  return { ref, isDragging, consumeDragClick };
}
