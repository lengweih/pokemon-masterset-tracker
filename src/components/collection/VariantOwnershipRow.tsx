import { Check } from "lucide-react";

import type { CollectionCardVariant } from "../../types/collection";
import { VariantIcon } from "./VariantIcon";
import { getVariantName } from "./variantDisplay";

interface VariantOwnershipRowProps {
  variant: CollectionCardVariant;
  isOwned: boolean;
  onToggle: (variantId: string) => void;
}

// A full-width toggle button representing one variant's ownership. Clicking it
// flips owned/unowned immediately. Shared by the variant selector modal and the
// card detail page so the two stay in sync.
export function VariantOwnershipRow({
  variant,
  isOwned,
  onToggle,
}: VariantOwnershipRowProps) {
  return (
    <button
      aria-pressed={isOwned}
      className={[
        "flex min-h-14 w-full min-w-0 items-center justify-between gap-2 rounded-button border px-3 text-left transition-colors duration-180 ease-premium xs:gap-4 xs:px-4",
        isOwned
          ? "border-primary/40 bg-primary-light/40"
          : "border-border-strong bg-surface hover:bg-surface-hover",
      ].join(" ")}
      type="button"
      onClick={() => {
        onToggle(variant.id);
      }}
    >
      <span className="flex min-w-0 items-center gap-2 xs:gap-4">
        <span className="flex w-10 shrink-0 justify-center">
          <VariantIcon variant={variant} />
        </span>
        <span className="min-w-0 truncate text-xs font-semibold text-text-primary xs:text-sm">
          {getVariantName(variant)}
        </span>
      </span>

      <span
        className={[
          "badge shrink-0 gap-1",
          isOwned ? "badge-success" : "bg-surface-secondary text-text-secondary",
        ].join(" ")}
      >
        {isOwned ? (
          <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
        ) : null}
        {isOwned ? "Owned" : "Not owned"}
      </span>
    </button>
  );
}
