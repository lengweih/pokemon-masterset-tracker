import { useEffect, useMemo, useRef, useState } from "react";
import { Check, X } from "lucide-react";

import type {
  CollectionCard as CollectionCardModel,
  CollectionCardVariant,
  CollectionVariantTone,
} from "../../types/collection";

interface VariantSelectorModalProps {
  card: CollectionCardModel | null;
  ownedVariantIds: readonly string[];
  onClose: () => void;
  onSave: (cardId: string, variantIds: string[]) => void;
}

const variantBadgeClassByTone = {
  base: "badge-variant",
  holo: "badge-variant",
  masterball: "badge-masterball",
  pokeball: "badge-pokeball",
  reverse: "badge-reverse",
} satisfies Record<CollectionVariantTone, string>;

const variantNameById: Record<string, string> = {
  base: "Base",
  holo: "Holo",
  "master-ball": "Master Ball",
  "poke-ball": "Poké Ball",
  "reverse-holo": "Reverse Holo",
} satisfies Record<string, string>;

const getVariantName = (variant: CollectionCardVariant) => {
  return variantNameById[variant.id] ?? variant.label;
};

export function VariantSelectorModal({
  card,
  ownedVariantIds,
  onClose,
  onSave,
}: VariantSelectorModalProps) {
  const [selectedVariantIds, setSelectedVariantIds] = useState<string[]>(() => [
    ...ownedVariantIds,
  ]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const selectedVariantIdSet = useMemo(
    () => new Set(selectedVariantIds),
    [selectedVariantIds],
  );

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

  const allVariantsSelected =
    card.variants.length > 0 &&
    card.variants.every((variant) => selectedVariantIdSet.has(variant.id));

  const handleToggleAllVariants = () => {
    setSelectedVariantIds(
      allVariantsSelected ? [] : card.variants.map((variant) => variant.id),
    );
  };

  const handleVariantToggle = (variantId: string) => {
    setSelectedVariantIds((currentVariantIds) => {
      if (currentVariantIds.includes(variantId)) {
        return currentVariantIds.filter(
          (currentVariantId) => currentVariantId !== variantId,
        );
      }

      return [...currentVariantIds, variantId];
    });
  };

  const handleSave = () => {
    const validVariantIds = card.variants
      .map((variant) => variant.id)
      .filter((variantId) => selectedVariantIdSet.has(variantId));

    onSave(card.id, validVariantIds);
  };

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
        className="modal-panel p-5 xs:p-7"
        role="dialog"
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id="variant-selector-title"
            className="text-[22px] font-semibold leading-tight text-text-primary"
          >
            Edit Variants
          </h2>

          <button
            ref={closeButtonRef}
            aria-label="Close variant selector"
            className="flex h-9 w-9 items-center justify-center rounded-button text-text-secondary transition-colors duration-180 ease-premium hover:bg-surface-hover hover:text-text-primary"
            type="button"
            onClick={onClose}
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <img
            alt={card.imageAlt}
            className="aspect-[63/88] w-16 shrink-0 rounded-md object-cover shadow-soft-sm"
            decoding="async"
            loading="lazy"
            src={card.imageUrl}
          />

          <div className="min-w-0">
            <p className="text-card text-text-primary">
              #{card.number} {card.name}
            </p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {card.rarityLabel}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-text-secondary">
            Variants
          </span>
          <button
            className="rounded-button text-sm font-semibold text-primary transition-colors duration-180 ease-premium hover:text-primary-hover"
            type="button"
            onClick={handleToggleAllVariants}
          >
            {allVariantsSelected ? "Clear all" : "Select all"}
          </button>
        </div>

        <div className="mt-3 grid gap-2.5">
          {card.variants.map((variant) => {
            const isSelected = selectedVariantIdSet.has(variant.id);
            const checkboxId = `${card.id}-${variant.id}`;

            return (
              <label
                key={variant.id}
                className={[
                  "flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-button border bg-surface px-3 transition-colors duration-180 ease-premium hover:bg-surface-hover",
                  isSelected ? "border-primary/40" : "border-border-strong",
                ].join(" ")}
                htmlFor={checkboxId}
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span
                    className={[
                      "inline-flex h-7 min-w-12 shrink-0 items-center justify-center rounded-pill px-3 text-tiny",
                      variantBadgeClassByTone[variant.tone],
                    ].join(" ")}
                  >
                    {variant.label}
                  </span>

                  <span className="truncate text-sm font-semibold text-text-secondary">
                    {getVariantName(variant)}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors duration-180 ease-premium",
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-border-strong bg-surface",
                  ].join(" ")}
                >
                  {isSelected ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : null}
                </span>

                <input
                  id={checkboxId}
                  checked={isSelected}
                  className="sr-only"
                  type="checkbox"
                  onChange={() => {
                    handleVariantToggle(variant.id);
                  }}
                />
              </label>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 xs:grid-cols-2">
          <button
            className="flex h-12 items-center justify-center rounded-button border border-border-strong bg-surface px-5 text-body text-text-primary transition-colors duration-180 ease-premium hover:bg-surface-hover"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="flex h-12 items-center justify-center rounded-button bg-gradient-brand px-5 text-body text-white transition-all duration-180 ease-premium hover:brightness-[1.03]"
            type="button"
            onClick={handleSave}
          >
            Save Variants
          </button>
        </div>
      </section>
    </div>
  );
}
