import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Info } from "lucide-react";

import type { ProductPromos } from "../../types/product";

interface ProductPromoBadgeProps {
  promos: ProductPromos;
}

const MAX_POPOVER_WIDTH = 260; // px
const VIEWPORT_MARGIN = 16; // popover stays at least this far from the screen edge

// True on mouse/pointer devices (desktop). Touch devices report `hover: none`
// and synthesize a mouseenter + focus on tap; if those opened the popover it
// would immediately re-close on the same tap's click. So hover/focus drive it
// only on hover-capable devices, and touch relies solely on the click toggle.
const isHoverCapable = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

// Small badge shown in the product card's top row. The promo details are hidden
// until the user hovers (desktop) or taps (mobile) the icon. The wrapper owns
// the open state, so hovering the popover (a descendant) keeps it open.
export function ProductPromoBadge({ promos }: ProductPromoBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Size + place the popover when it opens. Cap its width to fit the viewport
  // (with margins), then prefer its right edge at the icon (extending left). If
  // that would push its left edge past the margin, shift it right — spilling
  // past the card — so it never crosses either screen edge.
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const popover = popoverRef.current;
    if (!isOpen || !wrapper || !popover) {
      return;
    }

    const viewportWidth = window.innerWidth;
    const cap = Math.min(MAX_POPOVER_WIDTH, viewportWidth - VIEWPORT_MARGIN * 2);
    popover.style.maxWidth = `${cap}px`;

    const width = popover.offsetWidth;
    const rect = wrapper.getBoundingClientRect();
    const idealLeft = rect.right - width; // right edge at the icon
    const clampedLeft = Math.max(
      VIEWPORT_MARGIN,
      Math.min(idealLeft, viewportWidth - width - VIEWPORT_MARGIN),
    );
    popover.style.left = `${clampedLeft - rect.left}px`;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    // Tap/click outside or Escape dismisses (covers mobile, where there is no
    // mouseleave to close the popover).
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      // In-flow in the card's top row. Lift above sibling cards while open so a
      // tall popover isn't covered by a lower card's info icon.
      className={`relative ${isOpen ? "z-30" : ""}`}
      onMouseEnter={() => {
        if (isHoverCapable()) {
          setIsOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (isHoverCapable()) {
          setIsOpen(false);
        }
      }}
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label="Show promos in this product"
        className="flex h-5 w-5 items-center justify-center text-text-muted transition-colors duration-180 ease-premium hover:text-text-secondary"
        type="button"
        onClick={() => {
          setIsOpen((open) => !open);
        }}
        onFocus={() => {
          if (isHoverCapable()) {
            setIsOpen(true);
          }
        }}
        onBlur={() => {
          if (isHoverCapable()) {
            setIsOpen(false);
          }
        }}
      >
        <Info aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          ref={popoverRef}
          className="absolute top-7 w-max rounded-card border border-border bg-surface p-3 text-left shadow-soft-md"
          role="tooltip"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-violet">
            Promos
          </p>
          <p className="mt-1 text-xs font-medium leading-snug text-text-secondary">
            {promos.summary}
          </p>
          {promos.cards.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {promos.cards.map((card) => (
                <span
                  key={card}
                  className="badge bg-surface-secondary text-text-secondary"
                >
                  {card}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
