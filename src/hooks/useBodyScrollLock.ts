import { useEffect } from "react";

// Prevents the page (body) from scrolling while a modal/overlay is open, and
// pads for the now-hidden scrollbar so the page behind doesn't shift.
export function useBodyScrollLock(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof document === "undefined") {
      return undefined;
    }

    const { body, documentElement } = document;
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [enabled]);
}
