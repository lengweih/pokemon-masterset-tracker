import { images } from "../assets/images";
import { getCollectionProgress } from "../lib/collectionOwnership";
import type {
  CollectionCard,
  CollectionCardRarity,
  CollectionCardType,
  CollectionCardVariant,
  CollectionVariantSet,
  CollectionViewId,
  OwnedVariantsByCardId,
} from "../types/collection";
import {
  getMasterSetVariants,
  masterSetCardData,
  type MasterSetCardData,
} from "./masterSet";
import {
  grandmasterVariantsByNumber,
  svpCardData,
  svpVariantsByNumber,
} from "./grandmasterSet";

// Composition layer: joins the master-set source (`masterSet.ts`) and the
// grandmaster-set source (`grandmasterSet.ts`) into the CollectionCard objects
// the app renders, and projects them into per-view lists.

export const collectionCardRarityLabels = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  "double-rare": "Double Rare",
  "ultra-rare": "Ultra Rare",
  "illustration-rare": "Illustration Rare",
  "ace-spec-rare": "ACE SPEC Rare",
  "special-illustration-rare": "Special Illustration Rare",
  "hyper-rare": "Hyper Rare",
  promo: "Promo",
} satisfies Record<CollectionCardRarity, string>;

export const collectionCardRarityOrder = [
  "common",
  "uncommon",
  "rare",
  "double-rare",
  "ultra-rare",
  "ace-spec-rare",
  "illustration-rare",
  "special-illustration-rare",
  "hyper-rare",
  "promo",
] satisfies readonly CollectionCardRarity[];

const collectionCardTypeLabels = {
  colorless: "Colorless",
  darkness: "Darkness",
  dragon: "Dragon",
  fighting: "Fighting",
  fire: "Fire",
  grass: "Grass",
  lightning: "Lightning",
  metal: "Metal",
  psychic: "Psychic",
  trainer: "Trainer",
  water: "Water",
} satisfies Record<CollectionCardType, string>;

type CollectionCardInput = {
  id: string;
  name: string;
  number: string;
  rarity: CollectionCardRarity;
  type: CollectionCardType;
  variants: readonly CollectionCardVariant[];
  imageAlt?: string;
};

const getCollectionCardImage = (cardId: string) => {
  const imageKey = cardId.toUpperCase();

  return images.cards.byFileName[imageKey] ?? images.cards.sample;
};

const createCollectionCard = ({
  id,
  imageAlt,
  name,
  number,
  rarity,
  type,
  variants,
}: CollectionCardInput) => {
  return {
    id,
    imageAlt: imageAlt ?? `${name} Pokémon card`,
    imageUrl: getCollectionCardImage(id),
    name,
    number,
    rarity,
    rarityLabel: collectionCardRarityLabels[rarity],
    type,
    typeLabel: collectionCardTypeLabels[type],
    variants,
  } satisfies CollectionCard;
};

const createMasterSetCard = ([
  number,
  name,
  rarity,
  type,
]: MasterSetCardData) => {
  // Each PRE card carries all its variants — master (booster-pack) plus any
  // grandmaster (promo) variants. Views project to a single set below.
  const variants = [
    ...getMasterSetVariants(rarity, type),
    ...(grandmasterVariantsByNumber[number] ?? []),
  ];

  return createCollectionCard({
    id: `pre-${number}`,
    name,
    number,
    rarity,
    type,
    variants,
  });
};

// SVP black-star promo cards are not in the master set; they carry only their
// grandmaster variants and so appear in the grandmaster view only.
const createSvpCard = ([
  number,
  name,
  rarity,
  type,
]: (typeof svpCardData)[number]) =>
  createCollectionCard({
    id: `svp-${number}`,
    name,
    number,
    rarity,
    type,
    variants: svpVariantsByNumber[number] ?? [],
  });

// Single source of truth: every card with its full variant list (master +
// grandmaster), PRE cards followed by SVP promo cards. Used by pages that work
// from stored card ids (wishlist, card detail) where the whole card matters.
const allCollectionCards = [
  ...masterSetCardData.map(createMasterSetCard),
  ...svpCardData.map(createSvpCard),
];

// Returns a copy of the card with variants filtered to one set.
const projectCardToSet = (
  card: CollectionCard,
  set: CollectionVariantSet,
): CollectionCard => ({
  ...card,
  variants: card.variants.filter((variant) => variant.set === set),
});

// A view shows only cards that have at least one variant of that set, each
// projected to that set's variants.
const cardsForSet = (set: CollectionVariantSet): readonly CollectionCard[] =>
  allCollectionCards
    .filter((card) => card.variants.some((variant) => variant.set === set))
    .map((card) => projectCardToSet(card, set));

export const collectionCardsByView = {
  master: cardsForSet("master"),
  grandmaster: cardsForSet("grandmaster"),
} satisfies Record<CollectionViewId, readonly CollectionCard[]>;

// Views listed here render a "coming soon" placeholder instead of the browser.
// Currently empty — both master and grandmaster are live.
const comingSoonCollectionViews = new Set<CollectionViewId>([]);

export const isCollectionViewComingSoon = (view: CollectionViewId) =>
  comingSoonCollectionViews.has(view);

const collectionCardsById = new Map<string, CollectionCard>(
  allCollectionCards.map((card) => [card.id, card]),
);

export const getCollectionCardById = (cardId: string) =>
  collectionCardsById.get(cardId);

// Progress scope per view: master counts master variants; grandmaster is the
// full set — every master + grandmaster variant (incl. the SVP promo cards).
export const getCollectionViewProgress = (
  view: CollectionViewId,
  ownedVariantsByCardId: OwnedVariantsByCardId,
) =>
  view === "grandmaster"
    ? getCollectionProgress(allCollectionCards, ownedVariantsByCardId)
    : getCollectionProgress(collectionCardsByView.master, ownedVariantsByCardId);
