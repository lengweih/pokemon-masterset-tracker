import { Calendar, CircleStar, Scaling, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { getLogoImage } from "../../assets/images";
import type {
  CollectionCardVariant,
  CollectionVariantTone,
} from "../../types/collection";
import { getVariantName } from "./variantDisplay";

// Custom logo artwork (in src/assets/images/logos) per variant id. These render
// as the bare image rather than a tinted icon chip. Some ids intentionally share
// one logo (e.g. the Play! Pokémon variants, the two Premier Ball League
// variants); those related variants are not differentiated further.
const variantLogoNameById: Record<string, string> = {
  "poke-ball": "pokeball",
  "master-ball": "masterball",
  "play-pokemon": "play-pokemon",
  "play-pokemon-cosmos": "play-pokemon",
  "pokemon-tcg-gym": "tcg-gym",
  "premier-ball-league": "premier-ball-league",
  "premier-ball-league-judge": "premier-ball-league",
  "pokemon-day": "pokemon-day-2025",
  "professor-program": "professor-program",
  "pokemon-center": "pokemon-center",
};

// Logos whose artwork fills its full canvas, so they read larger than the
// padded ball icons. Render them a touch smaller inside the 8x8 box for a
// consistent optical size.
const compactLogoNames = new Set(["pokemon-day-2025", "professor-program", "pokemon-center"]);

// Fine vertical alignment for logos whose art is offset within its transparent
// canvas, so they line up optically with the other icons.
const logoNudgeClassByName: Record<string, string> = {
  "play-pokemon": "translate-y-[2px]",
  "professor-program": "-translate-y-[2px]",
};

// Variants that render as a single letter glyph (both the master-set holo and
// the grandmaster holo promo show "H").
const variantLetterById: Record<string, string> = {
  "non-holo": "N",
  holo: "H",
  "reverse-holo": "R",
  "holo-promo": "H",
};

// Lucide icon per variant id. Related variants may share a base glyph (e.g. the
// Expansion Stamp family all use CircleStar); that shared icon is intentional.
const variantIconById: Record<string, LucideIcon> = {
  "cosmos-holo": Sparkles,
  "expansion-stamp": CircleStar,
  "expansion-stamp-jumbo": CircleStar,
  "expansion-stamp-alt": CircleStar,
  "expansion-stamp-jumbo-alt": CircleStar,
  jumbo: Scaling,
  "holiday-calendar": Calendar,
};

// Tone color classes (bg + text). Used for the labeled pill fallback.
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

// Single source of truth for how a variant is represented. Resolution order:
// custom logo image -> letter glyph -> lucide icon -> labeled pill fallback.
// The full name is always exposed via aria-label / title.
export function VariantIcon({ variant, className = "" }: VariantIconProps) {
  const name = getVariantName(variant);
  const containerClass = [
    "relative inline-flex h-8 w-8 items-center justify-center",
    className,
  ].join(" ");

  const logoName = variantLogoNameById[variant.id];
  const logoSrc = logoName ? getLogoImage(logoName) : "";
  if (logoSrc) {
    const imgSizeClass = compactLogoNames.has(logoName)
      ? "h-6 w-6"
      : "h-8 w-8";
    const nudgeClass = logoNudgeClassByName[logoName] ?? "";
    return (
      <span aria-label={name} className={containerClass} role="img">
        <img
          alt=""
          aria-hidden="true"
          className={`${imgSizeClass} object-contain ${nudgeClass}`.trim()}
          src={logoSrc}
        />
      </span>
    );
  }

  const letter = variantLetterById[variant.id];
  if (letter) {
    return (
      <span aria-label={name} className={containerClass} role="img">
        <span className="text-lg font-bold leading-none text-text-primary">
          {letter}
        </span>
      </span>
    );
  }

  const Icon = variantIconById[variant.id];
  if (Icon) {
    return (
      <span aria-label={name} className={containerClass} role="img">
        <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
      </span>
    );
  }

  return (
    <span
      className={["badge", variantBadgeClassByTone[variant.tone], className].join(
        " ",
      )}
      title={name}
    >
      {variant.label}
    </span>
  );
}
