export type CollectionViewId = "master" | "grandmaster";

export type CollectionCardRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "double-rare"
  | "ultra-rare"
  | "ace-spec-rare"
  | "illustration-rare"
  | "special-illustration-rare"
  | "hyper-rare"
  | "promo";

export type CollectionCardType =
  | "grass"
  | "fire"
  | "water"
  | "lightning"
  | "psychic"
  | "fighting"
  | "darkness"
  | "metal"
  | "dragon"
  | "colorless"
  | "trainer";

export type CollectionOwnershipFilter =
  | "all"
  | "complete"
  | "in-progress"
  | "missing";
export type OwnedVariantsByCardId = Record<string, string[]>;

export interface CollectionProgress {
  collected: number;
  percentage: number;
  remaining: number;
  total: number;
}

export interface CollectionPreferences {
  activeView: CollectionViewId;
}

export interface CollectionStatsSummary {
  master: CollectionProgress;
  grandmaster: CollectionProgress & { comingSoon: boolean };
}

export type CollectionRarityFilter = "all" | CollectionCardRarity;
export type CollectionTypeFilter = "all" | CollectionCardType;

export type CollectionSortOption =
  | "number-asc"
  | "number-desc"
  | "name-asc"
  | "name-desc"
  | "completion-high"
  | "completion-low";

export type CollectionVariantTone =
  | "default"
  | "reverse"
  | "holo"
  | "pokeball"
  | "masterball"
  | "grandmaster";

// Which set a variant belongs to: "master" = obtainable from booster packs,
// "grandmaster" = obtainable outside packs (promos / special products).
export type CollectionVariantSet = "master" | "grandmaster";

export interface CollectionCardVariant {
  id: string;
  label: string;
  tone: CollectionVariantTone;
  set: CollectionVariantSet;
}

export interface CollectionCard {
  id: string;
  imageAlt: string;
  imageUrl: string;
  name: string;
  number: string;
  rarity: CollectionCardRarity;
  rarityLabel: string;
  type: CollectionCardType;
  typeLabel: string;
  variants: readonly CollectionCardVariant[];
}
