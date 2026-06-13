import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
  className?: string;
}

// Hover tooltip styled like the product promo popover. The panel is rendered in
// a portal and fixed-positioned above the trigger, so it isn't clipped by an
// ancestor's `overflow: hidden` (e.g. the wishlist variant row). The trigger
// sits at z-20 so it can receive hover over a card-wide link overlay.
export function Tooltip({ label, children, className = "" }: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );

  const show = () => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }
    const rect = trigger.getBoundingClientRect();
    setCoords({ top: rect.top - 6, left: rect.left + rect.width / 2 });
  };

  const hide = () => setCoords(null);

  return (
    <span
      ref={triggerRef}
      className={`relative z-20 inline-flex ${className}`.trim()}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      {coords && typeof document !== "undefined"
        ? createPortal(
            <span
              className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-card border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text-primary shadow-soft-md"
              role="tooltip"
              style={{ top: coords.top, left: coords.left }}
            >
              {label}
            </span>,
            document.body,
          )
        : null}
    </span>
  );
}
