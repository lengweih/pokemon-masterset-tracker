import { useLayoutEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import type {
  CollectionCard as CollectionCardModel,
  CollectionCardVariant,
} from "../../types/collection";
import { VariantIcon } from "../collection/VariantIcon";
import { getVariantName } from "../collection/variantDisplay";
import { Tooltip } from "../ui/Tooltip";

interface WishlistCardProps {
  card: CollectionCardModel;
  ownedVariantIds: readonly string[];
  onRemove: (cardId: string) => void;
}

const VARIANT_ROW_GAP = 6; // matches gap-1.5
const FALLBACK_ICON_WIDTH = 32; // VariantIcon is w-8
const OVERFLOW_BADGE_WIDTH = 42; // width reserved for the "+N" chip (incl. gap)

// Renders the variant icons on a single line, showing as many as fit and
// collapsing the remainder into a "+N" chip only when they would overflow.
function WishlistVariantRow({
  variants,
  ownedVariantIdSet,
}: {
  variants: readonly CollectionCardVariant[];
  ownedVariantIdSet: Set<string>;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(variants.length);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) {
      return undefined;
    }

    const measure = () => {
      const total = variants.length;
      const available = row.clientWidth;
      const iconWidth =
        row.querySelector<HTMLElement>("[data-variant-icon]")?.offsetWidth ??
        FALLBACK_ICON_WIDTH;
      const unit = iconWidth + VARIANT_ROW_GAP;

      // How many fit when no "+N" chip is needed.
      if (Math.floor((available + VARIANT_ROW_GAP) / unit) >= total) {
        setVisibleCount(total);
        return;
      }

      // Otherwise reserve room for the "+N" chip.
      const fit = Math.floor((available - OVERFLOW_BADGE_WIDTH) / unit);
      setVisibleCount(Math.max(0, Math.min(fit, total)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [variants]);

  const hiddenCount = variants.length - visibleCount;

  return (
    <div
      ref={rowRef}
      className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden"
    >
      {variants.slice(0, visibleCount).map((variant) => (
        <span key={variant.id} className="shrink-0" data-variant-icon>
          <Tooltip label={getVariantName(variant)}>
            <VariantIcon
              className={ownedVariantIdSet.has(variant.id) ? "" : "opacity-40"}
              variant={variant}
            />
          </Tooltip>
        </span>
      ))}
      {hiddenCount > 0 ? (
        <span className="badge shrink-0 bg-surface-secondary text-text-secondary">
          +{hiddenCount}
        </span>
      ) : null}
    </div>
  );
}

export function WishlistCard({
  card,
  ownedVariantIds,
  onRemove,
}: WishlistCardProps) {
  const ownedVariantIdSet = new Set(ownedVariantIds);
  const ownedCount = ownedVariantIdSet.size;
  const totalCount = card.variants.length;
  const allOwned = totalCount > 0 && ownedCount === totalCount;

  return (
    <article className="group relative z-0 flex items-start gap-3 rounded-card border border-border bg-surface p-3 transition-colors duration-180 ease-premium hover:border-border-strong hover:bg-surface-hover xs:gap-4 xs:p-4">
      <img
        alt={card.imageAlt}
        className="aspect-[63/88] w-14 shrink-0 rounded-md object-cover shadow-soft-sm xs:w-16"
        decoding="async"
        loading="lazy"
        src={card.imageUrl}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold leading-none text-text-muted">
              #{card.number}
            </p>
            <h2
              className="mt-1 truncate text-[15px] font-semibold leading-[1.3] text-text-primary sm:text-card"
              title={card.name}
            >
              {card.name}
            </h2>
            <p className="mt-1 truncate text-sm font-medium text-text-secondary">
              {card.rarityLabel} · {card.typeLabel}
            </p>
          </div>

          <button
            aria-label={`Remove ${card.name} from wishlist`}
            className="relative z-20 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors duration-180 ease-premium hover:text-danger"
            type="button"
            onClick={() => {
              onRemove(card.id);
            }}
          >
            <Trash2 aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <span
            aria-label={`${ownedCount} of ${totalCount} variants owned`}
            className={[
              "badge shrink-0",
              allOwned
                ? "badge-success"
                : "bg-surface-secondary text-text-secondary",
            ].join(" ")}
          >
            {ownedCount}/{totalCount}
          </span>
          <WishlistVariantRow
            ownedVariantIdSet={ownedVariantIdSet}
            variants={card.variants}
          />
        </div>
      </div>

      <Link
        aria-label={`View details for ${card.name}`}
        className="absolute inset-0 z-10 rounded-card"
        to={`/collection/${card.id}?from=wishlist`}
      >
        <span className="sr-only">View details for {card.name}</span>
      </Link>
    </article>
  );
}
