import type { CollectionCardVariant } from "../../types/collection";

// Full, human-readable variant names keyed by variant id. Shared wherever a
// variant is shown (VariantIcon, the variant ownership rows, the card detail
// page) so names stay consistent.
const variantNameById: Record<string, string> = {
  "non-holo": "Non-Holo",
  holo: "Holo",
  "master-ball": "Master Ball",
  "poke-ball": "Poké Ball",
  "reverse-holo": "Reverse Holo",
  // Grandmaster (promo) variants.
  "cosmos-holo": "Cosmos Holo",
  "expansion-stamp": "Expansion Stamp",
  "expansion-stamp-jumbo": "Expansion Stamp (Jumbo)",
  "expansion-stamp-alt": "Expansion Stamp (Alternate Placement)",
  "expansion-stamp-jumbo-alt": "Expansion Stamp (Jumbo, Alternate Placement)",
  "play-pokemon": "Play! Pokémon",
  "play-pokemon-cosmos": "Play! Pokémon (Cosmos Holo)",
  "pokemon-tcg-gym": "Pokémon TCG Gym",
  "premier-ball-league": "Premier Ball League",
  "premier-ball-league-judge": "Premier Ball League (Judge)",
  "holiday-calendar": "Holiday Calendar 2025",
  "pokemon-day": "Pokémon Day",
  jumbo: "Jumbo",
  "professor-program": "Professor Program",
};

export const getVariantName = (variant: CollectionCardVariant) =>
  variantNameById[variant.id] ?? variant.label;
