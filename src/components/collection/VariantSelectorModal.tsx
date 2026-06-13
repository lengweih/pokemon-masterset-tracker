import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { getCardSetName } from "../../data/collectionCards";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { getCompletionPercentage } from "../../lib/collectionOwnership";
import type { CollectionCard as CollectionCardModel } from "../../types/collection";
import { VariantOwnershipRow } from "./VariantOwnershipRow";

interface VariantSelectorModalProps {
  card: CollectionCardModel | null;
  ownedVariantIds: readonly string[];
  onToggleVariant: (variantId: string) => void;
  onSetAllOwned: (owned: boolean) => void;
  onClose: () => void;
}

export function VariantSelectorModal({
  card,
  ownedVariantIds,
  onToggleVariant,
  onSetAllOwned,
  onClose,
}: VariantSelectorModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(Boolean(card));

  useEffect(() => {
    if (!card) {
      return undefined;
    }

    // Move focus into the dialog on open so keyboard users start inside it.
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [card, onClose]);

  if (!card) {
    return null;
  }

  const ownedVariantIdSet = new Set(ownedVariantIds);
  const ownedCount = ownedVariantIdSet.size;
  const totalCount = card.variants.length;
  const completionPercentage = getCompletionPercentage(ownedCount, totalCount);
  const allOwned = totalCount > 0 && ownedCount === totalCount;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        aria-labelledby="variant-selector-title"
        aria-modal="true"
        className="modal-panel max-h-[calc(100vh-2rem)] overflow-y-auto p-5 xs:p-7"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <img
              alt={card.imageAlt}
              className="aspect-[63/88] w-16 shrink-0 rounded-md object-cover shadow-soft-sm"
              decoding="async"
              loading="lazy"
              src={card.imageUrl}
            />

            <div className="min-w-0">
              <p className="text-label uppercase tracking-[0.18em] text-brand-blue">
                {getCardSetName(card)}
              </p>
              <h2
                id="variant-selector-title"
                className="mt-1 text-xl font-bold leading-tight text-text-primary"
              >
                {card.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="badge bg-surface-secondary text-text-secondary">
                  #{card.number}
                </span>
                <span className="badge bg-surface-secondary text-text-secondary">
                  {card.rarityLabel}
                </span>
                <span className="badge bg-surface-secondary text-text-secondary">
                  {card.typeLabel}
                </span>
              </div>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            aria-label="Close variant selector"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-button text-text-secondary transition-colors duration-180 ease-premium hover:bg-surface-hover hover:text-text-primary"
            type="button"
            onClick={onClose}
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-[13px] font-semibold text-text-secondary">
            <span>Variants owned</span>
            <span className="tabular-nums text-text-primary">
              {ownedCount} / {totalCount}
            </span>
          </div>
          <div className="progress-track mt-2">
            <div
              className="progress-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-text-secondary">Variants</h3>
          <button
            className="rounded-button text-sm font-semibold text-primary transition-colors duration-180 ease-premium hover:text-primary-hover"
            type="button"
            onClick={() => {
              onSetAllOwned(!allOwned);
            }}
          >
            {allOwned ? "Clear all" : "Mark all owned"}
          </button>
        </div>

        <div className="mt-3 grid gap-2.5">
          {card.variants.map((variant) => (
            <VariantOwnershipRow
              key={variant.id}
              isOwned={ownedVariantIdSet.has(variant.id)}
              variant={variant}
              onToggle={onToggleVariant}
            />
          ))}
        </div>

        <button
          className="mt-6 flex h-12 w-full items-center justify-center rounded-button bg-gradient-brand px-5 text-body text-white transition-all duration-180 ease-premium hover:brightness-[1.03]"
          type="button"
          onClick={onClose}
        >
          Done
        </button>
      </section>
    </div>
  );
}
