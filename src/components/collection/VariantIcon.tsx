import { Circle, Sparkle, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type {
  CollectionCardVariant,
  CollectionVariantTone,
} from "../../types/collection";
import { getVariantName } from "./variantDisplay";

// Lucide icon per variant tone. Poké Ball, Master Ball, and all grandmaster
// (promo) tones are intentionally omitted until their custom artwork is added —
// those fall back to the labeled pill below.
const variantIconByTone: Partial<Record<CollectionVariantTone, LucideIcon>> = {
  default: Circle, // non-holo: plain base print
  holo: Sparkles, // full holo foil
  reverse: Sparkle, // reverse holo
};

// Tone color classes (bg + text). Used for the icon chip and the fallback pill.
const variantBadgeClassByTone: Record<CollectionVariantTone, string> = {
  default: "badge-variant",
  holo: "badge-variant",
  reverse: "badge-reverse",
  pokeball: "badge-pokeball",
  masterball: "badge-masterball",
  grandmaster: "badge-grandmaster",
};

interface VariantIconProps {
  variant: CollectionCardVariant;
  // Extra classes (e.g. opacity for un-owned variants in the wishlist row).
  className?: string;
}

// Single source of truth for how a variant is represented. Renders a lucide
// icon when one exists for the tone, otherwise falls back to the labeled pill
// (Poké Ball, Master Ball, grandmaster variants). Shared by the variant
// ownership rows and the wishlist row. The full name is always exposed via
// aria-label / title.
export function VariantIcon({ variant, className = "" }: VariantIconProps) {
  const name = getVariantName(variant);
  const Icon = variantIconByTone[variant.tone];

  if (!Icon) {
    return (
      <span
        className={[
          "badge",
          variantBadgeClassByTone[variant.tone],
          className,
        ].join(" ")}
        title={name}
      >
        {variant.label}
      </span>
    );
  }

  return (
    <span
      aria-label={name}
      className={[
        "inline-flex h-6 w-6 items-center justify-center rounded-full",
        variantBadgeClassByTone[variant.tone],
        className,
      ].join(" ")}
      role="img"
      title={name}
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
    </span>
  );
}
