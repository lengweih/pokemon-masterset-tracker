import type {
  CollectionCardVariant,
  CollectionVariantTone,
} from "../../types/collection";

// Single source of truth for variant pill colors. Shared by the variant
// selector modal and the wishlist row so pills look identical everywhere.
const variantBadgeClassByTone = {
  base: "badge-variant",
  holo: "badge-variant",
  masterball: "badge-masterball",
  pokeball: "badge-pokeball",
  reverse: "badge-reverse",
} satisfies Record<CollectionVariantTone, string>;

interface VariantPillProps {
  variant: CollectionCardVariant;
  className?: string;
}

export function VariantPill({ variant, className = "" }: VariantPillProps) {
  return (
    <span
      className={["badge", variantBadgeClassByTone[variant.tone], className].join(
        " ",
      )}
    >
      {variant.label}
    </span>
  );
}
