import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import type { CollectionCard as CollectionCardModel } from "../../types/collection";
import { VariantIcon } from "../collection/VariantIcon";

interface WishlistCardProps {
  card: CollectionCardModel;
  ownedVariantIds: readonly string[];
  onRemove: (cardId: string) => void;
}

// Keep the row to a single line of variant icons. Cards with more variants than
// fit collapse the remainder into a "+N" chip; the full list lives on the card
// detail page.
const MAX_VISIBLE_VARIANTS = 4;

export function WishlistCard({
  card,
  ownedVariantIds,
  onRemove,
}: WishlistCardProps) {
  const visibleVariants = card.variants.slice(0, MAX_VISIBLE_VARIANTS);
  const hiddenVariantCount = card.variants.length - visibleVariants.length;
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

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span
            aria-label={`${ownedCount} of ${totalCount} variants owned`}
            className={[
              "badge",
              allOwned
                ? "badge-success"
                : "bg-surface-secondary text-text-secondary",
            ].join(" ")}
          >
            {ownedCount}/{totalCount}
          </span>
          {visibleVariants.map((variant) => (
            <VariantIcon
              key={variant.id}
              className={ownedVariantIdSet.has(variant.id) ? "" : "opacity-40"}
              variant={variant}
            />
          ))}
          {hiddenVariantCount > 0 ? (
            <span className="badge bg-surface-secondary text-text-secondary">
              +{hiddenVariantCount}
            </span>
          ) : null}
        </div>
      </div>

      <Link
        aria-label={`View details for ${card.name}`}
        className="absolute inset-0 z-10 rounded-card"
        to={`/collection/${card.id}`}
      >
        <span className="sr-only">View details for {card.name}</span>
      </Link>
    </article>
  );
}
